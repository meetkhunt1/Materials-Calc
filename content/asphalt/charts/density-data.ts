import type { DensityRow } from "@/types";

/**
 * Asphalt unit weights. The estimating standard for compacted hot mix is
 * 145 lb/ft³ (2,322 kg/m³) — i.e. ~1.96 US tons per compacted cubic yard.
 */
export const asphaltDensities: DensityRow[] = [
  { material: "Hot mix asphalt (compacted)", kgPerM3: 2322, note: "145 lb/ft³ — the estimating standard" },
  { material: "Hot mix asphalt (loose, in truck)", kgPerM3: 1870, note: "Fluffs ~20–25% before rolling" },
  { material: "Warm mix asphalt (compacted)", kgPerM3: 2300, note: "Same aggregates, lower placing temp" },
  { material: "Cold mix / cold patch (compacted)", kgPerM3: 2200, note: "Higher voids than hot mix" },
  { material: "Asphalt millings (loose)", kgPerM3: 1650, note: "RAP; compacts to ~1,950" },
  { material: "Asphalt millings (compacted)", kgPerM3: 1950, note: "Good base or rural surfacing" },
  { material: "Asphalt binder (bitumen only)", kgPerM3: 1030, note: "PG binder, ~5–6% of mix by weight" },
  { material: "Dense-graded aggregate base", kgPerM3: 2240, note: "Under the asphalt lifts" },
];

/** Key estimating constants used across the asphalt cluster. */
export const HMA_DENSITY = 2322; // kg/m³ compacted
export const HMA_LB_FT3 = 145;
export const HMA_TONS_PER_YD3 = 1.96; // US tons per compacted yd³
/** lb per yd² per 1 in of compacted thickness — the paver's "110 rule" */
export const LB_PER_SQYD_IN = 110;
