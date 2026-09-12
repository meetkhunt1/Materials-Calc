import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { InfoBlock } from "@/components/blocks/callout";
import { ExampleBlock } from "@/components/blocks/example-block";
import { CostTable } from "@/components/tables/cost-table";
import { BarChart } from "@/components/charts/bar-chart";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import {
  ASPHALT,
  costGuideLinks,
  asphaltCalculatorLinks,
  pickLinks,
} from "@/content/asphalt/links";
import {
  BAND_UNDER_500,
  BAND_500_1000,
  bandRangePerSqFt,
  basePrepRange,
  LARGE_JOB_GUIDANCE,
} from "@/data/pricing";
import type { FaqItem } from "@/types";

const title = "Asphalt Cost Per Square Foot (Installed)";
const description =
  "What installed asphalt really costs per square foot, why the figure falls as the job grows, and the formula behind every contractor bid — with size ranges derived from worked jobs rather than quoted from memory.";
const path = ASPHALT.costPerSqft;
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
    question: "What does asphalt cost per square foot installed?",
    answer:
      `It depends far more on how big the job is than on the asphalt. All-in — excavation, base, hot mix, labor and mobilization — a job under 500 ft² works out to ${bandRangePerSqFt(BAND_UNDER_500)}, and a 500–1,000 ft² driveway to ${bandRangePerSqFt(BAND_500_1000)}. Material is only 40–50% of either figure; the rest is crew, machines and the fixed cost of showing up. Working over an existing sound base removes the excavation and gravel, worth about ${basePrepRange(BAND_UNDER_500)} per square foot on a small job.`,
  },
  {
    question: "Why is my small patch quoted at $10 per square foot?",
    answer:
      "Mobilization. A paving contractor spends $1,500–3,000 moving crew and equipment to any job before the first ton goes down. Spread over 300 square feet, that fixed cost alone is $5–10 per square foot. The cure is combining work — do the patch when a neighbor paves, or bundle it with sealcoating and crack repair.",
  },
  {
    question: "How much does each extra inch of thickness add?",
    answer:
      "Roughly $0.75–1.10 per square foot per inch, which is the material cost of about 12 pounds of mix per square foot per inch at 2026 per-ton prices. Labor barely changes — the paver places 4 inches nearly as fast as 2 — so upgrading thickness is the cheapest structural improvement you can buy on a job that is already mobilized.",
  },
  {
    question: "Does the price include the gravel base?",
    answer:
      `Often not, and this is the most common bid-comparison trap. Base gravel runs $18–35 per ton plus grading and compaction. On a small job that excavation-and-base scope works out to about ${basePrepRange(BAND_UNDER_500)} per square foot — on a 480 ft² driveway, $840 of excavation plus $420 of gravel. A bid that looks a dollar per square foot cheaper may simply exclude it, so make every bidder state base thickness and compaction method in writing.`,
  },
  {
    question: "Is commercial paving cheaper per square foot than residential?",
    answer:
      `Yes, materially — a big lot lets the crew run the paver continuously and spreads mobilization across far more area, while residential driveways carry hand work at the edges, small tonnage and exactly the same fixed setup. We do not publish a per-square-foot figure for large lots: ${LARGE_JOB_GUIDANCE}`,
  },
];

const toc = tocFromTitles(
  "The formula behind every bid",
  "What thickness adds",
  "Installed cost by job size",
  "The mobilization curve",
  "Worked example: 300 ft² vs 600 ft²",
);

