import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { slabCalculatorTemplate } from "@/content/concrete/calculators/_template";
import { columnCalculator } from "@/content/concrete/calculators/column";
import { footingCalculator } from "@/content/concrete/calculators/footing";
import { BAG_YIELD_M3, CONCRETE_DENSITY, concreteCalculator } from "@/content/concrete/calculators/general";
import { slabCalculator } from "@/content/concrete/calculators/slab";
import { wallCalculator } from "@/content/concrete/calculators/wall";
import { FT2, FT3, IN, close, lbPerFt3, run, sameResults, tonsFromFt3 } from "./helpers";

/** Published bag yields (QUIKRETE / Sakrete), as stated on the pages. */
const YIELD_FT3 = { "80": 0.6, "60": 0.45, "40": 0.3 } as const;

describe("concrete constants match what the pages state", () => {
  test("2400 kg/m³ is the 150 lb/ft³ normal-weight value (within 0.2%)", () => {
    assert.equal(CONCRETE_DENSITY, 2400);
    close(lbPerFt3(CONCRETE_DENSITY), 150, 2e-3);
  });

  test("bag yields equal the published 0.60 / 0.45 / 0.30 ft³", () => {
    for (const key of ["80", "60", "40"] as const) {
      close(BAG_YIELD_M3[key], YIELD_FT3[key] * FT3, 1e-9, `${key} lb bag`);
    }
    // Page: "27 / 0.60 = 45 bags per yard".
    close(27 / YIELD_FT3["80"], 45);
  });
});

describe("Concrete Calculator (concrete-calculator)", () => {
  // 10 x 10 ft x 4 in = 33.333 ft³; +10% = 36.667 ft³ = 1.358 yd³.
  // 80 lb bags: 36.667 / 0.60 = 61.1 -> 62 (rounded UP).
  test("hand-computed 10 x 10 patio at 4 in", () => {
    const r = run(concreteCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [4, "in"], quantity: 1, waste: "10", bag: "80" });
    const ft3 = (100 * 4) / 12 * 1.1;
    close(r.ft3.value, ft3);
    close(r.yd3.value, ft3 / 27);
    close(r.m3.value, ft3 * FT3);
    assert.equal(r.bags.value, 62);
    close(r.wt.value, (ft3 * FT3 * 2400) / 1000);
    close(r.wtus.value, tonsFromFt3(ft3, 2400));
  });

  test("bag sizes: 40 lb -> 123, 60 lb -> 82 (always rounded up)", () => {
    const b40 = run(concreteCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [4, "in"], bag: "40" });
    const b60 = run(concreteCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [4, "in"], bag: "60" });
    assert.equal(b40.bags.value, Math.ceil(36.666666 / 0.3)); // 122.2 -> 123
    assert.equal(b60.bags.value, Math.ceil(36.666666 / 0.45)); // 81.5 -> 82
  });

  test("exactly 11 bags of volume is 11 bags, not 12", () => {
    // 6 ft x 1 ft x 12 in = 6 ft³; +10% = 6.6 ft³ = 11 x 0.60 ft³ exactly.
    const r = run(concreteCalculator, { length: [6, "ft"], width: [1, "ft"], depth: [12, "in"], waste: "10", bag: "80" });
    assert.equal(r.bags.value, 11);
  });

  test("metric job: 3 m x 3 m x 10 cm, 5% waste = 0.945 m³", () => {
    const r = run(concreteCalculator, { length: [3, "m"], width: [3, "m"], depth: [10, "cm"], waste: "5" });
    close(r.m3.value, 0.945);
    close(r.yd3.value, 0.945 / (27 * FT3));
  });

  test("page worked example: 6 m x 1.2 m x 100 mm path with 80 lb bags", () => {
    // 0.72 m³ +15% = 0.828 m³ -> / 0.01699 m³ = 48.7 -> 49 bags (page says 49).
    const r = run(concreteCalculator, { length: [6, "m"], width: [1.2, "m"], depth: [100, "mm"], waste: "15", bag: "80" });
    assert.equal(r.bags.value, 49);
  });

  test("quantity multiplies, waste applied once", () => {
    const one = run(concreteCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [4, "in"], quantity: 1 });
    const two = run(concreteCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [4, "in"], quantity: 2 });
    close(two.m3.value, 2 * one.m3.value);
    const w5 = run(concreteCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [4, "in"], waste: "5" });
    const w15 = run(concreteCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [4, "in"], waste: "15" });
    close(w15.m3.value / w5.m3.value, 1.15 / 1.05);
    close(w15.wt.value / w15.m3.value, 2.4); // weight = volume x density, no second waste factor
  });
});

