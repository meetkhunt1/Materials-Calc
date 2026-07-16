/**
 * Full aggregate density database — loose AND compacted bulk unit weights,
 * per ASTM C29 typical values. Loose figures match / extend
 * `density-data.ts` (common gravel 1,680 kg/m³ = 105 lb/ft³ = 1.42 t/yd³).
 *
 * Compacted values reflect typical vibratory/rodded gains: clean single-size
 * stone ~+8–9%, graded blends with fines ~+10–13%, rounded stone ~+5–7%.
 */

export interface AggregateDensityRow {
  material: string;
  /** Loose bulk density, kg/m³ */
  looseKg: number;
  /** Compacted (rodded) bulk density, kg/m³ — omitted where not applicable */
  compactedKg?: number;
  note?: string;
}

export interface AggregateGroup {
  group: string;
  rows: AggregateDensityRow[];
}

export const densityDatabase: AggregateGroup[] = [
  {
    group: "Gravel & rounded stone",
    rows: [
      { material: "Pea gravel (3/8 in, rounded)", looseKg: 1540, compactedKg: 1650, note: "Rounded particles barely interlock — pours and flows" },
      { material: "Common gravel, dry", looseKg: 1680, compactedKg: 1850, note: "The 105 lb/ft³ / 1.42 t/yd³ estimating standard" },
      { material: "Gravel, wet", looseKg: 1920, note: "Moisture adds 10–15% to scale weight, not volume" },
      { material: "River rock, 1–3 in", looseKg: 1600, compactedKg: 1680 },
      { material: "Bank run (sand & gravel mix)", looseKg: 1800, compactedKg: 2000, note: "Pit-run blend; gradation varies by deposit" },
      { material: "Riprap, 3–8 in (placed)", looseKg: 1500, note: "Large voids between stones — placed, not compacted" },
    ],
  },
  {
    group: "Crushed stone by size number",
    rows: [
      { material: "Crushed stone #1 (1.5–3.5 in)", looseKg: 1520, compactedKg: 1630, note: "Machine-placed; too large to rake" },
      { material: "Crushed stone #2 (1.5–2.5 in)", looseKg: 1600, compactedKg: 1700 },
      { material: "Crushed stone #3 (1–2 in)", looseKg: 1570, compactedKg: 1680 },
      { material: "Crushed stone #357 (No. 4–2 in)", looseKg: 1580, compactedKg: 1720, note: "Graded blend — packs tighter than single sizes" },
      { material: "Crushed stone #5 (1/2–1 in)", looseKg: 1590, compactedKg: 1710 },
      { material: "Crushed stone #57 (No. 4–1 in)", looseKg: 1600, compactedKg: 1750, note: "The most-ordered size in North America" },
      { material: "Crushed stone #67 (No. 4–3/4 in)", looseKg: 1600, compactedKg: 1740 },
      { material: "Crushed stone #8 (3/8 in chip)", looseKg: 1550, compactedKg: 1680 },
      { material: "Crushed stone #89 (fine chip)", looseKg: 1550, compactedKg: 1670 },
      { material: "Stone dust / #10 screenings", looseKg: 1600, compactedKg: 1810, note: "Fines pack hard — highest compaction gain" },
      { material: "Crusher run / road base", looseKg: 2000, compactedKg: 2240, note: "140 lb/ft³ compacted — matches DGA under asphalt" },
    ],
  },
  {
    group: "By rock type",
    rows: [
      { material: "Crushed limestone", looseKg: 1550, compactedKg: 1700 },
      { material: "Crushed granite", looseKg: 1650, compactedKg: 1800 },
      { material: "Decomposed granite", looseKg: 1600, compactedKg: 1900, note: "Fines bind when watered and rolled" },
      { material: "Crushed trap rock (basalt)", looseKg: 1700, compactedKg: 1870, note: "Densest common quarry rock" },
      { material: "Ballast / railway stone", looseKg: 1550, compactedKg: 1650 },
    ],
  },
  {
    group: "Sand & fines",
    rows: [
      { material: "Concrete sand (coarse, dry)", looseKg: 1600, compactedKg: 1750 },
      { material: "Masonry sand (fine, dry)", looseKg: 1520, compactedKg: 1630 },
      { material: "Sand, wet", looseKg: 1900, note: "Bulking peaks near 5% moisture, then packs" },
    ],
  },
  {
    group: "Specialty, decorative & recycled",
    rows: [
      { material: "Marble chips", looseKg: 1520, compactedKg: 1620 },
      { material: "Lava rock", looseKg: 800, compactedKg: 880, note: "Half the weight of gravel — double the coverage per ton" },
      { material: "Recycled concrete aggregate (RCA)", looseKg: 1450, compactedKg: 1650, note: "Residual mortar makes it lighter than virgin stone" },
      { material: "Asphalt millings", looseKg: 1650, compactedKg: 1950, note: "Binder re-knits under rolling — see the asphalt cluster" },
      { material: "Blast-furnace slag, air-cooled", looseKg: 1400, compactedKg: 1550, note: "Vesicular byproduct aggregate" },
    ],
  },
];

/** Flat list when a page wants every row without group headings. */
export const allDatabaseRows: AggregateDensityRow[] = densityDatabase.flatMap(
  (g) => g.rows,
);
