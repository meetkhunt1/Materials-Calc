import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock } from "@/components/blocks/callout";
import { CostTable } from "@/components/tables/cost-table";
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
import {
  GRAVEL,
  stoneGuideLinks,
  costGuideLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "crushed-stone-cost";
const title = "Crushed Stone Cost — 2026 Prices Per Ton by Size";
const description =
  "2026 crushed stone prices: crusher run $15–30 per ton, #57 stone $25–45, screenings $15–35, decorative grades $60–120 — plus delivery fees and a worked installed-cost example for a driveway base.";
const path = GRAVEL.stoneCost;
const author = getAuthor("materials-team");

const heroVariant = pick(slug, HERO_VARIANTS);
const tocPosition = pick(slug, ["toc-right", "toc-left"] as const);
const faqVariant = pick(slug, ["accordion", "list"] as const);
const relatedStyle = pick(slug, RELATED_STYLES);
const ctaVariant = pick(slug, ["banner", "card", "inline"] as const);

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-16",
});

const faqItems: FaqItem[] = [
  {
    question: "How much does crushed stone cost per ton?",
    answer:
      "In 2026, crusher run and screenings run $15–35 per ton at the quarry, clean #57 stone $25–45, and large clean sizes like #2 and #3 $25–50. Decorative crushed stone — white marble, red granite — jumps to $60–120 per ton. Delivery adds a flat $50–150 per trip in most markets.",
  },
  {
    question: "Why is crusher run the cheapest product?",
    answer:
      "It takes the least processing. Clean stone must be crushed, screened to a narrow size band and often washed; crusher run comes off the primary crusher with everything left in. Less screening, no washing, no handling of separated fractions — the savings pass straight to the per-ton price.",
  },
  {
    question: "How much does a ton of #57 stone cover?",
    answer:
      "About 80 ft² at 3 inches deep, or 60 ft² at 4 inches, loose. At $35 per ton that is roughly $0.45–0.60 per square foot of material for a typical 3–4 inch layer, before delivery and spreading.",
  },
  {
    question: "What does installed crushed stone cost?",
    answer:
      "Material is usually the smallest line. Add $50–150 delivery per load, and $300–800 for machine spreading and plate or roller compaction on a residential job. A typical single-car driveway base lands at $1–2 per square foot installed; hand-spread decorative work runs higher per square foot because labor dominates.",
  },
  {
    question: "Is it cheaper to buy crushed stone by the yard or by the ton?",
    answer:
      "Neither is inherently cheaper — they are the same stone measured differently. A cubic yard of #57 weighs about 1.35 tons, so a $40/ton quote equals $54/yd³. The trap is comparing one supplier's ton price against another's yard price without converting; always convert both to dollars per ton before deciding.",
  },
  {
    question: "How can I cut the cost of a crushed stone project?",
    answer:
      "Three levers, in order: buy from the quarry rather than a reseller (often 30–50% less per ton), consolidate everything into one delivery (the fee is per trip, not per ton), and use cheap crusher run for buried structural layers, saving clean or decorative stone for the visible top 2 inches only.",
  },
];

const toc = tocFromTitles(
  "2026 price chart",
  "Why prices differ by size",
  "Delivery",
  "Installed cost: driveway base example",
  "Where to save",
);

