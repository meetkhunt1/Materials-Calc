import { defineCalculator } from "@/lib/calculator";
import { ceilTo } from "@/lib/format";
import { toBase, fromBase } from "@/lib/units";
import type { CalculatorResultItem } from "@/types";

/**
 * Recycled asphalt millings (RAP): sold loose by the ton or yard, placed and
 * rolled to a compacted depth. Weight is conserved through compaction, so
 * tonnage comes from the compacted volume and the loose yards to order from
 * the loose density.
 */
export const MILLINGS_LOOSE_DENSITY = toBase(103, "lbft3"); // ≈1,650 kg/m³
export const MILLINGS_COMPACTED_DENSITY = toBase(122, "lbft3"); // ≈1,954 kg/m³

export const millingsCalculator = defineCalculator({
  id: "asphalt-millings-calculator",
  name: "Asphalt Millings Calculator",
  description:
    "Tons and loose cubic yards of recycled asphalt millings for a driveway, lot or path, from the compacted depth you want.",
  embedPath: "/asphalt/asphalt-millings-calculator/",
  fields: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "yd", "m"],
      defaultUnit: "ft",
      defaultValue: 50,
      placeholder: "50",
      min: 0.1,
    },
    {
      id: "width",
      label: "Width",
      type: "number",
      unitCategory: "length",
      units: ["ft", "yd", "m"],
      defaultUnit: "ft",
      defaultValue: 12,
      placeholder: "12",
      min: 0.1,
    },
    {
      id: "depth",
      label: "Compacted depth",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm"],
      defaultUnit: "in",
      defaultValue: 4,
      placeholder: "4",
      min: 0.5,
      hint: "Depth after rolling. 3–4 in for driveways over a firm base, 6 in on soft ground.",
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      options: [
        { value: "5", label: "5%: firm, graded base" },
        { value: "10", label: "10%: typical (recommended)" },
        { value: "15", label: "15%: soft or uneven ground" },
      ],
      defaultValue: "10",
    },
    {
      id: "pricePerTon",
      label: "Price per ton ($, optional)",
      type: "number",
      min: 0,
      max: 500,
      required: false,
      hint: "Leave blank for quantities only. Millings prices vary widely by region and plant stockpile, so ask locally.",
    },
  ],
  compute: (inputs) => {
    const length = inputs.length as number; // m
    const width = inputs.width as number; // m
    const depth = inputs.depth as number; // m
    const waste = 1 + Number(inputs.waste) / 100;
    const pricePerTon = Number(inputs.pricePerTon) || 0;

    const compactedM3 = length * width * depth * waste;
    const kg = compactedM3 * MILLINGS_COMPACTED_DENSITY;
    const tons = fromBase(kg, "ton");
    const looseM3 = kg / MILLINGS_LOOSE_DENSITY;

    const results: CalculatorResultItem[] = [
      {
        id: "tons",
        label: "Millings to order",
        value: tons,
        unit: "US tons",
        precision: 2,
        primary: true,
        note: "Includes your waste allowance. Weight does not change when millings are rolled.",
      },
      {
        id: "loose-yd3",
        label: "Loose volume (as delivered)",
        value: fromBase(looseM3, "yd3"),
        unit: "yd³",
        precision: 2,
        note: "Use this if your supplier sells by the yard.",
      },
      {
        id: "compacted-yd3",
        label: "Compacted volume (in place)",
        value: fromBase(compactedM3, "yd3"),
        unit: "yd³",
        precision: 2,
      },
      { id: "tonnes", label: "Metric tonnes", value: kg / 1000, unit: "t", precision: 2 },
      {
        id: "loads",
        label: "Tandem dump truck loads (≈14 ton payload)",
        value: ceilTo(tons / 14),
        precision: 0,
      },
    ];

    if (pricePerTon > 0) {
      results.push({
        id: "cost",
        label: "Material cost",
        value: tons * pricePerTon,
        unit: "USD",
        precision: 0,
        note: "Material only. Delivery, grading and rolling are extra.",
      });
    }

    return results;
  },
  disclaimer:
    "Uses 103 lb/ft³ loose and 122 lb/ft³ compacted, typical for milled asphalt. Moisture and fines content shift both by a few percent, so confirm with your supplier's scale tickets.",
  presets: [
    {
      id: "driveway-12x50",
      label: "12×50 Driveway",
      description: "4 in compacted, 10% waste",
      values: {
        length: { value: 50, unit: "ft" },
        width: { value: 12, unit: "ft" },
        depth: { value: 4, unit: "in" },
        waste: { value: "10" },
      },
    },
    {
      id: "pad-20x20",
      label: "20×20 Parking Pad",
      description: "4 in compacted, 10% waste",
      values: {
        length: { value: 20, unit: "ft" },
        width: { value: 20, unit: "ft" },
        depth: { value: 4, unit: "in" },
        waste: { value: "10" },
      },
    },
    {
      id: "farm-lane",
      label: "10×300 Farm Lane",
      description: "6 in compacted, 15% waste",
      values: {
        length: { value: 300, unit: "ft" },
        width: { value: 10, unit: "ft" },
        depth: { value: 6, unit: "in" },
        waste: { value: "15" },
      },
    },
  ],
});
