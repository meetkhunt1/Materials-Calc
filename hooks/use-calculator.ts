"use client";

import * as React from "react";
import type {
  CalculatorDefinition,
  CalculatorResultItem,
  CalculatorValues,
  ValidationError,
} from "@/types";
import { compute, initialValues, resultsToText, validate } from "@/lib/calculator";

/** Only returns results when the given values are already complete and valid. */
function computeIfValid(
  definition: CalculatorDefinition,
  values: CalculatorValues,
): CalculatorResultItem[] | null {
  return validate(definition, values).length > 0 ? null : compute(definition, values);
}

export interface UseCalculatorReturn {
  values: CalculatorValues;
  results: CalculatorResultItem[] | null;
  errors: ValidationError[];
  /** True once the user has attempted a calculation (errors show after this) */
  submitted: boolean;
  setValue: (fieldId: string, value: number | string) => void;
  setUnit: (fieldId: string, unit: string) => void;
  calculate: () => void;
  reset: () => void;
  errorFor: (fieldId: string) => string | undefined;
  /** Plain-text summary of current results (copy/share) */
  asText: () => string;
  /** Fill fields from a preset and calculate immediately */
  applyPreset: (values: CalculatorValues) => void;
}

/** State + behavior for any CalculatorDefinition. Used by <CalculatorCard>. */
export function useCalculator(definition: CalculatorDefinition): UseCalculatorReturn {
  const [values, setValues] = React.useState<CalculatorValues>(() =>
    initialValues(definition),
  );
  // Calculators whose fields ship complete defaults show a result immediately
  // instead of a blank box; ones that still need real user input (no sane
  // default dimension) fall back to the existing null/empty state.
  const [results, setResults] = React.useState<CalculatorResultItem[] | null>(() =>
    computeIfValid(definition, initialValues(definition)),
  );
  const [errors, setErrors] = React.useState<ValidationError[]>([]);
  const [submitted, setSubmitted] = React.useState(false);

  const setValue = React.useCallback((fieldId: string, value: number | string) => {
    setValues((prev) => ({ ...prev, [fieldId]: { ...prev[fieldId], value } }));
  }, []);

  const setUnit = React.useCallback((fieldId: string, unit: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: { ...prev[fieldId], unit } }));
  }, []);

  const calculate = React.useCallback(() => {
    setSubmitted(true);
    const validationErrors = validate(definition, values);
    setErrors(validationErrors);
    setResults(validationErrors.length > 0 ? null : compute(definition, values));
  }, [definition, values]);

  const reset = React.useCallback(() => {
    const fresh = initialValues(definition);
    setValues(fresh);
    setResults(computeIfValid(definition, fresh));
    setErrors([]);
    setSubmitted(false);
  }, [definition]);

  const applyPreset = React.useCallback(
    (presetValues: CalculatorValues) => {
      const merged = { ...values };
      for (const [fieldId, fieldValue] of Object.entries(presetValues)) {
        merged[fieldId] = { ...merged[fieldId], ...fieldValue };
      }
      setValues(merged);
      setSubmitted(true);
      setErrors(validate(definition, merged));
      setResults(computeIfValid(definition, merged));
    },
    [definition, values],
  );

  const errorFor = React.useCallback(
    (fieldId: string) => errors.find((e) => e.fieldId === fieldId)?.message,
    [errors],
  );

  const asText = React.useCallback(
    () => (results ? resultsToText(definition, results) : ""),
    [definition, results],
  );

  return {
    values,
    results,
    errors,
    submitted,
    setValue,
    setUnit,
    calculate,
    reset,
    errorFor,
    asText,
    applyPreset,
  };
}
