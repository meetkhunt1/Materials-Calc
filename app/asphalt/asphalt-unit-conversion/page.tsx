import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
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
import {
  ASPHALT,
  volumeGuideLinks,
  weightGuideLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Unit Conversion: Yards, Tons and Meters";
const description =
  "1 cubic yard of compacted asphalt = 1.96 US tons, 1 m³ = 2.32 tonnes, and 1 yd² at 1 in weighs 110 lb. Length, area, volume and weight tables in one place.";
const path = ASPHALT.unitConversion;
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
    question: "How do I convert cubic yards of asphalt to tons?",
    answer:
      "Multiply by 1.96 for compacted hot mix. One cubic yard is 27 ft³ at 145 lb/ft³, which is 3,915 lb or 1.96 US short tons. Going the other way, divide tons by 1.96, or remember that one ton occupies 13.8 ft³, about half a yard, compacted.",
  },
  {
    question: "How do I convert cubic meters of asphalt to tonnes?",
    answer:
      "Multiply by 2.32. That is the metric twin of the 1.96 rule: 145 lb/ft³ equals about 2,320 kg/m³ compacted, so one cubic meter of finished hot-mix pavement weighs 2.32 metric tonnes. For loose material use roughly 1.87 tonnes per cubic meter instead.",
  },
  {
    question: "What is the 110 rule for asphalt?",
    answer:
      "The 110 rule says pounds = square yards × inches of thickness × 110. It works because one square yard one inch thick is 0.75 ft³, and 0.75 × 145 = 108.75 ≈ 110. Highway agencies have specified overlay quantities in lb/yd²-in for decades, and the rule inverts a spec into an order in one line.",
  },
  {
    question: "How many US tons is a metric tonne?",
    answer:
      "1.102 US short tons. A tonne is 1,000 kg (2,204.6 lb) against the short ton's 2,000 lb. The 10% gap is large enough to blow a budget if a metric spec is read as US tons, so label every weight in a mixed-unit job explicitly.",
  },
  {
    question: "Why does 1 yd³ equal 0.765 m³ and not something rounder?",
    answer:
      "Because a yard is exactly 0.9144 m, and 0.9144 cubed is 0.7646. The reverse factor is 1.308 yd³ per m³. Volume conversions cube the length error, which is why eyeballed length factors produce volume answers that are off by several percent.",
  },
  {
    question: "Which conversion mistakes actually cause failed orders?",
    answer:
      "Three dominate: reading tonnes as tons (10% short), multiplying feet by inches without dividing by 12 (12× error, usually caught), and applying the compacted 1.96 tons/yd³ factor to a loose stockpile volume (24% heavy). Every one is prevented by writing units beside every number.",
  },
];

const toc = tocFromTitles(
  "Length and area conversions",
  "Volume conversions",
  "Asphalt-specific conversions",
  "What is the 110 rule?",
  "Worked example: metric spec to US order",
);

