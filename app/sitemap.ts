import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { searchIndex } from "@/data/search-index";
import { liveCategories } from "@/data/categories";

export const dynamic = "force-static";

/**
 * Sitemap builds itself from the same sources pages register in:
 * category list + search index. Publishing flow for every new page:
 *   1. create the page  2. add it to data/search-index.ts → done.
 */
/**
 * next.config.ts sets trailingSlash: true, so every page is served at a
 * trailing-slash URL; sitemap entries must match or they 301-redirect.
 */
function canonicalUrl(path: string): string {
  const url = absoluteUrl(path);
  return url.endsWith("/") ? url : `${url}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: canonicalUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...liveCategories.map((category) => ({
      url: canonicalUrl(`/${category.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...["/about", "/contact", "/privacy", "/terms"].map((path) => ({
      url: canonicalUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];

  const contentEntries: MetadataRoute.Sitemap = searchIndex.map((entry) => ({
    url: canonicalUrl(entry.href),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...contentEntries];
}
