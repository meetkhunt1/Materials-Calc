import { defineCalculator } from "@/lib/calculator";
import { ceilTo } from "@/lib/format";
import { fromBase } from "@/lib/units";

/**
 * TEMPLATE — reference calculator definition (not routed anywhere).
 *
 * Copy this file when creating a real calculator. The engine handles
 * validation, unit conversion and rendering; you only declare fields
 * and write the math. compute() receives all unit fields converted to
 * SI base units (length→m, volume→m³, weight→kg, density→kg/m³).
 */
export const slabCalculatorTemplate = defineCalculator({
  id: "concrete-slab-template",
  name: "Concrete Slab Calculator",
  description: "Estimate the concrete volume, weight and bags needed for a slab.",
  fields: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "in", "yd"],
      defaultUnit: "ft",
      placeholder: "12",
      min: 0.01,
      hint: "Measured along the longest side.",
    },
    {
      id: "width",
      label: "Width",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "in", "yd"],
      defaultUnit: "ft",
      placeholder: "10",
      min: 0.01,
    },
    {
      id: "thickness",
      label: "Thickness",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm", "ft"],
      defaultUnit: "in",
      placeholder: "4",
      min: 0.1,
      hint: "4 inches is standard for patios and walkways.",
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — precise forms" },
        { value: "10", label: "10% — typical (recommended)" },
        { value: "15", label: "15% — uneven subgrade" },
      ],
      defaultValue: "10",
    },
  ],
  compute: (inputs) => {
    const length = inputs.length as number; // meters
    const width = inputs.width as number; // meters
    const thickness = inputs.thickness as number; // meters
    const wastePct = Number(inputs.waste) / 100;

    const volumeM3 = length * width * thickness * (1 + wastePct);
    const DENSITY = 2400; // kg/m³, normal-weight concrete
    const weightKg = volumeM3 * DENSITY;

    // An 80 lb bag yields ≈ 0.60 ft³ ≈ 0.0170 m³
    const bags80 = ceilTo(volumeM3 / 0.017);

    return [
      {
        id: "volume-yd3",
        label: "Concrete needed",
        value: fromBase(volumeM3, "yd3"),
        unit: "yd³",
        precision: 2,
        primary: true,
        note: "Includes your waste allowance.",
      },
      { id: "volume-m3", label: "Volume", value: volumeM3, unit: "m³", precision: 2 },
      { id: "volume-ft3", label: "Volume", value: fromBase(volumeM3, "ft3"), unit: "ft³", precision: 1 },
      { id: "weight-t", label: "Approx. weight", value: weightKg / 1000, unit: "t", precision: 2 },
      { id: "bags-80", label: "80 lb bags", value: bags80, precision: 0 },
    ];
  },
  disclaimer:
    "Estimates assume normal-weight concrete (2,400 kg/m³). Confirm final quantities with your ready-mix supplier.",
});
