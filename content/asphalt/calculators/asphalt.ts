import { defineCalculator } from "@/lib/calculator";
import { fromBase } from "@/lib/units";

/**
 * General asphalt calculator: area × compacted depth × density → tons.
 * Density options cover the common mixes; values in kg/m³.
 */
export const asphaltCalculator = defineCalculator({
  id: "asphalt-calculator",
  name: "Asphalt Calculator",
  description:
    "Tons and cubic yards for any paving area. Uses compacted thickness — the thickness after rolling, which is what plans specify.",
  fields: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "50",
      min: 0.01,
    },
    {
      id: "width",
      label: "Width",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "12",
      min: 0.01,
    },
    {
      id: "depth",
      label: "Compacted thickness",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm"],
      defaultUnit: "in",
      placeholder: "3",
      min: 0.25,
      hint: "Driveways: 3 in total. Parking lots: 4 in+. Overlays: 1.5–2 in.",
    },
    {
      id: "mix",
      label: "Mix type",
      type: "select",
      options: [
        { value: "hma", label: "Hot mix asphalt — 145 lb/ft³", data: { density: 2322 } },
        { value: "warm", label: "Warm mix — 144 lb/ft³", data: { density: 2300 } },
        { value: "cold", label: "Cold mix / patch — 137 lb/ft³", data: { density: 2200 } },
        { value: "millings", label: "Millings, compacted — 122 lb/ft³", data: { density: 1950 } },
      ],
      defaultValue: "hma",
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — simple rectangle, machine laid" },
        { value: "10", label: "10% — typical (recommended)" },
        { value: "15", label: "15% — irregular edges, hand work" },
      ],
      defaultValue: "10",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const d = inputs.depth as number;
    const density = inputs["mix.density"] as number;
    const waste = 1 + Number(inputs.waste) / 100;

    const areaM2 = l * w;
    const volume = areaM2 * d * waste; // m³ compacted
    const weightKg = volume * density;

    return [
      {
        id: "tons",
        label: "Asphalt to order",
        value: fromBase(weightKg, "ton"),
        unit: "US tons",
        precision: 2,
        primary: true,
        note: "Plants sell by the ton — this is your order quantity.",
      },
      { id: "tonnes", label: "Metric tonnes", value: weightKg / 1000, unit: "t", precision: 2 },
      { id: "yd3", label: "Compacted volume", value: fromBase(volume, "yd3"), unit: "yd³", precision: 2 },
      { id: "m3", label: "Compacted volume", value: volume, unit: "m³", precision: 2 },
      { id: "area", label: "Paved area", value: fromBase(areaM2, "ft2"), unit: "ft²", precision: 0 },
    ];
  },
  disclaimer:
    "Densities are typical compacted values (ASTM D2726 varies by mix design). Confirm the plant's mix density on the ticket — jobs are paid by delivered tons.",
});
