import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock } from "@/components/blocks/callout";
import { ComparisonTable } from "@/components/tables/comparison-table";
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
  drivewayGuideLinks,
  asphaltCalculatorLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import { CONCRETE } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "How Long Does an Asphalt Driveway Last?";
const description =
  "An asphalt driveway lasts 15–25 years — 25+ when built on a proper base and maintained, as little as 8 when thin asphalt meets a weak base. The scenarios, the year-by-year decline curve, and the cost-per-year math.";
const path = ASPHALT.drivewayLifespan;
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
    question: "What is the average lifespan of an asphalt driveway?",
    answer:
      "15–25 years is the realistic range for a residential drive built with 3 in of compacted hot mix over a 6 in aggregate base. The spread is not random: construction quality sets the ceiling and maintenance decides whether you reach it. Well-built and maintained drives routinely pass 25 years; thin asphalt on a poor base can fail inside 8.",
  },
  {
    question: "What shortens a driveway's life the most?",
    answer:
      "Water in the base, by a wide margin. Unfilled cracks let water reach the aggregate layer, where it softens the support and — in freeze climates — expands 9% on every freeze, jacking the cracks wider each winter. Everything else on the villain list (thin lifts, poor compaction, tree roots, heavy trucks) either lets that water in faster or exploits the softness it causes.",
  },
  {
    question: "Does climate change how long asphalt lasts?",
    answer:
      "Yes, at both ends. Hard freeze-thaw regions cycle the pavement dozens of times a winter, punishing any unsealed crack; intense-sun regions oxidize the binder, turning the surface gray and brittle years sooner without sealcoat. Moderate, dry climates are where the 25+ year driveways live. The maintenance schedule matters most exactly where the climate is worst.",
  },
  {
    question: "Can an old driveway be saved with an overlay?",
    answer:
      "If the base is still sound — no rutting, pumping or widespread alligator cracking — a 2 in overlay effectively resets the clock, adding 10–12 years for roughly half the cost of replacement. If the base has failed, the overlay reprints the old crack pattern within 2–3 years. The year 12–18 assessment window exists to catch driveways while they still qualify.",
  },
  {
    question: "How does asphalt lifespan compare with concrete?",
    answer:
      "Concrete driveways typically run 25–40 years to asphalt's 15–25, in exchange for 40–60% higher installation cost and expensive repairs when they do crack. Asphalt counters with cheaper resurfacing — a mid-life overlay is routine, while concrete replacement is demolition. In freeze-thaw climates with road salt, the gap narrows considerably.",
  },
  {
    question: "When should I replace instead of repair?",
    answer:
      "Replace when the structure, not the surface, has failed: alligator cracking over large areas, ruts deeper than about 1 in, base pumping fines up through cracks, or a surface past 20–25 years that has already had an overlay. At that point patches and sealer are cosmetic — every dollar spent on them is a dollar not saved toward the $5–10/ft² rebuild.",
  },
];

const toc = tocFromTitles(
  "Lifespan by scenario",
  "Maintained vs neglected: the timeline",
  "What actually determines lifespan",
  "Cost per year of ownership",
);

