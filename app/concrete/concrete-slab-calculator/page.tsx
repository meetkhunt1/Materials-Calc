import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { SlabCalculatorCard } from "@/content/concrete/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Concrete Slab Calculator — Patios, Garages & Driveways";
const description =
  "Calculate concrete for a slab by area and thickness, with code-based thickness recommendations, bag counts and a worked garage-slab example.";
const path = CONCRETE.slab;
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
    question: "How thick should a concrete slab be?",
    answer:
      "4 in (100 mm) for patios, walkways and shed bases on well-compacted ground; 5 in for single-car driveways; 6 in where pickups, RVs or machinery will park. Going from 4 to 6 inches adds 50% to the concrete volume, so match thickness to the actual load, not habit.",
  },
  {
    question: "Do I need gravel under a concrete slab?",
    answer:
      "On free-draining sandy soil, you can pour on compacted native ground. Everywhere else, 4 in of compacted crusher-run gravel gives uniform bearing, drainage and a capillary break. The IRC (R506.2.2) requires a 4-inch base course except in Group I well-drained soils.",
  },
  {
    question: "How much does a 20×20 slab cost?",
    answer:
      "A 20 × 20 ft slab at 4 in needs about 5.5 yd³ including waste. At $140–170/yd³ delivered, that's $770–940 for concrete alone; with base gravel, forms, mesh and finishing labor, installed prices typically land between $2,400 and $4,800. See our concrete cost guide for the full breakdown.",
  },
  {
    question: "Should slab thickness include the wire mesh or rebar?",
    answer:
      "No — reinforcement sits inside the slab (mesh at mid-depth, rebar on chairs), not on top of it. Calculate volume from formwork height. What matters is cover: keep steel at least 1.5 in from the slab surface and 3 in from ground contact per ACI 318.",
  },
  {
    question: "Can I pour a slab in sections?",
    answer:
      "Yes — large slabs are routinely poured in alternating strips with construction joints. Each section becomes its own volume calculation. Plan joint locations first: control joints should divide the slab into panels no larger than about 24–36 times the thickness in inches (roughly 8–12 ft squares for a 4-inch slab).",
  },
];

const toc = tocFromTitles(
  "Choosing the slab thickness",
  "Formula and what it assumes",
  "Worked example: garage slab with thickened edge",
  "Mistakes that ruin slab estimates",
);

export default function SlabCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Concrete Slab Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="hero-flow"
        hero={
          <>
            <Hero
              eyebrow="Concrete · Slabs"
              variant="centered"
              title="Concrete Slab Calculator"
              description="Pick a code-appropriate thickness, enter your slab dimensions, and get yards, bags and weight. The thickness dropdown tells you what each option is rated for."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Slab Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        preCalculator={
          <FormulaBlock
            formula="V = Area × Thickness × (1 + waste)"
            variables={[
              { symbol: "Area", meaning: "slab length × width", unit: "ft² or m²" },
              { symbol: "Thickness", meaning: "uniform slab depth", unit: "ft or m" },
              { symbol: "waste", meaning: "0.05–0.15 depending on base quality" },
            ]}
            note="A 4-inch slab uses 1 yd³ per 81 ft² of area. That single ratio lets you sanity-check any slab quote in your head."
          />
        }
        calculator={<SlabCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <Section
          title="Choosing the slab thickness"
          lead="Thickness is the single biggest cost lever — and the most common overspecification."
        >
          <CoverageTable
            headers={["Application", "Recommended thickness", "Notes"]}
            rows={[
              { label: "Walkways, shed bases", spec: "4 in (100 mm)", coverage: "Foot traffic and garden equipment", note: "Mesh optional on good base" },
              { label: "Patios", spec: "4 in (100 mm)", coverage: "Furniture, foot traffic", note: "Slope 2% away from house" },
              { label: "Single-car driveway", spec: "5 in (125 mm)", coverage: "Cars and light SUVs", note: "#3 rebar 24 in o.c. or fiber mix" },
              { label: "Garage floor / RV pad", spec: "6 in (150 mm)", coverage: "Trucks, lifts, machinery", note: "#4 rebar 18 in o.c. typical" },
              { label: "Commercial / loading", spec: "8 in+ (200 mm+)", coverage: "Forklifts, delivery trucks", note: "Requires engineered design" },
            ]}
            caption="Residential guidance consistent with IRC Ch. 5 and PCA recommendations. Local codes govern."
          />
          <InfoBlock title="Thickness compounds fast">
            Upgrading a 24 × 24 ft slab from 4 in to 6 in adds 3.6 yd³ — roughly $550 of
            concrete — while upgrading the subbase compaction costs almost nothing. A thinner
            slab on a properly compacted base outperforms a thick slab on soft ground.
          </InfoBlock>
        </Section>

        <Section title="Formula and what it assumes">
          <p className="text-muted-foreground">
            The calculator above assumes a uniform-thickness slab on grade. Three situations
            need manual adjustment: thickened edges (add a footing-shaped volume around the
            perimeter — see the example below), slopes poured to falls (use the average of the
            high and low thickness), and monolithic slab-and-footing pours (calculate the slab
            and the{" "}
            <a href={CONCRETE.footing} className="font-medium text-primary hover:underline">
              footing
            </a>{" "}
            separately, then add them).
          </p>
        </Section>

        <Section title="Worked example: garage slab with thickened edge">
          <ExampleBlock
            scenario="A 24 × 24 ft garage slab, 6 in thick, with a 12 in wide × 12 in deep thickened edge around the full perimeter (monolithic pour)."
            steps={[
              { label: "Main slab volume", work: "24 × 24 × 0.5 ft = 288 ft³" },
              { label: "Perimeter length", work: "4 × 24 = 96 ft" },
              { label: "Thickened edge (extra 6 in below slab, 1 ft wide)", work: "96 × 1.0 × 0.5 = 48 ft³" },
              { label: "Total + 10% waste", work: "(288 + 48) × 1.10 = 369.6 ft³" },
              { label: "Convert to yards", work: "369.6 ÷ 27 = 13.7 yd³" },
            ]}
            result="Order 14 yd³ — the thickened edge added 2 full yards over a flat slab."
          />
        </Section>

        <Section title="Mistakes that ruin slab estimates">
          <WarningBlock title="Where slab pours go over budget">
            <p>
              Unmeasured subgrade dips are the top offender: a base that averages ½ inch low
              across a 24 × 24 slab swallows an extra 0.9 yd³. Second is ignoring the thickened
              edge on monolithic pours, as the example shows. Third is calculating from the
              finished floor plan instead of the formed dimensions — forms sit outside the plan
              line, typically adding 3–4 inches each way.
            </p>
          </WarningBlock>
        </Section>

        <Faq items={faqItems} variant="list" title="Slab questions, answered" />

        <Cta
          variant="banner"
          title="Pour isn't a simple rectangle?"
          description="The general concrete calculator handles multiple pours and custom depths in one order."
          href={CONCRETE.calculator}
          buttonLabel="Use the Concrete Calculator"
        />

        <RelatedArticles
          title="Keep planning your slab"
          variant="list"
          items={[
            ...pickLinks(guideLinks, CONCRETE.coverage, CONCRETE.cost, CONCRETE.curing),
            ...pickLinks(calculatorLinks, CONCRETE.footing),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[REFS.irc, REFS.aci318, REFS.pca]} />
      </CalculatorPageShell>
    </>
  );
}
