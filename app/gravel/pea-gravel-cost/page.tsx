import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock } from "@/components/blocks/callout";
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
import { GRAVEL, peaGuideLinks, costGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const title = "Pea Gravel Cost: $30–60 per Ton (2026 Prices)";
const description =
  "Bulk pea gravel costs $30–60 per ton or $40–80 per cubic yard in 2026, and bags run $4–7 each. See delivery fees, the bag vs bulk crossover and a patio example.";
const path = GRAVEL.peaCost;
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
    question: "How much does a ton of pea gravel cost?",
    answer:
      "Bulk pea gravel runs $30–60 per ton at the yard in most markets, plus $50–150 for delivery. Since a ton covers about 125 ft² at 2 inches deep, material for a typical garden path lands under $100 before delivery. Quarry-direct gate prices can run well below landscape-yard prices.",
  },
  {
    question: "How much is pea gravel per cubic yard?",
    answer:
      "About $40–80 per cubic yard in bulk. A cubic yard of pea gravel weighs about 1.3 tons, so yard pricing is roughly 1.3 times the ton price. Always confirm which unit a quote uses; comparing one supplier's ton price against another's yard price is the classic estimating trap.",
  },
  {
    question: "How much does pea gravel cost per square foot?",
    answer:
      "About $0.35–0.75 per square foot for bulk material at 3 inches deep, because one ton ($30–60) covers roughly 83 ft² at that depth. Bagged stone costs 4–6 times more per square foot. Installed with a base and edging, a DIY pea gravel patio lands around $2–5 per square foot.",
  },
  {
    question: "What does pea gravel delivery cost?",
    answer:
      "Typically $50–150 as a flat fee within a supplier's radius, sometimes waived above a tonnage minimum. The fee is per trip, not per ton, so consolidating base stone and pea gravel into one delivery (or one order with a split load) cuts the effective cost per ton substantially.",
  },
  {
    question: "Why is colored or polished pea gravel so expensive?",
    answer:
      "Because decorative grades (white marble pea, polished river pebble, jet black) are specialty products that ship long distances from specific deposits, and most sell bagged only, expect 2–4 times the price of ordinary local pea gravel. Use them as accent top layers over cheap stone, not full-depth fill.",
  },
  {
    question: "Is pea gravel cheaper than pavers or concrete?",
    answer:
      "Yes, dramatically. A pea gravel patio installs for $2–5 per square foot DIY including base and edging, against $15–30 per square foot for pavers and several times the gravel price for plain concrete. The trade is maintenance: raking, top-ups and edging repairs that hard surfaces never ask for.",
  },
];

const toc = tocFromTitles(
  "Bulk pricing: per ton and per yard",
  "Bagged pricing",
  "Bags vs bulk: a 200 ft² patio",
  "The crossover math",
);

