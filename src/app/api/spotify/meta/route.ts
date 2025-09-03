import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Missing SPOTIFY_CLIENT_ID/SECRET env vars");
  }
  const now = Date.now();
  if (cachedToken && now < cachedToken.expiresAt - 10_000) return cachedToken.token;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Token error ${res.status}: ${text}`);
  }
  const json: any = await res.json();
  const token = json.access_token as string;
  const expiresIn = Number(json.expires_in ?? 3600) * 1000;
  cachedToken = { token, expiresAt: now + expiresIn };
  return token;
}

export async function GET(req: NextRequest) {
  if (process.env.STATIC_EXPORT === '1') {
    return NextResponse.json({ error: 'meta disabled in static export' }, { status: 501 });
  }
  const { searchParams } = new URL(req.url);
  const idsParam = searchParams.get("ids");
  if (!idsParam) return NextResponse.json({ error: "Missing ids" }, { status: 400 });
  const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 50); // Spotify limit 50
  if (ids.length === 0) return NextResponse.json({ items: [] });

  try {
    const token = await getAccessToken();
    const url = `https://api.spotify.com/v1/tracks?ids=${encodeURIComponent(ids.join(","))}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return NextResponse.json({ error: `Spotify error ${res.status}: ${t}` }, { status: 502 });
    }
    const data: any = await res.json();
    const items = (data.tracks ?? []).map((tr: any) => ({
      id: tr?.id,
      name: tr?.name,
      album_name: tr?.album?.name,
      release_date: tr?.album?.release_date,
      release_date_precision: tr?.album?.release_date_precision,
      artists: Array.isArray(tr?.artists) ? tr.artists.map((a: any) => a?.name).filter(Boolean) : [],
    }));
    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
