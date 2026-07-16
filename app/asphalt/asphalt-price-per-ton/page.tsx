import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock } from "@/components/blocks/callout";
import { CostTable } from "@/components/tables/cost-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, costGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import { CONCRETE } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Price Per Ton (2026)";
const description =
  "2026 hot mix asphalt prices per ton at the plant: standard, polymer-modified, warm mix, cold patch and millings — plus the binder index that moves them and how to get a real local quote.";
const path = ASPHALT.pricePerTon;
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
    question: "How much is a ton of asphalt in 2026?",
    answer:
      "Standard hot mix runs $100–150 per ton picked up at the plant in most US markets. Binder and base mixes sit $5–10 under surface mix because they use larger, cheaper aggregate and slightly less liquid binder. Delivered pricing adds $8–20 per ton in trucking depending on distance, and small orders may carry a plant minimum.",
  },
  {
    question: "How much area does one ton of asphalt cover?",
    answer:
      "At compacted density of roughly 145 lb per cubic foot, one ton covers about 80 square feet at 2 inches thick and about 55 square feet at 3 inches. Coverage is the bridge between the per-ton price plants quote and the per-square-foot price homeowners think in — run the conversion before comparing bids.",
  },
  {
    question: "Do asphalt plants sell to homeowners?",
    answer:
      "Most do, for pickup in a truck or trailer that can legally carry the load. Expect a 1–2 ton minimum, cash-or-card terms, and mix loaded at 300°F — you have roughly 60–90 minutes of workable time in mild weather. For anything beyond a small patch, a contractor with a paver will beat hand work on both quality and compaction.",
  },
  {
    question: "Why did my quote change from last month?",
    answer:
      "Liquid asphalt binder is refined from crude oil and repriced monthly by most plants. At $600–700 per ton and 5–6% of mix weight, binder alone is $30–42 of every ton of hot mix, so a 15% crude move shifts finished mix by several dollars per ton. Large projects handle this with a binder price-adjustment clause instead of re-quoting.",
  },
  {
    question: "Are asphalt millings worth buying?",
    answer:
      "At $10–25 per ton, millings are the cheapest paving material available and work well for rural drives, farm lanes and parking pads. They are reclaimed pavement, not new mix: they need compaction while warm or with a binder rejuvenator to knit together, and they will never match hot mix for a finished surface.",
  },
  {
    question: "Is warm mix asphalt cheaper than hot mix?",
    answer:
      "Usually within $5 per ton either way. Warm mix is produced 50–100°F cooler, which saves plant fuel but adds additive cost — the two roughly cancel. Its real value is longer haul distances and a wider paving window in cool weather, not a lower sticker price.",
  },
];

const toc = tocFromTitles(
  "Price per ton by product (2026)",
  "The binder index: why prices move",
  "How to get a real local price",
  "Worked example: pickup vs delivered",
);

