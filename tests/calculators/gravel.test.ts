import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { GRAVEL_DENSITY } from "@/content/gravel/charts/density-data";
import { circularGravelCalculator } from "@/content/gravel/calculators/circular";
import { gravelCostCalculator } from "@/content/gravel/calculators/cost";
import { crushedStoneCalculator } from "@/content/gravel/calculators/crushed";
import { drivewayGravelCalculator } from "@/content/gravel/calculators/driveway";
import { GRAVEL_TYPE_OPTIONS, gravelCalculator } from "@/content/gravel/calculators/gravel";
import { PEA_BAG_YIELD_M3, PEA_DENSITY, peaGravelCalculator } from "@/content/gravel/calculators/pea";
import { FT, FT3, IN, LB, SHORT_TON_KG, close, lbPerFt3, run, sameResults, tonsFromFt3 } from "./helpers";

describe("gravel densities match what the pages state", () => {
  test("common gravel 1680 kg/m³ is 105 lb/ft³ and about 1.42 tons per yd³", () => {
    assert.equal(GRAVEL_DENSITY, 1680);
    close(lbPerFt3(GRAVEL_DENSITY), 105, 2e-3);
    close(tonsFromFt3(27, GRAVEL_DENSITY), 1.42, 3e-3);
  });

  test("every gravel type label matches its kg/m³ payload (within 1%)", () => {
    for (const o of GRAVEL_TYPE_OPTIONS) {
      const labelled = Number(/(\d+) lb\/ft³/.exec(o.label)![1]);
      close(lbPerFt3(o.data!.density), labelled, 1e-2, o.value);
    }
  });

  test("pea gravel: 96 lb/ft³, about 1.3 tons per yd³, 0.5 ft³ bags exactly", () => {
    close(lbPerFt3(PEA_DENSITY), 96, 2e-3);
    close(tonsFromFt3(27, PEA_DENSITY), 1.3, 0.01);
    close(PEA_BAG_YIELD_M3, 0.5 * FT3, 1e-12);
  });

  test("crushed stone payloads: #57 109 / 100 lb/ft³, crusher run 140 lb/ft³", () => {
    const stone = crushedStoneCalculator.fields.find((f) => f.id === "stone")!.options!;
    const s57 = stone.find((o) => o.value === "57")!.data!;
    close(lbPerFt3(s57.placed), 109, 3e-3);
    close(lbPerFt3(s57.loose), 100, 2e-3);
    close(lbPerFt3(stone.find((o) => o.value === "crusher")!.data!.placed), 140, 2e-3);
  });
});

describe("Gravel Calculator (gravel-calculator)", () => {
  // Default job: 10 x 10 ft x 3 in = 25 ft³; +10% = 27.5 ft³ = 1.0185 yd³.
  // Tons = 27.5 x 104.88 lb/ft³ / 2000 = 1.442 tons.
  test("hand-computed 10 x 10 bed at 3 in", () => {
    const r = run(gravelCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [3, "in"], type: "common", waste: "10" });
    close(r.ft3.value, 27.5);
    close(r.yd3.value, 27.5 / 27);
    close(r.tons.value, tonsFromFt3(27.5, 1680));
    close(r.tonnes.value, (27.5 * FT3 * 1680) / 1000);
    close(r.area.value, 100);
  });

  test("material choice only changes weight, never volume", () => {
    const common = run(gravelCalculator, { type: "common" });
    const crusher = run(gravelCalculator, { type: "crusher" });
    close(crusher.yd3.value, common.yd3.value);
    close(crusher.tons.value / common.tons.value, 2240 / 1680);
  });

  test("metric entry agrees: 3.048 m x 3.048 m x 7.62 cm", () => {
    sameResults(
      run(gravelCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [3, "in"] }),
      run(gravelCalculator, { length: [3.048, "m"], width: [3.048, "m"], depth: [7.62, "cm"] }),
      1e-12,
    );
  });
});

describe("Circular Gravel Calculator", () => {
  // 10 ft diameter: area = pi x 5² = 78.54 ft²; x 0.25 ft x 1.10 = 21.598 ft³.
  test("hand-computed 10 ft round patio at 3 in", () => {
    const r = run(circularGravelCalculator, { diameter: [10, "ft"], depth: [3, "in"], type: "common", waste: "10" });
    const ft3 = Math.PI * 25 * 0.25 * 1.1;
    close(r.area.value, Math.PI * 25);
    close(r.yd3.value, ft3 / 27);
    close(r.tons.value, tonsFromFt3(ft3, 1680));
  });

  test("a circle is pi/4 of the square that holds it", () => {
    const round = run(circularGravelCalculator, { diameter: [10, "ft"], depth: [3, "in"] });
    const square = run(gravelCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [3, "in"] });
    close(round.tons.value / square.tons.value, Math.PI / 4);
  });
});

