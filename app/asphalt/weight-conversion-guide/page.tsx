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
import { ASPHALT, weightGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Weight Conversion Guide — Tons, Tonnes, Pounds, Kilograms";
const description =
  "Convert asphalt weights between US tons, metric tonnes, pounds and kilograms without a factor-of-10% mistake: 1 US ton = 2,000 lb = 0.907 tonne, 1 tonne = 2,204.6 lb — plus asphalt-specific per-yard and per-meter tables.";
const path = ASPHALT.weightConversion;
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
    question: "Is a ton of asphalt the same as a tonne of asphalt?",
    answer:
      "No — and the 10% gap matters at invoice time. A US (short) ton is 2,000 lb; a metric tonne is 1,000 kg = 2,204.6 lb. One tonne is 1.102 US tons, so a 100-tonne metric quote is 110 US tons of material. Always confirm which unit a plant, spec or ticket uses.",
  },
  {
    question: "How do I convert US tons of asphalt to tonnes?",
    answer:
      "Multiply by 0.907: a 94-US-ton order is 85.3 tonnes. Going the other way, multiply tonnes by 1.102. Both factors come straight from 1 tonne = 2,204.6 lb versus 1 US ton = 2,000 lb. Keep three significant figures — rounding the factor to 0.9 loses nearly 1% on a large order.",
  },
  {
    question: "How many kilograms is a cubic yard of asphalt?",
    answer:
      "About 1,776 kg for compacted hot mix — 3,915 lb × 0.4536 kg/lb. The metric-native figure is cleaner: one cubic meter of compacted mix is 2,322 kg. If a supplier quotes kg/m³ and your takeoff is in cubic yards, convert the volume (1 yd³ = 0.7646 m³) before applying density.",
  },
  {
    question: "What is a long ton and will I ever see one?",
    answer:
      "The UK long ton is 2,240 lb — 12% heavier than a US short ton. It survives in older specifications, some maritime freight and occasionally in legacy quarry paperwork. If a document just says 'ton' and predates metrication or comes from a UK source, verify before you order; the 12% error dwarfs normal waste allowances.",
  },
  {
    question: "Why do American plants sometimes quote in tonnes?",
    answer:
      "Plants supplying federal-aid or DOT metric-spec work, and plants owned by international materials groups, often batch and report in tonnes. Their scale software prints whichever unit the job file specifies. The scale ticket should state the unit next to the net weight — if it only says 'T', ask, because T is used loosely for both.",
  },
  {
    question: "Do I convert weight or volume first when units are mixed?",
    answer:
      "Convert volume to a single system first, then apply one density, then convert the resulting weight if needed. Chaining a yd³-to-m³ conversion, a lb/ft³ density and a tonne price in one line is where errors breed. Two clean steps with written intermediate values beat one clever multiplication.",
  },
];

const toc = tocFromTitles(
  "The conversion matrix",
  "Asphalt-specific conversions",
  "The one formula to memorize",
  "Watch for the long ton",
  "Worked example: metric quote, imperial takeoff",
);

