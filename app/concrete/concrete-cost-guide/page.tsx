import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock, TipBlock } from "@/components/blocks/callout";
import { CostTable } from "@/components/tables/cost-table";
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
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import {
  ASPHALT,
  costGuideLinks as asphaltCostGuides,
  coreGuideLinks as asphaltCoreGuides,
  pickLinks as pickAsphalt,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Concrete Cost per Yard: $150–180 Ready-Mix";
const description =
  "Ready-mix concrete costs $150–180 per cubic yard delivered in 2026; 80 lb bags run $6–7 each. See fee tables, a bags vs truck chart and a priced driveway.";
const path = CONCRETE.cost;
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
    question: "How much does a yard of concrete cost in 2026?",
    answer:
      "US ready-mix averages $150–180 per cubic yard delivered for a standard 3,000–4,000 psi mix, with metro markets running higher and rural plants lower. Fees stack on top: fuel surcharges, short-load fees under 4–5 yards, and standby time past the included unload window.",
  },
  {
    question: "Is it cheaper to mix concrete yourself?",
    answer:
      "No, not above about one yard. Per cubic yard, bagged mix costs $250–320 (45 bags × $6–7) versus roughly $165 delivered, so bags lose badly on material alone. Under half a yard, bags win because you skip the short-load fee. Between those, the deciding factor is your labor: mixing 45 bags is a hard half-day for two people.",
  },
  {
    question: "What is a short-load fee?",
    answer:
      "A short-load fee is a $50–150 surcharge for ready-mix orders below roughly 4–5 yards. Plants price trucks assuming full 8–10 yard loads, and orders below that get a per-yard surcharge or flat fee ($50–150) to cover the truck's fixed trip cost. It's why combining your slab, footing and pier pours into one order saves real money.",
  },
  {
    question: "How much does 4,000 psi concrete cost per yard?",
    answer:
      "4,000 psi exterior mix runs about $155–185 per cubic yard before delivery fees, roughly $10–20 more than 3,000 psi. Each 500 psi step adds about $5–10 per yard. That is cheap insurance for driveways in freeze-thaw climates, where the higher cement content also improves scaling resistance.",
  },
  {
    question: "How much does concrete cost per cubic foot?",
    answer:
      "Ready-mix works out to about $5.50–6.70 per cubic foot ($150–180 ÷ 27). Bagged concrete costs far more per cubic foot: an 80 lb bag yields 0.60 ft³ for $5.50–7.50, or roughly $9–12.50 per cubic foot.",
  },
  {
    question: "How much do 3 yards of concrete cost?",
    answer:
      "3 cubic yards of ready-mix cost about $450–540 in material, plus delivery and usually a short-load fee, so budget roughly $540–780 delivered. The same 3 yards from bags (135 × 80 lb) would run close to $900 before mixer rental.",
  },
  {
    question: "What add-ons increase the ready-mix price?",
    answer:
      "Fiber, admixtures and pumping are the main add-ons: fiber reinforcement (+$8–15/yd³), accelerator for cold weather (+$5–10), mid-range water reducer (+$4–8), air entrainment (usually included where freeze-thaw requires it), and winter hot-water batching (+$5–10). Pumping is separate: $180–220/hr or ~$900–1,200/day for a boom pump.",
  },
  {
    question: "How do I avoid standby charges?",
    answer:
      "Be fully ready before the truck arrives. Most plants include 4–7 minutes of unload time per yard; past that, standby runs $2–3 per minute. Have forms done, crew ready, and wheelbarrows or the pump staged, because a disorganized 27-yard wall pour can quietly add $200 in standby.",
  },
];

const toc = tocFromTitles(
  "Ready-mix prices per cubic yard",
  "How much does bagged concrete cost?",
  "The bags vs ready-mix crossover",
  "Fees that surprise first-time buyers",
  "Worked example: pricing a driveway",
);