describe("Gravel Cost Calculator", () => {
  // 40 x 12 ft x 4 in = 160 ft³; +10% = 176 ft³ -> 176 x 104.88 / 2000 = 9.229 tons.
  // At $35/ton = $323.03, plus $80 delivery = $403.03; / 480 ft² = $0.84/ft².
  test("hand-computed delivered total", () => {
    const r = run(gravelCostCalculator, { length: [40, "ft"], width: [12, "ft"], depth: [4, "in"], pricePerTon: 35, delivery: 80, waste: "10" });
    const tons = tonsFromFt3(176, 1680);
    close(r.tons.value, tons);
    close(r.material.value, tons * 35);
    close(r.total.value, tons * 35 + 80);
    close(r.psf.value, (tons * 35 + 80) / 480);
  });

  test("blank delivery counts as $0 (pick-up)", () => {
    const r = run(gravelCostCalculator, { length: [40, "ft"], width: [12, "ft"], depth: [4, "in"], delivery: "" });
    assert.equal(r.delivery.value, 0);
    close(r.total.value, r.material.value);
  });
});

describe("Crushed Stone Calculator", () => {
  // 30 x 10 ft x 4 in = 100 ft³ in place; +10% = 110 ft³ at 1750 kg/m³ placed.
  // Weight is conserved, so loose volume = 110 x 1750 / 1600 = 120.3 ft³.
  test("hand-computed #57 base", () => {
    const r = run(crushedStoneCalculator, { length: [30, "ft"], width: [10, "ft"], depth: [4, "in"], stone: "57", waste: "10" });
    close(r.tons.value, tonsFromFt3(110, 1750));
    close(r.placedYd3.value, 110 / 27);
    close(r.looseYd3.value, (110 * 1750) / 1600 / 27);
    assert.ok(r.looseYd3.value > r.placedYd3.value);
  });
});

describe("Driveway Gravel Calculator", () => {
  // 50 x 12 ft = 600 ft². Standard build: 4 in #57 + 4 in crusher run, 10% waste.
  // Each layer: 600 x 4/12 x 1.1 = 220 ft³. #57 at 1750, crusher run at 2240.
  test("hand-computed 2-layer 50 ft driveway", () => {
    const r = run(drivewayGravelCalculator, { length: [50, "ft"], width: [12, "ft"], build: "standard", waste: "10" });
    const l2 = tonsFromFt3(220, 1750);
    const l3 = tonsFromFt3(220, 2240);
    close(r.l2.value, l2);
    close(r.l3.value, l3);
    assert.equal(r.l1, undefined, "no sub-base layer on a 2-layer build");
    close(r.total.value, l2 + l3);
    close(r.area.value, 600);
    assert.equal(r.loads.value, Math.ceil((l2 + l3) / 14)); // 27.3 tons -> 2 loads
  });

  test("layer depths are exact inches", () => {
    const build = drivewayGravelCalculator.fields.find((f) => f.id === "build")!.options!;
    for (const o of build) {
      for (const key of ["d1", "d2", "d3"]) {
        const inches = o.data![key] / IN;
        close(inches, Math.round(inches), 1e-12, `${o.value}.${key}`);
      }
    }
  });

  test("an exact 14-ton order is one truck, not two", () => {
    // Top-up: 2 in crusher run, 10% waste. Pick the length that gives exactly 14 tons.
    const widthM = 12 * FT;
    const lengthM = (14 * SHORT_TON_KG) / (widthM * 2 * IN * 1.1 * 2240);
    const r = run(drivewayGravelCalculator, { length: [lengthM, "m"], width: [12, "ft"], build: "topup", waste: "10" });
    close(r.total.value, 14);
    assert.equal(r.loads.value, 1);
  });
});

describe("Pea Gravel Calculator", () => {
  // Default: 10 x 10 ft x 3 in = 25 ft³; +10% = 27.5 ft³ = exactly 55 bags of 0.5 ft³.
  test("hand-computed default patio: 55 bags, not 56", () => {
    const r = run(peaGravelCalculator, { length: [10, "ft"], width: [10, "ft"], depth: "0.0762", waste: "10" });
    assert.equal(r.bags.value, 55);
    close(r.yd3.value, 27.5 / 27);
    close(r.tons.value, tonsFromFt3(27.5, 1540));
    close(r.kg.value, 27.5 * FT3 * 1540);
    close(r.kg.value / LB, 27.5 * lbPerFt3(1540)); // lb check
  });

  test("bags round UP: 10 x 10.02 ft at 3 in needs 27.555 ft³ = 56 bags", () => {
    // The old 0.0142 m³ yield (0.3% too big) reported 55 here.
    const r = run(peaGravelCalculator, { length: [10, "ft"], width: [10.02, "ft"], depth: "0.0762", waste: "10" });
    assert.equal(r.bags.value, 56);
  });

  test("depth options are exact inches", () => {
    const opts = peaGravelCalculator.fields.find((f) => f.id === "depth")!.options!;
    const inches = [2, 3, 4, 6, 9];
    opts.forEach((o, i) => close(Number(o.value), inches[i] * IN, 1e-12, o.value));
  });
});
