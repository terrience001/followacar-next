import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { randomBytes } from 'crypto';

export async function POST(req: NextRequest) {
  const db = getDb();
  const fd = await req.formData();
  const rawName = (fd.get('name') as string | null)?.trim() ?? '';
  const name = rawName.slice(0, 50) || null;
  const isPublic = (fd.get('is_public') as string | null) !== 'false';
  const id = randomBytes(4).toString('hex').slice(0, 6).toUpperCase();
  await db`INSERT INTO rooms (id, name, is_public) VALUES (${id}, ${name}, ${isPublic})`;
  return NextResponse.json({ ok: true, room: id });
}

export async function GET(req: NextRequest) {
  const db = getDb();
  const id = (req.nextUrl.searchParams.get('id') ?? '').trim();
  if (!id) return NextResponse.json({ ok: false });
  const rows = await db`SELECT id FROM rooms WHERE id = ${id}`;
  return NextResponse.json({ ok: rows.length > 0 });
}
