import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { getDb, ensureMigrated } from '@/lib/db';

export async function POST(req: NextRequest) {
  await ensureMigrated();
  const db = getDb();
  const data = await req.formData();
  const room = (data.get('room') as string ?? '').trim();
  const name = (data.get('name') as string ?? '').trim();
  if (!room || !name) return NextResponse.json({ ok: false, error: 'missing params' });

  await db`DELETE FROM participants WHERE room_id = ${room} AND name = ${name}`;

  const remaining = await db`
    SELECT COUNT(*) AS c FROM participants
    WHERE room_id = ${room} AND updated_at > datetime('now', '-30 minutes')
  `;
  const count = (remaining[0]?.c as number) ?? 0;

  if (count === 0) {
    const photos = await db`SELECT url FROM photos WHERE room_id = ${room}`;
    const urls = photos.map(p => p.url as string).filter(u => u?.startsWith('https://'));
    if (urls.length) {
      try { await del(urls); } catch {}
    }
    await db`DELETE FROM photos WHERE room_id = ${room}`;
    await db`DELETE FROM destination WHERE room_id = ${room}`;
    return NextResponse.json({ ok: true, cleaned: true, photos: urls.length });
  }

  return NextResponse.json({ ok: true, cleaned: false, remaining: count });
}