export default function AsphaltCostPerSquareFootPage() {
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
              eyebrow="Asphalt · Cost Series"
              variant="standard"
              title="Asphalt cost per square foot, installed"
              description="Per-square-foot pricing is an output, not an input: it falls out of tonnage, crew time and fixed fees divided by area. That is why the same contractor quotes $3 on one street and $8 on the next."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Cost Per Square Foot", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Price the inputs"
            variant="inline-strip"
            items={[
              ...pickLinks(costGuideLinks, ASPHALT.pricePerTon, ASPHALT.laborCost),
              ...pickLinks(asphaltCalculatorLinks, ASPHALT.driveway),
            ]}
          />
        }
      >
        <Section title="The formula behind every bid">
          <FormulaBlock
            formula="$/ft² = (tons × price per ton + labor + fees) ÷ area"
            note="Tons = area × thickness × 145 lb/ft³ compacted density ÷ 2,000. Fees are the fixed part — mobilization, traffic control, permits — and they are why $/ft² collapses as area grows."
          />
          <p className="text-muted-foreground">
            Material at $100–150 per ton typically accounts for 40–50% of installed cost.
            The rest is a 5–8 person crew, a paver and rollers, and a $1,500–3,000
            mobilization minimum that lands on the job whether it is 200 square feet or
            20,000. Every number below is that formula evaluated at different areas.
          </p>
        </Section>

        <Section title="What thickness adds">
          <p className="text-muted-foreground">
            Thickness moves the price far less than size does, because it changes only the
            material term: about $0.75–1.10 per square foot for each additional compacted
            inch, which is roughly 12 lb of mix per square foot per inch at current per-ton
            prices. Crew and equipment time barely move — a paver places 4 inches nearly as
            fast as 2 — so on a job that is already mobilized, extra thickness is the cheapest
            structural upgrade available. Going from the 3 in residential standard to a 4 in
            heavy-vehicle section adds about a dollar per square foot, not a whole price tier.
          </p>
        </Section>

        <Section title="Installed cost by job size">
          <CostTable
            currency="USD"
            rows={[
              {
                item: `${BAND_UNDER_500.label} (patches, pads, short drives)`,
                unit: "ft²",
                low: BAND_UNDER_500.low,
                high: BAND_UNDER_500.high,
                note: "Mobilization dominates the price",
              },
              {
                item: `${BAND_500_1000.label} (single and double driveways)`,
                unit: "ft²",
                low: BAND_500_1000.low,
                high: BAND_500_1000.high,
                note: "Fixed costs still a large share of the total",
              },
            ]}
            caption="All-in at 3 in compacted: excavation, base, hot mix, labor and mobilization. Both ranges are derived from the worked jobs below, not from quoted averages. Where the existing base is sound and only the surface is being replaced, subtract the excavation-and-base scope."
          />
          <InfoBlock title="Why there is no row for larger jobs">
            {LARGE_JOB_GUIDANCE} The direction is certain — every job costed on this site gets
            cheaper per square foot as it grows — but there is no worked example here above
            1,200 ft² to put a number to, and inventing one would give a guess the appearance
            of a measurement.
          </InfoBlock>
        </Section>

        <Section title="The mobilization curve">
          <BarChart
            title="Typical installed $/ft² at 3 in, by job size"
            unit="USD/ft²"
            data={[
              { label: "300 ft² patch", value: 11.3 },
              { label: "480 ft² single drive", value: 9.4 },
              { label: "600 ft² rural", value: 8.1 },
              { label: "600 ft² metro", value: 5.85 },
            ]}
          />
          <p className="text-muted-foreground">
            Each bar is a job costed line by line elsewhere on this site, not a market
            average — which is why the curve stops at 600 square feet rather than running out
            to commercial lots. Below 500 square feet you are mostly renting a crew&apos;s
            morning, and the asphalt is almost incidental to the bill; by 600 square feet the
            same fixed costs are spread over twice the area, and geography starts to matter as
            much as size. {LARGE_JOB_GUIDANCE}
          </p>
        </Section>

        <Section title="Worked example: 300 ft² vs 600 ft²">
          <ExampleBlock
            scenario="Two patch jobs at 3 in compacted, same street, same crew. Mix at $130/ton delivered, mobilization $1,800, crew half-day $900."
            steps={[
              { label: "300 ft² tonnage", work: "300 × 0.25 ft × 145 ÷ 2,000 = 5.4 tons → $700 material" },
              { label: "300 ft² total", work: "$700 + $1,800 + $900 = $3,400 → $11.30/ft²" },
              { label: "600 ft² tonnage", work: "600 × 0.25 × 145 ÷ 2,000 = 10.9 tons → $1,420 material" },
              { label: "600 ft² total", work: "$1,420 + $1,800 + $900 = $4,120 → $6.90/ft²" },
            ]}
            result="Doubling the area added only 21% to the bill. Fixed costs don't care about square footage — which is why the right move on a small patch is almost always to find more work to bundle with it."
          />
        </Section>

        <Faq items={faqItems} variant="list" />

        <Cta
          variant="banner"
          title="Run your own square footage"
          description="Area, thickness and local price per ton in — tonnage and total cost out."
          href={ASPHALT.cost}
          buttonLabel="Asphalt Cost Calculator"
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

      </ArticleShell>
    </>
  );
}
