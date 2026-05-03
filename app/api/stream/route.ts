import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const POLL_MS = 3000;
const KEEPALIVE_MS = 15_000;
const MAX_DURATION_MS = 4 * 60_000;

type ArgValue = string | number | null;
function toArg(v: ArgValue) {
  if (v === null) return { type: 'null' };
  if (typeof v === 'number') return Number.isInteger(v) ? { type: 'integer', value: String(v) } : { type: 'float', value: v };
  return { type: 'text', value: v };
}

async function tursoQuery(sql: string, args: ArgValue[]): Promise<Record<string, unknown>[]> {
  const url = (process.env.TURSO_URL ?? '').replace(/^libsql:\/\//, 'https://');
  const res = await fetch(`${url}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.TURSO_TOKEN ?? ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        { type: 'execute', stmt: { sql, args: args.map(toArg) } },
        { type: 'close' },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Turso ${res.status}`);
  const json = await res.json() as { results: { type: string; response?: { result?: { cols: {name:string}[]; rows: {type:string;value:unknown}[][] } }; error?: {message:string} }[] };
  const r = json.results[0];
  if (r.type === 'error') throw new Error(r.error?.message);
  const result = r.response?.result;
  if (!result) return [];
  const cols = result.cols.map(c => c.name);
  return result.rows.map(row => {
    const obj: Record<string, unknown> = {};
    cols.forEach((col, i) => { obj[col] = row[i]?.value ?? null; });
    return obj;
  });
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const room = (sp.get('room') ?? '').trim();
  const me = (sp.get('me') ?? '').trim();
  let lastMsgId = parseInt(sp.get('since_msg') ?? '0', 10) || 0;
  let lastSigId = parseInt(sp.get('since_sig') ?? '0', 10) || 0;

  if (!room) return new Response('missing room', { status: 400 });

  const encoder = new TextEncoder();
  const startedAt = Date.now();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      const close = () => { if (closed) return; closed = true; try { controller.close(); } catch {} };
      req.signal.addEventListener('abort', close);

      const send = (event: string, data: unknown) => {
        if (closed) return;
        try { controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)); }
        catch { closed = true; }
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
            tursoQuery(`SELECT id, name, content, created_at FROM messages WHERE room_id = ? AND id > ? ORDER BY id ASC LIMIT 50`, [room, lastMsgId]),
            tursoQuery(`SELECT name, lat, lng, CAST(strftime('%s', updated_at) AS INTEGER) AS ts FROM participants WHERE room_id = ? AND updated_at > datetime('now', '-30 minutes') ORDER BY name`, [room]),
            me ? tursoQuery(`SELECT id, from_name, data FROM signals WHERE room_id = ? AND to_name = ? AND id > ? ORDER BY id ASC`, [room, me, lastSigId]) : Promise.resolve([]),
            tursoQuery(`SELECT lat, lng, label FROM destination WHERE room_id = ?`, [room]),
          ]);

          if (messages.length) {
            for (const m of messages) { const id = m.id as number; if (id > lastMsgId) lastMsgId = id; }
            send('messages', messages);
          }
          if (signals.length) {
            for (const s of signals) { const id = s.id as number; if (id > lastSigId) lastSigId = id; }
            send('signals', signals);
          }

          const locKey = locations.map(p => `${p.name}:${p.lat},${p.lng}:${p.ts}`).join('|');
          if (locKey !== lastLocKey) { lastLocKey = locKey; send('locations', locations); }

          const dest = destinationRows[0] ?? null;
          const destKey = dest ? `${dest.lat},${dest.lng}:${dest.label}` : '';
          if (destKey !== lastDestKey) { lastDestKey = destKey; send('destination', dest); }

          if (Date.now() - lastKeepalive > KEEPALIVE_MS) { ping(); lastKeepalive = Date.now(); }
        } catch { break; }

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
