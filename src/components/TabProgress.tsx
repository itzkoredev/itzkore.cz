"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function TabProgress({ height = 2 }: { height?: number }) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const runRef = useRef(0);

  // Start on custom event (from tab/link click)
  useEffect(() => {
    const start = () => {
      runRef.current += 1;
      const run = runRef.current;
      setActive(true);
      setProgress(0.05);
      if (timerRef.current) window.clearInterval(timerRef.current);
      const startedAt = performance.now();
      timerRef.current = window.setInterval(() => {
        if (runRef.current !== run) return;
        const t = Math.min(1, (performance.now() - startedAt) / 1600);
        // Ease to ~90%
        const eased = 0.9 * (1 - Math.pow(1 - t, 3));
        setProgress((p) => Math.max(p, eased));
      }, 100);
    };
    window.addEventListener("route-progress-start", start as EventListener);
    const completeNow = () => {
      runRef.current += 1;
      setActive(true);
      setProgress(1);
      const t = window.setTimeout(() => {
        setActive(false);
        setProgress(0);
        if (timerRef.current) window.clearInterval(timerRef.current);
      }, 200);
      return () => window.clearTimeout(t);
    };
    window.addEventListener("route-progress-complete", completeNow as EventListener);
    return () => {
      window.removeEventListener("route-progress-start", start as EventListener);
      window.removeEventListener("route-progress-complete", completeNow as EventListener);
    };
  }, []);

  // Complete on pathname change
  useEffect(() => {
    if (!active) return;
    runRef.current += 1;
    setProgress(1);
    const t = window.setTimeout(() => {
      setActive(false);
      setProgress(0);
      if (timerRef.current) window.clearInterval(timerRef.current);
    }, 300);
    return () => window.clearTimeout(t);
  }, [pathname, active]);

  return (
    <div className="relative h-[2px]" aria-hidden>
      <div
        className={["tab-progress-bar", active ? "opacity-100" : "opacity-0"].join(" ")}
        style={{ height, width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
      />
    </div>
  );
}
