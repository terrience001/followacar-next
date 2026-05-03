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

  let parsedLat = parseLatLng(url);
  let finalUrl = url;
  let body = '';

  if (!parsedLat) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; followacar/1.0)' },
      });
      finalUrl = res.url;
      parsedLat = parseLatLng(finalUrl);
      if (!parsedLat) {
        body = await res.text();
      }
    } catch {}
  }

  // For Google "place share" links the redirected URL has ?q=<place name>
  // and the body's center=... is a region fallback (often wrong).
  // Geocode the place name via Nominatim before falling back to body parsing.
  if (!parsedLat) {
    const placeName = extractPlaceName(finalUrl);
    if (placeName) {
      const geo = await geocodeNominatim(placeName);
      if (geo) parsedLat = geo;
    }
  }

  if (!parsedLat && body) parsedLat = parseLatLng(body);

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

function extractPlaceName(url: string): string | null {
  try {
    const u = new URL(url);
    const q = u.searchParams.get('q') ?? u.searchParams.get('query');
    if (!q) return null;
    if (/^-?\d+\.\d+\s*,\s*-?\d+\.\d+$/.test(q)) return null;
    return q.trim();
  } catch { return null; }
}

async function geocodeNominatim(query: string): Promise<{lat: string, lng: string} | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
      { headers: { 'User-Agent': 'followacar/1.0 (https://github.com/terrience001/followacar-next)' } }
    );
    if (!res.ok) return null;
    const arr = await res.json() as Array<{ lat: string, lon: string }>;
    if (!arr.length) return null;
    return { lat: arr[0].lat, lng: arr[0].lon };
  } catch { return null; }
}

function parseLatLng(s: string) {
  let m: RegExpMatchArray | null;
  if (m = s.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)) return { lat: m[1], lng: m[2] };
  if (m = s.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)) return { lat: m[1], lng: m[2] };
  if (m = s.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/)) return { lat: m[1], lng: m[2] };
  if (m = s.match(/[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/)) return { lat: m[1], lng: m[2] };
  if (m = s.match(/[?&]center=(-?\d+\.\d+)(?:%2C|,)(-?\d+\.\d+)/)) return { lat: m[1], lng: m[2] };
  if (m = s.match(/"latitude"\s*:\s*(-?\d+\.\d+)\s*,\s*"longitude"\s*:\s*(-?\d+\.\d+)/)) return { lat: m[1], lng: m[2] };
  if (m = s.match(/\[null,null,(-?\d+\.\d+),(-?\d+\.\d+)\]/)) return { lat: m[1], lng: m[2] };
  return null;
}
