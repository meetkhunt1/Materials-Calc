import * as React from "react";
import { slugify } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Section heading — its id (auto-slugified or explicit) feeds the TOC */
  title: string;
  id?: string;
  /** Heading level (default h2) */
  level?: 2 | 3;
  /** Optional lead paragraph under the heading */
  lead?: string;
}

/**
 * Article section with an anchored heading. Use the same id in the TOC items:
 *   <Section title="How much concrete do I need?">…</Section>
 *   → <h2 id="how-much-concrete-do-i-need">
 */
export function Section({
  title,
  id,
  level = 2,
  lead,
  className,
  children,
  ...props
}: SectionProps) {
  const headingId = id ?? slugify(title);
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <section className={cn("scroll-mt-24", className)} {...props}>
      <Heading
        id={headingId}
        className={cn(
          "group font-semibold tracking-tight",
          level === 2 ? "text-2xl" : "text-xl",
        )}
      >
        <a
          href={`#${headingId}`}
          className="no-underline hover:text-primary"
          aria-label={`Link to ${title}`}
        >
          {title}
        </a>
      </Heading>
      {lead && <p className="mt-2 text-muted-foreground">{lead}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

/** Helper to build TOC items from section titles in one line. */
export function tocFromTitles(...titles: (string | [string, 3])[]) {
  return titles.map((entry) => {
    if (Array.isArray(entry)) {
      return { id: slugify(entry[0]), label: entry[0], depth: 3 as const };
    }
    return { id: slugify(entry), label: entry, depth: 2 as const };
  });
}
