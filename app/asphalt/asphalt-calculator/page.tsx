import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { AsphaltCalculatorCard } from "@/content/asphalt/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { InlineToc } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock, TipBlock } from "@/components/blocks/callout";
import { DensityTable } from "@/components/tables/density-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { asphaltDensities } from "@/content/asphalt/charts/density-data";
import {
  ASPHALT,
  coreGuideLinks,
  asphaltCalculatorLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import { CONCRETE, calculatorLinks as concreteCalcs, pickLinks as pickConcrete } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Calculator — Tons, Cubic Yards & Coverage";
const description =
  "Convert paving dimensions to the tons of hot mix a plant will quote. Handles compacted thickness, four mix densities and a waste allowance.";
const path = ASPHALT.calculator;
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
    question: "How many tons of asphalt do I need?",
    answer:
      "Multiply area (ft²) by compacted thickness (ft) to get cubic feet, then by 145 lb/ft³, then divide by 2,000. Shortcut: one ton of hot mix covers about 80 ft² at 2 inches — halve the coverage each time you double the thickness.",
  },
  {
    question: "How much area does a ton of asphalt cover?",
    answer:
      "At compacted thickness: 160 ft² at 1 in, 80 ft² at 2 in, 53 ft² at 3 in, 40 ft² at 4 in. The coverage guide has the full table with metric equivalents.",
  },
  {
    question: "Do I measure loose or compacted thickness?",
    answer:
      "Plans and this calculator use compacted (after rolling) thickness. Crews spread roughly 25% thicker to compensate — a 3 in compacted lift is laid at about 3¾ in loose. Order from compacted numbers; the paver handles the fluff factor.",
  },
  {
    question: "Why does asphalt sell by the ton and not by the yard?",
    answer:
      "Every truck crosses a certified scale at the plant, so weight is exact and auditable; volume changes with temperature and compaction. Tickets, quotes and pay items are all in tons — the tons vs cubic yards guide covers converting between them.",
  },
  {
    question: "What thickness should I use?",
    answer:
      "Residential driveways: 3 in total (two lifts) over 6 in of base. Parking lots: 4 in+. Overlays on sound pavement: 1.5–2 in. Highways and truck yards are engineered per layer — see the thickness guide for the full breakdown.",
  },
  {
    question: "Does the calculator work for cold patch?",
    answer:
      "Yes — select cold mix in the mix dropdown. Note that bagged cold patch is sold by the 50 lb bag: divide the pound result by 50 for a bag count on pothole repairs.",
  },
];

const toc = tocFromTitles(
  "The tonnage formula",
  "Worked example: parking pad",
  "Mistakes that blow asphalt orders",
  "Density quick reference",
);

export default function AsphaltCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Asphalt Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="sidebar"
        hero={
          <>
            <Hero
              eyebrow="Asphalt"
              variant="stat-strip"
              title="Asphalt Calculator"
              description="Length × width × compacted thickness × density — reported in the tons your plant sells. Four mix densities built in, waste factor included."
              stats={[
                { value: "145", label: "lb/ft³ compacted hot mix" },
                { value: "80 ft²", label: "covered per ton @ 2 in" },
                { value: "1.96", label: "tons per cubic yard" },
                { value: "~25%", label: "loose-to-compacted fluff" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Asphalt Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<AsphaltCalculatorCard />}
        aside={
          <Cta
            variant="card"
            title="Paving a driveway?"
            description="The driveway calculator adds the gravel base course to the same estimate."
            href={ASPHALT.driveway}
            buttonLabel="Driveway Calculator"
          />
        }
      >
        <InlineToc items={toc} />

        <Section title="The tonnage formula">
          <FormulaBlock
            formula="Tons = Area (ft²) × (t ÷ 12) × 145 ÷ 2,000 × (1 + waste)"
            variables={[
              { symbol: "Area", meaning: "length × width", unit: "ft²" },
              { symbol: "t", meaning: "compacted thickness", unit: "inches" },
              { symbol: "145", meaning: "compacted hot mix density", unit: "lb/ft³" },
              { symbol: "2,000", meaning: "pounds per US ton" },
            ]}
            note="Metric: tonnes = m² × thickness (m) × 2.322. The full derivation is in the how-to-calculate guide."
          />
          <p className="text-muted-foreground">
            The one asphalt-specific twist versus a{" "}
            <a href={CONCRETE.calculator} className="font-medium text-primary hover:underline">
              concrete
            </a>{" "}
            takeoff: the answer converts to weight, because plants batch and bill by the
            certified scale ticket. Everything upstream — measuring, unit conversion, waste —
            is the same discipline. If you only need the volume, the{" "}
            <a href={ASPHALT.volume} className="font-medium text-primary hover:underline">
              volume calculator
            </a>{" "}
            skips the density step.
          </p>
        </Section>

        <Section title="Worked example: parking pad">
          <ExampleBlock
            scenario="A 30 × 18 ft parking pad, 4 in compacted hot mix, machine laid with simple edges."
            steps={[
              { label: "Area", work: "30 × 18 = 540 ft²" },
              { label: "Volume", work: "540 × (4 ÷ 12) = 180 ft³" },
              { label: "Weight", work: "180 × 145 = 26,100 lb" },
              { label: "Tons + 5% waste", work: "26,100 ÷ 2,000 × 1.05 = 13.7 tons" },
            ]}
            result="Order 14 tons — one tandem truck plus a small top-up, so ask the plant to load 14 on one truck if legal in your state."
          />
        </Section>

        <Section title="Mistakes that blow asphalt orders">
          <WarningBlock title="Four ways tonnage estimates go wrong">
            <p>
              1. Using loose thickness instead of compacted — a 25% overstatement. 2. Assuming
              concrete&apos;s density (150 lb/ft³ vs 145) when converting old tables. 3.
              Forgetting that overlays need a leveling course on rutted pavement, which adds
              10–20% tonnage that never shows in plan math. 4. Ordering exact: hot mix can&apos;t
              wait for a second truck — it&apos;s workable for roughly 2–3 hours after loading,
              less in cold wind.
            </p>
          </WarningBlock>
          <TipBlock title="Verify with the delivery ticket">
            Every load comes with a scale ticket showing net tons. Track tickets against this
            estimate during the pour — if you&apos;re at 60% of area but 75% of tonnage, the
            crew is running thick and you&apos;ll be a truck short by the end.
          </TipBlock>
        </Section>

        <Section
          title="Density quick reference"
          lead="Tonnage lives and dies by density. Full tables — including millings and binder — in the density chart."
        >
          <DensityTable
            rows={asphaltDensities.slice(0, 5)}
            highlight="Hot mix asphalt (compacted)"
            caption="Typical values; the plant's mix design sheet (ASTM D2726) governs on paid work. Compare with concrete in the concrete density chart."
          />
        </Section>

        <Faq items={faqItems} />

        <RelatedArticles title="Asphalt guides" variant="cards" items={coreGuideLinks} />

        <RelatedArticles
          title="More asphalt calculators"
          variant="inline-strip"
          items={pickLinks(asphaltCalculatorLinks, ASPHALT.driveway, ASPHALT.weight, ASPHALT.cost, ASPHALT.volume)}
        />

        <RelatedArticles
          title="Working in concrete too?"
          variant="list"
          items={pickConcrete(concreteCalcs, CONCRETE.calculator, CONCRETE.slab)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4, AREFS.astmD2726, AREFS.napa]} />
      </CalculatorPageShell>
    </>
  );
}
