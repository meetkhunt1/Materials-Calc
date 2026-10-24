import type { CalculatorDefinition } from "@/types";
import { asphaltCalculator } from "@/content/asphalt/calculators/asphalt";
import { costCalculator } from "@/content/asphalt/calculators/cost";
import { drivewayCalculator } from "@/content/asphalt/calculators/driveway";
import { volumeCalculator } from "@/content/asphalt/calculators/volume";
import { weightCalculator } from "@/content/asphalt/calculators/weight";
import { slabCalculatorTemplate } from "@/content/concrete/calculators/_template";
import { columnCalculator } from "@/content/concrete/calculators/column";
import { footingCalculator } from "@/content/concrete/calculators/footing";
import { concreteCalculator } from "@/content/concrete/calculators/general";
import { slabCalculator } from "@/content/concrete/calculators/slab";
import { wallCalculator } from "@/content/concrete/calculators/wall";
import { circularGravelCalculator } from "@/content/gravel/calculators/circular";
import { gravelCostCalculator } from "@/content/gravel/calculators/cost";
import { crushedStoneCalculator } from "@/content/gravel/calculators/crushed";
import { drivewayGravelCalculator } from "@/content/gravel/calculators/driveway";
import { gravelCalculator } from "@/content/gravel/calculators/gravel";
import { peaGravelCalculator } from "@/content/gravel/calculators/pea";

/** Every CalculatorDefinition in content/<category>/calculators/. */
export const ALL_CALCULATORS: CalculatorDefinition[] = [
  asphaltCalculator,
  costCalculator,
  drivewayCalculator,
  volumeCalculator,
  weightCalculator,
  slabCalculatorTemplate,
  columnCalculator,
  footingCalculator,
  concreteCalculator,
  slabCalculator,
  wallCalculator,
  circularGravelCalculator,
  gravelCostCalculator,
  crushedStoneCalculator,
  drivewayGravelCalculator,
  gravelCalculator,
  peaGravelCalculator,
];

/**
 * A known-valid input set for each calculator, used by the generic
 * boundary and unit-consistency tests. Number fields are imperial here.
 */
export const VALID_INPUTS: Record<string, Record<string, number | string | [number, string]>> = {
  "asphalt-calculator": { length: [20, "ft"], width: [10, "ft"], depth: [3, "in"] },
  "asphalt-cost-calculator": { length: [40, "ft"], width: [12, "ft"], depth: [3, "in"] },
  "asphalt-driveway-calculator": { length: [30, "ft"], width: [12, "ft"] },
  "asphalt-volume-calculator": { length: [60, "ft"], width: [20, "ft"], depth: [4, "in"] },
  "asphalt-weight-calculator": { volume: [10, "yd3"] },
  "concrete-slab-template": { length: [12, "ft"], width: [10, "ft"], thickness: [4, "in"] },
  "concrete-column-calculator": { size: [12, "in"], height: [4, "ft"] },
  "concrete-footing-calculator": {},
  "concrete-calculator": {},
  "concrete-slab-calculator": {},
  "concrete-wall-calculator": { length: [40, "ft"], height: [8, "ft"] },
  "circular-gravel-calculator": {},
  "gravel-cost-calculator": { length: [40, "ft"], width: [12, "ft"], depth: [4, "in"] },
  "crushed-stone-calculator": { length: [30, "ft"], width: [10, "ft"], depth: [4, "in"] },
  "driveway-gravel-calculator": { length: [50, "ft"], width: [12, "ft"] },
  "gravel-calculator": {},
  "pea-gravel-calculator": {},
};
