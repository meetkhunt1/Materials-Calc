import * as React from "react";
import { Sigma } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormulaVariable {
  symbol: string;
  meaning: string;
  unit?: string;
}

interface FormulaBlockProps {
  /** Display formula, e.g. "Volume = Length × Width × Depth" */
  formula: string;
  title?: string;
  /** Legend explaining each variable */
  variables?: FormulaVariable[];
  /** Extra note under the formula (assumptions, rounding rules) */
  note?: string;
  className?: string;
}

/**
 * Presents a calculation formula with an optional variable legend.
 * Rendered in a distinct card so formulas stand out in long guides.
 */
export function FormulaBlock({
  formula,
  title = "Formula",
  variables,
  note,
  className,
}: FormulaBlockProps) {
  return (
    <figure className={cn("overflow-hidden rounded-xl border", className)}>
      <figcaption className="flex items-center gap-2 border-b bg-muted/60 px-5 py-3">
        <Sigma className="size-4 text-primary" aria-hidden />
        <span className="text-sm font-semibold">{title}</span>
      </figcaption>
      <div className="px-5 py-6">
        <p className="overflow-x-auto whitespace-nowrap text-center font-mono text-base font-medium tracking-tight sm:text-lg">
          {formula}
        </p>
      </div>
      {variables && variables.length > 0 && (
        <dl className="grid gap-x-6 gap-y-2 border-t bg-muted/30 px-5 py-4 text-sm sm:grid-cols-2">
          {variables.map((variable) => (
            <div key={variable.symbol} className="flex items-baseline gap-2">
              <dt className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold">
                {variable.symbol}
              </dt>
              <dd className="text-muted-foreground">
                {variable.meaning}
                {variable.unit && <span className="text-xs"> ({variable.unit})</span>}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {note && (
        <p className="border-t px-5 py-3 text-xs leading-relaxed text-muted-foreground">
          {note}
        </p>
      )}
    </figure>
  );
}
