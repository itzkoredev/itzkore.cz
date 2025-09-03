"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Tab = {
  label: string;
  href: string;
  accent?: "neonPurple" | "neonCyan" | "neonGreen" | "neonPink" | "neonRed";
};

export default function NeonTabs({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const activeHref = useMemo(() => {
    // match exact or subsection
    let best = tabs[0]?.href ?? "/";
    for (const t of tabs) {
      if (pathname === t.href || pathname.startsWith(t.href + "/")) {
        best = t.href;
        break;
      }
    }
    return best;
  }, [pathname, tabs]);

  const [indicator, setIndicator] = useState<{ left: number; width: number; color: string }>({ left: 0, width: 0, color: "#00B3C6" });

  useEffect(() => {
    const el = linkRefs.current[activeHref];
    const wrap = containerRef.current;
    if (!el || !wrap) return;
    const r = el.getBoundingClientRect();
    const rw = wrap.getBoundingClientRect();
    const left = r.left - rw.left + wrap.scrollLeft;
    const width = r.width;
    const accent = tabs.find((t) => t.href === activeHref)?.accent ?? "neonCyan";
    const color =
      accent === "neonPurple" ? "#7A00FF" :
      accent === "neonGreen" ? "#1FAA59" :
      accent === "neonPink" ? "#C000FF" :
      accent === "neonRed" ? "#FF0033" : "#00B3C6";
    setIndicator({ left, width, color });
  }, [activeHref, tabs]);

  useEffect(() => {
    const onResize = () => {
      // recompute on resize
      const el = linkRefs.current[activeHref];
      const wrap = containerRef.current;
      if (!el || !wrap) return;
      const r = el.getBoundingClientRect();
      const rw = wrap.getBoundingClientRect();
      setIndicator((prev) => ({ ...prev, left: r.left - rw.left + wrap.scrollLeft, width: r.width }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeHref]);

  return (
    <div className="relative">
      {/* bottom hud line */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <nav ref={containerRef} className="relative flex items-center gap-2 overflow-x-auto py-2 px-2">
        {/* animated indicator */}
        <div
          className="pointer-events-none absolute top-1 bottom-1 z-0 rounded-lg transition-all duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width, boxShadow: `0 0 0 1px #ffffff22 inset, 0 0 24px ${indicator.color}44` }}
        >
          <div className="h-full w-full rounded-lg opacity-30" style={{ background: `linear-gradient(135deg, ${indicator.color}33, transparent)` }} />
        </div>

        {tabs.map((t) => {
          const active = activeHref === t.href;
          const accent = t.accent ?? "neonCyan";
          return (
            <Link
              key={t.href}
              href={t.href}
              ref={(el) => {
                linkRefs.current[t.href] = el;
              }}
              onClick={() => { window.dispatchEvent(new CustomEvent("route-glitch-start")); window.dispatchEvent(new CustomEvent("route-progress-start")); }}
              onMouseEnter={() => { try { router.prefetch(t.href); } catch {} }}
              onFocus={() => { try { router.prefetch(t.href); } catch {} }}
              aria-current={active ? "page" : undefined}
              className={[
                "relative z-10 px-5 py-3 rounded-lg border select-none transition-colors focus-visible:ring-2 focus-visible:ring-[#00B3C6]",
                "bg-black/40 border-white/10 text-gray-300",
                active ? "text-white" : "hover:text-white",
              ].join(" ")}
            >
              <span
                className={[
                  "pointer-events-none absolute inset-0 rounded-lg",
                  "ring-1 ring-inset ring-white/10",
                ].join(" ")}
              />
              <span
                className={[
                  "pointer-events-none absolute -inset-px rounded-lg blur-sm opacity-0 transition-opacity",
                  active ? "opacity-60" : "opacity-0 hover:opacity-40",
                  accent === "neonPurple" && "bg-[#7A00FF40]",
                  accent === "neonCyan" && "bg-[#00B3C640]",
                  accent === "neonGreen" && "bg-[#1FAA5940]",
                  accent === "neonPink" && "bg-[#C000FF40]",
                  accent === "neonRed" && "bg-[#FF003340]",
                ].join(" ")}
                aria-hidden
              />
              <span className="relative z-10 font-semibold tracking-wide text-base">
                {t.label}
              </span>
              <span className="pointer-events-none absolute left-0 right-0 -bottom-[6px] mx-2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
