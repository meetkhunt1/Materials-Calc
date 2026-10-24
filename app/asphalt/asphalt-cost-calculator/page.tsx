import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { CostCalculatorCard } from "@/content/asphalt/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock, TipBlock } from "@/components/blocks/callout";
import { CostTable } from "@/components/tables/cost-table";
import { QuickSizeTable } from "@/components/tables/quick-size-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, costGuideLinks, asphaltCalculatorLinks, pickLinks } from "@/content/asphalt/links";
import {
  BAND_UNDER_500,
  BAND_500_1000,
  bandRangeShort,
  bandRangePerSqFt,
} from "@/data/pricing";
import { CONCRETE, guideLinks as concreteGuides, pickLinks as pickConcrete } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Cost Calculator: Material and Installed";
const description =
  "At $115/ton hot mix and $2.50/ft² labor, a 3 in asphalt surface costs about $4.79/ft² before base work. Enter your size and local price for a cost estimate.";
const path = ASPHALT.cost;
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
    question: "What per-ton price should I enter in the calculator?",
    answer:
      `Your local plant's current quote; without one, use the US range of $100–150 per ton. US hot mix runs $100–150 per ton at the plant, with liquid-binder price swings moving it season to season. All-in installed (excavation, base, mix, labor and mobilization), a 500–1,000 ft² driveway lands at ${bandRangePerSqFt(BAND_500_1000)}, and a smaller job well above that. The price-per-ton guide tracks what moves the material half.`,
  },
  {
    question: "Why is my quote so much higher than material cost?",
    answer:
      "Because material is only 40–50% of an installed job. The rest is excavation, base gravel, trucking, a paving crew of 5–8, a paver and two rollers, and mobilization. Small jobs carry the same setup cost as big ones, which is why the cost per square foot falls sharply with size.",
  },
  {
    question: "What's a realistic minimum for any asphalt job?",
    answer:
      "About $1,500–3,000: most reputable contractors have a mobilization minimum in that range regardless of size. If your job is under about 400 ft², consider piggybacking on a neighbor's project or a contractor's nearby job; the cost saving tips guide covers how.",
  },
  {
    question: "Does thickness change the installed price much?",
    answer:
      "Less than you would expect. Material scales linearly with thickness but labor barely changes, because the crew paves 3 inches almost as fast as 2. Going from 2 to 3 inches typically adds only 15–20% to the installed price while adding 50% more structure. Thin asphalt is false economy.",
  },
  {
    question: "Does the time of year change asphalt prices?",
    answer:
      "Yes. Asphalt is cheapest mid-season (early summer, early fall), when plants run steadily but demand is off-peak, and always on jobs that let the contractor fill a slow day. Late-season paving in marginal weather discounts more but compacts worse, which is a bad trade for a driveway you'll own for 20 years.",
  },
  {
    question: "How much does a 12×40 asphalt driveway cost?",
    answer:
      "About $2,600 for the asphalt scope alone, or roughly $3,800–4,400 with excavation and 6 in of base. That assumes 3 in compacted (9.6 tons with waste) at $120 per ton and $3/ft² install labor, as in the worked example below. A standalone mobilization fee on a small job can push it higher.",
  },
];

const toc = tocFromTitles(
  "What the calculator includes",
  "2026 unit prices to plug in",
  "Worked example: installed driveway budget",
);

