import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { WallCalculatorCard } from "@/content/concrete/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock, InfoBlock } from "@/components/blocks/callout";
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
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Concrete Wall Calculator — Foundation & Retaining Walls";
const description =
  "Concrete volume for cast-in-place walls with openings subtracted. Covers formwork pressure limits, lift heights and a basement wall worked example.";
const path = CONCRETE.wall;
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
    question: "How much concrete is in an 8-inch foundation wall?",
    answer:
      "An 8 in wall holds 0.667 ft³ per square foot of wall face — almost exactly 1 yd³ per 40 ft² of wall. A typical 8 ft tall, 40 ft long wall face (320 ft²) therefore needs about 8 yd³ before waste.",
  },
  {
    question: "Should I subtract window and door openings?",
    answer:
      "Yes, when they're large. A single basement window buck (say 32 × 16 in ≈ 3.5 ft²) is noise inside the waste allowance, but a walkout door plus three windows in one wall can exceed 60 ft² — nearly 1.5 yd³ in an 8 in wall. The calculator's openings field handles this.",
  },
  {
    question: "How fast can I fill a wall form?",
    answer:
      "Form pressure is governed by pour rate and concrete temperature (ACI 347). Standard residential panel forms are commonly rated around 600–800 psf, which at 70°F works out to roughly 4–5 ft of placement per hour. Filling a full-height 8 ft wall in one fast pass can blow out forms — pour in lifts around the wall instead.",
  },
  {
    question: "What slump should wall concrete be?",
    answer:
      "5–6 in slump places well in walls; anything stiffer honeycombs around rebar and anything wetter is usually water added on site, which cuts strength (each added gallon per yard costs roughly 200 psi). Order a mid-range water-reducer mix rather than adding water at the truck.",
  },
  {
    question: "Is an ICF wall calculated the same way?",
    answer:
      "The concrete core is — length × height × core thickness (typically 6 or 8 in) minus openings. The foam form adds no concrete. ICF suppliers publish per-form volumes; they agree with this calculator to within a percent or two.",
  },
];

const toc = tocFromTitles(
  "Wall volume math, with openings",
  "Worked example: basement with a walkout",
  "Formwork pressure: the safety constraint",
  "Concrete per square foot of wall",
);

export default function WallCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Concrete Wall Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="split"
        hero={
          <>
            <Hero
              eyebrow="Concrete · Walls"
              variant="stat-strip"
              title="Concrete Wall Calculator"
              description="Length × height × thickness, minus openings, plus the right waste factor. The notes below cover the part calculators can't do: getting the concrete into the form safely."
              stats={[
                { value: "1 yd³", label: "per 40 ft² of 8 in wall" },
                { value: "4–5 ft/hr", label: "safe pour rate @ 70°F" },
                { value: "5–6 in", label: "target slump for walls" },
                { value: "2 sides", label: "of formwork required" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Wall Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<WallCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <Section title="Wall volume math, with openings">
          <FormulaBlock
            formula="V = (L × H − A₀) × t × (1 + waste)"
            variables={[
              { symbol: "L", meaning: "wall length", unit: "ft or m" },
              { symbol: "H", meaning: "wall height", unit: "ft or m" },
              { symbol: "A₀", meaning: "total area of openings", unit: "ft² or m²" },
              { symbol: "t", meaning: "wall thickness", unit: "ft or m" },
            ]}
            note="Corners are counted once: measure lengths along the wall centerline, or measure outside faces and accept ~1% overage on a rectangular foundation."
          />
          <p className="text-muted-foreground">
            For a full foundation, run each wall face through the calculator (or sum the
            centerline perimeter and treat it as one long wall). Remember the footing below is
            a separate volume — the{" "}
            <a href={CONCRETE.footing} className="font-medium text-primary hover:underline">
              footing calculator
            </a>{" "}
            handles that, and the two pours are usually days apart anyway.
          </p>
        </Section>

        <Section title="Worked example: basement with a walkout">
          <ExampleBlock
            scenario="A 36 × 28 ft basement, 8 ft walls, 8 in thick. One walkout door (7 × 4 ft) and four window bucks (each 32 × 16 in)."
            steps={[
              { label: "Centerline perimeter", work: "2 × (36 + 28) = 128 ft" },
              { label: "Gross wall face", work: "128 × 8 = 1,024 ft²" },
              { label: "Openings", work: "28 ft² (door) + 4 × 3.6 ft² = 42.2 ft²" },
              { label: "Net face × thickness", work: "(1,024 − 42.2) × 0.667 = 654.8 ft³" },
              { label: "Add 10%, convert to yards", work: "654.8 × 1.10 ÷ 27 = 26.7 yd³" },
            ]}
            result="Order 27 yd³ — that's three 9-yard trucks, so sequence them 45 minutes apart."
          />
          <InfoBlock title="Multi-truck pours need a schedule">
            Each truck holds 8–10 yd³. For pours over one truck, tell the dispatcher the wall
            layout and ask for staggered arrival — concrete sitting in a drum past 90 minutes
            (ASTM C94 limit) may be rejected, and a wall poured with an hour gap between trucks
            gets a visible cold joint.
          </InfoBlock>
        </Section>

        <Section title="Formwork pressure: the safety constraint">
          <WarningBlock title="Forms fail sideways, not down">
            <p>
              Fresh concrete is a 150 lb/ft³ fluid. At a full 8 ft height poured quickly, lateral
              pressure at the form base approaches 1,200 psf — above the rating of common
              residential panels. ACI 347 lets you count on pressure relief as lower lifts
              stiffen: pour 2–4 ft lifts around the whole wall, then come back around. Never
              race the drum; blowouts dump yards of concrete in seconds and are genuinely
              dangerous.
            </p>
          </WarningBlock>
        </Section>

        <Section
          title="Concrete per square foot of wall"
          lead="Yards per 100 ft² of wall face — memorize your thickness and you can estimate standing in the excavation."
        >
          <BarChart
            title="Concrete per 100 ft² of wall face"
            unit="yd³"
            data={[
              { label: '6 in wall', value: 1.85 },
              { label: '8 in wall', value: 2.47 },
              { label: '10 in wall', value: 3.09 },
              { label: '12 in wall', value: 3.7 },
            ]}
          />
        </Section>

        <Faq items={faqItems} variant="list" title="Wall pour questions" />

        <Cta
          variant="inline"
          title="Compare your wall estimate against ready-mix pricing in the cost guide"
          href={CONCRETE.cost}
        />

        <RelatedArticles
          title="Related calculators & guides"
          variant="cards"
          items={[
            ...pickLinks(calculatorLinks, CONCRETE.footing, CONCRETE.column),
            ...pickLinks(guideLinks, CONCRETE.curing),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[REFS.aci347, REFS.astmC94, REFS.aci318]} />
      </CalculatorPageShell>
    </>
  );
}
