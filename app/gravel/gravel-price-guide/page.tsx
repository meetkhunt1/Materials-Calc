import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
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
import { pick, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { getAuthor } from "@/data/authors";
import { GRAVEL, costGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-price-guide";
const title = "Gravel Price Guide — 2026 Prices by Type";
const description =
  "The 2026 master gravel price table: crusher run $15–30/ton, #57 stone $25–45, pea gravel $30–60, river rock $45–130, decorative stone $50–200 — plus the three factors that decide where your quote lands.";
const path = GRAVEL.priceGuide;
const author = getAuthor("materials-team");
const datePublished = "2026-07-16";

// Deterministic per-slug variation (see lib/variation.ts)
const heroVariant = pick(slug, HERO_VARIANTS); // "stat-strip"
const tocPosition = pick(slug, ["toc-right", "toc-left"] as const); // "toc-left"
const faqVariant = pick(slug, ["accordion", "list"] as const); // "list"
const relatedStyle = pick(slug, RELATED_STYLES); // "inline-strip"
const ctaVariant = pick(slug, ["banner", "card", "inline"] as const); // "inline"

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: datePublished,
});

const faqItems: FaqItem[] = [
  {
    question: "How much does gravel cost in 2026?",
    answer:
      "Bulk gravel runs $15–200 per ton depending entirely on type. Construction workhorses sit at the bottom — crusher run $15–30, #57 stone $25–45 — while landscape stone climbs: pea gravel $30–60, river rock $45–130, and specialty decorative stone $50–200 per ton. Delivery adds a $50–150 flat fee on top.",
  },
  {
    question: "What is the cheapest gravel?",
    answer:
      "Recycled concrete aggregate at $10–20 per ton, followed by crusher run and stone screenings at $12–30. All three are crushed, angular products that compact hard — ideal for bases and driveways. Anything cheap and pretty does not exist; appearance is exactly what you pay for above $45 per ton.",
  },
  {
    question: "Why is river rock three times the price of crusher run?",
    answer:
      "Crusher run is made at thousands of local quarries from whatever rock is nearby, so it barely travels. River rock comes from specific alluvial deposits, is screened and washed for appearance, and often ships hundreds of miles. Freight is the multiplier: gravel is cheap to make and expensive to move.",
  },
  {
    question: "How much does a gravel driveway's material cost?",
    answer:
      "A 16 × 50 ft single-car drive needs roughly 20–25 tons across an 8–10 inch layered build. At crusher run and #57 prices that is $400–900 of stone plus delivery — figure $500–1,100 in material. Labor and grading roughly double it installed; see the gravel driveway cost guide for full line items.",
  },
  {
    question: "Do gravel prices include delivery?",
    answer:
      "Almost never. Quarries and landscape yards quote a gate (pickup) price, then add a $50–150 flat delivery fee per trip within their radius. On a 3-ton order a $100 fee adds $33 per ton — which is why small-job comparisons should always be made on the delivered total, not the per-ton sticker.",
  },
  {
    question: "Are gravel prices rising?",
    answer:
      "Slowly and steadily. USGS data shows US crushed stone prices climbing roughly 3–7% per year through the 2020s, driven by diesel, labor and permitting costs rather than the rock itself. The bigger swing is always geographic: the same #57 stone can differ 50% between a quarry-dense region and one where stone is barged or railed in.",
  },
];

const toc = tocFromTitles(
  "The 2026 master price table",
  "Average price per ton, compared",
  "What actually drives gravel prices",
  "Turning a table price into a local quote",
);

