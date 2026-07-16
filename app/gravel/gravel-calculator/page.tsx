import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { GravelCalculatorCard } from "@/content/gravel/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock, TipBlock } from "@/components/blocks/callout";
import { DensityTable } from "@/components/tables/density-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { gravelDensities } from "@/content/gravel/charts/density-data";
import {
  GRAVEL,
  coreGuideLinks,
  gravelCalculatorLinks,
  referenceLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import { CONCRETE, calculatorLinks as concreteCalcs, pickLinks as pickConcrete } from "@/content/concrete/links";
import { ASPHALT, asphaltCalculatorLinks, pickLinks as pickAsphalt } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Gravel Calculator — Tons, Cubic Yards & Coverage";
const description =
  "How much gravel do you need? Get tons and cubic yards for any gravel or crushed stone type, with the right density applied automatically.";
const path = GRAVEL.calculator;
const author = getAuthor("materials-team");

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
});

const faqItems: FaqItem[] = [
  {
    question: "How much gravel do I need for 100 square feet?",
    answer:
      "At a 3-inch depth: 100 × 0.25 = 25 ft³ = 0.93 yd³ ≈ 1.3 tons of common gravel. Halve it for 1.5 inches, double for 6. With a 10% allowance, order 1.5 tons.",
  },
  {
    question: "How many tons is a cubic yard of gravel?",
    answer:
      "Loose common gravel: about 1.42 tons per cubic yard (2,800 lb). Pea gravel runs lighter (~1.3), compacted crusher run heavier (~1.9). That spread is why the calculator asks for the type — density is the whole game.",
  },
  {
    question: "Should I order gravel by the ton or by the yard?",
    answer:
      "Quarries scale-weigh trucks, so tons is the precise unit; landscape yards often sell loose cubic yards by the bucket. Get both numbers from the calculator and compare quotes in whichever unit each supplier uses — the conversion chart covers the math.",
  },
  {
    question: "How deep should gravel be?",
    answer:
      "Walkways: 2–3 in over compacted base. Patios and pads: 3–4 in. Driveways: 8–12 in total in layers (see the driveway calculator). Drainage applications: whatever the pipe design calls for, typically 4–6 in around the pipe.",
  },
  {
    question: "Does the calculator account for compaction?",
    answer:
      "The type dropdown handles it: loose materials use loose density, and crusher run uses its compacted density since bases are always compacted. For a detailed loose-vs-in-place breakdown, the crushed stone calculator reports both volumes.",
  },
  {
    question: "How much does a truckload of gravel cover?",
    answer:
      "A 14-ton tandem load is about 10 loose cubic yards — roughly 800 ft² at 4 inches or 1,600 ft² at 2 inches. One load handles most residential top-ups; new driveways typically need two to four.",
  },
];

const toc = tocFromTitles(
  "The gravel formula",
  "Worked example: parking pad on soft ground",
  "Ordering mistakes to avoid",
  "Density quick reference",
);

export default function GravelCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Gravel Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="split"
        hero={
          <>
            <Hero
              eyebrow="Gravel"
              variant="centered"
              title="Gravel Calculator"
              description="Length × width × depth × the right density. Six material presets cover pea gravel to compacted crusher run — pick honestly, because density varies 45% across them."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Gravel Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<GravelCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <Section title="The gravel formula">
          <FormulaBlock
            formula="Tons = Area (ft²) × (depth ÷ 12) × density ÷ 2,000 × (1 + waste)"
            variables={[
              { symbol: "Area", meaning: "length × width", unit: "ft²" },
              { symbol: "depth", meaning: "placed depth", unit: "inches" },
              { symbol: "density", meaning: "loose bulk density by type", unit: "lb/ft³" },
            ]}
            note="Same takeoff discipline as concrete and asphalt — only the density line changes. All type densities live in the gravel density database."
          />
          <p className="text-muted-foreground">
            If you estimate more than one material, notice the pattern: the{" "}
            <a href={CONCRETE.calculator} className="font-medium text-primary hover:underline">
              concrete calculator
            </a>{" "}
            multiplies by 150 lb/ft³, the{" "}
            <a href={ASPHALT.calculator} className="font-medium text-primary hover:underline">
              asphalt calculator
            </a>{" "}
            by 145, and gravel by 96–140 depending on type. One method, three materials —
            the full walkthrough is in{" "}
            <a href={GRAVEL.howTo} className="font-medium text-primary hover:underline">
              how to calculate gravel
            </a>
            .
          </p>
        </Section>

        <Section title="Worked example: parking pad on soft ground">
          <ExampleBlock
            scenario="A 20 × 30 ft parking pad: 4 in of #57 stone over soft, grassy subgrade."
            steps={[
              { label: "Area", work: "20 × 30 = 600 ft²" },
              { label: "Volume", work: "600 × (4 ÷ 12) = 200 ft³" },
              { label: "Weight at 100 lb/ft³", work: "200 × 100 = 20,000 lb = 10 tons" },
              { label: "Soft ground: add 15%", work: "10 × 1.15 = 11.5 tons" },
            ]}
            result="Order 12 tons — one tandem load. Strip the sod first or the first third disappears into the mud."
          />
        </Section>

        <Section title="Ordering mistakes to avoid">
          <WarningBlock title="The four classic gravel errors">
            <p>
              1. Using the 1.4 t/yd³ rule for crusher run — compacted base runs 1.9 and
              you&apos;ll arrive 25% short. 2. Skipping the settling allowance on soft
              subgrade, where the first lift presses into the soil. 3. Comparing a per-yard
              quote against a per-ton quote without converting — a &quot;cheaper&quot; yard
              price is often the more expensive material. 4. Ordering decorative stone by
              coverage numbers written for common gravel; lava rock covers double per ton,
              river rock about the same.
            </p>
          </WarningBlock>
          <TipBlock title="Round to the half ton">
            Quarries load in bucket increments anyway (~0.5–1 ton per bucket). Order in
            half-ton steps and tell the loader operator the total — chasing 0.1-ton precision
            just annoys everyone at the scale house.
          </TipBlock>
        </Section>

        <Section
          title="Density quick reference"
          lead="The five densities behind the dropdown. The full 20-material table is in the density database."
        >
          <DensityTable
            rows={gravelDensities.slice(0, 7)}
            highlight="Common gravel, dry (loose)"
            caption="Loose bulk densities per ASTM C29 typical values. Compare with concrete (2,400 kg/m³) and asphalt (2,322)."
          />
        </Section>

        <Faq items={faqItems} />

        <RelatedArticles title="Gravel guides" variant="cards" items={coreGuideLinks} />

        <RelatedArticles
          title="Reference charts"
          variant="inline-strip"
          items={pickLinks(referenceLinks, GRAVEL.refDensity, GRAVEL.refCoverage, GRAVEL.refConversion, GRAVEL.refSizes)}
        />

        <RelatedArticles
          title="Estimating other materials?"
          variant="list"
          items={[
            ...pickConcrete(concreteCalcs, CONCRETE.calculator),
            ...pickAsphalt(asphaltCalculatorLinks, ASPHALT.calculator, ASPHALT.volume),
            ...pickLinks(gravelCalculatorLinks, GRAVEL.crushed, GRAVEL.driveway),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[GREFS.astmC29, GREFS.astmD448, GREFS.nssga]} />
      </CalculatorPageShell>
    </>
  );
}
