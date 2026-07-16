"use client";

import type { CalculatorResultItem } from "@/types";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CalculatorResultsProps {
  results: CalculatorResultItem[];
  disclaimer?: string;
  className?: string;
}

/** Result panel: primary answer highlighted, secondary values in a grid. */
export function CalculatorResults({ results, disclaimer, className }: CalculatorResultsProps) {
  const primary = results.filter((r) => r.primary);
  const secondary = results.filter((r) => !r.primary);

  return (
    <div className={cn("space-y-3", className)} aria-live="polite">
      {primary.map((result) => (
        <div
          key={result.id}
          className="rounded-xl bg-primary px-5 py-4 text-primary-foreground"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/80">
            {result.label}
          </p>
          <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">
            {formatNumber(result.value, { precision: result.precision ?? 2 })}
            {result.unit && (
              <span className="ml-1.5 text-lg font-medium text-primary-foreground/85">
                {result.unit}
              </span>
            )}
          </p>
          {result.note && (
            <p className="mt-1 text-xs text-primary-foreground/75">{result.note}</p>
          )}
        </div>
      ))}

      {secondary.length > 0 && (
        <dl className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
          {secondary.map((result) => (
            <div key={result.id} className="bg-background px-4 py-3">
              <dt className="text-xs text-muted-foreground">{result.label}</dt>
              <dd className="mt-0.5 font-semibold tabular-nums">
                {formatNumber(result.value, { precision: result.precision ?? 2 })}
                {result.unit && (
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    {result.unit}
                  </span>
                )}
              </dd>
              {result.note && (
                <p className="mt-0.5 text-xs text-muted-foreground">{result.note}</p>
              )}
            </div>
          ))}
        </dl>
      )}

      {disclaimer && (
        <p className="text-xs leading-relaxed text-muted-foreground">{disclaimer}</p>
      )}
    </div>
  );
}
