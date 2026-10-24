import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { PeaGravelCalculatorCard } from "@/content/gravel/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock, InfoBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { QuickSizeTable } from "@/components/tables/quick-size-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { GRAVEL, peaGuideLinks, gravelCalculatorLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const title = "Pea Gravel Calculator: Tons, Yards and Cost";
const description =
  "Pea gravel weighs about 1.3 tons per cubic yard, and 1 ton covers roughly 83 sq ft at 3 in deep. Get tons, yards, bags and cost for any patio or path.";
const path = GRAVEL.pea;
const author = getAuthor("materials-team");

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
  modifiedTime: "2026-10-24",
});

const faqItems: FaqItem[] = [
  {
    question: "How much pea gravel do I need for a 12×12 patio?",
    answer:
      "About 1.9 tons (1.47 yd³) at the typical 3-inch depth, including a 10% waste allowance. The math is 144 ft² × 0.25 ft = 36 ft³ = 1.33 yd³ before waste, which is also 79 half-cubic-foot bags. That bag count is the argument for bulk delivery: at $5 a bag it's $395 versus roughly $90 of bulk stone plus delivery.",
  },
  {
    question: "How many bags of pea gravel in a ton?",
    answer:
      "About 42 standard 0.5 ft³ bags, because a ton of pea gravel is roughly 20.8 ft³ of loose stone. Above 15–20 bags, bulk delivery is nearly always cheaper; the pea gravel cost guide runs the crossover math.",
  },
  {
    question: "How deep should pea gravel be?",
    answer:
      "2 inches for walkways over a compacted base, 3 for patios and seating areas, and 4 or more for loose-fill zones. Deeper isn't better for walking surfaces: past 3 inches the rounded stones shift underfoot like dry sand. Playground fall zones are the exception, where CPSC guidance calls for 9 inches of loose fill.",
  },
  {
    question: "Does pea gravel need a base layer?",
    answer:
      "For anything you walk on, yes: 2–3 inches of compacted crusher run or stone dust under the pea gravel stops it from pumping into the soil and halves long-term top-ups. Purely decorative beds can go straight over landscape fabric.",
  },
  {
    question: "Why is my delivered pea gravel a different color?",
    answer:
      "Because pea gravel is river-run natural stone, its color follows the local deposit: tan/brown in most regions, grayer where deposits are granitic. Ask your supplier for a photo of the current stockpile, and buy the whole job from one load to avoid a two-tone patio.",
  },
  {
    question: "How many tons of pea gravel are in a cubic yard?",
    answer:
      "About 1.3 tons. Loose pea gravel weighs roughly 96 lb/ft³, and 96 × 27 = 2,592 lb per cubic yard. Flip it and 1 ton of pea gravel is about 0.77 cubic yards (20.8 ft³), which is why a yard of pea gravel covers slightly more ground than a ton.",
  },
  {
    question: "How much does pea gravel cost for a patio?",
    answer:
      "Expect roughly $40–80 in bulk material for a 10×10 ft patio at 3 inches deep, using $30–60 per ton for about 1.32 tons. Delivery usually adds a flat $50–150 per trip, so bagged stone only makes sense on very small jobs of 15 bags or fewer.",
  },
];

const toc = tocFromTitles(
  "Coverage at a glance",
  "Worked example: garden path",
  "Bulk vs bags: the real math",
);

