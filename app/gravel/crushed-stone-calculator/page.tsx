import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { CrushedStoneCalculatorCard } from "@/content/gravel/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { InlineToc } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock } from "@/components/blocks/callout";
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
import { GRAVEL, stoneGuideLinks, gravelCalculatorLinks, referenceLinks, pickLinks, GREFS } from "@/content/gravel/links";
import { CONCRETE, calculatorLinks as concreteCalcs, pickLinks as pickConcrete } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Crushed Stone Calculator — Tons by Size (#57, Crusher Run & More)";
const description =
  "Crushed stone tonnage from finished dimensions, with loose and compacted densities per size. Shows the loose volume arriving on the truck.";
const path = GRAVEL.crushed;
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
    question: "How many tons of #57 stone do I need per 100 square feet?",
    answer:
      "At 4 inches deep in place: 100 × 0.333 × 109 lb/ft³ (compacted) ÷ 2,000 ≈ 1.8 tons. Add 10% and call it 2 tons per 100 ft². At 2 inches, half that.",
  },
  {
    question: "What's the difference between #57 and crusher run?",
    answer:
      "#57 is clean stone — uniform 3/4–1 in pieces with no fines, so water flows through it and it stays permeable. Crusher run is stone plus dust down to powder; the fines lock together under compaction into a semi-solid base. Drainage jobs want #57; load-bearing bases want crusher run.",
  },
  {
    question: "Why does my delivery look bigger than the calculation?",
    answer:
      "You calculated in-place (compacted) volume; the truck delivers loose volume, which runs 10–15% larger for the same weight. The calculator's 'loose volume' line predicts the pile size so the delivery doesn't alarm you.",
  },
  {
    question: "Can I compact crushed stone myself?",
    answer:
      "For paths and pads, a rented plate compactor (about $90/day) does the job in 4-inch lifts with two to four passes per lift. Driveways and structural bases are better served by a ride-on or trench roller. Never place a full 8-inch depth and compact once — it only densifies the top 4 inches.",
  },
  {
    question: "Which stone goes under concrete slabs?",
    answer:
      "Most specs call for 4 inches of compacted #57 or crusher run as a capillary break and uniform bearing layer. Check your plans — then size the layer with this calculator and the slab above it with the concrete slab calculator.",
  },
];

const toc = tocFromTitles(
  "Loose vs compacted: what you're really ordering",
  "Worked example: French drain",
  "Compaction rules that protect the estimate",
);

export default function CrushedStoneCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Crushed Stone Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="sidebar"
        hero={
          <>
            <Hero
              eyebrow="Gravel · Crushed Stone"
              variant="standard"
              title="Crushed Stone Calculator"
              description="Angular, quarried and self-locking — crushed stone is the structural member of the aggregate family. Enter finished dimensions; the tool handles the loose-to-compacted arithmetic."
            >
              <AuthorBox author={author} datePublished="2026-07-15" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Crushed Stone Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<CrushedStoneCalculatorCard />}
        aside={
          <Cta
            variant="card"
            title="Which size do I need?"
            description="The stone sizes guide decodes #1 through #10 and stone dust."
            href={GRAVEL.stoneSizes}
            buttonLabel="Crushed Stone Sizes"
          />
        }
      >
        <InlineToc items={toc} />

        <Section title="Loose vs compacted: what you're really ordering">
          <FormulaBlock
            formula="Tons = in-place volume × compacted density ÷ 2,000"
            variables={[
              { symbol: "in-place volume", meaning: "finished dimensions after compaction" },
              { symbol: "compacted density", meaning: "≈109 lb/ft³ #57 · 140 crusher run" },
            ]}
            note="Weight is conserved through compaction — order the tons, and expect the loose pile to be 10–15% bigger than the finished layer."
          />
          <p className="text-muted-foreground">
            This is the concept that separates clean estimates from short ones: a compacted
            4-inch base consumes about 4.5 inches of delivered loose stone. The calculator
            reports both volumes so the takeoff, the delivery ticket, and the finished grade
            all reconcile. Densities by size live in the{" "}
            <a href={GRAVEL.stoneWeight} className="font-medium text-primary hover:underline">
              crushed stone weight guide
            </a>{" "}
            and the{" "}
            <a href={GRAVEL.refDensity} className="font-medium text-primary hover:underline">
              density database
            </a>
            .
          </p>
        </Section>

        <Section title="Worked example: French drain">
          <ExampleBlock
            scenario="A 60 ft French drain: trench 12 in wide × 18 in deep, 4 in perforated pipe, #57 stone throughout."
            steps={[
              { label: "Trench volume", work: "60 × 1.0 × 1.5 = 90 ft³" },
              { label: "Subtract the pipe", work: "90 − (π × 0.167² × 60 = 5.2) ≈ 85 ft³" },
              { label: "Tons of #57 (drainage stone stays loose: 100 lb/ft³)", work: "85 × 100 ÷ 2,000 = 4.25 tons" },
              { label: "Add 10%", work: "4.25 × 1.10 = 4.7 tons" },
            ]}
            result="Order 5 tons of #57. Wrap the trench in geotextile or the surrounding soil will clog the stone in a few seasons."
          />
        </Section>

        <Section title="Compaction rules that protect the estimate">
          <WarningBlock title="Three rules, no exceptions">
            <p>
              Compact in lifts of 4 in or less — a plate compactor only densifies the top few
              inches. Compact every lift before placing the next, or the base stays soft at
              depth and settles under load. And keep clean stone and crusher run in their
              lanes: clean stone under drains and slabs-on-grade, crusher run under anything
              that carries wheels.
            </p>
          </WarningBlock>
          <CoverageTable
            headers={["Application", "Stone", "Typical section"]}
            rows={[
              { label: "Concrete slab base", spec: "#57 or crusher run", coverage: '4 in compacted' },
              { label: "Driveway base", spec: "Crusher run over #2", coverage: '8 in in two lifts' },
              { label: "French drain", spec: "#57 clean", coverage: "Pipe + 4–6 in surround" },
              { label: "Paver base", spec: "Crusher run + 1 in stone dust bed", coverage: '4–6 in compacted' },
              { label: "Mud control / construction access", spec: "#2 (2–3 in)", coverage: '6 in, choked with crusher run' },
            ]}
            caption="Full application matrix in the crushed stone best uses guide."
          />
        </Section>

        <Faq items={faqItems} />

        <RelatedArticles title="The crushed stone series" variant="cards" items={stoneGuideLinks} />

        <RelatedArticles
          title="Related tools & references"
          variant="inline-strip"
          items={[
            ...pickLinks(gravelCalculatorLinks, GRAVEL.calculator, GRAVEL.driveway),
            ...pickLinks(referenceLinks, GRAVEL.refSizes, GRAVEL.refDensity),
            ...pickConcrete(concreteCalcs, CONCRETE.slab),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[GREFS.astmD448, GREFS.aashtoM43, GREFS.astmC29]} />
      </CalculatorPageShell>
    </>
  );
}
