"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LinkButton } from "./ui/Button";
import { useI18n } from "../lib/i18n";

export default function Hero2077() {
  const { t } = useI18n();
  const [typed, setTyped] = useState("");
  const msg = t.hero.welcome as string;
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef1 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(msg.slice(0, i++));
      if (i > msg.length) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [msg]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.height / 2) / rect.height;
      if (parallaxRef1.current) {
        parallaxRef1.current.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden select-none bg-gradient-to-br from-background via-background to-[#E8EDF2] dark:to-[#0F1420]">
      {/* Subtle gradient accent */}
      <div
        ref={parallaxRef1}
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 40%, rgba(0,175,192,0.2), transparent 50%), radial-gradient(circle at 70% 60%, rgba(139,92,246,0.15), transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32 flex flex-col justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            itzKORE
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-muted-foreground mb-10 font-mono">
            {typed}
            <span className="typing-cursor">▌</span>
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <LinkButton href="/music" variant="cyan" className="px-6 py-3 text-base">
              {t.nav.music}
            </LinkButton>
            <LinkButton href="/games" variant="purple" className="px-6 py-3 text-base">
              {t.nav.games}
            </LinkButton>
            <LinkButton href="/apps" variant="primary" className="px-6 py-3 text-base">
              {t.nav.apps}
            </LinkButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm lg:text-base text-muted-foreground max-w-4xl"
        >
          <div className="glass rounded-lg p-6 shadow-glass">
            <h3 className="font-semibold uppercase tracking-wide text-foreground mb-3 text-xs">
              {t.hero.systemStatus}
            </h3>
            <ul className="space-y-1.5 text-subtle-foreground">
              <li>Kernel: XR-NEON 2.7</li>
              <li>Audio Engine: <span className="text-accent">ACTIVE</span></li>
              <li>GPU Shaders: <span className="text-accent">ONLINE</span></li>
            </ul>
          </div>

          <div className="glass rounded-lg p-6 shadow-glass">
            <h3 className="font-semibold uppercase tracking-wide text-foreground mb-3 text-xs">
              {t.hero.channels}
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/music" className="hover:text-accent transition-colors">
                  MUSIC
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-accent transition-colors">
                  GAMES
                </Link>
              </li>
              <li>
                <Link href="/apps" className="hover:text-accent transition-colors">
                  APPS
                </Link>
              </li>
            </ul>
          </div>

          <div className="glass rounded-lg p-6 shadow-glass sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold uppercase tracking-wide text-foreground mb-3 text-xs">
              {t.hero.coordinates}
            </h3>
            <p className="text-subtle-foreground">Prague // 50.0755°N, 14.4378°E</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
