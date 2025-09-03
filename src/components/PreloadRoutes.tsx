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
    const run = () => {
      for (const href of HEAVY_ROUTES) {
        try { router.prefetch(href); } catch {}
      }
    };
    // Prefer idle prefetch, fallback to small delay
    if (typeof (window as any).requestIdleCallback === "function") {
      (window as any).requestIdleCallback(run, { timeout: 1800 });
    } else {
      setTimeout(run, 500);
    }
  }, [router]);

  return null;
}
