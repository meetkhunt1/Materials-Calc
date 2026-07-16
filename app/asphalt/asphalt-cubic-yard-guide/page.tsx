import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
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
import { ASPHALT, volumeGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import { CONCRETE } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Cubic Yard Guide — The Estimator's Unit";
const description =
  "What one cubic yard of asphalt weighs, covers and costs to move: 27 ft³, 3,915 lb compacted, 1.96 tons, 81 ft² at 4 inches. With project tables and the yard formula.";
const path = ASPHALT.cubicYardGuide;
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
      "3,915 lb compacted — call it 1.96 US tons. That comes straight from the standard compacted hot-mix density of 145 lb/ft³ times 27 ft³ per yard. Loose in the truck it runs about 117 lb/ft³, or roughly 3,160 lb per yard, which is why a load looks bigger than it lays.",
  },
  {
    question: "How many square feet does a cubic yard of asphalt cover?",
    answer:
      "81 ft² at 4 inches compacted, 108 ft² at 3 inches, 162 ft² at 2 inches. The shortcut is 324 divided by thickness in inches. These are geometric figures — apply your 5–10% waste factor on top before ordering.",
  },
  {
    question: "How many cubic yards do I need for a driveway?",
    answer:
      "A single-car driveway of about 480 ft² takes 4.4 yd³ at 3 inches; a 720 ft² double runs 6.7 yd³. Measure your actual footprint, multiply by depth in feet, divide by 27, then add waste — the volume calculator does all four steps at once.",
  },
  {
    question: "Why do asphalt plants quote tons instead of cubic yards?",
    answer:
      "Plants batch and weigh material over a truck scale, so weight is the unit they can certify. You estimate in yards because drawings give you area and depth. The bridge between the two is density: multiply yards by 1.96 to talk to the plant in tons.",
  },
  {
    question: "Is an asphalt yard the same as a concrete yard?",
    answer:
      "Geometrically, yes — 27 ft³ is 27 ft³, and both cover 81 ft² at 4 inches. The difference is weight and ordering: concrete arrives ready-mixed by the yard at about 4,050 lb, while asphalt sells by the ton at 3,915 lb per compacted yard. Same box, different bookkeeping.",
  },
  {
    question: "Should I round my order up or down?",
    answer:
      "Up, always. Running short mid-pave means a cold joint and a second delivery fee that dwarfs the cost of a quarter yard of extra mix. Standard practice is to add 5–10% for waste and grade variation, then round to the plant's minimum increment.",
  },
];

const toc = tocFromTitles(
  "Cubic yard quick facts",
  "Yards needed for common projects",
  "The yard formula",
  "Worked example: a parking pad order",
);

export default function AsphaltCubicYardGuidePage() {
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
              eyebrow="Asphalt · Volume Guide"
              variant="standard"
              title="Asphalt cubic yard guide"
              description="The cubic yard is the estimator's unit: drawings give you area and depth, and 27 cubic feet is the box you pour them into. Here is everything one yard of hot mix is, weighs and covers."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Cubic Yard Guide", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Volume in one pass"
            description="Enter length, width and depth — get cubic yards, feet and meters together."
            href={ASPHALT.volume}
            buttonLabel="Asphalt Volume Calculator"
          />
        }
      >
        <Section title="Cubic yard quick facts">
          <p className="text-muted-foreground">
            One cubic yard is a 3 × 3 × 3 ft cube — 27 ft³, or 0.765 m³. Filled with
            compacted hot-mix asphalt at 145 lb/ft³, that cube weighs 3,915 lb. Every other
            number on this page derives from those two constants.
          </p>
          <CoverageTable
            headers={["Measure", "Value", "Note"]}
            rows={[
              { label: "Volume", spec: "27 ft³", coverage: "3 × 3 × 3 ft", note: "The ÷27 in every US takeoff" },
              { label: "Metric volume", spec: "0.765 m³", coverage: "1 m³ = 1.31 yd³" },
              { label: "Weight, compacted", spec: "3,915 lb", coverage: "1.96 US tons", note: "At 145 lb/ft³" },
              { label: "Weight, loose", spec: "≈ 3,160 lb", coverage: "≈ 1.58 tons", note: "At ≈ 117 lb/ft³ in the truck" },
              { label: "Coverage at 4 in", spec: "81 ft²", coverage: "A 9 × 9 ft square" },
              { label: "Coverage at 2 in", spec: "162 ft²", coverage: "Overlay thickness" },
            ]}
            caption="One compacted cubic yard of hot-mix asphalt. Coverage = 324 ÷ thickness (in)."
          />
          <p className="text-muted-foreground">
            If you have poured concrete before, the geometry transfers directly — a concrete
            yard covers the same 81 ft² at 4 inches, as the{" "}
            <a href={CONCRETE.coverage} className="font-medium text-primary hover:underline">
              concrete coverage guide
            </a>{" "}
            shows. Only the density and the order unit change.
          </p>
        </Section>

        <Section title="Yards needed for common projects">
          <CoverageTable
            headers={["Project", "Area × depth", "Cubic yards"]}
            rows={[
              { label: "Single-car driveway", spec: "480 ft² @ 3 in", coverage: "4.4 yd³", note: "≈ 8.7 tons" },
              { label: "Double-car driveway", spec: "720 ft² @ 3 in", coverage: "6.7 yd³", note: "≈ 13.1 tons" },
              { label: "Parking space", spec: "162 ft² @ 4 in", coverage: "2.0 yd³", note: "≈ 3.9 tons" },
              { label: "Garden pathway", spec: "240 ft² @ 2 in", coverage: "1.5 yd³", note: "≈ 2.9 tons" },
            ]}
            caption="Geometric quantities before waste. Ton figures use 1 yd³ = 1.96 tons compacted."
          />
        </Section>

        <Section title="The yard formula">
          <FormulaBlock
            formula="yd³ = ft² × (in ÷ 12) ÷ 27"
            variables={[
              { symbol: "ft²", meaning: "plan area in square feet" },
              { symbol: "in ÷ 12", meaning: "compacted depth converted to feet (4 in = 0.333 ft)" },
              { symbol: "÷ 27", meaning: "cubic feet to cubic yards" },
            ]}
            note="Depth is compacted depth. If you are checking loose material in a truck, expect about 24% more volume for the same weight."
          />
        </Section>

        <Section title="Worked example: a parking pad order">
          <ExampleBlock
            scenario="A 22 × 25 ft equipment parking pad paved 4 in thick. How many cubic yards — and what does the plant hear?"
            steps={[
              { label: "Area", work: "22 × 25 = 550 ft²" },
              { label: "Volume in cubic feet", work: "550 × 0.333 = 183.3 ft³" },
              { label: "Convert to yards", work: "183.3 ÷ 27 = 6.8 yd³" },
              { label: "Add 5% waste", work: "6.8 × 1.05 = 7.1 yd³" },
              { label: "Translate for the plant", work: "7.1 × 1.96 = 13.9 tons" },
            ]}
            result="Order 14 tons — that is 7.1 yd³ of compacted mix on the ground."
          />
        </Section>

        <Faq items={faqItems} variant="list" />

        <RelatedArticles
          title="Keep going in the volume series"
          variant="inline-strip"
          items={pickLinks(volumeGuideLinks, ASPHALT.cubicFootGuide, ASPHALT.volumeFormula, ASPHALT.unitConversion)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
