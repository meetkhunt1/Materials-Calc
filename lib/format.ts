/** Number/measurement formatting helpers shared by calculators, tables and charts. */

export function formatNumber(
  value: number,
  options: { precision?: number; compact?: boolean } = {},
): string {
  const { precision = 2, compact = false } = options;
  if (!Number.isFinite(value)) return "N/A";
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
  if (!Number.isFinite(value)) return "N/A";
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

/**
 * Rounds up to a sensible purchasing quantity (e.g. bags, truckloads).
 * A value within floating-point noise of an exact multiple stays on that
 * multiple, so 6.6 ft³ at 0.6 ft³ per bag is 11 bags, not 12.
 */
export function ceilTo(value: number, step = 1): number {
  const q = value / step;
  const nearest = Math.round(q);
  if (Math.abs(q - nearest) <= 1e-9 * Math.max(1, Math.abs(q))) return nearest * step;
  return Math.ceil(q) * step;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}
