"use client";
import { useI18n } from "../../lib/i18n";

export default function AboutPageClient() {
  const { t } = useI18n();
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-bold">{t.about.title}</h1>
      <p className="mt-4 text-gray-300">{t.about.blurb}</p>
    </section>
  );
}