export default function AsphaltPricePerTonPage() {
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
              eyebrow="Asphalt · Cost Series"
              variant="stat-strip"
              title="Asphalt price per ton, 2026"
              description="Plants quote by the ton, contractors bid by the square foot, and the binder market moves both. Here are the current per-ton numbers and the mechanics behind them."
              stats={[
                { value: "$100–150", label: "per ton hot mix, at plant" },
                { value: "$150–250", label: "per-ton equiv., bagged cold patch" },
                { value: "5–6%", label: "of mix weight is liquid binder" },
                { value: "±40%", label: "regional price swing" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Price Per Ton", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Price per ton by product (2026)">
          <CostTable
            currency="USD"
            rows={[
              { item: "Standard HMA surface mix", unit: "ton", low: 100, high: 150, note: "9.5–12.5 mm dense-graded; the default quote" },
              { item: "Binder / base course mix", unit: "ton", low: 95, high: 140, note: "Coarser stone, less binder — $5–10 under surface" },
              { item: "Polymer-modified (PG+) mix", unit: "ton", low: 115, high: 180, note: "+$15–30 over standard; heavy traffic, hot climates" },
              { item: "Warm mix asphalt", unit: "ton", low: 100, high: 155, note: "±$0–5 vs hot mix; longer haul window" },
              { item: "Cold patch, bagged", unit: "ton", low: 150, high: 250, note: "Per-ton equivalent at $4–6 per 50 lb bag" },
              { item: "Asphalt millings (RAP)", unit: "ton", low: 10, high: 25, note: "Reclaimed; availability tracks local milling work" },
            ]}
            caption="US plant-gate pricing, mid-2026, before trucking. Metro plants with binder terminals nearby sit at the low end; remote plants at the high end."
          />
          <p className="text-muted-foreground">
            Where you sit inside these ranges is mostly geography — plant density, binder
            terminal distance and season length. The{" "}
            <a href={ASPHALT.regionalPrices} className="font-medium text-primary hover:underline">
              regional price factors guide
            </a>{" "}
            breaks down the ±40% swing. If you are weighing asphalt against a concrete slab,
            the{" "}
            <a href={CONCRETE.cost} className="font-medium text-primary hover:underline">
              concrete cost guide
            </a>{" "}
            is the per-yard counterpart to this page.
          </p>
        </Section>

        <Section title="The binder index: why prices move">
          <InfoBlock title="Liquid asphalt tracks crude oil">
            The binder in hot mix is a refinery product priced around $600–700 per ton in
            2026, and it makes up 5–6% of mix weight. That puts $30–42 of binder in every
            ton of finished mix — the single most volatile line in the plant&apos;s cost.
            Plants re-quote monthly against a published binder index, and any job big enough
            to span quote periods should carry a price-adjustment clause so neither side
            eats the swing.
          </InfoBlock>
          <p className="text-muted-foreground">
            The remainder of the ton is aggregate (cheap but freight-sensitive), burner fuel
            to hit 300°F, and plant overhead. Aggregate and fuel move slowly; binder moves
            with the oil market. When a contractor says the price is only good for 30 days,
            that is not a sales tactic — it is how their plant quotes them.
          </p>
        </Section>

        <Section title="How to get a real local price">
          <p className="text-muted-foreground">
            Published averages get you to a budget; only a phone call gets you to a number.
            Call the nearest hot mix plant — not a contractor — and ask three things: the
            per-ton price for standard surface mix, the pickup vs delivered difference, and
            the minimum order. Plants typically charge $8–20 per ton for trucking depending
            on distance, and many carry a 1–2 ton pickup minimum or a $150–300 small-load
            fee. Ask whether the quote is this month&apos;s price and when it resets.
          </p>
          <p className="text-muted-foreground">
            Two more questions worth asking: whether they sell millings (often first-come,
            priced by the loader bucket), and whether a nearby paving job could piggyback
            your tonnage — a plant already trucking to your area quotes delivery cheaper.
          </p>
        </Section>

        <Section title="Worked example: pickup vs delivered">
          <ExampleBlock
            scenario="You need 10 tons of surface mix for a parking pad. Plant price $120/ton pickup; delivered adds $15/ton for the 18-mile haul."
            steps={[
              { label: "Pickup material cost", work: "10 × $120 = $1,200" },
              { label: "Pickup hauling reality", work: "3-ton dump trailer → 4 round trips × 45 min, mix cooling the whole time" },
              { label: "Trailer rental + fuel", work: "$120 + $60 = $180, and the last load arrives marginal for compaction" },
              { label: "Delivered cost", work: "10 × ($120 + $15) = $1,350 in one hot load" },
            ]}
            result="Delivered wins: $1,350 in one hot load vs $1,380 all-in for pickup — and every ton arrives at temperature. Under ~5 tons with your own truck, pickup pencils out; at 10 tons, pay for the truck."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Turn tons into dollars"
          description="Enter your area, thickness and local per-ton price — the calculator handles density and waste."
          href={ASPHALT.cost}
          buttonLabel="Asphalt Cost Calculator"
        />

        <RelatedArticles
          title="Continue the cost series"
          variant="cards"
          items={pickLinks(costGuideLinks, ASPHALT.costPerSqft, ASPHALT.regionalPrices, ASPHALT.costSaving)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
