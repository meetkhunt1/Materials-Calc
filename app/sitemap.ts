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
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...liveCategories.map((category) => ({
      url: absoluteUrl(`/${category.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];

  const contentEntries: MetadataRoute.Sitemap = searchIndex.map((entry) => ({
    url: absoluteUrl(entry.href),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...contentEntries];
}
