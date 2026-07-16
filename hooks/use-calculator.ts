"use client";

import * as React from "react";
import type {
  CalculatorDefinition,
  CalculatorResultItem,
  CalculatorValues,
  ValidationError,
} from "@/types";
import { compute, initialValues, resultsToText, validate } from "@/lib/calculator";

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
}

/** State + behavior for any CalculatorDefinition. Used by <CalculatorCard>. */
export function useCalculator(definition: CalculatorDefinition): UseCalculatorReturn {
  const [values, setValues] = React.useState<CalculatorValues>(() =>
    initialValues(definition),
  );
  const [results, setResults] = React.useState<CalculatorResultItem[] | null>(null);
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
    if (validationErrors.length > 0) {
      setResults(null);
      return;
    }
    setResults(compute(definition, values));
  }, [definition, values]);

  const reset = React.useCallback(() => {
    setValues(initialValues(definition));
    setResults(null);
    setErrors([]);
    setSubmitted(false);
  }, [definition]);

  const errorFor = React.useCallback(
    (fieldId: string) => errors.find((e) => e.fieldId === fieldId)?.message,
    [errors],
  );

  const asText = React.useCallback(
    () => (results ? resultsToText(definition, results) : ""),
    [definition, results],
  );

  return { values, results, errors, submitted, setValue, setUnit, calculate, reset, errorFor, asText };
}