export default function AsphaltUnitConversionPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Asphalt",
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
              eyebrow="Asphalt · Volume Guide"
              variant="centered"
              title="Asphalt unit conversion"
              description="Takeoffs die in the conversions, not the multiplication. These three tables and one rule of thumb carry any asphalt quantity between US and metric, and between volume and weight, without a wrong turn."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Unit Conversion", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <QuickAnswer
          question="How do you convert asphalt from cubic yards to tons?"
          answer="Multiply cubic yards by 1.96 to get US tons of compacted hot mix asphalt, because one cubic yard (27 ft³) at 145 lb/ft³ weighs 3,915 lb. For metric, multiply cubic meters by 2.32 to get tonnes. To go from tons back to cubic yards, multiply by 0.51."
          ruleOfThumb="1 yd³ ≈ 2 tons; 1 m³ ≈ 2.3 tonnes; 1 yd² at 1 in ≈ 110 lb."
        />

        <Section title="Length and area conversions">
          <p className="text-muted-foreground">
            Divide inches by 12 to get feet, and multiply square yards by 9 to get square
            feet.
          </p>
          <CoverageTable
            headers={["From", "To", "Factor"]}
            rows={[
              { label: "Inches", spec: "Feet", coverage: "÷ 12", note: "4 in = 0.333 ft, the takeoff conversion" },
              { label: "Feet", spec: "Meters", coverage: "× 0.3048", note: "Reverse: × 3.281" },
              { label: "Square feet", spec: "Square meters", coverage: "× 0.0929", note: "Reverse: × 10.76" },
              { label: "Square yards", spec: "Square feet", coverage: "× 9", note: "Paving specs often quote yd²" },
            ]}
            caption="Length and area factors. Convert dimensions before multiplying, never after."
          />
        </Section>

        <Section title="Volume conversions">
          <p className="text-muted-foreground">
            Divide cubic feet by 27 for cubic yards, and multiply cubic yards by 0.765 for
            cubic meters.
          </p>
          <CoverageTable
            headers={["From", "To", "Factor"]}
            rows={[
              { label: "Cubic feet", spec: "Cubic yards", coverage: "÷ 27", note: "1 yd³ = 27 ft³" },
              { label: "Cubic yards", spec: "Cubic meters", coverage: "× 0.765", note: "Reverse: × 1.308" },
              { label: "Cubic meters", spec: "Cubic feet", coverage: "× 35.31" },
              { label: "Cubic feet", spec: "Liters", coverage: "× 28.32", note: "A 5-gal bucket ≈ 0.67 ft³ ≈ 19 L" },
            ]}
            caption="Volume factors. Converting a length and cubing it compounds any rounding, so use these volume factors directly."
          />
        </Section>

        <Section title="Asphalt-specific conversions">
          <p className="text-muted-foreground">
            One cubic yard of compacted asphalt is 1.96 US tons and one cubic meter is 2.32
            tonnes.
          </p>
          <CoverageTable
            headers={["From", "To", "Factor"]}
            rows={[
              { label: "Cubic yards", spec: "US tons", coverage: "× 1.96", note: "Compacted hot mix at 145 lb/ft³" },
              { label: "Cubic meters", spec: "Metric tonnes", coverage: "× 2.32", note: "Compacted; loose ≈ × 1.87" },
              { label: "ft² × in thickness", spec: "Pounds", coverage: "× 12.1", note: "1 ft² at 1 in = 145 ÷ 12 lb" },
              { label: "yd² × in thickness", spec: "Pounds", coverage: "× 110", note: "The paver's rule (see below)" },
            ]}
            caption="Weight factors assume compacted hot mix. Millings and cold mix run lighter; check the density chart."
          />
        </Section>

        <Section title="What is the 110 rule?">
          <p className="text-muted-foreground">
            The 110 rule says one square yard of compacted asphalt one inch thick weighs
            about 110 lb.
          </p>
          <FormulaBlock
            formula="lb = yd² × inches × 110"
            variables={[
              { symbol: "yd²", meaning: "paving area in square yards (ft² ÷ 9)" },
              { symbol: "inches", meaning: "compacted lift thickness" },
              { symbol: "110", meaning: "lb per yd² per inch: 0.75 ft³ × 145 lb/ft³ = 108.75, rounded" },
            ]}
            note="Divide the result by 2,000 for tons. Agencies write overlay specs in lb/yd²-in for exactly this arithmetic."
          />
        </Section>

        <Section title="Worked example: metric spec to US order">
          <ExampleBlock
            scenario="A spec sheet calls for 200 m² of surfacing at 75 mm compacted thickness. The plant sells in US tons, so what do you order?"
            steps={[
              { label: "Volume in metric", work: "200 × 0.075 = 15 m³" },
              { label: "Weight in tonnes", work: "15 × 2.32 = 34.8 t" },
              { label: "Tonnes to US tons", work: "34.8 × 1.102 = 38.4 US tons" },
              { label: "Cross-check in US units", work: "2,153 ft² × (2.95 in ÷ 12) × 145 ÷ 2,000 = 38.4 ✓" },
              { label: "Add 5% waste", work: "38.4 × 1.05 = 40.3" },
            ]}
            result="Order 40.5 tons. The independent US-unit check matching to the decimal is your assurance no factor was dropped."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Or let the calculator convert"
          description="The volume calculator accepts feet, inches, yards or meters and returns every output unit at once."
          href={ASPHALT.volume}
          buttonLabel="Asphalt Volume Calculator"
        />

        <RelatedArticles
          title="Related guides"
          variant="cards"
          items={[
            ...pickLinks(volumeGuideLinks, ASPHALT.cubicYardGuide, ASPHALT.volumeFormula),
            ...pickLinks(weightGuideLinks, ASPHALT.weightConversion),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

        <References items={[AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
