"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { getSupabase } from "../../lib/supabaseClient";
import { useI18n } from "../../lib/i18n";
import BeatPlayer, { type BeatPlayerHandle } from "../BeatPlayer";

type Beat = {
  id: string;
  title: string;
  bpm: number;
  genre: string;
  mood: string;
  url: string;
};

export default function BeatsBrowser() {
  const { t } = useI18n();
  const [beats, setBeats] = useState<Beat[]>([]);
  const [current, setCurrent] = useState<Beat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<BeatPlayerHandle>(null);
  const [genre, setGenre] = useState<string>("");
  const [mood, setMood] = useState<string>("");
  const listRef = useRef<HTMLUListElement>(null);
  // Footer player context removed; use no-op updater to keep local calls intact
  const update = (_: any) => {};

  const tNoConfig = t.beats.errors.noConfig;
  const tNoData = t.beats.errors.noData;
  const tGeneric = t.beats.errors.generic;
  useEffect(() => {
    const sb = getSupabase();
    async function load() {
      try {
        if (!sb) {
          setError(tNoConfig);
          setBeats([]);
          setCurrent(null);
          return;
        }
        const { data, error } = await sb
          .from("beats")
          .select("*")
          .order("title", { ascending: true });
        if (error) throw error;
        if (!data || data.length === 0) {
          setError(tNoData);
          setBeats([]);
          setCurrent(null);
          return;
        }
  const list = data as unknown as Beat[];
  setBeats(list);
  const first = list[0] || null;
  setCurrent(first);
  if (first) {
    update({ meta: { id: first.id, title: first.title, subtitle: `${first.genre} • ${first.bpm} BPM`, url: first.url } });
  }
  } catch (e: any) {
    setError(e?.message ? `${tGeneric}: ${e.message}` : tGeneric);
        setBeats([]);
        setCurrent(null);
      }
    }
    load();
  }, [tNoConfig, tNoData, tGeneric]);

  // derive filter options
  const genres = useMemo(
    () => Array.from(new Set(beats.map((b) => (b.genre || "").trim()).filter(Boolean))).sort(),
    [beats]
  );
  // split mood strings like "dark, atmo" into individual tags
  const splitMoods = (s: string) =>
    (s || "")
      .split(/[,/|]+/)
      .map((t) => t.trim())
      .filter(Boolean);
  const moods = useMemo(() => {
    const all = new Set<string>();
    for (const b of beats) {
      for (const t of splitMoods(b.mood || "")) all.add(t);
    }
    return Array.from(all).sort();
  }, [beats]);

  // filtered list
  const filtered = useMemo(() => {
    return beats.filter((b) => {
      const okGenre = !genre || b.genre === genre;
      const okMood = !mood || splitMoods(b.mood || "").includes(mood);
      return okGenre && okMood;
    });
  }, [beats, genre, mood]);

  // keep current within filtered set
  useEffect(() => {
    if (!current) {
      if (filtered.length > 0) setCurrent(filtered[0]);
      return;
    }
    const stillVisible = filtered.some((b) => b.id === current.id);
    if (!stillVisible) {
    const nxt = filtered[0] || null;
    setCurrent(nxt);
    if (nxt) update({ meta: { id: nxt.id, title: nxt.title, subtitle: `${nxt.genre} • ${nxt.bpm} BPM`, url: nxt.url } });
    }
  }, [genre, mood, filtered, current]);

  // navigation helpers within filtered list
  const currentIndex = useMemo(() => {
    if (!current) return -1;
    return filtered.findIndex((b) => b.id === current.id);
  }, [filtered, current]);

  const goToIndex = (idx: number, opts?: { autoPlay?: boolean }) => {
    if (idx < 0 || idx >= filtered.length) return;
    const next = filtered[idx];
    setCurrent(next);
    update({ meta: { id: next.id, title: next.title, subtitle: `${next.genre} • ${next.bpm} BPM`, url: next.url } });
    if (playerRef.current) {
      // set source without autoplay first
      playerRef.current.setSource(next.url, !/^https?:\/\//i.test(next.url));
      if (opts?.autoPlay) {
        // attempt to start immediately
        playerRef.current.playSource(next.url, !/^https?:\/\//i.test(next.url));
      }
    }
    // scroll into view
    const el = listRef.current?.querySelector<HTMLLIElement>(`li[data-id="${next.id}"]`);
    el?.scrollIntoView({ block: "nearest" });
  };

  const handlePrev = (opts?: { autoPlay?: boolean }) => {
    if (filtered.length === 0) return;
    if (currentIndex === -1) return goToIndex(0, opts);
    const idx = (currentIndex - 1 + filtered.length) % filtered.length;
    goToIndex(idx, opts);
  };

  const handleNext = (opts?: { shuffle?: boolean; autoPlay?: boolean }) => {
    if (filtered.length === 0) return;
    if (opts?.shuffle && filtered.length > 1) {
      let r = currentIndex;
      while (r === currentIndex) {
        r = Math.floor(Math.random() * filtered.length);
      }
      return goToIndex(r, { autoPlay: opts?.autoPlay });
    }
    if (currentIndex === -1) return goToIndex(0, opts);
    const idx = (currentIndex + 1) % filtered.length;
    goToIndex(idx, opts);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-1 items-start">
      {/* TOP: Player card */}
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/40">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-neon-spots opacity-30" />
        <div className="p-3 md:p-4">
          <h3 className="font-semibold text-base md:text-lg mb-2 leading-tight">{t.beats.player}</h3>
          {current ? (
            <div>
              <div className="mb-2 flex flex-nowrap items-center justify-between text-[13px] text-gray-300 gap-3 leading-tight">
                <span className="font-medium truncate max-w-[70%]">{current.title}</span>
                <span className="text-[11px] text-gray-400">{current.genre} • {current.bpm} BPM</span>
              </div>
              <BeatPlayer
                ref={playerRef}
                src={current.url}
                storagePath={!/^https?:\/\//i.test(current.url)}
                autoPlayOnSrcChange={false}
                vizHeight={180}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </div>
          ) : (
            <p className="text-sm text-gray-400">{t.beats.pickPrompt}</p>
          )}
        </div>
        <div className="pointer-events-none h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-3 mb-3" />
      </div>

      {/* BOTTOM: Filters and List */}
      <div className="space-y-3">
  <h3 className="font-semibold">{t.beats.listTitle}</h3>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">{t.beats.genre}</label>
            <select
              className="bg-black/40 text-white border border-white/20 rounded px-2 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-neonCyan/50"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">{t.beats.all}</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">{t.beats.mood}</label>
            <select
              className="bg-black/40 text-white border border-white/20 rounded px-2 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-neonCyan/50"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">{t.beats.all}</option>
              {moods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          {(genre || mood) && (
            <button
              className="ml-auto text-xs text-gray-300 underline hover:text-white"
              onClick={() => { setGenre(""); setMood(""); }}
            >
              {t.beats.clearFilters}
            </button>
          )}
        </div>
    <ul ref={listRef} className="divide-y divide-white/10 rounded-md border border-white/10 overflow-auto max-h-[46vh] bg-black/30">
          {filtered.map((b) => (
      <li
              key={b.id}
              data-id={b.id}
              className={["p-3 cursor-pointer transition", current?.id === b.id ? "bg-white/10 ring-1 ring-[#00B3C640]" : "hover:bg-white/5"].join(" ")}
              onClick={() => {
        // Select and reset player source without autoplay
        setCurrent(b);
        update({ meta: { id: b.id, title: b.title, subtitle: `${b.genre} • ${b.bpm} BPM`, url: b.url } });
        if (playerRef.current) {
          playerRef.current.setSource(b.url, !/^https?:\/\//i.test(b.url));
        }
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium leading-tight">{b.title}</p>
                  <p className="text-xs text-gray-400 leading-tight">{b.genre} • {b.mood} • {b.bpm} BPM</p>
                </div>
        {current?.id === b.id ? (
                  <span className="text-xs text-[#00B3C6] font-semibold">{t.beats.active}</span>
                ) : (
                  <span className="text-xs text-gray-400">{t.beats.select}</span>
                )}
              </div>
            </li>
          ))}
          {filtered.length === 0 && !error && (
            <li className="p-3 text-sm text-gray-400">{t.beats.none}</li>
          )}
        </ul>
      </div>

    </div>
  );
}