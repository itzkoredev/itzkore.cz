"use client";
import Image from "next/image";
import { useI18n } from "../../lib/i18n";

export default function GamesPageClient() {
  const { t } = useI18n();
  return (
    <section className="container py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold drop-shadow-neonGreen">{t.games.title}</h1>
        <p className="mt-3 text-gray-300 max-w-prose">{t.games.blurb}</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        <a
          className="block rounded-lg border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
          href="https://www.itzkore.cz/cybersurvivor"
          onClick={() => { window.dispatchEvent(new CustomEvent("route-glitch-start")); window.dispatchEvent(new CustomEvent("route-progress-start")); }}
        >
      <div className="relative h-32 rounded-md overflow-hidden border border-white/10 bg-black/60">
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
          <h3 className="mt-3 text-lg font-semibold text-neonCyan drop-shadow-neonCyan">{t.games.cardTitle}</h3>
          <p className="text-sm text-gray-300">{t.games.cardBlurb}</p>
        </a>
      </div>
    </section>
  );
}
