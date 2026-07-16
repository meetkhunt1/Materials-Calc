import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock } from "@/components/blocks/callout";
import { CostTable } from "@/components/tables/cost-table";
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
  drivewayGuideLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Equipment Cost — Pavers, Rollers & What Jobs Carry";
const description =
  "2026 rental rates for pavers, rollers, milling machines and compactors, what each machine adds per square foot, and why hand-laying hot mix beyond patch scale fails on compaction.";
const path = ASPHALT.equipmentCost;
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
    question: "How much does it cost to rent an asphalt paver?",
    answer:
      "$800–2,000 per day in 2026 for a small commercial paver, plus delivery both ways ($150–400 each) and a damage waiver. Rental houses also require proof of operator competence for tracked pavers. For a one-driveway job the rental rarely pencils out against hiring a contractor whose bid already amortizes an owned machine.",
  },
  {
    question: "What equipment does a residential paving job actually use?",
    answer:
      "A small paver (8–10 ft screed), a 3–5 ton tandem vibratory roller, sometimes a pneumatic roller for intermediate compaction, a skid steer for base work and loading, and hand tools. Trucks cycle mix from the plant. On typical driveways this equipment package adds roughly $0.60–1.00 per square foot to the installed price.",
  },
  {
    question: "Can I lay hot mix asphalt by hand?",
    answer:
      "Only at patch scale — a few square feet. Hot mix must be compacted to roughly 92–96% of maximum density while above about 175°F, and a plate compactor can only achieve that in small, thin areas before the mat cools. Hand-raked driveways fail early through raveling and water intrusion because density was never reached.",
  },
  {
    question: "What does a milling machine cost, and when is one needed?",
    answer:
      "$2,000–5,000 per day rented with operator, which is why milling appears as a separate line on overlay quotes, typically $0.35–0.75 per square foot. You need one when an overlay would raise the surface too high against garages, curbs or drainage, or when the existing pavement is too deteriorated to overlay directly.",
  },
  {
    question: "Why do contractors charge mobilization for equipment?",
    answer:
      "Pavers and rollers move on lowboy trailers with a truck and driver, at real cost per move — the $1,500–3,000 mobilization minimum on small jobs is mostly equipment transport plus crew travel. It exists whether the job is 200 square feet or 2,000, which is why per-square-foot pricing collapses as jobs grow.",
  },
];

const toc = tocFromTitles(
  "Rental rates by machine (2026)",
  "What equipment adds per square foot",
  "Machine width vs job width",
  "The DIY reality check",
  "Worked example: equipment share of a $5,000 driveway",
);

