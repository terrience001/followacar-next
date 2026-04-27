import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  const db = getDb();
  const room = (req.nextUrl.searchParams.get('room') ?? '').trim();
  if (!room) return NextResponse.json(null);
  const rows = await db`SELECT lat, lng, label FROM destination WHERE room_id = ${room}`;
  return NextResponse.json(rows[0] ?? null);
}

export async function POST(req: NextRequest) {
  const db = getDb();
  const data  = await req.formData();
  const room  = (data.get('room')  as string ?? '').trim();
  const label = (data.get('label') as string ?? '目的地').trim() || '目的地';
  const lat   = (data.get('lat')   as string ?? '').trim();
  const lng   = (data.get('lng')   as string ?? '').trim();
  const url   = (data.get('url')   as string ?? '').trim();

  if (!room) return NextResponse.json({ ok: false, error: 'missing room' });

  // Direct coordinate input
  if (lat && lng && !url) {
    if (isNaN(+lat) || isNaN(+lng))
      return NextResponse.json({ ok: false, error: '座標格式不正確' });
    await db`
      INSERT INTO destination (room_id, lat, lng, label) VALUES (${room}, ${lat}, ${lng}, ${label})
      ON CONFLICT (room_id) DO UPDATE SET lat = excluded.lat, lng = excluded.lng, label = excluded.label, updated_at = datetime('now')
    `;
    return NextResponse.json({ ok: true, lat, lng });
  }

  if (!url) return NextResponse.json({ ok: false, error: '請輸入連結' });

  // Parse coords from full URL (no short URL expansion server-side)
  const parsedLat = parseLatLng(url);
  if (!parsedLat) return NextResponse.json({ ok: false, error: '無法解析座標，請切換到「📍 輸入座標」模式' });

  await db`
    INSERT INTO destination (room_id, lat, lng, label) VALUES (${room}, ${parsedLat.lat}, ${parsedLat.lng}, ${label})
    ON CONFLICT (room_id) DO UPDATE SET lat = excluded.lat, lng = excluded.lng, label = excluded.label, updated_at = datetime('now')
  `;
  return NextResponse.json({ ok: true, lat: parsedLat.lat, lng: parsedLat.lng });
}

export async function DELETE(req: NextRequest) {
  const db = getDb();
  const room = (req.nextUrl.searchParams.get('room') ?? '').trim();
  if (!room) return NextResponse.json({ ok: false });
  await db`DELETE FROM destination WHERE room_id = ${room}`;
  return NextResponse.json({ ok: true });
}

function parseLatLng(url: string) {
  let m: RegExpMatchArray | null;
  if (m = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)) return { lat: m[1], lng: m[2] };
  if (m = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)) return { lat: m[1], lng: m[2] };
  if (m = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/)) return { lat: m[1], lng: m[2] };
  if (m = url.match(/[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/)) return { lat: m[1], lng: m[2] };
  return null;
}
