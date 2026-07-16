import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock, WarningBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, howToSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import {
  ASPHALT,
  coreGuideLinks as asphaltCoreGuides,
  asphaltCalculatorLinks,
  pickLinks as pickAsphalt,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "How to Calculate Concrete (Step-by-Step Method)";
const description =
  "The estimator's method for concrete takeoffs: measure, convert units, compute volume, add waste, convert to yards or bags. With worked examples for slabs, footings and odd shapes.";
const path = CONCRETE.howTo;
const author = getAuthor("materials-team");

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
});

const steps = [
  { name: "Measure the pour", text: "Measure length, width and depth at several points and record the averages. Depth is measured from the compacted base to the finished surface, not from string lines." },
  { name: "Convert to one unit", text: "Convert every dimension to feet (or meters) before multiplying. 4 inches = 0.333 ft, not 0.4." },
  { name: "Compute the volume", text: "Multiply length × width × depth. For irregular shapes, split the pour into rectangles and sum them." },
  { name: "Add a waste allowance", text: "Multiply by 1.05–1.15: 5% for formed pours on a laser-leveled base, 10% typical, 15% for earth-formed trenches or hand mixing." },
  { name: "Convert to order units", text: "Divide cubic feet by 27 for cubic yards, or use cubic meters directly. Round up to the supplier's increment — 0.25 yd³ for ready-mix, whole bags for site mixing." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is the basic formula for calculating concrete?",
    answer:
      "Volume = length × width × depth, with all three in the same unit, times a waste factor of 1.05–1.15. Divide cubic feet by 27 to get the cubic yards a plant sells, or work in meters and order cubic meters directly.",
  },
  {
    question: "Why divide by 27 for cubic yards?",
    answer:
      "A yard is 3 feet, so a cubic yard is 3 × 3 × 3 = 27 cubic feet. It's the single most-used constant in US concrete estimating.",
  },
  {
    question: "How do I calculate concrete for an L-shaped slab?",
    answer:
      "Split it into two rectangles at the inside corner, calculate each volume, and add them. Any straight-edged shape decomposes into rectangles; circles and circular segments are the only shapes that need π.",
  },
  {
    question: "How accurate do my measurements need to be?",
    answer:
      "Plan dimensions to the nearest inch are fine; depth is the sensitive one. A quarter-inch depth error on a 4-inch slab is a 6% volume error — measure depth at five or more points and average.",
  },
  {
    question: "Is it better to over-order or under-order?",
    answer:
      "Over-order, always. Excess concrete costs the per-yard price of the overage; running short costs a short-load fee ($50–150), an hour of scramble, and a cold joint that permanently weakens the pour. The 10% waste factor exists because shorting is the expensive failure.",
  },
];

const toc = tocFromTitles(
  "The five-step method",
  "Unit conversions you actually need",
  "Worked example: L-shaped patio",
  "Worked example: from volume to bags",
  "Odd shapes: circles, slopes and steps",
);

