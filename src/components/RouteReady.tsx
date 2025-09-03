"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteReady() {
  const pathname = usePathname();
  useEffect(() => {
    // signal after next frame to ensure layout is painted
    const id = requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("route-glitch-ready"));
      window.dispatchEvent(new CustomEvent("route-progress-start")); // ensure bar is visible until ready
      // immediately complete progress as we signal ready
      window.dispatchEvent(new CustomEvent("route-progress-complete"));
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}
