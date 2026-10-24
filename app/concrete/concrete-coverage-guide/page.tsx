import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import {
  ASPHALT,
  coreGuideLinks as asphaltCoreGuides,
  pickLinks as pickAsphalt,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Concrete Coverage: 1 Yard Covers 81 ft² at 4 in";
const description =
  "One cubic yard of concrete covers 81 ft² at 4 inches, 65 ft² at 5 in and 54 ft² at 6 in. Coverage charts for yards and every bag size, plus the formula.";
const path = CONCRETE.coverage;
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
    question: "What is the formula for concrete coverage per yard?",
    answer:
      "Divide 324 by the thickness in inches to get square feet per cubic yard. That gives 81 ft² at 4 in thick, 65 ft² at 5 in and 54 ft² at 6 in. The 324 comes from 27 ft³ per yard × 12 inches per foot.",
  },
  {
    question: "How many square feet does an 80 lb bag cover?",
    answer:
      "An 80 lb bag yields 0.60 ft³, so it covers 1.8 ft² at 4 in thick, about a 16-inch square. It sounds small because it is: bags suit posts and repairs, not area work.",
  },
  {
    question: "How much concrete for 100 square feet?",
    answer:
      "1.23 cubic yards at 4 inches thick. At 4 in: 100 ÷ 81 = 1.23 yd³, order 1.5 with waste. At 6 in: 1.85 yd³, order 2.25. Or run your exact numbers through the slab calculator.",
  },
  {
    question: "Does coverage change with the mix?",
    answer:
      "No. Coverage is pure geometry (volume ÷ depth). What changes between mixes is strength, workability and price. The only exception is yield shortfall: under-yielding happens when bags are under-watered and compacted, but it's a 1–3% effect.",
  },
  {
    question: "What's the minimum thickness I can pour?",
    answer:
      "2 in for bonded toppings over sound concrete (with a bonding agent), 3.5–4 in for slabs on grade. Feather-edging regular concrete below 1 in fails, so use a polymer-modified resurfacer product for thin overlays.",
  },
  {
    question: "How many bags of concrete make a yard?",
    answer:
      "45 bags of 80 lb mix make one cubic yard. You need 60 bags of the 60 lb size or 90 of the 40 lb size, because a yard is 27 ft³ and each bag yields a fixed volume (0.60, 0.45 or 0.30 ft³).",
  },
];

const toc = tocFromTitles(
  "Coverage per cubic yard",
  "How much does a bag of concrete cover?",
  "The coverage formula",
  "Worked example: ordering by area",
);

