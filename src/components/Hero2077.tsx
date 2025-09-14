"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "../lib/i18n";

export default function Hero2077() {
  const { t } = useI18n();
  const [typed, setTyped] = useState("");
  const msg = t.hero.welcome as string;
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef1 = useRef<HTMLDivElement>(null);
  const parallaxRef2 = useRef<HTMLDivElement>(null);

  // typing effect
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(msg.slice(0, i++));
      if (i > msg.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, [msg]);

  // parallax
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.height / 2) / rect.height;
      if (parallaxRef1.current) parallaxRef1.current.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
      if (parallaxRef2.current) parallaxRef2.current.style.transform = `translate3d(${x * -8}px, ${y * -8}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden select-none">
      {/* base gradient + grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black bg-grid opacity-90 pointer-events-none" />
      {/* neon spots parallax layer */}
      <div ref={parallaxRef1} className="absolute inset-0 bg-neon-spots opacity-70 mix-blend-screen pointer-events-none" />
      {/* scanlines + vignette */}
      <div className="absolute inset-0 bg-scanlines bg-vignette bg-cover opacity-50 pointer-events-none" />

      {/* content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 lg:py-20 text-white">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          itzKORE
        </div>
        <div className="text-xl md:text-2xl lg:text-3xl font-mono mb-8">
          {typed} ▌
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm md:text-base lg:text-lg">
          {/* HUD panels */}
          <div className="flex flex-col">
            <span className="font-bold uppercase mb-1">{t.hero.systemStatus}</span>
            <span>Kernel: XR-NEON 2.7</span>
            <span>Audio Engine: ACTIVE</span>
            <span>GPU Shaders: ONLINE</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold uppercase mb-1">{t.hero.channels}</span>
            <Link href="/music" className="hover:underline">MUSIC</Link>
            <Link href="/games" className="hover:underline">GAMES</Link>
            <Link href="/apps" className="hover:underline">APPS</Link>
          </div>
          <div className="flex flex-col md:col-span-2 lg:col-span-1">
            <span className="font-bold uppercase mb-1">{t.hero.coordinates}</span>
            <span>Prague // 50.0755°N, 14.4378°E</span>
          </div>
        </div>
      </div>
    </div>
  );
}
