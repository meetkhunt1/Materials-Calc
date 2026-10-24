import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { InfoBlock, TipBlock, WarningBlock } from "@/components/blocks/callout";
import { CostTable } from "@/components/tables/cost-table";
import { CoverageTable } from "@/components/tables/coverage-table";
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
import { GRAVEL, costGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-delivery-cost";
const title = "Gravel Delivery Cost: $50–150 Per Truckload";
const description =
  "Gravel delivery costs $50–150 per trip within 10–20 miles, plus $5–10 per mile beyond. See truck sizes, order minimums, free-delivery thresholds and tips.";
const path = GRAVEL.deliveryCost;
const author = getAuthor("materials-team");
const datePublished = "2026-07-16";

// Deterministic per-slug variation (see lib/variation.ts)
const heroVariant = pick(slug, HERO_VARIANTS); // "centered"
const tocPosition = pick(slug, ["toc-right", "toc-left"] as const); // "toc-left"
const faqVariant = pick(slug, ["accordion", "list"] as const); // "list"
const relatedStyle = pick(slug, RELATED_STYLES); // "cards"
const ctaVariant = pick(slug, ["banner", "card", "inline"] as const); // "banner"

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: datePublished,
  modifiedTime: "2026-10-24",
});

const faqItems: FaqItem[] = [
  {
    question: "How much does gravel delivery cost?",
    answer:
      "Most suppliers charge a flat $50–150 per trip within a 10–20 mile radius, regardless of tonnage on the truck. Beyond the radius expect $5–10 per additional mile. The fee is per trip, not per ton: a full 18-ton tri-axle and a 3-ton partial load pay the same trucking, which is why big orders are so much cheaper per ton delivered.",
  },
  {
    question: "Is there a minimum order for gravel delivery?",
    answer:
      "Usually. Common minimums are 1–3 tons at landscape yards and 5–10 tons at quarries running their own trucks. Below the minimum you either pay a small-load surcharge of $25–75 or the supplier declines the run. If you need under a ton, bagged material or a pickup-truck load at the gate is normally the cheaper route.",
  },
  {
    question: "When is gravel delivery free?",
    answer:
      "Usually once an order passes 10–20 tons or a dollar total around $400–800, when many suppliers waive the fee. Free never means free: the trucking cost is folded into the per-ton price. It is still worth hitting the threshold, because the folded-in rate on a full truck is far below what a small load pays per ton.",
  },
  {
    question: "How many tons is a tandem load of gravel?",
    answer:
      "A tandem-axle dump truck carries 10–14 tons of gravel. For comparison, a single-axle truck carries 5–6 tons, a tri-axle 16–18, and a semi end-dump 22–25. Legal axle weights, not bed volume, set the limit, because gravel is so dense that trucks weigh out long before they cube out. Most residential deliveries arrive on a tandem or tri-axle.",
  },
  {
    question: "How much does it cost to deliver 10 tons of gravel?",
    answer:
      "Usually a single flat fee of $50–150, because 10 tons fits on one tandem truck. That adds roughly $5–15 per ton to the material price inside the delivery radius. Past the radius, add $5–10 per mile, and check whether your order total clears the supplier's free-delivery threshold.",
  },
  {
    question: "What is a split load and what does it cost?",
    answer:
      "A split load is one truck carrying two materials (say 10 tons of crusher run and 6 tons of #57) dumped in separate piles. Suppliers typically add $25–50 for the second drop, which is dramatically cheaper than two delivery fees. It is the standard move for layered driveway builds ordered from a single quarry.",
  },
  {
    question: "Can the driver spread the gravel for me?",
    answer:
      "Partially. An experienced driver can tailgate-spread, driving forward while raising the bed to lay a rough, even ribbon down a driveway lane at little or no extra charge. It is not a finished grade, but it can save hours of wheelbarrow work. Ask when ordering, not when the truck arrives, and have the lane clear of vehicles.",
  },
];

const toc = tocFromTitles(
  "Delivery fees in 2026",
  "Minimums and free-delivery thresholds",
  "How many tons does a dump truck hold?",
  "Split loads: one truck, two materials",
  "How to shrink the delivery line item",
);

