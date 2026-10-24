import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock } from "@/components/blocks/callout";
import { CostTable } from "@/components/tables/cost-table";
import { CoverageTable } from "@/components/tables/coverage-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, costGuideLinks, pickLinks } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Labor Cost: 20–30% of Installed Price";
const description =
  "Paving labor is 20–30% of installed asphalt cost; a 5–8 person crew costs about $300–450 per hour. Crew rates, tons per day and a worked driveway example.";
const path = ASPHALT.laborCost;
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
    question: "What share of an asphalt quote is labor?",
    answer:
      "Typically 20–30% of installed cost on residential work. Material runs 40–50%, equipment and trucking take most of the rest. On small jobs the labor share rises because the crew spends proportionally more time on setup, hand work and cleanup relative to tons placed.",
  },
  {
    question: "How big is a typical paving crew?",
    answer:
      "Five to eight people: a foreman, a paver operator, a screed operator, one or two roller operators, and two or three laborers on rakes and lutes handling edges, transitions and hand work around structures. Highway crews run larger with dedicated truck spotters and traffic control; a small patch crew may be three.",
  },
  {
    question: "How many tons does a crew place per day?",
    answer:
      "A highway crew with continuous truck cycles places 500–1,500 tons a day. Residential crews place 100–300, not because they work slower but because driveways involve moves between jobs, hand-raked edges and small tonnage per stop. The paver itself is rarely the constraint; truck timing and hand work are.",
  },
  {
    question: "What do paving crew members earn?",
    answer:
      "About $35–75 per hour loaded (wage plus payroll taxes, insurance and benefits) in 2026 depending on role and market. Operators sit at the top, laborers at the bottom, and union metros push the whole band higher. A full residential crew therefore costs the contractor roughly $300–450 per hour on the clock.",
  },
  {
    question: "Can I save money by helping the crew?",
    answer:
      "No. No reputable contractor will let you work inside an active paving operation, because 300°F material and moving rollers make it an insurance non-starter. Where owners genuinely save on labor is before the crew arrives: demolition, clearing, and hauling where the contract allows it. Ask the estimator which prep items they will credit.",
  },
  {
    question: "Why does a bigger crew not cost more per square foot?",
    answer:
      "Because the paver sets the pace. A short-handed crew makes the machine wait: rakers fall behind at edges, the screed stops, and stopped pavers leave roller marks and cold joints. An extra laborer at $45 per hour who keeps a $350-per-hour operation moving pays for himself several times over, which is why efficient contractors staff up rather than down.",
  },
];

const toc = tocFromTitles(
  "Who is on a paving crew?",
  "Labor line items by job type",
  "Productivity: tons per crew-day",
  "Worked example: the 20-ton driveway day",
);

