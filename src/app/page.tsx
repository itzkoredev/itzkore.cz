import HomePageClient from "../components/HomePageClient";
import StructuredData, { personData, websiteData } from "../components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Profesionální hudební produkce, mix & master služby, vývoj her a aplikací. Specializace na trap a drill beaty s temnou atmosférou.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "itzKORE | Music Producer, Sound Engineer & Developer",
    description:
      "Profesionální hudební produkce, mix & master služby, vývoj her a aplikací.",
    url: "https://itzkore.cz",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "itzKORE | Music Producer, Sound Engineer & Developer",
    description:
      "Profesionální hudební produkce, mix & master služby, vývoj her a aplikací.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData type="Person" data={personData} />
      <StructuredData type="WebSite" data={websiteData} />
      <HomePageClient />
    </>
  );
}
