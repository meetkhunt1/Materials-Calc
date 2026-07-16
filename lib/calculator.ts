import type {
  CalculatorDefinition,
  CalculatorField,
  CalculatorResultItem,
  CalculatorValues,
  FieldValue,
  ValidationError,
} from "@/types";
import { DEFAULT_UNIT, toBase, unitsOf } from "@/lib/units";

/**
 * Framework-agnostic calculator engine.
 * A calculator is declared once as a CalculatorDefinition (fields + compute)
 * and rendered by <CalculatorCard>. The engine handles defaults, validation
 * and unit normalization so compute() always receives clean SI numbers.
 */

/** Identity helper — gives authors type inference when declaring calculators. */
export function defineCalculator(definition: CalculatorDefinition): CalculatorDefinition {
  return definition;
}

export function defaultUnitFor(field: CalculatorField): string | undefined {
  if (!field.unitCategory || field.unitCategory === "currency") return undefined;
  if (field.defaultUnit) return field.defaultUnit;
  if (field.units?.length) return field.units[0];
  return DEFAULT_UNIT[field.unitCategory];
}

/** Initial values for a calculator form. */
export function initialValues(definition: CalculatorDefinition): CalculatorValues {
  const values: CalculatorValues = {};
  for (const field of definition.fields) {
    const value =
      field.defaultValue ??
      (field.type === "select" ? field.options?.[0]?.value ?? "" : "");
    values[field.id] = { value, unit: defaultUnitFor(field) };
  }
  return values;
}

export function validate(
  definition: CalculatorDefinition,
  values: CalculatorValues,
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of definition.fields) {
    const entry: FieldValue | undefined = values[field.id];
    const raw = entry?.value;

    if (field.type === "select") {
      if (field.required !== false && (raw === "" || raw == null)) {
        errors.push({ fieldId: field.id, message: "Please choose an option." });
      }
      continue;
    }

    if (raw === "" || raw == null) {
      if (field.required !== false) {
        errors.push({ fieldId: field.id, message: "This field is required." });
      }
      continue;
    }

    const num = typeof raw === "number" ? raw : Number(raw);
    if (!Number.isFinite(num)) {
      errors.push({ fieldId: field.id, message: "Enter a valid number." });
      continue;
    }
    if (field.min != null && num < field.min) {
      errors.push({ fieldId: field.id, message: `Must be at least ${field.min}.` });
    }
    if (field.max != null && num > field.max) {
      errors.push({ fieldId: field.id, message: `Must be at most ${field.max}.` });
    }
  }

  return errors;
}

/**
 * Normalize form values and run the calculator.
 * Numeric unit fields are converted to their category base unit before compute.
 * Throws if called with invalid values — call validate() first.
 */
export function compute(
  definition: CalculatorDefinition,
  values: CalculatorValues,
): CalculatorResultItem[] {
  const inputs: Record<string, number | string> = {};

  for (const field of definition.fields) {
    const entry = values[field.id];
    if (!entry) continue;

    if (field.type === "select") {
      inputs[field.id] = String(entry.value);
      // Surface option data payloads as `${fieldId}.${key}` (e.g. "material.density")
      const option = field.options?.find((o) => o.value === entry.value);
      if (option?.data) {
        for (const [key, val] of Object.entries(option.data)) {
          inputs[`${field.id}.${key}`] = val;
        }
      }
      continue;
    }

    const num = typeof entry.value === "number" ? entry.value : Number(entry.value);
    if (!Number.isFinite(num)) continue;

    inputs[field.id] =
      field.unitCategory && field.unitCategory !== "currency" && entry.unit
        ? toBase(num, entry.unit)
        : num;
  }

  return definition.compute(inputs);
}

/** Human-readable plain-text summary of results — used by Copy/Share actions. */
export function resultsToText(
  definition: CalculatorDefinition,
  results: CalculatorResultItem[],
): string {
  const lines = results.map((r) => {
    const value = `${Intl.NumberFormat("en-US", {
      maximumFractionDigits: r.precision ?? 2,
    }).format(r.value)}${r.unit ? ` ${r.unit}` : ""}`;
    return `${r.label}: ${value}`;
  });
  return `${definition.name}\n${lines.join("\n")}`;
}

/** Runtime sanity-check for calculator definitions (used in dev/tests). */
export function assertValidDefinition(definition: CalculatorDefinition): void {
  const seen = new Set<string>();
  for (const field of definition.fields) {
    if (seen.has(field.id)) throw new Error(`Duplicate field id "${field.id}" in ${definition.id}`);
    seen.add(field.id);
    if (field.type === "select" && !field.options?.length) {
      throw new Error(`Select field "${field.id}" in ${definition.id} has no options`);
    }
    if (field.unitCategory && field.unitCategory !== "currency") {
      // Throws when a restricted unit doesn't belong to the category
      unitsOf(field.unitCategory, field.units);
    }
  }
}
