import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
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
import { pick, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { getAuthor } from "@/data/authors";
import {
  GRAVEL,
  stoneGuideLinks,
  coreGuideLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { DensityRow, FaqItem } from "@/types";

const slug = "crushed-stone-weight";
const title = "Crushed Stone Weight — lb/ft³ and Tons per Yard by Size";
const description =
  "How much crushed stone weighs: ~100 lb/ft³ loose for clean stone (1.35 tons/yd³), up to 140 lb/ft³ for compacted crusher run (1.89 tons/yd³) — by size, by rock type, with worked conversions.";
const path = GRAVEL.stoneWeight;
const author = getAuthor("materials-team");

const heroVariant = pick(slug, HERO_VARIANTS);
const tocPosition = pick(slug, ["toc-right", "toc-left"] as const);
const faqVariant = pick(slug, ["accordion", "list"] as const);
const relatedStyle = pick(slug, RELATED_STYLES);
const ctaVariant = pick(slug, ["banner", "card", "inline"] as const);

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-16",
});

/** Loose bulk unless noted — consistent with content/gravel/charts/density-data.ts */
const weightRows: DensityRow[] = [
  { material: "Crushed stone #57 (loose)", kgPerM3: 1600, note: "≈1.35 US tons/yd³ — the clean-stone standard" },
  { material: "Crushed stone #57 (compacted)", kgPerM3: 1750, note: "≈1.47 tons/yd³" },
  { material: "Crushed stone #8 (3/8 in, loose)", kgPerM3: 1550 },
  { material: "Crushed stone #2 (2–3 in, loose)", kgPerM3: 1600 },
  { material: "Stone dust / screenings", kgPerM3: 1600 },
  { material: "Crusher run / road base (loose)", kgPerM3: 2000, note: "Fines fill the voids — ≈1.69 tons/yd³" },
  { material: "Crusher run / road base (compacted)", kgPerM3: 2240, note: "≈1.89 tons/yd³ — the heaviest common product" },
  { material: "Crushed limestone (loose)", kgPerM3: 1550 },
  { material: "Crushed granite (loose)", kgPerM3: 1650 },
];

const faqItems: FaqItem[] = [
  {
    question: "How much does a cubic foot of crushed stone weigh?",
    answer:
      "About 100 lb for clean single-size stone like #57, loose. Screenings and stone dust run about the same, crushed limestone slightly lighter at 97 lb/ft³, crushed granite about 103, and dense-graded crusher run reaches 125 lb/ft³ loose and roughly 140 once compacted.",
  },
  {
    question: "How many tons is a cubic yard of crushed stone?",
    answer:
      "Multiply lb/ft³ by 27 and divide by 2,000: clean #57 stone is about 1.35 US tons per cubic yard loose, 1.47 compacted. Crusher run runs 1.69 loose and 1.89 compacted. If a supplier quotes a flat 1.4 tons per yard, that is the clean-stone average — do not use it for crusher run.",
  },
  {
    question: "Why is crusher run so much heavier than #57?",
    answer:
      "Fines. Clean #57 is a single size, so 35–40% of its volume is air voids between stones. Crusher run keeps everything from dust up, and the fine particles pack into those voids — same rock, 25% more of it per cubic yard. That extra mass is exactly what makes it a base material.",
  },
  {
    question: "How much more does compacted crushed stone weigh?",
    answer:
      "Compaction squeezes out air, so density rises roughly 9% for clean #57 (100 to 109 lb/ft³) and about 12% for crusher run (125 to 140 lb/ft³). A ton is still a ton — compaction never changes weight, only the volume that weight occupies. That is why base-course orders need 15–20% extra material to end up at the designed compacted depth.",
  },
  {
    question: "Does the rock type change crushed stone weight?",
    answer:
      "By roughly 10% across common quarry rock. Crushed limestone runs about 1,550 kg/m³ loose, granite about 1,650, and dense trap rock (basalt/diabase) heavier still. The gradation matters more than the geology, though — dense-graded crusher run of any rock outweighs clean stone of any rock.",
  },
  {
    question: "Does wet crushed stone weigh more?",
    answer:
      "Yes — moisture clinging to particle surfaces and filling voids adds 5–15% to scale weight, and fines-heavy products like crusher run hold the most water. Suppliers weigh whatever crosses the scale, so a soaked stockpile after a rainy week quietly inflates a per-ton purchase.",
  },
];

const toc = tocFromTitles(
  "The weight chart",
  "Loose vs compacted",
  "Weight by rock type",
  "Worked conversion: yards to tons",
  "Worked conversion: tons to coverage",
);

