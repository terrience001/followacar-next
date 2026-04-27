import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

export async function GET() {
  const url = process.env.TURSO_URL ?? '';
  const token = process.env.TURSO_TOKEN ?? '';

  if (!url) return NextResponse.json({ ok: false, error: 'TURSO_URL not set' });
  if (!token) return NextResponse.json({ ok: false, error: 'TURSO_TOKEN not set' });

  try {
    const client = createClient({
      url: url.replace(/^libsql:\/\//, 'https://'),
      authToken: token,
    });
    const res = await client.execute('SELECT 1 AS ok');
    return NextResponse.json({ ok: true, row: res.rows[0], url_prefix: url.slice(0, 30) });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: String(e) });
  }
}
