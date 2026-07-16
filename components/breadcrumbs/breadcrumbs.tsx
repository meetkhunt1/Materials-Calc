import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { BreadcrumbItem } from "@/types";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/jsonld";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Emit BreadcrumbList JSON-LD alongside the visual trail (default true) */
  withSchema?: boolean;
  className?: string;
}

/**
 * Visual breadcrumb trail + BreadcrumbList structured data in one component.
 * Pass the full trail including Home; the last item renders as current page.
 */
export function Breadcrumbs({ items, withSchema = true, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <>
      {withSchema && <JsonLd data={breadcrumbSchema(items)} />}
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60" aria-hidden />
                )}
                {isLast ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 transition-colors hover:text-foreground"
                  >
                    {isFirst && <Home className="size-3.5" aria-hidden />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/** Convenience builder: breadcrumbTrail("concrete", "Concrete", {label, href}) */
export function breadcrumbTrail(
  ...segments: { label: string; href: string }[]
): BreadcrumbItem[] {
  return [{ label: "Home", href: "/" }, ...segments];
}
