import { defineCalculator } from "@/lib/calculator";
import { fromBase } from "@/lib/units";
import { GRAVEL_DENSITY } from "../charts/density-data";

/** Dimensions + unit prices → tonnage and delivered budget. */
export const gravelCostCalculator = defineCalculator({
  id: "gravel-cost-calculator",
  name: "Gravel Cost Calculator",
  description:
    "Turn dimensions into a delivered gravel budget: tons, material cost at your local per-ton price, delivery and total.",
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
      label: "Depth",
      type: "number",
      unitCategory: "length",
      units: ["in", "cm", "mm"],
      defaultUnit: "in",
      placeholder: "4",
      min: 0.25,
    },
    {
      id: "pricePerTon",
      label: "Gravel price per ton ($)",
      type: "number",
      defaultValue: 35,
      min: 1,
      max: 500,
      hint: "2026 typical: crusher run $18–30 · #57 $25–45 · pea $30–60 · decorative $50+.",
    },
    {
      id: "delivery",
      label: "Delivery fee ($, 0 if picking up)",
      type: "number",
      defaultValue: 80,
      min: 0,
      max: 2000,
      required: false,
      hint: "Typical flat fee $50–150; often waived above 10–15 tons.",
    },
    {
      id: "waste",
      label: "Waste / settling allowance",
      type: "select",
      options: [
        { value: "5", label: "5% — contained placement" },
        { value: "10", label: "10% — typical (recommended)" },
        { value: "15", label: "15% — soft ground" },
      ],
      defaultValue: "10",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const d = inputs.depth as number;
    const pricePerTon = inputs.pricePerTon as number;
    const delivery = (inputs.delivery as number) || 0;
    const waste = 1 + Number(inputs.waste) / 100;

    const areaFt2 = fromBase(l * w, "ft2");
    const tons = fromBase(l * w * d * waste * GRAVEL_DENSITY, "ton");
    const material = tons * pricePerTon;
    const total = material + delivery;

    return [
      {
        id: "total",
        label: "Delivered total",
        value: total,
        unit: "USD",
        precision: 0,
        primary: true,
      },
      { id: "tons", label: "Gravel required", value: tons, unit: "US tons", precision: 2 },
      { id: "material", label: "Material cost", value: material, unit: "USD", precision: 0 },
      { id: "delivery", label: "Delivery", value: delivery, unit: "USD", precision: 0 },
      {
        id: "psf",
        label: "Cost per square foot",
        value: areaFt2 > 0 ? total / areaFt2 : 0,
        unit: "USD/ft²",
        precision: 2,
      },
    ];
  },
  disclaimer:
    "Uses common gravel density (105 lb/ft³). Spreading labor is extra — typically $10–25/ton or covered by your own rake and afternoon. See the labor cost guide.",
});
