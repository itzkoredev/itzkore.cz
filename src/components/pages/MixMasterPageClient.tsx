"use client";
import { useI18n } from "../../lib/i18n";

export default function MixMasterPageClient() {
  const { t } = useI18n();
  return (
    <section className="container py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold drop-shadow-neonCyan">{t.mix.title}</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="hud-card p-4">
          <h3 className="text-lg font-semibold">{t.mix.sections.single.title}</h3>
          <p className="mt-1 text-sm text-gray-300">{t.mix.sections.single.blurb}</p>
          <ul className="mt-3 text-sm text-gray-300 list-disc pl-5 space-y-1">
            {t.mix.sections.single.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
          </ul>
          <p className="mt-4 text-xs text-gray-400">{t.mix.sections.single.price}</p>
        </div>
        <div className="hud-card p-4 border-[#00B3C680]">
          <h3 className="text-lg font-semibold">{t.mix.sections.stem.title}</h3>
          <p className="mt-1 text-sm text-gray-300">{t.mix.sections.stem.blurb}</p>
          <ul className="mt-3 text-sm text-gray-300 list-disc pl-5 space-y-1">
            {t.mix.sections.stem.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
          </ul>
          <p className="mt-4 text-xs text-gray-400">{t.mix.sections.stem.price}</p>
        </div>
        <div className="hud-card p-4">
          <h3 className="text-lg font-semibold">{t.mix.sections.full.title}</h3>
          <p className="mt-1 text-sm text-gray-300">{t.mix.sections.full.blurb}</p>
          <ul className="mt-3 text-sm text-gray-300 list-disc pl-5 space-y-1">
            {t.mix.sections.full.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
          </ul>
          <p className="mt-4 text-xs text-gray-400">{t.mix.sections.full.price}</p>
        </div>
      </div>

      <div className="hud-card p-4">
        <h3 className="text-lg font-semibold">{t.mix.how.title}</h3>
        <ol className="mt-3 list-decimal pl-5 space-y-1 text-sm text-gray-300">
          {t.mix.how.steps.map((s: string, i: number) => <li key={i}>{s}</li>)}
        </ol>
        <p className="mt-3 text-xs text-gray-400">{t.mix.how.delivery}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a href="/kontakt" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition bg-[#00B3C620] border-[#00B3C640] text-white hover:bg-[#00B3C633]">{t.mix.cta}</a>
        <a href="/music/portfolio" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition border-white/20 text-white hover:bg-white/10">{t.mix.work}</a>
      </div>
    </section>
  );
}
