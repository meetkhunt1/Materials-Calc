import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { asphaltCalculator } from "@/content/asphalt/calculators/asphalt";
import { costCalculator } from "@/content/asphalt/calculators/cost";
import { drivewayCalculator } from "@/content/asphalt/calculators/driveway";
import { volumeCalculator } from "@/content/asphalt/calculators/volume";
import { weightCalculator } from "@/content/asphalt/calculators/weight";
import { FT, FT3, IN, SHORT_TON_KG, YD3, close, lbPerFt3, run, sameResults, tonsFromFt3 } from "./helpers";

/** Compacted hot mix as used by the code (kg/m³); pages state 145 lb/ft³. */
const HMA = 2322;

describe("asphalt density matches what the pages state", () => {
  test("2322 kg/m³ is 145 lb/ft³ (within 0.1%) and 1.96 tons per compacted yd³", () => {
    close(lbPerFt3(HMA), 145, 1e-3);
    close(tonsFromFt3(27, HMA), 1.96, 2e-3);
  });
  test("mix labels match their kg/m³ payloads", () => {
    const mix = asphaltCalculator.fields.find((f) => f.id === "mix")!;
    for (const o of mix.options!) {
      const labelled = Number(/(\d+) lb\/ft³/.exec(o.label)![1]);
      close(lbPerFt3(o.data!.density), labelled, 5e-3, o.value);
    }
    const state = weightCalculator.fields.find((f) => f.id === "state")!;
    for (const o of state.options!.filter((x) => x.value !== "chunks")) {
      const labelled = Number(/(\d+) lb\/ft³/.exec(o.label)![1]);
      close(lbPerFt3(o.data!.density), labelled, 5e-3, o.value);
    }
  });
});

describe("Asphalt Calculator (asphalt-calculator)", () => {
  // 20 ft x 10 ft x 3 in compacted HMA, 10% waste.
  // Volume = 20 * 10 * (3/12) = 50 ft³; with waste 50 * 1.10 = 55 ft³.
  // Tons = 55 ft³ * 144.96 lb/ft³ / 2000 = 3.9865 tons (3.9875 at a round 145).
  test("hand-computed imperial job", () => {
    const r = run(asphaltCalculator, { length: [20, "ft"], width: [10, "ft"], depth: [3, "in"], mix: "hma", waste: "10" });
    close(r.tons.value, (55 * lbPerFt3(HMA)) / 2000);
    close(r.tons.value, 3.9875, 1e-3); // page rule of thumb at 145 lb/ft³
    close(r.yd3.value, 55 / 27);
    close(r.m3.value, 55 * FT3);
    close(r.tonnes.value, (55 * FT3 * HMA) / 1000);
    close(r.area.value, 200); // area is NOT inflated by waste
    assert.equal(r.tons.primary, true);
  });

  test("metric entry of the same job matches (6.096 m x 3.048 m x 7.62 cm)", () => {
    const imperial = run(asphaltCalculator, { length: [20, "ft"], width: [10, "ft"], depth: [3, "in"] });
    const metric = run(asphaltCalculator, { length: [6.096, "m"], width: [3.048, "m"], depth: [7.62, "cm"] });
    sameResults(imperial, metric, 1e-12);
  });

  test("waste is applied exactly once (tons and volume scale by the same factor)", () => {
    const at5 = run(asphaltCalculator, { length: [20, "ft"], width: [10, "ft"], depth: [3, "in"], waste: "5" });
    const at15 = run(asphaltCalculator, { length: [20, "ft"], width: [10, "ft"], depth: [3, "in"], waste: "15" });
    close(at15.tons.value / at5.tons.value, 1.15 / 1.05);
    close(at15.yd3.value / at5.yd3.value, 1.15 / 1.05);
    // Weight per (wasted) yard is just density: no compounding.
    close(at15.tons.value / at15.yd3.value, tonsFromFt3(27, HMA));
    close(at5.tons.value / at5.yd3.value, tonsFromFt3(27, HMA));
  });

  test("other mixes use their own density", () => {
    const cold = run(asphaltCalculator, { length: [20, "ft"], width: [10, "ft"], depth: [3, "in"], mix: "cold" });
    close(cold.tons.value, tonsFromFt3(55, 2200));
    const mill = run(asphaltCalculator, { length: [20, "ft"], width: [10, "ft"], depth: [3, "in"], mix: "millings" });
    close(mill.tons.value, tonsFromFt3(55, 1950));
  });
});

describe("Asphalt Cost Calculator", () => {
  // 40 x 12 ft x 3 in, 10% waste: 120 ft³ -> 132 ft³ -> 132 * 144.96 / 2000 = 9.567 tons.
  const base = { length: [40, "ft"], width: [12, "ft"], depth: [3, "in"], pricePerTon: 115, installRate: 2.5, waste: "10" } as const;

  test("material + labor budget", () => {
    const r = run(costCalculator, { ...base, length: [40, "ft"], width: [12, "ft"], depth: [3, "in"] });
    const tons = tonsFromFt3(132, HMA);
    close(r.tons.value, tons);
    close(r.material.value, tons * 115);
    close(r.labor.value, 480 * 2.5); // labor on the true area, no waste
    close(r.total.value, tons * 115 + 1200);
    close(r.psf.value, (tons * 115 + 1200) / 480);
    assert.equal(r.total.label, "Estimated installed cost");
  });

  test("material-only when install rate is 0 or blank", () => {
    for (const installRate of [0, ""] as const) {
      const r = run(costCalculator, { ...base, length: [40, "ft"], width: [12, "ft"], depth: [3, "in"], installRate });
      const tons = tonsFromFt3(132, HMA);
      close(r.total.value, tons * 115);
      assert.equal(r.labor, undefined);
      assert.equal(r.total.label, "Material cost");
    }
  });
});

