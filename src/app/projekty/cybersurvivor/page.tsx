import CyberSurvivorClient from "../../../components/pages/CyberSurvivorClient";
import StructuredData from "../../../components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberSurvivor | Cyberpunk survival hra",
  description:
    "CyberSurvivor - akční survival hra v cyberpunk prostředí. Pixel art roguelike s temnou atmosférou a intenzivní hratelností. Projekt ve vývoji.",
  keywords: [
    "CyberSurvivor",
    "cyberpunk game",
    "survival game",
    "indie game",
    "roguelike",
    "pixel art",
    "action game",
  ],
  alternates: {
    canonical: "/projekty/cybersurvivor",
    languages: {
      cs: "/projekty/cybersurvivor",
      en: "/projekty/cybersurvivor",
    },
  },
  openGraph: {
    title: "CyberSurvivor | Cyberpunk survival hra by itzKORE",
    description:
      "Akční survival hra v cyberpunk prostředí. Pixel art roguelike - projekt ve vývoji.",
    url: "https://itzkore.cz/projekty/cybersurvivor",
    type: "website",
    images: ["/covers/games/cybersurvivor.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberSurvivor | Cyberpunk survival hra",
    description: "Akční survival hra v cyberpunk prostředí - projekt ve vývoji.",
    images: ["/covers/games/cybersurvivor.png"],
  },
};

const cyberSurvivorStructuredData = {
  name: "CyberSurvivor",
  description: "Cyberpunk action survival game with pixel art graphics and roguelike mechanics.",
  url: "https://itzkore.cz/projekty/cybersurvivor",
  genre: ["Action", "Survival", "Roguelike"],
  gamePlatform: ["PC"],
  creator: {
    "@type": "Person",
    name: "itzKORE",
  },
  inLanguage: "en",
  workStatus: "In Development",
};

export default function CyberSurvivorPage() {
  return (
    <>
      <StructuredData type="CreativeWork" data={cyberSurvivorStructuredData} />
      <CyberSurvivorClient />
    </>
  );
}
