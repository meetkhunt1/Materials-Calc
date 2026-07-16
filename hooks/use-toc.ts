"use client";

import * as React from "react";

/**
 * Scrollspy for the sidebar table of contents.
 * Observes the given heading ids and returns the one currently in view.
 */
export function useActiveHeading(ids: string[]): string | null {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (ids.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size > 0) {
          // Topmost visible heading wins
          const [topId] = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
          setActiveId(topId);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
