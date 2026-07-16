"use client";

/**
 * Client-side bindings for concrete calculator definitions.
 *
 * CalculatorDefinition contains a compute() function, which cannot cross the
 * Server → Client component boundary as a prop. These wrappers live on the
 * client, so server pages render <SlabCalculatorCard/> instead of passing
 * the definition object down.
 */
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { concreteCalculator } from "./general";
import { slabCalculator } from "./slab";
import { footingCalculator } from "./footing";
import { wallCalculator } from "./wall";
import { columnCalculator } from "./column";

export function ConcreteCalculatorCard() {
  return <CalculatorCard definition={concreteCalculator} />;
}

export function SlabCalculatorCard() {
  return <CalculatorCard definition={slabCalculator} columns={2} />;
}

export function FootingCalculatorCard() {
  return <CalculatorCard definition={footingCalculator} />;
}

export function WallCalculatorCard() {
  return <CalculatorCard definition={wallCalculator} />;
}

export function ColumnCalculatorCard() {
  return <CalculatorCard definition={columnCalculator} columns={2} />;
}
