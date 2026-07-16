import { defineCalculator } from "@/lib/calculator";
import { ceilTo } from "@/lib/format";
import { fromBase } from "@/lib/units";

const PEA_DENSITY = 1540; // kg/m³ loose
const BAG_YIELD_M3 = 0.0142; // 0.5 ft³ retail bag

/** Pea gravel: tons, yards and retail bag count. */
export const peaGravelCalculator = defineCalculator({
  id: "pea-gravel-calculator",
  name: "Pea Gravel Calculator",
  description:
    "Paths, patios, play areas and drainage — tons, cubic yards and 0.5 ft³ retail bags in one result.",
  fields: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "12",
      min: 0.01,
    },
    {
      id: "width",
      label: "Width",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "8",
      min: 0.01,
    },
    {
      id: "depth",
      label: "Depth",
      type: "select",
      options: [
        { value: "0.0508", label: '2 in — walkways over a firm base' },
        { value: "0.0762", label: '3 in — patios and seating areas (typical)' },
        { value: "0.1016", label: '4 in — play areas, loose-fill zones' },
        { value: "0.1524", label: '6 in — playground fall zones (CPSC minimum 9 in loose-fill for equipment)' },
        { value: "0.2286", label: '9 in — full playground fall-protection depth' },
      ],
      defaultValue: "0.0762",
      hint: "Deeper than 3 in gets hard to walk on — pea gravel shifts underfoot.",
    },
    {
      id: "waste",
      label: "Waste / settling allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — edged and contained" },
        { value: "10", label: "10% — typical (recommended)" },
      ],
      defaultValue: "10",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const d = Number(inputs.depth);
    const waste = 1 + Number(inputs.waste) / 100;

    const volume = l * w * d * waste;
    const kg = volume * PEA_DENSITY;
    const bags = ceilTo(volume / BAG_YIELD_M3);

    return [
      {
        id: "tons",
        label: "Pea gravel to order",
        value: fromBase(kg, "ton"),
        unit: "US tons",
        precision: 2,
        primary: true,
      },
      { id: "yd3", label: "Volume", value: fromBase(volume, "yd3"), unit: "yd³", precision: 2 },
      {
        id: "bags",
        label: "0.5 ft³ retail bags",
        value: bags,
        precision: 0,
        note: "Bags cost 3–5× bulk per volume — compare above ~15 bags.",
      },
      { id: "kg", label: "Weight", value: kg, unit: "kg", precision: 0 },
      { id: "area", label: "Covered area", value: fromBase(l * w, "ft2"), unit: "ft²", precision: 0 },
    ];
  },
  disclaimer:
    "Pea gravel at 96 lb/ft³ loose. It migrates — plan solid edging into every install (see the installation guide).",
});
