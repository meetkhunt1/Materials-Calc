import { defineCalculator } from "@/lib/calculator";
import { fromBase } from "@/lib/units";

/** General gravel calculator: area × depth × type density → tons + yards. */
export const gravelCalculator = defineCalculator({
  id: "gravel-calculator",
  name: "Gravel Calculator",
  description:
    "Tons and cubic yards for any gravel or crushed stone type. Pick the material — the right density is applied automatically.",
  fields: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "20",
      min: 0.01,
    },
    {
      id: "width",
      label: "Width",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "10",
      min: 0.01,
    },
    {
      id: "depth",
      label: "Depth",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm", "ft"],
      defaultUnit: "in",
      placeholder: "3",
      min: 0.25,
      hint: "Paths 2–3 in · patios 2–4 in · driveways 4–12 in in layers.",
    },
    {
      id: "type",
      label: "Gravel type",
      type: "select",
      options: [
        { value: "common", label: "Common gravel — 105 lb/ft³", data: { density: 1680 } },
        { value: "pea", label: "Pea gravel — 96 lb/ft³", data: { density: 1540 } },
        { value: "57", label: "Crushed stone #57 — 100 lb/ft³", data: { density: 1600 } },
        { value: "crusher", label: "Crusher run (compacted) — 140 lb/ft³", data: { density: 2240 } },
        { value: "river", label: "River rock — 100 lb/ft³", data: { density: 1600 } },
        { value: "bank", label: "Bank run mix — 112 lb/ft³", data: { density: 1800 } },
      ],
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
    const l = inputs.length as number;
    const w = inputs.width as number;
    const d = inputs.depth as number;
    const density = inputs["type.density"] as number;
    const waste = 1 + Number(inputs.waste) / 100;

    const volume = l * w * d * waste;
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
      { id: "ft3", label: "Volume", value: fromBase(volume, "ft3"), unit: "ft³", precision: 1 },
      { id: "area", label: "Covered area", value: fromBase(l * w, "ft2"), unit: "ft²", precision: 0 },
    ];
  },
  disclaimer:
    "Loose bulk densities per ASTM C29 typical values; your quarry's material may vary ±10%. Wet gravel weighs 10–15% more on the scale.",
});
