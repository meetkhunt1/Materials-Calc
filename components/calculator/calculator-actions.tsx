"use client";

import * as React from "react";
import { Check, Copy, Printer, RotateCcw, Share2, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface EmbedInfo {
  /** CalculatorDefinition.id — matches the route under app/embed/{id}/ */
  id: string;
  /** Canonical page path, e.g. "/concrete/concrete-calculator/" */
  path: string;
}

interface CalculatorActionsProps {
  /** Plain-text summary of the current results */
  getText: () => string;
  /** Page title used for the native share sheet */
  shareTitle: string;
  onReset: () => void;
  /** Actions only make sense once there are results */
  hasResults: boolean;
  /** Set only when this calculator has a matching /embed/ route */
  embed?: EmbedInfo;
  className?: string;
}

function embedSnippet(embed: EmbedInfo): string {
  const embedUrl = `${siteConfig.url}/embed/${embed.id}/`;
  const pageUrl = `${siteConfig.url}${embed.path}`;
  return [
    `<iframe src="${embedUrl}" width="100%" height="520" frameborder="0"></iframe>`,
    `<p><small>Powered by <a href="${pageUrl}" target="_blank" rel="noopener noreferrer">MaterialsCalc</a></small></p>`,
  ].join("\n");
}

/** Copy / Print / Share / Embed / Reset toolbar under calculator results. */
export function CalculatorActions({
  getText,
  shareTitle,
  onReset,
  hasResults,
  embed,
  className,
}: CalculatorActionsProps) {
  const { copied, copy } = useCopyToClipboard();
  const embedCopy = useCopyToClipboard();
  const [embedOpen, setEmbedOpen] = React.useState(false);

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
      {embed && (
        <Dialog open={embedOpen} onOpenChange={setEmbedOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <Code2 />
              Embed
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Embed this calculator</DialogTitle>
              <DialogDescription>
                Paste this snippet into your site to embed a free, always-current copy of this
                calculator. It links back to MaterialsCalc.
              </DialogDescription>
            </DialogHeader>
            <pre className="mt-4 max-h-48 overflow-auto rounded-lg border bg-muted p-3 text-xs">
              <code>{embedSnippet(embed)}</code>
            </pre>
            <Button
              type="button"
              size="sm"
              className="mt-3 w-full"
              onClick={() => embedCopy.copy(embedSnippet(embed))}
            >
              {embedCopy.copied ? <Check className="text-success" /> : <Copy />}
              {embedCopy.copied ? "Copied" : "Copy snippet"}
            </Button>
          </DialogContent>
        </Dialog>
      )}
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
