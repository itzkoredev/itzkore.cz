import type { MetadataRoute } from "next";
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://itzkore.cz";
  const routes = [
    "",
    "/music",
    "/music/intro",
    "/music/beats",
    "/music/mix-master",
    "/music/portfolio",
    "/games",
    "/apps",
    "/contact",
    "/projekty",
    "/projekty/cybersurvivor",
  ];
  // Use a build-time timestamp to avoid hardcoding a fixed date
  const now = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return routes.map((p) => ({ url: `${base}${p}`, lastModified: now }));
}
