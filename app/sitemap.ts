import { execFileSync } from "node:child_process";
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

/**
 * Real per-page freshness, not build time. `lastModified: now` on every URL
 * teaches Google to ignore our <lastmod> — so we report each route's last git
 * commit date instead. Runs at build (static export) where git + Node exist;
 * falls back to build time if git is unavailable or the file is untracked.
 */
const buildDate = new Date();
const gitDateCache = new Map<string, Date>();

function sourceFileFor(href: string): string {
  // "/" → app/page.tsx ; "/asphalt/asphalt-calculator" → app/asphalt/asphalt-calculator/page.tsx
  const clean = href.replace(/\/$/, "");
  return clean === "" ? "app/page.tsx" : `app${clean}/page.tsx`;
}

function lastModified(href: string): Date {
  const file = sourceFileFor(href);
  const cached = gitDateCache.get(file);
  if (cached) return cached;
  let date = buildDate;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (out) date = new Date(out);
  } catch {
    // git missing or file untracked — keep build-time fallback
  }
  gitDateCache.set(file, date);
  return date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: canonicalUrl("/"),
      lastModified: lastModified("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...liveCategories.map((category) => ({
      url: canonicalUrl(`/${category.slug}`),
      lastModified: lastModified(`/${category.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...["/about", "/contact", "/privacy", "/terms"].map((path) => ({
      url: canonicalUrl(path),
      lastModified: lastModified(path),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];

  const contentEntries: MetadataRoute.Sitemap = searchIndex.map((entry) => ({
    url: canonicalUrl(entry.href),
    lastModified: lastModified(entry.href),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...contentEntries];
}
