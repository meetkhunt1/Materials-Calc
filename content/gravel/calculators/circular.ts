import { defineCalculator } from "@/lib/calculator";
import { fromBase } from "@/lib/units";
import { GRAVEL_TYPE_OPTIONS } from "./gravel";

/** Circular/round areas: fire pits, tree rings, round patios. V = π × r² × depth. */
export const circularGravelCalculator = defineCalculator({
  id: "circular-gravel-calculator",
  name: "Circular Gravel Calculator",
  description:
    "Tons and cubic yards for round areas — fire pits, tree rings and circular patios — by diameter and depth.",
  fields: [
    {
      id: "diameter",
      label: "Diameter",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd", "in"],
      defaultUnit: "ft",
      defaultValue: 10,
      placeholder: "10",
      min: 0.1,
      hint: "Fire pits: 4–6 ft · tree rings: 3–5 ft · round patios: 10–16 ft.",
    },
    {
      id: "depth",
      label: "Depth",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm", "ft"],
      defaultUnit: "in",
      defaultValue: 3,
      placeholder: "3",
      min: 0.25,
      hint: "Fire pits & tree rings 3–4 in · patios 2–4 in.",
    },
    {
      id: "type",
      label: "Gravel type",
      type: "select",
      options: GRAVEL_TYPE_OPTIONS,
      defaultValue: "common",
    },
    {
      id: "waste",
      label: "Waste / settling allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — decorative, contained beds" },
        { value: "10", label: "10% — typical (recommended)" },
        { value: "15", label: "15% — soft ground, first lift sinks in" },
      ],
      defaultValue: "10",
    },
  ],
  compute: (inputs) => {
    const diameter = inputs.diameter as number;
    const depth = inputs.depth as number;
    const density = inputs["type.density"] as number;
    const waste = 1 + Number(inputs.waste) / 100;

    const radius = diameter / 2;
    const area = Math.PI * radius * radius;
    const volume = area * depth * waste;
    const kg = volume * density;

    return [
      {
        id: "tons",
        label: "Gravel to order",
        value: fromBase(kg, "ton"),
        unit: "US tons",
        precision: 2,
        primary: true,
        note: "Suppliers sell by the ton or the yard — this line and the next cover both.",
      },
      { id: "yd3", label: "Volume", value: fromBase(volume, "yd3"), unit: "yd³", precision: 2 },
      { id: "tonnes", label: "Metric tonnes", value: kg / 1000, unit: "t", precision: 2 },
      { id: "area", label: "Covered area", value: fromBase(area, "ft2"), unit: "ft²", precision: 0 },
    ];
  },
  disclaimer:
    "Loose bulk densities per ASTM C29 typical values; your quarry's material may vary ±10%. Wet gravel weighs 10–15% more on the scale.",
});
