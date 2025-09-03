"use client";
import { useI18n } from "../../lib/i18n";

export default function ContactPageClient() {
  const { t } = useI18n();
  return (
    <section className="container py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold drop-shadow-neonPurple">{t.contact.title}</h1>
        <p className="mt-3 text-gray-300 max-w-prose">{t.contact.blurb}</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="hud-card p-5">
          <h2 className="font-semibold mb-2">{t.contact.email}</h2>
          <p className="text-gray-300"><a href="mailto:K9SKORE@gmail.com" className="underline">K9SKORE@gmail.com</a></p>
        </div>
        <div className="hud-card p-5">
          <h2 className="font-semibold mb-2">{t.contact.socials}</h2>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>GitHub: <a className="underline" href="https://github.com/itzKORE" target="_blank" rel="noreferrer noopener">itzKORE</a></li>
            <li>Instagram: <a className="underline" href="https://instagram.com/itzkore_" target="_blank" rel="noreferrer noopener">@itzkore_</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
