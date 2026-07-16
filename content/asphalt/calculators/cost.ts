import { defineCalculator } from "@/lib/calculator";
import { fromBase } from "@/lib/units";
import { HMA_DENSITY } from "../charts/density-data";

/** Area + thickness + unit prices → tonnage and budget. */
export const costCalculator = defineCalculator({
  id: "asphalt-cost-calculator",
  name: "Asphalt Cost Calculator",
  description:
    "Turn dimensions into a material budget: tons required, material cost, and an installed estimate using your local labor rate.",
  fields: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "40",
      min: 0.01,
    },
    {
      id: "width",
      label: "Width",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "12",
      min: 0.01,
    },
    {
      id: "depth",
      label: "Compacted thickness",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm"],
      defaultUnit: "in",
      placeholder: "3",
      min: 0.25,
    },
    {
      id: "pricePerTon",
      label: "Hot mix price per ton ($)",
      type: "number",
      defaultValue: 115,
      min: 1,
      max: 1000,
      hint: "2026 US typical: $100–150/ton at the plant. Call your local plant.",
    },
    {
      id: "installRate",
      label: "Installed labor & equipment ($/ft², 0 for material only)",
      type: "number",
      defaultValue: 2.5,
      min: 0,
      max: 100,
      required: false,
      hint: "Residential crews typically run $2–4/ft² over material.",
    },
    {
      id: "waste",
      label: "Waste allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — simple rectangle" },
        { value: "10", label: "10% — typical (recommended)" },
        { value: "15", label: "15% — irregular shape" },
      ],
      defaultValue: "10",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const d = inputs.depth as number;
    const pricePerTon = inputs.pricePerTon as number;
    const installRate = (inputs.installRate as number) || 0;
    const waste = 1 + Number(inputs.waste) / 100;

    const areaM2 = l * w;
    const areaFt2 = fromBase(areaM2, "ft2");
    const tons = fromBase(areaM2 * d * waste * HMA_DENSITY, "ton");
    const materialCost = tons * pricePerTon;
    const laborCost = areaFt2 * installRate;
    const total = materialCost + laborCost;

    const results = [
      {
        id: "total",
        label: installRate > 0 ? "Estimated installed cost" : "Material cost",
        value: total,
        unit: "USD",
        precision: 0,
        primary: true,
      },
      { id: "tons", label: "Asphalt required", value: tons, unit: "US tons", precision: 2 },
      { id: "material", label: "Material cost", value: materialCost, unit: "USD", precision: 0 },
    ];

    if (installRate > 0) {
      results.push({
        id: "labor",
        label: "Labor & equipment",
        value: laborCost,
        unit: "USD",
        precision: 0,
      });
    }

    results.push({
      id: "psf",
      label: "Cost per square foot",
      value: areaFt2 > 0 ? total / areaFt2 : 0,
      unit: "USD/ft²",
      precision: 2,
    });

    return results;
  },
  disclaimer:
    "Budget-grade estimate. Mobilization minimums ($1,000–2,500) dominate small jobs regardless of area — get three local quotes before committing.",
});
