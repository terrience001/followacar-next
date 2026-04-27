import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

let lastCleanup = 0;
const CLEANUP_INTERVAL_MS = 60_000;

export async function GET(req: NextRequest) {
  const db = getDb();
  const sp = req.nextUrl.searchParams;
  const room = (sp.get('room') ?? '').trim();
  const me = (sp.get('me') ?? '').trim();
  const sinceMsg = parseInt(sp.get('since_msg') ?? '0', 10) || 0;
  const sinceSig = parseInt(sp.get('since_sig') ?? '0', 10) || 0;

  if (!room) return NextResponse.json({ ok: false });

  const [messages, locations, signals, destinationRows] = await Promise.all([
    db`
      SELECT id, name, content FROM messages
      WHERE room_id = ${room} AND id > ${sinceMsg}
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
          WHERE room_id = ${room} AND to_name = ${me} AND id > ${sinceSig}
          ORDER BY id ASC
        `
      : Promise.resolve([] as unknown as Record<string, unknown>[]),
    db`SELECT lat, lng, label FROM destination WHERE room_id = ${room}`,
  ]);

  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    lastCleanup = now;
    Promise.all([
      db`DELETE FROM signals WHERE created_at < NOW() - INTERVAL '60 seconds'`,
      db`DELETE FROM messages WHERE created_at < NOW() - INTERVAL '7 days'`,
    ]).catch(() => {});
  }

  return NextResponse.json({
    messages,
    locations,
    signals,
    destination: (destinationRows as Record<string, unknown>[])[0] ?? null,
  });
}
