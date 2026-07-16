/** Number/measurement formatting helpers shared by calculators, tables and charts. */

export function formatNumber(
  value: number,
  options: { precision?: number; compact?: boolean } = {},
): string {
  const { precision = 2, compact = false } = options;
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: precision,
    minimumFractionDigits: 0,
    notation: compact ? "compact" : "standard",
  }).format(value);
}

export function formatCurrency(
  value: number,
  options: { currency?: string; precision?: number } = {},
): string {
  const { currency = "USD", precision = 0 } = options;
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: precision,
  }).format(value);
}

export function formatRange(
  low: number,
  high: number,
  formatter: (n: number) => string = (n) => formatNumber(n),
): string {
  return `${formatter(low)} – ${formatter(high)}`;
}

/** "2026-07-15" → "July 15, 2026" */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/** Rounds up to a sensible purchasing quantity (e.g. bags, truckloads). */
export function ceilTo(value: number, step = 1): number {
  return Math.ceil(value / step) * step;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}
