import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { FootingCalculatorCard } from "@/content/concrete/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock, TipBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { QuickSizeTable } from "@/components/tables/quick-size-table";
import { InlineToc } from "@/components/toc/table-of-contents";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Concrete Footing Calculator: Yards, Width, Depth";
const description =
  "A 16×8 in strip footing uses about 1 cubic yard of concrete per 30 linear feet. Enter run, width and depth for yards and weight, plus IRC footing sizes.";
const path = CONCRETE.footing;
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
    question: "How deep do concrete footings need to be?",
    answer:
      "At least 6 in thick, with the bottom below the local frost line. Those are two separate requirements: the footing itself must be at least 6 in thick (IRC R403.1), and its bottom must sit below a frost line that runs anywhere from 12 in in the southern US to 60+ in in the upper Midwest and Canada. Your building department publishes the local frost depth; it is not negotiable.",
  },
  {
    question: "How wide should a footing be for an 8-inch wall?",
    answer:
      "16 inches. The rule of thumb is twice the wall thickness (16 in for an 8 in wall), which matches IRC Table R403.1(1) for most one- and two-story houses on average soil (1,500–2,000 psf bearing). Weak soils or three-story loads push widths to 20–24 in; that's an engineering decision, not a calculator's.",
  },
  {
    question: "Can I pour footings directly against the trench walls?",
    answer:
      "Yes, if the trench is clean, stable and cut to size. Earth-formed footings are standard practice for residential work. Expect to use 10–15% more concrete than the formed calculation because trench walls are never perfectly straight. Set the waste allowance to 15% for trench pours.",
  },
  {
    question: "Do footings need rebar?",
    answer:
      "Often, yes. Codes require it in seismic design categories D0–D2 and where footings span soft spots; two continuous #4 bars top and bottom is the common residential detail. Even where code doesn't demand it, two #4 bars cost little and bridge minor soil inconsistencies. Follow your approved plans.",
  },
  {
    question: "How much concrete for deck footings?",
    answer:
      "Deck piers are columns, not strip footings, so use the concrete column calculator for round sonotube piers. This page's tool is for continuous footings under walls.",
  },
  {
    question: "How do you calculate concrete for a footing?",
    answer:
      "Multiply the total footing run by the width and depth in feet, then divide by 27 for cubic yards. For a rectangular house, the run is 2 × (length + width) plus any interior bearing walls. Add 10% waste for formed footings or 15% for trench pours.",
  },
];

const toc = tocFromTitles(
  "Footing sizes that pass inspection",
  "The footing volume formula",
  "Worked example: house perimeter footing",
  "What goes wrong in trench pours",
);

