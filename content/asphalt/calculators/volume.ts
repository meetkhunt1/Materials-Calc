import { defineCalculator } from "@/lib/calculator";
import { fromBase } from "@/lib/units";
import { HMA_DENSITY } from "../charts/density-data";

/** Pure volume calculator — every unit reported, tons as a courtesy. */
export const volumeCalculator = defineCalculator({
  id: "asphalt-volume-calculator",
  name: "Asphalt Volume Calculator",
  description:
    "Plan dimensions to cubic yards, cubic feet and cubic meters — plus the equivalent hot-mix tonnage.",
  fields: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd", "in"],
      defaultUnit: "ft",
      placeholder: "60",
      min: 0.01,
    },
    {
      id: "width",
      label: "Width",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd", "in"],
      defaultUnit: "ft",
      placeholder: "20",
      min: 0.01,
    },
    {
      id: "depth",
      label: "Depth (compacted)",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm", "ft"],
      defaultUnit: "in",
      placeholder: "4",
      min: 0.1,
    },
    {
      id: "sections",
      label: "Identical sections",
      type: "number",
      defaultValue: 1,
      min: 1,
      max: 500,
      step: 1,
      required: false,
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const d = inputs.depth as number;
    const n = (inputs.sections as number) || 1;

    const volume = l * w * d * n; // m³

    return [
      {
        id: "yd3",
        label: "Volume",
        value: fromBase(volume, "yd3"),
        unit: "yd³",
        precision: 2,
        primary: true,
      },
      { id: "ft3", label: "Volume", value: fromBase(volume, "ft3"), unit: "ft³", precision: 1 },
      { id: "m3", label: "Volume", value: volume, unit: "m³", precision: 2 },
      { id: "l", label: "Volume", value: volume * 1000, unit: "L", precision: 0 },
      {
        id: "tons",
        label: "As compacted hot mix",
        value: fromBase(volume * HMA_DENSITY, "ton"),
        unit: "US tons",
        precision: 2,
        note: "At 145 lb/ft³ — add your waste factor before ordering.",
      },
    ];
  },
  disclaimer:
    "No waste factor applied — this is the geometric volume. Add 5–15% before ordering; see the how-to-calculate guide for choosing the right factor.",
});