export default function PeaGravelCostPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
          datePublished: "2026-07-15",
          dateModified: "2026-10-24",
          author,
        })}
      />
      <ArticleShell
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Pea Gravel"
              variant="stat-strip"
              title="Pea gravel cost (2026)"
              description="The same stone costs $35 a ton at the quarry gate and $290 a ton in bags at the big-box store. Here is the full price map, plus the crossover point where bulk starts winning."
              stats={[
                { value: "$30–60", label: "per ton, bulk" },
                { value: "$4–7", label: "per 0.5 ft³ bag" },
                { value: "≈42", label: "bags in a ton" },
                { value: "~15 bags", label: "bag-to-bulk crossover" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Pea Gravel Cost", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <QuickAnswer
          question="How much does pea gravel cost?"
          answer="Bulk pea gravel costs about $30–60 per ton, or roughly $40–80 per cubic yard, in 2026, plus a flat $50–150 delivery fee per trip. Retail 0.5 ft³ bags cost $4–7 each and about 42 make a ton, so bagged pea gravel costs 4–6 times more and only pays off below about 15 bags."
          ruleOfThumb="One ton of pea gravel covers about 83 ft² at 3 in deep."
          formula="Cost = tons × price per ton + delivery fee"
        />

        <Section title="Bulk pricing: per ton and per yard">
          <CostTable
            rows={[
              { item: "Pea gravel, bulk", unit: "per ton", low: 30, high: 60, note: "Landscape yard or quarry; regional deposits set the price" },
              { item: "Pea gravel, bulk", unit: "per yd³", low: 40, high: 80, note: "A yard ≈ 1.3 tons, so yard price ≈ 1.3× ton price" },
              { item: "Delivery", unit: "per trip", low: 50, high: 150, note: "Flat fee; often waived above a tonnage minimum" },
            ]}
            caption="2026 bulk pricing. One ton covers ≈125 ft² at 2 in or 83 ft² at 3 in."
          />
          <p className="text-muted-foreground">
            Bulk pea gravel runs $30–60 a ton, and the price swings with hauling distance
            more than anything else, which is why the
            wider{" "}
            <a href={GRAVEL.priceGuide} className="font-medium text-primary hover:underline">
              gravel price guide
            </a>{" "}
            and the{" "}
            <a href={GRAVEL.deliveryCost} className="font-medium text-primary hover:underline">
              delivery cost guide
            </a>{" "}
            are worth ten minutes before you order. The delivery line item routinely exceeds
            the material on small jobs.
          </p>
        </Section>

        <Section title="Bagged pricing">
          <CostTable
            rows={[
              { item: "Pea gravel, bagged", unit: "0.5 ft³ bag", low: 4, high: 7, note: "≈42 bags per ton; covers 3 ft² at 2 in" },
              { item: "Pea gravel, pallet", unit: "≈56 bags", low: 200, high: 350, note: "Modest per-bag discount; forklift unload" },
              { item: "Colored / polished pea", unit: "0.5 ft³ bag", low: 10, high: 25, note: "Specialty deposits, 2–4× ordinary pea" },
            ]}
            caption="Retail bag pricing. Bags trade a 4–6× material markup for zero delivery fee and sedan-trunk logistics."
          />
        </Section>

        <Section title="Bags vs bulk: a 200 ft² patio">
          <BarChart
            title="Total cost, 200 ft² patio at 3 in deep (50 ft³ of stone)"
            unit="$"
            data={[
              { label: "Bags (100 × $5)", value: 500 },
              { label: "Bulk delivered (2.4 t + $75)", value: 180 },
            ]}
          />
          <p className="text-muted-foreground">
            At patio scale the answer is not close: 50 ft³ is 100 bags at roughly $500, or
            about 2.4 tons of bulk stone at $45/ton plus a $75 delivery, around $180 landed.
            Bulk saves 60% and spares you lifting a hundred 50 lb bags.
          </p>
        </Section>

        <Section title="The crossover math">
          <ExampleBlock
            scenario="Where exactly do bags stop making sense? Compare a bag order against the smallest sensible bulk order: 1 ton delivered."
            steps={[
              { label: "Bulk floor price", work: "1 ton ($45) + delivery ($75) = $120 minimum, covers 125 ft² at 2 in" },
              { label: "Bag equivalent", work: "$120 ÷ $5.50 avg per bag ≈ 22 bags = 11 ft³" },
              { label: "But bags also cost time", work: "22 bags ≈ 2 store runs, loading and hauling, so call the practical break-even ~15 bags" },
              { label: "The rule", work: "Under ~15 bags (7.5 ft³, ~50 ft² at 2 in): buy bags. Over: order bulk" },
            ]}
            result="Roughly 15 bags is the crossover. Below it, bags dodge the delivery fee; above it, bulk wins on both money and your back."
          />
          <TipBlock title="Make three phone calls">
            Call two landscape yards and one quarry before ordering. The quarry gate price is
            often half the landscape-yard price for identical stone. If you can borrow a
            trailer and haul a ton yourself, the savings pay for the afternoon.
          </TipBlock>
        </Section>

        <Faq items={faqItems} variant="accordion" title="Cost questions" />

        <Cta
          variant="banner"
          title="Price your exact project"
          description="Get tonnage, yardage and bag counts from your dimensions, then apply local prices."
          href={GRAVEL.pea}
          buttonLabel="Open the Pea Gravel Calculator"
        />

        <RelatedArticles
          title="Budget the rest of the job"
          variant="cards"
          items={[
            ...pickLinks(peaGuideLinks, GRAVEL.peaCoverage, GRAVEL.peaInstall),
            ...pickLinks(costGuideLinks, GRAVEL.priceGuide),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

        <References items={[GREFS.usgs, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
