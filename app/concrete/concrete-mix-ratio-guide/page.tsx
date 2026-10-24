import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock, SuccessBlock } from "@/components/blocks/callout";
import { ComparisonTable } from "@/components/tables/comparison-table";
import { CoverageTable } from "@/components/tables/coverage-table";
import { DonutChart } from "@/components/charts/donut-chart";
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
import type { FaqItem } from "@/types";

const title = "Concrete Mix Ratio Chart: 1:2:4, C15 and C20";
const description =
  "The standard concrete mix ratio is 1:2:4 (cement, sand, stone) for general work and 1:1.5:3 with rebar. See the full chart, bags per m³ and water ratio.";
const path = CONCRETE.mixRatio;
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
    question: "What is the strongest concrete mix ratio?",
    answer:
      "1:1:2 (about M25) is the richest nominal mix in common use. Beyond that, you don't get stronger concrete by adding cement. You get it by lowering the water-cement ratio and using admixtures, which is design-mix territory (IS 10262 / ACI 211).",
  },
  {
    question: "What is the C15, C20 and C40 concrete mix ratio?",
    answer:
      "C15 is roughly a 1:2:4 mix and C20 is roughly 1:1.5:3, matching the M15 and M20 rows in the chart above. C40 has no reliable nominal ratio: it sits well above the richest volumetric mix (1:1:2, about M25), so it has to be a design mix with a low water-cement ratio, usually ordered as ready-mix.",
  },
  {
    question: "What concrete mix ratio should I use for a slab?",
    answer:
      "Use 1:1.5:3 (M20, about 2,900 psi) for any slab with rebar or mesh, including driveways and garage floors. A plain 1:2:4 mix is fine for unreinforced paths and shed bases. Keep the water-cement ratio between 0.45 and 0.55 either way.",
  },
  {
    question: "Is 1:2:3 a good concrete mix ratio?",
    answer:
      "Yes, 1:2:3 is a reasonable general-purpose mix. It sits between the 1:1.5:3 (M20) and 1:2:4 (M15) rows: a little richer than 1:2:4 because it carries less coarse aggregate per bag of cement. For reinforced work, 1:1.5:3 is still the safer choice.",
  },
  {
    question: "What mix ratio gives 4,000 or 5,000 psi concrete?",
    answer:
      "No nominal site mix reliably reaches 4,000 or 5,000 psi. The richest common ratio, 1:1:2, tests around 3,600 psi when site-cured. Higher strengths come from a design mix with a lower water-cement ratio, which is why bagged 4,000 psi mixes and ready-mix orders specify strength rather than a ratio.",
  },
  {
    question: "What is the ratio for general-purpose concrete?",
    answer:
      "1:2:4 by volume (cement : sand : 20 mm aggregate) with a 0.5–0.55 water-cement ratio. That gives roughly M15 (about C15) and 2,200 psi as batched on site. For driveways and structural work, step up to 1:1.5:3 (M20, about 2,900 psi).",
  },
  {
    question: "How much water per bag of cement?",
    answer:
      "At w/c 0.50, a 50 kg cement bag takes 25 liters (a 94 lb US bag takes about 21 quarts). Count the water already in damp sand: it's commonly 3–5% by weight and pushes your real w/c well above target if ignored.",
  },
  {
    question: "Why do bagged mixes not list a ratio?",
    answer:
      "Bagged concrete is pre-blended to a target strength (typically 4,000 psi at proper water content); the ratio decision has been made for you. Ratios matter when batching from separate cement, sand and aggregate.",
  },
  {
    question: "Can I use a 1:3:6 mix for anything structural?",
    answer:
      "No. 1:3:6 (≈M10) is for blinding layers, fill and mass concrete without reinforcement. IS 456 sets M20 as the minimum grade for reinforced concrete; using leaner mixes around rebar invites corrosion and cracking.",
  },
];

const toc = tocFromTitles(
  "Concrete mix ratio chart",
  "What does a 1:2:4 mix ratio mean?",
  "Water-cement ratio: the strength dial",
  "Batching quantities per cubic meter",
  "Worked example: batching 1:2:4 by bag",
);

