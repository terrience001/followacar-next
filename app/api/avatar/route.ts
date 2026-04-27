import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  const db   = getDb();
  const data = await req.formData();
  const name = (data.get('name') as string ?? '').trim();
  const img  = (data.get('data') as string ?? '').trim();
  if (!name || !img) return NextResponse.json({ ok: false, error: 'missing params' });
  if (!/^data:image\/(jpeg|png|gif|webp);base64,/.test(img))
    return NextResponse.json({ ok: false, error: 'invalid image format' });
  if (img.length > 10000)
    return NextResponse.json({ ok: false, error: 'image too large' });
  await db`
    INSERT INTO avatars (name, data, updated_at) VALUES (${name}, ${img}, datetime('now'))
    ON CONFLICT (name) DO UPDATE SET data = excluded.data, updated_at = datetime('now')
  `;
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const db   = getDb();
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
