import { NextRequest } from 'next/server';
import { createClient } from '@libsql/client/web';

export const dynamic = 'force-dynamic';

const POLL_MS = 1000;
const KEEPALIVE_MS = 15_000;
const MAX_DURATION_MS = 4 * 60_000;

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const room = (sp.get('room') ?? '').trim();
  const me = (sp.get('me') ?? '').trim();
  let lastMsgId = parseInt(sp.get('since_msg') ?? '0', 10) || 0;
  let lastSigId = parseInt(sp.get('since_sig') ?? '0', 10) || 0;

  if (!room) return new Response('missing room', { status: 400 });

  const client = createClient({
    url: (process.env.TURSO_URL ?? '').replace(/^libsql:\/\//, 'https://'),
    authToken: process.env.TURSO_TOKEN ?? '',
  });

  const encoder = new TextEncoder();
  const startedAt = Date.now();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      const close = () => { if (closed) return; closed = true; try { controller.close(); } catch {} };
      req.signal.addEventListener('abort', close);

      const send = (event: string, data: unknown) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch { closed = true; }
      };
      const ping = () => {
        if (closed) return;
        try { controller.enqueue(encoder.encode(`: ping\n\n`)); } catch { closed = true; }
      };

      controller.enqueue(encoder.encode(`retry: 2000\n\n`));

      let lastKeepalive = Date.now();
      let lastDestKey = '';
      let lastLocKey = '';

      while (!closed && Date.now() - startedAt < MAX_DURATION_MS) {
        try {
          const [msgRes, locRes, sigRes, destRes] = await Promise.all([
            client.execute({
              sql: `SELECT id, name, content FROM messages WHERE room_id = ? AND id > ? ORDER BY id ASC LIMIT 50`,
              args: [room, lastMsgId],
            }),
            client.execute({
              sql: `SELECT name, lat, lng, CAST(strftime('%s', updated_at) AS INTEGER) AS ts
                    FROM participants WHERE room_id = ? AND updated_at > datetime('now', '-30 minutes') ORDER BY name`,
              args: [room],
            }),
            me
              ? client.execute({
                  sql: `SELECT id, from_name, data FROM signals WHERE room_id = ? AND to_name = ? AND id > ? ORDER BY id ASC`,
                  args: [room, me, lastSigId],
                })
              : Promise.resolve({ rows: [] }),
            client.execute({
              sql: `SELECT lat, lng, label FROM destination WHERE room_id = ?`,
              args: [room],
            }),
          ]);

          const messages = msgRes.rows;
          const locations = locRes.rows;
          const signals = sigRes.rows;
          const destinationRows = destRes.rows;

          if (messages.length) {
            for (const m of messages as unknown as { id: number }[]) {
              if (m.id > lastMsgId) lastMsgId = m.id;
            }
            send('messages', messages);
          }
          if (signals.length) {
            for (const s of signals as unknown as { id: number }[]) {
              if (s.id > lastSigId) lastSigId = s.id;
            }
            send('signals', signals);
          }

          const locKey = (locations as unknown as { name: string; lat: string; lng: string; ts: number }[])
            .map(p => `${p.name}:${p.lat},${p.lng}:${p.ts}`).join('|');
          if (locKey !== lastLocKey) {
            lastLocKey = locKey;
            send('locations', locations);
          }

          const dest = (destinationRows as unknown as Record<string, unknown>[])[0] ?? null;
          const destKey = dest ? `${dest.lat},${dest.lng}:${dest.label}` : '';
          if (destKey !== lastDestKey) {
            lastDestKey = destKey;
            send('destination', dest);
          }

          if (Date.now() - lastKeepalive > KEEPALIVE_MS) {
            ping();
            lastKeepalive = Date.now();
          }
        } catch {
          break;
        }

        await new Promise(r => setTimeout(r, POLL_MS));
      }

      close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
