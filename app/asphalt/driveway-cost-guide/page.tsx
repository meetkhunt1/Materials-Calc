import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
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
import { ASPHALT, drivewayGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import {
  CONCRETE,
  guideLinks as concreteGuides,
  pickLinks as pickConcrete,
} from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Driveway Cost Guide (2026 Installed Prices)";
const description =
  "What an asphalt driveway costs installed in 2026: $5–10 per square foot all-in, with real line items — excavation, base gravel, hot mix per ton, paving labor and mobilization — plus worked budgets for single, double and rural drives.";
const path = ASPHALT.drivewayCost;
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
    question: "How much does an asphalt driveway cost per square foot?",
    answer:
      "Plan on $5–10 per square foot installed — excavation, 6 in aggregate base, 3 in of compacted hot mix in two lifts, and labor. Small jobs land at the top of the range because mobilization is fixed; large simple rectangles near a plant land at the bottom. Quotes far below $5/ft² usually mean a thin lift or a skipped base.",
  },
  {
    question: "Why do small driveways cost more per square foot?",
    answer:
      "Mobilization — moving a paver, rollers and a 4–6 person crew to your address — runs $1,500–3,000 whether the job is 400 ft² or 4,000 ft². Spread over a small single drive, that fixed cost alone adds $3–6 per square foot. It is also why piggybacking on a neighbor's paving day is a genuinely effective negotiation tactic.",
  },
  {
    question: "How much does a ton of asphalt cost in 2026?",
    answer:
      "Hot mix runs $100–150 per ton delivered for typical residential quantities, tracking oil prices and haul distance from the plant. One ton covers about 53 ft² at 3 in compacted, so material is roughly $2–3 per square foot — usually only a third of the installed price. The rest is sitework, labor, equipment and mobilization.",
  },
  {
    question: "Is asphalt cheaper than concrete for a driveway?",
    answer:
      "Upfront, yes — asphalt installs at $5–10/ft² versus roughly $8–15/ft² for plain concrete. Concrete counters with a longer life and near-zero maintenance, while asphalt needs sealcoating every 3–5 years. Over 30 years the totals converge; asphalt wins on first cost, freeze-thaw tolerance and cheap resurfacing.",
  },
  {
    question: "What add-ons inflate a driveway quote?",
    answer:
      "The usual suspects: extra excavation depth or soft-spot repair ($1–3/ft² more), geotextile fabric ($0.50–1/ft²), demolition and hauling of an old surface ($1–3/ft²), retaining edges on slopes, and long curb-cut aprons built to municipal spec. None are padding — but each should appear as a priced line item, not vanish into a lump sum.",
  },
  {
    question: "When is paving cheapest to schedule?",
    answer:
      "Late season — September and October in most markets — when plants are still open but the commercial backlog is thinning and crews want fill-in work. Quotes can come in 5–15% under peak-season pricing. Avoid the first warm weeks of spring, when every homeowner calls at once and contractors price accordingly.",
  },
];

const toc = tocFromTitles(
  "Line-item costs",
  "Installed cost by driveway size",
  "Worked budget: a 12 × 40 ft single drive",
  "Where the money actually goes",
);

