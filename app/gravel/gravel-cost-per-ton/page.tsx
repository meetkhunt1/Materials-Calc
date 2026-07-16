import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock, TipBlock } from "@/components/blocks/callout";
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

const slug = "gravel-cost-per-ton";
const title = "Gravel Cost Per Ton (2026)";
const description =
  "2026 gravel prices per ton: crusher run $15–30, #57 stone $25–45, pea gravel $30–60, river rock $45–130 — plus gate vs delivered pricing, what a ton covers, and how to negotiate volume breaks.";
const path = GRAVEL.costPerTon;
const author = getAuthor("materials-team");
const datePublished = "2026-07-16";

// Deterministic per-slug variation (see lib/variation.ts)
const heroVariant = pick(slug, HERO_VARIANTS); // "compact"
const tocPosition = pick(slug, ["toc-right", "toc-left"] as const); // "toc-right"
const faqVariant = pick(slug, ["accordion", "list"] as const); // "accordion"
const relatedStyle = pick(slug, RELATED_STYLES); // "cards"
const ctaVariant = pick(slug, ["banner", "card", "inline"] as const); // "banner"

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: datePublished,
});

const faqItems: FaqItem[] = [
  {
    question: "How much is a ton of gravel in 2026?",
    answer:
      "At the gate: crusher run $15–30, #57 stone $25–45, pea gravel $30–60, river rock $45–130, decorative stone $50–200. Add a $50–150 delivery fee per trip. Regional spread is wide — quarry-dense areas sit at the low end, stone-poor regions 30–50% higher for identical material.",
  },
  {
    question: "What is the difference between gate price and delivered price?",
    answer:
      "Gate price is what you pay picking material up at the quarry scale; delivered price adds trucking. On small orders the gap is enormous: 3 tons of $25 crusher run is $75 at the gate but $175 delivered with a $100 fee — an effective $58 per ton. Always compare quotes as delivered totals for your specific tonnage.",
  },
  {
    question: "How much area does a ton of gravel cover?",
    answer:
      "Common gravel covers about 114 ft² at 2 inches deep, 76 ft² at 3 inches, and 57 ft² at 4 inches. Lighter pea gravel stretches a little further (about 125 ft² at 2 inches); dense compacted crusher run covers less. Coverage is how you convert a per-ton price into a per-square-foot budget.",
  },
  {
    question: "How many tons of gravel do I need?",
    answer:
      "Square feet × (depth in inches ÷ 12) × density in lb/ft³ ÷ 2,000, plus 10% for settling. For common gravel a quick shortcut is cubic yards × 1.4. A 300 ft² path at 3 inches needs about 4.3 tons; a full single-car driveway build runs 20–25 tons across its layers.",
  },
  {
    question: "Do quarries give volume discounts?",
    answer:
      "Routinely. Pricing is tiered by load: the minimum-order rate might be $32 per ton, a full 18-ton tri-axle $26, and 100+ tons quoted individually. Tiers are rarely advertised — ask the scale house directly for the full-truck rate and the next price break above your takeoff.",
  },
  {
    question: "Is buying gravel by the ton better than by the yard?",
    answer:
      "Tons are more precise because they come off a certified truck scale, while a loose yard depends on the loader operator's bucket. Quarries sell by the ton; landscape yards often sell by the yard. Neither is cheaper by nature — but you must convert to one unit before comparing quotes, at roughly 1.4 tons per cubic yard for common gravel.",
  },
];

const toc = tocFromTitles(
  "Price per ton by type (2026)",
  "Gate price vs delivered price",
  "Comparing quotes stated in different units",
  "What a ton actually covers",
  "Negotiating volume breaks",
);

