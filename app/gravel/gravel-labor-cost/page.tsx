import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TipBlock, InfoBlock } from "@/components/blocks/callout";
import { ProsCons } from "@/components/blocks/pros-cons";
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
import {
  GRAVEL,
  costGuideLinks,
  drivewayGuideLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-labor-cost";
const title = "Gravel Labor Cost — Spreading, Grading & Compaction";
const description =
  "What gravel installation labor costs in 2026: $40–80/hr crew rates, $75–125/hr skid steer with operator, $10–35 per ton installed premiums, equipment rental prices, and when DIY genuinely pays.";
const path = GRAVEL.laborCost;
const author = getAuthor("materials-team");
const datePublished = "2026-07-16";

// Deterministic per-slug variation (see lib/variation.ts)
const heroVariant = pick(slug, HERO_VARIANTS); // "centered"
const tocPosition = pick(slug, ["toc-right", "toc-left"] as const); // "toc-left"
const faqVariant = pick(slug, ["accordion", "list"] as const); // "list"
const relatedStyle = pick(slug, RELATED_STYLES); // "inline-strip"
const ctaVariant = pick(slug, ["banner", "card", "inline"] as const); // "inline"

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: datePublished,
});

const faqItems: FaqItem[] = [
  {
    question: "How much does it cost to have gravel spread?",
    answer:
      "Spread-only runs $10–20 per ton on top of material; spread, grade and compact runs $15–35 per ton. In hourly terms, general labor bills $40–60 per hour and a skid steer with operator $75–125. A 20-ton driveway top-up typically carries $200–500 of labor beyond the delivered stone.",
  },
  {
    question: "What does an installed gravel driveway cost per square foot?",
    answer:
      "Fully installed — grading, fabric, layered stone, compaction — figure $1–3 per square foot in 2026, of which labor and machine time is roughly $0.30–0.80. Material is usually the bigger half, which is why installed quotes track stone prices so closely.",
  },
  {
    question: "How long does it take to spread a ton of gravel by hand?",
    answer:
      "With a wheelbarrow and rake, 30–60 minutes per ton over a short haul distance — so a 5-ton path is a solid half-day for one fit person. A skid steer moves the same 5 tons in well under an hour, which is why machine rental starts paying for itself around 10–15 tons.",
  },
  {
    question: "Do I really need to compact gravel?",
    answer:
      "For anything that carries vehicles, yes. Uncompacted crusher run settles unevenly into ruts within months, and fixing that costs more than compacting did. A plate compactor rents for $90–150 a day and each 4-inch lift needs 3–4 passes. Loose decorative top layers over a firm base are the one place compaction is optional.",
  },
  {
    question: "When does hiring beat DIY on a gravel job?",
    answer:
      "Above roughly 15–20 tons, when grading or drainage work is involved, or when the site needs a machine you cannot operate confidently. Below that — top-ups, paths, patios over an existing firm base — DIY labor savings are real: on a small job labor is 30–50% of the installed price and almost all of it is honest shovel work.",
  },
  {
    question: "What should I get in a gravel installation quote?",
    answer:
      "Line items, not a lump sum: tons of each material with the per-ton price, delivery, grading hours or a grading price, geotextile fabric with area, compaction per lift, and haul-off of any spoil. A quote written that way can be checked against this page's rates line by line — and contractors who write them tend to be the ones worth hiring.",
  },
];

const toc = tocFromTitles(
  "Labor and machine rates (2026)",
  "Installed premiums: per ton and per square foot",
  "When DIY makes sense",
  "Equipment rental costs",
);

