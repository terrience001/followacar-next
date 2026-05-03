import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const tokenId = process.env.CF_TURN_TOKEN_ID;
  const apiToken = process.env.CF_TURN_API_TOKEN;
  if (!tokenId || !apiToken) {
    return NextResponse.json({ iceServers: [] });
  }

  try {
    const res = await fetch(
      `https://rtc.live.cloudflare.com/v1/turn/keys/${tokenId}/credentials/generate-ice-servers`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ttl: 3600 }),
      }
    );
    if (!res.ok) {
      return NextResponse.json({ iceServers: [], error: `CF ${res.status}` });
    }
    const json = await res.json() as { iceServers: unknown };
    return NextResponse.json({ iceServers: json.iceServers });
  } catch (e: unknown) {
    return NextResponse.json({ iceServers: [], error: String(e) });
  }
}
