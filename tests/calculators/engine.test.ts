import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { CalculatorDefinition, CalculatorValues } from "@/types";
import {
  assertValidDefinition,
  compute,
  initialValues,
  resultsToText,
  validate,
} from "@/lib/calculator";
import { convert, fromBase, getUnit, toBase } from "@/lib/units";
import { ceilTo, formatNumber } from "@/lib/format";
import { ALL_CALCULATORS, VALID_INPUTS } from "./all-calculators";
import { FT, FT2, FT3, IN, LB, SHORT_TON_KG, YD, YD3, close, run, sameResults, vals } from "./helpers";

describe("lib/units conversion constants", () => {
  test("length: ft, in, yd, cm, mm, m", () => {
    close(toBase(1, "ft"), 0.3048);
    close(toBase(1, "in"), 0.0254);
    close(toBase(1, "yd"), 0.9144);
    close(toBase(1, "cm"), 0.01);
    close(toBase(1, "mm"), 0.001);
    close(toBase(1, "m"), 1);
    close(convert(1, "ft", "in"), 12);
    close(convert(1, "yd", "ft"), 3);
    close(convert(100, "cm", "m"), 1);
  });

  test("area: ft², yd², acre", () => {
    close(toBase(1, "ft2"), FT2);
    close(convert(1, "yd2", "ft2"), 9);
    close(convert(1, "acre", "ft2"), 43560); // 1 acre = 43,560 ft² exactly
  });

  test("volume: m³, ft³, yd³, L, US gal", () => {
    close(toBase(1, "m3"), 1);
    close(toBase(1, "ft3"), 0.028316846592);
    close(toBase(1, "yd3"), 0.764554857984);
    close(convert(1, "yd3", "ft3"), 27);
    close(convert(1, "m3", "l"), 1000);
    close(convert(1, "ft3", "gal"), 7.480519480519); // 1728 in³ / 231 in³
  });

  test("weight: kg, lb, short ton, tonne", () => {
    close(toBase(1, "kg"), 1);
    close(toBase(1, "lb"), 0.45359237);
    close(toBase(1, "ton"), 907.18474); // US short ton = 2000 lb
    close(toBase(1, "t"), 1000); // metric tonne
    close(convert(1, "ton", "lb"), 2000);
    close(convert(1, "t", "ton"), 1000 / 907.18474);
  });

  test("density: lb/ft³ and lb/yd³ to kg/m³", () => {
    close(toBase(1, "lbft3"), LB / FT3); // 16.0185 kg/m³
    close(toBase(145, "lbft3"), 2322.7, 1e-4); // compacted HMA
    close(convert(1, "lbft3", "lbyd3"), 27);
    close(toBase(1, "tm3"), 1000);
  });

  test("fromBase is the inverse of toBase for every unit", () => {
    for (const id of ["ft", "in", "yd", "cm", "ft2", "yd3", "ft3", "lb", "ton", "t", "lbft3"]) {
      close(fromBase(toBase(123.456, id), id), 123.456, 1e-12, id);
    }
  });

  test("bad conversions throw clearly instead of returning NaN", () => {
    assert.throws(() => getUnit("furlong"), /Unknown unit/);
    assert.throws(() => convert(1, "ft", "kg"), /Cannot convert/);
  });
});

describe("lib/format", () => {
  test("ceilTo rounds UP to whole purchase units", () => {
    assert.equal(ceilTo(61.0001), 62);
    assert.equal(ceilTo(61), 61);
    assert.equal(ceilTo(0.2), 1);
    assert.equal(ceilTo(7, 5), 10);
  });

  test("ceilTo ignores binary floating-point noise at exact multiples", () => {
    // 0.1 + 0.2 = 0.30000000000000004; three 0.1 steps, not four.
    close(ceilTo(0.1 + 0.2, 0.1), 0.3, 1e-12);
    // 6.6 ft³ of concrete is exactly 11 bags at 0.6 ft³ each.
    assert.equal(ceilTo((6.6 * FT3) / (0.6 * FT3)), 11);
  });

  test("formatNumber rounds for display only and never prints NaN", () => {
    assert.equal(formatNumber(3.98749, { precision: 2 }), "3.99");
    assert.equal(formatNumber(1234.5, { precision: 0 }), "1,235");
    assert.equal(formatNumber(Number.NaN), "N/A");
    assert.equal(formatNumber(Number.POSITIVE_INFINITY), "N/A");
  });
});

