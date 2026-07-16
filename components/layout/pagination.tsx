import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Builds the href for a page number, e.g. (p) => `/concrete/guides/page/${p}` */
  buildHref: (page: number) => string;
  className?: string;
}

/** Numbered pagination with prev/next — server-rendered links (SEO-friendly). */
export function Pagination({ currentPage, totalPages, buildHref, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Window of pages around the current one, with first/last always visible
  const pages: (number | "…")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const linkClass =
    "inline-flex size-9 items-center justify-center rounded-lg border bg-background text-sm font-medium transition-colors hover:bg-muted";

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-1.5", className)}>
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)} aria-label="Previous page" className={linkClass}>
          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <span className={cn(linkClass, "pointer-events-none opacity-40")}>
          <ChevronLeft className="size-4" />
        </span>
      )}

      {pages.map((page, index) =>
        page === "…" ? (
          <span key={`gap-${index}`} className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              linkClass,
              page === currentPage &&
                "border-primary bg-primary text-primary-foreground hover:bg-primary",
            )}
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)} aria-label="Next page" className={linkClass}>
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span className={cn(linkClass, "pointer-events-none opacity-40")}>
          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}
