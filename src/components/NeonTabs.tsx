"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Tab = {
  label: string;
  href: string;
  accent?: "neonPink";
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
    const color = "#ec4899"; // pink-500 - unified for Music
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
      {/* Subtle separator line */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />

      <nav ref={containerRef} className="relative flex items-center gap-3 overflow-x-auto py-3 px-3">
        {/* Animated glow indicator */}
        <div
          className="pointer-events-none absolute top-2 bottom-2 z-0 rounded-full transition-all duration-500 ease-out"
          style={{
            left: indicator.left,
            width: indicator.width,
            background: `linear-gradient(135deg, ${indicator.color}15, ${indicator.color}08)`,
            boxShadow: `0 0 20px ${indicator.color}30, 0 0 40px ${indicator.color}15, inset 0 0 0 1px ${indicator.color}20`,
            filter: 'blur(0.5px)',
          }}
        />

        {tabs.map((t) => {
          const active = activeHref === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              ref={(el) => {
                linkRefs.current[t.href] = el;
              }}
              onClick={() => {
                window.dispatchEvent(new CustomEvent("route-glitch-start"));
                window.dispatchEvent(new CustomEvent("route-progress-start"));
              }}
              onMouseEnter={() => {
                try {
                  router.prefetch(t.href);
                } catch {}
              }}
              onFocus={() => {
                try {
                  router.prefetch(t.href);
                } catch {}
              }}
              aria-current={active ? "page" : undefined}
              className={[
                "group relative z-10 px-5 py-2.5 rounded-full select-none transition-all duration-300",
                "text-xs uppercase tracking-widest font-semibold",
                active
                  ? "text-rose-400"
                  : "text-text-secondary hover:text-text-primary",
              ].join(" ")}
            >
              {/* Hover glow effect */}
              <span
                className={[
                  "pointer-events-none absolute inset-0 rounded-full transition-all duration-500",
                  active
                    ? "bg-rose-500/10 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                    : "bg-transparent group-hover:bg-rose-500/5 group-hover:shadow-[0_0_10px_rgba(236,72,153,0.1)]",
                ].join(" ")}
                aria-hidden
              />

              {/* Text */}
              <span className="relative z-10">{t.label}</span>

              {/* Active underline */}
              {active && (
                <span
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1 h-px w-8 bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                  aria-hidden
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