export default function GravelDeliveryCostPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
          datePublished,
          dateModified: "2026-10-24",
          author,
        })}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Cost Series"
              variant={heroVariant}
              title="Gravel delivery cost"
              description="The truck often costs more than the stone on small orders. Here is how delivery is actually priced (flat fees, minimums, mileage) and how to make one trip do the work of three."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Delivery Cost", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <QuickAnswer
          question="How much does gravel delivery cost?"
          answer="Gravel delivery typically costs a flat $50–150 per truck trip within a 10–20 mile radius of the supplier, plus $5–10 per mile beyond it. The fee is charged per trip, not per ton, so a $100 fee adds $33 per ton to a 3-ton order but only $5.50 per ton to an 18-ton tri-axle load."
          ruleOfThumb="Fill the truck: 10–14 tons on a tandem, 16–18 tons on a tri-axle, for the same fee."
          formula="Delivered cost per ton = material price + (delivery fee ÷ tons on the truck)"
        />

        <Section title="Delivery fees in 2026">
          <p className="text-muted-foreground">
            Delivery is a per-trip charge of $50–150 inside the supplier&apos;s radius, with
            mileage, small-load and second-drop fees layered on top.
          </p>
          <CostTable
            rows={[
              { item: "Flat delivery fee (within radius)", unit: "per trip", low: 50, high: 150, note: "Covers a 10–20 mile radius; charged per truck, not per ton" },
              { item: "Mileage surcharge (beyond radius)", unit: "per mile", low: 5, high: 10, note: "Added each way at some suppliers; ask how it is metered" },
              { item: "Small-load surcharge", unit: "per order", low: 25, high: 75, note: "Orders under the 1–3 ton minimum" },
              { item: "Split-load second drop", unit: "per drop", low: 25, high: 50, note: "Two materials, one truck: far cheaper than two trips" },
              { item: "Wait / redelivery fee", unit: "per event", low: 50, high: 125, note: "Blocked access or nobody home; entirely avoidable" },
            ]}
            caption="US delivery pricing, mid-2026. Every figure is per truck movement, so consolidating trips is the whole game."
          />
          <p className="text-muted-foreground">
            The math that matters: a $100 fee on 3 tons adds $33 per ton; the same fee on 18
            tons adds $5.50. Delivery is the reason the{" "}
            <a href={GRAVEL.costPerTon} className="font-medium text-primary hover:underline">
              per-ton price
            </a>{" "}
            you were quoted and the per-ton price you actually pay are different numbers.
          </p>
        </Section>

        <Section title="Minimums and free-delivery thresholds">
          <p className="text-muted-foreground">
            Suppliers set minimums because the truck costs the same to roll whether it
            carries one ton or eighteen. Landscape yards typically hold a 1–3 ton floor;
            quarries dispatching their own tandems often will not move for less than 5–10
            tons. At the other end, most suppliers waive the fee entirely above 10–20 tons
            or a $400–800 order total.
          </p>
          <InfoBlock title="Free delivery is a pricing style, not a gift">
            Suppliers advertising free delivery have folded trucking into the per-ton price.
            That still favors you at volume, but it means their sticker price cannot be
            compared directly against a quarry quoting gate price plus fee. Always compare
            the delivered total for your tonnage.
          </InfoBlock>
        </Section>

        <Section title="How many tons does a dump truck hold?">
          <p className="text-muted-foreground">
            A residential dump truck holds 5–18 tons of gravel depending on axles: 10–14
            tons on the common tandem and 16–18 tons on a tri-axle.
          </p>
          <CoverageTable
            headers={["Truck", "Typical payload", "Best for"]}
            rows={[
              { label: "Single-axle dump", spec: "5–6 tons", coverage: "Small orders, tight suburban access", note: "Shortest turning radius; fits narrow drives" },
              { label: "Tandem-axle dump", spec: "10–14 tons", coverage: "The standard residential delivery", note: "One tandem ≈ a full single-car driveway top-up" },
              { label: "Tri-axle dump", spec: "16–18 tons", coverage: "Driveway builds, large pads", note: "Cheapest per ton; needs room and firm ground" },
              { label: "Semi end-dump / transfer", spec: "22–25 tons", coverage: "Long lanes, farm roads, big projects", note: "Requires straight, solid access with no tight turns" },
            ]}
            caption="Legal axle weight, not bed volume, limits payload. Dense gravel weighs trucks out before it fills them up."
          />
          <p className="text-muted-foreground">
            Order to the truck, not just the takeoff. If your project needs 15 tons, a
            single 16–18 ton tri-axle trip beats two tandem trips by an entire delivery fee,
            so round the order up and bank the surplus for top-ups.
          </p>
        </Section>

        <Section title="Split loads: one truck, two materials">
          <p className="text-muted-foreground">
            A layered build does not require two deliveries, even with a crusher run base
            under a #57 or pea gravel surface. Quarries routinely load a tandem or tri-axle with both
            materials separated by a bulkhead or loaded in sequence, then dump two piles for
            a $25–50 second-drop fee. On a driveway that swaps a second $100 delivery for
            $35, and both piles land the same morning.
          </p>
          <TipBlock title="Sequence the piles">
            Have the base material dumped closest to the work and the top layer behind it.
            You move the base first, and nothing gets double-handled. Mark each dump spot
            with paint or stakes before the truck arrives; drivers place piles exactly where
            they are told, once.
          </TipBlock>
        </Section>

        <Section title="How to shrink the delivery line item">
          <p className="text-muted-foreground">
            Five moves, in order of impact: consolidate everything into one trip (base, top
            layer, even a neighbor&apos;s order, since splitting a $100 fee is instant savings);
            order up to the truck&apos;s full payload rather than just your takeoff; hit the
            supplier&apos;s free-delivery threshold when you are within a few tons of it; choose
            the nearest source of acceptable stone, since radius and mileage set the fee; and
            self-haul only genuinely small loads. A half-ton in a pickup is fine, but four
            trailer trips to dodge one $85 fee is a bad afternoon.
          </p>
          <WarningBlock title="A loaded tri-axle weighs 30+ tons">
            Do not send one over a septic field, irrigation lines, a thin residential
            driveway slab, or soft lawn. Crushed pipe and cracked concrete cost far more
            than the delivery you optimized. If access is doubtful, have the pile dropped at
            the street and budget wheelbarrow or skid-steer time instead.
          </WarningBlock>
        </Section>

        {/* FAQ position for this slug: after-content */}
        <Faq items={faqItems} variant={faqVariant} title="Delivery questions" />

        <Cta
          variant={ctaVariant}
          title="Budget the whole job, truck included"
          description="The Gravel Cost Calculator turns dimensions into tonnage, then adds material and delivery in one total."
          href={GRAVEL.cost}
          buttonLabel="Gravel Cost Calculator"
        />

        <RelatedArticles
          title="Continue the cost series"
          variant={relatedStyle}
          items={pickLinks(costGuideLinks, GRAVEL.priceGuide, GRAVEL.costPerTon, GRAVEL.budgetTips)}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.usgs, GREFS.fhwaGravel]} />
      </ArticleShell>
    </>
  );
}
