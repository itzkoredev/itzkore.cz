"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  ids: string[]; // Spotify track IDs
};

export default function SpotifyCarousel({ ids }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const bars = 48;
  const eqRef = useRef<HTMLCanvasElement | null>(null);
  const energyRef = useRef(0.35);
  const rafRef = useRef<number | null>(null);

  // Prebuild slides
  const slides = useMemo(() => ids.map((id) => ({ id })), [ids]);

  // Basic auto-advance
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let hold = 4000; // ms per slide
    let t = 0;
    let last = performance.now();
    let raf: number;
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      t += dt;
      if (t >= hold) {
        t = 0;
        const next = (active + 1) % slides.length;
        setActive(next);
        const child = el.children[next] as HTMLElement | undefined;
        if (child) child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, slides.length]);

  // EQ placeholder animation (time-based noise + easing) — upgraded later to real audio when preview URLs are available
  useEffect(() => {
    const canvas = eqRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);
    const onResize = () => {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    const state = new Float32Array(bars).fill(0);
    const target = new Float32Array(bars).fill(0);
    const speed = new Float32Array(bars).fill(0.1);
    for (let i = 0; i < bars; i++) speed[i] = 0.06 + (i / bars) * 0.08;

    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      // vary energy gently; boost when user hovers (set by pointer handlers)
      const energy = energyRef.current;
      for (let i = 0; i < bars; i++) {
        const base = 0.25 + Math.sin((now * 0.001 + i * 0.35) * (0.5 + energy)) * 0.5;
        const jitter = (Math.random() - 0.5) * 0.15 * (0.5 + energy);
        target[i] = Math.max(0, Math.min(1, base + jitter));
        state[i] += (target[i] - state[i]) * speed[i] * (dt / 16);
      }

      ctx.clearRect(0, 0, w, h);
      // gradient stroke
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#00E5FF");
      grad.addColorStop(1, "#7A00FF");
      ctx.fillStyle = grad;

      const barW = w / bars;
      for (let i = 0; i < bars; i++) {
        const x = i * barW + 1;
        const hh = (state[i] ** 1.8) * h;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(x, h - hh, Math.max(1, barW - 2), hh);
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [bars]);

  // pointer to boost energy
  const onEnter = () => (energyRef.current = 0.75);
  const onLeave = () => (energyRef.current = 0.35);

  return (
    <div className="neon-carousel" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="carousel-track" ref={containerRef}>
        {slides.map((s, i) => (
          <article
            key={s.id}
            className={`carousel-card ${i === active ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            <div className="card-bg" />
            <div className="card-inner">
              <iframe
                className="spotify-frame"
                src={`https://open.spotify.com/embed/track/${s.id}?utm_source=generator&theme=0`}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                title={`Spotify track ${s.id}`}
              />
              <canvas ref={eqRef} className="eq-overlay" />
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button key={i} aria-label={`Slide ${i + 1}`} className={`dot ${i === active ? "on" : ""}`} onClick={() => setActive(i)} />
        ))}
      </div>
    </div>
  );
}
