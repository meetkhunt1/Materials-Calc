import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
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
import {
  ASPHALT,
  asphaltCalculatorLinks,
  coreGuideLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import { CONCRETE } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Coverage Guide — What One Ton Covers";
const description =
  "Coverage tables for asphalt: one ton covers 80 ft² at 2 in, 53 ft² at 3 in, 40 ft² at 4 in. Per-ton and per-truckload coverage at every common thickness, with the formula behind the numbers.";
const path = ASPHALT.coverage;
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
    question: "How much area does 1 ton of asphalt cover?",
    answer:
      "At 2 inches compacted — the most common overlay thickness — one ton covers about 80 square feet. At 1 inch it stretches to 160 ft²; at 3 inches (standard driveway surface) it drops to 53 ft²; at 4 inches, 40 ft². Coverage is inversely proportional to thickness, so the arithmetic scales cleanly.",
  },
  {
    question: "How many tons of asphalt do I need for 1,000 square feet?",
    answer:
      "Divide area by coverage: at 2 in, 1,000 ÷ 80 = 12.5 tons; at 3 in, 1,000 ÷ 53 = 18.9 tons; at 4 in, 1,000 ÷ 40 = 25 tons. Add 5–10% waste and round to the plant's half-ton increment. A calculator saves the division but not the thickness decision.",
  },
  {
    question: "How much does one truckload of asphalt cover?",
    answer:
      "A tandem dump truck legally hauls about 14 tons, which covers roughly 1,120 ft² at 2 in or 745 ft² at 3 in. A typical 600 ft² residential driveway at 3 in therefore fits in a single tandem load with a modest margin — one reason plants quote small jobs around whole trucks.",
  },
  {
    question: "Does the coverage number include compaction?",
    answer:
      "Yes. These tables are stated per compacted inch using 145 lb/ft³ in-place density. The mat is laid roughly 25% thicker loose and rolled down; the tonnage does not change during rolling, so coverage quoted at finished thickness is the number that matters for ordering.",
  },
  {
    question: "Why does my contractor's coverage figure differ slightly?",
    answer:
      "Rules of thumb round differently. The raw math at 2 in gives 82.8 ft² per ton; quoting 80 builds in a small yield allowance for subgrade irregularity and edge handwork. Some crews use the 110 lb per yd² per inch rule instead, which lands within a few percent. Differences beyond ~10% mean someone is using loose density by mistake.",
  },
  {
    question: "Does coverage change for cold mix or millings?",
    answer:
      "Yes, because density does. Cold patch compacts to about 2,200 kg/m³ (5% lighter than hot mix), so a ton stretches about 5% further. Loose millings at 1,650 kg/m³ cover roughly 40% more area per ton than hot mix at the same depth — before compaction tightens them up.",
  },
];

const toc = tocFromTitles(
  "Coverage per ton",
  "Coverage per truckload",
  "The coverage formula",
  "Worked example: sizing an order from coverage",
);

export default function AsphaltCoverageGuidePage() {
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
              eyebrow="Asphalt · Coverage Guide"
              variant="standard"
              title="What one ton of asphalt covers"
              description="Coverage is the bridge between the plant's unit (tons) and yours (square feet). One number to memorize — 80 ft² per ton at 2 inches — and two tables for everything else."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Coverage Guide", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Size your order"
            variant="inline-strip"
            items={pickLinks(asphaltCalculatorLinks, ASPHALT.calculator, ASPHALT.driveway)}
          />
        }
      >
        <Section title="Coverage per ton">
          <CoverageTable
            headers={["Compacted thickness", "Typical use", "Coverage per ton"]}
            rows={[
              { label: "1 in", spec: "Thin overlay, leveling course", coverage: "160 ft²" },
              { label: "1.5 in", spec: "Surface course over binder", coverage: "107 ft²" },
              { label: "2 in", spec: "Overlays, paths", coverage: "80 ft²", note: "The benchmark figure" },
              { label: "3 in", spec: "Residential driveways (over 6 in base)", coverage: "53 ft²" },
              { label: "4 in", spec: "Parking lots, heavier drives", coverage: "40 ft²" },
              { label: "6 in", spec: "Streets, full-depth structure", coverage: "27 ft²" },
            ]}
            caption="Compacted hot mix at 145 lb/ft³, with a small practical allowance built in. Halve the thickness, double the coverage."
          />
          <p className="text-muted-foreground">
            Concrete coverage works the same way but is quoted per cubic yard instead of per
            ton — the{" "}
            <a href={CONCRETE.coverage} className="font-medium text-primary hover:underline">
              concrete coverage guide
            </a>{" "}
            has those tables if you are comparing pavements.
          </p>
        </Section>

        <Section title="Coverage per truckload">
          <CoverageTable
            headers={["Compacted thickness", "Tandem load (14 tons)", "What that means"]}
            rows={[
              { label: "1 in", spec: "2,240 ft²", coverage: "A tennis court, twice" },
              { label: "1.5 in", spec: "1,500 ft²", coverage: "Large 3-car driveway overlay" },
              { label: "2 in", spec: "1,120 ft²", coverage: "Two average driveways" },
              { label: "3 in", spec: "745 ft²", coverage: "One 12 × 60 ft driveway, with margin" },
              { label: "4 in", spec: "560 ft²", coverage: "Small commercial apron" },
              { label: "6 in", spec: "378 ft²", coverage: "A truck-yard patch" },
            ]}
            caption="Based on a 14-ton legal tandem payload. Tri-axles haul 16–18 tons; small single-axles 6–8. Ask the plant what they dispatch."
          />
          <TipBlock title="Order in truck-sized bites">
            Plants charge minimum-load fees, and a paving crew hates waiting on a second
            half-empty truck. If your takeoff lands at 15 tons, look hard at whether the job
            tolerates 14 (one tandem) or genuinely needs 16 (order the tri-axle). Coverage
            math is how you negotiate that conversation with real numbers.
          </TipBlock>
        </Section>

        <Section title="The coverage formula">
          <FormulaBlock
            formula="Coverage (ft²/ton) = 2,000 ÷ (145 × t ÷ 12)"
            variables={[
              { symbol: "2,000", meaning: "pounds per US ton" },
              { symbol: "145", meaning: "compacted HMA density", unit: "lb/ft³" },
              { symbol: "t", meaning: "compacted thickness", unit: "inches" },
            ]}
            note="At t = 2: 2,000 ÷ 24.2 = 82.8 ft², quoted as 80 with allowance. The table values round the same way."
          />
        </Section>

        <Section title="Worked example: sizing an order from coverage">
          <ExampleBlock
            scenario="A 24 × 36 ft parking pad, 4 in compacted hot mix over an existing sound base."
            steps={[
              { label: "Area", work: "24 × 36 = 864 ft²" },
              { label: "Coverage at 4 in", work: "40 ft² per ton" },
              { label: "Tonnage", work: "864 ÷ 40 = 21.6 tons" },
              { label: "Waste at 5%", work: "21.6 × 1.05 = 22.7 tons" },
            ]}
            result="Order 23 tons — a tri-axle (17 t) plus a small second load, or two tandems with a little left for the approach."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Get your exact tonnage"
          description="The calculator runs the coverage math for any area, thickness and waste factor."
          href={ASPHALT.calculator}
          buttonLabel="Open the Asphalt Calculator"
        />

        <RelatedArticles
          title="Keep reading"
          variant="list"
          items={pickLinks(coreGuideLinks, ASPHALT.howTo, ASPHALT.densityChart, ASPHALT.thickness)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4, AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
