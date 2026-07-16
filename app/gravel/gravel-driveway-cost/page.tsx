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
  drivewayGuideLinks,
  costGuideLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-driveway-cost";
const title = "Gravel Driveway Cost — 2026 Installed Pricing";
const description =
  "What a gravel driveway costs in 2026: $1–3 per ft² installed for a standard build, every line item priced (excavation, fabric, stone per layer, grading, compaction), a worked 12 × 50 ft budget, and the honest DIY-vs-contractor math.";
const path = GRAVEL.drivewayCost;
const author = getAuthor("materials-team");
const datePublished = "2026-07-16";

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
  publishedTime: datePublished,
});

const faqItems: FaqItem[] = [
  {
    question: "How much does a gravel driveway cost per square foot?",
    answer:
      "A standard two-layer build on firm soil runs $1–3 per square foot installed in 2026. A three-layer build on clay with geotextile fabric runs $3–5, and difficult access, long culverts or heavy excavation can push past that. Material alone (stone delivered) is typically $0.60–1.50 per square foot of the total.",
  },
  {
    question: "How much does a 12 × 50 ft gravel driveway cost?",
    answer:
      "About $1,000–1,800 installed for a standard 8 in two-layer build on firm soil — roughly 28 tons of stone at $700–1,100 delivered, plus excavation, grading and compaction. DIY with rented equipment, the same drive lands near $1,100–1,400; a contractor quote of $1,500–2,200 is fair once fabric or extra depth enters the picture.",
  },
  {
    question: "Is a gravel driveway cheaper than asphalt or concrete?",
    answer:
      "By a wide margin up front: gravel at $1–3 per ft² versus asphalt at $7–13 and concrete at $8–15. The trade is maintenance — gravel wants regrading every 1–2 years and a top-up every 2–3 — but even with 25 years of top-ups a gravel drive usually stays the cheapest total-cost option for long rural runs.",
  },
  {
    question: "How many tons of gravel does a driveway need?",
    answer:
      "Roughly 4.5–5.5 tons per 100 ft² for a full 8 in two-layer build, or about 2.5–3 tons per 100 ft² for a 4 in single-layer refresh over an existing base. A typical 600 ft² single-car drive therefore needs 27–33 tons new, or 7–8 tons as a 2 in top-up.",
  },
  {
    question: "What does gravel driveway excavation cost?",
    answer:
      "Contractors charge $1–2 per square foot to strip topsoil and cut to grade in normal conditions. DIY, a skid steer or compact tractor rents for $250–400 a day and a competent operator clears a 600 ft² drive in a day — but haul-off of spoil, if you cannot spread it on site, can add $300–600.",
  },
  {
    question: "Does a gravel driveway add value to a property?",
    answer:
      "On rural and semi-rural lots, a well-built and well-drained gravel drive is expected infrastructure and appraises as such; a rutted one reads as deferred maintenance. In suburban markets buyers generally expect pavement, so gravel is priced as a placeholder. The value case is strongest where the drive is long — exactly where paving is unaffordable.",
  },
];

const toc = tocFromTitles(
  "Installed cost per square foot",
  "Every line item, priced",
  "Worked budget: a 12 × 50 ft driveway",
  "DIY vs contractor",
  "Where quotes hide the money",
);

