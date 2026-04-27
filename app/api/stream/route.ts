import { NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const runtime = 'edge';
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

  const db = neon(process.env.DATABASE_URL!);
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
          const [messages, locations, signals, destinationRows] = await Promise.all([
            db`
              SELECT id, name, content FROM messages
              WHERE room_id = ${room} AND id > ${lastMsgId}
              ORDER BY id ASC LIMIT 50
            `,
            db`
              SELECT name, lat, lng, EXTRACT(EPOCH FROM updated_at)::bigint AS ts
              FROM participants
              WHERE room_id = ${room}
                AND updated_at > NOW() - INTERVAL '30 minutes'
              ORDER BY name
            `,
            me
              ? db`
                  SELECT id, from_name, data FROM signals
                  WHERE room_id = ${room} AND to_name = ${me} AND id > ${lastSigId}
                  ORDER BY id ASC
                `
              : Promise.resolve([] as Record<string, unknown>[]),
            db`SELECT lat, lng, label FROM destination WHERE room_id = ${room}`,
          ]);

          if (messages.length) {
            for (const m of messages as { id: number }[]) {
              if (m.id > lastMsgId) lastMsgId = m.id;
            }
            send('messages', messages);
          }
          if (signals.length) {
            for (const s of signals as { id: number }[]) {
              if (s.id > lastSigId) lastSigId = s.id;
            }
            send('signals', signals);
          }

          const locKey = (locations as { name: string; lat: string; lng: string; ts: number }[])
            .map(p => `${p.name}:${p.lat},${p.lng}:${p.ts}`).join('|');
          if (locKey !== lastLocKey) {
            lastLocKey = locKey;
            send('locations', locations);
          }

          const dest = (destinationRows as Record<string, unknown>[])[0] ?? null;
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
          // network or db error — break, client will reconnect
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
