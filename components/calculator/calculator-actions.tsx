"use client";

import * as React from "react";
import { Check, Copy, Printer, RotateCcw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

interface CalculatorActionsProps {
  /** Plain-text summary of the current results */
  getText: () => string;
  /** Page title used for the native share sheet */
  shareTitle: string;
  onReset: () => void;
  /** Actions only make sense once there are results */
  hasResults: boolean;
  className?: string;
}

/** Copy / Print / Share / Reset toolbar under calculator results. */
export function CalculatorActions({
  getText,
  shareTitle,
  onReset,
  hasResults,
  className,
}: CalculatorActionsProps) {
  const { copied, copy } = useCopyToClipboard();

  const handleShare = async () => {
    const text = getText();
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text, url });
        return;
      } catch {
        // user dismissed the sheet — fall through to clipboard
      }
    }
    await copy(`${text}\n${url}`);
  };

  return (
    <div className={cn("no-print flex flex-wrap items-center gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!hasResults}
        onClick={() => copy(getText())}
      >
        {copied ? <Check className="text-success" /> : <Copy />}
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!hasResults}
        onClick={() => window.print()}
      >
        <Printer />
        Print
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!hasResults}
        onClick={handleShare}
      >
        <Share2 />
        Share
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="ml-auto text-muted-foreground"
      >
        <RotateCcw />
        Reset
      </Button>
    </div>
  );
}
