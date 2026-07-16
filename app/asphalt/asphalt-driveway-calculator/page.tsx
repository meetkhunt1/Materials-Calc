import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { DrivewayCalculatorCard } from "@/content/asphalt/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, drivewayGuideLinks, asphaltCalculatorLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Driveway Calculator — Tons + Gravel Base";
const description =
  "Size a residential asphalt driveway: hot-mix tonnage and the aggregate base beneath it, with dimension presets and a full worked example.";
const path = ASPHALT.driveway;
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
    question: "How many tons of asphalt for a typical driveway?",
    answer:
      "A 12 × 40 ft single-car driveway at 3 in compacted needs about 8 tons of hot mix plus roughly 17 tons of base gravel at 6 in. Doubles run 15–18 tons of asphalt. Your dimensions in the calculator give the exact figure.",
  },
  {
    question: "Do I really need a gravel base?",
    answer:
      "Asphalt is a flexible pavement — it spreads loads into whatever is underneath, so its strength is mostly the base's strength. Skipping or skimping the base is the #1 cause of alligator cracking within five years. 6 in compacted is the residential standard; 8 in on clay.",
  },
  {
    question: "Can I pave over my existing gravel driveway?",
    answer:
      "Often yes — if the gravel is sound, well-drained and at least 4 in thick after reshaping. The crew regrades, compacts, and paves. Select the 4 in base option in the calculator to model this; soft spots must still be dug out and rebuilt first.",
  },
  {
    question: "One lift or two?",
    answer:
      "A 3 in driveway is best placed as a 2 in binder lift plus a 1–1.5 in surface lift — better compaction and a tighter finish. Single 3 in lifts are common on budget work and acceptable with a heavy roller, but lift thickness should never exceed 3× the largest aggregate size.",
  },
  {
    question: "How long before I can drive on a new asphalt driveway?",
    answer:
      "Walk on it after 24 hours, drive after 2–3 days in moderate weather, and keep trailer jacks, kickstands and sharp turning-in-place off it for the first summer. Full oxidation hardening takes 6–12 months — details in the driveway FAQs.",
  },
];

const toc = tocFromTitles(
  "How the two-layer estimate works",
  "Worked example: double driveway with flare",
  "Getting the dimensions right",
  "Where driveway estimates go wrong",
);

export default function DrivewayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Asphalt Driveway Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="split"
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Driveways"
              variant="compact"
              title="Asphalt Driveway Calculator"
              description="One estimate, both layers: the hot mix you'll see and the gravel base that decides how long it lasts."
            >
              <AuthorBox author={author} datePublished="2026-07-15" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Driveway Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<DrivewayCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <Section title="How the two-layer estimate works">
          <FormulaBlock
            formula="Tons = Area × t × ρ ÷ 2,000   (asphalt and base separately)"
            variables={[
              { symbol: "Area", meaning: "driveway length × width", unit: "ft²" },
              { symbol: "t", meaning: "layer thickness", unit: "ft" },
              { symbol: "ρ", meaning: "145 lb/ft³ asphalt · 140 lb/ft³ base" },
            ]}
            note="The calculator runs this twice — once per layer — and applies your waste factor to both."
          />
          <InfoBlock title="The base is the pavement">
            An asphalt driveway is an engineered sandwich: compacted subgrade, 4–8 in of
            dense-graded aggregate, then 2–4 in of hot mix. The asphalt resists water and
            abrasion; the base carries the car. That&apos;s why this calculator won&apos;t let
            you forget the gravel line item — and why the{" "}
            <a href={ASPHALT.drivewayInstall} className="font-medium text-primary hover:underline">
              installation guide
            </a>{" "}
            spends most of its words below the surface.
          </InfoBlock>
        </Section>

        <Section title="Worked example: double driveway with flare">
          <ExampleBlock
            scenario="A 20 × 36 ft double driveway plus a flared street entrance averaging 24 × 8 ft. 3 in asphalt over 6 in base."
            steps={[
              { label: "Main area + flare", work: "(20 × 36) + (24 × 8) = 912 ft²" },
              { label: "Asphalt tons", work: "912 × 0.25 ft × 145 ÷ 2,000 = 16.5 tons" },
              { label: "Add 10% (flare = hand work)", work: "16.5 × 1.10 = 18.2 tons" },
              { label: "Base gravel", work: "912 × 0.5 × 140 ÷ 2,000 × 1.10 = 35.1 tons" },
            ]}
            result="Order 18 tons of hot mix and 35 tons of aggregate base — about two tandem loads of each."
          />
        </Section>

        <Section title="Getting the dimensions right">
          <CoverageTable
            headers={["Configuration", "Typical size", "Area"]}
            rows={[
              { label: "Single car", spec: "10–12 ft × 30–40 ft", coverage: "300–480 ft²" },
              { label: "Double car", spec: "20–24 ft × 30–40 ft", coverage: "600–960 ft²" },
              { label: "Street flare", spec: "adds 2–4 ft each side at the apron", coverage: "+40–80 ft²", note: "Almost always forgotten" },
              { label: "Turnaround pad", spec: "10 × 20 ft minimum", coverage: "+200 ft²" },
              { label: "RV / boat pad", spec: "12 × 30–45 ft at 4 in thick", coverage: "360–540 ft²", note: "Thicker section than the drive" },
            ]}
            caption="Full layout guidance — widths, radii, slopes — in the standard driveway dimensions guide."
          />
        </Section>

        <Section title="Where driveway estimates go wrong">
          <WarningBlock title="The three chronic omissions">
            <p>
              The street flare (add it as its own rectangle), the thicker RV pad section
              (calculate separately at 4 in), and edge waste on curved driveways — hand-formed
              curves waste double what straight machine edges do. When your driveway has all
              three, run each area separately in the calculator and sum the tons.
            </p>
          </WarningBlock>
          <p className="text-muted-foreground">
            Budgeting the full job? Material is only 40–50% of an installed driveway — the{" "}
            <a href={ASPHALT.drivewayCost} className="font-medium text-primary hover:underline">
              driveway cost guide
            </a>{" "}
            itemizes excavation, base, paving and rolling, and the{" "}
            <a href={ASPHALT.cost} className="font-medium text-primary hover:underline">
              cost calculator
            </a>{" "}
            turns your tonnage into dollars.
          </p>
        </Section>

        <Faq items={faqItems} variant="list" title="Driveway questions" />

        <Cta
          variant="banner"
          title="Plan the whole driveway project"
          description="Dimensions, thickness, installation, cost, maintenance and lifespan — the complete series."
          href={ASPHALT.drivewayInstall}
          buttonLabel="Driveway Installation Guide"
        />

        <RelatedArticles title="The driveway series" variant="cards" items={drivewayGuideLinks} />

        <RelatedArticles
          title="Other asphalt tools"
          variant="inline-strip"
          items={pickLinks(asphaltCalculatorLinks, ASPHALT.calculator, ASPHALT.cost, ASPHALT.weight)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.ms4, AREFS.fhwa]} />
      </CalculatorPageShell>
    </>
  );
}
