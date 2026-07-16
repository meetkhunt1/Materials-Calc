import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import type { RelatedArticle } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RelatedArticlesProps {
  items: RelatedArticle[];
  title?: string;
  /** "cards" grid, compact "list", or horizontal "inline-strip" */
  variant?: "cards" | "list" | "inline-strip";
  className?: string;
}

/**
 * Internal-link block with three visual styles — pass pick(slug, RELATED_STYLES)
 * so related sections differ from page to page.
 */
export function RelatedArticles({
  items,
  title = "Related tools & guides",
  variant = "cards",
  className,
}: RelatedArticlesProps) {
  if (items.length === 0) return null;

  if (variant === "list") {
    return (
      <section aria-label={title} className={cn(className)}>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <ul className="mt-4 divide-y rounded-xl border">
          {items.map((item) => {
            const Icon = item.icon ?? FileText;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/50"
                >
                  <Icon className="size-5 shrink-0 text-primary" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium group-hover:text-primary">
                      {item.title}
                    </span>
                    {item.description && (
                      <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  if (variant === "inline-strip") {
    return (
      <section aria-label={title} className={cn("rounded-xl bg-muted/40 p-5", className)}>
        <p className="text-sm font-semibold">{title}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {item.title}
              <ArrowRight className="size-3" />
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label={title} className={cn(className)}>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon ?? FileText;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon className="size-4.5" aria-hidden />
              </span>
              <span className="mt-3 font-semibold leading-snug group-hover:text-primary">
                {item.title}
              </span>
              {item.description && (
                <span className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                  {item.description}
                </span>
              )}
              {item.category && (
                <Badge variant="secondary" className="mt-3 self-start">
                  {item.category}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
