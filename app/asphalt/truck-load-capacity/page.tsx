import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { WarningBlock, TipBlock } from "@/components/blocks/callout";
import { ExampleBlock } from "@/components/blocks/example-block";
import { CoverageTable } from "@/components/tables/coverage-table";
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
  weightGuideLinks,
  asphaltCalculatorLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Dump Truck Load Capacity for Asphalt";
const description =
  "Legal asphalt payloads by truck class — tandem 13–15 tons, tri-axle 16–19, end dump 23–25 — plus the federal weight limits behind them and how to sequence trucks so the paver never stops.";
const path = ASPHALT.truckCapacity;
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
    question: "How many tons of asphalt fit in a dump truck?",
    answer:
      "Legally: 6–8 tons in a single axle, 13–15 in a tandem, 16–19 in a tri-axle, 19–26 in a quad or quint, 23–25 in a semi end dump and up to 26 in a super dump. The bed could physically hold more — the limit is axle weight law, not volume.",
  },
  {
    question: "How many cubic yards of loose asphalt is a 15-ton load?",
    answer:
      "About 9.5 loose cubic yards — 15 tons ÷ 1.58 tons per loose cubic yard (117 lb/ft³). Rolled out, the same load becomes 7.7 compacted yards, or roughly 420 ft² at 3 inches. A tandem bed's 10–14 yd³ struck volume is deliberately larger than the legal payload requires.",
  },
  {
    question: "Why does a tandem gross out before the bed is full?",
    answer:
      "Asphalt is heavy — 117 lb/ft³ even loose. A 14 yd³ tandem bed brimmed with hot mix would carry about 22 tons, blowing past the 13–15-ton legal payload by 50%. With dense materials, trucks always weigh out before they cube out; struck volume is only the constraint for mulch-class materials.",
  },
  {
    question: "How long does hot mix stay workable in the truck?",
    answer:
      "Roughly 2–3 hours from load-out under normal conditions, less in cold or wind. Mix must arrive hot enough to finish compaction above cessation temperature (~175°F mat). Insulated bodies and tarps stretch the window; long hauls, small loads and thin lifts shrink it. Plan round trips accordingly.",
  },
  {
    question: "What does an overweight ticket actually cost?",
    answer:
      "Fines commonly scale per pound over the limit and reach four to five figures for serious overloads, but the fine is the small part: the load may be grounded until legalized, the hauler's safety score takes the hit, and repeated violations follow the contractor's permits. Bridges are posted for a reason — overweight tickets on posted structures are treated most severely.",
  },
  {
    question: "Should I order more small trucks or fewer big ones?",
    answer:
      "Match the truck to the site, then optimize count. Residential driveways often physically exclude tri-axles and end dumps — a tandem's shorter wheelbase wins. On open commercial work, bigger trucks cut per-ton haul cost, but only if the paver and site can absorb 25-ton deliveries. A stopped paver erases any hauling savings.",
  },
];

const toc = tocFromTitles(
  "Payload by truck class",
  "Legal limits, not bed size",
  "Planning trucks for a pour",
  "Keeping the paver moving",
);

