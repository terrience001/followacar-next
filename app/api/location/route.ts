import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  const db = getDb();
  const data = await req.formData();
  const room = (data.get('room') as string ?? '').trim();
  const name = (data.get('name') as string ?? '').trim();
  const lat  = data.get('lat') as string ?? '';
  const lng  = data.get('lng') as string ?? '';
  if (!room || !name || isNaN(+lat) || isNaN(+lng))
    return NextResponse.json({ ok: false });
  await db`
    INSERT INTO participants (room_id, name, lat, lng)
    VALUES (${room}, ${name}, ${lat}, ${lng})
    ON CONFLICT (room_id, name)
    DO UPDATE SET lat = EXCLUDED.lat, lng = EXCLUDED.lng, updated_at = NOW()
  `;
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const db = getDb();
  const room = (req.nextUrl.searchParams.get('room') ?? '').trim();
  if (!room) return NextResponse.json([]);
  const rows = await db`
    SELECT name, lat, lng, EXTRACT(EPOCH FROM updated_at)::bigint AS ts
    FROM participants
    WHERE room_id = ${room}
      AND updated_at > NOW() - INTERVAL '30 minutes'
    ORDER BY name
  `;
  return NextResponse.json(rows);
}
