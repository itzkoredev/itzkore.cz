import Link from "next/link";
import Image from "next/image";
export const metadata = { title: "Projekty", description: "Vybrané projekty itzKORE.", alternates: { canonical: "/projekty" } };

export default function ProjectsPage() {
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-bold">Projekty</h1>
      <p className="mt-4 text-gray-300">Níže najdeš vybrané projekty.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/projekty/cybersurvivor"
          className="block rounded-lg border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
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
          <h2 className="text-xl font-semibold">CyberSurvivor</h2>
          <p className="mt-2 text-sm text-gray-300">
            Akční survival hra — detail projektu a ukázky.
          </p>
        </Link>
        {/* Další projekty přidáme později */}
      </div>
    </section>
  );
}
