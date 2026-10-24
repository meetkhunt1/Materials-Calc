import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { GravelCostCalculatorCard } from "@/content/gravel/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { InlineToc } from "@/components/toc/table-of-contents";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock, InfoBlock } from "@/components/blocks/callout";
import { CostTable } from "@/components/tables/cost-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { GRAVEL, costGuideLinks, gravelCalculatorLinks, pickLinks, GREFS } from "@/content/gravel/links";
import { ASPHALT, costGuideLinks as asphaltCostGuides, pickLinks as pickAsphalt } from "@/content/asphalt/links";
import { CONCRETE, guideLinks as concreteGuides, pickLinks as pickConcrete } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Gravel Driveway Cost Calculator: Tons and Price";
const description =
  "Gravel costs $15–45 per ton for crusher run and #57 stone, plus $50–150 per delivery. Enter your driveway size to get tons, delivered total and cost per ft².";
const path = GRAVEL.cost;
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
    question: "How much does a ton of gravel cost in 2026?",
    answer:
      "$15–30 per ton for crusher run and road base. Clean #57 runs $25–45, pea gravel $30–60, decorative river rock and specialty stone $50–120+. Delivery adds a flat $50–150 unless you're over the supplier's free-delivery threshold, typically 10–15 tons.",
  },
  {
    question: "How much does a 100-foot gravel driveway cost?",
    answer:
      "About $1,250–2,600 in delivered material for a 100 × 12 ft driveway built with 4 in of #57 stone under 4 in of crusher run. That is about 24 tons of #57 at $25–45 and 31 tons of crusher run at $15–30, plus four tandem deliveries at $50–150 each. Spreading and grading are extra.",
  },
  {
    question: "How much gravel can I get for $500?",
    answer:
      "About 14 tons at $30/ton plus an $80 delivery. That is a full tandem load, enough to resurface roughly 1,400 ft² at 2 inches. The calculator answers the reverse question (dimensions to dollars) directly.",
  },
  {
    question: "Is it cheaper to pick gravel up myself?",
    answer:
      "Only for jobs under about a ton. A half-ton pickup legally carries about 1,000–1,500 lb of gravel, which is half a scoop. Unless you own a dump trailer, one delivery fee beats six pickup runs on fuel and time alone.",
  },
  {
    question: "What does spreading cost if I don't DIY?",
    answer:
      "$10–25 per ton for machine spreading and grading, depending on access, or $45–75/hr for a skid steer with operator. Tailgate-spreading (the driver chains the gate and drives forward) is often free and gets material 80% of the way there, so ask when ordering.",
  },
  {
    question: "Why do quotes vary so much between suppliers?",
    answer:
      "Mostly because of haul distance: aggregate is cheap at the quarry gate but expensive to truck ($4–8/ton per 10 miles). The nearest quarry usually wins regardless of gate price, and the delivery cost guide explains how to compare quotes properly.",
  },
];

const toc = tocFromTitles(
  "What does gravel cost per ton in 2026?",
  "Worked example: pricing a parking area",
  "Reading a gravel quote like an estimator",
);

