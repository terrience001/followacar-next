import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  const db = getDb();
  const data = await req.formData();
  const room = (data.get('room') as string ?? '').trim();
  const from = (data.get('from') as string ?? '').trim();
  const to   = (data.get('to')   as string ?? '').trim();
  const sig  = data.get('data') as string ?? '';
  if (!room || !from || !to || !sig) return NextResponse.json({ ok: false });

  await db`DELETE FROM signals WHERE created_at < NOW() - INTERVAL '60 seconds'`;

  if (to === '*') {
    const active = await db`
      SELECT name FROM participants
      WHERE room_id = ${room} AND name != ${from}
        AND updated_at > NOW() - INTERVAL '30 minutes'
    `;
    await Promise.all(active.map(r =>
      db`INSERT INTO signals (room_id, from_name, to_name, data) VALUES (${room}, ${from}, ${r.name}, ${sig})`
    ));
  } else {
    await db`INSERT INTO signals (room_id, from_name, to_name, data) VALUES (${room}, ${from}, ${to}, ${sig})`;
  }
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const db = getDb();
  const p     = req.nextUrl.searchParams;
  const room  = (p.get('room')  ?? '').trim();
  const me    = (p.get('me')    ?? '').trim();
  const since = parseInt(p.get('since') ?? '0');
  if (!room || !me) return NextResponse.json([]);
  const rows = await db`
    SELECT id, from_name, to_name, data FROM signals
    WHERE room_id = ${room} AND to_name = ${me} AND id > ${since}
    ORDER BY id ASC
  `;
  return NextResponse.json(rows);
}
