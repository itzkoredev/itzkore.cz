"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import NeonTabs from "./NeonTabs";
import TabProgress from "./TabProgress";
import { useI18n } from "../lib/i18n";
import { ThemeToggle } from "./ThemeToggle";

// Section color schemes - dynamicky podle theme
const getSectionColors = (section: string, isDark: boolean) => {
  const opacity = isDark ? '/20' : '/12';
  const glowOpacity = isDark ? '/20' : '/12';

  const colors = {
    apps: {
      gradient: `from-violet-500${opacity} to-purple-500${opacity}`,
      accent: isDark ? 'violet-400' : 'violet-600',
      glow: `violet-500${glowOpacity}`,
      linkBg: isDark ? 'bg-violet-500/10' : 'bg-violet-500/8',
    },
    games: {
      gradient: `from-orange-500${opacity} to-red-500${opacity}`,
      accent: isDark ? 'orange-400' : 'orange-600',
      glow: `orange-500${glowOpacity}`,
      linkBg: isDark ? 'bg-orange-500/10' : 'bg-orange-500/8',
    },
    music: {
      gradient: `from-pink-500${opacity} to-rose-600${opacity}`,
      accent: isDark ? 'pink-400' : 'pink-600',
      glow: `pink-500${glowOpacity}`,
      linkBg: isDark ? 'bg-pink-500/10' : 'bg-pink-500/8',
    },
    ai: {
      gradient: `from-blue-500${opacity} to-cyan-500${opacity}`,
      accent: isDark ? 'blue-400' : 'blue-600',
      glow: `blue-500${glowOpacity}`,
      linkBg: isDark ? 'bg-blue-500/10' : 'bg-blue-500/8',
    },
    default: {
      gradient: '',
      accent: 'accent-primary',
      glow: '',
      linkBg: '',
    }
  };

  return colors[section as keyof typeof colors] || colors.default;
};

// Music subsection colors - jednotná růžová pro všechny Music podsložky
const getMusicSubsectionColors = (pathname: string, isDark: boolean) => {
  // Jednotná růžová pro všechny Music podsložky (jako Mix & Master)
  if (!isDark) {
    // Light mode - jemná růžová
    return {
      headerGradient: 'from-pink-500/8 to-rose-600/8',
      subnavGradient: 'from-pink-500/5 to-rose-600/5',
    };
  }

  // Dark mode - sytější růžová, jednotná pro všechny záložky
  return {
    headerGradient: 'from-pink-500/12 to-rose-600/12',
    subnavGradient: 'from-pink-500/8 to-rose-600/8',
  };
};

