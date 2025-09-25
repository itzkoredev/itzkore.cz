"use client";
import { useState } from "react";
import { useI18n } from "../lib/i18n";

export default function ElectionBanner() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(() => {
    // Check if user has dismissed the banner (localStorage)
    if (typeof window !== 'undefined') {
      return localStorage.getItem('election-banner-dismissed') !== 'true';
    }
    return true;
  });

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('election-banner-dismissed', 'true');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-b border-cyan-500/30 relative">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <span className="text-cyan-300 font-semibold">🗳️ Volby 2025</span>
            <span className="text-gray-300">
              Podívej se na mou volební kalkulačku a informační web
            </span>
            <a
              href="https://itzkore.cz/volby2025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-medium underline decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-colors"
            >
              itzkore.cz/volby2025 →
            </a>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-300 transition-colors ml-4 p-1"
            aria-label="Zavřít banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}