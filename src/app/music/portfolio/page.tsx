export const metadata = { title: "My Work", alternates: { canonical: "/music/portfolio" } };
import MainSpotifyPlayer, { SpotifyTrack } from "../../../components/music/MainSpotifyPlayer";

type Track = { id: string; title: string };

// Spotify track IDs (first five come from user request)
const spotlight: SpotifyTrack[] = [
  { id: "2q72eiBqcJdUC5nnsQ9IZC" },
  { id: "7jffYOLZQOvDpe6WZMHuRz" },
  { id: "4892qyZ1bH1b1wpyeAMuiO" },
  { id: "4qRkxmegEppinrBMQzxkKc" },
  { id: "7fyd8wEEOYRKUxTfslCo3S" },
  { id: "2tGV2LL3tRJh9YXJMGX3mh" },
  { id: "0SHuksH1vOQmodOp71cJtG" },
  { id: "6N6vDuesMsBnBPoi3GpBTI" },
  { id: "4clAnNVdcScHVv9evZ90jf" },
];

// (Grid removed; main player shows the spotlight list below as a clean tracklist)

export default function MusicPortfolioPage() {
  return (
  <section className="container py-10 space-y-6">

  <MainSpotifyPlayer tracks={spotlight} />

      <div className="flex gap-3">
        <a href="/contact" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition bg-[#7A00FF20] border-[#7A00FF40] text-white hover:bg-[#7A00FF33]">Chci spolupráci</a>
      </div>
    </section>
  );
}
