"use client";
import { useI18n } from "../../lib/i18n";
import TypingIntro from "./TypingIntro";

export default function IntroCard() {
  const { t } = useI18n();
  // Split the long paragraph into cinematic sentences (robust) and dedupe adjacent identical items
  const raw = String((t.intro.body as string) ?? "");
  const matches = raw.match(/[^.!?]+[.!?]+/gu) || [];
  const tail = raw.slice(matches.join("").length).trim();
  const parts = [...matches.map((s) => s.trim()), ...(tail ? [tail] : [])];
  const lines = parts.reduce<string[]>((acc, cur) => {
    const s = cur.replace(/\s+/g, " ").trim();
    if (!s) return acc;
    if (acc.length === 0 || acc[acc.length - 1] !== s) acc.push(s);
    return acc;
  }, []);
  return (
    <div className="relative p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-neonCyan">itzKORE — Intro</h1>
      <TypingIntro
        lines={lines}
        speedMs={24}
        gapMs={750}
        className="mt-6 max-w-3xl"
      />
      <div className="mt-10 h-10 rounded-lg bg-gradient-to-r from-[#00B3C622] via-transparent to-[#7A00FF22] blur-sm" />
    </div>
  );
}
