"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import NeonTabs from "./NeonTabs";
import TabProgress from "./TabProgress";
import { useI18n } from "../lib/i18n";

export default function Header() {
  const pathname = usePathname();
  const isMusic = pathname.startsWith("/music");
  const { t, locale, setLocale } = useI18n();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold drop-shadow-neonPurple pr-3 mr-2 border-r border-white/10">itzKORE</Link>
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] sm:text-sm text-gray-300 max-w-full">
          <Link href="/" className="hover:text-white" onMouseEnter={() => { try { router.prefetch("/"); } catch {} }} onFocus={() => { try { router.prefetch("/"); } catch {} }} onClick={() => { window.dispatchEvent(new CustomEvent("route-glitch-start")); window.dispatchEvent(new CustomEvent("route-progress-start")); }}>{t.nav.home}</Link>
          <Link href="/music/intro" className="hover:text-neonCyan" onMouseEnter={() => { try { router.prefetch("/music/intro"); } catch {} }} onFocus={() => { try { router.prefetch("/music/intro"); } catch {} }} onClick={() => { window.dispatchEvent(new CustomEvent("route-glitch-start")); window.dispatchEvent(new CustomEvent("route-progress-start")); }}>{t.nav.music}</Link>
          <Link href="/games" className="hover:text-white" onMouseEnter={() => { try { router.prefetch("/games"); } catch {} }} onFocus={() => { try { router.prefetch("/games"); } catch {} }} onClick={() => { window.dispatchEvent(new CustomEvent("route-glitch-start")); window.dispatchEvent(new CustomEvent("route-progress-start")); }}>{t.nav.games}</Link>
          <Link href="/apps" className="hover:text-white" onMouseEnter={() => { try { router.prefetch("/apps"); } catch {} }} onFocus={() => { try { router.prefetch("/apps"); } catch {} }} onClick={() => { window.dispatchEvent(new CustomEvent("route-glitch-start")); window.dispatchEvent(new CustomEvent("route-progress-start")); }}>{t.nav.apps}</Link>
          <Link href="/contact" className="hover:text-white" onMouseEnter={() => { try { router.prefetch("/contact"); } catch {} }} onFocus={() => { try { router.prefetch("/contact"); } catch {} }} onClick={() => { window.dispatchEvent(new CustomEvent("route-glitch-start")); window.dispatchEvent(new CustomEvent("route-progress-start")); }}>{t.nav.contact}</Link>
          {/* Language switcher */}
          <div className="ml-1 sm:ml-2 flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => setLocale("cs")}
        className={["h-6 min-w-[1.75rem] px-1.5 rounded border border-white/20 bg-black/30 flex items-center justify-center text-[11px] sm:text-sm",
                locale === "cs" ? "ring-2 ring-[#00B3C6]" : "opacity-75 hover:opacity-100"
              ].join(" ")}
              aria-label="Čeština"
              title="Čeština"
            >
              <svg width="18" height="12" viewBox="0 0 3 2" aria-hidden="true">
                <rect width="3" height="2" fill="#fff"/>
                <rect y="1" width="3" height="1" fill="#d7141a"/>
                <polygon points="0,0 0,2 1.2,1" fill="#11457e"/>
              </svg>
            </button>
            <button
              onClick={() => setLocale("en")}
        className={["h-6 min-w-[1.75rem] px-1.5 rounded border border-white/20 bg-black/30 flex items-center justify-center text-[11px] sm:text-sm",
                locale === "en" ? "ring-2 ring-[#00B3C6]" : "opacity-75 hover:opacity-100"
              ].join(" ")}
              aria-label="English"
              title="English"
            >
              <svg width="18" height="12" viewBox="0 0 60 30" aria-hidden="true">
                <rect width="60" height="30" fill="#012169"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
              </svg>
            </button>
          </div>
        </nav>
      </div>
      {isMusic && (
        <div className="border-t border-white/10">
          <div className="container py-2">
            <NeonTabs
              tabs={[
                { label: t.tabs.intro, href: "/music/intro", accent: "neonCyan" },
                { label: t.tabs.beats, href: "/music/beats", accent: "neonCyan" },
                { label: t.tabs.mixMaster, href: "/music/mix-master", accent: "neonPurple" },
                { label: t.tabs.myWork, href: "/music/portfolio", accent: "neonPink" },
              ]}
            />
            <TabProgress />
          </div>
        </div>
      )}
    </header>
  );
}
