import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { getDb, ensureMigrated } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const STALE_MINUTES = 30;

export async function GET(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  if (expected) {
    const auth = req.headers.get('authorization') ?? '';
    if (auth !== `Bearer ${expected}`) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }
  }

  await ensureMigrated();
  const db = getDb();

  const cutoff = `-${STALE_MINUTES} minutes`;
  const orphanRooms = await db`
    SELECT DISTINCT room_id FROM photos
    WHERE room_id NOT IN (
      SELECT DISTINCT room_id FROM participants
      WHERE updated_at > datetime('now', ${cutoff})
    )
    UNION
    SELECT DISTINCT room_id FROM destination
    WHERE room_id NOT IN (
      SELECT DISTINCT room_id FROM participants
      WHERE updated_at > datetime('now', ${cutoff})
    )
  `;

  const rooms = orphanRooms.map(r => r.room_id as string);
  let totalPhotos = 0;
  const cleaned: string[] = [];

  for (const room of rooms) {
    const photos = await db`SELECT url FROM photos WHERE room_id = ${room}`;
    const urls = photos.map(p => p.url as string).filter(u => u?.startsWith('https://'));
    if (urls.length) {
      try { await del(urls); } catch {}
      totalPhotos += urls.length;
    }
    await db`DELETE FROM photos WHERE room_id = ${room}`;
    await db`DELETE FROM destination WHERE room_id = ${room}`;
    await db`DELETE FROM participants WHERE room_id = ${room}`;
    cleaned.push(room);
  }

  return NextResponse.json({ ok: true, rooms: cleaned.length, photosDeleted: totalPhotos, cleaned });
}
