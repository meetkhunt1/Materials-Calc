import * as React from "react";
import { Container } from "@/components/layout/container";
import { TableOfContents, InlineToc } from "@/components/toc/table-of-contents";
import type { TocItem } from "@/types";

interface ArticleShellProps {
  /** Hero / title area rendered full width above the article */
  hero: React.ReactNode;
  /** Main article content */
  children: React.ReactNode;
  /** TOC items — sidebar on desktop, inline box on mobile */
  toc?: TocItem[];
  /** Extra sidebar content under the TOC (CTA, related links) */
  aside?: React.ReactNode;
  /**
   * "toc-right" (default) or "toc-left" — flip per page via
   * pick(slug, ["toc-right", "toc-left"] as const) for structural variety.
   */
  tocPosition?: "toc-right" | "toc-left";
}

/**
 * Guide/comparison article layout: prose column + sticky TOC sidebar.
 * On mobile the TOC collapses into an inline contents box above the article.
 */
export function ArticleShell({
  hero,
  children,
  toc = [],
  aside,
  tocPosition = "toc-right",
}: ArticleShellProps) {
  const hasSidebar = toc.length > 0 || Boolean(aside);

  const sidebar = hasSidebar && (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-8">
        {toc.length > 0 && <TableOfContents items={toc} />}
        {aside}
      </div>
    </aside>
  );

  return (
    <div>
      {hero}
      <Container className="py-10">
        <div
          className={
            hasSidebar
              ? tocPosition === "toc-left"
                ? "grid gap-12 lg:grid-cols-[240px_1fr]"
                : "grid gap-12 lg:grid-cols-[1fr_240px]"
              : undefined
          }
        >
          {tocPosition === "toc-left" && sidebar}
          <div className="min-w-0 max-w-3xl">
            {toc.length > 0 && <InlineToc items={toc} className="mb-10 lg:hidden" />}
            <div className="space-y-12">{children}</div>
          </div>
          {tocPosition === "toc-right" && sidebar}
        </div>
      </Container>
    </div>
  );
}
