import { BookOpen, ExternalLink } from "lucide-react";
import type { Reference } from "@/types";
import { cn } from "@/lib/utils";

interface ReferencesProps {
  items: Reference[];
  title?: string;
  className?: string;
}

/** Cited sources list — builds E-E-A-T trust on every guide. */
export function References({ items, title = "Sources & references", className }: ReferencesProps) {
  if (items.length === 0) return null;

  return (
    <section aria-label={title} className={cn("rounded-xl border bg-muted/30 p-6", className)}>
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        <BookOpen className="size-4" />
        {title}
      </h2>
      <ol className="mt-4 space-y-2.5 text-sm">
        {items.map((ref, index) => (
          <li key={ref.url} className="flex gap-3">
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              [{index + 1}]
            </span>
            <span className="min-w-0">
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
              >
                {ref.title}
                <ExternalLink className="size-3 shrink-0" aria-hidden />
              </a>
              {(ref.publisher || ref.year) && (
                <span className="text-muted-foreground">
                  {" "}
                  — {ref.publisher}
                  {ref.publisher && ref.year ? ", " : ""}
                  {ref.year}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
