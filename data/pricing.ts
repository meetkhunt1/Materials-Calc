/**
 * Single source of truth for asphalt installed pricing.
 *
 * Every number in this file is DERIVED from a worked example that already
 * exists on the site, not from an industry rule of thumb, a vendor page or an
 * editorial guess. Each band records the arithmetic it came from in
 * `derivedFrom`, so the only legitimate way to change a price here is to change
 * (and re-verify) the worked example it descends from.
 *
 * This file is deliberately INCOMPLETE. Jobs above 1,000 ft² get no number,
 * because no worked example anywhere in the repo computes one. The figures
 * that used to appear for large lots ($2.50–5/ft²) were stated, never
 * calculated. Rather than publish a guess with the authority of a shared
 * constant, large jobs render LARGE_JOB_GUIDANCE instead. Add a band here only
 * once a real worked example backs it.
 */

export interface CostBand {
  id: string;
  /** Human label for the size range, e.g. "Under 500 ft²". */
  label: string;
  areaMin: number;
  /** null = open-ended upper bound. */
  areaMax: number | null;
  /** All-in installed cost per ft²: excavation, base, hot mix, labor, mobilization. */
  low: number;
  high: number;
  /**
   * Excavation + aggregate base per ft². Subtract from the all-in range to
   * price a resurface over an already-prepared base. null where no worked
   * example computes it for this size. Do not interpolate.
   */
  basePrep: { low: number; high: number } | null;
  /**
   * True where the source example does not itemise excavation and base, so
   * reading its total as "all-in" is an inference rather than the page's claim.
   */
  scopeInferred?: boolean;
  derivedFrom: string;
}

export const BAND_UNDER_500: CostBand = {
  id: "under-500",
  label: "Under 500 ft²",
  areaMin: 0,
  areaMax: 500,
  low: 9.4,
  high: 11.9,
  basePrep: { low: 2.5, high: 3.75 },
  derivedFrom:
    "driveway-cost-guide, 480 ft² worked example: $4,510 ÷ 480 = $9.40/ft² with mobilization bundled across nearby jobs; the same example notes a standalone mobilization pushes it past $5,700 ÷ 480 = $11.88/ft². Corroborated by asphalt-cost-per-square-foot's 300 ft² patch at $3,400 ÷ 300 = $11.30/ft². " +
    "basePrep: excavation $840 + base gravel $420 = $1,260 ÷ 480 = $2.63/ft² (driveway-cost-guide), and asphalt-cost-calculator's own adder for the same 480 ft² job is $1,200–1,800 = $2.50–3.75/ft².",
};

export const BAND_500_1000: CostBand = {
  id: "500-1000",
  label: "500–1,000 ft²",
  areaMin: 500,
  areaMax: 1000,
  low: 5.85,
  high: 8.1,
  basePrep: null,
  // SCOPE INFERRED: the regional-price-factors example itemises material,
  // labor, equipment and mobilization but never names excavation or base.
  // Treating its total as all-in is our inference, not the page's claim, and
  // it is why basePrep is null here rather than carried over from the band
  // above. Re-derive both if that example is ever itemised properly.
  scopeInferred: true,
  derivedFrom:
    "regional-asphalt-price-factors, 600 ft² worked example: competitive metro $3,500 ÷ 600 = $5.85/ft²; rural site 40 miles from the plant $4,845 ÷ 600 = $8.10/ft². Corroborated by asphalt-cost-per-square-foot's 600 ft² job at $4,120 ÷ 600 = $6.90/ft² (which excludes base work).",
};

/** Published bands, smallest first. Nothing above 1,000 ft² is publishable yet. */
export const COST_BANDS: CostBand[] = [BAND_UNDER_500, BAND_500_1000];

/**
 * What every page says instead of a number once the job passes 1,000 ft².
 * Directional only: the direction IS supported by the computed examples
 * (cost per ft² falls monotonically as area grows); the magnitude is not.
 */
export const LARGE_JOB_GUIDANCE =
  "Above about 1,000 ft², the per-square-foot price keeps falling as mobilization and crew time spread across more area. How far it falls depends on access, haul distance and how the contractor schedules the work, so jobs that size are worth quoting rather than estimating from a table.";

/** Short inline variant of the same point, for sentences rather than callouts. */
export const LARGE_JOB_GUIDANCE_SHORT =
  "larger jobs keep getting cheaper per square foot as fixed costs spread, but the drop depends on site access and haul distance, so get them quoted";

/**
 * Recurring maintenance rates used by lifetime-cost arithmetic.
 * These are carried over unchanged: unlike installed cost they are stated
 * consistently everywhere they appear on the site, so there was no conflict to
 * resolve. They are still uncited (see the pricing-sources TODO).
 */
export const RECURRING_RATES = {
  sealcoat: { low: 0.2, high: 0.45, cycleYearsLow: 3, cycleYearsHigh: 5 },
  overlay: { low: 3, high: 5, typicalYearLow: 15, typicalYearHigh: 20 },
} as const;

/** "$9.40–11.90" */
export function bandRange(band: CostBand): string {
  return `$${band.low.toFixed(2)}–${band.high.toFixed(2)}`;
}

/** "$9.40–11.90 per square foot" */
export function bandRangePerSqFt(band: CostBand): string {
  return `${bandRange(band)} per square foot`;
}

/** "$9.40–11.90/ft²" */
export function bandRangeShort(band: CostBand): string {
  return `${bandRange(band)}/ft²`;
}

/** "$2.50–3.75" for the excavation-and-base deduction, or null. */
export function basePrepRange(band: CostBand): string | null {
  if (!band.basePrep) return null;
  return `$${band.basePrep.low.toFixed(2)}–${band.basePrep.high.toFixed(2)}`;
}

/** Total budget for an area, e.g. "$5,640–7,776". Only for areas inside a band. */
export function bandTotal(band: CostBand, areaSqFt: number): string {
  const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
  return `${fmt(band.low * areaSqFt)}–${fmt(band.high * areaSqFt)}`;
}

/** The band covering an area, or null when the area is past the published bands. */
export function bandForArea(areaSqFt: number): CostBand | null {
  return (
    COST_BANDS.find(
      (b) => areaSqFt >= b.areaMin && (b.areaMax === null || areaSqFt < b.areaMax),
    ) ?? null
  );
}
