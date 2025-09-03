export const metadata = { title: "Intro — itzKORE", alternates: { canonical: "/music/intro" } };

import IntroCard from "../../../components/music/IntroCard";

export default function MusicIntroPage() {
  return (
    <section className="container py-12">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-black/60 to-black/30">
        {/* holographic glow */}
        <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(ellipse_at_center,rgba(0,179,198,0.25),transparent_60%)]" />
        {/* animated scanlines */}
        <div className="pointer-events-none absolute inset-0 opacity-15 mix-blend-screen" style={{ backgroundImage: "linear-gradient(transparent 95%, rgba(0,255,255,0.25) 96%)", backgroundSize: "100% 4px" }} />
        {/* grid */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

  <IntroCard />
      </div>
    </section>
  );
}
