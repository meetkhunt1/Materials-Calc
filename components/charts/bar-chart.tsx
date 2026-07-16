import type { ChartDatum } from "@/types";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface BarChartProps {
  data: ChartDatum[];
  title?: string;
  /** Unit appended to values, e.g. "kg/m³" */
  unit?: string;
  /** Single-color bars (brand) instead of the rotating palette */
  monochrome?: boolean;
  className?: string;
}

/**
 * Zero-JS horizontal bar chart — pure server-rendered HTML/CSS.
 * Ideal for density/cost comparisons without shipping a chart library.
 */
export function BarChart({ data, title, unit, monochrome = true, className }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 0);
  if (max === 0) return null;

  return (
    <figure className={cn("rounded-xl border p-5", className)}>
      {title && <figcaption className="mb-4 text-sm font-semibold">{title}</figcaption>}
      <div className="space-y-3" role="img" aria-label={title ?? "Bar chart"}>
        {data.map((datum, index) => {
          const width = Math.max((datum.value / max) * 100, 2);
          const color =
            datum.color ?? (monochrome ? "var(--chart-1)" : PALETTE[index % PALETTE.length]);
          return (
            <div key={datum.label}>
              <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate">{datum.label}</span>
                <span className="shrink-0 font-medium tabular-nums">
                  {formatNumber(datum.value)}
                  {unit && <span className="ml-1 text-xs text-muted-foreground">{unit}</span>}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${width}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
