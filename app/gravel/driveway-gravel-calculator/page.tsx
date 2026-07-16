import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { DrivewayGravelCalculatorCard } from "@/content/gravel/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { BarChart } from "@/components/charts/bar-chart";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { GRAVEL, drivewayGuideLinks, gravelCalculatorLinks, pickLinks, GREFS } from "@/content/gravel/links";
import { ASPHALT, drivewayGuideLinks as asphaltDriveway, pickLinks as pickAsphalt } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Driveway Gravel Calculator — Layer-by-Layer Tonnage";
const description =
  "Gravel driveway tonnage the right way: sub-base, base and surface layers computed separately, with truck-load counts and a full worked example.";
const path = GRAVEL.driveway;
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
    question: "How much gravel do I need for a 50-foot driveway?",
    answer:
      "A 50 × 12 ft drive (600 ft²) as a standard two-layer new build (4 in #57 + 4 in crusher run) needs roughly 24–26 tons with a 10% allowance — two tandem truck loads. A 2-inch resurfacing top-up needs about 6 tons.",
  },
  {
    question: "Why order the layers separately?",
    answer:
      "Because they're different products doing different jobs: large clean stone bridges soft ground, mid-size stone builds the structure, and fines-rich crusher run locks into the running surface. Suppliers price and load them separately, and mixing them into one order gets you a blend that does neither job.",
  },
  {
    question: "Can I skip the sub-base layer?",
    answer:
      "On firm, well-drained ground, yes — the two-layer build is standard. The #2 stone sub-base earns its cost on clay, wet ground, or anywhere trucks will use the drive; it's the layer that stops the whole system from sinking. When in doubt, dig a test hole after rain.",
  },
  {
    question: "How often does a gravel driveway need topping up?",
    answer:
      "Plan on 1 inch of surface material every 2–3 years under regular use — gravel migrates, crushes and presses into the base. That's the top-up option in the calculator. Regular grading (re-crowning) roughly halves the loss rate.",
  },
  {
    question: "Gravel vs asphalt driveway — how do costs compare?",
    answer:
      "Gravel installs at $1–3/ft² versus $2.50–5 for asphalt, but needs top-ups and grading forever. Gravel wins on long rural drives where asphalt's square footage is brutal; asphalt wins on short suburban drives where its maintenance is minimal. Both cost guides run the numbers.",
  },
];

const toc = tocFromTitles(
  "The three-layer system",
  "Worked example: 200-foot rural drive",
  "Where driveway gravel estimates fail",
);

export default function DrivewayGravelCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Driveway Gravel Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="hero-flow"
        hero={
          <>
            <Hero
              eyebrow="Gravel · Driveways"
              variant="stat-strip"
              title="Driveway Gravel Calculator"
              description="A gravel drive is a road in miniature: layers, compaction, crown, drainage. This calculator prices the layers; the guides below cover the rest."
              stats={[
                { value: "8–12 in", label: "total depth, new build" },
                { value: "3", label: "layers on soft ground" },
                { value: "~14 t", label: "per tandem truck load" },
                { value: "1 in", label: "surface loss per 2–3 yrs" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Driveway Gravel Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<DrivewayGravelCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <Section title="The three-layer system">
          <CoverageTable
            headers={["Layer", "Material & depth", "Job"]}
            rows={[
              { label: "Sub-base (bottom)", spec: '#2 stone (2–3 in rock), 4 in', coverage: "Bridges soft soil, stops pumping", note: "Skippable on firm ground" },
              { label: "Base (middle)", spec: '#57 stone, 4 in', coverage: "Structure and drainage" },
              { label: "Surface (top)", spec: 'Crusher run, 4 in crowned', coverage: "Locks tight, sheds water", note: "The layer you drive on and top up" },
            ]}
            caption="Per FHWA gravel-road practice, scaled to residential loads. Each layer compacted before the next."
          />
          <InfoBlock title="The crown is the maintenance plan">
            A 2–4% crown (about 1/4 in per foot of half-width) sheds water to the edges
            instead of letting it channel down the wheel tracks. Every pothole and washboard
            you&apos;ve ever cursed started as a flat, ponding surface — the{" "}
            <a href={GRAVEL.drivewayInstall} className="font-medium underline-offset-2 hover:underline">
              installation guide
            </a>{" "}
            shows how to build it in from day one.
          </InfoBlock>
        </Section>

        <Section title="Worked example: 200-foot rural drive">
          <ExampleBlock
            scenario="A 200 × 12 ft rural driveway on firm ground: standard two-layer build with 10% allowance."
            steps={[
              { label: "Area", work: "200 × 12 = 2,400 ft²" },
              { label: "#57 base: 4 in at 109 lb/ft³", work: "2,400 × 0.333 × 109 ÷ 2,000 × 1.10 = 48 tons" },
              { label: "Crusher run surface: 4 in at 140 lb/ft³", work: "2,400 × 0.333 × 140 ÷ 2,000 × 1.10 = 62 tons" },
              { label: "Truckloads", work: "110 ÷ 14 ≈ 8 tandem loads" },
            ]}
            result="≈110 tons across 8 loads — schedule deliveries layer by layer so each gets compacted before the next arrives."
          />
          <BarChart
            title="Where the tonnage goes (200 ft drive)"
            unit="tons"
            data={[
              { label: "Crusher run surface", value: 62 },
              { label: "#57 base", value: 48 },
            ]}
          />
        </Section>

        <Section title="Where driveway gravel estimates fail">
          <WarningBlock title="The soft-ground tax">
            <p>
              The first load on unprepared soft ground half-disappears — pressed into mud
              rather than building depth. Strip topsoil, let the subgrade dry, and use
              geotextile fabric on clay ($0.30–0.50/ft²): it pays for itself in the first
              saved load. That&apos;s also what the 15–20% waste options in the calculator
              are for.
            </p>
          </WarningBlock>
          <p className="text-muted-foreground">
            Thinking of paving over the gravel later? Build the base layers to this
            standard and they become the base course for{" "}
            <a href={ASPHALT.driveway} className="font-medium text-primary hover:underline">
              asphalt
            </a>{" "}
            down the road — nothing is wasted.
          </p>
        </Section>

        <Faq items={faqItems} variant="list" title="Driveway gravel questions" />

        <Cta
          variant="banner"
          title="Plan the whole driveway"
          description="Depth, layers, gravel types, cost, installation and maintenance — the complete series."
          href={GRAVEL.drivewayDepth}
          buttonLabel="Driveway Gravel Depth Guide"
        />

        <RelatedArticles title="The driveway series" variant="cards" items={drivewayGuideLinks} />

        <RelatedArticles
          title="Related tools & the asphalt path"
          variant="inline-strip"
          items={[
            ...pickLinks(gravelCalculatorLinks, GRAVEL.calculator, GRAVEL.crushed, GRAVEL.cost),
            ...pickAsphalt(asphaltDriveway, ASPHALT.drivewayCost),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[GREFS.fhwaGravel, GREFS.aashtoM43, GREFS.nssga]} />
      </CalculatorPageShell>
    </>
  );
}
