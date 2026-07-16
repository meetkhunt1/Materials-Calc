import { defineCalculator } from "@/lib/calculator";
import { fromBase } from "@/lib/units";

/**
 * Driveway gravel: layered builds. Each option encodes its layers as
 * (depth m, density kg/m³) pairs — computed per layer, summed for the order.
 */
export const drivewayGravelCalculator = defineCalculator({
  id: "driveway-gravel-calculator",
  name: "Driveway Gravel Calculator",
  description:
    "Layer-by-layer tonnage for a gravel driveway that lasts — sub-base, base and surface computed separately.",
  fields: [
    {
      id: "length",
      label: "Driveway length",
      type: "number",
      unitCategory: "length",
      units: ["ft", "m", "yd"],
      defaultUnit: "ft",
      placeholder: "50",
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
      hint: "10–12 ft single lane; add 2 ft on curves.",
    },
    {
      id: "build",
      label: "Build type",
      type: "select",
      options: [
        {
          value: "full",
          label: "New build, 3 layers (4 in #2 + 4 in #57 + 4 in crusher run)",
          data: { d1: 0.1016, r1: 1700, d2: 0.1016, r2: 1750, d3: 0.1016, r3: 2240 },
        },
        {
          value: "standard",
          label: "New build, 2 layers (4 in #57 + 4 in crusher run)",
          data: { d1: 0, r1: 0, d2: 0.1016, r2: 1750, d3: 0.1016, r3: 2240 },
        },
        {
          value: "topup",
          label: "Resurface existing (2 in crusher run top-up)",
          data: { d1: 0, r1: 0, d2: 0, r2: 0, d3: 0.0508, r3: 2240 },
        },
        {
          value: "surface57",
          label: "Fresh surface layer only (2 in #57)",
          data: { d1: 0, r1: 0, d2: 0.0508, r2: 1750, d3: 0, r3: 0 },
        },
      ],
      defaultValue: "standard",
    },
    {
      id: "waste",
      label: "Waste / settling allowance",
      type: "select",
      options: [
        { value: "10", label: "10% — firm subgrade (recommended)" },
        { value: "15", label: "15% — soft or clay subgrade" },
        { value: "20", label: "20% — mud season, first load sinks" },
      ],
      defaultValue: "10",
    },
  ],
  compute: (inputs) => {
    const l = inputs.length as number;
    const w = inputs.width as number;
    const waste = 1 + Number(inputs.waste) / 100;
    const area = l * w;

    const layers = [
      { id: "l1", label: "Sub-base: #2 stone", d: inputs["build.d1"] as number, rho: inputs["build.r1"] as number },
      { id: "l2", label: "Base: #57 stone", d: inputs["build.d2"] as number, rho: inputs["build.r2"] as number },
      { id: "l3", label: "Surface: crusher run", d: inputs["build.d3"] as number, rho: inputs["build.r3"] as number },
    ].filter((layer) => layer.d > 0 && layer.rho > 0);

    let totalKg = 0;
    const layerResults = layers.map((layer) => {
      const kg = area * layer.d * waste * layer.rho;
      totalKg += kg;
      return {
        id: layer.id,
        label: layer.label,
        value: fromBase(kg, "ton"),
        unit: "US tons",
        precision: 1,
      };
    });

    return [
      {
        id: "total",
        label: "Total gravel to order",
        value: fromBase(totalKg, "ton"),
        unit: "US tons",
        precision: 1,
        primary: true,
        note: layers.length > 1 ? "Order layers separately — they are different products." : undefined,
      },
      ...layerResults,
      { id: "area", label: "Driveway area", value: fromBase(area, "ft2"), unit: "ft²", precision: 0 },
      {
        id: "loads",
        label: "Tandem truck loads (≈14 tons)",
        value: Math.ceil(fromBase(totalKg, "ton") / 14),
        precision: 0,
      },
    ];
  },
  disclaimer:
    "Layer system follows FHWA gravel-road practice: coarse stone at the bottom, fines-bound crusher run on top, each compacted before the next. Depths are compacted values.",
});
