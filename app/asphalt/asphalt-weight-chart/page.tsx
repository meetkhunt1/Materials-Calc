import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { InfoBlock } from "@/components/blocks/callout";
import { DensityTable } from "@/components/tables/density-table";
import { CoverageTable } from "@/components/tables/coverage-table";
import { BarChart } from "@/components/charts/bar-chart";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { asphaltDensities } from "@/content/asphalt/charts/density-data";
import { ASPHALT, weightGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import { CONCRETE } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Weight Chart — Per Cubic Yard, Foot & Meter";
const description =
  "How much asphalt weighs in every common unit: 145 lb/ft³, 3,915 lb (1.96 tons) per cubic yard, 2,322 kg/m³ — plus loose, cold mix and millings values for ordering and hauling.";
const path = ASPHALT.weightChart;
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
    question: "How much does a cubic yard of asphalt weigh?",
    answer:
      "Compacted hot mix weighs about 3,915 lb per cubic yard — 1.96 US tons, so 'call it 2 tons per yard' is a safe field rule. Loose in the truck the same material runs only ~3,155 lb/yd³ because it fluffs about 25% before rolling. Always confirm which state a quoted yard refers to.",
  },
  {
    question: "How much does a cubic foot of asphalt weigh?",
    answer:
      "145 lb for compacted hot mix — the estimating standard used by the Asphalt Institute and most DOTs. Loose mix runs ~117 lb/ft³, compacted cold mix ~137 lb/ft³, and millings 103 lb/ft³ loose or 122 lb/ft³ compacted. Multiply by 27 to get the per-cubic-yard figure.",
  },
  {
    question: "How much does asphalt weigh per square foot?",
    answer:
      "About 12 lb per square foot per inch of compacted thickness (145 lb/ft³ ÷ 12). A 3-inch driveway lift is therefore 36 lb/ft², and 100 ft² at 3 inches weighs roughly 3,625 lb — call it 1.8 US tons. This shortcut turns any plan area straight into an order weight.",
  },
  {
    question: "How much does a cubic meter of asphalt weigh in kg?",
    answer:
      "2,322 kg for compacted hot mix — about 5,119 lb or 2.56 US tons. Loose mix is roughly 1,870 kg/m³, compacted cold mix 2,200 kg/m³, and millings 1,650 kg/m³ loose. Metric plants quote in tonnes: one compacted cubic meter is 2.32 tonnes of mix.",
  },
  {
    question: "Do these weights change with mix design?",
    answer:
      "By a few percent, yes. Aggregate specific gravity, binder content and in-place air voids all move the number, which is why paving specs verify density against the specific mix (ASTM D2726) rather than a table. For estimating and ordering, 145 lb/ft³ compacted is accurate within roughly ±3% for dense-graded mixes.",
  },
  {
    question: "Is asphalt heavier than concrete?",
    answer:
      "Slightly lighter. Compacted hot mix runs 145 lb/ft³ against about 150 lb/ft³ for reinforced normal-weight concrete — roughly a 3% difference. Per cubic yard that is 3,915 lb of asphalt versus about 4,050 lb of concrete, so hauling and dead-load numbers are close but not interchangeable.",
  },
];

const toc = tocFromTitles(
  "Quick weight reference",
  "Full asphalt density table",
  "Weight by material state",
  "Asphalt vs concrete weight",
);

