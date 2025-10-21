"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HEAVY_ROUTES = [
  "/music/portfolio",
  "/music/beats",
  "/music/mix-master",
];

export default function PreloadRoutes() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    
    const run = async () => {
      if (cancelled) return;
      
      for (const href of HEAVY_ROUTES) {
        if (cancelled) break;
        try {
          await router.prefetch(href);
        } catch (error) {
          console.warn(`[PreloadRoutes] Failed to prefetch ${href}:`, error);
        }
      }
    };
    
    // Prefer idle prefetch, fallback to small delay
    if (typeof (window as any).requestIdleCallback === "function") {
      const idleId = (window as any).requestIdleCallback(run, { timeout: 1800 });
      return () => {
        cancelled = true;
        (window as any).cancelIdleCallback(idleId);
      };
    } else {
      const timeoutId = setTimeout(run, 500);
      return () => {
        cancelled = true;
        clearTimeout(timeoutId);
      };
    }
  }, [router]);

  return null;
}
