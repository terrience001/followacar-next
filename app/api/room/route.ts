import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { randomBytes } from 'crypto';

export async function POST() {
  const db = getDb();
  const id = randomBytes(4).toString('hex').slice(0, 6).toUpperCase();
  await db`INSERT INTO rooms (id) VALUES (${id})`;
  return NextResponse.json({ ok: true, room: id });
}

export async function GET(req: NextRequest) {
  const db = getDb();
  const id = (req.nextUrl.searchParams.get('id') ?? '').trim();
  if (!id) return NextResponse.json({ ok: false });
  const rows = await db`SELECT id FROM rooms WHERE id = ${id}`;
  return NextResponse.json({ ok: rows.length > 0 });
}
