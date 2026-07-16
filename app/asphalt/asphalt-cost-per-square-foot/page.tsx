import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
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
import {
  ASPHALT,
  costGuideLinks,
  asphaltCalculatorLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Cost Per Square Foot (Installed)";
const description =
  "Installed asphalt costs $2.50–5.00 per square foot at 3 inches in 2026. Ranges by thickness and job size, why small jobs cost double, and the formula behind every contractor bid.";
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
      "For a typical residential job at 3 inches compacted, $2.50–5.00 per square foot in 2026, including material, labor and equipment on a prepared base. Material is only 40–50% of that; the rest is crew, machines and mobilization. Add $0.50–1.50 per square foot if the job needs new gravel base or removal of old pavement.",
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
      "Usually not, and this is the most common bid-comparison trap. Base gravel runs $18–35 per ton plus grading and compaction, adding $0.50–1.50 per square foot for a new 6–8 inch base. A bid that looks $1 per square foot cheaper may simply exclude base work — make every bidder state base thickness and compaction method in writing.",
  },
  {
    question: "Is commercial paving cheaper per square foot than residential?",
    answer:
      "Yes, materially. A 20,000 square foot lot lets the crew run the paver continuously and amortizes mobilization to pennies per square foot, landing at $2.50–4.00. Residential driveways involve hand work at edges, small tonnage and the same fixed setup, which is why they price at $4–7 for mid-size jobs.",
  },
];

const toc = tocFromTitles(
  "The formula behind every bid",
  "Installed cost by thickness",
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

        <Section title="Installed cost by thickness">
          <CostTable
            currency="USD"
            rows={[
              { item: "2 in compacted (overlay-grade)", unit: "ft²", low: 2.0, high: 3.5, note: "Light duty; overlays over sound pavement" },
              { item: "3 in compacted (residential standard)", unit: "ft²", low: 2.5, high: 5.0, note: "The default driveway spec" },
              { item: "4 in compacted (heavy vehicles)", unit: "ft²", low: 3.25, high: 6.0, note: "RVs, trucks, poor subgrade" },
            ]}
            caption="Installed on a prepared base, mid-size job (1,000–3,000 ft²), 2026 US ranges. Base construction, removal and steep-access surcharges are extra."
          />
        </Section>

        <Section title="Installed cost by job size">
          <CostTable
            currency="USD"
            rows={[
              { item: "Under 500 ft² (patches, pads)", unit: "ft²", low: 6.0, high: 12.0, note: "Mobilization dominates the price" },
              { item: "500–1,500 ft² (single driveways)", unit: "ft²", low: 4.0, high: 7.0, note: "Fixed costs still 25–40% of total" },
              { item: "1,500–5,000 ft² (large driveways)", unit: "ft²", low: 3.0, high: 5.0, note: "Crew runs near full productivity" },
              { item: "5,000+ ft² (lots, lanes)", unit: "ft²", low: 2.5, high: 4.0, note: "Fixed costs fully amortized" },
            ]}
            caption="All at 3 in compacted on existing base. The material cost per square foot is identical in every row — only the divisor changes."
          />
        </Section>

        <Section title="The mobilization curve">
          <BarChart
            title="Typical installed $/ft² at 3 in, by job size"
            unit="USD/ft²"
            data={[
              { label: "300 ft²", value: 9.0 },
              { label: "800 ft²", value: 5.5 },
              { label: "1,500 ft²", value: 4.5 },
              { label: "3,000 ft²", value: 3.75 },
              { label: "6,000 ft²", value: 3.25 },
              { label: "15,000 ft²", value: 2.75 },
            ]}
          />
          <p className="text-muted-foreground">
            The curve flattens near 3,000 square feet — beyond that, you are paying material
            plus productive crew time and little else. Below 500 square feet you are mostly
            renting a crew&apos;s morning, and the asphalt is almost incidental to the bill.
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

        <References items={[AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
