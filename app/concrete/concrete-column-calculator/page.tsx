import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { ColumnCalculatorCard } from "@/content/concrete/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock, SuccessBlock } from "@/components/blocks/callout";
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

const title = "Concrete Column Calculator — Sonotubes & Square Piers";
const description =
  "Concrete for round tube forms and square columns: per-column volume, total order and bag counts, with a sonotube quick-reference table.";
const path = CONCRETE.column;
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
    question: "How many bags of concrete fill a 12-inch sonotube?",
    answer:
      "A 12 in tube holds 0.785 ft³ per foot of height. For a typical 4 ft deck pier that's 3.14 ft³ — six 80 lb bags (0.60 ft³ each), rounded up with a little waste. The table on this page lists per-foot volumes for every standard tube size.",
  },
  {
    question: "Round or square columns — which uses less concrete?",
    answer:
      "Round, every time. A circle covers π/4 ≈ 78.5% of the square that contains it, so a 12 in round column uses 21.5% less concrete than a 12 in square one. That's why cardboard tube forms dominate pier work: less material and no formwork carpentry.",
  },
  {
    question: "Should deck piers be poured in one lift?",
    answer:
      "Yes — each pier is small enough to fill in one continuous placement. Rod or vibrate in 2 ft increments as you fill to release trapped air, and set your post anchor while the concrete is plastic. A cold joint mid-pier is a structural defect in a column.",
  },
  {
    question: "How much rebar goes in a concrete column?",
    answer:
      "Structural columns need minimum 1% longitudinal steel (4 bars minimum for square/round ties) with ties per ACI 318 §10.7 or IS 456 §26.5.3. Simple deck piers under light loads often use a single centered #4 or the anchor bolt alone — follow your approved plan, not a website.",
  },
  {
    question: "Can I mix bagged concrete for columns?",
    answer:
      "Piers are the one job where bags genuinely compete with ready-mix: each pier needs only a few cubic feet, pours are spread across the site, and a truck's short-load fee outweighs bag premiums for small counts. Above roughly 15–20 piers, price both options.",
  },
];

const toc = tocFromTitles(
  "Round vs square: the volume formulas",
  "Sonotube quick-reference table",
  "Worked example: 9-pier deck foundation",
  "Placement tips that prevent honeycombing",
);

export default function ColumnCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Concrete Column Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="hero-flow"
        hero={
          <>
            <Hero
              eyebrow="Concrete · Columns & Piers"
              variant="standard"
              title="Concrete Column Calculator"
              description="Deck piers, fence-post footings, porch columns and structural piers — round or square, one or a hundred. Results include per-column volume so you can plan the mixing."
            >
              <AuthorBox author={author} datePublished="2026-07-15" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Column Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<ColumnCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <Section title="Round vs square: the volume formulas">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormulaBlock
              title="Round column"
              formula="V = (π × d² ÷ 4) × h"
              variables={[
                { symbol: "d", meaning: "inside diameter of the tube" },
                { symbol: "h", meaning: "column height" },
              ]}
            />
            <FormulaBlock
              title="Square column"
              formula="V = s² × h"
              variables={[
                { symbol: "s", meaning: "side width" },
                { symbol: "h", meaning: "column height" },
              ]}
            />
          </div>
          <p className="text-muted-foreground">
            Use the tube&apos;s inside diameter — a &quot;12-inch&quot; sonotube is 12 in inside.
            For belled piers (widened base for uplift or bearing), add a truncated cone:
            roughly one-third the bell height times the sum of the top area, bottom area and
            their geometric mean. In practice, adding one extra 80 lb bag per bell covers it.
          </p>
        </Section>

        <Section title="Sonotube quick-reference table">
          <CoverageTable
            headers={["Tube diameter", "Volume per ft of height", "80 lb bags per 4 ft pier"]}
            rows={[
              { label: '8 in (203 mm)', spec: "0.35 ft³ / ft", coverage: "3 bags" },
              { label: '10 in (254 mm)', spec: "0.55 ft³ / ft", coverage: "4 bags" },
              { label: '12 in (305 mm)', spec: "0.79 ft³ / ft", coverage: "6 bags" },
              { label: '16 in (406 mm)', spec: "1.40 ft³ / ft", coverage: "10 bags" },
              { label: '24 in (610 mm)', spec: "3.14 ft³ / ft", coverage: "21 bags" },
            ]}
            caption="Bag counts include ~5% waste, rounded up. One 80 lb bag yields 0.60 ft³."
          />
        </Section>

        <Section title="Worked example: 9-pier deck foundation">
          <ExampleBlock
            scenario="A 16 × 20 ft deck on nine 12 in sonotubes, each 48 in deep to reach frost depth."
            steps={[
              { label: "Section area of one tube", work: "π × 1² ÷ 4 = 0.785 ft²" },
              { label: "Volume per pier", work: "0.785 × 4 = 3.14 ft³" },
              { label: "All nine piers", work: "3.14 × 9 = 28.3 ft³" },
              { label: "Add 5% tube-form waste", work: "28.3 × 1.05 = 29.7 ft³ (1.1 yd³)" },
              { label: "As 80 lb bags", work: "29.7 ÷ 0.60 = 49.5 → 50 bags" },
            ]}
            result="50 bags of 80 lb mix, or 1.25 yd³ short-load ready-mix — price both."
          />
        </Section>

        <Section title="Placement tips that prevent honeycombing">
          <SuccessBlock title="The 4-point pier checklist">
            <p>
              Brace every tube plumb in two directions before any concrete arrives. Fill in one
              continuous lift, rodding every 2 ft. Set post bases or anchor bolts within 15
              minutes of topping off. Keep tubes damp-cured and braced for 48 hours before
              loading — full strength timelines are in the curing guide.
            </p>
          </SuccessBlock>
          <TipBlock title="Ordering for scattered piers">
            A pump truck or a power buggy beats wheelbarrowing ready-mix across a site with
            many piers — concrete stiffening in a wheelbarrow queue is how the last three piers
            end up honeycombed. For bag mixing, one mixer and a two-person crew place about
            10–12 bags an hour; plan crew size against the 90-minute working window.
          </TipBlock>
        </Section>

        <Faq items={faqItems} />

        <Cta
          variant="card"
          title="Piers plus a slab or footing?"
          description="Run each element through its calculator, then combine the order — one truck is cheaper than two."
          href={CONCRETE.calculator}
          buttonLabel="Concrete Calculator"
        />

        <RelatedArticles
          title="Keep estimating"
          variant="inline-strip"
          items={[
            ...pickLinks(calculatorLinks, CONCRETE.footing, CONCRETE.slab),
            ...pickLinks(guideLinks, CONCRETE.coverage, CONCRETE.curing),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[REFS.aci318, REFS.is456, REFS.pca]} />
      </CalculatorPageShell>
    </>
  );
}
