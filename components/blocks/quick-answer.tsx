import * as React from "react";
import { Zap } from "lucide-react";

interface QuickAnswerProps {
  /** The query this answers, e.g. "How much concrete do I need for a 10×10 slab?" */
  question: string;
  /** Concise 40–50 word answer: written to stand alone in a search snippet */
  answer: React.ReactNode;
  /** Optional quick heuristic, e.g. "1 cubic yard covers 81 sq ft at 4 in depth" */
  ruleOfThumb?: string;
  /** Optional instant formula string, e.g. "(L × W × D) ÷ 27 × 1.10" */
  formula?: string;
}

/**
 * High-visibility direct-answer box for Featured Snippet targeting.
 * Marked `.quick-answer`: that class is what articleSchema's speakable
 * cssSelector should list when a page includes this component.
 */
export function QuickAnswer({ question, answer, ruleOfThumb, formula }: QuickAnswerProps) {
  return (
    <div className="quick-answer rounded-xl border border-primary/20 bg-primary-soft/40 p-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
        <Zap className="size-3.5" />
        Quick answer
      </p>
      <p className="mt-2 font-medium text-foreground">{question}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{answer}</p>
      {(ruleOfThumb || formula) && (
        <dl className="mt-3 space-y-1 border-t border-primary/20 pt-3 text-sm">
          {ruleOfThumb && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-foreground">Rule of thumb:</dt>
              <dd className="text-muted-foreground">{ruleOfThumb}</dd>
            </div>
          )}
          {formula && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-foreground">Formula:</dt>
              <dd className="font-mono text-muted-foreground">{formula}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
