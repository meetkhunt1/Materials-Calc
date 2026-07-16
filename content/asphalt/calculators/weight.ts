import { defineCalculator } from "@/lib/calculator";
import { fromBase } from "@/lib/units";

/** Volume → weight converter for every common asphalt state. */
export const weightCalculator = defineCalculator({
  id: "asphalt-weight-calculator",
  name: "Asphalt Weight Calculator",
  description:
    "Convert a known volume to tons, tonnes, pounds and kilograms — for ordering, hauling and disposal.",
  fields: [
    {
      id: "volume",
      label: "Volume",
      type: "number",
      unitCategory: "volume",
      units: ["yd3", "ft3", "m3"],
      defaultUnit: "yd3",
      placeholder: "10",
      min: 0.001,
    },
    {
      id: "state",
      label: "Material state",
      type: "select",
      options: [
        { value: "hma-compacted", label: "Hot mix, compacted in place — 145 lb/ft³", data: { density: 2322 } },
        { value: "hma-loose", label: "Hot mix, loose in truck — 117 lb/ft³", data: { density: 1870 } },
        { value: "cold", label: "Cold mix, compacted — 137 lb/ft³", data: { density: 2200 } },
        { value: "millings-loose", label: "Millings, loose — 103 lb/ft³", data: { density: 1650 } },
        { value: "millings-comp", label: "Millings, compacted — 122 lb/ft³", data: { density: 1950 } },
        { value: "chunks", label: "Broken asphalt chunks (demo) — 45–55 lb/ft³ bulked", data: { density: 800 } },
      ],
      defaultValue: "hma-compacted",
      hint: "Loose vs compacted matters — the same yard differs by 25%.",
    },
    {
      id: "quantity",
      label: "Number of identical volumes",
      type: "number",
      defaultValue: 1,
      min: 1,
      max: 1000,
      step: 1,
      required: false,
    },
  ],
  compute: (inputs) => {
    const volume = (inputs.volume as number) * ((inputs.quantity as number) || 1); // m³
    const density = inputs["state.density"] as number;
    const kg = volume * density;

    return [
      {
        id: "tons",
        label: "Weight",
        value: fromBase(kg, "ton"),
        unit: "US tons",
        precision: 2,
        primary: true,
      },
      { id: "tonnes", label: "Metric tonnes", value: kg / 1000, unit: "t", precision: 2 },
      { id: "lb", label: "Pounds", value: fromBase(kg, "lb"), unit: "lb", precision: 0 },
      { id: "kg", label: "Kilograms", value: kg, unit: "kg", precision: 0 },
      {
        id: "loads",
        label: "Tandem dump trucks (≈14 ton legal payload)",
        value: Math.ceil(fromBase(kg, "ton") / 14),
        precision: 0,
        note: "See the truck load capacity guide for other truck classes.",
      },
    ];
  },
  disclaimer:
    "Demolition chunk weights vary enormously with void space — weigh a test load when disposal pricing depends on it.",
});