describe("Asphalt Driveway Calculator", () => {
  // 30 x 12 ft = 360 ft². Asphalt 3 in: 90 ft³ * 1.1 = 99 ft³ at HMA.
  // Base 6 in: 180 ft³ * 1.1 = 198 ft³ at 2240 kg/m³ (140 lb/ft³).
  test("asphalt plus gravel base", () => {
    const r = run(drivewayCalculator, { length: [30, "ft"], width: [12, "ft"], asphaltThickness: "0.0762", baseThickness: "0.1524", waste: "10" });
    close(r.area.value, 360);
    close(r.tons.value, tonsFromFt3(99, HMA));
    close(r.yd3.value, 99 / 27);
    close(r.baseTons.value, tonsFromFt3(198, 2240));
    close(r.baseYd3.value, 198 / 27);
    close(lbPerFt3(2240), 140, 2e-3); // disclaimer states 140 lb/ft³ base
  });

  test("overlay (no base) omits base lines", () => {
    const r = run(drivewayCalculator, { length: [30, "ft"], width: [12, "ft"], baseThickness: "0" });
    assert.equal(r.baseTons, undefined);
    assert.equal(r.baseYd3, undefined);
  });

  test("thickness options are exact inches", () => {
    const opts = drivewayCalculator.fields.find((f) => f.id === "asphaltThickness")!.options!;
    close(Number(opts[0].value), 2 * IN);
    close(Number(opts[1].value), 3 * IN);
    close(Number(opts[2].value), 4 * IN);
  });
});

describe("Asphalt Volume Calculator", () => {
  // 60 x 20 ft x 4 in = 400 ft³ per section; 2 sections = 800 ft³, no waste.
  test("pure geometric volume, multiplied by sections", () => {
    const r = run(volumeCalculator, { length: [60, "ft"], width: [20, "ft"], depth: [4, "in"], sections: 2 });
    close(r.ft3.value, 800);
    close(r.yd3.value, 800 / 27);
    close(r.m3.value, 800 * FT3);
    close(r.l.value, 800 * FT3 * 1000);
    close(r.tons.value, tonsFromFt3(800, HMA)); // no waste factor here
  });

  test("blank sections means one", () => {
    const one = run(volumeCalculator, { length: [60, "ft"], width: [20, "ft"], depth: [4, "in"], sections: "" });
    close(one.ft3.value, 400);
  });

  test("inch and yard entries agree with feet", () => {
    const ft = run(volumeCalculator, { length: [60, "ft"], width: [20, "ft"], depth: [4, "in"] });
    const mixed = run(volumeCalculator, { length: [20, "yd"], width: [240, "in"], depth: [1 / 3, "ft"] });
    sameResults(ft, mixed, 1e-12);
  });
});

describe("Asphalt Weight Calculator", () => {
  // 10 yd³ = 270 ft³ compacted HMA -> 270 * 144.96 / 2000 = 19.57 tons -> 2 tandem loads.
  test("compacted hot mix", () => {
    const r = run(weightCalculator, { volume: [10, "yd3"], state: "hma-compacted" });
    const tons = tonsFromFt3(270, HMA);
    close(r.tons.value, tons);
    close(r.lb.value, tons * 2000);
    close(r.kg.value, 10 * YD3 * HMA);
    close(r.tonnes.value, (10 * YD3 * HMA) / 1000);
    assert.equal(r.loads.value, Math.ceil(tons / 14));
    assert.equal(r.loads.value, 2);
  });

  test("loose vs compacted: same yards weigh less loose (1870 vs 2322 kg/m³)", () => {
    const comp = run(weightCalculator, { volume: [10, "yd3"], state: "hma-compacted" });
    const loose = run(weightCalculator, { volume: [10, "yd3"], state: "hma-loose" });
    close(loose.tons.value / comp.tons.value, 1870 / 2322);
    close(loose.tons.value, 1.58 * 10, 1e-2); // page: 1.58 tons per loose yd³
  });

  test("m³ and ft³ entries agree; quantity multiplies", () => {
    const yd = run(weightCalculator, { volume: [10, "yd3"] });
    sameResults(yd, run(weightCalculator, { volume: [270, "ft3"] }), 1e-12);
    sameResults(yd, run(weightCalculator, { volume: [10 * YD3, "m3"] }), 1e-12);
    const x3 = run(weightCalculator, { volume: [10, "yd3"], quantity: 3 });
    close(x3.tons.value, 3 * yd.tons.value);
  });

  test("truck loads round UP, but an exact 14-ton load is one truck", () => {
    const exact = run(weightCalculator, { volume: [(14 * SHORT_TON_KG) / HMA, "m3"] });
    close(exact.tons.value, 14);
    assert.equal(exact.loads.value, 1);
    const over = run(weightCalculator, { volume: [(14.01 * SHORT_TON_KG) / HMA, "m3"] });
    assert.equal(over.loads.value, 2);
  });
});

describe("unit sanity in the asphalt cluster", () => {
  test("a 1 ft x 1 ft x 12 in block of HMA is 1 ft³", () => {
    const r = run(volumeCalculator, { length: [1, "ft"], width: [1, "ft"], depth: [12, "in"] });
    close(r.ft3.value, 1);
    close(r.m3.value, FT ** 3);
  });
});
