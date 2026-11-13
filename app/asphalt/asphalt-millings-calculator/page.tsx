import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { MillingsCalculatorCard } from "@/content/asphalt/calculators/cards";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
import { QuickSizeTable } from "@/components/tables/quick-size-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { pick, CALCULATOR_LAYOUTS, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { ASPHALT, asphaltCalculatorLinks, weightGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import { GRAVEL } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "asphalt-millings-calculator";
const title = "Asphalt Millings Calculator: Tons and Yards";
const description =
  "Asphalt millings weigh about 1.39 tons per loose cubic yard and compact to 122 lb/ft³. Enter length, width and compacted depth to get tons and yards to order.";
const path = ASPHALT.millings;
const author = getAuthor("materials-team");
const published = "2026-11-13";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: published,
  modifiedTime: published,
});

const faqItems: FaqItem[] = [
  {
    question: "How many tons of millings do I need for a driveway?",
    answer:
      "About 2 tons per 100 ft² at 4 inches compacted. A 12 × 50 ft driveway at 4 inches needs 12.2 tons before waste, or about 13.4 tons with 10%, which is one tandem dump truck load.",
  },
  {
    question: "How much does a cubic yard of asphalt millings weigh?",
    answer:
      "About 2,780 lb (1.39 tons) loose, as delivered off the pile, and about 3,290 lb (1.65 tons) once rolled in place. The loose figure is the one to use when a supplier sells millings by the yard.",
  },
  {
    question: "How much do millings compact?",
    answer:
      "Roughly 16%. Loose millings run about 103 lb/ft³ and rolled millings about 122 lb/ft³, so one loose yard compacts to about 0.84 yd³. Spread about 4.75 inches loose to finish at 4 inches after rolling.",
  },
  {
    question: "How deep should asphalt millings be?",
    answer:
      "3 to 4 inches compacted for a residential driveway over a firm, well-drained base, and 6 inches on soft clay or for farm lanes that carry heavy equipment. Place deep lifts in two passes and roll each one.",
  },
  {
    question: "Are millings the same as crushed asphalt?",
    answer:
      "Yes for estimating purposes. Millings are ground off an existing road by a milling machine; crushed asphalt is broken slab run through a crusher. Both are recycled asphalt pavement (RAP), and both use the same loose and compacted densities in this calculator.",
  },
  {
    question: "Do millings need a gravel base?",
    answer:
      "On sandy, well-drained soil they can go straight onto compacted subgrade. On clay or wet ground, put 4 to 6 inches of compacted crushed stone underneath first or the millings will rut. The driveway gravel calculator sizes that base layer.",
  },
];

const toc = tocFromTitles(
  "Millings by area and depth",
  "Loose vs compacted millings",
  "Worked example: a 12 × 50 ft driveway",
);