describe("Concrete Slab Calculator", () => {
  // 20 x 20 ft x 6 in = 200 ft³; +10% = 220 ft³ = 8.148 yd³; 220 / 0.6 = 366.7 -> 367 bags.
  test("hand-computed 2-car garage slab", () => {
    const r = run(slabCalculator, { length: [20, "ft"], width: [20, "ft"], thickness: "0.1524", waste: "10", bag: "80" });
    close(r.yd3.value, 220 / 27);
    close(r.m3.value, 220 * FT3);
    close(r.area.value, 400);
    assert.equal(r.bags.value, 367);
    close(r.wt.value, (220 * FT3 * 2400) / 1000);
  });

  test("thickness options are exact inches", () => {
    const opts = slabCalculator.fields.find((f) => f.id === "thickness")!.options!;
    const inches = [3, 4, 5, 6, 8];
    opts.forEach((o, i) => close(Number(o.value), inches[i] * IN, 1e-12, o.value));
  });

  test("metric entry agrees with feet", () => {
    sameResults(
      run(slabCalculator, { length: [20, "ft"], width: [20, "ft"] }),
      run(slabCalculator, { length: [6.096, "m"], width: [6.096, "m"] }),
      1e-12,
    );
  });
});

describe("Concrete Wall Calculator", () => {
  // 40 x 8 ft = 320 ft² gross, -20 ft² openings = 300 ft² net.
  // 300 x 8/12 ft = 200 ft³; +10% = 220 ft³; bags 220 / 0.6 = 366.7 -> 367.
  test("openings are subtracted before waste", () => {
    const r = run(wallCalculator, { length: [40, "ft"], height: [8, "ft"], thickness: "0.2032", openings: [20, "ft2"], waste: "10" });
    close(r.area.value, 300);
    close(r.yd3.value, 220 / 27);
    assert.equal(r.bags.value, 367);
    const m2 = run(wallCalculator, { length: [40, "ft"], height: [8, "ft"], thickness: "0.2032", openings: [20 * FT2, "m2"], waste: "10" });
    sameResults(r, m2, 1e-12);
  });

  test("openings larger than the wall clamp to zero, never negative", () => {
    const r = run(wallCalculator, { length: [10, "ft"], height: [4, "ft"], openings: [100, "ft2"] });
    assert.equal(r.yd3.value, 0);
    assert.equal(r.bags.value, 0);
  });
});

describe("Concrete Footing Calculator", () => {
  // 120 ft x 16 in x 8 in = 120 x 1.3333 x 0.6667 = 106.67 ft³; +10% = 117.33 ft³.
  // Bags: 117.33 / 0.6 = 195.6 -> 196.
  test("hand-computed default footing", () => {
    const r = run(footingCalculator, { length: [120, "ft"], width: [16, "in"], depth: [8, "in"], waste: "10" });
    const ft3 = 120 * (16 / 12) * (8 / 12) * 1.1;
    close(r.ft3.value, ft3);
    close(r.yd3.value, ft3 / 27);
    assert.equal(r.bags.value, 196);
  });
});

describe("Concrete Column Calculator", () => {
  // Round 12 in sonotube, 4 ft: pi/4 x 1² x 4 = 3.1416 ft³; +5% = 3.2987 ft³.
  // 80 lb: 3.2987 / 0.6 = 5.5 -> 6 bags (page: six bags). 60 lb: / 0.45 = 7.3 -> 8.
  test("12 in sonotube, 4 ft pier", () => {
    const r = run(columnCalculator, { shape: "round", size: [12, "in"], height: [4, "ft"], count: 1, waste: "5" });
    close(r.percol.value, Math.PI); // per column, before waste
    close(r.m3.value, Math.PI * 1.05 * FT3);
    assert.equal(r.bags80.value, 6);
    assert.equal(r.bags60.value, 8);
  });

  test("page tube table: 8 in -> 3 bags, 10 in -> 4 bags per 4 ft pier", () => {
    for (const [dia, bags] of [[8, 3], [10, 4], [12, 6]] as const) {
      const r = run(columnCalculator, { shape: "round", size: [dia, "in"], height: [4, "ft"], count: 1, waste: "5" });
      assert.equal(r.bags80.value, bags, `${dia} in tube`);
    }
  });

  test("square columns x count", () => {
    // 12 in square x 4 ft = 4 ft³ each; x 10 columns x 1.10 = 44 ft³.
    const r = run(columnCalculator, { shape: "square", size: [12, "in"], height: [4, "ft"], count: 10, waste: "10" });
    close(r.percol.value, 4);
    close(r.yd3.value, 44 / 27);
    assert.equal(r.bags80.value, Math.ceil(44 / 0.6)); // 73.3 -> 74
  });
});

describe("Concrete slab template (_template.ts)", () => {
  // 12 x 10 ft x 4 in = 40 ft³; +10% = 44 ft³ -> 44 / 0.6 = 73.3 -> 74 bags.
  test("hand-computed", () => {
    const r = run(slabCalculatorTemplate, { length: [12, "ft"], width: [10, "ft"], thickness: [4, "in"], waste: "10" });
    close(r["volume-ft3"].value, 44);
    close(r["volume-yd3"].value, 44 / 27);
    assert.equal(r["bags-80"].value, 74);
  });
});
