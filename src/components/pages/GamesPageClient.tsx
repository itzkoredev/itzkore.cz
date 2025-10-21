"use client";
import Image from "next/image";
import { useI18n } from "../../lib/i18n";

export default function GamesPageClient() {
  const { t } = useI18n();
  return (
    <section className="container py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-text-primary">{t.games.title}</h1>
        <p className="mt-3 text-text-secondary max-w-prose">{t.games.blurb}</p>
        {t.games.experience && (
          <p className="mt-2 text-sm text-text-tertiary italic">
            {t.games.experience}
          </p>
        )}
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        <a
          className="block rounded-lg border border-border-subtle bg-bg-elevated p-5 hover:bg-bg-secondary transition"
          href="https://www.itzkore.cz/cybersurvivor"
          onClick={() => { window.dispatchEvent(new CustomEvent("route-glitch-start")); window.dispatchEvent(new CustomEvent("route-progress-start")); }}
        >
      <div className="relative h-32 rounded-md overflow-hidden border border-border-subtle bg-bg-secondary">
            <Image
        src="/covers/games/cybersurvivor.png"
              alt="CyberSurvivor"
              fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABJ4u4egAAAABJRU5ErkJggg=="
              style={{ objectFit: "cover" }}
              priority={false}
            />
          </div>
          <h3 className="mt-3 text-lg font-semibold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">{t.games.cardTitle}</h3>
          <p className="text-sm text-text-secondary">{t.games.cardBlurb}</p>
        </a>
      </div>
    </section>
  );
}
