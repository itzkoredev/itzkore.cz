import React from "react";

interface StructuredDataProps {
  type: "Person" | "WebSite" | "CreativeWork" | "MusicRecording" | "SoftwareApplication";
  data: Record<string, any>;
}

/**
 * Component for adding JSON-LD structured data to pages
 * Improves SEO by providing explicit semantic information to search engines
 */
export default function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

// Predefined structured data templates
export const personData = {
  name: "itzKORE",
  alternateName: "Kore",
  jobTitle: "Music Producer & Sound Engineer",
  url: "https://itzkore.cz",
  sameAs: [
    "https://www.instagram.com/itzkore",
    "https://open.spotify.com/artist/itzkore",
    "https://www.youtube.com/@itzkore",
  ],
  knowsAbout: [
    "Music Production",
    "Sound Engineering",
    "Mix & Mastering",
    "Trap Music",
    "Drill Music",
    "Beat Making",
    "Game Development",
    "Web Development",
  ],
  description:
    "Professional music producer and sound engineer specializing in trap and drill music, with experience in game and web development.",
};

export const websiteData = {
  name: "itzKORE",
  url: "https://itzkore.cz",
  description:
    "Professional music production, mix & mastering services, and software development portfolio.",
  author: {
    "@type": "Person",
    name: "itzKORE",
  },
  inLanguage: ["cs", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://itzkore.cz/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};
