"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export type SpotifyTrack = { id: string; title?: string };

type Props = {
  tracks: SpotifyTrack[];
  startIndex?: number;
};

export default function MainSpotifyPlayer({ tracks, startIndex = 0 }: Props) {
  const [sorted, setSorted] = useState<SpotifyTrack[]>(tracks);
  const [index, setIndex] = useState(() => Math.min(Math.max(0, startIndex), Math.max(0, tracks.length - 1)));
  const active = useMemo(() => sorted[index], [sorted, index]);
  // (Controls removed per request)
  const [thumbs, setThumbs] = useState<Record<string, { url: string; title?: string }>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // On mount / when tracks change: try to sort by release date (newest first)
  useEffect(() => {
    let cancelled = false;
  (async () => {
      try {
        const ids = tracks.map((t) => t.id).join(",");
    // Try internal proxy first; if it fails, keep given order
    const res = await fetch(`/api/spotify/meta?ids=${encodeURIComponent(ids)}`).catch(() => null as any);
        if (!res.ok) throw new Error("meta fetch failed");
        const j = await res.json();
        const byId: Record<string, string | undefined> = {};
        for (const it of j?.items ?? []) byId[it.id] = it.release_date;
        const withDates = tracks.map((t) => ({ t, d: byId[t.id] ? new Date(byId[t.id]!) : null as Date | null }));
        withDates.sort((a, b) => {
          if (a.d && b.d) return b.d.getTime() - a.d.getTime();
          if (a.d) return -1;
          if (b.d) return 1;
          return 0;
        });
        if (!cancelled) setSorted(withDates.map((x) => x.t));
      } catch {
        if (!cancelled) setSorted(tracks);
      }
    })();
    return () => { cancelled = true; };
  }, [tracks]);

  // Fetch thumbnails via oEmbed proxy
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const missing = sorted.filter((t) => !thumbs[t.id]);
      if (missing.length === 0) return;
      const updates: Record<string, { url: string; title?: string }> = {};
      await Promise.all(
        missing.map(async (t) => {
          try {
            // First try internal proxy (works in server/standalone deploys)
            let j: any | null = null;
            try {
              const res = await fetch(`/api/spotify/oembed?id=${encodeURIComponent(t.id)}`);
              if (res.ok) j = await res.json();
            } catch {}
            // Fallback: direct Spotify oEmbed (works on static FTP hosting)
            if (!j) {
              const embedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(
                `https://open.spotify.com/track/${t.id}`
              )}`;
              try {
                const r2 = await fetch(embedUrl, { cache: 'force-cache' });
                if (r2.ok) j = await r2.json();
              } catch {}
            }
            if (j?.thumbnail_url) updates[t.id] = { url: j.thumbnail_url, title: j.title };
          } catch {}
        })
      );
      if (!cancelled && Object.keys(updates).length) setThumbs((prev) => ({ ...prev, ...updates }));
    })();
    return () => {
      cancelled = true;
    };
  }, [sorted, thumbs]);

  // keep selected cover centered in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
  const child = el.children[index] as HTMLElement | undefined;
    if (child) child.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [index]);

  return (
    <div className="space-y-3">
      <div className="hud-card overflow-hidden flex flex-col">
        {/* Spotify embed on top */}
  <div className="relative border-b border-white/10">
          <iframe
            key={active?.id}
            className="w-full h-[300px] md:h-[360px] border-0"
            src={`https://open.spotify.com/embed/track/${active?.id}?utm_source=generator&theme=0`}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            title={active?.title ?? active?.id}
          />
        </div>

        {/* Smaller, lively cover carousel below */}
    <div className="relative px-4 py-3">
          <div
            ref={containerRef}
            className="grid grid-flow-col auto-cols-[minmax(80px,106px)] gap-4 py-1 overflow-x-auto no-vertical-scroll overscroll-x-contain overscroll-y-none snap-x snap-mandatory place-items-center scrollbar-dark cover-carousel"
          >
            {sorted.map((t, i) => (
              <button
                key={`${t.id}-${i}`}
        className={`relative h-24 w-full rounded-md border overflow-hidden snap-center transition ${
                  i === index
          ? "border-[#00B3C680] ring-2 ring-[#00B3C666] shadow-[0_0_20px_rgba(0,179,198,0.5)]"
                    : "border-white/15 bg-white/5 hover:bg-white/10 opacity-90 hover:opacity-100 hover:shadow-[0_0_14px_rgba(0,179,198,0.4)]"
                } shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]`}
                onClick={() => setIndex(i)}
              >
                {thumbs[t.id]?.url ? (
                  <Image
                    src={thumbs[t.id].url}
                    alt={thumbs[t.id].title || t.title || `Track ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 110px, 110px"
                    className="object-cover"
                    priority={i === index}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00B3C620] to-[#7A00FF20]" />
                )}
                <div className="absolute inset-0 bg-black/35" />
                {/* no overlay title text */}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
