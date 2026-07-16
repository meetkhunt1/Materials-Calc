import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
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
import { concreteDensities, ingredientDensities } from "@/content/concrete/charts/density-data";
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import {
  ASPHALT,
  coreGuideLinks as asphaltCoreGuides,
  weightGuideLinks as asphaltWeightGuides,
  pickLinks as pickAsphalt,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Concrete Density Chart — Unit Weights (kg/m³, lb/ft³)";
const description =
  "Unit weights for every concrete type — normal, reinforced, lightweight, heavyweight — plus ingredient densities for batching, in metric and imperial.";
const path = CONCRETE.density;
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
    question: "What is the density of concrete?",
    answer:
      "Normal-weight concrete is 2,300–2,400 kg/m³ (145–150 lb/ft³). Design codes use 145 lb/ft³ for plain and 150 lb/ft³ for reinforced concrete (ACI 318); IS 456 uses 24 kN/m³ ≈ 2,400 kg/m³ for RCC.",
  },
  {
    question: "How much does a cubic yard of concrete weigh?",
    answer:
      "About 4,050 lb — just over two US tons. A cubic meter weighs about 2,400 kg. A full 10-yard mixer truck therefore carries over 40,000 lb of concrete alone, which is why trucks stay off finished driveways and septic fields.",
  },
  {
    question: "Is wet concrete heavier than dry?",
    answer:
      "Slightly — fresh concrete carries mix water that later evaporates or binds chemically, so it weighs roughly 50–100 kg/m³ more than the cured slab. For formwork design you use the wet (fluid) weight; for structural dead load, the cured weight.",
  },
  {
    question: "Why does lightweight concrete exist?",
    answer:
      "Replacing gravel with expanded shale or clay drops density to ~1,750 kg/m³ while keeping structural strength (ASTM C330). On a high-rise floor slab, that 25% dead-load reduction cascades into smaller beams, columns and footings — worth the higher material price.",
  },
  {
    question: "What concrete is used for radiation shielding?",
    answer:
      "Heavyweight concrete batched with magnetite, barite or steel punchings reaches 3,200–4,000 kg/m³. Density is the shielding mechanism, so these mixes are specified by required mass per square meter of wall.",
  },
];

const toc = tocFromTitles(
  "Concrete types compared",
  "Density of concrete ingredients",
  "Density in the volume-to-weight formula",
  "Which density should you design with?",
);

export default function DensityChartPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Concrete",
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
              eyebrow="Concrete · Reference Chart"
              variant="compact"
              title="Concrete density chart"
              description="Every unit weight you need for estimating, batching and load calculations — one page, both unit systems, values consistent with PCA and ACI."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Density Chart", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Volume → weight, automatically"
            description="The calculator multiplies your pour volume by the right density for you."
            href={CONCRETE.calculator}
            buttonLabel="Concrete Calculator"
          />
        }
      >
        <Section title="Concrete types compared">
          <DensityTable
            rows={concreteDensities}
            highlight="Normal-weight concrete (reinforced)"
            caption="Typical as-cured unit weights. Individual mixes vary ±3% with aggregate source and air content."
          />
          <BarChart
            title="Density by concrete type"
            unit="kg/m³"
            data={concreteDensities
              .filter((r) => !r.material.startsWith("Fresh"))
              .map((r) => ({ label: r.material.replace(" concrete", ""), value: r.kgPerM3 }))}
          />
        </Section>

        <Section
          title="Density of concrete ingredients"
          lead="Batching by volume? These are the loose bulk densities that convert shovel counts to kilograms."
        >
          <DensityTable
            rows={ingredientDensities}
            caption="Loose bulk densities — compacted and saturated states differ. Wet sand bulks up to 25% by volume (IS 2386); batch by weight where accuracy matters."
          />
          <WarningBlock title="Sand bulking will wreck volume batching">
            Damp sand occupies up to a quarter more volume than the same mass of dry sand. A
            1:2:4 mix batched with damp-sand buckets is silently cement-rich on sand and
            gravel-poor — one reason site-mixed strength varies so much. Weigh batching (or at
            least a bulking correction) fixes it; details in the mix ratio guide.
          </WarningBlock>
        </Section>

        <Section title="Density in the volume-to-weight formula">
          <FormulaBlock
            formula="Weight = Volume × Density"
            variables={[
              { symbol: "Weight", meaning: "total mass of the pour", unit: "kg or lb" },
              { symbol: "Volume", meaning: "from your takeoff", unit: "m³ or ft³" },
              { symbol: "Density", meaning: "from the tables above", unit: "kg/m³ or lb/ft³" },
            ]}
            note="Example: a 0.5 m³ reinforced pour = 0.5 × 2,400 = 1,200 kg. In imperial: 17.7 ft³ × 150 = 2,650 lb."
          />
          <InfoBlock title="Where the weight number matters">
            Formwork pressure, crane picks, transport loads and dead-load takedowns all start
            from this multiplication. It&apos;s also the fastest sanity check on a delivery
            ticket: yards × 4,050 lb should roughly match the batch weights printed on it.
          </InfoBlock>
        </Section>

        <Section title="Which density should you design with?">
          <p className="text-muted-foreground">
            For estimating deliveries and dead loads on ordinary work, use 2,400 kg/m³ (150
            lb/ft³) — the reinforced normal-weight value that ACI 318 and IS 456 both build
            their load tables around. Use the plain-concrete 2,300 figure only for unreinforced
            mass pours, and switch to measured unit weight (ASTM C138) whenever a mix design
            sheet is available, because specialty aggregates move the number more than any
            table can capture.
          </p>
        </Section>

        <Faq items={faqItems} variant="list" title="Density questions" />

        <RelatedArticles
          title="Use these numbers"
          variant="cards"
          items={[
            ...pickLinks(calculatorLinks, CONCRETE.calculator, CONCRETE.wall),
            ...pickLinks(guideLinks, CONCRETE.mixRatio),
          ]}
        />

        <RelatedArticles
          title="More reference guides"
          variant="inline-strip"
          items={pickLinks(guideLinks, CONCRETE.coverage, CONCRETE.howTo, CONCRETE.cost)}
        />

        <RelatedArticles
          title="Asphalt densities"
          variant="inline-strip"
          items={[
            ...pickAsphalt(asphaltCoreGuides, ASPHALT.densityChart),
            ...pickAsphalt(asphaltWeightGuides, ASPHALT.weightChart),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[REFS.pca, REFS.aci318, REFS.is456]} />
      </ArticleShell>
    </>
  );
}
