import assert from "node:assert/strict";
import type { CalculatorDefinition, CalculatorResultItem, CalculatorValues } from "@/types";
import { compute, initialValues, validate } from "@/lib/calculator";

/**
 * Independent first-principles constants. These are typed in from the
 * exact legal definitions, NOT imported from lib/units.ts, so the tests
 * catch a wrong constant in the code instead of agreeing with it.
 */
export const FT = 0.3048; // m, exact (1959 international foot)
export const IN = FT / 12; // 0.0254 m, exact
export const YD = 3 * FT; // 0.9144 m, exact
export const FT2 = FT * FT; // m²
export const FT3 = FT * FT * FT; // 0.028316846592 m³
export const YD3 = 27 * FT3; // 0.764554857984 m³
export const LB = 0.45359237; // kg, exact
export const SHORT_TON_LB = 2000; // US ton
export const SHORT_TON_KG = SHORT_TON_LB * LB; // 907.18474 kg

/** Convert a density in kg/m³ to lb/ft³ (for hand math in imperial). */
export const lbPerFt3 = (kgPerM3: number) => (kgPerM3 * FT3) / LB;

/** Short tons from cubic feet at a given kg/m³ density. */
export const tonsFromFt3 = (ft3: number, kgPerM3: number) =>
  (ft3 * lbPerFt3(kgPerM3)) / SHORT_TON_LB;

export type Override = number | string | readonly [number | string, string];

/**
 * Start from the calculator's own initial values, then override.
 * `[value, unit]` sets both; a bare value keeps the default unit.
 */
export function vals(
  definition: CalculatorDefinition,
  overrides: Record<string, Override> = {},
): CalculatorValues {
  const values = initialValues(definition);
  for (const [id, override] of Object.entries(overrides)) {
    if (!values[id]) throw new Error(`Unknown field "${id}" on ${definition.id}`);
    if (typeof override === "object") {
      values[id] = { value: override[0], unit: override[1] };
    } else {
      values[id] = { ...values[id], value: override };
    }
  }
  return values;
}

/** Validate (must be clean) then compute, like the UI does. */
export function run(
  definition: CalculatorDefinition,
  overrides: Record<string, Override> = {},
): Record<string, CalculatorResultItem> {
  const values = vals(definition, overrides);
  const errors = validate(definition, values);
  assert.deepEqual(errors, [], `unexpected validation errors on ${definition.id}`);
  const results = compute(definition, values);
  const map: Record<string, CalculatorResultItem> = {};
  for (const r of results) {
    assert.ok(Number.isFinite(r.value), `${definition.id}.${r.id} is not finite: ${r.value}`);
    map[r.id] = r;
  }
  return map;
}

/** Relative-tolerance float comparison (default: essentially exact). */
export function close(actual: number, expected: number, relTol = 1e-9, label = "") {
  const diff = Math.abs(actual - expected);
  const scale = Math.max(Math.abs(expected), 1e-12);
  assert.ok(
    diff / scale <= relTol,
    `${label} expected ${expected}, got ${actual} (rel diff ${(diff / scale).toExponential(2)})`,
  );
}

/** Same result ids and values (to relTol) for two runs. */
export function sameResults(
  a: Record<string, CalculatorResultItem>,
  b: Record<string, CalculatorResultItem>,
  relTol = 1e-9,
) {
  assert.deepEqual(Object.keys(a).sort(), Object.keys(b).sort());
  for (const id of Object.keys(a)) close(b[id].value, a[id].value, relTol, id);
}
