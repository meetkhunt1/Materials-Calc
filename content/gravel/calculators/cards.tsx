"use client";

/**
 * Client-side bindings for gravel calculator definitions.
 * (CalculatorDefinition.compute can't cross the RSC boundary — see CLAUDE.md.)
 */
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { gravelCalculator } from "./gravel";
import { peaGravelCalculator } from "./pea";
import { crushedStoneCalculator } from "./crushed";
import { drivewayGravelCalculator } from "./driveway";
import { gravelCostCalculator } from "./cost";

export function GravelCalculatorCard() {
  return <CalculatorCard definition={gravelCalculator} />;
}

export function PeaGravelCalculatorCard() {
  return <CalculatorCard definition={peaGravelCalculator} />;
}

export function CrushedStoneCalculatorCard() {
  return <CalculatorCard definition={crushedStoneCalculator} columns={2} />;
}

export function DrivewayGravelCalculatorCard() {
  return <CalculatorCard definition={drivewayGravelCalculator} />;
}

export function GravelCostCalculatorCard() {
  return <CalculatorCard definition={gravelCostCalculator} columns={2} />;
}
