import { defineCalculator } from "@/lib/calculator";
import { ceilTo } from "@/lib/format";
import { fromBase } from "@/lib/units";
import { BAG_YIELD_M3, CONCRETE_DENSITY } from "./general";

export const slabCalculator = defineCalculator({
  id: "concrete-slab-calculator",
  name: "Concrete Slab Calculator",
  description:
    "Sized for patios, garage floors, shed bases and driveways. Includes a waste allowance and bag counts.",
  fields: [
    {
      id: "length",
      label: "Slab length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "in", "yd"],
      defaultUnit: "ft",
      placeholder: "20",
      min: 0.01,
    },
    {
      id: "width",
      label: "Slab width",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "in", "yd"],
      defaultUnit: "ft",
      placeholder: "10",
      min: 0.01,
    },
    {
      id: "thickness",
      label: "Slab thickness",
      type: "select",
      options: [
        { value: "0.0762", label: '3 in (76 mm) — light foot traffic only' },
        { value: "0.1016", label: '4 in (102 mm) — patios, walkways, shed bases' },
        { value: "0.127", label: '5 in (127 mm) — single-car driveways' },
        { value: "0.1524", label: '6 in (152 mm) — heavy vehicles, workshops' },
        { value: "0.2032", label: '8 in (203 mm) — commercial / equipment pads' },
      ],
      defaultValue: "0.1016",
      hint: "Thickness drives cost more than any other input — don't overspec.",
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — formed on a compacted, level base" },
        { value: "10", label: "10% — typical (recommended)" },
        { value: "15", label: "15% — uneven subgrade or hand mixing" },
      ],
      defaultValue: "10",
    },
    {
      id: "bag",
      label: "Bag size (if hand mixing)",
      type: "select",
      options: [
        { value: "80", label: "80 lb bag" },
        { value: "60", label: "60 lb bag" },
        { value: "40", label: "40 lb bag" },
      ],
      defaultValue: "80",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const t = Number(inputs.thickness); // already meters (select stores metric value)
    const waste = 1 + Number(inputs.waste) / 100;
    const bagKey = String(inputs.bag) as keyof typeof BAG_YIELD_M3;

    const volume = l * w * t * waste;
    const bags = ceilTo(volume / BAG_YIELD_M3[bagKey]);
    const areaM2 = l * w;

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
      { id: "area", label: "Slab area", value: fromBase(areaM2, "ft2"), unit: "ft²", precision: 0 },
      { id: "bags", label: `${bagKey} lb bags`, value: bags, precision: 0 },
      {
        id: "wt",
        label: "Slab weight",
        value: (volume * CONCRETE_DENSITY) / 1000,
        unit: "t",
        precision: 2,
      },
    ];
  },
  disclaimer:
    "Add rebar or welded wire mesh per your local code; reinforcement is not included in this estimate. Thickened slab edges need extra volume — see the worked example below.",
});
