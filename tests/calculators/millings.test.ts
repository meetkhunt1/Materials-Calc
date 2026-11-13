import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { millingsCalculator } from "@/content/asphalt/calculators/millings";
import { FT3, close, run, sameResults } from "./helpers";

describe("Asphalt Millings Calculator (asphalt-millings-calculator)", () => {
  // 12 ft x 50 ft x 4 in compacted, 10% waste (the page's worked example).
  // Compacted = 200 ft³ x 1.10 = 220 ft³; 220 x 122 lb = 26,840 lb = 13.42 tons.
  // Loose yd³ = 26,840 / 103 / 27 = 9.651.
  test("hand-computed driveway matches the worked example", () => {
    const r = run(millingsCalculator, { length: [50, "ft"], width: [12, "ft"], depth: [4, "in"], waste: "10" });
    close(r.tons.value, 13.42, 1e-9);
    close(r["loose-yd3"].value, 26840 / 103 / 27, 1e-9);
    close(r["compacted-yd3"].value, 220 / 27, 1e-9);
    close(r.tonnes.value, (26840 * 0.45359237) / 1000, 1e-9);
    assert.equal(r.loads.value, 1);
    assert.equal(r.tons.primary, true);
    assert.equal(r.cost, undefined, "no cost line without a price");
  });

  test("optional price adds a material cost line", () => {
    const r = run(millingsCalculator, { length: [50, "ft"], width: [12, "ft"], depth: [4, "in"], waste: "10", pricePerTon: 20 });
    close(r.cost.value, 13.42 * 20, 1e-9);
  });

  test("page table: tons per 100 ft² at 4 in is 2.03 with no waste", () => {
    const r = run(millingsCalculator, { length: [10, "ft"], width: [10, "ft"], depth: [4, "in"], waste: "5" });
    close(r.tons.value / 1.05, (100 * (4 / 12) * 122) / 2000, 1e-9);
    close(r["compacted-yd3"].value, (100 * (4 / 12) * 1.05) / 27, 1e-9);
    close((r["compacted-yd3"].value * 27 * FT3) / FT3, 100 * (4 / 12) * 1.05, 1e-9);
  });

  test("metric entry of the same job matches", () => {
    const imperial = run(millingsCalculator, { length: [50, "ft"], width: [12, "ft"], depth: [4, "in"] });
    const metric = run(millingsCalculator, { length: [15.24, "m"], width: [3.6576, "m"], depth: [10.16, "cm"] });
    sameResults(imperial, metric, 1e-12);
  });
});
