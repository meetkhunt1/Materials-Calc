import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { WarningBlock } from "@/components/blocks/callout";
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
import { GRAVEL, costGuideLinks, coreGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-cost-per-cubic-yard";
const title = "Gravel Cost Per Cubic Yard (2026)";
const description =
  "2026 gravel prices per cubic yard: crusher run $20–45, #57 stone $35–65, pea gravel $40–80, river rock $60–180 — plus the yard-to-ton conversion, the classic quote-comparison trap, and a worked example.";
const path = GRAVEL.costPerYard;
const author = getAuthor("materials-team");
const datePublished = "2026-07-16";

// Deterministic per-slug variation (see lib/variation.ts)
const heroVariant = pick(slug, HERO_VARIANTS); // "standard"
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
    question: "How much is a cubic yard of gravel in 2026?",
    answer:
      "Roughly 1.4 times the per-ton price, because a loose cubic yard of common gravel weighs about 1.4 tons. That gives crusher run $20–45 per yard, #57 stone $35–65, pea gravel $40–80, and river rock $60–180 — before a $50–150 delivery fee.",
  },
  {
    question: "How many tons are in a cubic yard of gravel?",
    answer:
      "About 1.4 US tons (2,800 lb) for common gravel, loose. Pea gravel is lighter at roughly 1.3 tons per yard, clean #57 stone about 1.35, and compacted crusher run up to 1.9. The exact factor is the material's density — it is the bridge between every yard quote and every ton quote.",
  },
  {
    question: "How do I convert a per-yard price to a per-ton price?",
    answer:
      "Divide the yard price by the material's tons-per-yard factor. A $49-per-yard quote for common gravel is $49 ÷ 1.4 = $35 per ton. Going the other way, multiply: $30 per ton × 1.4 = $42 per yard. Match the factor to the specific stone — using 1.4 for everything misprices pea gravel and crusher run in opposite directions.",
  },
  {
    question: "How much area does a cubic yard of gravel cover?",
    answer:
      "A cubic yard is 27 cubic feet, so it covers 162 ft² at 2 inches deep, 108 ft² at 3 inches, and 81 ft² at 4 inches — for any material, since volume does not care about density. That universality is why landscape yards like the unit: one coverage chart works for mulch, soil and stone alike.",
  },
  {
    question: "Why did my supplier's yard measure look small?",
    answer:
      "A loose yard is measured by loader bucket, not by scale, and material consolidates in the truck on the ride over. A legitimate yard can arrive looking like 10% less than you pictured. This is normal settling, not shorting — but it is also why quarries selling by certified scale weight are the more precise option for big orders.",
  },
  {
    question: "Is it cheaper to buy gravel by the yard or by the ton?",
    answer:
      "Neither unit is inherently cheaper — they are the same stone measured differently. What matters is converting both quotes to one unit before comparing. As a rule, quarries quote tons off a scale and landscape yards quote loose yards off a bucket; the ton is more precise, the yard is more intuitive for coverage math.",
  },
];

const toc = tocFromTitles(
  "Price per cubic yard by type (2026)",
  "Converting yard prices to ton prices",
  "The quote-comparison trap",
  "Worked example: two quotes, one answer",
);

