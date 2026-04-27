import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  const rows = await db`
    SELECT p.room_id,
           r.name AS room_name,
           COUNT(DISTINCT p.name) AS cnt,
           STRING_AGG(DISTINCT p.name, ', ' ORDER BY p.name) AS names
    FROM participants p
    JOIN rooms r ON r.id = p.room_id
    WHERE p.updated_at > NOW() - INTERVAL '30 minutes'
      AND r.is_public = TRUE
    GROUP BY p.room_id, r.name
    ORDER BY MAX(p.updated_at) DESC
    LIMIT 10
  `;
  return NextResponse.json(rows);
}
