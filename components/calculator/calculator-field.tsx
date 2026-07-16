"use client";

import * as React from "react";
import type { CalculatorField as FieldDef, FieldValue } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { unitsOf } from "@/lib/units";
import { cn } from "@/lib/utils";

interface CalculatorFieldProps {
  field: FieldDef;
  value: FieldValue;
  error?: string;
  onValueChange: (value: number | string) => void;
  onUnitChange: (unit: string) => void;
}

/**
 * Renders one calculator input:
 *  - number fields with an attached unit dropdown when unitCategory is set
 *  - select fields (material pickers etc.)
 */
export function CalculatorField({
  field,
  value,
  error,
  onValueChange,
  onUnitChange,
}: CalculatorFieldProps) {
  const inputId = `calc-${field.id}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const units =
    field.unitCategory && field.unitCategory !== "currency"
      ? unitsOf(field.unitCategory, field.units)
      : [];

  return (
    <div className="space-y-1.5">
      <Label htmlFor={inputId}>{field.label}</Label>

      {field.type === "select" ? (
        <Select value={String(value.value)} onValueChange={onValueChange}>
          <SelectTrigger id={inputId} aria-describedby={field.hint ? hintId : undefined}>
            <SelectValue placeholder={field.placeholder ?? "Select…"} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className={cn("flex gap-2", units.length > 0 && "items-stretch")}>
          <Input
            id={inputId}
            type="number"
            inputMode="decimal"
            step={field.step ?? "any"}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            value={value.value === "" ? "" : String(value.value)}
            onChange={(e) => onValueChange(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={cn(error && errorId, field.hint && hintId) || undefined}
            className="flex-1"
          />
          {units.length > 0 && (
            <Select value={value.unit} onValueChange={onUnitChange}>
              <SelectTrigger
                aria-label={`${field.label} unit`}
                className="w-24 shrink-0"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      {field.hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {field.hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
