import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { getDb } from '@/lib/db';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_BYTES = 200_000;

export async function POST(req: NextRequest) {
  const db = getDb();
  const data = await req.formData();
  const name = (data.get('name') as string ?? '').trim();
  const file = data.get('file') as File | null;
  if (!name || !file) return NextResponse.json({ ok: false, error: 'missing params' });
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ ok: false, error: 'invalid image type' });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: 'image too large' });

  const ext = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
  const key = `avatars/${encodeURIComponent(name)}-${Date.now()}.${ext}`;

  const existingRows = await db`SELECT data FROM avatars WHERE name = ${name}`;
  const existingUrl = existingRows[0]?.data as string | undefined;

  const blob = await put(key, file, { access: 'public', contentType: file.type });

  await db`
    INSERT INTO avatars (name, data, updated_at) VALUES (${name}, ${blob.url}, datetime('now'))
    ON CONFLICT (name) DO UPDATE SET data = excluded.data, updated_at = datetime('now')
  `;

  if (existingUrl && existingUrl.startsWith('https://') && existingUrl !== blob.url) {
    del(existingUrl).catch(() => {});
  }

  return NextResponse.json({ ok: true, url: blob.url });
}

export async function GET(req: NextRequest) {
  const db = getDb();
  const room = (req.nextUrl.searchParams.get('room') ?? '').trim();
  if (!room) return NextResponse.json({});
  const rows = await db`
    SELECT a.name, a.data FROM avatars a
    INNER JOIN participants p ON p.name = a.name AND p.room_id = ${room}
    WHERE p.updated_at > datetime('now', '-2 hours')
  `;
  const out: Record<string, string> = {};
  for (const r of rows) out[r.name as string] = r.data as string;
  return NextResponse.json(out);
}
