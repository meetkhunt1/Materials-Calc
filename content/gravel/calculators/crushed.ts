import { defineCalculator } from "@/lib/calculator";
import { fromBase } from "@/lib/units";

/**
 * Crushed stone: tons from in-place volume. Weight is conserved through
 * compaction, so ordering by tons at the compacted density is correct;
 * the loose (delivered) volume line shows what arrives on the truck.
 */
export const crushedStoneCalculator = defineCalculator({
  id: "crushed-stone-calculator",
  name: "Crushed Stone Calculator",
  description:
    "Angular crushed stone by size number. Enter finished (in-place) dimensions — the result includes the loose volume that will arrive on the truck.",
  fields: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "30",
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
      label: "Finished depth",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm", "ft"],
      defaultUnit: "in",
      placeholder: "4",
      min: 0.5,
      hint: "Depth after compaction for bases; as-placed depth for drainage stone.",
    },
    {
      id: "stone",
      label: "Stone type",
      type: "select",
      options: [
        {
          value: "57",
          label: "#57 (3/4–1 in) — drainage, concrete, driveways",
          data: { placed: 1750, loose: 1600 },
        },
        {
          value: "crusher",
          label: "Crusher run — compacted bases",
          data: { placed: 2240, loose: 2000 },
        },
        {
          value: "2",
          label: "#2 (2–3 in) — sub-base, mud control",
          data: { placed: 1700, loose: 1600 },
        },
        {
          value: "8",
          label: "#8 (3/8 in) — pipe bedding, chip seal",
          data: { placed: 1650, loose: 1550 },
        },
        {
          value: "dust",
          label: "Stone dust / screenings — paver setting beds",
          data: { placed: 1750, loose: 1600 },
        },
      ],
      defaultValue: "57",
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — contained placement" },
        { value: "10", label: "10% — typical (recommended)" },
        { value: "15", label: "15% — soft subgrade, first load disappears" },
      ],
      defaultValue: "10",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const d = inputs.depth as number;
    const placed = inputs["stone.placed"] as number;
    const loose = inputs["stone.loose"] as number;
    const waste = 1 + Number(inputs.waste) / 100;

    const placedVolume = l * w * d * waste; // m³ in place
    const kg = placedVolume * placed;
    const looseVolume = kg / loose; // volume arriving on the truck

    return [
      {
        id: "tons",
        label: "Stone to order",
        value: fromBase(kg, "ton"),
        unit: "US tons",
        precision: 2,
        primary: true,
      },
      {
        id: "placedYd3",
        label: "In-place volume",
        value: fromBase(placedVolume, "yd3"),
        unit: "yd³",
        precision: 2,
      },
      {
        id: "looseYd3",
        label: "Loose volume (on the truck)",
        value: fromBase(looseVolume, "yd3"),
        unit: "yd³",
        precision: 2,
        note: "Compaction shrinks the pile — this is why the delivery looks bigger than the job.",
      },
      { id: "tonnes", label: "Metric tonnes", value: kg / 1000, unit: "t", precision: 2 },
    ];
  },
  disclaimer:
    "Sizes per ASTM D448 / AASHTO M 43. Base courses must be compacted in lifts of 4 in or less — see the crushed stone best uses guide.",
});
