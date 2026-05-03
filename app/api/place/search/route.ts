import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type Suggestion = {
  placePrediction?: {
    placeId: string;
    structuredFormat?: {
      mainText?: { text?: string };
      secondaryText?: { text?: string };
    };
    text?: { text?: string };
  };
};

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') ?? '').trim();
  if (!q || q.length < 2) return NextResponse.json([]);

  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return NextResponse.json([]);

  try {
    const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
      },
      body: JSON.stringify({ input: q, languageCode: 'zh-TW' }),
    });
    if (!res.ok) return NextResponse.json([]);
    const json = await res.json() as { suggestions?: Suggestion[] };
    if (!json.suggestions) return NextResponse.json([]);
    const out = json.suggestions.slice(0, 6).map(s => {
      const p = s.placePrediction;
      return {
        place_id: p?.placeId ?? '',
        main: p?.structuredFormat?.mainText?.text ?? p?.text?.text ?? '',
        secondary: p?.structuredFormat?.secondaryText?.text ?? '',
      };
    }).filter(o => o.place_id);
    return NextResponse.json(out);
  } catch {
    return NextResponse.json([]);
  }
}