export default function AsphaltEquipmentCostPage() {
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
              title="Asphalt equipment costs, machine by machine"
              description="Every paving bid quietly carries a fleet: a paver, two rollers, a skid steer and the trucks that feed them. Here is what those machines rent for and what they add to your square-foot price."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Equipment Cost", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Related reading"
            variant="inline-strip"
            items={[
              ...pickLinks(costGuideLinks, ASPHALT.laborCost, ASPHALT.costPerSqft),
              ...pickLinks(drivewayGuideLinks, ASPHALT.drivewayInstall),
            ]}
          />
        }
      >
        <Section title="Rental rates by machine (2026)">
          <CostTable
            currency="USD"
            rows={[
              { item: "Asphalt paver (8–10 ft screed)", unit: "day", low: 800, high: 2000, note: "Plus lowboy delivery each way" },
              { item: "Tandem vibratory roller (3–5 ton)", unit: "day", low: 300, high: 600, note: "Breakdown and finish rolling" },
              { item: "Pneumatic (rubber-tire) roller", unit: "day", low: 350, high: 700, note: "Intermediate compaction, kneads the mat" },
              { item: "Milling machine (half-lane)", unit: "day", low: 2000, high: 5000, note: "Usually rented with operator" },
              { item: "Skid steer with bucket / broom", unit: "day", low: 250, high: 400, note: "Base grading, loading, sweeping" },
              { item: "Plate compactor", unit: "day", low: 80, high: 150, note: "Patches and edges only — not mat compaction" },
            ]}
            caption="US rental-house day rates, 2026, before delivery, fuel and damage waivers. Weekly rates run roughly 3× the day rate."
          />
        </Section>

        <Section title="What equipment adds per square foot">
          <CostTable
            currency="USD"
            rows={[
              { item: "Residential driveway (paver + 2 rollers + skid)", unit: "ft²", low: 0.6, high: 1.0, note: "One crew-day of iron for any driveway" },
              { item: "Commercial lot 5,000+ ft²", unit: "ft²", low: 0.35, high: 0.6, note: "Same fleet, far more square feet" },
              { item: "Overlay with milling", unit: "ft²", low: 0.75, high: 1.25, note: "Milling machine drives the premium" },
              { item: "Patch work (saw + plate compactor)", unit: "ft²", low: 1.5, high: 3.0, note: "Small tools, tiny areas — worst ratio" },
            ]}
            caption="Equipment component of installed cost, including transport, fuel and ownership recovery. Compare against the 40–50% material share."
          />
        </Section>

        <Section title="Machine width vs job width">
          <InfoBlock title="Why driveways don&apos;t get highway pavers">
            A highway-class paver spreads a 12–16 ft mat and wants to run continuously at
            full truck cycles — park it on a 10 ft driveway and you pay to mobilize 20 tons
            of machine that can never open its screed. Residential contractors run compact
            pavers with 8–10 ft screeds precisely because driveway widths are 9–12 ft, and
            good designers keep paved widths at multiples of the screed to avoid hand-raked
            slivers along the edges — the slowest, weakest asphalt on the job.
          </InfoBlock>
        </Section>

        <Section title="The DIY reality check">
          <p className="text-muted-foreground">
            The machine list above is also the honest answer to &quot;can I pave this
            myself?&quot; Hot mix leaves the plant at roughly 300°F and must be compacted to
            92–96% of maximum density before it cools below about 175°F. A paver places a
            uniform, pre-compacted mat; rollers finish the density inside that window. Hand
            raking spreads mix unevenly and slowly, so by the time a plate compactor touches
            it, half the area is already too cold to densify. The result ravels and admits
            water in the first winters.
          </p>
          <p className="text-muted-foreground">
            Where DIY equipment rental does make sense: a plate compactor at $80–150 per day
            for cold-patch pothole repairs and utility-cut patches under a few square yards,
            and a skid steer for base preparation ahead of a contractor&apos;s paving crew.
            Beyond patch scale, rent nothing — buy the crew that comes with the paver.
          </p>
        </Section>

        <Section title="Worked example: equipment share of a $5,000 driveway">
          <ExampleBlock
            scenario="A 1,000 ft² driveway installed for $5,000 ($5.00/ft², 3 in compacted). Where does the iron sit in that number?"
            steps={[
              { label: "Material (≈45%)", work: "18 tons × ~$125 delivered ≈ $2,250" },
              { label: "Labor (≈25%)", work: "Crew-day ≈ $1,250" },
              { label: "Equipment (≈17%)", work: "Paver + rollers + skid steer + transport ≈ $850, i.e. $0.85/ft²" },
              { label: "Overhead and margin (≈13%)", work: "≈ $650" },
            ]}
            result="About $850 of a $5,000 driveway is equipment — roughly what the same fleet would cost you for one rental day, before delivery, fuel, or knowing how to run a screed. The contractor's price includes the machines and the muscle memory."
          />
        </Section>

        <Faq items={faqItems} variant="list" />

        <Cta
          variant="banner"
          title="Estimate before you rent or hire"
          description="Tonnage drives everything — get yours from area and thickness in seconds."
          href={ASPHALT.cost}
          buttonLabel="Asphalt Cost Calculator"
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