export default function CostGuidePage() {
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
        tocPosition="toc-left"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Concrete · Cost Guide"
              variant="stat-strip"
              title="What concrete actually costs"
              description="Quotes only make sense when you know the fee structure behind them. Here are the 2026 numbers for material, delivery, and the surcharges plants don't volunteer."
              stats={[
                { value: "$150–180", label: "per yd³ ready-mix, delivered" },
                { value: "$6–7", label: "per 80 lb bag" },
                { value: "45", label: "bags in one cubic yard" },
                { value: "~1 yd³", label: "bags vs truck crossover" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Cost Guide", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Price your project"
            variant="inline-strip"
            items={pickLinks(calculatorLinks, CONCRETE.calculator, CONCRETE.slab)}
          />
        }
      >
        <QuickAnswer
          question="How much does a yard of concrete cost?"
          answer="A cubic yard of ready-mix concrete costs about $150–180 delivered in the US in 2026 for a standard 3,000–4,000 psi mix. Orders under about 4 yards add a $50–150 short-load fee. Mixing the same yard from 45 bags of 80 lb concrete costs roughly $250–320, so bags only make sense for pours under about one yard."
          ruleOfThumb="Under 1 yd³, buy bags. Over 1 yd³, order a truck."
          formula="Cost = yd³ × price per yd³ + delivery + short-load fee"
        />

        <Section title="Ready-mix prices per cubic yard">
          <p className="text-muted-foreground">
            Standard 3,000 psi ready-mix runs $145–170 per cubic yard and 4,000 psi exterior
            mix runs $155–185, before delivery fees.
          </p>
          <CostTable
            currency="USD"
            rows={[
              { item: "3,000 psi standard mix", unit: "yd³", low: 145, high: 170, note: "Footings, interior slabs" },
              { item: "4,000 psi exterior mix", unit: "yd³", low: 155, high: 185, note: "Driveways, patios; usually air-entrained" },
              { item: "4,500+ psi / structural", unit: "yd³", low: 165, high: 200, note: "Engineered elements" },
              { item: "Fiber-reinforced upgrade", unit: "yd³", low: 8, high: 15, note: "Replaces mesh in slabs on grade" },
              { item: "Cold-weather accelerator", unit: "yd³", low: 5, high: 10, note: "Non-chloride for reinforced work" },
            ]}
            caption="US national ranges, mid-2026, standard slump, before delivery fees. Coastal metros run 10–20% above the high end."
          />
        </Section>

        <Section title="How much does bagged concrete cost?">
          <p className="text-muted-foreground">
            An 80 lb bag costs $5.50–7.50 and yields 0.60 ft³, which makes it the best value of
            the bag sizes. It still takes 45 of them to make one cubic yard.
          </p>
          <CostTable
            currency="USD"
            rows={[
              { item: "80 lb bag (0.60 ft³ yield)", unit: "bag", low: 5.5, high: 7.5, note: "Best $/ft³ of the bag sizes" },
              { item: "60 lb bag (0.45 ft³ yield)", unit: "bag", low: 4.5, high: 6.5 },
              { item: "40 lb bag (0.30 ft³ yield)", unit: "bag", low: 3.5, high: 5.5, note: "Pay for liftability, not value" },
              { item: "High-early (fast-set) 50 lb", unit: "bag", low: 6.5, high: 9, note: "Fence posts; sets in 20–40 min" },
              { item: "Mixer rental (towable)", unit: "day", low: 60, high: 110 },
            ]}
            caption="Big-box retail pricing. A cubic yard needs 45 × 80 lb bags, so compare that line item to one delivered yard before committing your back."
          />
          <TipBlock title="The bag math nobody does">
            45 bags × $6.50 = $292.50 per yard of concrete, plus mixer rental, plus water, plus
            4–6 crew-hours. Ready-mix at $165 + $75 short-load fee = $240: cheaper, and cured
            more consistently. Bags win only when the pour is small, scattered, or truck access
            is impossible.
          </TipBlock>
        </Section>

        <Section title="The bags vs ready-mix crossover">
          <BarChart
            title="Total cost by pour size: bags vs ready-mix"
            unit="USD"
            monochrome={false}
            data={[
              { label: "0.25 yd³: bags", value: 75, color: "var(--chart-1)" },
              { label: "0.25 yd³: ready-mix + fee", value: 190, color: "var(--chart-3)" },
              { label: "1 yd³: bags", value: 295, color: "var(--chart-1)" },
              { label: "1 yd³: ready-mix + fee", value: 240, color: "var(--chart-3)" },
              { label: "3 yd³: bags", value: 880, color: "var(--chart-1)" },
              { label: "3 yd³: ready-mix", value: 540, color: "var(--chart-3)" },
            ]}
          />
          <p className="text-muted-foreground">
            The lines cross just under one cubic yard. Below it, the short-load fee makes the
            truck expensive; above it, bag costs climb linearly while the truck&apos;s fixed fees
            amortize. Get your exact volume from the{" "}
            <a href={CONCRETE.calculator} className="font-medium text-primary hover:underline">
              concrete calculator
            </a>{" "}
            first, then price both sides of this chart with local numbers.
          </p>
        </Section>

        <Section title="Fees that surprise first-time buyers">
          <p className="text-muted-foreground">
            On a small order, delivery ($30–90) and short-load ($50–150) fees can rival the
            price of the concrete itself, so ask for every fee before you book the truck.
          </p>
          <CostTable
            currency="USD"
            rows={[
              { item: "Delivery / fuel surcharge", unit: "load", low: 30, high: 90 },
              { item: "Short-load fee (under ~4 yd³)", unit: "load", low: 50, high: 150 },
              { item: "Standby beyond unload window", unit: "minute", low: 2, high: 3 },
              { item: "Saturday delivery", unit: "load", low: 60, high: 150 },
              { item: "Boom pump (when chute can't reach)", unit: "day", low: 900, high: 1200, note: "Or ~$180–220/hr with minimums" },
              { item: "Returned concrete disposal", unit: "yd³", low: 20, high: 40, note: "Some plants charge to take back overage" },
            ]}
            caption="Ask the dispatcher for every line item before ordering. Plants quote the per-yard price and mention fees only if you ask."
          />
          <InfoBlock title="Chute reach decides the pump question">
            A mixer chute reaches 12–16 ft from the truck&apos;s parking spot. If any part of the
            pour is beyond that (behind a house, over a foundation wall), you&apos;re renting a
            pump or a crew of wheelbarrows. Factor it in before comparing contractor bids that
            already include pumping.
          </InfoBlock>
        </Section>

        <Section title="Worked example: pricing a driveway">
          <ExampleBlock
            scenario="A 16 × 40 ft driveway, 5 in thick, 4,000 psi air-entrained mix, normal truck access."
            steps={[
              { label: "Volume from the slab calculator", work: "16 × 40 × 0.417 × 1.10 ÷ 27 = 10.9 → 11 yd³" },
              { label: "Material", work: "11 × $170 = $1,870" },
              { label: "Delivery + fuel (two trucks)", work: "2 × $60 = $120" },
              { label: "No short-load fee (full loads)", work: "$0" },
              { label: "Concrete subtotal", work: "$1,990 (± regional)" },
            ]}
            result="≈ $2,000 in concrete. Forms, base gravel, reinforcement and finishing labor typically triple it installed."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Price your own pour"
          description="Get the exact volume first, because every dollar figure above keys off cubic yards."
          href={CONCRETE.calculator}
          buttonLabel="Concrete Calculator"
        />

        <RelatedArticles
          title="Related guides"
          variant="cards"
          items={pickLinks(guideLinks, CONCRETE.vsAsphalt, CONCRETE.mixRatio, CONCRETE.coverage)}
        />

        <RelatedArticles
          title="Pricing asphalt for the same job?"
          variant="inline-strip"
          items={[
            ...pickAsphalt(asphaltCoreGuides, ASPHALT.costGuide),
            ...pickAsphalt(asphaltCostGuides, ASPHALT.pricePerTon),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

        <References items={[REFS.astmC94, REFS.pca]} />
      </ArticleShell>
    </>
  );
}
