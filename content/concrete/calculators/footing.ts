import { defineCalculator } from "@/lib/calculator";
import { ceilTo } from "@/lib/format";
import { fromBase } from "@/lib/units";
import { BAG_YIELD_M3, CONCRETE_DENSITY } from "./general";

export const footingCalculator = defineCalculator({
  id: "concrete-footing-calculator",
  name: "Concrete Footing Calculator",
  description:
    "Continuous (strip) footings for foundations, garden walls and deck beams. Enter the total run length.",
  fields: [
    {
      id: "length",
      label: "Total footing run",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "120",
      min: 0.01,
      hint: "Sum of all wall lengths the footing supports.",
    },
    {
      id: "width",
      label: "Footing width",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "ft", "m"],
      defaultUnit: "in",
      placeholder: "16",
      min: 1,
      hint: "Commonly 2× the wall thickness (e.g. 16 in under an 8 in wall).",
    },
    {
      id: "depth",
      label: "Footing depth (thickness)",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "ft", "m"],
      defaultUnit: "in",
      placeholder: "8",
      min: 1,
      hint: "Minimum 6 in per IRC R403.1; 8–12 in is typical.",
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — formed both sides" },
        { value: "10", label: "10% — one formed side (recommended)" },
        { value: "15", label: "15% — poured against trench walls" },
      ],
      defaultValue: "10",
      hint: "Trench pours lose concrete to irregular earth walls — allow more.",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const d = inputs.depth as number;
    const waste = 1 + Number(inputs.waste) / 100;

    const volume = l * w * d * waste;
    const bags80 = ceilTo(volume / BAG_YIELD_M3["80"]);

    return [
      {
        id: "yd3",
        label: "Concrete to order",
        value: fromBase(volume, "yd3"),
        unit: "yd³",
        precision: 2,
        primary: true,
      },
      { id: "m3", label: "Volume", value: volume, unit: "m³", precision: 2 },
      { id: "ft3", label: "Volume", value: fromBase(volume, "ft3"), unit: "ft³", precision: 1 },
      { id: "bags", label: "80 lb bags", value: bags80, precision: 0 },
      {
        id: "wt",
        label: "Approx. weight",
        value: (volume * CONCRETE_DENSITY) / 1000,
        unit: "t",
        precision: 2,
      },
    ];
  },
  disclaimer:
    "Footing width and depth are structural decisions — verify against IRC Table R403.1(1) or your engineer's drawings, and check local frost-depth requirements before excavating.",
});