export default function DrivewayCostGuidePage() {
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
        tocPosition="toc-left"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Driveway Guide"
              variant="standard"
              title="Asphalt driveway cost guide"
              description="The honest 2026 number is $5–10 per square foot installed. This guide breaks that into line items you can hold a quote against — excavation, base, hot mix, labor and the mobilization fee nobody itemizes."
            >
              <AuthorBox author={author} datePublished="2026-07-15" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Driveway Cost Guide", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Line-item costs">
          <CostTable
            caption="2026 residential line items. Regional spread is roughly ±25% around these ranges."
            rows={[
              {
                item: "Excavation & grading",
                unit: "per ft²",
                low: 1,
                high: 3,
                note: "9–10 in cut; more for soft-spot repair",
              },
              {
                item: "Base gravel, delivered",
                unit: "per ton",
                low: 18,
                high: 35,
                note: "6 in compacted needs ~1 ton per 40 ft²",
              },
              {
                item: "Hot mix asphalt, delivered",
                unit: "per ton",
                low: 100,
                high: 150,
                note: "1 ton ≈ 53 ft² at 3 in compacted",
              },
              {
                item: "Paving labor + equipment",
                unit: "per ft²",
                low: 2,
                high: 4,
                note: "Paver, rollers, 4–6 person crew",
              },
              {
                item: "Mobilization",
                unit: "per job",
                low: 1500,
                high: 3000,
                note: "Fixed — why small jobs cost more per ft²",
              },
            ]}
          />
        </Section>

        <Section title="Installed cost by driveway size">
          <CostTable
            caption="All-in installed budgets: excavation, 6 in base, 3 in hot mix in two lifts, labor and mobilization."
            rows={[
              {
                item: "Single drive, 12 × 40 ft",
                unit: "480 ft²",
                low: 3400,
                high: 5800,
                note: "$7–12/ft² — mobilization dominates",
              },
              {
                item: "Double drive, 20 × 36 ft",
                unit: "720 ft²",
                low: 4600,
                high: 7900,
                note: "$6.50–11/ft²",
              },
              {
                item: "Long rural drive",
                unit: "1,500 ft²",
                low: 8200,
                high: 14500,
                note: "$5.50–9.50/ft² — scale finally helps",
              },
            ]}
          />
          <p className="text-muted-foreground">
            Comparing against a concrete drive? The{" "}
            <a href={CONCRETE.cost} className="font-medium text-primary hover:underline">
              concrete cost guide
            </a>{" "}
            prices the same footprints in concrete — typically 40–60% higher upfront, with
            the trade-offs covered in the comparison guides below.
          </p>
          <Cta
            variant="inline"
            title="Get tonnage and base gravel for your own footprint"
            href={ASPHALT.driveway}
          />
        </Section>

        <Section title="Worked budget: a 12 × 40 ft single drive">
          <ExampleBlock
            scenario="A straightforward 12 × 40 ft (480 ft²) single driveway on decent soil: 9 in excavation, 6 in compacted base, 3 in hot mix in two lifts. Mid-range unit prices, competitive local market."
            steps={[
              { label: "Excavation & grading at $1.75/ft²", work: "480 × $1.75 = $840" },
              {
                label: "Base gravel: 6 in over 480 ft² ≈ 15 tons compacted, at $28/ton",
                work: "15 × $28 = $420",
              },
              {
                label: "Hot mix: 480 ÷ 53 ≈ 9.1 tons, +10% waste → 10 tons at $120",
                work: "10 × $120 = $1,200",
              },
              { label: "Paving labor + equipment at $2.60/ft²", work: "480 × $2.60 = $1,250" },
              {
                label: "Mobilization share (small-job rate)",
                work: "$800 (bundled with two nearby jobs)",
              },
            ]}
            result="Total ≈ $4,510 — about $9.40/ft², squarely inside the $3,400–5,800 range for this size. A standalone mobilization at $2,000+ pushes the same job past $5,700."
          />
        </Section>

        <Section title="Where the money actually goes">
          <BarChart
            title="Typical cost split on a residential driveway (% of total)"
            unit="%"
            data={[
              { label: "Excavation & grading", value: 20 },
              { label: "Base gravel", value: 12 },
              { label: "Asphalt material", value: 33 },
              { label: "Labor & equipment", value: 35 },
            ]}
          />
          <p className="text-muted-foreground">
            Two-thirds of the budget is not asphalt. That is why haggling over the hot mix
            price moves a quote very little, while job access, excavation surprises and
            crew efficiency move it a lot — and why the cheapest quote usually got cheap by
            thinning the parts you cannot see.
          </p>
        </Section>

        <Faq items={faqItems} variant="accordion" title="Cost questions" />

        <Cta
          variant="banner"
          title="Run the full material budget"
          description="The asphalt cost calculator turns area, thickness and your local per-ton price into a complete material estimate."
          href={ASPHALT.cost}
          buttonLabel="Asphalt Cost Calculator"
        />

        <RelatedArticles
          title="Plan the rest of the project"
          variant="cards"
          items={pickLinks(
            drivewayGuideLinks,
            ASPHALT.drivewayThickness,
            ASPHALT.drivewayInstall,
            ASPHALT.drivewayMaintenance,
          )}
        />

        <RelatedArticles
          title="Weighing concrete instead?"
          variant="list"
          items={pickConcrete(concreteGuides, CONCRETE.cost, CONCRETE.vsAsphalt)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
