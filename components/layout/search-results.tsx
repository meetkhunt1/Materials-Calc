"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FileText } from "lucide-react";
import { searchSite } from "@/lib/search";

/** Reads ?q= from the URL: the entry point Google's Sitelinks SearchBox targets. */
export function SearchResults() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const results = query.trim() ? searchSite(query, 30) : [];

  if (!query.trim()) {
    return (
      <p className="text-sm text-muted-foreground">
        Use the search box in the header (or press Ctrl/⌘ K) to find a calculator or guide.
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No results for &ldquo;{query}&rdquo;. Try a material name like &ldquo;concrete&rdquo; or
        &ldquo;gravel&rdquo;.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-xl border">
      {results.map((entry) => (
        <li key={entry.href}>
          <Link
            href={entry.href}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted"
          >
            <FileText className="size-4 shrink-0 text-muted-foreground" />
            <span className="flex-1 font-medium">{entry.title}</span>
            <span className="text-xs text-muted-foreground">{entry.category}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
