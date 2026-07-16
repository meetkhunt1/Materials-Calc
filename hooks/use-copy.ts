"use client";

import * as React from "react";

/** Clipboard helper with a transient "copied" flag for button feedback. */
export function useCopyToClipboard(resetAfterMs = 2000) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), resetAfterMs);
        return true;
      } catch {
        return false;
      }
    },
    [resetAfterMs],
  );

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { copied, copy };
}