export default function GravelLaborCostPage() {
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
              title="Gravel labor cost"
              description="The stone is only half the bill. Spreading, grading and compaction turn a pile into a surface — here is what that work costs by the hour, by the ton, and by the square foot in 2026."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Labor Cost", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Labor and machine rates (2026)">
          <CoverageTable
            headers={["Rate", "Typical range", "What it buys"]}
            rows={[
              { label: "General labor", spec: "$40–60/hr", coverage: "Wheelbarrow, shovel and rake spreading" },
              { label: "Skilled operator", spec: "$60–80/hr", coverage: "Grading, crowning, drainage shaping" },
              { label: "Skid steer + operator", spec: "$75–125/hr", coverage: "Moves and rough-spreads 15–25 tons/hr" },
              { label: "Tractor / box blade + operator", spec: "$70–110/hr", coverage: "Lane grading and regrading" },
              { label: "Motor grader + operator", spec: "$120–180/hr", coverage: "Long private roads; overkill for driveways" },
            ]}
            caption="Loaded 2026 US rates — wage plus insurance and overhead. Two-hour to half-day minimums are standard for machine work."
          />
          <InfoBlock title="Machines are priced by the hour, jobs by the ton">
            Contractors quote crews hourly but think per ton: a skid steer crew that places
            20 tons an hour costs $5–8 per ton, while the same tonnage by hand costs $25–40.
            Whoever brings the right machine to the right size job pockets that spread —
            which can be you, with a rental.
          </InfoBlock>
        </Section>

        <Section title="Installed premiums: per ton and per square foot">
          <CostTable
            rows={[
              { item: "Spread only (dumped pile → even layer)", unit: "per ton", low: 10, high: 20, note: "Tailgate spreading by the driver may be nearly free" },
              { item: "Spread + grade + compact", unit: "per ton", low: 15, high: 35, note: "The standard installed premium over material" },
              { item: "Full driveway build labor", unit: "per ft²", low: 0.3, high: 0.8, note: "Grading, fabric, 2–3 lifts, compaction" },
              { item: "Regrade existing gravel drive", unit: "per ft²", low: 0.1, high: 0.3, note: "Machine work only, no new stone" },
              { item: "New gravel driveway, installed total", unit: "per ft²", low: 1, high: 3, note: "Material + labor; see the driveway cost guide" },
            ]}
            caption="2026 labor pricing. On a typical job, labor and machine time is 30–50% of the installed total — material is the rest."
          />
          <p className="text-muted-foreground">
            To budget a whole project, price the stone first with the{" "}
            <a href={GRAVEL.priceGuide} className="font-medium text-primary hover:underline">
              price guide
            </a>{" "}
            and{" "}
            <a href={GRAVEL.deliveryCost} className="font-medium text-primary hover:underline">
              delivery guide
            </a>
            , then add the installed premium for your tonnage from this table.
          </p>
          <Cta
            variant={ctaVariant}
            title="Price material + labor together in the Gravel Cost Calculator"
            href={GRAVEL.cost}
          />
        </Section>

        {/* FAQ position for this slug: mid-content */}
        <Faq items={faqItems} variant={faqVariant} title="Labor questions" />

        <Section title="When DIY makes sense">
          <ProsCons
            subject="DIY gravel installation"
            pros={[
              "Saves the full labor line — 30–50% of an installed quote on small jobs",
              "Paths, patios and top-ups need no skill beyond raking to depth",
              "Tailgate spreading by the delivery driver does half the work free",
              "Rental compactor + a weekend genuinely matches pro results on flat sites",
              "No scheduling — the job happens the day the truck comes",
            ]}
            cons={[
              "Hand-spreading is brutal above ~10 tons; a ton is 30–60 minutes of barrow work",
              "Grading and drainage mistakes cost more to fix than pros charge to avoid",
              "Machine work without seat time risks torn fabric and gouged subgrade",
              "No warranty — ruts and washboard six months in are yours",
              "Slopes, soft subgrade and culverts are not first-timer terrain",
            ]}
          />
          <p className="text-muted-foreground">
            The honest split: DIY the flat, small and cosmetic; hire the graded, drained and
            structural. A 3-ton patio is a Saturday. A 25-ton driveway with a crowned
            profile and a culvert is a contractor job that happens to involve gravel.
          </p>
        </Section>

        <Section title="Equipment rental costs">
          <CostTable
            rows={[
              { item: "Plate compactor", unit: "per day", low: 90, high: 150, note: "Essential for any driveway lift" },
              { item: "Skid steer (self-operate)", unit: "per day", low: 250, high: 400, note: "Plus $50–150 trailer or delivery" },
              { item: "Mini excavator", unit: "per day", low: 250, high: 450, note: "Only if cutting new grade or drainage" },
              { item: "Tow-behind box blade / landscape rake", unit: "per day", low: 60, high: 120, note: "For tractor owners regrading lanes" },
              { item: "Wheelbarrow, rakes, shovels", unit: "purchase", low: 100, high: 200, note: "One-time; outlasts a dozen projects" },
            ]}
            caption="2026 big-box and rental-yard day rates. Weekend and weekly rates run ~1.5× and ~3× the day rate respectively."
          />
          <TipBlock title="Rent the compactor, hire the grading">
            The highest-value hybrid: pay an operator 2–3 hours ($150–350) to cut grade and
            crown, then rent a $120 plate compactor and place the lifts yourself. You buy
            the skill you lack and supply the sweat you have — it routinely halves the labor
            line without risking the result.
          </TipBlock>
        </Section>

        <RelatedArticles
          title="Continue the cost series"
          variant={relatedStyle}
          items={[
            ...pickLinks(costGuideLinks, GRAVEL.budgetTips, GRAVEL.priceGuide),
            ...pickLinks(drivewayGuideLinks, GRAVEL.drivewayCost),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.fhwaGravel, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
