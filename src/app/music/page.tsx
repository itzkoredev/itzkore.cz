import MusicPageIntro from "../../components/pages/MusicPageIntro";
import MusicDetailContent from "../../components/pages/MusicDetailContent";
import StructuredData from "../../components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music | Hudební produkce, beaty, mix & master",
  description:
    "Profesionální trap a drill beaty, mix & mastering služby pro umělce. Tvrdý low-end, čitelný střed, ostré haty. Portfolio obsahuje spolupráce s českými i zahraničními rappery.",
  keywords: [
    "trap beaty",
    "drill beaty",
    "free beats",
    "beat prodej",
    "mix master trap",
    "mastering drill",
    "808 bass",
    "dark trap",
    "atmospheric beats",
  ],
  alternates: {
    canonical: "/music",
    languages: {
      cs: "/music",
      en: "/music",
    },
  },
  openGraph: {
    title: "Music | Hudební produkce by itzKORE",
    description:
      "Profesionální trap a drill beaty, mix & mastering služby. Tvrdý low-end, čitelný střed, ostré haty.",
    url: "https://itzkore.cz/music",
    type: "website",
    images: ["/og-music.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Music | Hudební produkce by itzKORE",
    description: "Profesionální trap a drill beaty, mix & mastering služby.",
    images: ["/og-music.png"],
  },
};

const musicStructuredData = {
  name: "itzKORE Music Production",
  description:
    "Professional trap and drill music production, beat making, and mix & mastering services.",
  url: "https://itzkore.cz/music",
  genre: ["Trap", "Drill", "Hip Hop"],
  creator: {
    "@type": "Person",
    name: "itzKORE",
  },
};

export default function MusicPage() {
  return (
    <>
      <StructuredData type="CreativeWork" data={musicStructuredData} />
      <MusicPageIntro />
      <div id="music-content">
        <MusicDetailContent />
      </div>
    </>
  );
}