export default function Header() {
  const pathname = usePathname();
  const isMusic = pathname.startsWith("/music");
  // Show sub-navigation only in Music subsections, not on main /music page
  const showMusicSubnav = isMusic && pathname !== "/music";
  const { t, locale, setLocale } = useI18n();
  const router = useRouter();

  // Detekce dark mode
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Detect current section
  const getCurrentSection = () => {
    if (pathname.startsWith('/apps')) return 'apps';
    if (pathname.startsWith('/games')) return 'games';
    if (pathname.startsWith('/music')) return 'music';
    if (pathname.startsWith('/ai')) return 'ai';
    return 'default';
  };

  const currentSection = getCurrentSection();
  const colors = getSectionColors(currentSection, isDark);
  const musicColors = isMusic ? getMusicSubsectionColors(pathname, isDark) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-bg-elevated backdrop-blur-xl shadow-sm transition-all duration-500 overflow-hidden">
      {/* Subtle gradient glow based on section - pro music záložky dynamicky */}
      {isMusic && musicColors ? (
        <div className={`absolute inset-0 bg-gradient-to-r ${musicColors.headerGradient} transition-all duration-700 pointer-events-none`} />
      ) : colors.gradient && (
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} transition-all duration-700 pointer-events-none`} />
      )}
      <div className="container relative">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold tracking-tight text-text-primary hover:text-accent-hover transition-all duration-300 shrink-0 relative group"
            prefetch={true}
            onClick={() => {
              window.dispatchEvent(new CustomEvent("route-glitch-start"));
              window.dispatchEvent(new CustomEvent("route-progress-start"));
            }}
          >
            <span className="relative z-10">ITZKORE</span>
            {colors.glow && currentSection !== 'default' && (
              <div
                className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  backgroundColor: `rgb(var(--color-${currentSection}) / 0.5)`
                }}
              />
            )}
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar text-xs sm:text-sm font-medium shrink min-w-0">
            {[
              { href: '/apps', label: t.nav.apps, section: 'apps', colorLight: '#7c3aed', colorDark: '#a78bfa', minWidth: '60px' },
              { href: '/games', label: t.nav.games, section: 'games', colorLight: '#ea580c', colorDark: '#fb923c', minWidth: '50px' },
              { href: '/music/intro', label: t.nav.music, section: 'music', colorLight: '#ec4899', colorDark: '#f9a8d4', minWidth: '60px' },
              { href: '/ai', label: t.nav.ai, section: 'ai', colorLight: '#2563eb', colorDark: '#60a5fa', minWidth: '45px' },
              { href: '/o-mne', label: t.nav.about, section: 'about', colorLight: '#4b5563', colorDark: '#9ca3af', minWidth: '65px' },
              { href: '/kontakt', label: t.nav.contact, section: 'contact', colorLight: '#4b5563', colorDark: '#9ca3af', minWidth: '65px' },
            ].map(({ href, label, section, colorLight, colorDark, minWidth }) => {
              const isActive = pathname.startsWith(href.split('/')[1] ? `/${href.split('/')[1]}` : href);
              const activeColor = isDark ? colorDark : colorLight;

              return (
                <Link
                  key={href}
                  href={href}
                  prefetch={true}
                  className="relative whitespace-nowrap px-3 py-1.5 rounded-lg shrink-0 transition-all duration-300 text-center"
                  style={{
                    minWidth: minWidth,
                    ...(isActive ? {
                      color: activeColor,
                      fontWeight: 600,
                      backgroundColor: `${activeColor}1a` // 10% opacity
                    } : {})
                  }}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("route-glitch-start"));
                    window.dispatchEvent(new CustomEvent("route-progress-start"));
                  }}
                >
                  <span className={!isActive ? 'text-text-secondary hover:text-text-primary' : ''}>
                    {label}
                  </span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(to right, transparent, ${activeColor}, transparent)`
                      }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="ml-1 sm:ml-2 flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={() => setLocale("cs")}
                className={[
                  "h-7 w-9 flex items-center justify-center rounded border transition hover:bg-bg-primary",
                  locale === "cs" 
                    ? `ring-2 border-${colors.accent}` 
                    : "border-border-subtle opacity-75 hover:opacity-100 bg-bg-secondary",
                ].join(" ")}
                style={locale === "cs" ? {
                  borderColor: currentSection === 'apps' ? (isDark ? '#a78bfa' : '#7c3aed') :
                              currentSection === 'games' ? (isDark ? '#fb923c' : '#ea580c') :
                              currentSection === 'music' ? (isDark ? '#f9a8d4' : '#db2777') :
                              currentSection === 'ai' ? (isDark ? '#60a5fa' : '#2563eb') : undefined,
                  boxShadow: `0 0 0 2px ${
                    currentSection === 'apps' ? (isDark ? '#a78bfa' : '#7c3aed') :
                    currentSection === 'games' ? (isDark ? '#fb923c' : '#ea580c') :
                    currentSection === 'music' ? (isDark ? '#f9a8d4' : '#db2777') :
                    currentSection === 'ai' ? (isDark ? '#60a5fa' : '#2563eb') : 'var(--color-accent-primary)'
                  }`
                } : undefined}
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
                className={[
                  "h-7 w-9 flex items-center justify-center rounded border transition hover:bg-bg-primary",
                  locale === "en" 
                    ? `ring-2 border-${colors.accent}` 
                    : "border-border-subtle opacity-75 hover:opacity-100 bg-bg-secondary",
                ].join(" ")}
                style={locale === "en" ? {
                  borderColor: currentSection === 'apps' ? (isDark ? '#a78bfa' : '#7c3aed') :
                              currentSection === 'games' ? (isDark ? '#fb923c' : '#ea580c') :
                              currentSection === 'music' ? (isDark ? '#f9a8d4' : '#db2777') :
                              currentSection === 'ai' ? (isDark ? '#60a5fa' : '#2563eb') : undefined,
                  boxShadow: `0 0 0 2px ${
                    currentSection === 'apps' ? (isDark ? '#a78bfa' : '#7c3aed') :
                    currentSection === 'games' ? (isDark ? '#fb923c' : '#ea580c') :
                    currentSection === 'music' ? (isDark ? '#f9a8d4' : '#db2777') :
                    currentSection === 'ai' ? (isDark ? '#60a5fa' : '#2563eb') : 'var(--color-accent-primary)'
                  }`
                } : undefined}
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
          <ThemeToggle />
        </div>
      </div>
      {isMusic && (
        <div className="border-t border-border-subtle bg-bg-secondary/30 backdrop-blur-sm relative overflow-hidden">
          {/* Gradient pozadí pro sub-navigaci podle záložky v dark módu */}
          {musicColors && (
            <div className={`absolute inset-0 bg-gradient-to-r ${musicColors.subnavGradient} transition-all duration-700 pointer-events-none`} />
          )}
          <div className="container py-3 relative z-10">
            <NeonTabs
              tabs={[
                { label: t.tabs.intro, href: "/music/intro", accent: "neonPink" },
                { label: t.tabs.beats, href: "/music/beats", accent: "neonPink" },
                { label: t.tabs.mixMaster, href: "/music/mix-master", accent: "neonPink" },
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
