"use client";

/**
 * Client-side bindings for asphalt calculator definitions.
 * (CalculatorDefinition.compute can't cross the RSC boundary — see CLAUDE.md.)
 */
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { asphaltCalculator } from "./asphalt";
import { drivewayCalculator } from "./driveway";
import { weightCalculator } from "./weight";
import { costCalculator } from "./cost";
import { volumeCalculator } from "./volume";

export function AsphaltCalculatorCard() {
  return <CalculatorCard definition={asphaltCalculator} />;
}

export function DrivewayCalculatorCard() {
  return <CalculatorCard definition={drivewayCalculator} columns={2} />;
}

export function WeightCalculatorCard() {
  return <CalculatorCard definition={weightCalculator} />;
}

export function CostCalculatorCard() {
  return <CalculatorCard definition={costCalculator} columns={2} />;
}

export function VolumeCalculatorCard() {
  return <CalculatorCard definition={volumeCalculator} />;
}