export default function GravelPriceGuidePage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
          datePublished,
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
              title="Gravel price guide (2026)"
              description="Every common gravel type, one honest price table. The spread is wider than most people expect — a ton of stone costs anywhere from $10 to $200 depending on what it is and how far it traveled."
              stats={[
                { value: "$15–30", label: "crusher run, per ton" },
                { value: "$25–45", label: "#57 stone, per ton" },
                { value: "$45–130", label: "river rock, per ton" },
                { value: "$50–150", label: "typical delivery fee" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Price Guide", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="The 2026 master price table">
          <CostTable
            rows={[
              { item: "Recycled concrete aggregate (RCA)", unit: "per ton", low: 10, high: 20, note: "Crushed demolition concrete; base use only" },
              { item: "Stone dust / screenings", unit: "per ton", low: 12, high: 25, note: "Fines for paver bedding and path topping" },
              { item: "Bank run / pit gravel", unit: "per ton", low: 12, high: 25, note: "Unprocessed sand-and-gravel mix; fill and sub-base" },
              { item: "Crusher run (dense-grade base)", unit: "per ton", low: 15, high: 30, note: "Stone + fines; compacts hard — the base workhorse" },
              { item: "Road base / item 4", unit: "per ton", low: 18, high: 35, note: "Spec'd blend for drives and lanes" },
              { item: "#57 crushed stone", unit: "per ton", low: 25, high: 45, note: "Clean 3/4–1 in; drainage and top layers" },
              { item: "Pea gravel", unit: "per ton", low: 30, high: 60, note: "Rounded 3/8 in; paths, patios, play areas" },
              { item: "River rock (1–3 in)", unit: "per ton", low: 45, high: 130, note: "Washed, rounded; beds and dry creeks" },
              { item: "Decorative stone (marble, lava, polished)", unit: "per ton", low: 50, high: 200, note: "Specialty deposits, long freight — accent use" },
            ]}
            caption="US bulk gate prices, mid-2026, before delivery. Quarry-dense regions sit at the low end; stone-poor regions at the high end."
          />
          <p className="text-muted-foreground">
            Read the table from the bottom up when planning a project: the expensive stone
            only ever needs to be the top two inches. Everything underneath can be crusher
            run at a fraction of the price — that single design decision is worth more than
            any negotiation, and the{" "}
            <a href={GRAVEL.costPerTon} className="font-medium text-primary hover:underline">
              cost-per-ton guide
            </a>{" "}
            builds on it.
          </p>
        </Section>

        <Section title="Average price per ton, compared">
          <BarChart
            title="Typical mid-range price per ton, 2026 (US bulk)"
            unit="$/ton"
            monochrome={false}
            data={[
              { label: "Recycled concrete (RCA)", value: 15 },
              { label: "Crusher run", value: 22 },
              { label: "Road base", value: 26 },
              { label: "#57 stone", value: 35 },
              { label: "Pea gravel", value: 45 },
              { label: "River rock", value: 88 },
              { label: "Decorative stone", value: 125 },
            ]}
          />
          <p className="text-muted-foreground">
            The pattern is consistent everywhere: the more processing (crushing, washing,
            screening for looks) and the farther the freight, the higher the bar. Function
            is cheap; appearance is expensive.
          </p>
        </Section>

        {/* FAQ position for this slug: mid-content */}
        <Faq items={faqItems} variant={faqVariant} title="Price questions" />

        <Section title="What actually drives gravel prices">
          <p className="text-muted-foreground">
            Three factors set nearly every quote. First, <strong>hauling distance</strong>:
            rock leaves the quarry at $10–20 a ton, and trucking adds roughly $0.15–0.30 per
            ton-mile — 30 miles of haul can double the price of cheap stone. Second,{" "}
            <strong>region</strong>: areas sitting on good limestone or granite have quarries
            every 20 miles and cheap stone; coastal plains and stone-poor states import by
            barge or rail and pay 30–50% more for identical material. Third,{" "}
            <strong>volume</strong>: quarries quote tiered prices, and a 20-ton tandem load
            routinely prices 15–25% under the 3-ton minimum-order rate per ton.
          </p>
          <InfoBlock title="The rock is cheap — moving it is not">
            USGS pegs the average US crushed stone value at the plant near $17 per ton. Every
            dollar above that in your quote is freight, handling and margin, which is why the
            single best predictor of your price is the distance to the nearest quarry — and
            why shopping two more suppliers routinely beats haggling with one.
          </InfoBlock>
        </Section>

        <Section title="Turning a table price into a local quote">
          <p className="text-muted-foreground">
            Use this table to budget, not to order. Call two quarries and one landscape yard
            with your tonnage and address, and ask for the delivered total — gate price,
            delivery fee and tax in one number. If a quote lands outside these ranges, ask
            why: an honest answer is usually freight distance or a minimum-order surcharge,
            both of which the{" "}
            <a href={GRAVEL.deliveryCost} className="font-medium text-primary hover:underline">
              delivery cost guide
            </a>{" "}
            shows you how to work around. To translate any per-ton price into a project
            budget, you need tonnage first.
          </p>
          <Cta
            variant={ctaVariant}
            title="Get your tonnage and total with the Gravel Cost Calculator"
            href={GRAVEL.cost}
          />
          <TipBlock title="Quote the delivered total, always">
            A $28/ton quarry 40 miles away and a $38/ton yard 5 miles away can land within
            dollars of each other once trucking is added. Per-ton prices are for comparing
            stone; delivered totals are for comparing suppliers.
          </TipBlock>
        </Section>

        <RelatedArticles
          title="Continue the cost series"
          variant={relatedStyle}
          items={pickLinks(costGuideLinks, GRAVEL.costPerTon, GRAVEL.deliveryCost, GRAVEL.budgetTips)}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.usgs, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
