import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  /** Slug of the currently viewed category (renders as active) */
  active?: string;
  variant?: "grid" | "pills";
  className?: string;
}

/** Category navigation — card grid for hubs, pill row for in-page nav. */
export function CategoryNav({ active, variant = "grid", className }: CategoryNavProps) {
  if (variant === "pills") {
    return (
      <nav aria-label="Categories" className={cn("flex flex-wrap gap-2", className)}>
        {categories.map((category) =>
          category.comingSoon ? (
            <span
              key={category.slug}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-3.5 py-1.5 text-sm text-muted-foreground/60"
            >
              {category.name}
              <span className="text-[10px] uppercase">soon</span>
            </span>
          ) : (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              aria-current={active === category.slug ? "page" : undefined}
              className={cn(
                "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                active === category.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background hover:border-primary hover:text-primary",
              )}
            >
              {category.name}
            </Link>
          ),
        )}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Categories"
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}
    >
      {categories.map((category) => {
        const Icon = category.icon;
        const inner = (
          <>
            <div className="flex items-center justify-between">
              {Icon && (
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl",
                    category.comingSoon
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary-soft text-primary",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
              )}
              {category.comingSoon && <Badge variant="secondary">Coming soon</Badge>}
            </div>
            <p className="mt-4 font-semibold">{category.name}</p>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {category.description}
            </p>
          </>
        );

        if (category.comingSoon) {
          return (
            <div
              key={category.slug}
              className="rounded-xl border border-dashed p-5 opacity-70"
            >
              {inner}
            </div>
          );
        }

        return (
          <Link
            key={category.slug}
            href={`/${category.slug}`}
            className="group rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            {inner}
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Explore
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
