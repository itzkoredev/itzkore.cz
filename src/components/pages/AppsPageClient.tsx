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
        <div className="rounded-lg border border-white/10 bg-white/5 p-5">{t.apps.coming}</div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-5">{t.apps.coming}</div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-5">{t.apps.coming}</div>
      </div>
    </section>
  );
}
