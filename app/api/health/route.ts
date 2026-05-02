import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

export async function GET() {
  const rawUrl = process.env.TURSO_URL ?? '';
  const rawToken = process.env.TURSO_TOKEN ?? '';
  const url = rawUrl.trim();
  const token = rawToken.trim();

  const diag = {
    url_set: !!rawUrl,
    url_len: rawUrl.length,
    url_trimmed_len: url.length,
    url_prefix: url.slice(0, 30),
    token_set: !!rawToken,
    token_len: rawToken.length,
    token_trimmed_len: token.length,
    vercel_env: process.env.VERCEL_ENV ?? 'local',
  };

  if (!url) return NextResponse.json({ ok: false, error: 'TURSO_URL not set', diag });
  if (!token) return NextResponse.json({ ok: false, error: 'TURSO_TOKEN not set', diag });

  try {
    const client = createClient({
      url: url,
      authToken: token,
    });
    const res = await client.execute('SELECT 1 AS ok');
    return NextResponse.json({ ok: true, row: res.rows[0], diag });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: String(e), diag });
  }
}
