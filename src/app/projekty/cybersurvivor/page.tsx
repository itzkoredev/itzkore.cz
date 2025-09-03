import Link from "next/link";

export const metadata = {
  title: "CyberSurvivor – Projekt",
  description: "Detail projektu CyberSurvivor",
  openGraph: {
    title: "CyberSurvivor – Projekt",
  description: "Akční survival hra od itzKORE.",
    type: "website",
  },
  alternates: { canonical: "/projekty/cybersurvivor" },
};

export default function CyberSurvivorPage() {
  return (
    <section className="container py-10">
      <div className="mb-6 text-sm text-gray-400">
        <Link href="/projekty" className="hover:text-white">← Zpět na projekty</Link>
      </div>

      <h1 className="text-3xl font-bold">CyberSurvivor</h1>
      <p className="mt-4 text-gray-300 max-w-prose">
        Akční survival hra v kyberpunkovém světě. Tady bude finální popis, trailer,
        screenshoty a odkaz ke stažení či hraní online.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="aspect-video w-full rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400">
          {/* Placeholder: trailer / video */}
          Trailer placeholder (nahradit URL videa)
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-gray-300">
          <h2 className="text-lg font-semibold">Informace</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
            <li>Žánr: Survival / Action</li>
            <li>Platformy: PC (další později)</li>
            <li>Stav: Vývoj</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="h-40 rounded-md border border-white/10 bg-white/5 flex items-center justify-center text-gray-400">
          Screenshot 1 (placeholder)
        </div>
        <div className="h-40 rounded-md border border-white/10 bg-white/5 flex items-center justify-center text-gray-400">
          Screenshot 2 (placeholder)
        </div>
        <div className="h-40 rounded-md border border-white/10 bg-white/5 flex items-center justify-center text-gray-400">
          Screenshot 3 (placeholder)
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <a className="rounded bg-white text-black px-4 py-2 font-medium hover:bg-gray-200" href="#" aria-disabled>
          Stáhnout (brzy)
        </a>
        <a className="rounded border border-white/20 px-4 py-2 font-medium hover:bg-white/10" href="#" aria-disabled>
          Web / Repo (brzy)
        </a>
      </div>
    </section>
  );
}
