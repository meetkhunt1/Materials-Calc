import { searchIndex, type SearchEntry } from "@/data/search-index";

function matchScore(entry: SearchEntry, query: string): number {
  const q = query.toLowerCase();
  const title = entry.title.toLowerCase();
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (entry.keywords?.some((k) => k.toLowerCase().includes(q))) return 40;
  if (entry.category.toLowerCase().includes(q)) return 20;
  return 0;
}

/** Ranked, filtered search results — shared by <SiteSearch> and /search. */
export function searchSite(query: string, limit = 8): SearchEntry[] {
  const q = query.trim();
  if (!q) return searchIndex.slice(0, limit);
  return searchIndex
    .map((entry) => ({ entry, score: matchScore(entry, q) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}