export default function FootingCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15", dateModified: "2026-10-24" }),
          calculatorSchema({ name: "Concrete Footing Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="sidebar"
        hero={
          <>
            <Hero
              eyebrow="Concrete · Foundations"
              variant="compact"
              title="Concrete Footing Calculator"
              description="Total run × width × depth, with the right waste factor for trench or formed pours. Sizing guidance follows IRC Chapter 4."
            >
              <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Footing Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<FootingCalculatorCard />}
        aside={
          <RelatedArticles
            title="Related tools"
            variant="inline-strip"
            items={pickLinks(calculatorLinks, CONCRETE.wall, CONCRETE.column, CONCRETE.calculator)}
          />
        }
      >
        <InlineToc items={toc} />

        <QuickAnswer
          question="How much concrete do I need for a footing?"
          answer="A standard 16×8 in strip footing needs about 1 cubic yard of concrete per 30 linear feet. A 120 ft run therefore needs about 4.35 yd³ with a 10% waste allowance, roughly 8 tonnes. Width and depth are structural decisions, so confirm both against IRC Table R403.1 before ordering."
          ruleOfThumb="A 16×8 in footing uses about 1 cubic yard per 30 linear feet."
          formula="Order (yd³) = (Run × Width × Depth ÷ 27) × (1 + waste)"
        />

        <Section title="Footings by common run length">
          <p className="text-muted-foreground">
            At the common 16×8 in section, a 40 ft run needs 1.45 yd³ and a 200 ft run needs
            7.24 yd³, waste included.
          </p>
          <QuickSizeTable
            headers={["Footing run (16×8 in)", "Order (yd³)", "Approx. weight", "Est. material cost"]}
            rows={[
              ["40 ft", "1.45 yd³", "2.7 t", "$218–261"],
              ["80 ft", "2.90 yd³", "5.3 t", "$435–522"],
              ["120 ft", "4.35 yd³", "8.0 t", "$653–783"],
              ["160 ft", "5.79 yd³", "10.6 t", "$869–1,042"],
              ["200 ft", "7.24 yd³", "13.3 t", "$1,086–1,303"],
            ]}
            caption="16 in wide × 8 in deep, 10% waste included. Cost uses the $150–180/yd³ delivered ready-mix range from our concrete cost guide. Bag counts aren't shown because at this scale ready-mix is standard."
          />
        </Section>

        <Section
          title="Footing sizes that pass inspection"
          lead="Footing dimensions come from the code table, not from the concrete budget."
        >
          <CoverageTable
            headers={["Supporting", "Minimum width", "Typical section"]}
            rows={[
              { label: "1-story wood frame", spec: "12 in (305 mm)", coverage: "12 × 6 in", note: "On ≥1,500 psf soil" },
              { label: "2-story wood frame", spec: "15 in (380 mm)", coverage: "16 × 8 in", note: "Most common residential pour" },
              { label: "3-story / brick veneer", spec: "18–23 in", coverage: "20 × 10 in", note: "Verify bearing capacity" },
              { label: "Garden / landscape walls", spec: "2 × wall thickness", coverage: "16 × 8 in for 8 in wall", note: "Below frost line" },
              { label: "Deck beams (continuous)", spec: "Per span tables", coverage: "Use column calc for piers", note: "Piers are more common" },
            ]}
            caption="Condensed from IRC Table R403.1(1), load-bearing values 1,500–2,000 psf. Always confirm against the adopted code in your jurisdiction."
          />
          <TipBlock title="Frost depth rules the excavation">
            The footing bottom, not the top, must reach frost depth. In a 42-inch frost zone,
            an 8-inch footing means digging 42 in and pouring at the bottom; the wall above
            makes up the difference. Digging deeper than needed and backfilling under the
            footing is prohibited: concrete must bear on undisturbed soil or compacted
            engineered fill.
          </TipBlock>
        </Section>

        <Section title="The footing volume formula">
          <p className="text-muted-foreground">
            Footing volume is run × width × depth, plus 10% waste for formed pours or 15% for
            earth-formed trenches.
          </p>
          <FormulaBlock
            formula="V = Run × Width × Depth × (1 + waste)"
            variables={[
              { symbol: "Run", meaning: "total length of all footings", unit: "ft or m" },
              { symbol: "Width", meaning: "footing width", unit: "in or mm" },
              { symbol: "Depth", meaning: "footing thickness (vertical)", unit: "in or mm" },
              { symbol: "waste", meaning: "0.10 formed · 0.15 earth-formed" },
            ]}
            note="For a rectangular building, Run = 2 × (length + width). Interior bearing walls add their own runs, so walk the foundation plan and sum every footing line."
          />
        </Section>

        <Section title="Worked example: house perimeter footing">
          <ExampleBlock
            scenario="A 40 × 28 ft house with one 28 ft interior bearing wall. Footings are 16 in wide × 8 in deep, earth-formed in clean trenches."
            steps={[
              { label: "Perimeter run", work: "2 × (40 + 28) = 136 ft" },
              { label: "Add interior bearing wall", work: "136 + 28 = 164 ft total run" },
              { label: "Convert section to feet", work: "16 in = 1.333 ft · 8 in = 0.667 ft" },
              { label: "Gross volume", work: "164 × 1.333 × 0.667 = 145.8 ft³" },
              { label: "Add 15% (earth-formed) and convert", work: "145.8 × 1.15 ÷ 27 = 6.21 yd³" },
            ]}
            result="Order 6.5 yd³. One truck, one pour, no cold joints in the foundation."
          />
        </Section>

        <Section title="What goes wrong in trench pours">
          <WarningBlock title="Trench realities the formula can't see">
            <p>
              Trench walls slough and widen at every root and rock pocket, so measured widths run
              1–2 in over the excavator bucket. Sloped sites need stepped footings, and each
              step adds a small vertical pour that&apos;s easy to miss in the takeoff. And if
              groundwater is standing in the trench, pump it before the truck arrives; concrete
              placed through water segregates and loses strength.
            </p>
          </WarningBlock>
          <p className="text-muted-foreground">
            Footings feed directly into wall volume. If you&apos;re pouring a stem wall or full
            foundation wall on top, run the{" "}
            <a href={CONCRETE.wall} className="font-medium text-primary hover:underline">
              wall calculator
            </a>{" "}
            next and schedule both pours with the plant at once. Plants discount combined
            orders more often than you&apos;d think; see the{" "}
            <a href={CONCRETE.cost} className="font-medium text-primary hover:underline">
              cost guide
            </a>{" "}
            for how delivery fees stack.
          </p>
        </Section>

        <Faq items={faqItems} />

        <Cta
          variant="card"
          title="Estimating the whole foundation?"
          description="Footings, walls and a slab each take two minutes. Then hand the plant one combined order."
          href={CONCRETE.calculator}
          buttonLabel="Open the Concrete Calculator"
        />

        <RelatedArticles
          title="Foundation reading list"
          variant="list"
          items={pickLinks(guideLinks, CONCRETE.howTo, CONCRETE.mixRatio, CONCRETE.curing)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

        <References items={[REFS.irc, REFS.aci318, REFS.is456]} />
      </CalculatorPageShell>
    </>
  );
}
