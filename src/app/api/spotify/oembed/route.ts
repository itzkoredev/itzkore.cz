import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (process.env.STATIC_EXPORT === '1') {
    // In static export, serve a small static JSON so export can proceed.
    return NextResponse.json({ error: 'oembed disabled in static export' }, { status: 501 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = (searchParams.get("id") || "").trim();
    if (!id || !/^[A-Za-z0-9]{10,}$/i.test(id)) {
      return NextResponse.json({ error: "Invalid or missing id" }, { status: 400 });
    }
    const oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(
      `https://open.spotify.com/track/${id}`
    )}`;
    const r = await fetch(oembedUrl, { cache: "force-cache", next: { revalidate: 60 * 60 } });
    if (!r.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
    const data = await r.json();
    const { title, thumbnail_url, author_name, provider_name } = data || {};
    return NextResponse.json({ id, title, thumbnail_url, author_name, provider_name });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unexpected error" }, { status: 500 });
  }
}
