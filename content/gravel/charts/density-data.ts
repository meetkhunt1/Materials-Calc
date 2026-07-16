import type { DensityRow } from "@/types";

/**
 * Gravel & aggregate unit weights (loose bulk unless noted, per ASTM C29
 * typical values). The estimating standard for common gravel is
 * ~105 lb/ft³ loose → 1.42 US tons per cubic yard.
 */
export const gravelDensities: DensityRow[] = [
  { material: "Pea gravel (loose)", kgPerM3: 1540, note: "3/8 in rounded; pours and flows" },
  { material: "Common gravel, dry (loose)", kgPerM3: 1680, note: "The 1.4 t/yd³ estimating standard" },
  { material: "Gravel, wet", kgPerM3: 1920, note: "Rain adds ~10–15% to scale weight" },
  { material: "Crushed stone #57 (loose)", kgPerM3: 1600, note: "3/4–1 in angular, self-locking" },
  { material: "Crushed stone #57 (compacted)", kgPerM3: 1750 },
  { material: "Crusher run / road base (loose)", kgPerM3: 2000, note: "Stone + fines blend" },
  { material: "Crusher run / road base (compacted)", kgPerM3: 2240, note: "140 lb/ft³ — matches DGA under asphalt" },
  { material: "Stone dust / screenings", kgPerM3: 1600 },
  { material: "River rock 1–3 in", kgPerM3: 1600 },
  { material: "Bank run (sand & gravel mix)", kgPerM3: 1800 },
];

/** Extended list for the reference database page. */
export const extendedDensities: DensityRow[] = [
  ...gravelDensities,
  { material: "Crushed stone #2 (2–3 in, loose)", kgPerM3: 1600 },
  { material: "Crushed stone #8 (3/8 in, loose)", kgPerM3: 1550 },
  { material: "Crushed limestone (loose)", kgPerM3: 1550 },
  { material: "Crushed granite (loose)", kgPerM3: 1650 },
  { material: "Decomposed granite (compacted)", kgPerM3: 1900 },
  { material: "Lava rock (loose)", kgPerM3: 800, note: "Half the weight — double the coverage per ton" },
  { material: "Marble chips (loose)", kgPerM3: 1520 },
  { material: "Recycled concrete aggregate (loose)", kgPerM3: 1450 },
  { material: "Asphalt millings (loose)", kgPerM3: 1650, note: "See the asphalt cluster for detail" },
  { material: "Ballast / railway stone (loose)", kgPerM3: 1550 },
];

/** Key estimating constants used across the gravel cluster. */
export const GRAVEL_DENSITY = 1680; // kg/m³ loose common gravel
export const GRAVEL_TONS_PER_YD3 = 1.42; // loose
export const CRUSHER_RUN_COMPACTED = 2240; // kg/m³
