"use client";
import { useEffect, useRef, useState } from "react";

// Shows a short glitch animation overlay whenever the route changes
export default function RouteGlitch({ duration = 160, maxCover = 4000, theme = "black" }: { duration?: number; maxCover?: number; theme?: "black" | "silver" | "glitch" }) {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const fallbackRef = useRef<number | null>(null);

  useEffect(() => {
    // Also trigger on early click to hide intermediate UI changes
    const onStart = () => {
      setActive(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
      
      timeoutRef.current = window.setTimeout(() => setActive(false), maxCover);
      
      // Fallback: force hide after 5 seconds if route-glitch-ready never fires
      fallbackRef.current = window.setTimeout(() => {
        setActive(false);
        console.warn('[RouteGlitch] Forced hide after 5s timeout - route may have failed to load');
      }, 5000);
    };
    const onReady = () => {
      // fade out after route painted
      if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
      setTimeout(() => setActive(false), duration);
      // also notify progress bar to finish if listeners exist
      window.dispatchEvent(new CustomEvent("route-progress-complete"));
    };
    const onBeforeUnload = () => {
      setActive(false);
      if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
    };
    window.addEventListener("route-glitch-start", onStart as EventListener);
    window.addEventListener("route-glitch-ready", onReady as EventListener);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("route-glitch-start", onStart as EventListener);
      window.removeEventListener("route-glitch-ready", onReady as EventListener);
      window.removeEventListener("beforeunload", onBeforeUnload);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
    };
  }, [maxCover, duration]);

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none fixed inset-0 z-[100]",
  active ? `route-glitch route-glitch-active route-glitch--${theme}` : "route-glitch",
      ].join(" ")}
    />
  );
}
