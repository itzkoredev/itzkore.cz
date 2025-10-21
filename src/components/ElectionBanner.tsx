"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "../lib/i18n";

// Barevné schéma podle sekce a theme
const getSectionColors = (section: string, isDark: boolean) => {
  const colors = {
    apps: {
      gradient: isDark
        ? 'from-violet-500/15 via-purple-500/15 to-violet-500/15'
        : 'from-violet-500/8 via-purple-500/8 to-violet-500/8',
      text: isDark ? 'text-violet-400' : 'text-violet-600',
      textHover: isDark ? 'text-violet-300' : 'text-violet-700',
      decoration: isDark ? 'decoration-violet-500/50' : 'decoration-violet-600/60',
      decorationHover: isDark ? 'decoration-violet-400' : 'decoration-violet-700',
      icon: '💜',
    },
    games: {
      gradient: isDark
        ? 'from-orange-500/15 via-red-500/15 to-orange-500/15'
        : 'from-orange-500/8 via-red-500/8 to-orange-500/8',
      text: isDark ? 'text-orange-400' : 'text-orange-600',
      textHover: isDark ? 'text-orange-300' : 'text-orange-700',
      decoration: isDark ? 'decoration-orange-500/50' : 'decoration-orange-600/60',
      decorationHover: isDark ? 'decoration-orange-400' : 'decoration-orange-700',
      icon: '🎮',
    },
    music: {
      gradient: isDark
        ? 'from-emerald-500/15 via-teal-500/15 to-emerald-500/15'
        : 'from-emerald-500/8 via-teal-500/8 to-emerald-500/8',
      text: isDark ? 'text-emerald-400' : 'text-emerald-600',
      textHover: isDark ? 'text-emerald-300' : 'text-emerald-700',
      decoration: isDark ? 'decoration-emerald-500/50' : 'decoration-emerald-600/60',
      decorationHover: isDark ? 'decoration-emerald-400' : 'decoration-emerald-700',
      icon: '🎵',
    },
    ai: {
      gradient: isDark
        ? 'from-blue-500/15 via-cyan-500/15 to-blue-500/15'
        : 'from-blue-500/8 via-cyan-500/8 to-blue-500/8',
      text: isDark ? 'text-blue-400' : 'text-blue-600',
      textHover: isDark ? 'text-blue-300' : 'text-blue-700',
      decoration: isDark ? 'decoration-blue-500/50' : 'decoration-blue-600/60',
      decorationHover: isDark ? 'decoration-blue-400' : 'decoration-blue-700',
      icon: '🤖',
    },
    default: {
      gradient: isDark
        ? 'from-pink-500/15 via-purple-500/15 to-violet-500/15'
        : 'from-pink-500/8 via-purple-500/8 to-violet-500/8',
      text: isDark ? 'text-pink-400' : 'text-pink-600',
      textHover: isDark ? 'text-pink-300' : 'text-pink-700',
      decoration: isDark ? 'decoration-pink-500/50' : 'decoration-pink-600/60',
      decorationHover: isDark ? 'decoration-pink-400' : 'decoration-pink-700',
      icon: '📱',
    },
  };

  return colors[section as keyof typeof colors] || colors.default;
};

export default function ElectionBanner() {
  const { t } = useI18n();
  const pathname = usePathname();

  // Detekce dark mode
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initial check
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const [isVisible, setIsVisible] = useState(() => {
    // Check if user has dismissed the banner (localStorage)
    if (typeof window !== 'undefined') {
      return localStorage.getItem('promo-banner-dismissed') !== 'true';
    }
    return true;
  });

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('promo-banner-dismissed', 'true');
    }
  };

  if (!isVisible) return null;

  // Detekce aktuální sekce
  const getCurrentSection = () => {
    if (pathname.startsWith('/apps')) return 'apps';
    if (pathname.startsWith('/games')) return 'games';
    if (pathname.startsWith('/music')) return 'music';
    if (pathname.startsWith('/ai')) return 'ai';
    return 'default';
  };

  const section = getCurrentSection();
  const colors = getSectionColors(section, isDark);

  return (
    <div className={`bg-gradient-to-r ${colors.gradient} border-b border-border-subtle relative transition-all duration-500`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg transition-transform duration-300 hover:scale-110">
              {colors.icon}
            </span>
            <span className={`${colors.text} font-semibold transition-colors duration-300`}>
              Sleva 10%
            </span>
            <span className="text-text-secondary">
              Sleduj{" "}
              <a
                href="https://instagram.com/itzkore_"
                target="_blank"
                rel="noopener noreferrer"
                className={`${colors.text} ${colors.textHover} font-semibold underline ${colors.decoration} ${colors.decorationHover} transition-all duration-300`}
              >
                @itzkore_
              </a>
              {" "}na Instagramu a získej slevu na všechny služby
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-text-secondary hover:text-text-primary transition-colors ml-4 p-1"
            aria-label="Zavřít banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
