import { NextResponse } from 'next/server';

export async function GET() {
  const url = (process.env.TURSO_URL ?? '').replace(/^libsql:\/\//, 'https://');
  const token = process.env.TURSO_TOKEN ?? '';

  if (!url) return NextResponse.json({ ok: false, error: 'TURSO_URL not set' });
  if (!token) return NextResponse.json({ ok: false, error: 'TURSO_TOKEN not set' });

  try {
    const res = await fetch(`${url}/v2/pipeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          { type: 'execute', stmt: { sql: 'SELECT 1 AS ok', args: [] } },
          { type: 'close' },
        ],
      }),
    });
    const text = await res.text();
    if (!res.ok) return NextResponse.json({ ok: false, status: res.status, body: text });
    return NextResponse.json({ ok: true, status: res.status, url_prefix: url.slice(0, 40) });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: String(e) });
  }
}
