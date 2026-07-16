import { defineCalculator } from "@/lib/calculator";
import { fromBase } from "@/lib/units";
import { HMA_DENSITY } from "../charts/density-data";

const BASE_DENSITY = 2240; // kg/m³ compacted dense-graded aggregate

/** Driveway-specific: asphalt lifts plus the gravel base course beneath. */
export const drivewayCalculator = defineCalculator({
  id: "asphalt-driveway-calculator",
  name: "Asphalt Driveway Calculator",
  description:
    "Asphalt tonnage and the aggregate base underneath, in one pass. Sized for residential driveways.",
  fields: [
    {
      id: "length",
      label: "Driveway length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "40",
      min: 0.01,
    },
    {
      id: "width",
      label: "Driveway width",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "12",
      min: 0.01,
      hint: "Single car: 10–12 ft. Double: 20–24 ft.",
    },
    {
      id: "asphaltThickness",
      label: "Asphalt thickness (compacted)",
      type: "select",
      options: [
        { value: "0.0508", label: "2 in — light cars, mild climate (minimum)" },
        { value: "0.0762", label: "3 in — standard residential (recommended)" },
        { value: "0.1016", label: "4 in — trucks, RVs, cold climates" },
      ],
      defaultValue: "0.0762",
    },
    {
      id: "baseThickness",
      label: "Gravel base thickness",
      type: "select",
      options: [
        { value: "0.1016", label: "4 in — existing sound gravel drive" },
        { value: "0.1524", label: "6 in — standard on decent soil" },
        { value: "0.2032", label: "8 in — clay or soft subgrade" },
        { value: "0", label: "None — overlay on existing pavement" },
      ],
      defaultValue: "0.1524",
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — straight rectangle" },
        { value: "10", label: "10% — typical (recommended)" },
        { value: "15", label: "15% — curves and flares" },
      ],
      defaultValue: "10",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const tAsphalt = Number(inputs.asphaltThickness);
    const tBase = Number(inputs.baseThickness);
    const waste = 1 + Number(inputs.waste) / 100;

    const areaM2 = l * w;
    const asphaltVol = areaM2 * tAsphalt * waste;
    const asphaltKg = asphaltVol * HMA_DENSITY;
    const baseVol = areaM2 * tBase * waste;
    const baseKg = baseVol * BASE_DENSITY;

    const results = [
      {
        id: "tons",
        label: "Asphalt to order",
        value: fromBase(asphaltKg, "ton"),
        unit: "US tons",
        precision: 2,
        primary: true,
      },
      { id: "area", label: "Driveway area", value: fromBase(areaM2, "ft2"), unit: "ft²", precision: 0 },
      { id: "yd3", label: "Asphalt volume", value: fromBase(asphaltVol, "yd3"), unit: "yd³", precision: 2 },
    ];

    if (tBase > 0) {
      results.push(
        {
          id: "baseTons",
          label: "Base gravel",
          value: fromBase(baseKg, "ton"),
          unit: "US tons",
          precision: 1,
        },
        {
          id: "baseYd3",
          label: "Base gravel volume",
          value: fromBase(baseVol, "yd3"),
          unit: "yd³",
          precision: 2,
        },
      );
    }

    return results;
  },
  disclaimer:
    "Assumes compacted hot mix at 145 lb/ft³ over dense-graded aggregate at 140 lb/ft³. Base thickness is a soils decision — see the driveway installation guide before finalizing.",
});
