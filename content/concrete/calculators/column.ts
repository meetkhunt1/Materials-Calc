import { defineCalculator } from "@/lib/calculator";
import { ceilTo } from "@/lib/format";
import { fromBase } from "@/lib/units";
import { BAG_YIELD_M3, CONCRETE_DENSITY } from "./general";

export const columnCalculator = defineCalculator({
  id: "concrete-column-calculator",
  name: "Concrete Column Calculator",
  description:
    "Round (sonotube) and square columns or piers. Calculates one size, multiplied by the count you need.",
  fields: [
    {
      id: "shape",
      label: "Column shape",
      type: "select",
      options: [
        { value: "round", label: "Round — sonotube / cardboard form" },
        { value: "square", label: "Square — built form" },
      ],
      defaultValue: "round",
    },
    {
      id: "size",
      label: "Diameter (round) or side width (square)",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm", "ft"],
      defaultUnit: "in",
      placeholder: "12",
      min: 1,
      hint: "Common sonotube sizes: 8, 10, 12, 16, 24 in.",
    },
    {
      id: "height",
      label: "Column height",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "in"],
      defaultUnit: "ft",
      placeholder: "4",
      min: 0.01,
      hint: "Include the below-grade portion for deck piers.",
    },
    {
      id: "count",
      label: "Number of columns",
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
        { value: "5", label: "5% — tube forms (recommended)" },
        { value: "10", label: "10% — site-built forms" },
      ],
      defaultValue: "5",
    },
  ],
  compute: (inputs) => {
    const size = inputs.size as number; // meters
    const h = inputs.height as number;
    const count = (inputs.count as number) || 1;
    const waste = 1 + Number(inputs.waste) / 100;
    const isRound = inputs.shape === "round";

    const sectionArea = isRound ? (Math.PI * size * size) / 4 : size * size;
    const perColumn = sectionArea * h;
    const volume = perColumn * count * waste;
    const bags80 = ceilTo(volume / BAG_YIELD_M3["80"]);
    const bags60 = ceilTo(volume / BAG_YIELD_M3["60"]);

    return [
      {
        id: "yd3",
        label: "Total concrete",
        value: fromBase(volume, "yd3"),
        unit: "yd³",
        precision: 2,
        primary: true,
      },
      {
        id: "percol",
        label: "Per column",
        value: fromBase(perColumn, "ft3"),
        unit: "ft³",
        precision: 2,
      },
      { id: "m3", label: "Volume", value: volume, unit: "m³", precision: 3 },
      { id: "bags80", label: "80 lb bags", value: bags80, precision: 0 },
      { id: "bags60", label: "60 lb bags", value: bags60, precision: 0 },
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
    "Structural columns need vertical rebar with ties per ACI 318 §10.7 (or IS 456 §26.5.3) — this tool estimates concrete volume only.",
});
