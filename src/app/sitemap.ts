import type { MetadataRoute } from "next";
import { allStartupSlugs } from "@/lib/startups";

const BASE = "https://www.claremontaccelerator.com";

// Static routes plus one entry per startup detail page. /l/[slug] is excluded —
// those are redirect-only vanity links, not content.
const STATIC_PATHS = ["", "/startups", "/team", "/found", "/found/cohort", "/intern", "/mentor", "/support"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PATHS.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const })),
    ...allStartupSlugs().map((slug) => ({
      url: `${BASE}/startups/${slug}`,
      changeFrequency: "monthly" as const,
    })),
  ];
}