export default function HowToCalculateConcretePage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title,
            description,
            path,
            category: "Concrete",
            datePublished: "2026-07-15",
            author,
          }),
          howToSchema({
            name: "How to Calculate Concrete",
            description: "Five-step method for accurate concrete quantity takeoffs.",
            path,
            steps,
            totalTime: "PT15M",
          }),
        ]}
      />
      <ArticleShell
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Concrete · Method Guide"
              variant="centered"
              title="How to calculate concrete"
              description="The same five steps work for a fence-post footing and a commercial foundation. Learn them once and every calculator on this site becomes a double-check instead of a crutch."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "How to Calculate Concrete", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Skip the hand math"
            description="The calculator runs this exact method with automatic unit conversion."
            href={CONCRETE.calculator}
            buttonLabel="Concrete Calculator"
          />
        }
      >
        <Section title="The five-step method">
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step.name} className="flex gap-4 rounded-xl border p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold">{step.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <FormulaBlock
            formula="Order (yd³) = (L × W × D) ÷ 27 × (1 + waste)"
            note="L, W, D in feet. Working metric? Skip the ÷27: cubic meters are the order unit."
          />
        </Section>

        <Section title="Unit conversions you actually need">
          <CoverageTable
            headers={["From", "To", "Multiply / divide by"]}
            rows={[
              { label: "Inches", spec: "Feet", coverage: "÷ 12", note: "4 in = 0.333 ft" },
              { label: "Cubic feet", spec: "Cubic yards", coverage: "÷ 27" },
              { label: "Cubic yards", spec: "Cubic meters", coverage: "× 0.765" },
              { label: "Cubic feet", spec: "80 lb bags", coverage: "÷ 0.60", note: "Bag yield, not weight" },
              { label: "Cubic meters", spec: "Metric tons", coverage: "× 2.4", note: "Normal-weight concrete" },
            ]}
            caption="The five conversions that cover 95% of concrete work. Densities for other materials are in the density chart."
          />
          <TipBlock title="Convert first, multiply second">
            Every short pour we&apos;ve investigated traces to the same slip: multiplying feet by
            inches. Write all three dimensions in feet before touching the multiplication —
            or use decimals of a meter and never think about it again.
          </TipBlock>
        </Section>

        <Section title="Worked example: L-shaped patio">
          <ExampleBlock
            scenario="An L-shaped patio: main area 18 × 12 ft plus a 8 × 6 ft leg, poured 4 in thick."
            steps={[
              { label: "Split at the inside corner", work: "Rectangle A: 18 × 12 · Rectangle B: 8 × 6" },
              { label: "Areas", work: "216 ft² + 48 ft² = 264 ft²" },
              { label: "Volume at 4 in (0.333 ft)", work: "264 × 0.333 = 87.9 ft³" },
              { label: "Waste and conversion", work: "87.9 × 1.10 ÷ 27 = 3.58 yd³" },
            ]}
            result="Order 3.75 yd³ (next quarter-yard increment)."
          />
        </Section>

        <Section title="Worked example: from volume to bags">
          <ExampleBlock
            scenario="Setting 12 fence posts in 10 in holes, 30 in deep, 4×4 posts (3.5 in actual)."
            steps={[
              { label: "Hole area (10 in ⌀ = 0.417 ft radius)", work: "π × 0.417² = 0.545 ft²" },
              { label: "Hole volume at 30 in (2.5 ft) deep", work: "0.545 × 2.5 = 1.36 ft³" },
              { label: "Subtract the post (0.29 × 0.29 × 2.5)", work: "1.36 − 0.21 = 1.15 ft³ per hole" },
              { label: "All twelve holes", work: "1.15 × 12 = 13.8 ft³" },
              { label: "As 80 lb bags with 10% waste", work: "13.8 × 1.10 ÷ 0.60 = 25.3" },
            ]}
            result="26 bags of 80 lb mix — about two bags per post, the rule of thumb confirmed."
          />
        </Section>

        <Section title="Odd shapes: circles, slopes and steps">
          <p className="text-muted-foreground">
            Circles use π × r² × depth — that&apos;s the whole trick, and the{" "}
            <a href={CONCRETE.column} className="font-medium text-primary hover:underline">
              column calculator
            </a>{" "}
            does it for you. Sloped slabs use the average of the high-side and low-side
            thickness. Steps decompose into stacked rectangles: each tread is a small slab
            sitting on the one below, so a 3-step stoop is three volumes summed. Voids
            (pipe sleeves, blockouts) only matter above about 2% of the pour — smaller ones
            live inside the waste factor.
          </p>
          <WarningBlock title="Don't calculate what you should measure">
            For overlays and toppings on existing concrete, calculated depth is fiction — old
            slabs undulate. Grid the surface at 3 ft spacing, shoot elevations against the
            finished plane, and average the true depths. Crews that skip this routinely order
            30% light on toppings.
          </WarningBlock>
        </Section>

        <Faq items={faqItems} />

        <Cta
          variant="banner"
          title="Now run your numbers"
          description="Every calculator applies this method with the unit conversions handled for you."
          href={CONCRETE.calculator}
          buttonLabel="Open the Concrete Calculator"
        />

        <RelatedArticles
          title="Shape-specific calculators"
          variant="inline-strip"
          items={pickLinks(calculatorLinks, CONCRETE.slab, CONCRETE.footing, CONCRETE.wall, CONCRETE.column)}
        />

        <RelatedArticles
          title="Go deeper"
          variant="list"
          items={pickLinks(guideLinks, CONCRETE.coverage, CONCRETE.density, CONCRETE.cost)}
        />

        <RelatedArticles
          title="Same method, different material"
          variant="inline-strip"
          items={[
            ...pickAsphalt(asphaltCoreGuides, ASPHALT.howTo),
            ...pickAsphalt(asphaltCalculatorLinks, ASPHALT.volume),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[REFS.pca, REFS.astmC94]} />
      </ArticleShell>
    </>
  );
}
