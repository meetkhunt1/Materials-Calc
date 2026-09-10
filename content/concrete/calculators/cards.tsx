"use client";

/**
 * Client-side bindings for concrete calculator definitions.
 *
 * CalculatorDefinition contains a compute() function, which cannot cross the
 * Server → Client component boundary as a prop. These wrappers live on the
 * client, so server pages render <SlabCalculatorCard/> instead of passing
 * the definition object down.
 */
import { Square, Circle, Ruler } from "lucide-react";
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { concreteCalculator } from "./general";
import { slabCalculator } from "./slab";
import { footingCalculator } from "./footing";
import { wallCalculator } from "./wall";
import { columnCalculator } from "./column";

export function ConcreteCalculatorCard() {
  return <CalculatorCard definition={concreteCalculator} />;
}

/**
 * Multi-shape switcher for the main concrete calculator page: the same
 * waste-factor takeoff method, applied to rectangular pours, round columns
 * and strip footings without leaving the page.
 */
export function MultiShapeConcreteCalculator() {
  return (
    <Tabs defaultValue="slab" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="slab" className="gap-1.5">
          <Square className="size-4" aria-hidden />
          Slab / Rectangle
        </TabsTrigger>
        <TabsTrigger value="column" className="gap-1.5">
          <Circle className="size-4" aria-hidden />
          Round Column
        </TabsTrigger>
        <TabsTrigger value="footing" className="gap-1.5">
          <Ruler className="size-4" aria-hidden />
          Strip Footing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="slab">
        <CalculatorCard definition={concreteCalculator} />
      </TabsContent>
      <TabsContent value="column">
        <CalculatorCard definition={columnCalculator} columns={2} />
      </TabsContent>
      <TabsContent value="footing">
        <CalculatorCard definition={footingCalculator} />
      </TabsContent>
    </Tabs>
  );
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
