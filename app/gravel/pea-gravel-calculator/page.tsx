import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { PeaGravelCalculatorCard } from "@/content/gravel/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock, InfoBlock } from "@/components/blocks/callout";
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
import { GRAVEL, peaGuideLinks, gravelCalculatorLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const title = "Pea Gravel Calculator — Tons, Yards & Bags";
const description =
  "Pea gravel for paths, patios and play areas: tons, cubic yards and retail bag counts, with depth presets that match how the stone actually behaves.";
const path = GRAVEL.pea;
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
    question: "How much pea gravel do I need for a 12×12 patio?",
    answer:
      "At the typical 3-inch depth: 144 ft² × 0.25 ft = 36 ft³ = 1.33 yd³ ≈ 1.7 tons, or about 79 half-cubic-foot bags. That bag count is the argument for bulk delivery — at $5 a bag it's $395 versus roughly $90 of bulk stone plus delivery.",
  },
  {
    question: "How many bags of pea gravel in a ton?",
    answer:
      "A ton of pea gravel is about 20.8 ft³, so roughly 42 standard 0.5 ft³ bags. Above 15–20 bags, bulk delivery is nearly always cheaper — see the pea gravel cost guide for the crossover math.",
  },
  {
    question: "How deep should pea gravel be?",
    answer:
      "2 inches for walkways over a compacted base, 3 for patios and seating areas, 4+ for loose-fill zones. Deeper isn't better for walking surfaces — past 3 inches the rounded stones shift underfoot like dry sand. Playground fall zones are the exception: CPSC guidance calls for 9 inches of loose fill.",
  },
  {
    question: "Does pea gravel need a base layer?",
    answer:
      "For anything you walk on, yes: 2–3 inches of compacted crusher run or stone dust under the pea gravel stops it from pumping into the soil and halves long-term top-ups. Purely decorative beds can go straight over landscape fabric.",
  },
  {
    question: "Why is my delivered pea gravel a different color?",
    answer:
      "Pea gravel is river-run natural stone, so color follows the local deposit — tan/brown in most regions, grayer where deposits are granitic. Ask your supplier for a photo of the current stockpile, and buy the whole job from one load to avoid a two-tone patio.",
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
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
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
              description="Smooth, rounded and barefoot-friendly — and lighter than other gravels, so its coverage math is its own. Depth presets match real applications."
            >
              <AuthorBox author={author} datePublished="2026-07-15" variant="inline" />
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
        <Section title="Coverage at a glance">
          <CoverageTable
            headers={["Depth", "Per ton", "Per 0.5 ft³ bag"]}
            rows={[
              { label: '2 in — walkways', spec: "≈125 ft²", coverage: "3.0 ft²" },
              { label: '3 in — patios', spec: "≈83 ft²", coverage: "2.0 ft²" },
              { label: '4 in — loose fill', spec: "≈62 ft²", coverage: "1.5 ft²" },
              { label: '9 in — playground fall zone', spec: "≈28 ft²", coverage: "0.67 ft²", note: "CPSC loose-fill guidance" },
            ]}
            caption="At 96 lb/ft³ loose. Full tables at every depth in the pea gravel coverage guide."
          />
        </Section>

        <Section title="Worked example: garden path">
          <ExampleBlock
            scenario="A 40 ft long, 3 ft wide garden path — 2 in of pea gravel over 2 in of compacted stone dust."
            steps={[
              { label: "Pea gravel volume", work: "120 ft² × (2 ÷ 12) = 20 ft³" },
              { label: "Tons + 10%", work: "20 × 96 ÷ 2,000 × 1.10 = 1.06 tons" },
              { label: "Base layer (stone dust at 100 lb/ft³)", work: "20 × 100 ÷ 2,000 × 1.10 = 1.1 tons" },
              { label: "As bags (pea only)", work: "20 × 1.10 ÷ 0.5 = 44 bags" },
            ]}
            result="About 1 ton of pea gravel + 1.1 tons of stone dust base — or 44 bags if delivery isn't practical."
          />
        </Section>

        <Section title="Bulk vs bags: the real math">
          <InfoBlock title="The 15-bag rule">
            Under about 15 bags, retail bags win: no delivery fee, carry them in a sedan.
            Above that, bulk pricing takes over fast — a ton delivered ($45–110 total)
            replaces 42 bags ($170–290). The{" "}
            <a href={GRAVEL.peaCost} className="font-medium underline-offset-2 hover:underline">
              pea gravel cost guide
            </a>{" "}
            runs the crossover at current prices.
          </InfoBlock>
          <TipBlock title="Edging is not optional">
            Rounded stone migrates — into lawns, down slopes, out of borders. Steel, aluminum
            or paver edging set 1 in above grade keeps the calculator&apos;s numbers true for
            years instead of months. The installation guide covers the details.
          </TipBlock>
        </Section>

        <Faq items={faqItems} variant="list" title="Pea gravel questions" />

        <Cta
          variant="banner"
          title="Everything pea gravel"
          description="What it is, sizes, cost, coverage, landscaping ideas and installation — the complete series."
          href={GRAVEL.whatIsPea}
          buttonLabel="Start with: What Is Pea Gravel?"
        />

        <RelatedArticles title="The pea gravel series" variant="cards" items={peaGuideLinks} />

        <RelatedArticles
          title="Other gravel tools"
          variant="inline-strip"
          items={pickLinks(gravelCalculatorLinks, GRAVEL.calculator, GRAVEL.crushed, GRAVEL.cost)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[GREFS.astmC29, GREFS.nssga]} />
      </CalculatorPageShell>
    </>
  );
}
