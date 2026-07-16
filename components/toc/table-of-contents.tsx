"use client";

import * as React from "react";
import { List } from "lucide-react";
import type { TocItem } from "@/types";
import { useActiveHeading } from "@/hooks/use-toc";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
  className?: string;
}

/**
 * Sticky sidebar table of contents with scrollspy highlighting.
 * Headings in the article must carry matching ids (Section component does this).
 */
export function TableOfContents({
  items,
  title = "On this page",
  className,
}: TableOfContentsProps) {
  const ids = React.useMemo(() => items.map((i) => i.id), [items]);
  const activeId = useActiveHeading(ids);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin",
        className,
      )}
    >
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <List className="size-3.5" />
        {title}
      </p>
      <ul className="space-y-0.5 border-l">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors",
                  item.depth === 3 && "pl-7",
                  isActive
                    ? "border-primary font-medium text-primary"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Compact inline variant — renders at the top of the article on mobile. */
export function InlineToc({ items, className }: { items: TocItem[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <div className={cn("rounded-xl border bg-muted/40 p-5", className)}>
      <p className="mb-2.5 text-sm font-semibold">Contents</p>
      <ol className="grid gap-1.5 text-sm sm:grid-cols-2">
        {items
          .filter((i) => (i.depth ?? 2) === 2)
          .map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="mr-1.5 font-medium text-primary">{index + 1}.</span>
                {item.label}
              </a>
            </li>
          ))}
      </ol>
    </div>
  );
}
