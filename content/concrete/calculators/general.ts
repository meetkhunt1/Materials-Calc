import { defineCalculator } from "@/lib/calculator";
import { ceilTo } from "@/lib/format";
import { fromBase } from "@/lib/units";

/** Bag yields in m³ (QUIKRETE/Sakrete published yields: 0.30/0.45/0.60 ft³) */
export const BAG_YIELD_M3 = {
  "40": 0.0085,
  "60": 0.0127,
  "80": 0.017,
} as const;

export const CONCRETE_DENSITY = 2400; // kg/m³, normal-weight (ACI 318 assumes 145–150 lb/ft³)

export const concreteCalculator = defineCalculator({
  id: "concrete-calculator",
  name: "Concrete Calculator",
  description:
    "Volume, weight and bag count for any rectangular pour. Switch units freely — the math is handled for you.",
  fields: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "in", "yd", "cm"],
      defaultUnit: "ft",
      placeholder: "12",
      min: 0.01,
    },
    {
      id: "width",
      label: "Width",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "in", "yd", "cm"],
      defaultUnit: "ft",
      placeholder: "10",
      min: 0.01,
    },
    {
      id: "depth",
      label: "Depth / thickness",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm", "ft", "m"],
      defaultUnit: "in",
      placeholder: "4",
      min: 0.1,
      hint: "Slabs are typically 4 in (100 mm); driveways 5–6 in.",
    },
    {
      id: "quantity",
      label: "Number of identical pours",
      type: "number",
      defaultValue: 1,
      min: 1,
      max: 500,
      step: 1,
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — formed edges, firm subgrade" },
        { value: "10", label: "10% — typical (recommended)" },
        { value: "15", label: "15% — pour against earth, uneven base" },
      ],
      defaultValue: "10",
    },
    {
      id: "bag",
      label: "Bag size (if using bagged mix)",
      type: "select",
      options: [
        { value: "80", label: "80 lb bag (0.60 ft³ yield)" },
        { value: "60", label: "60 lb bag (0.45 ft³ yield)" },
        { value: "40", label: "40 lb bag (0.30 ft³ yield)" },
      ],
      defaultValue: "80",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const d = inputs.depth as number;
    const qty = (inputs.quantity as number) || 1;
    const waste = 1 + Number(inputs.waste) / 100;
    const bagKey = String(inputs.bag) as keyof typeof BAG_YIELD_M3;

    const volume = l * w * d * qty * waste;
    const weightKg = volume * CONCRETE_DENSITY;
    const bags = ceilTo(volume / BAG_YIELD_M3[bagKey]);

    return [
      {
        id: "yd3",
        label: "Concrete required",
        value: fromBase(volume, "yd3"),
        unit: "yd³",
        precision: 2,
        primary: true,
        note: "Order this quantity from a ready-mix plant (includes waste).",
      },
      { id: "m3", label: "Volume (metric)", value: volume, unit: "m³", precision: 2 },
      { id: "ft3", label: "Volume", value: fromBase(volume, "ft3"), unit: "ft³", precision: 1 },
      {
        id: "bags",
        label: `${bagKey} lb bags`,
        value: bags,
        precision: 0,
        note: "Rounded up to whole bags.",
      },
      { id: "wt", label: "Approx. weight", value: weightKg / 1000, unit: "t", precision: 2 },
      {
        id: "wtus",
        label: "Approx. weight",
        value: fromBase(weightKg, "ton"),
        unit: "US tons",
        precision: 2,
      },
    ];
  },
  disclaimer:
    "Assumes normal-weight concrete at 2,400 kg/m³ (150 lb/ft³). Ready-mix is sold in 0.25 yd³ increments — confirm the final order with your supplier.",
});
