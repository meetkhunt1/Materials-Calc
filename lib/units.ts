import type { Unit, UnitCategory } from "@/types";

/**
 * Unit registry. Every unit stores a multiplier to its category base unit:
 *   length → meters, area → m², volume → m³, weight → kg, density → kg/m³.
 * Converting A→B is therefore (value × A.toBase) / B.toBase.
 */

const FT = 0.3048;
const IN = 0.0254;
const YD = 0.9144;
const LB = 0.45359237;

export const UNITS: Unit[] = [
  // Length (base: meter)
  { id: "mm", label: "mm", name: "millimeters", toBase: 0.001, category: "length" },
  { id: "cm", label: "cm", name: "centimeters", toBase: 0.01, category: "length" },
  { id: "m", label: "m", name: "meters", toBase: 1, category: "length" },
  { id: "in", label: "in", name: "inches", toBase: IN, category: "length" },
  { id: "ft", label: "ft", name: "feet", toBase: FT, category: "length" },
  { id: "yd", label: "yd", name: "yards", toBase: YD, category: "length" },

  // Area (base: square meter)
  { id: "m2", label: "m²", name: "square meters", toBase: 1, category: "area" },
  { id: "ft2", label: "ft²", name: "square feet", toBase: FT * FT, category: "area" },
  { id: "yd2", label: "yd²", name: "square yards", toBase: YD * YD, category: "area" },
  { id: "acre", label: "acre", name: "acres", toBase: 4046.8564224, category: "area" },

  // Volume (base: cubic meter)
  { id: "m3", label: "m³", name: "cubic meters", toBase: 1, category: "volume" },
  { id: "l", label: "L", name: "liters", toBase: 0.001, category: "volume" },
  { id: "ft3", label: "ft³", name: "cubic feet", toBase: FT ** 3, category: "volume" },
  { id: "yd3", label: "yd³", name: "cubic yards", toBase: YD ** 3, category: "volume" },
  { id: "gal", label: "gal", name: "US gallons", toBase: 0.003785411784, category: "volume" },

  // Weight (base: kilogram)
  { id: "kg", label: "kg", name: "kilograms", toBase: 1, category: "weight" },
  { id: "t", label: "t", name: "metric tons", toBase: 1000, category: "weight" },
  { id: "lb", label: "lb", name: "pounds", toBase: LB, category: "weight" },
  { id: "ton", label: "ton", name: "US tons", toBase: LB * 2000, category: "weight" },

  // Density (base: kg/m³)
  { id: "kgm3", label: "kg/m³", name: "kilograms per cubic meter", toBase: 1, category: "density" },
  { id: "lbft3", label: "lb/ft³", name: "pounds per cubic foot", toBase: LB / FT ** 3, category: "density" },
  { id: "lbyd3", label: "lb/yd³", name: "pounds per cubic yard", toBase: LB / YD ** 3, category: "density" },
  { id: "tm3", label: "t/m³", name: "metric tons per cubic meter", toBase: 1000, category: "density" },
];

const byId = new Map(UNITS.map((u) => [u.id, u]));

export function getUnit(id: string): Unit {
  const unit = byId.get(id);
  if (!unit) throw new Error(`Unknown unit: ${id}`);
  return unit;
}

export function unitsOf(category: UnitCategory, restrictTo?: string[]): Unit[] {
  const all = UNITS.filter((u) => u.category === category);
  if (!restrictTo?.length) return all;
  return restrictTo.map((id) => {
    const unit = byId.get(id);
    if (!unit || unit.category !== category) {
      throw new Error(`Unit "${id}" is not a ${category} unit`);
    }
    return unit;
  });
}

/** Convert a value between two units of the same category. */
export function convert(value: number, fromId: string, toId: string): number {
  const from = getUnit(fromId);
  const to = getUnit(toId);
  if (from.category !== to.category) {
    throw new Error(`Cannot convert ${from.category} to ${to.category}`);
  }
  return (value * from.toBase) / to.toBase;
}

/** Convert a value in the given unit to its category base unit. */
export function toBase(value: number, unitId: string): number {
  return value * getUnit(unitId).toBase;
}

/** Convert a base-unit value into the given unit. */
export function fromBase(value: number, unitId: string): number {
  return value / getUnit(unitId).toBase;
}

/** Default unit per category (metric-first; calculators can override). */
export const DEFAULT_UNIT: Record<Exclude<UnitCategory, "none" | "currency">, string> = {
  length: "m",
  area: "m2",
  volume: "m3",
  weight: "kg",
  density: "kgm3",
};