export default function GravelCostCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15", dateModified: "2026-10-24" }),
          calculatorSchema({ name: "Gravel Cost Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="split"
        hero={
          <>
            <Hero
              eyebrow="Gravel · Budgeting"
              variant="compact"
              title="Gravel Cost Calculator"
              description="Enter dimensions, your local per-ton price and the delivery fee to get the delivered total and cost per square foot. Defaults are honest 2026 mid-points."
            >
              <AuthorBox author={author} datePublished="2026-07-15" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Gravel Cost Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<GravelCostCalculatorCard />}
        aside={
          <RelatedArticles
            title="The cost series"
            variant="inline-strip"
            items={pickLinks(costGuideLinks, GRAVEL.priceGuide, GRAVEL.deliveryCost, GRAVEL.budgetTips)}
          />
        }
      >
        <QuickAnswer
          question="How much does a gravel driveway cost?"
          answer="A gravel driveway typically costs $1–3 per square foot installed, and the delivered stone alone often comes in under $1 per square foot. For example, a 30×20 ft pad with 4 inches of #57 stone takes 11 tons; at $32 per ton plus a $90 delivery fee, the delivered material total is about $442, or $0.74/ft²."
          formula="Cost = tons × price per ton + delivery fee (+ spreading)"
        />

        <InlineToc items={toc} />

        <Section title="What does gravel cost per ton in 2026?">
          <p className="text-muted-foreground">
            Gravel costs $15–30 per ton for crusher run, $25–45 for #57 stone and $30–60
            for pea gravel, before a $50–150 delivery fee.
          </p>
          <CostTable
            currency="USD"
            rows={[
              { item: "Crusher run / road base", unit: "ton", low: 15, high: 30, note: "The workhorse for bases and surfaces" },
              { item: "Crushed stone #57", unit: "ton", low: 25, high: 45 },
              { item: "Pea gravel (bulk)", unit: "ton", low: 30, high: 60 },
              { item: "River rock / decorative", unit: "ton", low: 50, high: 120 },
              { item: "Delivery (flat, under ~10 tons)", unit: "load", low: 50, high: 150 },
              { item: "Spreading (machine)", unit: "ton", low: 10, high: 25, note: "Often optional; tailgate spreading is free" },
            ]}
            caption="US national ranges, mid-2026. Haul distance moves these more than material type (see the delivery cost guide)."
          />
          <InfoBlock title="Same discipline as the other materials">
            Quantity first, unit price second, fees last, exactly as in our{" "}
            <a href={CONCRETE.cost} className="font-medium underline-offset-2 hover:underline">
              concrete
            </a>{" "}
            and{" "}
            <a href={ASPHALT.costGuide} className="font-medium underline-offset-2 hover:underline">
              asphalt
            </a>{" "}
            cost guides. If you&apos;re choosing between surfaces, price all three on the
            same dimensions before deciding.
          </InfoBlock>
        </Section>

        <Section title="Worked example: pricing a parking area">
          <ExampleBlock
            scenario="A 30 × 20 ft parking area, 4 in of #57 at $32/ton, $90 delivery, spread by hand."
            steps={[
              { label: "Tons (with 10%)", work: "600 × 0.333 × 100 ÷ 2,000 × 1.10 = 11 tons" },
              { label: "Material", work: "11 × $32 = $352" },
              { label: "Delivery", work: "$90 (one load)" },
              { label: "Total delivered", work: "$442 → $0.74/ft²" },
            ]}
            result="≈ $440 delivered. The same pad in asphalt runs $1,700+ installed, which is exactly why parking areas start life in gravel."
          />
        </Section>

        <Section title="Reading a gravel quote like an estimator">
          <p className="text-muted-foreground">
            A gravel quote is only comparable once you know its unit, what delivery it
            includes and whether the stone is clean or carries fines.
          </p>
          <TipBlock title="Three questions that catch every hidden cost">
            Is the price per ton or per yard (convert before comparing: a $40 yard of
            crusher run is a $21 ton)? Is delivery included, and at what minimum? And is the
            material washed/clean or does it carry fines (which changes both the density and
            the job it can do)? Suppliers answer all three happily; estimators just ask.
          </TipBlock>
        </Section>

        <Faq items={faqItems} />

        <Cta
          variant="banner"
          title="Understand every line item"
          description="Prices, delivery, per-ton vs per-yard, labor and where to save: the complete gravel cost series."
          href={GRAVEL.priceGuide}
          buttonLabel="Gravel Price Guide"
        />

        <RelatedArticles title="The cost series" variant="cards" items={costGuideLinks} />

        <RelatedArticles
          title="Cost guides for other materials"
          variant="list"
          items={[
            ...pickConcrete(concreteGuides, CONCRETE.cost),
            ...pickAsphalt(asphaltCostGuides, ASPHALT.pricePerTon),
          ]}
        />

        <RelatedArticles
          title="Other gravel tools"
          variant="inline-strip"
          items={pickLinks(gravelCalculatorLinks, GRAVEL.calculator, GRAVEL.driveway, GRAVEL.pea)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[GREFS.usgs, GREFS.nssga]} />
      </CalculatorPageShell>
    </>
  );
}