export default function GravelDrivewayCostPage() {
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
              eyebrow="Gravel · Driveways"
              variant={heroVariant}
              title="Gravel driveway cost (2026)"
              description="A gravel drive is the cheapest driveway money can build — $1–3 per square foot installed — but only if you know what each line item should cost. Here is the full budget, item by item."
              stats={[
                { value: "$1–3", label: "per ft² installed, standard build" },
                { value: "$3–5", label: "per ft², clay / three-layer" },
                { value: "≈28 t", label: "stone for a 12 × 50 ft drive" },
                { value: "30–60%", label: "typical DIY saving" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Gravel Driveway Cost", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Installed cost per square foot">
          <p className="text-muted-foreground">
            The 2026 market rate for a professionally built gravel driveway is $1–3 per
            square foot for the standard build: strip, grade, 8 in of stone in two
            compacted layers, crowned. The number climbs to $3–5 where the site demands
            the full{" "}
            <a href={GRAVEL.drivewayLayers} className="font-medium text-primary hover:underline">
              three-layer system
            </a>{" "}
            with geotextile — clay soil, wet ground or truck traffic. A simple 2 in
            top-up of an existing sound drive is far cheaper: $0.40–0.80 per square
            foot, mostly material.
          </p>
          <p className="text-muted-foreground">
            Two variables dominate every estimate: depth (each extra inch of crusher
            run adds about 2.9 tons per 500 ft² — see the{" "}
            <a href={GRAVEL.drivewayDepth} className="font-medium text-primary hover:underline">
              depth guide
            </a>
            ) and hauling distance, which sets both the stone price and the delivery
            fee.
          </p>
        </Section>

        <Section title="Every line item, priced">
          <CostTable
            rows={[
              {
                item: "Excavation & rough grading",
                unit: "per ft²",
                low: 1,
                high: 2,
                note: "Strip topsoil, cut to grade; DIY skid steer rental $250–400/day",
              },
              {
                item: "Geotextile fabric",
                unit: "per ft²",
                low: 0.3,
                high: 0.5,
                note: "Woven separation fabric; required on clay or soft soil",
              },
              {
                item: "#3 base stone, delivered",
                unit: "per ton",
                low: 25,
                high: 40,
                note: "Bottom layer; ~7.7 tons per 400 ft² at 4 in",
              },
              {
                item: "#57 stone, delivered",
                unit: "per ton",
                low: 30,
                high: 50,
                note: "Middle layer; ~6 tons per 400 ft² at 3 in",
              },
              {
                item: "Crusher run surface, delivered",
                unit: "per ton",
                low: 22,
                high: 40,
                note: "Wear course; ~5 tons per 400 ft² at 2 in",
              },
              {
                item: "Final grading & crowning",
                unit: "per ft²",
                low: 0.3,
                high: 0.6,
                note: "Shaping the 2–3% crown; often bundled with spreading",
              },
              {
                item: "Compaction",
                unit: "per day (rental)",
                low: 90,
                high: 160,
                note: "Plate compactor or walk-behind roller, per layer",
              },
              {
                item: "Delivery fee",
                unit: "per truckload",
                low: 50,
                high: 150,
                note: "Flat per trip — consolidate loads where possible",
              },
            ]}
            caption="2026 line-item pricing. Contractor quotes bundle these; DIY budgets pay them separately."
          />
        </Section>

        <Section title="Worked budget: a 12 × 50 ft driveway">
          <ExampleBlock
            scenario="A 12 × 50 ft (600 ft²) single-car drive on firm, well-drained soil: standard 8 in two-layer build — 4 in of #57 base under 4 in of crusher run — with a 10% allowance on stone."
            steps={[
              {
                label: "Excavation & grading",
                work: "600 ft² × $1.00–1.50 = $600–900 (or DIY: $350 machine rental + a weekend)",
              },
              {
                label: "#57 base, 4 in at 109 lb/ft³",
                work: "600 × (4÷12) × 109 ÷ 2,000 × 1.10 ≈ 12.0 tons × $30–50 = $360–600",
              },
              {
                label: "Crusher run surface, 4 in at 140 lb/ft³",
                work: "600 × (4÷12) × 140 ÷ 2,000 × 1.10 ≈ 15.4 tons × $22–40 = $340–620",
              },
              {
                label: "Delivery",
                work: "2 tandem loads × $75 avg = $150 (often folded into per-ton price)",
              },
              {
                label: "Compaction & crowning",
                work: "$120 compactor rental (DIY) or ~$300 in a contractor bid",
              },
            ]}
            result="DIY total ≈ $1,300–1,800 including the machine rental; a fair contractor quote lands around $1,500–2,200 ($2.50–3.70/ft²). On clay, add fabric ($180–300) and a #3 sub-base (≈11.5 tons, $290–460)."
          />
        </Section>

        <Section title="DIY vs contractor">
          <p className="text-muted-foreground">
            Gravel is the most DIY-friendly driveway material by far — no hot mix, no
            cure windows, no finishing skill. The honest split: DIY saves 30–60% and
            costs two to three full days of machine work, and the quality risk sits
            almost entirely in two invisible steps — grading a true 2–3% crown, and
            compacting every layer separately. A contractor with a laser level and a
            ride-on roller does both better than a first-timer.
          </p>
          <p className="text-muted-foreground">
            The hybrid approach usually wins on value: hire out the excavation and
            rough grading (the machine-and-judgment phase), then spread and compact the
            stone yourself layer by layer following the{" "}
            <a href={GRAVEL.drivewayInstall} className="font-medium text-primary hover:underline">
              installation guide
            </a>
            . Labor rates for the spreading phase are broken out in the{" "}
            <a href={GRAVEL.laborCost} className="font-medium text-primary hover:underline">
              gravel labor cost guide
            </a>
            .
          </p>
        </Section>

        <Section title="Where quotes hide the money">
          <TipBlock title="Make every bid itemize depth and tons">
            &quot;Gravel driveway, $1,800&quot; is not a quote — it is a guess you
            cannot compare. Insist every bid states total compacted depth, tons per
            layer, stone type per layer, and whether fabric is included. Two bids $700
            apart are usually not different margins; one is quietly 3 inches thinner.
            Tonnage is checkable math — run your dimensions through the calculator
            before the first contractor visits.
          </TipBlock>
          <p className="text-muted-foreground">
            The other quiet variable is spoil: hauling excavated soil off site can add
            $300–600, and bids differ on whether they include it. If you have anywhere
            on the property to spread the cut, say so — it is the easiest $500 you will
            ever negotiate away.
          </p>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Cost questions" />

        <Cta
          variant={ctaVariant}
          title="Budget your exact driveway"
          description="Enter your dimensions and site type — the calculator returns tons per layer, truck loads and a material budget."
          href={GRAVEL.driveway}
          buttonLabel="Driveway Gravel Calculator"
        />

        <RelatedArticles
          title="Sharpen the budget"
          variant={relatedStyle}
          items={[
            ...pickLinks(drivewayGuideLinks, GRAVEL.drivewayInstall, GRAVEL.drivewayTypes),
            ...pickLinks(costGuideLinks, GRAVEL.deliveryCost, GRAVEL.laborCost),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.usgs, GREFS.fhwaGravel]} />
      </ArticleShell>
    </>
  );
}
