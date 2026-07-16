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
  GRAVEL,
  coreGuideLinks,
  referenceLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import { CONCRETE } from "@/content/concrete/links";
import { ASPHALT } from "@/content/asphalt/links";
import { gravelDensities } from "@/content/gravel/charts/density-data";
import type { FaqItem } from "@/types";

const title = "Gravel Density Chart — Unit Weights by Type";
const description =
  "Loose and compacted unit weights for every common gravel type: pea gravel, common gravel, #57 stone, crusher run, river rock and more, in lb/ft³, kg/m³ and t/m³.";
const path = GRAVEL.densityChart;
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
    question: "What is the density of gravel?",
    answer:
      "Common gravel runs 105 lb/ft³ loose — 1,680 kg/m³, or 1.42 US tons per cubic yard (2,800 lb). Pea gravel is lighter at 96 lb/ft³, #57 stone sits at 100 lb/ft³ loose, and crusher run with its fines reaches 125 lb/ft³ loose and about 140 compacted.",
  },
  {
    question: "Why do loose and compacted densities differ?",
    answer:
      "Compaction closes the air voids between particles, packing more stone into the same volume. Crusher run gains roughly 12% from loose to compacted (125 to 140 lb/ft³) because its fines fill the gaps; clean single-size stone like #57 gains less, about 9%, since uniform particles cannot interlock as tightly.",
  },
  {
    question: "Why does density matter when ordering gravel?",
    answer:
      "Suppliers sell by weight, but your project needs volume. Density is the bridge: cubic yards × density = tons ordered. Use the wrong figure — pea gravel numbers for crusher run, say — and a 10-yard order lands roughly 3 tons off, which is either wasted money or a second delivery fee.",
  },
  {
    question: "Which gravel type is heaviest, and which is lightest?",
    answer:
      "Among standard aggregates, compacted crusher run is heaviest at about 140 lb/ft³ (2,240 kg/m³) because fines pack the voids. Lava rock is the outlier at the light end — roughly 50 lb/ft³, half the weight of common gravel, which is why a ton of it covers nearly twice the area.",
  },
  {
    question: "How is gravel density measured?",
    answer:
      "Per ASTM C29, a rigid container of known volume is filled under a defined procedure — loose fill or rodded in layers — and weighed. Loose bulk density mirrors gravel as it leaves the truck; the rodded figure approximates a compacted lift. Published values are typical; your quarry can supply certified numbers.",
  },
  {
    question: "Does moisture change gravel density?",
    answer:
      "Yes — wet gravel weighs 10–15% more because water fills the surface pores and voids without adding stone. The chart lists dry values at 1,680 kg/m³ for common gravel and 1,920 wet. When a supplier weighs a rained-on stockpile, that difference rides straight onto your ticket.",
  },
];

const toc = tocFromTitles(
  "The density chart",
  "Densities compared",
  "From density to order weight",
  "Wet vs dry gravel",
);

export default function GravelDensityChartPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
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
              eyebrow="Gravel · Reference Chart"
              variant="compact"
              title="Gravel density chart"
              description="Unit weights are the one number every gravel calculation runs through. Here are the loose and compacted figures estimators actually use, per ASTM C29 typical values."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Density Chart", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Density applied for you"
            description="The calculator carries every one of these unit weights — pick a type and it converts volume to tons automatically."
            href={GRAVEL.calculator}
            buttonLabel="Gravel Calculator"
          />
        }
      >
        <Section title="The density chart">
          <DensityTable
            rows={gravelDensities}
            highlight="Common gravel, dry (loose)"
            caption="Loose bulk densities unless noted, per ASTM C29 typical values. The highlighted row — 105 lb/ft³, 1.42 US tons/yd³ — is the estimating standard for unspecified gravel."
          />
          <p className="text-muted-foreground">
            This chart covers the types that make up nearly every residential order. For crushed
            limestone, decomposed granite, lava rock, recycled concrete and the rest, see{" "}
            <a href={GRAVEL.refDensity} className="font-medium text-primary hover:underline">
              the full 20-material database
            </a>
            .
          </p>
        </Section>

        <Section title="Densities compared">
          <BarChart
            title="Loose and compacted unit weights, kg/m³"
            unit="kg/m³"
            data={gravelDensities.map((row) => ({ label: row.material, value: row.kgPerM3 }))}
          />
          <p className="text-muted-foreground">
            The spread matters more than the individual numbers: from pea gravel at 1,540 kg/m³
            to compacted crusher run at 2,240, the same cubic yard varies by 45% in weight. The
            other materials on this site sit higher still — normal-weight concrete at ~2,400
            kg/m³ (see the{" "}
            <a href={CONCRETE.density} className="font-medium text-primary hover:underline">
              concrete density chart
            </a>
            ) and compacted hot-mix asphalt at ~2,320 (see the{" "}
            <a href={ASPHALT.densityChart} className="font-medium text-primary hover:underline">
              asphalt density chart
            </a>
            ).
          </p>
        </Section>

        <Section title="From density to order weight">
          <FormulaBlock
            formula="Weight = Volume × Density"
            variables={[
              { symbol: "Volume", meaning: "Area × depth", unit: "ft³ or m³" },
              { symbol: "Density", meaning: "Unit weight from the chart", unit: "lb/ft³ or kg/m³" },
            ]}
            note="Divide pounds by 2,000 for US tons; kilograms by 1,000 for tonnes. Shortcut for common gravel: cubic yards × 1.42 = tons."
          />
        </Section>

        <Section title="Wet vs dry gravel">
          <WarningBlock title="Rain rides on your scale ticket">
            Wet gravel weighs 10–15% more than dry — water fills the voids without adding a
            single stone. Suppliers weigh what crosses the scale, so a delivery from an
            uncovered stockpile during a rainy week means you&apos;re paying gravel prices for
            water. If the pile is visibly soaked, ask whether the plant applies a moisture
            correction — or order by loose cubic yard instead, where volume doesn&apos;t care
            about moisture.
          </WarningBlock>
        </Section>

        <Faq items={faqItems} variant="list" />

        <RelatedArticles
          title="Related references"
          variant="cards"
          items={[
            ...pickLinks(referenceLinks, GRAVEL.refDensity, GRAVEL.refWeight),
            ...pickLinks(coreGuideLinks, GRAVEL.weightChart),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[GREFS.astmC29, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