export default function CrushedStoneWeightPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
          datePublished: "2026-07-16",
          author,
        })}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Crushed Stone"
              variant={heroVariant}
              title="Crushed stone weight"
              description="Clean stone runs about 100 lb/ft³ loose; compacted crusher run reaches 140. That 40% spread is the difference between an accurate order and a second delivery fee — here are the numbers by size and rock type."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Crushed Stone Weight", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="The weight chart">
          <DensityTable
            rows={weightRows}
            highlight="Crushed stone #57 (loose)"
            caption="Loose bulk unit weights unless noted, per ASTM C29 typical values. The highlighted row — 100 lb/ft³, 1.35 tons/yd³ — is the estimating standard for clean crushed stone."
          />
          <p className="text-muted-foreground">
            Two patterns run through the chart. Single-size clean stone — #2, #57, #8 — all
            lands near 100 lb/ft³ regardless of particle size, because the void ratio between
            uniform particles barely changes with scale. And anything carrying fines — crusher
            run, dense-graded base — jumps 25% heavier because the fines occupy the voids.
            Size ranges for each product are decoded in the{" "}
            <a href={GRAVEL.stoneSizes} className="font-medium text-primary hover:underline">
              crushed stone sizes guide
            </a>
            .
          </p>
        </Section>

        <Section title="Loose vs compacted">
          <BarChart
            title="Loose vs compacted unit weight, lb/ft³"
            unit="lb/ft³"
            monochrome={false}
            data={[
              { label: "#57 loose", value: 100 },
              { label: "#57 compacted", value: 109 },
              { label: "Crusher run loose", value: 125 },
              { label: "Crusher run compacted", value: 140 },
            ]}
          />
          <p className="text-muted-foreground">
            Compaction removes air, not stone: a ton stays a ton, but it occupies about 9%
            less volume for clean #57 and 12% less for crusher run. The practical consequence
            is that a base layer specified at 4 inches <em>compacted</em> consumes more
            material than 4 loose inches would suggest — plan on ordering 15–20% extra
            (compaction shrinkage plus normal waste) to finish at the designed depth.
          </p>
          <WarningBlock title="Quote compacted density for base work">
            If you order a compacted crusher run base using the loose figure of 125 lb/ft³,
            a 15-ton order arrives roughly 1.6 tons short. Base courses convert at 140
            lb/ft³ — 1.89 tons per compacted cubic yard — before the waste allowance.
          </WarningBlock>
        </Section>

        <Section title="Weight by rock type">
          <p className="text-muted-foreground">
            Geology moves the numbers about 10%. Crushed limestone, the most common quarry
            rock east of the Rockies, runs about 1,550 kg/m³ (97 lb/ft³) loose. Granite is
            denser at roughly 1,650 kg/m³ (103 lb/ft³), and trap rock — basalt and diabase,
            common in the Northeast — is heavier still. Lightweight outliers exist too:
            recycled concrete aggregate runs about 1,450 kg/m³ because the old mortar is
            porous. Unless you are ordering hundreds of tons, the gradation (clean vs
            dense-graded, loose vs compacted) dominates the calculation and the rock type is
            a rounding adjustment — the full list is in the{" "}
            <a href={GRAVEL.refDensity} className="font-medium text-primary hover:underline">
              gravel density database
            </a>
            .
          </p>
        </Section>

        <Section title="Worked conversion: yards to tons">
          <FormulaBlock
            formula="Tons = yd³ × lb/ft³ × 27 ÷ 2,000"
            variables={[
              { symbol: "yd³", meaning: "Volume to fill", unit: "cubic yards" },
              { symbol: "lb/ft³", meaning: "Unit weight from the chart", unit: "pounds per cubic foot" },
            ]}
            note="Shortcuts: clean #57 × 1.35, compacted crusher run × 1.89. Metric: m³ × t/m³ directly."
          />
          <ExampleBlock
            scenario="A supplier quotes crushed #57 by the ton, but your takeoff came out in cubic yards: 6.5 yd³ of loose stone for a drainage bed."
            steps={[
              { label: "Unit weight", work: "#57 loose = 100 lb/ft³ (from the chart)" },
              { label: "Pounds", work: "6.5 yd³ × 27 ft³/yd³ × 100 lb/ft³ = 17,550 lb" },
              { label: "Tons", work: "17,550 ÷ 2,000 = 8.8 tons" },
              { label: "Add 10% allowance", work: "8.8 × 1.10 = 9.7 tons" },
            ]}
            result="Order 10 tons of #57 — or quote it back as 6.5 loose cubic yards and let the dispatcher confirm the conversion."
          />
        </Section>

        <Section title="Worked conversion: tons to coverage">
          <ExampleBlock
            scenario="The reverse problem: 5 tons of #57 are already in the driveway. How far will they go at 3 inches deep?"
            steps={[
              { label: "Pounds available", work: "5 × 2,000 = 10,000 lb" },
              { label: "Loose volume", work: "10,000 ÷ 100 lb/ft³ = 100 ft³" },
              { label: "Depth in feet", work: "3 in ÷ 12 = 0.25 ft" },
              { label: "Coverage", work: "100 ÷ 0.25 = 400 ft²" },
            ]}
            result="About 400 ft² at 3 inches — an 80 ft² per-ton rule of thumb for #57 at that depth. Full depth-by-depth tables are in the coverage chart."
          />
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Weight questions" />

        <Cta
          variant={ctaVariant}
          title="Skip the hand math"
          description="The crushed stone calculator applies loose or compacted density for every size and returns tons, yards and cost."
          href={GRAVEL.crushed}
          buttonLabel="Crushed Stone Calculator"
        />

        <RelatedArticles
          title="Related guides"
          variant={relatedStyle}
          items={[
            ...pickLinks(stoneGuideLinks, GRAVEL.stoneSizes, GRAVEL.stoneCoverage, GRAVEL.stoneCost),
            ...pickLinks(coreGuideLinks, GRAVEL.densityChart),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-16" />

        <References items={[GREFS.astmC29, GREFS.nssga, GREFS.usgs]} />
      </ArticleShell>
    </>
  );
}
