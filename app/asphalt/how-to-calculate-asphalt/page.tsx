import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { QuickAnswer } from "@/components/blocks/quick-answer";
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
import { articleSchema, howToSchema } from "@/lib/jsonld";
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

const title = "How to Calculate Tons of Asphalt: Formula";
const description =
  "Tons of asphalt = ft² × (inches ÷ 12) × 145 ÷ 2,000, plus 5–10% waste: a 600 ft² drive at 3 in needs about 11.4 tons. Step-by-step US and metric examples.";
const path = ASPHALT.howTo;
const author = getAuthor("materials-team");
const modified = "2026-10-24";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
  modifiedTime: modified,
});

const steps = [
  {
    name: "Measure the area",
    text: "Measure length and width in feet and multiply for square feet. Split L-shapes and flares at driveways into rectangles and sum them. Measure at the widest points, because pavers cannot lay a taper narrower than the screed.",
  },
  {
    name: "Convert thickness to feet",
    text: "Divide compacted thickness in inches by 12. A 3 in lift is 0.25 ft, not 0.3. Thickness means after rolling; the calculation uses compacted numbers throughout.",
  },
  {
    name: "Compute the volume",
    text: "Multiply area by thickness in feet to get cubic feet of compacted asphalt. For metric work, square meters times thickness in meters gives cubic meters directly.",
  },
  {
    name: "Apply the 145 lb/ft³ density",
    text: "Multiply cubic feet by 145 lb/ft³ (2,322 kg/m³), the estimating standard for compacted hot mix, then divide by 2,000 to convert pounds to US tons.",
  },
  {
    name: "Add a waste allowance",
    text: "Multiply by 1.05–1.10. Waste covers yield variation in the subgrade, handwork at edges, and material left in the truck. Plants sell in half-ton increments, so round up.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What is the formula for calculating asphalt tonnage?",
    answer:
      "The formula is tons = square feet × (thickness in inches ÷ 12) × 145 ÷ 2,000, times a 5–10% waste factor. The 145 is compacted hot mix density in lb/ft³. For a 600 ft² driveway at 3 in: 600 × 0.25 × 145 ÷ 2,000 = 10.9 tons before waste.",
  },
  {
    question: "How many square feet does a ton of asphalt cover?",
    answer:
      "A ton of asphalt covers about 80 ft² at 2 in compacted thickness, 160 ft² at 1 in, 53 ft² at 3 in and 40 ft² at 4 in. Coverage scales inversely with thickness, so halving the lift doubles the coverage. These figures already carry a small practical allowance over the raw density math.",
  },
  {
    question: "What is the 110 rule for asphalt?",
    answer:
      "The 110 rule says hot mix weighs about 110 lb per square yard per inch of compacted thickness. It is the same 145 lb/ft³ density restated in paver units: 9 ft² × (1/12 ft) × 145 ≈ 109 lb. Convert your area to square yards, multiply by inches, multiply by 110, divide by 2,000 for tons.",
  },
  {
    question: "Do I calculate with loose or compacted thickness?",
    answer:
      "Always calculate with compacted thickness. Loose mix runs about 117 lb/ft³ and fluffs roughly 25% taller in the mat before rolling, but tonnage is bought by weight, and weight does not change under the roller. Order from the finished compacted dimensions; the paver operator handles the roll-down factor when setting screed height.",
  },
  {
    question: "How much waste should I add to an asphalt order?",
    answer:
      "Add 5% for a well-graded, machine-laid rectangle and 10% for hand work, irregular shapes, or a subgrade that was fine-graded loosely. Running short mid-pour is expensive: a second truck means a second minimum-load fee and a cold joint where the two loads meet.",
  },
  {
    question: "How do I calculate asphalt in metric tonnes?",
    answer:
      "Multiply square meters × thickness in meters × 2.322 t/m³, then add waste. A 60 m² parking pad at 75 mm needs 60 × 0.075 × 2.322 = 10.5 t, or about 11 t ordered. No unit conversion gymnastics, which is why metric takeoffs have fewer errors.",
  },
];

const toc = tocFromTitles(
  "How do you calculate tons of asphalt?",
  "Key conversions",
  "Worked example: residential driveway",
  "Worked example: metric takeoff in tonnes",
);

export default function HowToCalculateAsphaltPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title,
            description,
            path,
            category: "Asphalt",
            datePublished: "2026-07-15",
            dateModified: modified,
            author,
          }),
          howToSchema({
            name: "How to Calculate Asphalt",
            description:
              "Five-step method for converting paving dimensions into an asphalt order in tons.",
            path,
            steps,
            totalTime: "PT10M",
            tools: ["Measuring wheel", "Depth probe", "Calculator"],
            supplies: ["Hot mix asphalt (HMA)", "Crushed stone base", "Tack coat"],
            deepLinkSteps: true,
          }),
        ]}
      />
      <ArticleShell
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Method Guide"
              variant="centered"
              title="How to calculate asphalt"
              description="Asphalt is sold by the ton but designed by the square foot. These five steps bridge the two with the same math a plant dispatcher runs when you call in dimensions."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "How to Calculate Asphalt", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Skip the hand math"
            description="The calculator runs this exact method with the density and unit conversions built in."
            href={ASPHALT.calculator}
            buttonLabel="Asphalt Calculator"
          />
        }
      >
        <QuickAnswer
          question="How do you calculate tons of asphalt?"
          answer="To calculate tons of asphalt, multiply the area in square feet by the compacted thickness in feet, multiply by 145 lb/ft³, divide by 2,000, and add 5–10% waste. A 600 ft² driveway at 3 inches compacted needs 600 × 0.25 × 145 ÷ 2,000 = 10.9 tons, or about 11.4 tons with 5% waste."
          ruleOfThumb="110 lb per square yard per inch of thickness."
          formula="Tons = ft² × (in ÷ 12) × 145 ÷ 2,000 × (1 + waste)"
        />

        <Section title="How do you calculate tons of asphalt?">
          <p className="text-muted-foreground">
            Calculate tons of asphalt in five steps: area, thickness in feet, volume,
            density, then waste.
          </p>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li id={`step-${index + 1}`} key={step.name} className="flex gap-4 rounded-xl border p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold">{step.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <FormulaBlock
            formula="Tons = ft² × (in ÷ 12) × 145 ÷ 2,000 × (1 + waste)"
            variables={[
              { symbol: "ft²", meaning: "paved area", unit: "square feet" },
              { symbol: "in", meaning: "compacted thickness", unit: "inches" },
              { symbol: "145", meaning: "compacted HMA density", unit: "lb/ft³" },
              { symbol: "waste", meaning: "allowance, 0.05–0.10" },
            ]}
            note="Metric: m² × m × 2.322 = tonnes. Compacted density is 2,322 kg/m³ either way."
          />
          <p className="text-muted-foreground">
            The structure mirrors a concrete takeoff; the only differences are the density
            step and selling unit. If you know the{" "}
            <a href={CONCRETE.howTo} className="font-medium text-primary hover:underline">
              concrete calculation method
            </a>
            , swap &quot;divide by 27 for yards&quot; for &quot;multiply by 145 and divide by
            2,000 for tons&quot; and you already know this one.
          </p>
        </Section>

        <Section title="Key conversions">
          <CoverageTable
            headers={["Quantity", "Equals", "Where it comes from"]}
            rows={[
              { label: "1 compacted yd³", spec: "1.96 US tons", coverage: "145 lb/ft³ × 27 ÷ 2,000" },
              { label: "1 compacted m³", spec: "2.32 tonnes", coverage: "2,322 kg/m³" },
              { label: "1 ton at 2 in", spec: "80 ft²", coverage: "2,000 ÷ (145 × 2 ÷ 12)", note: "160 ft² at 1 in, 53 at 3 in, 40 at 4 in" },
              { label: "1 yd² at 1 in", spec: "110 lb", coverage: "The paver's 110 rule" },
              { label: "Loose mix in truck", spec: "≈ 117 lb/ft³", coverage: "~25% fluff before rolling", note: "Never use for tonnage; weight is weight" },
            ]}
            caption="The conversions that cover nearly every asphalt takeoff. Anything else derives from the 145 lb/ft³ density."
          />
          <TipBlock title="Sanity-check every takeoff with the 110 rule">
            Area in square yards × inches × 110 lb should land within a few percent of the
            formula result. If it does not, you have a unit error, almost always inches
            multiplied as feet. Two independent routes to the same tonnage is the cheapest
            QC there is.
          </TipBlock>
        </Section>

        <Section title="Worked example: residential driveway">
          <ExampleBlock
            scenario="A 12 × 50 ft driveway paved at the standard residential section: 3 in of compacted hot mix over 6 in of aggregate base (base ordered separately)."
            steps={[
              { label: "Area", work: "12 × 50 = 600 ft²" },
              { label: "Thickness in feet", work: "3 ÷ 12 = 0.25 ft" },
              { label: "Compacted volume", work: "600 × 0.25 = 150 ft³" },
              { label: "Weight", work: "150 × 145 = 21,750 lb ÷ 2,000 = 10.9 tons" },
              { label: "Waste at 5%", work: "10.9 × 1.05 = 11.4 tons" },
            ]}
            result="Order 11.5 tons. Cross-check: 600 ft² ÷ 53 ft² per ton at 3 in = 11.3 tons. Both routes agree."
          />
        </Section>

        <Section title="Worked example: metric takeoff in tonnes">
          <ExampleBlock
            scenario="A 60 m² parking pad paved 75 mm thick, plant sells by the tonne."
            steps={[
              { label: "Thickness in meters", work: "75 mm = 0.075 m" },
              { label: "Compacted volume", work: "60 × 0.075 = 4.5 m³" },
              { label: "Weight at 2,322 kg/m³", work: "4.5 × 2,322 = 10,449 kg = 10.45 t" },
              { label: "Waste at 5%", work: "10.45 × 1.05 = 10.97 t" },
            ]}
            result="Order 11 tonnes. One density constant, zero unit conversions: the metric path is shorter for a reason."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Now run your numbers"
          description="Enter dimensions and thickness, and the calculator applies the 145 lb/ft³ density and waste factor for you."
          href={ASPHALT.calculator}
          buttonLabel="Open the Asphalt Calculator"
        />

        <RelatedArticles
          title="Calculators that run this method"
          variant="inline-strip"
          items={pickLinks(asphaltCalculatorLinks, ASPHALT.calculator, ASPHALT.volume, ASPHALT.weight)}
        />

        <RelatedArticles
          title="Go deeper"
          variant="list"
          items={pickLinks(coreGuideLinks, ASPHALT.coverage, ASPHALT.densityChart, ASPHALT.costGuide)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified={modified} />

        <References items={[AREFS.ms4, AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
