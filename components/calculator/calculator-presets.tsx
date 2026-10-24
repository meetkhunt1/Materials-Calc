"use client";

import { Sparkles } from "lucide-react";
import type { CalculatorPreset } from "@/types";

interface CalculatorPresetsProps {
  presets: CalculatorPreset[];
  onSelect: (preset: CalculatorPreset) => void;
}

/** One-click project-size shortcuts: fills the form and calculates instantly. */
export function CalculatorPresets({ presets, onSelect }: CalculatorPresetsProps) {
  if (presets.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Sparkles className="size-3.5" />
        Quick fill a common size
      </p>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            title={preset.description}
            onClick={() => onSelect(preset)}
            className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary-soft-foreground"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