export default function DrivewayLifespanPage() {
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
              variant="centered"
              title="How long does an asphalt driveway last?"
              description="15 to 25 years — and that 10-year spread is almost entirely under your control. Construction quality sets the ceiling; maintenance decides whether you reach it."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Driveway Lifespan", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Lifespan by scenario">
          <BarChart
            title="Expected service life by scenario (years)"
            unit="yr"
            data={[
              { label: "Well built + maintained", value: 25 },
              { label: "Well built, neglected", value: 15 },
              { label: "Thin lift / poor base", value: 8 },
              { label: "Overlay on sound base", value: 12 },
            ]}
          />
          <p className="text-muted-foreground">
            &quot;Well built&quot; means the standard section: 3 in of compacted hot mix in
            two lifts over 6 in of compacted aggregate base (8 in on clay), with real
            drainage. The overlay bar is additive — a 2 in overlay on a still-sound base
            buys roughly 12 more years on top of whatever the original surface delivered.
          </p>
        </Section>

        <Section title="Maintained vs neglected: the timeline">
          <ComparisonTable
            caption="The same well-built driveway under two owners. The divergence is slow, then sudden."
            columns={[
              { key: "maintained", label: "Maintained", highlight: true },
              { key: "neglected", label: "Neglected" },
            ]}
            rows={[
              {
                feature: "Year 5",
                values: {
                  maintained: "Sealed once; black, tight surface",
                  neglected: "Gray, oxidizing; first hairline cracks open",
                },
              },
              {
                feature: "Year 10",
                values: {
                  maintained: "Second/third seal; cracks filled annually, base dry",
                  neglected: "Open 1/4–1/2 in cracks; water reaching the base",
                },
              },
              {
                feature: "Year 15",
                values: {
                  maintained: "Minor patching; surface still serviceable",
                  neglected: "Alligator areas, edge crumbling — functionally end of life",
                },
              },
              {
                feature: "Year 20",
                values: {
                  maintained: "Candidate for a 2 in overlay on a sound base",
                  neglected: "Full removal and rebuild — base is gone too",
                },
              },
            ]}
          />
        </Section>

        <Section title="What actually determines lifespan">
          <InfoBlock title="The base sets the ceiling; maintenance decides if you reach it">
            No amount of sealcoating rescues a driveway built on 3 in of loose gravel, and
            no construction quality survives 15 years of open cracks feeding water into
            the base. The two factors multiply rather than add — which is why the scenario
            chart spans 8 to 25+ years for what is nominally the same product.
          </InfoBlock>
          <p className="text-muted-foreground">
            Deciding between materials on longevity? Both sides of this site argue their
            case — the{" "}
            <a href={ASPHALT.vsConcrete} className="font-medium text-primary hover:underline">
              asphalt vs concrete comparison
            </a>{" "}
            from the asphalt corner, and the{" "}
            <a href={CONCRETE.vsAsphalt} className="font-medium text-primary hover:underline">
              concrete vs asphalt guide
            </a>{" "}
            from the other. Short version: concrete lives longer, asphalt costs less
            upfront and is far cheaper to resurface at mid-life.
          </p>
        </Section>

        <Section title="Cost per year of ownership">
          <ExampleBlock
            scenario="A 720 ft² double driveway installed for $6,000. Owner A follows the maintenance schedule; owner B does nothing. Which driveway is actually cheaper?"
            steps={[
              {
                label: "Owner A: upkeep over 25 years",
                work: "6 sealcoat cycles × ~$230 + annual crack filling ≈ $2,200 total",
              },
              {
                label: "Owner A: cost per year",
                work: "($6,000 + $2,200) ÷ 25 years = $328/yr",
              },
              { label: "Owner B: upkeep", work: "$0 — but the surface fails at year 15" },
              { label: "Owner B: cost per year", work: "$6,000 ÷ 15 years = $400/yr" },
            ]}
            result="Neglect costs about $72 more per year — over 20% — and Owner B faces a new $6,000+ bill a decade sooner. The maintenance schedule is not an expense; it is the cheaper way to own asphalt."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" title="Lifespan questions" />

        <Cta
          variant="banner"
          title="Get on the schedule that reaches 25 years"
          description="The maintenance guide lays out every task, when to do it and what it costs."
          href={ASPHALT.drivewayMaintenance}
          buttonLabel="Driveway Maintenance Guide"
        />

        <RelatedArticles
          title="Build it right, keep it right"
          variant="cards"
          items={[
            ...pickLinks(drivewayGuideLinks, ASPHALT.drivewayMaintenance, ASPHALT.drivewayInstall),
            ...pickLinks(asphaltCalculatorLinks, ASPHALT.driveway),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.fhwa]} />
      </ArticleShell>
    </>
  );
}
