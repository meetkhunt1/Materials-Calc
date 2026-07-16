import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock } from "@/components/blocks/callout";
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
  asphaltCalculatorLinks,
  costGuideLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import {
  CONCRETE,
  guideLinks as concreteGuides,
  pickLinks as pickConcrete,
} from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Cost Guide — Per Ton, Per Square Foot, Installed";
const description =
  "What asphalt costs in 2026: $100–150 per ton for hot mix at the plant, $2.50–5 per square foot installed, plus the trucking, mobilization and minimum-load fees that decide small-job pricing.";
const path = ASPHALT.costGuide;
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
    question: "How much does asphalt cost per ton in 2026?",
    answer:
      "Hot mix runs $100–150 per ton at the plant, with commodity swings tracking the price of PG binder — the oil-derived glue that is only 5–6% of the mix by weight but a third of its cost. Cold patch in bags costs several times more per ton; millings a fraction. Pickup price excludes trucking.",
  },
  {
    question: "How much does asphalt paving cost per square foot?",
    answer:
      "Installed, $2.50–5 per square foot for typical residential and light commercial work at 2–3 in over a prepared base. Material is only 40–50% of that; the rest is trucking, crew, paver and roller time. Jobs under about 2,000 ft² land at or above the top of the range because mobilization amortizes badly.",
  },
  {
    question: "Why do small asphalt jobs cost so much per square foot?",
    answer:
      "Fixed costs. Moving a paver, roller and crew to your site costs $1,500 or more before the first ton hits the ground, and plants charge minimum-load fees on partial trucks. Spread $1,500 over 600 ft² and mobilization alone adds $2.50/ft² — which is why patching one driveway costs double the per-foot rate of paving a whole street.",
  },
  {
    question: "What share of an asphalt job is the material?",
    answer:
      "Typically 40–50% of the installed price on residential work. A 600 ft² driveway at 3 in needs about 11.5 tons; at $125/ton that is $1,440 of mix on a job quoting around $3,000–3,300. The balance is labor, equipment, trucking and base work. On large commercial tonnage, material share rises past 60%.",
  },
  {
    question: "Is it cheaper to DIY an asphalt driveway?",
    answer:
      "No, and mostly it is not possible. Hot mix arrives at 300°F and must be laid and rolled within a tight temperature window by a paver and a multi-ton roller — equipment you cannot meaningfully rent for a weekend. DIY territory is cold-patch repairs and sealcoating. For new pavement, competitive quotes are the cost lever, not your labor.",
  },
  {
    question: "How do asphalt and concrete driveway costs compare?",
    answer:
      "Asphalt installs for $2.50–5/ft² versus roughly $7–12 for concrete — asphalt wins day one by a wide margin. Over 30 years the gap narrows because asphalt needs sealcoating every 3–5 years and an overlay around year 15–20. The full head-to-head is in the asphalt vs concrete comparison.",
  },
];

const toc = tocFromTitles(
  "Price per ton by mix type",
  "Installed price per square foot",
  "Fees: trucking, mobilization, minimums",
  "Thickness drives the installed price",
  "Worked example: full driveway budget",
);

