import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  const db = getDb();
  const data    = await req.formData();
  const room    = (data.get('room')    as string ?? '').trim();
  const name    = (data.get('name')    as string ?? '').trim();
  const content = (data.get('content') as string ?? '').trim();
  if (!room || !name || !content) return NextResponse.json({ ok: false });
  await db`INSERT INTO messages (room_id, name, content) VALUES (${room}, ${name}, ${content})`;
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const db = getDb();
  const room  = (req.nextUrl.searchParams.get('room')  ?? '').trim();
  const since = parseInt(req.nextUrl.searchParams.get('since') ?? '0');
  if (!room) return NextResponse.json([]);
  const rows = await db`
    SELECT id, name, content, created_at FROM messages
    WHERE room_id = ${room} AND id > ${since}
    ORDER BY id ASC LIMIT 50
  `;
  return NextResponse.json(rows);
}
