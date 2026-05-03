import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getDb, ensureMigrated } from '@/lib/db';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_BYTES = 5_000_000;

export async function POST(req: NextRequest) {
  await ensureMigrated();
  const db = getDb();
  const data = await req.formData();
  const room = (data.get('room') as string ?? '').trim();
  const from = (data.get('from') as string ?? '').trim();
  const file = data.get('file') as File | null;
  if (!room || !from || !file) return NextResponse.json({ ok: false, error: 'missing params' });
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ ok: false, error: 'invalid image type' });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: 'image too large' });

  const ext = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
  const key = `photos/${room}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const blob = await put(key, file, { access: 'public', contentType: file.type });

  const rows = await db`
    INSERT INTO photos (room_id, from_name, url) VALUES (${room}, ${from}, ${blob.url})
    RETURNING id
  `;
  const id = (rows[0]?.id as number) ?? 0;
  return NextResponse.json({ ok: true, id, url: blob.url });
}

export async function GET(req: NextRequest) {
  await ensureMigrated();
  const db = getDb();
  const room = (req.nextUrl.searchParams.get('room') ?? '').trim();
  if (!room) return NextResponse.json([]);
  const rows = await db`
    SELECT id, from_name, url, created_at FROM photos
    WHERE room_id = ${room}
    ORDER BY id DESC
    LIMIT 20
  `;
  return NextResponse.json(rows);
}
