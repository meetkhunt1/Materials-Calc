import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";
import { searchIndex } from "@/data/search-index";
import { liveCategories } from "@/data/categories";

export const dynamic = "force-static";

/**
 * Sitemap builds itself from the same sources pages register in:
 * category list + search index. Publishing flow for every new page:
 *   1. create the page  2. add it to data/search-index.ts → done.
 */

/** The five highest-search-volume calculators — homepage-linked, top crawl priority. */
const TOP_CALCULATORS = new Set([
  "/concrete/concrete-calculator/",
  "/concrete/concrete-slab-calculator/",
  "/gravel/gravel-calculator/",
  "/asphalt/asphalt-calculator/",
  "/asphalt/asphalt-driveway-calculator/",
]);

/**
 * Flagship per-category guides: the "how to calculate", density, coverage,
 * cost and comparison pages each topic cluster anchors around. Everything
 * else informational (sub-guides, series pages, FAQs) is a minor page.
 */
const CORE_GUIDES = new Set([
  "/concrete/how-to-calculate-concrete/",
  "/asphalt/how-to-calculate-asphalt/",
  "/gravel/how-to-calculate-gravel/",
  "/concrete/concrete-density-chart/",
  "/asphalt/asphalt-density-chart/",
  "/gravel/gravel-density-chart/",
  "/gravel/gravel-density-database/",
  "/concrete/concrete-coverage-guide/",
  "/asphalt/asphalt-coverage-guide/",
  "/gravel/gravel-coverage-guide/",
  "/concrete/concrete-cost-guide/",
  "/asphalt/asphalt-cost-guide/",
  "/gravel/gravel-price-guide/",
  "/concrete/concrete-mix-ratio-guide/",
  "/concrete/concrete-curing-guide/",
  "/asphalt/asphalt-thickness-guide/",
  "/concrete/concrete-vs-asphalt/",
  "/gravel/crushed-stone-vs-gravel/",
]);

/** Tiered priority for a content page: calculators first, then guide depth. */
function priorityFor(href: string): number {
  if (TOP_CALCULATORS.has(href)) return 0.9;
  if (href.endsWith("-calculator/")) return 0.8;
  if (CORE_GUIDES.has(href)) return 0.7;
  return 0.6;
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
    priority: priorityFor(entry.href),
  }));

  return [...staticEntries, ...contentEntries];
}
