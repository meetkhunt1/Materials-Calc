"use client";

/**
 * Client-side bindings for gravel calculator definitions.
 * (CalculatorDefinition.compute can't cross the RSC boundary; see CLAUDE.md.)
 */
import { Square, Circle } from "lucide-react";
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { gravelCalculator } from "./gravel";
import { circularGravelCalculator } from "./circular";
import { peaGravelCalculator } from "./pea";
import { crushedStoneCalculator } from "./crushed";
import { drivewayGravelCalculator } from "./driveway";
import { gravelCostCalculator } from "./cost";

export function GravelCalculatorCard() {
  return <CalculatorCard definition={gravelCalculator} />;
}

/** Rectangle vs circular gravel areas: fire pits, tree rings and round patios. */
export function MultiShapeGravelCalculator() {
  return (
    <Tabs defaultValue="rectangle" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="rectangle" className="gap-1.5">
          <Square className="size-4" aria-hidden />
          Rectangle / Driveway
        </TabsTrigger>
        <TabsTrigger value="circular" className="gap-1.5">
          <Circle className="size-4" aria-hidden />
          Circular / Round Area
        </TabsTrigger>
      </TabsList>
      <TabsContent value="rectangle">
        <CalculatorCard definition={gravelCalculator} />
      </TabsContent>
      <TabsContent value="circular">
        <CalculatorCard definition={circularGravelCalculator} />
      </TabsContent>
    </Tabs>
  );
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