export default function AsphaltWeightChartPage() {
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
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Reference Chart"
              variant="compact"
              title="Asphalt weight chart"
              description="Every unit weight you need to convert a takeoff into an order: pounds, tons, kilograms and tonnes per cubic foot, yard and meter — compacted, loose, cold mix and millings."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Weight Chart", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Skip the arithmetic"
            description="Enter dimensions and the weight calculator returns tons, pounds and tonnes using these exact densities."
            href={ASPHALT.weight}
            buttonLabel="Asphalt Weight Calculator"
          />
        }
      >
        <Section
          title="Quick weight reference"
          lead="The five numbers estimators actually use, all derived from 145 lb/ft³ compacted hot mix."
        >
          <CoverageTable
            headers={["Quantity", "Basis", "Weight"]}
            rows={[
              {
                label: "1 cubic foot",
                spec: "Compacted hot mix",
                coverage: "145 lb (65.8 kg)",
              },
              {
                label: "1 cubic yard",
                spec: "27 ft³ × 145 lb/ft³",
                coverage: "3,915 lb = 1.96 US tons",
                note: "Loose in the truck: ~3,155 lb",
              },
              {
                label: "1 cubic meter",
                spec: "Compacted hot mix",
                coverage: "2,322 kg = 5,119 lb = 2.56 US tons",
              },
              {
                label: "100 ft² at 3 in thick",
                spec: "25 ft³ compacted",
                coverage: "3,625 lb ≈ 1.8 US tons",
              },
              {
                label: "1 ft² per inch of thickness",
                spec: "The estimator's shortcut",
                coverage: "12 lb",
                note: "Area (ft²) × inches × 12 = pounds",
              },
            ]}
            caption="Compacted dense-graded hot mix at 145 lb/ft³. Individual mix designs vary ±3% with aggregate source and air voids."
          />
        </Section>

        <Section
          title="Full asphalt density table"
          lead="Unit weights for every asphalt material you will order, haul or dispose of."
        >
          <DensityTable
            rows={asphaltDensities}
            highlight="Hot mix asphalt (compacted)"
            caption="Compacted values are in-place after rolling; loose values apply to material in the truck bed or stockpile."
          />
          <InfoBlock title="Compacted vs loose is the trap">
            The same ton of mix occupies about 25% more volume loose in the truck than it does
            rolled into the mat (145 vs ~117 lb/ft³). Order and pay by weight — tons do not
            change with compaction — but when you convert a delivered volume to coverage, use
            the compacted density or you will come up short.
          </InfoBlock>
        </Section>

        <Section
          title="Weight by material state"
          lead="Pounds per cubic yard across the states asphalt shows up in on a job."
        >
          <BarChart
            title="Weight per cubic yard by material state"
            unit="lb/yd³"
            data={[
              { label: "Hot mix, compacted", value: 3915 },
              { label: "Cold mix, compacted", value: 3710 },
              { label: "Millings, compacted", value: 3290 },
              { label: "Hot mix, loose in truck", value: 3155 },
              { label: "Millings, loose", value: 2780 },
            ]}
          />
          <p className="text-muted-foreground">
            Millings matter for demolition math: a driveway that took 10.8 tons of hot mix to
            build comes back out as the same 10.8 tons of debris, but at 103 lb/ft³ loose it
            fills roughly 40% more truck volume than the mat it came from. Truck counts for
            haul-off are covered in the{" "}
            <a href={ASPHALT.truckCapacity} className="font-medium text-primary hover:underline">
              truck load capacity guide
            </a>
            .
          </p>
        </Section>

        <Section title="Asphalt vs concrete weight">
          <p className="text-muted-foreground">
            Compacted hot mix at 145 lb/ft³ sits just under reinforced concrete at about 150
            lb/ft³ — close enough that a loaded tandem hauls a similar volume of either, far
            enough apart that you should not swap densities in a dead-load or disposal
            calculation. The concrete side of that comparison, including lightweight and
            heavyweight mixes, is tabulated in the{" "}
            <a href={CONCRETE.density} className="font-medium text-primary hover:underline">
              concrete density chart
            </a>
            . For asphalt, the practical difference shows up in demolition: a 4-inch concrete
            slab weighs ~50 lb/ft² against 36 lb/ft² for a 3-inch asphalt drive, so concrete
            tear-outs need about a third more hauling per square foot.
          </p>
        </Section>

        <Faq items={faqItems} variant="list" title="Weight chart questions" />

        <RelatedArticles
          title="Go deeper on asphalt weight"
          variant="inline-strip"
          items={pickLinks(
            weightGuideLinks,
            ASPHALT.densityExplained,
            ASPHALT.tonsVsYards,
            ASPHALT.weightConversion,
          )}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.astmD2726, AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