export default function AsphaltCostGuidePage() {
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
              eyebrow="Asphalt · Cost Guide"
              variant="stat-strip"
              title="What asphalt actually costs"
              description="Per-ton prices are easy to find; what jobs actually cost is decided by fees and fixed costs. Here are the 2026 numbers, line by line."
              stats={[
                { value: "$100–150", label: "per ton, hot mix at the plant" },
                { value: "$2.50–5", label: "per ft² installed" },
                { value: "40–50%", label: "of installed price is material" },
                { value: "$1,500+", label: "typical crew mobilization" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Cost Guide", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Price your project"
            variant="inline-strip"
            items={pickLinks(asphaltCalculatorLinks, ASPHALT.cost, ASPHALT.calculator)}
          />
        }
      >
        <Section title="Price per ton by mix type">
          <CostTable
            currency="USD"
            rows={[
              { item: "Hot mix asphalt (surface course)", unit: "ton", low: 100, high: 150, note: "Finer aggregate; the visible layer" },
              { item: "Hot mix asphalt (binder/base course)", unit: "ton", low: 90, high: 130, note: "Larger stone, slightly cheaper" },
              { item: "Warm mix asphalt", unit: "ton", low: 100, high: 150, note: "Price parity with hot mix at most plants" },
              { item: "Cold patch (bagged)", unit: "ton", low: 300, high: 500, note: "Repair material — never for new paving" },
              { item: "Recycled millings", unit: "ton", low: 10, high: 30, note: "Base or rural surfacing; availability varies" },
            ]}
            caption="Plant pickup pricing, mid-2026. Binder (oil) price swings move hot mix $10–20/ton year to year — get quotes dated."
          />
        </Section>

        <Section title="Installed price per square foot">
          <CostTable
            currency="USD"
            rows={[
              { item: "Overlay on sound existing asphalt (1.5–2 in)", unit: "ft²", low: 1.5, high: 3 },
              { item: "New residential driveway (3 in over 6 in base)", unit: "ft²", low: 2.5, high: 5, note: "The standard section" },
              { item: "Parking lot, new (4 in over base)", unit: "ft²", low: 3, high: 6 },
              { item: "Full-depth reclamation + repave", unit: "ft²", low: 4, high: 8, note: "Existing pavement recycled in place" },
              { item: "Small patch work", unit: "ft²", low: 6, high: 12, note: "Mobilization dominates below ~500 ft²" },
            ]}
            caption="US national ranges, mid-2026, including base preparation where noted. Regional labor moves these ±25%."
          />
          <p className="text-muted-foreground">
            Weighing pavements against each other? Concrete&apos;s equivalent line items —
            per-yard ready-mix, delivery and finishing — are laid out the same way in the{" "}
            <a href={CONCRETE.cost} className="font-medium text-primary hover:underline">
              concrete cost guide
            </a>
            .
          </p>
        </Section>

        <Section title="Fees: trucking, mobilization, minimums">
          <CostTable
            currency="USD"
            rows={[
              { item: "Trucking from plant", unit: "load", low: 100, high: 200, note: "Rises fast past ~25 miles — mix cools" },
              { item: "Crew + equipment mobilization", unit: "job", low: 1500, high: 3000, note: "Paver, roller, crew to site and back" },
              { item: "Minimum-load fee (partial truck)", unit: "load", low: 75, high: 200 },
              { item: "Tack coat on existing surface", unit: "ft²", low: 0.05, high: 0.15 },
              { item: "Permit / traffic control (if on ROW)", unit: "job", low: 100, high: 500 },
            ]}
            caption="The lines that never appear in per-ton price searches but always appear on the invoice. Ask for each one itemized."
          />
          <InfoBlock title="Distance is a hidden spec">
            Hot mix must arrive above about 250°F to compact properly. Past roughly 45–60
            minutes of haul, plants either surcharge, insulate, or decline the job — which is
            why the nearest plant effectively sets your price, and rural jobs quote high
            regardless of tonnage.
          </InfoBlock>
        </Section>

        <Section title="Thickness drives the installed price">
          <BarChart
            title="Typical installed cost per ft² by compacted thickness"
            unit="USD/ft²"
            monochrome={false}
            data={[
              { label: "2 in (overlay duty)", value: 2.75, color: "var(--chart-1)" },
              { label: "3 in (residential standard)", value: 3.75, color: "var(--chart-2)" },
              { label: "4 in (parking / heavy drives)", value: 4.75, color: "var(--chart-3)" },
            ]}
          />
          <p className="text-muted-foreground">
            Each extra inch adds roughly $0.90–1.00/ft² — pure material and rolling time,
            since the crew and mobilization are already on site. This is why upgrading from
            3 in to 4 in costs far less than the 33% the thickness suggests, and why
            skimping an inch saves less than people hope.
          </p>
        </Section>

        <Section title="Worked example: full driveway budget">
          <ExampleBlock
            scenario="A 1,200 ft² driveway (12 × 100 ft), new construction: 3 in compacted hot mix over 6 in aggregate base."
            steps={[
              { label: "Hot mix tonnage", work: "1,200 × 0.25 × 145 ÷ 2,000 × 1.05 = 22.8 → 23 tons" },
              { label: "Hot mix at $120/ton", work: "23 × $120 = $2,760" },
              { label: "Aggregate base (6 in ≈ 33 tons)", work: "≈ $600 delivered" },
              { label: "Trucking, two tandem loads", work: "2 × $150 = $300" },
              { label: "Crew, paver and rollers (one day)", work: "≈ $1,540" },
              { label: "Mobilization", work: "≈ $1,200" },
            ]}
            result="≈ $6,400 installed — about $5.33/ft², at the top of the range because fixed costs amortize over only 1,200 ft². Material share: 43% for the hot mix alone."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Budget your own job"
          description="The cost calculator turns area, thickness and your local per-ton quote into a material budget."
          href={ASPHALT.cost}
          buttonLabel="Asphalt Cost Calculator"
        />

        <RelatedArticles
          title="Related cost guides"
          variant="cards"
          items={pickLinks(costGuideLinks, ASPHALT.pricePerTon, ASPHALT.costPerSqft, ASPHALT.regionalPrices)}
        />

        <RelatedArticles
          title="Comparing with concrete?"
          variant="list"
          items={pickConcrete(concreteGuides, CONCRETE.cost)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
