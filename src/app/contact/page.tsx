import ContactPageClient from "../../components/pages/ContactPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Spolupráce na hudebních a vývojových projektech",
  description:
    "Máte dotaz nebo chcete spolupracovat na hudebním projektu, aplikaci nebo hře? Kontaktujte mě pro konzultaci a cenovou nabídku.",
  alternates: {
    canonical: "/contact",
    languages: {
      cs: "/contact",
      en: "/contact",
    },
  },
  openGraph: {
    title: "Kontakt | itzKORE",
    description: "Kontaktujte mě pro spolupráci na hudebních nebo vývojových projektech.",
    url: "https://itzkore.cz/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kontakt | itzKORE",
    description: "Kontaktujte mě pro spolupráci na hudebních nebo vývojových projektech.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