export default function MixRatioGuidePage() {
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
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Concrete · Mix Design"
              variant="centered"
              title="Concrete mix ratios, decoded"
              description="1:2:4 and its siblings are volumetric recipes older than ready-mix, and they are still how much of the world batches concrete. Here's what the numbers mean and when each mix is appropriate."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Mix Ratio Guide", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Batch helpers"
            variant="inline-strip"
            items={pickLinks(guideLinks, CONCRETE.density, CONCRETE.coverage)}
          />
        }
      >
        <QuickAnswer
          question="What is the standard concrete mix ratio?"
          answer="The standard concrete mix ratio is 1:2:4 by volume: 1 part cement, 2 parts sand and 4 parts 20 mm stone, with a water-cement ratio near 0.5. It gives about 2,200 psi (M15, roughly C15) for paths and unreinforced slabs. Anything with rebar, including driveways and footings, needs 1:1.5:3 (M20, about 2,900 psi) or richer."
          ruleOfThumb="Rebar in the pour means 1:1.5:3 (M20) or richer."
          formula="w/c = water weight ÷ cement weight (target 0.45–0.55)"
        />

        <Section title="Concrete mix ratio chart">
          <p className="text-muted-foreground">
            Five nominal mixes cover almost every site-batched job, from 1:4:8 blinding up to
            1:1:2 for columns and beams. Pick the row by what the concrete has to do, then
            check the water-cement ratio below.
          </p>
          <ComparisonTable
            caption="Nominal mixes per IS 456 Table 9 conventions; psi figures are typical site-cured strengths, not guarantees."
            columns={[
              { key: "ratio", label: "Ratio (C:S:A)" },
              { key: "grade", label: "IS grade" },
              { key: "strength", label: "≈ Strength" },
              { key: "use", label: "Appropriate use", highlight: false },
            ]}
            rows={[
              { feature: "Lean / blinding", values: { ratio: "1:4:8", grade: "M7.5", strength: "1,100 psi", use: "Levelling course under footings" } },
              { feature: "Mass fill", values: { ratio: "1:3:6", grade: "M10", strength: "1,450 psi", use: "Trench fill, haunching (no rebar)" } },
              { feature: "General purpose", values: { ratio: "1:2:4", grade: "M15", strength: "2,200 psi", use: "Paths, mowing strips, non-structural slabs" } },
              { feature: "Structural minimum", values: { ratio: "1:1.5:3", grade: "M20", strength: "2,900 psi", use: "RCC slabs, footings, driveways" } },
              { feature: "Rich structural", values: { ratio: "1:1:2", grade: "M25", strength: "3,600 psi", use: "Columns, beams, exposed work" } },
            ]}
          />
          <SuccessBlock title="One rule covers most decisions">
            Anything containing rebar gets M20 (1:1.5:3) or better. That&apos;s the IS 456
            floor for reinforced work, and it maps closely to the 3,000 psi minimum US codes
            expect for exterior flatwork.
          </SuccessBlock>
        </Section>

        <Section title="What does a 1:2:4 mix ratio mean?">
          <p className="text-muted-foreground">
            A 1:2:4 mix means 1 part cement, 2 parts sand and 4 parts coarse aggregate, measured
            by volume in that order. One bucket of cement, two of sand, four of 20 mm stone.
            The sand fills voids between stones; the cement paste coats everything and glues
            it. Roughly speaking, the finished concrete volume is about two-thirds of the
            summed loose ingredient volumes, because sand and paste disappear into the voids.
            That is why batch tables, not intuition, size the ingredient piles.
          </p>
          <DonutChart
            title="1:2:4 mix by loose volume"
            centerValue="1:2:4"
            centerLabel="C : S : A"
            data={[
              { label: "Cement", value: 1 },
              { label: "Sand", value: 2 },
              { label: "20 mm aggregate", value: 4 },
            ]}
          />
        </Section>

        <Section title="Water-cement ratio: the strength dial">
          <p className="text-muted-foreground">
            Water, not cement, decides the final strength of a given mix: keep the
            water-cement ratio between 0.45 and 0.55 for site work.
          </p>
          <FormulaBlock
            formula="w/c = weight of water ÷ weight of cement"
            note="Target 0.45–0.55 for site work. Every 0.05 increase costs roughly 400–700 psi of 28-day strength (Abrams' law in practice)."
          />
          <WarningBlock title="Water is where site mixes fail">
            Crews add water because wet concrete places easily, but every extra liter
            permanently dilutes the paste. A 1:1.5:3 mix at w/c 0.7 tests weaker than a 1:2:4
            at 0.5. Fix workability with grading and admixtures, or accept a stiffer mix and
            better compaction, but hold the water line. Strength gain over time is covered in
            the{" "}
            <a href={CONCRETE.curing} className="font-medium text-primary hover:underline">
              curing guide
            </a>
            .
          </WarningBlock>
        </Section>

        <Section title="Batching quantities per cubic meter">
          <p className="text-muted-foreground">
            One cubic meter of 1:2:4 concrete takes about 6.3 bags of 50 kg cement, 0.44 m³ of
            sand and 0.88 m³ of aggregate. Richer mixes need more cement per cubic meter.
          </p>
          <CoverageTable
            headers={["Mix", "Cement (50 kg bags)", "Sand / aggregate"]}
            rows={[
              { label: "1:3:6 (M10)", spec: "4.4 bags", coverage: "0.47 m³ / 0.94 m³" },
              { label: "1:2:4 (M15)", spec: "6.3 bags", coverage: "0.44 m³ / 0.88 m³" },
              { label: "1:1.5:3 (M20)", spec: "8.0 bags", coverage: "0.42 m³ / 0.84 m³" },
              { label: "1:1:2 (M25)", spec: "11.0 bags", coverage: "0.385 m³ / 0.77 m³" },
            ]}
            caption="Per m³ of compacted concrete, standard 1.52–1.54 dry-volume factor. Multiply by your pour volume from the calculator."
          />
        </Section>

        <Section title="Worked example: batching 1:2:4 by bag">
          <ExampleBlock
            scenario="A 0.75 m³ garden-shed base, site-batched at 1:2:4 with 50 kg cement bags."
            steps={[
              { label: "Cement", work: "6.3 bags/m³ × 0.75 = 4.7 → 5 bags" },
              { label: "Sand", work: "0.44 × 0.75 = 0.33 m³ (≈ 530 kg)" },
              { label: "Aggregate", work: "0.88 × 0.75 = 0.66 m³ (≈ 1,020 kg)" },
              { label: "Water at w/c 0.5", work: "5 × 50 × 0.5 = 125 L (less sand moisture)" },
            ]}
            result="5 bags cement, ⅓ m³ sand, ⅔ m³ stone, ~120 L water. That's a solid half-day for two with a drum mixer."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Get the volume before the ratio"
          description="Batch tables key off cubic meters, so measure the pour first."
          href={CONCRETE.calculator}
          buttonLabel="Concrete Calculator"
        />

        <RelatedArticles
          title="Continue the series"
          variant="cards"
          items={[
            ...pickLinks(guideLinks, CONCRETE.curing, CONCRETE.density),
            ...pickLinks(calculatorLinks, CONCRETE.slab),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

        <References items={[REFS.is456, REFS.is10262, REFS.astmC150, REFS.pca]} />
      </ArticleShell>
    </>
  );
}
