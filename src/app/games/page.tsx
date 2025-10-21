import GamesPageIntro from "../../components/pages/GamesPageIntro";
import GamesDetailContent from "../../components/pages/GamesDetailContent";
import StructuredData from "../../components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hry | Game development a herní projekty",
  description:
    "CyberSurvivor - můj aktuální herní projekt. Zkušenosti z herního průmyslu (SPM, Bohemia Interactive). Vývoj survival akcí a indie her.",
  keywords: [
    "game developer",
    "CyberSurvivor",
    "indie game",
    "survival game",
    "Bohemia Interactive",
    "Czech game dev",
  ],
  alternates: {
    canonical: "/games",
    languages: {
      cs: "/games",
      en: "/games",
    },
  },
  openGraph: {
    title: "Hry | Game development by itzKORE",
    description:
      "CyberSurvivor a zkušenosti z herního průmyslu (SPM, Bohemia Interactive).",
    url: "https://itzkore.cz/games",
    type: "website",
    images: ["/og-games.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hry | Game development by itzKORE",
    description: "CyberSurvivor a zkušenosti z herního průmyslu.",
    images: ["/og-games.png"],
  },
};

const gamesStructuredData = {
  name: "itzKORE Game Development",
  description: "Game development projects including CyberSurvivor and experience from gaming industry.",
  url: "https://itzkore.cz/games",
  creator: {
    "@type": "Person",
    name: "itzKORE",
  },
};

export default function GamesPage() {
  return (
    <>
      <StructuredData type="CreativeWork" data={gamesStructuredData} />
      <GamesPageIntro />
      <div id="projects">
        <GamesDetailContent />
      </div>
    </>
  );
}
