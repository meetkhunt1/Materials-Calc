import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
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

const title = "Concrete Cost Guide — Ready-Mix, Bags & Delivered Prices";
const description =
  "What concrete really costs in 2026: per-yard ready-mix prices, bag economics, delivery and short-load fees, and the crossover point where trucks beat bags.";
const path = CONCRETE.cost;
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
    question: "How much does a yard of concrete cost in 2026?",
    answer:
      "US ready-mix averages $150–180 per cubic yard delivered for a standard 3,000–4,000 psi mix, with metro markets running higher and rural plants lower. Fees stack on top: fuel surcharges, short-load fees under 4–5 yards, and standby time past the included unload window.",
  },
  {
    question: "Is it cheaper to mix concrete yourself?",
    answer:
      "Per cubic yard, bagged mix costs $250–320 (45 bags × $6–7) versus roughly $165 delivered — bags lose badly on material alone above about one yard. Under half a yard, bags win because you skip the short-load fee. Between those, the deciding factor is your labor: mixing 45 bags is a hard half-day for two people.",
  },
  {
    question: "What is a short-load fee?",
    answer:
      "Plants price trucks assuming full 8–10 yard loads. Orders below roughly 4–5 yards get a per-yard surcharge or flat fee ($50–150) to cover the truck's fixed trip cost. It's why combining your slab, footing and pier pours into one order saves real money.",
  },
  {
    question: "Does higher-strength concrete cost much more?",
    answer:
      "Roughly $5–10 per yard per 500 psi step. Going from 3,000 to 4,000 psi adds about $10–20/yd³ — cheap insurance for driveways in freeze-thaw climates, where the higher cement content also improves scaling resistance.",
  },
  {
    question: "What add-ons increase the ready-mix price?",
    answer:
      "Fiber reinforcement (+$8–15/yd³), accelerator for cold weather (+$5–10), mid-range water reducer (+$4–8), air entrainment (usually included where freeze-thaw requires it), and winter hot-water batching (+$5–10). Pumping is separate: $180–220/hr or ~$900–1,200/day for a boom pump.",
  },
  {
    question: "How do I avoid standby charges?",
    answer:
      "Most plants include 4–7 minutes of unload time per yard; past that, standby runs $2–3 per minute. Have forms done, crew ready, and wheelbarrows or the pump staged before the truck arrives — a disorganized 27-yard wall pour can quietly add $200 in standby.",
  },
];

const toc = tocFromTitles(
  "Ready-mix prices per cubic yard",
  "Bagged concrete economics",
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
              description="Quotes only make sense when you know the fee structure behind them. Here are the 2026 numbers — material, delivery, and the surcharges plants don't volunteer."
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
        <Section title="Ready-mix prices per cubic yard">
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

        <Section title="Bagged concrete economics">
          <CostTable
            currency="USD"
            rows={[
              { item: "80 lb bag (0.60 ft³ yield)", unit: "bag", low: 5.5, high: 7.5, note: "Best $/ft³ of the bag sizes" },
              { item: "60 lb bag (0.45 ft³ yield)", unit: "bag", low: 4.5, high: 6.5 },
              { item: "40 lb bag (0.30 ft³ yield)", unit: "bag", low: 3.5, high: 5.5, note: "Pay for liftability, not value" },
              { item: "High-early (fast-set) 50 lb", unit: "bag", low: 6.5, high: 9, note: "Fence posts; sets in 20–40 min" },
              { item: "Mixer rental (towable)", unit: "day", low: 60, high: 110 },
            ]}
            caption="Big-box retail pricing. A cubic yard needs 45 × 80 lb bags — compare that line item to one delivered yard before committing your back."
          />
          <TipBlock title="The bag math nobody does">
            45 bags × $6.50 = $292.50 per yard of concrete, plus mixer rental, plus water, plus
            4–6 crew-hours. Ready-mix at $165 + $75 short-load fee = $240 — cheaper and cured
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
              { label: "0.25 yd³ — bags", value: 75, color: "var(--chart-1)" },
              { label: "0.25 yd³ — ready-mix + fee", value: 190, color: "var(--chart-3)" },
              { label: "1 yd³ — bags", value: 295, color: "var(--chart-1)" },
              { label: "1 yd³ — ready-mix + fee", value: 240, color: "var(--chart-3)" },
              { label: "3 yd³ — bags", value: 880, color: "var(--chart-1)" },
              { label: "3 yd³ — ready-mix", value: 540, color: "var(--chart-3)" },
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
            caption="Ask the dispatcher for every line item before ordering — plants quote the per-yard price and mention fees only if you ask."
          />
          <InfoBlock title="Chute reach decides the pump question">
            A mixer chute reaches 12–16 ft from the truck&apos;s parking spot. If any part of the
            pour is beyond that — behind a house, over a foundation wall — you&apos;re renting a
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
          description="Get the exact volume first — every dollar figure above keys off cubic yards."
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

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[REFS.astmC94, REFS.pca]} />
      </ArticleShell>
    </>
  );
}
