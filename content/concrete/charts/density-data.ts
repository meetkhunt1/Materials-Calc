import type { DensityRow } from "@/types";

/** Unit weights of common concrete types (PCA / ACI typical values). */
export const concreteDensities: DensityRow[] = [
  { material: "Normal-weight concrete (plain)", kgPerM3: 2300, note: "PCC, unreinforced" },
  { material: "Normal-weight concrete (reinforced)", kgPerM3: 2400, note: "≈1–2% steel by volume" },
  { material: "High-density / heavyweight concrete", kgPerM3: 3800, note: "Magnetite or barite aggregate; radiation shielding" },
  { material: "Structural lightweight concrete", kgPerM3: 1750, note: "Expanded shale/clay aggregate, ASTM C330" },
  { material: "Insulating lightweight concrete", kgPerM3: 800, note: "Perlite/vermiculite; non-structural" },
  { material: "Aerated (AAC) concrete", kgPerM3: 600, note: "Autoclaved blocks" },
  { material: "Fresh (wet) concrete", kgPerM3: 2450, note: "Slightly heavier than cured" },
];

/** Unit weights of concrete ingredients — useful for hand-batching. */
export const ingredientDensities: DensityRow[] = [
  { material: "Portland cement (bulk)", kgPerM3: 1440, note: "ASTM C150; a 94 lb US bag ≈ 1 ft³" },
  { material: "Sand (dry, loose)", kgPerM3: 1600 },
  { material: "Sand (wet)", kgPerM3: 1900, note: "Bulking — batch by weight when possible" },
  { material: "Coarse aggregate 20 mm (¾ in)", kgPerM3: 1550 },
  { material: "Crushed stone base (compacted)", kgPerM3: 2000 },
  { material: "Water", kgPerM3: 1000 },
];
