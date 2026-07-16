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

interface DonutChartProps {
  data: ChartDatum[];
  title?: string;
  /** Text in the middle of the donut, e.g. a total */
  centerLabel?: string;
  centerValue?: string;
  className?: string;
}

/**
 * Zero-JS SVG donut chart with legend — server-rendered, no chart library.
 * Good for mix proportions (cement/sand/aggregate) and cost breakdowns.
 */
export function DonutChart({ data, title, centerLabel, centerValue, className }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total <= 0) return null;

  const radius = 15.915; // circumference ≈ 100 for easy percentage math
  let offset = 25; // start at 12 o'clock

  const segments = data.map((datum, index) => {
    const percent = (datum.value / total) * 100;
    const segment = {
      ...datum,
      percent,
      dasharray: `${percent} ${100 - percent}`,
      dashoffset: offset,
      color: datum.color ?? PALETTE[index % PALETTE.length],
    };
    offset -= percent;
    return segment;
  });

  return (
    <figure className={cn("rounded-xl border p-5", className)}>
      {title && <figcaption className="mb-4 text-sm font-semibold">{title}</figcaption>}
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative size-40 shrink-0">
          <svg viewBox="0 0 42 42" className="size-full -rotate-0" role="img" aria-label={title ?? "Donut chart"}>
            {segments.map((segment) => (
              <circle
                key={segment.label}
                cx="21"
                cy="21"
                r={radius}
                fill="transparent"
                stroke={segment.color}
                strokeWidth="6"
                strokeDasharray={segment.dasharray}
                strokeDashoffset={segment.dashoffset}
              />
            ))}
          </svg>
          {(centerLabel || centerValue) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {centerValue && <span className="text-xl font-semibold">{centerValue}</span>}
              {centerLabel && (
                <span className="text-xs text-muted-foreground">{centerLabel}</span>
              )}
            </div>
          )}
        </div>
        <ul className="w-full space-y-2">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2.5 text-sm">
              <span
                className="size-3 shrink-0 rounded-sm"
                style={{ backgroundColor: segment.color }}
                aria-hidden
              />
              <span className="flex-1 truncate">{segment.label}</span>
              <span className="font-medium tabular-nums">
                {formatNumber(segment.percent, { precision: 1 })}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
