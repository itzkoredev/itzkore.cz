"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "../lib/i18n";

export default function Hero2077() {
  const { t } = useI18n();
  const [typed, setTyped] = useState("");
  const msg = t.hero.welcome as string;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef1 = useRef<HTMLDivElement | null>(null);
  const parallaxRef2 = useRef<HTMLDivElement | null>(null);

  // typing effect
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(msg.slice(0, i++));
      if (i > msg.length) clearInterval(id);
    }, 30);
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
      if (parallaxRef1.current) parallaxRef1.current.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
      if (parallaxRef2.current) parallaxRef2.current.style.transform = `translate3d(${x * -18}px, ${y * -18}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden select-none">
      {/* base gradient + grid */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f19] to-black bg-grid opacity-90 pointer-events-none" />
      {/* neon spots parallax layer */}
  <div ref={parallaxRef1} className="absolute inset-0 bg-neon-spots opacity-70 mix-blend-screen pointer-events-none" />
      {/* scanlines + vignette */}
      <div className="scanlines absolute inset-0 opacity-35 pointer-events-none" />
      <div className="vignette absolute inset-0 pointer-events-none" />

      {/* content */}
      <div className="relative z-10 h-full container flex flex-col justify-center">
        <div className="max-w-4xl">
          <h1 className="glitch text-6xl md:text-7xl font-extrabold drop-shadow-neonPurple" data-text="itzKORE">
            itzKORE
          </h1>
          <p className="mt-4 text-neonCyan/80 text-sm md:text-base tracking-widest">{typed}<span className="animate-pulse">▌</span></p>
        </div>

        {/* HUD panels */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="hud glass p-4">
            <h3 className="text-sm text-gray-300">{t.hero.systemStatus}</h3>
            <div className="hud-line mt-3" />
            <ul className="mt-3 text-xs text-gray-400 space-y-1">
              <li>Kernel: XR-NEON 2.7</li>
              <li>Audio Engine: ACTIVE</li>
              <li>GPU Shaders: ONLINE</li>
            </ul>
          </div>
          <div className="hud glass p-4" ref={parallaxRef2}>
            <h3 className="text-sm text-gray-300">{t.hero.channels}</h3>
            <div className="hud-line mt-3" />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
              <Link href="/music" className="chip hover:ring-1 hover:ring-white/15">MUSIC</Link>
              <Link href="/games" className="chip hover:ring-1 hover:ring-white/15">GAMES</Link>
              <Link href="/apps" className="chip hover:ring-1 hover:ring-white/15">APPS</Link>
            </div>
          </div>
          <div className="hud glass p-4">
            <h3 className="text-sm text-gray-300">{t.hero.coordinates}</h3>
            <div className="hud-line mt-3" />
            <p className="mt-3 text-xs text-gray-400">Prague // 50.0755°N, 14.4378°E</p>
          </div>
        </div>
      </div>
    </section>
  );
}