export default function CoverageGuidePage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Concrete",
          datePublished: "2026-07-15",
          dateModified: "2026-10-24",
          author,
        })}
      />
      <ArticleShell
        tocPosition="toc-left"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Concrete · Coverage"
              variant="standard"
              title="Concrete coverage guide"
              description="One cubic yard is a fixed 27 ft³ of material, so how far it spreads depends only on depth. These tables settle the 'how far will it go' question for yards and bags alike."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Coverage Guide", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <>
            <Cta
              variant="card"
              title="Work backwards from area"
              description="The slab calculator turns square feet + thickness into an order quantity."
              href={CONCRETE.slab}
              buttonLabel="Slab Calculator"
            />
          </>
        }
      >
        <QuickAnswer
          question="How much does a yard of concrete cover?"
          answer="One cubic yard of concrete covers 81 square feet at 4 inches thick, 65 ft² at 5 inches and 54 ft² at 6 inches. Divide 324 by the slab thickness in inches to get square feet per yard. An 80 lb bag covers only about 1.8 ft² at 4 inches, so it takes 45 bags to match one yard."
          ruleOfThumb="324 ÷ thickness in inches = square feet per cubic yard."
          formula="Coverage (ft²) = 27 ÷ (thickness in ÷ 12)"
        />

        <Section title="Coverage per cubic yard">
          <p className="text-muted-foreground">
            A cubic yard covers 162 ft² at 2 inches but only 40 ft² at 8 inches: coverage halves
            every time the thickness doubles.
          </p>
          <CoverageTable
            headers={["Thickness", "Coverage per yd³", "Typical use"]}
            rows={[
              { label: '2 in (51 mm)', spec: "162 ft²", coverage: "Bonded toppings only" },
              { label: '3 in (76 mm)', spec: "108 ft²", coverage: "Mowing strips, light paths" },
              { label: '4 in (102 mm)', spec: "81 ft²", coverage: "Patios, walkways, shed pads" },
              { label: '5 in (127 mm)', spec: "65 ft²", coverage: "Driveways (cars)" },
              { label: '6 in (152 mm)', spec: "54 ft²", coverage: "Garages, RV pads" },
              { label: '8 in (203 mm)', spec: "40 ft²", coverage: "Commercial, footings" },
            ]}
            caption="Coverage = 324 ÷ thickness (in). Values are geometric, so apply your waste factor on top."
          />
        </Section>

        <Section title="How much does a bag of concrete cover?">
          <p className="text-muted-foreground">
            An 80 lb bag covers 1.8 ft² at 4 inches thick; a 40 lb bag covers half that.
          </p>
          <CoverageTable
            headers={["Bag size", "Yield", "Coverage at 4 in"]}
            rows={[
              { label: "40 lb", spec: "0.30 ft³", coverage: "0.9 ft²", note: "90 bags per yd³" },
              { label: "60 lb", spec: "0.45 ft³", coverage: "1.35 ft²", note: "60 bags per yd³" },
              { label: "80 lb", spec: "0.60 ft³", coverage: "1.8 ft²", note: "45 bags per yd³" },
              { label: "90 lb (pro mix)", spec: "0.675 ft³", coverage: "2.0 ft²", note: "40 bags per yd³" },
            ]}
            caption="Manufacturer-published yields (QUIKRETE/Sakrete). Cross-check the bag, because specialty mixes differ."
          />
          <TipBlock title="The 45-bag reality check">
            Any time a bag plan crosses about 40–45 bags, you&apos;ve reached one cubic yard, so
            get a ready-mix quote before committing. The{" "}
            <a href={CONCRETE.cost} className="font-medium text-primary hover:underline">
              cost guide
            </a>{" "}
            shows the crossover math with current prices.
          </TipBlock>
        </Section>

        <Section title="The coverage formula">
          <p className="text-muted-foreground">
            Coverage is volume divided by thickness, with both in the same unit.
          </p>
          <FormulaBlock
            formula="Coverage (ft²) = Volume (ft³) ÷ Thickness (ft)"
            variables={[
              { symbol: "Volume", meaning: "27 for a yard, or the bag yield" },
              { symbol: "Thickness", meaning: "depth in feet (inches ÷ 12)" },
            ]}
            note="Metric: coverage (m²) = volume (m³) ÷ thickness (m). One cubic meter covers 10 m² at 100 mm."
          />
        </Section>

        <Section title="Worked example: ordering by area">
          <ExampleBlock
            scenario="A client wants 620 ft² of 4-inch patio and paths. How much concrete does the job take?"
            steps={[
              { label: "Coverage per yard at 4 in", work: "324 ÷ 4 = 81 ft²/yd³" },
              { label: "Yards required", work: "620 ÷ 81 = 7.65 yd³" },
              { label: "Add 10% waste", work: "7.65 × 1.10 = 8.42 yd³" },
              { label: "Round to plant increment", work: "8.5 yd³" },
            ]}
            result="Order 8.5 yd³. That fits on one truck (most carry 8–10 yd³), so confirm the truck size with dispatch to avoid a second trip."
          />
        </Section>

        <Faq items={faqItems} />

        <Cta
          variant="banner"
          title="Turn coverage into an order"
          description="Enter your dimensions once and get yards, bags and weight together."
          href={CONCRETE.calculator}
          buttonLabel="Concrete Calculator"
        />

        <RelatedArticles
          title="Related calculators"
          variant="inline-strip"
          items={pickLinks(calculatorLinks, CONCRETE.slab, CONCRETE.footing, CONCRETE.column)}
        />

        <RelatedArticles
          title="Related guides"
          variant="list"
          items={pickLinks(guideLinks, CONCRETE.howTo, CONCRETE.density, CONCRETE.cost)}
        />

        <RelatedArticles
          title="Coverage for asphalt"
          variant="inline-strip"
          items={pickAsphalt(asphaltCoreGuides, ASPHALT.coverage, ASPHALT.densityChart)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

        <References items={[REFS.pca]} />
      </ArticleShell>
    </>
  );
}
