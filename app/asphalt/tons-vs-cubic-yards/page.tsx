import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { WarningBlock } from "@/components/blocks/callout";
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
  weightGuideLinks,
  asphaltCalculatorLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Tons vs Cubic Yards — Converting Asphalt Units";
const description =
  "Plants sell asphalt by the ton; takeoffs come out in cubic yards. The conversion is 1.96 US tons per compacted cubic yard — here is the formula both ways, a quick-convert table and a worked ordering example.";
const path = ASPHALT.tonsVsYards;
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
    question: "How many tons is a cubic yard of asphalt?",
    answer:
      "1.96 US tons compacted — 27 ft³ × 145 lb/ft³ = 3,915 lb. Rounding to 2 tons per yard overstates the order by about 2%, which is usually harmless and often useful as built-in waste. Loose material in the truck is only about 1.58 tons per cubic yard.",
  },
  {
    question: "How many cubic yards is a ton of asphalt?",
    answer:
      "0.51 compacted cubic yards — one ton divided by 1.96 tons/yd³. In coverage terms, a ton placed 3 inches thick compacted covers about 55 ft². Twenty tons, a typical tandem-plus load, therefore builds roughly 10.2 yd³ of finished mat.",
  },
  {
    question: "Why do asphalt plants sell by the ton instead of by the yard?",
    answer:
      "Because weight is unambiguous. Volume changes with temperature, handling and compaction — the same ton occupies about 25% more space loose than rolled — but the scale ticket reads the same regardless. Plants batch by weight, trucks are weighed loaded and empty, and you pay for the difference.",
  },
  {
    question: "Should I convert loose or compacted yards to tons?",
    answer:
      "Compacted, almost always. Your takeoff (area × thickness) describes the finished, rolled mat, so multiply by 1.96 tons/yd³. Only use the loose factor (~1.58 tons/yd³) when you are sizing truck volume or estimating a stockpile — never for ordering against plan dimensions.",
  },
  {
    question: "How much extra should I add when converting a takeoff to an order?",
    answer:
      "5% covers handbook waste on straightforward geometry — handwork around structures, yield variation and cleanup. Irregular edges, many penetrations or thin variable-depth leveling courses justify 7–10%. Then round up to the plant's sale increment, typically the half ton or full ton.",
  },
  {
    question: "Does the 1.96 factor change with mix type?",
    answer:
      "A little. It is built on 145 lb/ft³ dense-graded hot mix; cold mix compacts nearer 137 lb/ft³ (1.85 tons/yd³) and compacted millings about 122 lb/ft³ (1.65 tons/yd³). If the mix design sheet lists a different maximum density, derive the factor from that instead of the table value.",
  },
];

const toc = tocFromTitles(
  "Two units, one material",
  "The conversion, both directions",
  "Quick-convert table",
  "Loose vs compacted yards",
  "From takeoff to order",
);

export default function TonsVsCubicYardsPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Asphalt",
          datePublished: "2026-07-15",
          author,
        })}
      />
      <ArticleShell
        tocPosition="toc-left"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Unit Conversion"
              variant="centered"
              title="Tons vs cubic yards"
              description="You measure the job in cubic yards; the plant sells it in tons. One factor — 1.96 US tons per compacted cubic yard — links the two, and getting it backwards is the most expensive unit mistake in paving."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Tons vs Cubic Yards", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Two units, one material">
          <p className="text-muted-foreground">
            A cubic yard is what your tape measure produces: area times compacted thickness.
            A ton is what the scale house produces: the truck weighed loaded minus its tare.
            Compacted dense-graded hot mix weighs 145 lb/ft³, so one cubic yard of finished
            mat is 27 × 145 = 3,915 lb — 1.96 US tons. Every conversion on this page is that
            single density restated.
          </p>
        </Section>

        <Section title="The conversion, both directions">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormulaBlock
              formula="Tons = yd³ × 1.96"
              variables={[
                { symbol: "yd³", meaning: "compacted volume from your takeoff", unit: "cubic yards" },
                { symbol: "1.96", meaning: "US tons per compacted cubic yard", unit: "tons/yd³" },
              ]}
              note="Use when ordering: volume in, weight out."
            />
            <FormulaBlock
              formula="yd³ = tons ÷ 1.96"
              variables={[
                { symbol: "tons", meaning: "weight from the scale ticket or quote", unit: "US tons" },
                { symbol: "1.96", meaning: "US tons per compacted cubic yard", unit: "tons/yd³" },
              ]}
              note="Use when checking coverage: weight in, compacted volume out."
            />
          </div>
        </Section>

        <Section
          title="Quick-convert table"
          lead="Common takeoff volumes converted at 1.96 tons per compacted cubic yard, with the reverse check alongside."
        >
          <CoverageTable
            headers={["Compacted volume", "Weight in US tons", "Reverse: tons → yd³"]}
            rows={[
              { label: "1 yd³", spec: "1.96 tons (3,915 lb)", coverage: "2 tons ≈ 1.02 yd³" },
              { label: "5 yd³", spec: "9.8 tons", coverage: "10 tons ≈ 5.1 yd³" },
              { label: "10 yd³", spec: "19.6 tons", coverage: "20 tons ≈ 10.2 yd³" },
              { label: "20 yd³", spec: "39.2 tons", coverage: "40 tons ≈ 20.4 yd³" },
              { label: "50 yd³", spec: "98 tons", coverage: "100 tons ≈ 51 yd³" },
            ]}
            caption="Compacted dense-graded hot mix at 145 lb/ft³. Add waste before rounding to the plant's sale increment."
          />
        </Section>

        <Section title="Loose vs compacted yards">
          <WarningBlock title="A loose yard and a compacted yard differ by 25%">
            Hot mix fluffs from 145 lb/ft³ in the mat to about 117 lb/ft³ in the truck bed —
            so a loose cubic yard is only ~1.58 tons, not 1.96. Quotes, delivery tickets and
            takeoffs that say &quot;yards&quot; without stating the condition are ambiguous by
            a quarter of the material. Always state which you mean; when in doubt, work in
            tons, which never change.
          </WarningBlock>
        </Section>

        <Section title="From takeoff to order">
          <ExampleBlock
            title="Worked example: 12 yd³ takeoff"
            scenario="A parking-area takeoff comes to 12 compacted cubic yards of dense-graded hot mix. The plant sells in whole tons."
            steps={[
              { label: "Convert volume to weight", work: "12 yd³ × 1.96 tons/yd³ = 23.5 tons" },
              { label: "Add 5% waste for handwork and yield", work: "23.5 × 1.05 = 24.7 tons" },
              { label: "Round up to the sale increment", work: "24.7 → 25 tons" },
            ]}
            result="Order 25 US tons — one tri-axle plus one small tandem load, or two tandem loads."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Convert your exact takeoff"
          description="The weight calculator applies the right density — compacted or loose — and returns tons ready to phone in."
          href={ASPHALT.weight}
          buttonLabel="Asphalt Weight Calculator"
        />

        <RelatedArticles
          title="Related guides"
          variant="cards"
          items={[
            ...pickLinks(weightGuideLinks, ASPHALT.weightChart, ASPHALT.densityExplained),
            ...pickLinks(asphaltCalculatorLinks, ASPHALT.volume),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
