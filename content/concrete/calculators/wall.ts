import { defineCalculator } from "@/lib/calculator";
import { ceilTo } from "@/lib/format";
import { fromBase } from "@/lib/units";
import { BAG_YIELD_M3, CONCRETE_DENSITY } from "./general";

export const wallCalculator = defineCalculator({
  id: "concrete-wall-calculator",
  name: "Concrete Wall Calculator",
  description:
    "Cast-in-place walls: foundations, retaining walls, stem walls. Subtracts window and door openings.",
  fields: [
    {
      id: "length",
      label: "Wall length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "40",
      min: 0.01,
    },
    {
      id: "height",
      label: "Wall height",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "in"],
      defaultUnit: "ft",
      placeholder: "8",
      min: 0.01,
    },
    {
      id: "thickness",
      label: "Wall thickness",
      type: "select",
      options: [
        { value: "0.1524", label: '6 in (152 mm) — stem walls, garden walls' },
        { value: "0.2032", label: '8 in (203 mm) — standard foundation walls' },
        { value: "0.254", label: '10 in (254 mm) — tall backfilled walls' },
        { value: "0.3048", label: '12 in (305 mm) — heavy retaining walls' },
      ],
      defaultValue: "0.2032",
    },
    {
      id: "openings",
      label: "Total area of openings",
      type: "number",
      unitCategory: "area",
      units: ["ft2", "m2"],
      defaultUnit: "ft2",
      defaultValue: 0,
      min: 0,
      required: false,
      hint: "Windows, doors, beam pockets. Leave 0 for a solid wall.",
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — tight modular forms" },
        { value: "10", label: "10% — typical (recommended)" },
      ],
      defaultValue: "10",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const h = inputs.height as number;
    const t = Number(inputs.thickness);
    const openings = (inputs.openings as number) || 0;
    const waste = 1 + Number(inputs.waste) / 100;

    const grossArea = l * h;
    const netArea = Math.max(grossArea - openings, 0);
    const volume = netArea * t * waste;
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
      {
        id: "area",
        label: "Net wall face area",
        value: fromBase(netArea, "ft2"),
        unit: "ft²",
        precision: 0,
      },
      { id: "bags", label: "80 lb bags", value: bags80, precision: 0, note: "Walls over ~1 yd³ should use ready-mix, not bags." },
      {
        id: "wt",
        label: "Wall weight",
        value: (volume * CONCRETE_DENSITY) / 1000,
        unit: "t",
        precision: 2,
      },
    ];
  },
  disclaimer:
    "Full-height wall pours generate high formwork pressure (ACI 347). Pour in lifts of 2–4 ft per hour unless your forms are rated higher, and vibrate each lift.",
});