export default function MillingsCalculatorPage() {
  const layout = pick(slug, CALCULATOR_LAYOUTS);
  const heroVariant = pick(slug, HERO_VARIANTS);
  const relatedStyle = pick(slug, RELATED_STYLES);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: published, dateModified: published }),
          calculatorSchema({
            name: "Asphalt Millings Calculator",
            description,
            path,
            features: [
              "Tons and loose cubic yards from compacted depth",
              "Imperial and metric inputs",
              "Waste allowance and truck load count",
              "Optional material cost",
            ],
          }),
        ]}
      />
      <CalculatorPageShell
        variant={layout}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Millings"
              variant={heroVariant}
              title="Asphalt Millings Calculator"
              description="Recycled asphalt is sold loose but specified compacted, and the two differ by about 16%. Enter the finished depth; get the tons and loose yards to order."
              stats={[
                { value: "1.39 t", label: "per loose yd³" },
                { value: "122 lb/ft³", label: "compacted" },
                { value: "2 t", label: "per 100 ft² at 4 in" },
                { value: "16%", label: "shrink when rolled" },
              ]}
            >
              <AuthorBox author={author} datePublished={published} dateModified={published} variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Millings Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        preCalculator={
          <FormulaBlock
            formula="Tons = L × W × compacted depth × 122 lb/ft³ ÷ 2,000 × (1 + waste)"
            variables={[{ symbol: "122", meaning: "rolled millings density", unit: "lb/ft³" }]}
            note="Loose yards to order = tons × 2,000 ÷ 103 ÷ 27."
          />
        }
        calculator={<MillingsCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <QuickAnswer
          question="How many tons of asphalt millings do I need?"
          answer="Multiply length × width × compacted depth in feet, then by 122 lb/ft³ (rolled millings), and divide by 2,000 for tons. A 12 × 50 ft driveway at 4 inches compacted needs 12.2 tons, or about 13.4 tons with 10% waste, which is roughly 9.7 loose cubic yards."
          ruleOfThumb="About 2 tons of millings per 100 ft² at 4 inches compacted."
          formula="Tons = Area × depth × 122 ÷ 2,000 × (1 + waste)"
        />

        <Section title="Millings by area and depth">
          <QuickSizeTable
            headers={["Compacted depth", "Tons per 100 ft²", "Loose yd³ per 100 ft²"]}
            rows={[
              ["2 in", "1.02", "0.73"],
              ["3 in", "1.52", "1.10"],
              ["4 in", "2.03", "1.46"],
              ["6 in", "3.05", "2.19"],
            ]}
            caption="No waste included. Uses 122 lb/ft³ compacted and 103 lb/ft³ loose. Scale linearly: a 600 ft² driveway at 4 in needs 6 × 2.03 = 12.2 tons."
          />
        </Section>

        <Section
          title="Loose vs compacted millings"
          lead="Weight stays the same when millings are rolled; volume shrinks."
        >
          <p className="text-muted-foreground">
            A loose cubic yard of millings off the stockpile weighs about 2,780 lb. Rolled
            in place, the same material packs to about 3,290 lb per yard. That is why this
            calculator works from the compacted depth you want and converts back to loose yards
            only for ordering. Densities for every asphalt state, including hot mix and cold
            patch, are in the{" "}
            <a href={ASPHALT.densityChart} className="font-medium text-primary hover:underline">
              asphalt density chart
            </a>
            .
          </p>
          <WarningBlock title="Buying by the yard? Ask which yard">
            A supplier quoting &quot;10 yards&quot; almost always means loose yards. If you
            calculated 10 compacted yards and order 10 loose, you arrive about 16% short. Order
            in tons when you can; a scale ticket removes the ambiguity.
          </WarningBlock>
        </Section>

        <Section title="Worked example: a 12 × 50 ft driveway">
          <ExampleBlock
            scenario="A 12 × 50 ft gravel driveway topped with 4 inches of compacted millings, 10% waste."
            steps={[
              { label: "Compacted volume", work: "12 × 50 × (4 ÷ 12) = 200 ft³" },
              { label: "Weight", work: "200 × 122 = 24,400 lb = 12.2 tons" },
              { label: "Add 10% waste", work: "12.2 × 1.10 = 13.4 tons" },
              { label: "Loose yards to order", work: "13.4 × 2,000 ÷ 103 ÷ 27 = 9.7 yd³" },
            ]}
            result="Order 13.5 tons (about 10 loose yards): one tandem dump truck load."
          />
          <InfoBlock title="Base first on soft ground">
            Millings bind slightly as the old binder warms and re-sets, but they cannot bridge
            soft clay. On poorly drained soil, place 4 to 6 inches of compacted crushed stone
            first; size it with the{" "}
            <a href={GRAVEL.driveway} className="font-medium text-primary hover:underline">
              driveway gravel calculator
            </a>
            .
          </InfoBlock>
        </Section>

        <Faq items={faqItems} variant="list" title="Millings questions" />

        <RelatedArticles
          title="More asphalt calculators"
          variant={relatedStyle}
          items={pickLinks(asphaltCalculatorLinks, ASPHALT.calculator, ASPHALT.weight, ASPHALT.driveway)}
        />

        <RelatedArticles title="Asphalt weight references" variant="cards" items={weightGuideLinks.slice(0, 3)} />

        <AuthorBox author={author} datePublished={published} dateModified={published} />

        <References items={[AREFS.ms4, AREFS.napa, AREFS.fhwa]} />
      </CalculatorPageShell>
    </>
  );
}
