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
  const [embedError, setEmbedError] = useState(false);
  const active = useMemo(() => sorted[index], [sorted, index]);
  // (Controls removed per request)
  const [thumbs, setThumbs] = useState<Record<string, { url: string; title?: string }>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Just use tracks as-is (no API needed for static export)
  useEffect(() => {
    setSorted(tracks);
  }, [tracks]);

  // Fetch thumbnails directly from Spotify oEmbed (no API proxy needed)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const missing = sorted.filter((t) => !thumbs[t.id]);
      if (missing.length === 0) return;
      const updates: Record<string, { url: string; title?: string }> = {};
      await Promise.all(
        missing.map(async (t) => {
          try {
            const embedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(
              `https://open.spotify.com/track/${t.id}`
            )}`;
            const r = await fetch(embedUrl, { cache: 'force-cache' });
            if (r.ok) {
              const j = await r.json();
              if (j?.thumbnail_url) updates[t.id] = { url: j.thumbnail_url, title: j.title };
            }
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
          {embedError ? (
            <div className="w-full h-[300px] md:h-[360px] bg-gradient-to-br from-rose-500/10 to-pink-500/10 border-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <svg className="w-16 h-16 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <div className="space-y-2">
                <p className="text-sm text-rose-300/90">Spotify embed není dostupný</p>
                <p className="text-xs text-text-tertiary">Embeds jsou blokovány na localhost</p>
                <a
                  href={`https://open.spotify.com/track/${active?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Otevřít na Spotify
                </a>
              </div>
            </div>
          ) : (
            <iframe
              key={active?.id}
              className="w-full h-[300px] md:h-[360px] border-0"
              src={`https://open.spotify.com/embed/track/${active?.id}?utm_source=generator&theme=0`}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              title={active?.title ?? active?.id}
              onError={() => setEmbedError(true)}
            />
          )}
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