export default function AsphaltLaborCostGuidePage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Asphalt",
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
              eyebrow="Asphalt · Cost Series"
              variant="compact"
              title="Asphalt labor costs: crews and productivity"
              description="Labor is 20–30% of an installed asphalt price, and it is bought by the crew-day, not the hour. Understanding how a crew is built and paced explains most of what looks odd in paving bids."
            >
              <AuthorBox author={author} variant="inline" datePublished="2026-07-15" dateModified="2026-10-24" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Labor Cost Guide", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Price the whole job"
            description="Labor scales with tonnage. Get your tons first, then apply crew costs."
            href={ASPHALT.cost}
            buttonLabel="Asphalt Cost Calculator"
          />
        }
      >
        <QuickAnswer
          question="How much does asphalt paving labor cost?"
          answer="Asphalt paving labor is typically 20–30% of the installed price on residential work, or about $0.60–1.50 per square foot for a new 3-inch driveway. A 5–8 person paving crew costs the contractor roughly $300–450 per hour loaded, and small jobs are billed by the crew-day because setup and cleanup take most of it."
          ruleOfThumb="Material 40–50%, labor 20–30%, equipment and trucking most of the rest."
        />

        <Section title="Who is on a paving crew?">
          <p className="text-muted-foreground">
            A residential paving crew is five to eight people, with loaded rates from $35 to
            $75 per hour by role.
          </p>
          <CoverageTable
            headers={["Crew role", "Typical loaded rate", "What they control"]}
            rows={[
              { label: "Foreman", spec: "$55–75/hr", coverage: "Sequencing, truck cycles, grade and thickness checks" },
              { label: "Paver operator", spec: "$50–70/hr", coverage: "Machine speed and steering: the job's metronome" },
              { label: "Screed operator", spec: "$45–65/hr", coverage: "Mat thickness, crown and texture behind the paver" },
              { label: "Roller operators (2)", spec: "$40–60/hr each", coverage: "Breakdown and finish compaction, where density is won" },
              { label: "Laborers / rakers (2–3)", spec: "$35–50/hr each", coverage: "Edges, joints, hand work around structures" },
            ]}
            caption="Loaded rates (wage + burden), 2026 US ranges. A full residential crew of 5–8 costs the contractor roughly $300–450 per hour."
          />
        </Section>

        <Section title="Labor line items by job type">
          <CostTable
            currency="USD"
            rows={[
              { item: "Residential driveway (new, 3 in)", unit: "ft²", low: 0.6, high: 1.5, note: "One crew-day regardless of driveway size" },
              { item: "Overlay on sound pavement", unit: "ft²", low: 0.4, high: 0.9, note: "No base work; crew runs continuously" },
              { item: "Patch / repair work", unit: "ft²", low: 1.5, high: 3.5, note: "Saw-cutting and hand work dominate" },
              { item: "Commercial lot (5,000+ ft²)", unit: "ft²", low: 0.35, high: 0.75, note: "Full paver productivity, labor share falls" },
              { item: "Hand-laid areas (walkways, tight access)", unit: "ft²", low: 2.0, high: 4.0, note: "No paver; everything raked and plated" },
            ]}
            caption="Labor component only, excluding material, equipment and mobilization. Labor ≈ 20–30% of the installed prices in the cost-per-square-foot guide."
          />
        </Section>

        <Section title="Productivity: tons per crew-day">
          <p className="text-muted-foreground">
            Residential crews place 100–300 tons a day and highway crews 500–1,500, and
            productivity is the lever that converts hourly rates into unit costs. A highway
            crew running continuous truck cycles places 500–1,500 tons per day, so even a
            $450-per-hour crew adds only $2–4 per ton of labor. A residential crew places
            100–300 tons per day across one or several stops, and on a single small driveway
            the effective figure can drop below 30 tons: the same crew, the same hourly
            cost, spread across a fraction of the output. That ratio, not wage rates, is why
            patch work costs $3 per square foot in labor while lot paving costs $0.50.
          </p>
          <TipBlock title="The paver sets the pace, so staff to it">
            Paying for a bigger crew is often cheaper per square foot. Every paver stop
            risks a cold joint and roller marks, and short-handed crews stop the machine
            constantly. If a contractor proposes a six-person crew over a four-person crew
            for the same bid price, that is a mark in their favor, not padding.
          </TipBlock>
        </Section>

        <Section title="Worked example: the 20-ton driveway day">
          <ExampleBlock
            scenario="A 1,200 ft² driveway at 3 in needs about 20 tons. A residential crew can place 150+ tons a day, so why does this job book a full crew-day?"
            steps={[
              { label: "Mobilize and set up", work: "Load out, travel, unload paver and rollers: 2.0–2.5 hrs" },
              { label: "Prep and tack", work: "Sweep base, tack edges and joints: 0.5–1.0 hr" },
              { label: "Place 20 tons", work: "Paving itself: 1.5–2.0 hrs including two truck cycles" },
              { label: "Compact, hand-finish, demobilize", work: "Rolling to density, edge work, cleanup, load out: 2.0–2.5 hrs" },
            ]}
            result="6–8 hours door to door, of which barely 2 are paving. The crew-day is the billing unit, which is why tonnage barely moves the labor line on small jobs, and why contractors discount when they can pave two driveways on one street."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <RelatedArticles
          title="Continue the cost series"
          variant="cards"
          items={pickLinks(costGuideLinks, ASPHALT.equipmentCost, ASPHALT.costPerSqft, ASPHALT.costSaving)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

      </ArticleShell>
    </>
  );
}
