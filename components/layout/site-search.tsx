"use client";

import * as React from "react";
import Link from "next/link";
import { Search, FileText, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { searchIndex, type SearchEntry } from "@/data/search-index";
import { cn } from "@/lib/utils";

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

/** Header search — opens a dialog, filters the static index as you type. */
export function SiteSearch({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = React.useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 8);
    return searchIndex
      .map((entry) => ({ entry, score: matchScore(entry, query.trim()) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.entry);
  }, [query]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="Search the site"
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-xl border bg-background px-3 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted",
            className,
          )}
        >
          <Search className="size-4" />
          <span className="hidden sm:inline">Search…</span>
          <kbd className="hidden rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-medium sm:inline">
            Ctrl K
          </kbd>
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" />
        <DialogPrimitive.Content className="fixed left-1/2 top-24 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border bg-popover shadow-lg">
          <DialogPrimitive.Title className="sr-only">Search</DialogPrimitive.Title>
          <div className="flex items-center gap-2 border-b px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators and guides…"
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <DialogPrimitive.Close
              aria-label="Close search"
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>
          <ul className="max-h-72 overflow-y-auto p-2 scrollbar-thin">
            {results.length === 0 && (
              <li className="px-3 py-8 text-center text-sm text-muted-foreground">
                {searchIndex.length === 0
                  ? "Search will activate as pages are published."
                  : "No results found."}
              </li>
            )}
            {results.map((entry) => (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                >
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 truncate font-medium">{entry.title}</span>
                  <span className="text-xs text-muted-foreground">{entry.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
