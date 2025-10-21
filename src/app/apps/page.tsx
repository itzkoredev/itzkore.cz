import AppsPageClient from "../../components/pages/AppsPageClient";
import StructuredData from "../../components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aplikace | Web development a utility projekty",
  description:
    "Vývoj webových aplikací a nástrojů. Volby 2025 - interaktivní volební kalkulačka. CrossIt - pokročilý textový editor (ve vývoji).",
  keywords: [
    "web developer",
    "React developer",
    "Next.js",
    "volební kalkulačka",
    "web aplikace",
    "Czech web dev",
  ],
  alternates: {
    canonical: "/apps",
    languages: {
      cs: "/apps",
      en: "/apps",
    },
  },
  openGraph: {
    title: "Aplikace | Web development by itzKORE",
    description:
      "Vývoj webových aplikací. Volby 2025 - volební kalkulačka. CrossIt - textový editor.",
    url: "https://itzkore.cz/apps",
    type: "website",
    images: ["/og-apps.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aplikace | Web development by itzKORE",
    description: "Vývoj webových aplikací a nástrojů.",
    images: ["/og-apps.png"],
  },
};

const appsStructuredData = {
  name: "itzKORE Web Applications",
  description: "Web application development including election calculator and text editor projects.",
  url: "https://itzkore.cz/apps",
  applicationCategory: "WebApplication",
  creator: {
    "@type": "Person",
    name: "itzKORE",
  },
};

export default function AppsPage() {
  return (
    <>
      <StructuredData type="SoftwareApplication" data={appsStructuredData} />
      <AppsPageClient />
    </>
  );
}

