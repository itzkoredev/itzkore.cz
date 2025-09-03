"use client";
import { useEffect, useRef, useState } from "react";

// Shows a short glitch animation overlay whenever the route changes
export default function RouteGlitch({ duration = 160, maxCover = 4000, theme = "black" }: { duration?: number; maxCover?: number; theme?: "black" | "silver" | "glitch" }) {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Also trigger on early click to hide intermediate UI changes
    const onStart = () => {
      setActive(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setActive(false), maxCover);
    };
    const onReady = () => {
      // fade out after route painted
      setTimeout(() => setActive(false), duration);
      // also notify progress bar to finish if listeners exist
      window.dispatchEvent(new CustomEvent("route-progress-complete"));
    };
    const onBeforeUnload = () => setActive(false);
    window.addEventListener("route-glitch-start", onStart as EventListener);
    window.addEventListener("route-glitch-ready", onReady as EventListener);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("route-glitch-start", onStart as EventListener);
      window.removeEventListener("route-glitch-ready", onReady as EventListener);
      window.removeEventListener("beforeunload", onBeforeUnload);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
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