describe("calculator inventory", () => {
  test("every defineCalculator() in content/*/calculators is covered by the suite", () => {
    const root = join(process.cwd(), "content");
    let declared = 0;
    for (const category of readdirSync(root)) {
      let files: string[] = [];
      try {
        files = readdirSync(join(root, category, "calculators"));
      } catch {
        continue;
      }
      for (const file of files.filter((f) => f.endsWith(".ts"))) {
        const src = readFileSync(join(root, category, "calculators", file), "utf8");
        declared += (src.match(/defineCalculator\(\{/g) ?? []).length;
      }
    }
    assert.equal(ALL_CALCULATORS.length, declared);
    const ids = ALL_CALCULATORS.map((c) => c.id);
    assert.equal(new Set(ids).size, ids.length, "calculator ids must be unique");
  });
});

/** Numeric (non-select) fields of a definition. */
const numberFields = (d: CalculatorDefinition) => d.fields.filter((f) => f.type !== "select");

function assertCleanResults(d: CalculatorDefinition, values: CalculatorValues, label: string) {
  const results = compute(d, values);
  assert.ok(results.length > 0, `${label}: no results`);
  for (const r of results) {
    assert.ok(Number.isFinite(r.value), `${label}: ${r.id} = ${r.value}`);
    assert.ok(r.value >= 0, `${label}: ${r.id} is negative (${r.value})`);
  }
}

for (const d of ALL_CALCULATORS) {
  describe(`${d.id}: definition and validate() boundaries`, () => {
    const valid = VALID_INPUTS[d.id];

    test("definition is internally consistent", () => {
      assert.ok(valid, `no VALID_INPUTS entry for ${d.id}`);
      assertValidDefinition(d);
    });

    test("valid inputs produce finite, non-negative results", () => {
      run(d, valid);
      assertCleanResults(d, vals(d, valid), "valid");
    });

    test("defaults either validate cleanly or report missing fields (never NaN)", () => {
      const values = initialValues(d);
      const errors = validate(d, values);
      if (errors.length === 0) assertCleanResults(d, values, "defaults");
      for (const e of errors) assert.equal(e.message, "This field is required.");
    });

    for (const preset of d.presets ?? []) {
      test(`preset "${preset.id}" validates and computes cleanly`, () => {
        const values = { ...initialValues(d), ...preset.values };
        assert.deepEqual(validate(d, values), []);
        assertCleanResults(d, values, preset.id);
      });
    }

    for (const field of numberFields(d)) {
      const bad: Array<[string, number | string]> = [
        ["blank", ""],
        ["whitespace", "   "],
        ["non-numeric text", "abc"],
        ["text with units", "12ft"],
        ["NaN", Number.NaN],
        ["Infinity", Number.POSITIVE_INFINITY],
        ["overflowing literal", "1e400"],
        ["negative", -5],
        ["absurdly large", 1e12],
      ];
      // Optional fields may legitimately be blank: the calculator falls back.
      const cases = bad.filter(([name]) =>
        field.required === false ? name !== "blank" && name !== "whitespace" : true,
      );
      if (field.min != null && field.min > 0) cases.push(["zero", 0]);

      for (const [name, raw] of cases) {
        test(`field "${field.id}": ${name} is rejected with a clean error`, () => {
          const values = vals(d, valid);
          values[field.id] = { ...values[field.id], value: raw };
          const errors = validate(d, values);
          const mine = errors.filter((e) => e.fieldId === field.id);
          assert.equal(mine.length, 1, `expected one error for ${field.id}, got ${JSON.stringify(errors)}`);
          assert.ok(mine[0].message.length > 0);
          assert.ok(!/NaN|Infinity|undefined/.test(mine[0].message), mine[0].message);
        });
      }

      if (field.required === false) {
        test(`optional field "${field.id}": blank falls back without NaN`, () => {
          const values = vals(d, valid);
          values[field.id] = { ...values[field.id], value: "" };
          assert.deepEqual(validate(d, values), []);
          assertCleanResults(d, values, `${field.id} blank`);
        });
      }

      if (field.unitCategory && field.unitCategory !== "currency") {
        test(`field "${field.id}": unknown or foreign unit is a validation error, not a crash`, () => {
          for (const unit of ["furlong", "kg"]) {
            const values = vals(d, valid);
            values[field.id] = { ...values[field.id], unit };
            const errors = validate(d, values).filter((e) => e.fieldId === field.id);
            assert.equal(errors.length, 1, `unit ${unit} accepted on ${field.id}`);
          }
        });
      }

      if (field.step === 1) {
        test(`count field "${field.id}": fractional values are rejected`, () => {
          const values = vals(d, valid);
          values[field.id] = { ...values[field.id], value: 2.5 };
          const errors = validate(d, values).filter((e) => e.fieldId === field.id);
          assert.equal(errors.length, 1);
        });
      }
    }

    for (const field of d.fields.filter((f) => f.type === "select")) {
      test(`select "${field.id}": value outside the option list is rejected`, () => {
        const values = vals(d, valid);
        values[field.id] = { value: "not-an-option" };
        const errors = validate(d, values).filter((e) => e.fieldId === field.id);
        assert.equal(errors.length, 1);
      });
      test(`select "${field.id}": every option computes cleanly`, () => {
        for (const option of field.options ?? []) {
          const values = vals(d, { ...valid, [field.id]: option.value });
          assert.deepEqual(validate(d, values), [], option.value);
          assertCleanResults(d, values, `${field.id}=${option.value}`);
        }
      });
    }

    test("largest accepted inputs still give finite results", () => {
      const values = vals(d, valid);
      for (const f of numberFields(d)) {
        // Probe just under the engine ceiling for each field.
        const errorsAt = (v: number) => {
          const probe = { ...values, [f.id]: { ...values[f.id], value: v } };
          return validate(d, probe).some((e) => e.fieldId === f.id);
        };
        let v = f.max ?? 1e6;
        while (errorsAt(v) && v > 1) v = v / 10;
        values[f.id] = { ...values[f.id], value: v };
      }
      assert.deepEqual(validate(d, values), []);
      assertCleanResults(d, values, "max");
    });

    test("metric and imperial entries of the same job give identical results", () => {
      const imperial = vals(d, valid);
      const metric: CalculatorValues = {};
      for (const f of d.fields) {
        const entry = imperial[f.id];
        if (f.type === "select" || !f.unitCategory || f.unitCategory === "currency" || !entry.unit) {
          metric[f.id] = entry;
          continue;
        }
        // Pick the first metric unit the field offers and convert by hand.
        const metricUnit = (f.units ?? []).find((u) => ["m", "cm", "mm", "m2", "m3"].includes(u));
        if (!metricUnit) {
          metric[f.id] = entry;
          continue;
        }
        const hand: Record<string, number> = { ft: FT, in: IN, yd: YD, ft2: FT2, yd3: YD3, ft3: FT3, m: 1, cm: 0.01, mm: 0.001, m2: 1, m3: 1 };
        const si = Number(entry.value) * hand[entry.unit];
        metric[f.id] = { value: si / hand[metricUnit], unit: metricUnit };
      }
      const toMap = (v: CalculatorValues) =>
        Object.fromEntries(compute(d, v).map((r) => [r.id, r]));
      assert.deepEqual(validate(d, metric), []);
      sameResults(toMap(imperial), toMap(metric), 1e-9);
    });

    test("results are unrounded; rounding happens only in display/text", () => {
      const results = compute(d, vals(d, valid));
      const text = resultsToText(d, results);
      for (const r of results) {
        assert.ok(text.includes(r.label), r.id);
        // Display must never show more decimals than the declared precision.
        const shown = formatNumber(r.value, { precision: r.precision ?? 2 });
        const decimals = shown.split(".")[1]?.length ?? 0;
        assert.ok(decimals <= (r.precision ?? 2), `${r.id} shows ${shown}`);
      }
    });
  });
}

describe("engine never passes garbage into compute()", () => {
  test("validate() result gates compute: missing required field is reported per field", () => {
    const d = ALL_CALCULATORS.find((c) => c.id === "asphalt-cost-calculator")!;
    const errors = validate(d, initialValues(d));
    assert.deepEqual(
      errors.map((e) => e.fieldId).sort(),
      ["depth", "length", "width"],
    );
  });

  test("the primary result is never pre-rounded (asphalt 20 x 10 ft x 3 in)", () => {
    const d = ALL_CALCULATORS.find((c) => c.id === "asphalt-calculator")!;
    const r = run(d, VALID_INPUTS[d.id]);
    // 55 ft³ x 144.96 lb/ft³ / 2000 = 3.98648... tons: more than 2 decimals survive.
    assert.notEqual(r.tons.value, Math.round(r.tons.value * 100) / 100);
    close(r.tons.value * SHORT_TON_KG, 55 * FT3 * 2322);
  });
});