export default function WeightConversionGuidePage() {
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
              variant="compact"
              title="Asphalt weight conversion guide"
              description="Tons, tonnes, pounds and kilograms all show up on asphalt paperwork — sometimes on the same job. These are the exact factors, the asphalt-specific tables and the traps."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Weight Conversion", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section
          title="The conversion matrix"
          lead="The four weight units on asphalt paperwork and how they map onto each other."
        >
          <CoverageTable
            headers={["Unit", "Equals", "Also equals"]}
            rows={[
              {
                label: "1 US (short) ton",
                spec: "2,000 lb",
                coverage: "0.907 tonne = 907 kg",
              },
              {
                label: "1 metric tonne",
                spec: "2,204.6 lb",
                coverage: "1.102 US tons = 1,000 kg",
              },
              {
                label: "1 pound",
                spec: "0.4536 kg",
                coverage: "1/2,000 US ton",
              },
              {
                label: "1 kilogram",
                spec: "2.2046 lb",
                coverage: "1/1,000 tonne",
              },
            ]}
            caption="Exact definitions, not approximations. The US ton–tonne gap is 10.2% — larger than any normal waste allowance."
          />
        </Section>

        <Section
          title="Asphalt-specific conversions"
          lead="Standard estimating volumes of compacted hot mix (145 lb/ft³ = 2,322 kg/m³) expressed in every weight unit."
        >
          <CoverageTable
            headers={["Quantity of compacted HMA", "Imperial weight", "Metric weight"]}
            rows={[
              {
                label: "1 cubic yard",
                spec: "3,915 lb = 1.96 US tons",
                coverage: "1,776 kg = 1.78 tonnes",
              },
              {
                label: "1 cubic meter",
                spec: "5,119 lb = 2.56 US tons",
                coverage: "2,322 kg = 2.32 tonnes",
              },
              {
                label: "1 cubic yard, loose in truck",
                spec: "3,155 lb = 1.58 US tons",
                coverage: "1,431 kg = 1.43 tonnes",
                note: "Loose mix at ~117 lb/ft³ — 25% fluff vs compacted",
              },
            ]}
            caption="Dense-graded hot mix. Cold mix (~137 lb/ft³) and millings run lighter — see the weight chart for the full set."
          />
        </Section>

        <Section title="The one formula to memorize">
          <FormulaBlock
            formula="tonnes = US tons × 0.907"
            variables={[
              { symbol: "US tons", meaning: "short tons of 2,000 lb, the default at US plants", unit: "tons" },
              { symbol: "0.907", meaning: "2,000 ÷ 2,204.6 — exact short-ton-to-tonne factor", unit: "tonne/ton" },
            ]}
            note="Reverse it as US tons = tonnes × 1.102. If a converted figure moved by ~10%, you applied the factor the right way; if it moved by ~21%, you applied it twice."
          />
        </Section>

        <Section title="Watch for the long ton">
          <WarningBlock title="The UK long ton (2,240 lb) still turns up in old specs">
            Three different units all answer to &quot;ton&quot;: the US short ton (2,000 lb),
            the metric tonne (2,204.6 lb) and the UK long ton (2,240 lb). Legacy
            specifications, older quarry contracts and marine freight documents may mean the
            long ton — 12% heavier than a short ton. Never convert a bare &quot;ton&quot;
            without confirming which one the document means; state the unit explicitly on
            everything you issue.
          </WarningBlock>
        </Section>

        <Section title="Worked example: metric quote, imperial takeoff">
          <ExampleBlock
            title="Reconciling a tonne price with a yard takeoff"
            scenario="Your takeoff is 43 compacted cubic yards of hot mix. The plant — batching for a DOT metric job — quotes $98 per tonne and sells in whole tonnes."
            steps={[
              { label: "Convert takeoff volume to US tons", work: "43 yd³ × 1.96 tons/yd³ = 84.3 US tons" },
              { label: "Convert US tons to tonnes", work: "84.3 × 0.907 = 76.5 tonnes" },
              { label: "Add 5% waste and round up", work: "76.5 × 1.05 = 80.3 → order 81 tonnes" },
              { label: "Price the order", work: "81 tonnes × $98 = $7,938" },
            ]}
            result="Order 81 tonnes (≈ 89 US tons) — budget $7,938 for mix."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Let the calculator carry the units"
          description="Enter volume in yards or meters — the weight calculator returns pounds, US tons, kilograms and tonnes simultaneously."
          href={ASPHALT.weight}
          buttonLabel="Asphalt Weight Calculator"
        />

        <RelatedArticles
          title="More weight references"
          variant="inline-strip"
          items={pickLinks(
            weightGuideLinks,
            ASPHALT.tonsVsYards,
            ASPHALT.weightChart,
            ASPHALT.truckCapacity,
          )}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