export default function GravelCostPerTonPage() {
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
              title="Gravel cost per ton"
              description="The ton is the industry's native unit — it comes off a certified scale and it is how every quarry quotes. Here is what a ton costs in 2026, what it covers, and how to compare it against yard-priced quotes."
            >
              <AuthorBox author={author} variant="inline" datePublished={datePublished} />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Cost Per Ton", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Price per ton by type (2026)">
          <CostTable
            rows={[
              { item: "Recycled concrete aggregate", unit: "per ton", low: 10, high: 20, note: "Cheapest base material available" },
              { item: "Crusher run", unit: "per ton", low: 15, high: 30, note: "Base workhorse; compacts near-solid" },
              { item: "#57 crushed stone", unit: "per ton", low: 25, high: 45, note: "Clean stone for drainage and surfaces" },
              { item: "Pea gravel", unit: "per ton", low: 30, high: 60, note: "Rounded; paths, patios, play areas" },
              { item: "River rock", unit: "per ton", low: 45, high: 130, note: "Washed decorative; freight-heavy" },
              { item: "Decorative specialty stone", unit: "per ton", low: 50, high: 200, note: "Marble chips, lava, polished pebble" },
            ]}
            caption="US gate prices per ton, mid-2026, before delivery. The full type-by-type breakdown lives in the price guide."
          />
          <p className="text-muted-foreground">
            These are scale-house numbers. What you actually pay per ton depends on the two
            subjects the rest of this page covers: how the trucking is charged, and how big
            your order is.
          </p>
        </Section>

        <Section title="Gate price vs delivered price">
          <p className="text-muted-foreground">
            Every quarry has two prices. The <strong>gate price</strong> is per ton across
            the scale, loaded into whatever you drove in. The <strong>delivered price</strong>{" "}
            adds a $50–150 per-trip trucking fee — a fixed cost that gets divided by your
            tonnage. Small orders therefore pay wildly more per ton than the sticker
            suggests: $25 stone delivered as a 3-ton load with a $100 fee is really $58 a
            ton, while the same stone on a full 18-ton tri-axle is $31.
          </p>
          <InfoBlock title="The effective per-ton rule">
            Effective price per ton = gate price + (delivery fee ÷ tons ordered). Run this
            one line on every quote before comparing anything — it is the difference between
            comparing stone and comparing suppliers. The delivery cost guide covers the fee
            structures themselves.
          </InfoBlock>
        </Section>

        <Section title="Comparing quotes stated in different units">
          <ExampleBlock
            scenario="Supplier A quotes #57 stone at $34 per ton delivered. Supplier B quotes $44 per cubic yard delivered. Which is cheaper for a 10-ton job?"
            steps={[
              { label: "Put both in tons", work: "#57 runs ≈1.35 tons per loose cubic yard" },
              { label: "Convert Supplier B", work: "$44 ÷ 1.35 = $32.60 per ton equivalent" },
              { label: "Compare like for like", work: "$34.00 (A) vs $32.60 (B) per ton" },
              { label: "Check the job total", work: "10 tons: A = $340, B ≈ $326" },
            ]}
            result="Supplier B wins by about $14 — the opposite of what the raw stickers ($34 vs $44) suggest. Never compare a ton price against a yard price without converting; the density factor is the whole answer."
          />
          <p className="text-muted-foreground">
            The conversion factor changes with material — 1.3 for pea gravel, 1.35–1.4 for
            clean stone, up to 1.9 for compacted crusher run. The{" "}
            <a href={GRAVEL.costPerYard} className="font-medium text-primary hover:underline">
              cost-per-cubic-yard guide
            </a>{" "}
            works the same comparison from the other direction.
          </p>
        </Section>

        <Section title="What a ton actually covers">
          <CoverageTable
            headers={["Depth", "Coverage per ton", "Typical use"]}
            rows={[
              { label: "2 inches", spec: "≈114 ft²", coverage: "Decorative top-dressing over fabric" },
              { label: "3 inches", spec: "≈76 ft²", coverage: "Paths, patios, play areas" },
              { label: "4 inches", spec: "≈57 ft²", coverage: "One compacted driveway lift" },
              { label: "6 inches", spec: "≈38 ft²", coverage: "Heavy-duty base, parking pads" },
            ]}
            caption="Common gravel at 105 lb/ft³ loose. Pea gravel stretches ~10% further; compacted crusher run covers ~15% less."
          />
          <TipBlock title="Think in dollars per square foot">
            Divide the delivered per-ton price by the coverage at your depth. $40-a-ton
            stone at 3 inches deep is $40 ÷ 76 ≈ $0.53 per square foot of material — the
            number that makes gravel comparable to mulch, pavers or concrete at a glance.
          </TipBlock>
        </Section>

        <Section title="Negotiating volume breaks">
          <p className="text-muted-foreground">
            Quarry pricing is tiered, and the tiers are rarely posted. Three questions to
            the scale house move most quotes: What is the full-truck rate? — an 18-ton
            tri-axle load routinely prices 15–25% under the minimum-order rate. Where is the
            next price break? — if your takeoff says 14 tons and the break is at 16, the
            extra two tons of base stone often cost less than the price difference on the
            whole order. And can you piggyback? — a truck already delivering to your area
            quotes cheaper freight. None of this is haggling; it is asking for the price
            sheet the contractors use.
          </p>
        </Section>

        {/* FAQ position for this slug: after-content */}
        <Faq items={faqItems} variant={faqVariant} />

        <Cta
          variant={ctaVariant}
          title="Turn tons into a total"
          description="Enter dimensions and your local per-ton price — the calculator handles density, waste and delivery."
          href={GRAVEL.cost}
          buttonLabel="Gravel Cost Calculator"
        />

        <RelatedArticles
          title="Continue the cost series"
          variant={relatedStyle}
          items={pickLinks(costGuideLinks, GRAVEL.costPerYard, GRAVEL.priceGuide, GRAVEL.deliveryCost)}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.usgs, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
