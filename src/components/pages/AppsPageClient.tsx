"use client";
import { useI18n } from "../../lib/i18n";

export default function AppsPageClient() {
  const { t } = useI18n();
  return (
    <section className="container py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold drop-shadow-neonPink">{t.apps.title}</h1>
        <p className="mt-3 text-gray-300 max-w-prose">{t.apps.blurb}</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Volby 2025 App */}
        <a 
          href="https://itzkore.cz/volby2025" 
          target="_blank" 
          rel="noopener noreferrer"
          className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-5 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-colors group"
        >
          <h3 className="text-lg font-semibold text-cyan-300 group-hover:text-cyan-200 mb-2">
            {t.apps.volby2025.title}
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            {t.apps.volby2025.description}
          </p>
          <span className="text-cyan-400 text-sm font-medium">
            {t.apps.volby2025.link} →
          </span>
        </a>
        
        {/* Placeholder apps */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-5">{t.apps.coming}</div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-5">{t.apps.coming}</div>
      </div>
    </section>
  );
}
