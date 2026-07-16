import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { WarningBlock } from "@/components/blocks/callout";
import { DensityTable } from "@/components/tables/density-table";
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
import {
  ASPHALT,
  asphaltCalculatorLinks,
  weightGuideLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import { CONCRETE } from "@/content/concrete/links";
import { asphaltDensities } from "@/content/asphalt/charts/density-data";
import type { FaqItem } from "@/types";

const title = "Asphalt Density Chart — Unit Weights (lb/ft³, kg/m³)";
const description =
  "Unit weights for hot mix, warm mix, cold patch, millings and aggregate base — in lb/ft³, kg/m³ and t/m³. Compacted hot mix is 145 lb/ft³ (2,322 kg/m³); loose mix runs ~25% lighter per volume.";
const path = ASPHALT.densityChart;
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
    question: "What is the density of compacted asphalt?",
    answer:
      "145 lb/ft³, equal to 2,322 kg/m³ or 1.96 US tons per cubic yard. Real mixes measured under ASTM D2726 land between 142 and 148 lb/ft³ depending on aggregate specific gravity and in-place air voids, but 145 is the estimating standard the industry quotes and plants assume.",
  },
  {
    question: "What is the density of loose asphalt?",
    answer:
      "About 117 lb/ft³ in the truck bed — roughly 25% fluffier than the same material after rolling. A cubic yard of loose mix therefore weighs about 1.58 tons versus 1.96 compacted. Use loose density only for truck volume checks, never for tonnage takeoffs.",
  },
  {
    question: "How much does a cubic yard of asphalt weigh?",
    answer:
      "Compacted in place: 145 × 27 = 3,915 lb, call it 1.96 tons — just under 2 tons per yard, which is the shorthand most estimators carry. Loose in a truck the same yard of volume holds only about 3,160 lb, which is why truck beds are measured in tons hauled, not yards.",
  },
  {
    question: "How heavy are asphalt millings?",
    answer:
      "Loose millings run about 1,650 kg/m³ (103 lb/ft³) and compact to roughly 1,950 kg/m³ (122 lb/ft³). A tandem load of millings therefore spreads noticeably further than the same tonnage of new hot mix. Compacted millings make a serviceable base or rural wearing surface at a fraction of hot mix cost.",
  },
  {
    question: "Why do plants sell by weight instead of volume?",
    answer:
      "Because weight is invariant and volume is not. The same ton occupies about 17 ft³ loose in the truck and 13.8 ft³ after compaction. Scales at the plant read weight to the pound; nobody can measure a fluffed truck bed to 5%. Every ticket, price and takeoff therefore runs in tons or tonnes.",
  },
];

const toc = tocFromTitles(
  "The density chart",
  "Densities compared",
  "From volume to weight",
  "Loose vs compacted — the 25% trap",
);

export default function AsphaltDensityChartPage() {
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
              title="Asphalt density chart"
              description="Every asphalt tonnage calculation is volume × density. This chart supplies the density — for hot mix, warm mix, cold patch, millings and the aggregate base underneath."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Density Chart", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Convert volume to tons"
            description="The weight calculator applies these densities to any volume in any unit."
            href={ASPHALT.weight}
            buttonLabel="Asphalt Weight Calculator"
          />
        }
      >
        <Section title="The density chart">
          <DensityTable
            rows={asphaltDensities}
            highlight="Hot mix asphalt (compacted)"
            caption="Unit weights for estimating. The highlighted row — 145 lb/ft³ compacted hot mix — is the constant behind every tonnage formula on this site."
          />
          <p className="text-muted-foreground">
            For context, normal-weight concrete sits at 2,400 kg/m³ — about 3% denser than
            compacted hot mix. If you work both materials, the{" "}
            <a href={CONCRETE.density} className="font-medium text-primary hover:underline">
              concrete density chart
            </a>{" "}
            is the companion reference.
          </p>
        </Section>

        <Section title="Densities compared">
          <BarChart
            title="Asphalt material densities, kg/m³"
            unit="kg/m³"
            data={[
              { label: "Hot mix (compacted)", value: 2322 },
              { label: "Warm mix (compacted)", value: 2300 },
              { label: "Aggregate base (dense-graded)", value: 2240 },
              { label: "Cold mix / cold patch", value: 2200 },
              { label: "Millings (compacted)", value: 1950 },
              { label: "Hot mix (loose, in truck)", value: 1870 },
              { label: "Millings (loose)", value: 1650 },
            ]}
          />
          <p className="text-muted-foreground">
            The spread matters commercially: a tandem truck legally hauling 14 tons carries
            the same weight whether it is hot mix or millings — but the millings occupy about
            40% more bed volume and spread further on the ground. Density is why identical
            tonnages produce different-looking stockpiles.
          </p>
        </Section>

        <Section title="From volume to weight">
          <FormulaBlock
            formula="Weight = Volume × Density"
            variables={[
              { symbol: "Volume", meaning: "compacted in-place volume", unit: "ft³ or m³" },
              { symbol: "Density", meaning: "from the chart above", unit: "lb/ft³ or kg/m³" },
            ]}
            note="Imperial: ft³ × 145 ÷ 2,000 = US tons. Metric: m³ × 2.322 = tonnes. Divide by 27 nowhere — asphalt is sold by weight, not cubic yards."
          />
          <p className="text-muted-foreground">
            One worked line: a 20 ft × 30 ft pad at 3 in compacted is 600 × 0.25 = 150 ft³,
            times 145 lb/ft³ = 21,750 lb = 10.9 tons. Every asphalt takeoff reduces to that
            single multiplication once the volume is known.
          </p>
        </Section>

        <Section title="Loose vs compacted — the 25% trap">
          <WarningBlock title="Never estimate with loose density">
            Mix leaves the plant at roughly 117 lb/ft³ and finishes under the roller at 145 —
            a ~25% volume change at constant weight. Estimators who measure a fluffed mat or a
            truck bed and multiply by 145 over-order by a quarter; crews who set screed height
            to the finished thickness end up thin after roll-down. Takeoffs use compacted
            dimensions and compacted density; only screed settings use the loose number.
          </WarningBlock>
        </Section>

        <Faq items={faqItems} variant="list" />

        <RelatedArticles
          title="Related guides and tools"
          variant="cards"
          items={[
            ...pickLinks(weightGuideLinks, ASPHALT.densityExplained, ASPHALT.weightChart),
            ...pickLinks(asphaltCalculatorLinks, ASPHALT.calculator),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.astmD2726, AREFS.ms2]} />
      </ArticleShell>
    </>
  );
}