export default function GravelCostPerCubicYardPage() {
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
              title="Gravel cost per cubic yard"
              description="Landscape yards sell by the loose cubic yard; quarries sell by the ton. One density factor — about 1.4 tons per yard — connects the two prices, and not applying it is the most expensive mistake in gravel shopping."
            >
              <AuthorBox author={author} variant="inline" datePublished={datePublished} />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Cost Per Cubic Yard", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Price per cubic yard by type (2026)">
          <CostTable
            rows={[
              { item: "Crusher run", unit: "per yd³", low: 20, high: 45, note: "≈1.4–1.9 t/yd³ depending on compaction" },
              { item: "#57 crushed stone", unit: "per yd³", low: 35, high: 65, note: "≈1.35 t/yd³ loose" },
              { item: "Pea gravel", unit: "per yd³", low: 40, high: 80, note: "≈1.3 t/yd³ — the lightest common type" },
              { item: "River rock", unit: "per yd³", low: 60, high: 180, note: "Washed decorative; freight sets the ceiling" },
              { item: "Decorative specialty stone", unit: "per yd³", low: 70, high: 280, note: "Marble chips, lava rock, polished pebble" },
            ]}
            caption="US bulk pricing per loose cubic yard, mid-2026, before delivery. Each figure is simply the per-ton price × the material's tons-per-yard factor."
          />
          <p className="text-muted-foreground">
            One cubic yard covers 162 ft² at 2 inches, 108 ft² at 3 inches, or 81 ft² at 4
            inches — identical for every material, which is the yard&apos;s great virtue as a
            unit. The per-ton counterparts to this table live in the{" "}
            <a href={GRAVEL.costPerTon} className="font-medium text-primary hover:underline">
              cost-per-ton guide
            </a>
            .
          </p>
        </Section>

        <Section title="Converting yard prices to ton prices">
          <FormulaBlock
            formula="$/ton = $/yd³ ÷ (tons per yd³)   ·   $/yd³ = $/ton × (tons per yd³)"
            variables={[
              { symbol: "common gravel", meaning: "1.4 tons per cubic yard", unit: "loose" },
              { symbol: "pea gravel", meaning: "1.3 tons per cubic yard", unit: "loose" },
              { symbol: "#57 stone", meaning: "1.35 tons per cubic yard", unit: "loose" },
              { symbol: "crusher run", meaning: "1.4 loose / up to 1.9 compacted", unit: "t/yd³" },
            ]}
            note="The factor is just density: 105 lb/ft³ × 27 ft³ = 2,835 lb ≈ 1.4 US tons per loose cubic yard of common gravel. Look up other materials in the gravel density chart before converting."
          />
        </Section>

        <Section title="The quote-comparison trap">
          <p className="text-muted-foreground">
            The trap looks like this: a landscape yard quotes $52 per cubic yard, a quarry
            quotes $38 per ton, and the yard quote gets rejected as 37% more expensive. But
            those units differ by a factor of 1.4 — the yard quote is really $37 per ton,
            making the two suppliers essentially tied before delivery fees. People fall for
            it in both directions: yard prices always <em>look</em> higher than they are,
            and ton prices always look lower.
          </p>
          <WarningBlock title="Never compare across units">
            A per-yard number will always be roughly 30–40% bigger than the same stone&apos;s
            per-ton number — that is density, not markup. Convert every quote to one unit
            (and to a delivered total for your tonnage) before ranking suppliers. Thirty
            seconds of arithmetic regularly reverses the answer.
          </WarningBlock>
        </Section>

        <Section title="Worked example: two quotes, one answer">
          <ExampleBlock
            scenario="You need gravel for a 12 × 25 ft parking pad at 4 inches — 100 ft³ = 3.7 yd³, or about 5.2 tons of common gravel. Supplier A: $52/yd³ plus $75 delivery. Supplier B: $34/ton plus $110 delivery."
            steps={[
              { label: "Supplier A total", work: "3.7 yd³ × $52 = $192 + $75 = $267 delivered" },
              { label: "Supplier B total", work: "5.2 t × $34 = $177 + $110 = $287 delivered" },
              { label: "Sanity-check the units", work: "A: $52 ÷ 1.4 = $37/t · B: $34/t — B looks cheaper per ton" },
              { label: "But delivery flips it", work: "B's higher trucking fee erases its $3/ton material edge on a 5-ton job" },
            ]}
            result="Supplier A wins by $20 despite the scarier sticker price. Two conversions decide every gravel comparison: units to units, and quote to delivered total. Do both, every time."
          />
        </Section>

        {/* FAQ position for this slug: after-content */}
        <Faq items={faqItems} variant={faqVariant} />

        <Cta
          variant={ctaVariant}
          title="Skip the hand conversions"
          description="The Gravel Cost Calculator takes yards or tons, applies the right density, and prices the whole job."
          href={GRAVEL.cost}
          buttonLabel="Gravel Cost Calculator"
        />

        <RelatedArticles
          title="Keep comparing like a pro"
          variant={relatedStyle}
          items={[
            ...pickLinks(costGuideLinks, GRAVEL.costPerTon, GRAVEL.priceGuide),
            ...pickLinks(coreGuideLinks, GRAVEL.densityChart),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.astmC29, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
