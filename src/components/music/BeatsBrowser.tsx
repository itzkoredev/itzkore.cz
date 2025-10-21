"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Music2, Sparkles } from "lucide-react";
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
  const update = (_: any) => {};

  // Load beats from local JSON store
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/data/beats.json');
        if (!res.ok) throw new Error('Failed to load beats');
        const data = await res.json();

        if (!data || data.length === 0) {
          setError(t.beats.errors.noData);
          setBeats([]);
          setCurrent(null);
          return;
        }

        const list = data as Beat[];
        setBeats(list);
        const first = list[0] || null;
        setCurrent(first);
        if (first) {
          update({ meta: { id: first.id, title: first.title, subtitle: `${first.genre} • ${first.bpm} BPM`, url: first.url } });
        }
      } catch (e: any) {
        setError(e?.message ? `${t.beats.errors.generic}: ${e.message}` : t.beats.errors.generic);
        setBeats([]);
        setCurrent(null);
      }
    }
    load();
  }, [t.beats.errors.noData, t.beats.errors.generic]);

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
    <div className="space-y-8">
      {/* Player Card - Modern Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated p-6"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-rose-600/5 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600">
              <Music2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">{t.beats.player}</h3>
          </div>

          {current ? (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">{current.title}</h4>
                  <p className="text-sm text-text-secondary">
                    {current.genre} • {current.mood} • {current.bpm} BPM
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20">
                  <Sparkles className="w-4 h-4 text-red-600 inline mr-1" />
                  <span className="text-xs font-medium text-red-600">{t.beats.active}</span>
                </div>
              </div>

              <BeatPlayer
                ref={playerRef}
                src={current.url}
                storagePath={!/^https?:\/\//i.test(current.url)}
                autoPlayOnSrcChange={false}
                vizHeight={200}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </div>
          ) : (
            <div className="py-12 text-center">
              <Music2 className="w-12 h-12 text-text-tertiary mx-auto mb-3 opacity-50" />
              <p className="text-text-secondary">{t.beats.pickPrompt}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-text-secondary" />
          <h3 className="text-lg font-bold text-text-primary">{t.beats.listTitle}</h3>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {t.beats.genre}
            </label>
            <select
              className="w-full bg-bg-secondary border border-border-subtle rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">{t.beats.all}</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[140px]">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {t.beats.mood}
            </label>
            <select
              className="w-full bg-bg-secondary border border-border-subtle rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all"
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
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-4 py-2.5 rounded-lg border border-border-subtle bg-bg-secondary text-text-primary hover:bg-bg-elevated transition-colors text-sm font-medium"
              onClick={() => { setGenre(""); setMood(""); }}
            >
              {t.beats.clearFilters}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Beat List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-border-subtle bg-bg-elevated overflow-hidden"
      >
        <ul ref={listRef} className="divide-y divide-border-subtle max-h-[50vh] overflow-auto">
          {filtered.map((b, index) => (
            <motion.li
              key={b.id}
              data-id={b.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`p-4 cursor-pointer transition-all ${
                current?.id === b.id
                  ? "bg-rose-500/10 border-l-4 border-l-rose-500"
                  : "hover:bg-bg-secondary border-l-4 border-l-transparent"
              }`}
              onClick={() => {
                setCurrent(b);
                update({ meta: { id: b.id, title: b.title, subtitle: `${b.genre} • ${b.bpm} BPM`, url: b.url } });
                if (playerRef.current) {
                  playerRef.current.setSource(b.url, !/^https?:\/\//i.test(b.url));
                }
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-text-primary truncate">{b.title}</h4>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {b.genre} • {b.mood} • {b.bpm} BPM
                  </p>
                </div>

                {current?.id === b.id ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs font-semibold text-rose-500">{t.beats.active}</span>
                  </div>
                ) : (
                  <span className="text-xs text-text-tertiary px-3 py-1">{t.beats.select}</span>
                )}
              </div>
            </motion.li>
          ))}

          {filtered.length === 0 && !error && (
            <li className="p-8 text-center">
              <Music2 className="w-12 h-12 text-text-tertiary mx-auto mb-3 opacity-30" />
              <p className="text-text-secondary">{t.beats.none}</p>
            </li>
          )}
        </ul>
      </motion.div>
    </div>
  );
}