export default function CrushedStoneCostPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
          datePublished: "2026-07-16",
          author,
        })}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Crushed Stone"
              variant={heroVariant}
              title="Crushed stone cost (2026)"
              description="Crushed stone is one of the cheapest materials you can buy by the ton — and one of the easiest to overpay for once delivery, resellers and decorative grades enter the picture. Here is the full 2026 price map."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Crushed Stone Cost", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="2026 price chart">
          <CostTable
            rows={[
              { item: "Crusher run / road base", unit: "per ton", low: 15, high: 30, note: "Least processing — the budget structural product" },
              { item: "Screenings / stone dust (#10)", unit: "per ton", low: 15, high: 35, note: "Paver leveling beds, path topping" },
              { item: "#57 clean stone", unit: "per ton", low: 25, high: 45, note: "The all-purpose size; most-quoted price in the industry" },
              { item: "#8 clean stone", unit: "per ton", low: 30, high: 50, note: "Finer screening adds cost" },
              { item: "#2 / #3 large clean stone", unit: "per ton", low: 25, high: 50, note: "Entrances, ballast, drainage beds" },
              { item: "Decorative crushed (marble, red granite)", unit: "per ton", low: 60, high: 120, note: "Specialty deposits, often bagged — 2–4× plain stone" },
            ]}
            caption="2026 quarry-gate prices per US ton. Landscape yards and resellers typically add 20–50%; delivery is extra."
          />
          <p className="text-muted-foreground">
            Regional geology moves every row: markets sitting on limestone (the Midwest,
            Southeast) hug the low end, while regions that truck stone in — coastal plains,
            parts of the Gulf — pay the high end plus freight. USGS pegs the national average
            price of crushed stone around $16–17 per ton at the plant, which is why any quote
            over $50 for plain stone deserves a second phone call. The wider{" "}
            <a href={GRAVEL.priceGuide} className="font-medium text-primary hover:underline">
              gravel price guide
            </a>{" "}
            covers rounded gravels and blends.
          </p>
        </Section>

        <Section title="Why prices differ by size">
          <p className="text-muted-foreground">
            Every product starts as the same blasted rock, so the price ladder is a
            processing ladder. Crusher run exits the primary crusher unscreened — cheapest.
            Clean stone passes over screens that split it into size classes, and finer
            classes need more screen area and slower throughput, which is why #8 usually
            costs a few dollars more than #57. Washing (for concrete-grade aggregate) adds
            another step. Decorative stone breaks the ladder entirely: its price reflects
            rare deposits and freight, not processing. Sizes and what each is for are decoded
            in the{" "}
            <a href={GRAVEL.stoneSizes} className="font-medium text-primary hover:underline">
              crushed stone sizes guide
            </a>
            .
          </p>
        </Section>

        <Section title="Delivery">
          <CostTable
            rows={[
              { item: "Local delivery (within ~15 mi)", unit: "per trip", low: 50, high: 150, note: "Flat fee per truck, not per ton" },
              { item: "Tandem load (~18 tons) delivered", unit: "per load", low: 400, high: 900, note: "Best per-ton economics for big jobs" },
              { item: "Small order surcharge (under 3–5 tons)", unit: "per order", low: 25, high: 75, note: "Some yards fold this into a minimum" },
            ]}
            caption="Typical 2026 delivery pricing. The fee is per trip — one 10-ton load beats two 5-ton loads by a full delivery fee."
          />
        </Section>

        <Section title="Installed cost: driveway base example">
          <ExampleBlock
            scenario="A 12 × 50 ft single-car driveway gets a 4 inch compacted crusher run base. What does it really cost, installed?"
            steps={[
              { label: "Tonnage", work: "600 ft² × 0.333 ft × 140 lb/ft³ = 28,000 lb = 14 tons; +10% waste ≈ 15.5 tons" },
              { label: "Material", work: "15.5 tons × $22/ton = $341" },
              { label: "Delivery", work: "One tandem trip = $100" },
              { label: "Spread + compact", work: "Skid-steer and plate compactor, half day = $300–600" },
            ]}
            result="Roughly $750–1,050 all-in — $1.25–1.75 per square foot. Material is barely a third of the bill; the machine time is the real cost."
          />
          <TipBlock title="Price the job, not the ton">
            A $5/ton saving on 15 tons is $75 — one delivery fee. Getting the stone, the
            trucking and the spreading from one supplier in one visit routinely saves more
            than shopping the per-ton price across three yards. The{" "}
            <a href={GRAVEL.laborCost} className="font-medium text-primary hover:underline">
              gravel labor cost guide
            </a>{" "}
            breaks down spreading and compaction rates.
          </TipBlock>
        </Section>

        <Section title="Where to save">
          <p className="text-muted-foreground">
            The reliable savings are structural, not negotiated. Bury the cheap stuff:
            crusher run at $22/ton does the load-bearing work, and a thin dressing of $40
            clean stone — or $90 decorative — goes only where eyes and feet land. Buy
            quarry-direct when you can haul or meet the minimum, because reseller markup is
            the single largest avoidable line. And order once: every extra trip is $50–150
            that buys no stone at all. What does not work is thinning the layer — a 3 inch
            base that fails costs the whole job again, which makes skimped depth the most
            expensive discount in the catalog.
          </p>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Cost questions" />

        <Cta
          variant={ctaVariant}
          title="Budget your exact project"
          description="Enter dimensions and a local price — the calculator returns tons, yards and total cost for any crushed stone size."
          href={GRAVEL.crushed}
          buttonLabel="Crushed Stone Calculator"
        />

        <RelatedArticles
          title="Budget the rest of the job"
          variant={relatedStyle}
          items={[
            ...pickLinks(stoneGuideLinks, GRAVEL.stoneSizes, GRAVEL.stoneWeight),
            ...pickLinks(costGuideLinks, GRAVEL.deliveryCost, GRAVEL.costPerTon),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-16" />

        <References items={[GREFS.usgs, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
