import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import type { HeroVariant } from "@/lib/variation";
import { cn } from "@/lib/utils";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  title: string;
  description: string;
  /** Small eyebrow label above the title, e.g. the category name */
  eyebrow?: string;
  /** Layout variant — pass pick(slug, HERO_VARIANTS) for per-page variety */
  variant?: HeroVariant;
  /** Optional stats row (only rendered by the "stat-strip" variant) */
  stats?: HeroStat[];
  /** Slot for byline / breadcrumbs / actions under the description */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Page hero with four visual variants so hero sections never repeat:
 *  - standard:   left-aligned, roomy
 *  - centered:   centered with max-width
 *  - compact:    tight, for utility pages
 *  - stat-strip: standard + key-figures strip
 */
export function Hero({
  title,
  description,
  eyebrow,
  variant = "standard",
  stats,
  children,
  className,
}: HeroProps) {
  const centered = variant === "centered";

  return (
    <div
      className={cn(
        "border-b bg-muted/30",
        variant === "compact" ? "py-8" : "py-12 lg:py-16",
        className,
      )}
    >
      <Container>
        <div className={cn(centered && "mx-auto max-w-2xl text-center")}>
          {eyebrow && (
            <Badge variant="soft" className="mb-4">
              {eyebrow}
            </Badge>
          )}
          <h1
            className={cn(
              "font-semibold tracking-tight",
              variant === "compact" ? "text-3xl" : "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
          {children && <div className={cn("mt-5", centered && "flex justify-center")}>{children}</div>}
        </div>

        {variant === "stat-strip" && stats && stats.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background px-5 py-4">
                <dd className="text-2xl font-semibold text-primary">{stat.value}</dd>
                <dt className="mt-0.5 text-xs text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </div>
  );
}