export default function PeaGravelCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15", dateModified: "2026-10-24" }),
          calculatorSchema({ name: "Pea Gravel Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="hero-flow"
        hero={
          <>
            <Hero
              eyebrow="Gravel · Pea Gravel"
              variant="compact"
              title="Pea Gravel Calculator"
              description="Smooth, rounded and barefoot-friendly. Pea gravel is also lighter than most gravels (about 1.3 tons per cubic yard), so its coverage math is its own. Depth presets match real applications."
            >
              <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Pea Gravel Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        preCalculator={
          <FormulaBlock
            formula="Tons = ft² × (depth ÷ 12) × 96 ÷ 2,000 × (1 + waste)"
            variables={[
              { symbol: "96", meaning: "loose pea gravel density", unit: "lb/ft³" },
            ]}
            note="One ton of pea gravel covers ≈125 ft² at 2 in, 83 ft² at 3 in. Bags: one 0.5 ft³ bag covers 3 ft² at 2 in."
          />
        }
        calculator={<PeaGravelCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <QuickAnswer
          question="How many tons of pea gravel do I need?"
          answer="Multiply the area in square feet by the depth in feet, then by 96 lb/ft³ (loose pea gravel), and divide by 2,000 for tons. A 10×10 ft patio at the typical 3-inch depth needs about 1.32 tons (1.02 cubic yards) including 10% waste, or roughly 55 retail 0.5 ft³ bags."
          ruleOfThumb="One ton of pea gravel covers about 83 ft² at 3 in deep, and one cubic yard weighs about 1.3 tons."
          formula="Tons = Area × depth × 96 lb/ft³ ÷ 2,000 × (1 + waste)"
        />

        <Section title="Pea gravel by common area size">
          <QuickSizeTable
            headers={["Area", "Tons", "Volume (yd³)", "0.5 ft³ bags", "Est. material cost"]}
            rows={[
              ["10×10 ft", "1.32 tons", "1.02 yd³", "55", "$40–79"],
              ["12×12 ft", "1.90 tons", "1.47 yd³", "79", "$57–114"],
              ["16×20 ft", "4.23 tons", "3.26 yd³", "175", "$127–254"],
              ["20×20 ft", "5.29 tons", "4.07 yd³", "219", "$159–317"],
              ["24×24 ft", "7.61 tons", "5.87 yd³", "316", "$228–457"],
            ]}
            caption="3 in depth, 10% waste included. Cost uses the $30–60/ton range from our gravel price guide; confirm with local suppliers."
          />
        </Section>

        <Section title="Coverage at a glance">
          <CoverageTable
            headers={["Depth", "Per ton", "Per 0.5 ft³ bag"]}
            rows={[
              { label: '2 in: walkways', spec: "≈125 ft²", coverage: "3.0 ft²" },
              { label: '3 in: patios', spec: "≈83 ft²", coverage: "2.0 ft²" },
              { label: '4 in: loose fill', spec: "≈62 ft²", coverage: "1.5 ft²" },
              { label: '9 in: playground fall zone', spec: "≈28 ft²", coverage: "0.67 ft²", note: "CPSC loose-fill guidance" },
            ]}
            caption="At 96 lb/ft³ loose. Full tables at every depth in the pea gravel coverage guide."
          />
        </Section>

        <Section title="Worked example: garden path">
          <ExampleBlock
            scenario="A 40 ft long, 3 ft wide garden path with 2 in of pea gravel over 2 in of compacted stone dust."
            steps={[
              { label: "Pea gravel volume", work: "120 ft² × (2 ÷ 12) = 20 ft³" },
              { label: "Tons + 10%", work: "20 × 96 ÷ 2,000 × 1.10 = 1.06 tons" },
              { label: "Base layer (stone dust at 100 lb/ft³)", work: "20 × 100 ÷ 2,000 × 1.10 = 1.1 tons" },
              { label: "As bags (pea only)", work: "20 × 1.10 ÷ 0.5 = 44 bags" },
            ]}
            result="About 1 ton of pea gravel plus 1.1 tons of stone dust base, or 44 bags of pea gravel if delivery isn't practical."
          />
        </Section>

        <Section title="Bulk vs bags: the real math">
          <InfoBlock title="The 15-bag rule">
            Under about 15 bags, retail bags win: no delivery fee, carry them in a sedan.
            Above that, bulk pricing takes over fast: a ton delivered ($45–110 total)
            replaces 42 bags ($170–290). The{" "}
            <a href={GRAVEL.peaCost} className="font-medium underline-offset-2 hover:underline">
              pea gravel cost guide
            </a>{" "}
            runs the crossover at current prices.
          </InfoBlock>
          <TipBlock title="Edging is not optional">
            Rounded stone migrates into lawns, down slopes and out of borders. Steel, aluminum
            or paver edging set 1 in above grade keeps the calculator&apos;s numbers true for
            years instead of months. The installation guide covers the details.
          </TipBlock>
        </Section>

        <Faq items={faqItems} variant="list" title="Pea gravel questions" />

        <Cta
          variant="banner"
          title="Everything pea gravel"
          description="What it is, sizes, cost, coverage, landscaping ideas and installation: the complete series."
          href={GRAVEL.whatIsPea}
          buttonLabel="Start with: What Is Pea Gravel?"
        />

        <RelatedArticles title="The pea gravel series" variant="cards" items={peaGuideLinks} />

        <RelatedArticles
          title="Other gravel tools"
          variant="inline-strip"
          items={pickLinks(gravelCalculatorLinks, GRAVEL.calculator, GRAVEL.crushed, GRAVEL.cost)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

        <References items={[GREFS.astmC29, GREFS.nssga]} />
      </CalculatorPageShell>
    </>
  );
}