export default function TruckLoadCapacityPage() {
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
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Hauling"
              variant="stat-strip"
              title="Dump truck load capacity for asphalt"
              description="Trucking is where asphalt jobs are won or lost: the mix is perishable, the loads are heavy and the axle laws are unforgiving. Here is what each truck class legally hauls and how to sequence them."
              stats={[
                { value: "13–15 t", label: "Tandem dump legal payload" },
                { value: "80,000 lb", label: "Federal gross vehicle weight cap" },
                { value: "2–3 hr", label: "Workable window for hot mix" },
                { value: "25%", label: "Loose fluff vs compacted volume" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Truck Load Capacity", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Size the order first"
            description="Get total tons from your dimensions, then divide by truck payload to plan loads."
            href={ASPHALT.weight}
            buttonLabel="Asphalt Weight Calculator"
          />
        }
      >
        <Section
          title="Payload by truck class"
          lead="Legal payloads assume typical tare weights and US federal/state axle limits; individual states and permits move these a few tons."
        >
          <CoverageTable
            headers={["Truck class", "Legal payload", "Struck volume & best use"]}
            rows={[
              {
                label: "Single-axle dump",
                spec: "6–8 US tons",
                coverage: "~5 yd³ — patches, utility cuts, tight residential sites",
              },
              {
                label: "Tandem-axle dump",
                spec: "13–15 US tons",
                coverage: "~10–14 yd³ — the paving workhorse; fits most driveways",
              },
              {
                label: "Tri-axle dump",
                spec: "16–19 US tons",
                coverage: "~15–17 yd³ — commercial lots and highway lifts",
              },
              {
                label: "Quad / quint axle",
                spec: "19–26 US tons",
                coverage: "~17–22 yd³ — high-tonnage work where state law allows",
              },
              {
                label: "End dump (semi trailer)",
                spec: "23–25 US tons",
                coverage: "~20–25 yd³ — plant-to-site line hauls; needs room to tip",
              },
              {
                label: "Super dump",
                spec: "up to 26 US tons",
                coverage: "~26 yd³ — max payload under the bridge formula via trailing axle",
              },
            ]}
            caption="Payload = legal gross vehicle weight minus tare. Loose hot mix at ~117 lb/ft³ means trucks weigh out long before beds are full."
          />
        </Section>

        <Section title="Legal limits, not bed size">
          <WarningBlock title="Payload is a legal number: GVW limit minus tare">
            The federal cap is 80,000 lb gross on the Interstate system, with per-axle and
            axle-group limits set by the federal bridge formula (23 CFR 658) — weight allowed
            grows with the number of axles and the distance between them, which is exactly why
            tri-axles, quads and super dumps exist. Subtract the truck&apos;s empty (tare)
            weight from its legal gross and what remains is payload. Load past it and the
            overweight citation lands on the hauler and follows the project: grounded loads,
            missed paving windows and mix cooling in the bed while the paperwork gets sorted.
          </WarningBlock>
        </Section>

        <Section title="Planning trucks for a pour">
          <ExampleBlock
            title="Worked example: trucking a 60-ton pour"
            scenario="A 60-ton parking-lot lift, 30 minutes round trip plant-to-paver, tandems with 15-ton payloads. The crew places about 30 tons per hour."
            steps={[
              { label: "Loads required", work: "60 tons ÷ 15 tons/load = 4 tandem loads" },
              { label: "Delivery interval the paver needs", work: "15 tons ÷ 30 tons/hr = one load every 30 min" },
              { label: "Trucks to sustain that interval", work: "30 min round trip ÷ 30 min interval = 1 truck + 1 buffer = 2 trucks" },
              { label: "Pour duration check", work: "60 tons ÷ 30 tons/hr = 2 hr — well inside the 2–3 hr mix window" },
            ]}
            result="Two tandems in rotation, four loads total, roughly a two-hour continuous pour."
          />
          <p className="text-muted-foreground">
            The arithmetic generalizes: trucks needed = round-trip time ÷ delivery interval,
            plus one buffer truck. Get total tonnage from the{" "}
            <a href={ASPHALT.weight} className="font-medium text-primary hover:underline">
              weight calculator
            </a>{" "}
            and stress-test the plan against traffic — a 30-minute round trip that becomes 45
            at rush hour changes the truck count, not just the schedule.
          </p>
        </Section>

        <Section title="Keeping the paver moving">
          <TipBlock title="Trucks queue for the paver — never the reverse">
            Every paver stop risks a roller-visible transverse mark and a cold joint; a queued
            truck just idles. Plan deliveries so there is always one loaded truck waiting: it
            is cheaper to pay 20 minutes of truck demurrage than to cut out and repave a
            starved, cooled mat. If loads back up more than two deep, slow the plant, not the
            paver.
          </TipBlock>
        </Section>

        <Faq items={faqItems} variant="list" title="Hauling questions" />

        <RelatedArticles
          title="Related guides"
          variant="cards"
          items={[
            ...pickLinks(weightGuideLinks, ASPHALT.weightChart, ASPHALT.weightConversion),
            ...pickLinks(asphaltCalculatorLinks, ASPHALT.calculator),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.bridgeFormula, AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