export default function CostCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15", dateModified: "2026-10-24" }),
          calculatorSchema({ name: "Asphalt Cost Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="split"
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Budgeting"
              variant="standard"
              title="Asphalt Cost Calculator"
              description="Enter dimensions and your local per-ton price; get tonnage, material cost and an installed estimate. Defaults reflect 2026 US averages; swap in real local quotes as you get them."
            >
              <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Cost Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<CostCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <QuickAnswer
          question="How much will my asphalt paving job cost?"
          answer={`At $115 per ton for hot mix and $2.50/ft² for paving labor, a 3-inch asphalt surface costs about $4.79 per square foot before excavation, base gravel and mobilization. With those added, an installed 500–1,000 ft² driveway runs ${bandRangePerSqFt(BAND_500_1000)}, and a job under 500 ft² runs ${bandRangePerSqFt(BAND_UNDER_500)}.`}
          ruleOfThumb={`Material and paving labor only: about $4.79/ft². All-in: ${bandRangeShort(BAND_UNDER_500)} under 500 ft², ${bandRangeShort(BAND_500_1000)} at 500–1,000 ft².`}
          formula="Total = (Tons × price per ton) + (Area × labor rate per ft²)"
        />

        <Section title="Asphalt scope cost by driveway size">
          <QuickSizeTable
            headers={["Driveway area", "Tons", "Material cost", "Labor cost", "Total (asphalt scope)"]}
            rows={[
              ["400 ft²", "7.97 tons", "$917", "$1,000", "$1,917 (≈$4.79/ft²)"],
              ["600 ft²", "11.96 tons", "$1,375", "$1,500", "$2,875 (≈$4.79/ft²)"],
              ["800 ft²", "15.95 tons", "$1,834", "$2,000", "$3,834 (≈$4.79/ft²)"],
              ["1,200 ft²", "23.92 tons", "$2,751", "$3,000", "$5,751 (≈$4.79/ft²)"],
            ]}
            caption="At the calculator's defaults: $115/ton hot mix, $2.50/ft² paving labor, 3 in compacted depth, 10% waste. Excludes excavation, base gravel and mobilization; see the worked example below for the full job budget, and swap in your local per-ton price."
          />
        </Section>

        <Section title="What the calculator includes">
          <p className="text-muted-foreground">
            The calculator prices material and paving labor, not excavation or base. It
            uses two cost layers: material (tons × your per-ton price, waste included) and an
            installed rate covering labor and equipment per square foot. It deliberately
            excludes excavation and base gravel, because those vary too much with site conditions to
            fake with a default. For a driveway-complete budget including base, pair this with
            the{" "}
            <a href={ASPHALT.driveway} className="font-medium text-primary hover:underline">
              driveway calculator
            </a>{" "}
            and the line items in the{" "}
            <a href={ASPHALT.drivewayCost} className="font-medium text-primary hover:underline">
              driveway cost guide
            </a>
            .
          </p>
          <InfoBlock title="Same method as concrete budgeting">
            The estimating logic mirrors our{" "}
            <a href={CONCRETE.cost} className="font-medium underline-offset-2 hover:underline">
              concrete cost guide
            </a>
            : quantity first, unit price second, fees last. If you&apos;re deciding between the
            two pavements, run both calculators on the same dimensions and compare like for
            like.
          </InfoBlock>
        </Section>

        <Section title="2026 unit prices to plug in">
          <p className="text-muted-foreground">
            Hot mix costs $100–150 per ton at the plant in 2026, and installation adds about
            $2–4 per square foot for labor and equipment.
          </p>
          <CostTable
            currency="USD"
            rows={[
              { item: "Hot mix asphalt (at plant)", unit: "ton", low: 100, high: 150 },
              { item: "Delivery / trucking", unit: "ton", low: 8, high: 20, note: "Distance-dependent" },
              { item: "Install: labor + equipment", unit: "ft²", low: 2, high: 4, note: "The calculator's installRate field" },
              { item: "Aggregate base, delivered", unit: "ton", low: 18, high: 35 },
              { item: "Excavation & grading", unit: "ft²", low: 1, high: 3 },
              { item: "Mobilization minimum", unit: "job", low: 1500, high: 3000 },
            ]}
            caption="US national ranges, mid-2026. Regional swings of ±40% are normal; see regional price factors."
          />
          <TipBlock title="Get the per-ton price locally">
            One phone call to the nearest plant gets you the current per-ton number, since it&apos;s
            public information. With a real local price in the calculator, your material figure
            will land within a few percent of contractor takeoffs.
          </TipBlock>
        </Section>

        <Section title="Worked example: installed driveway budget">
          <ExampleBlock
            scenario="A 12 × 40 ft driveway, 3 in compacted, local plant at $120/ton, contractor install quoted at $3/ft²."
            steps={[
              { label: "Tons (with 10% waste)", work: "480 ft² × 0.25 × 145 ÷ 2,000 × 1.10 = 9.6 tons" },
              { label: "Material", work: "9.6 × $120 = $1,152" },
              { label: "Labor & equipment", work: "480 × $3.00 = $1,440" },
              { label: "Subtotal (no excavation/base)", work: "$2,592 → $5.40/ft²" },
            ]}
            result="≈ $2,600 for the asphalt scope. Add excavation and 6 in of base (~$1,200–1,800) for the full job."
          />
        </Section>

        <Faq items={faqItems} variant="list" title="Budget questions" />

        <Cta
          variant="banner"
          title="Understand every line item"
          description="Per-ton pricing, labor rates, equipment costs, regional factors and where to save: the complete cost series."
          href={ASPHALT.pricePerTon}
          buttonLabel="Asphalt Price Per Ton"
        />

        <RelatedArticles title="The cost series" variant="cards" items={costGuideLinks} />

        <RelatedArticles
          title="Related calculators"
          variant="inline-strip"
          items={pickLinks(asphaltCalculatorLinks, ASPHALT.calculator, ASPHALT.driveway, ASPHALT.weight)}
        />

        <RelatedArticles
          title="Comparing pavements?"
          variant="list"
          items={pickConcrete(concreteGuides, CONCRETE.cost, CONCRETE.vsAsphalt)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

      </CalculatorPageShell>
    </>
  );
}
