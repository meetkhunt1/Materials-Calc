import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, howToSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import {
  GRAVEL,
  gravelCalculatorLinks,
  coreGuideLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import { CONCRETE } from "@/content/concrete/links";
import { ASPHALT } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "How to Calculate Gravel (Tons & Cubic Yards)";
const description =
  "The estimator's five-step method for gravel takeoffs: measure the area, pick a depth, compute volume, apply the type's density, and add a settling allowance. Worked in both tons and tonnes.";
const path = GRAVEL.howTo;
const author = getAuthor("materials-team");

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
});

const steps = [
  { name: "Measure the area", text: "Measure length and width in feet and multiply for square feet. Split irregular shapes into rectangles and sum the pieces — precision here is cheap, and every downstream number keys off it." },
  { name: "Pick the depth", text: "2 inches for decorative top-dressing, 3 inches for paths and patios, 4 inches per lift for driveways. Depth drives cost linearly, so choose it deliberately, not by habit." },
  { name: "Compute the volume", text: "Square feet × (depth in inches ÷ 12) gives cubic feet. Divide by 27 for cubic yards — the unit most suppliers quote in." },
  { name: "Apply the type's density", text: "Common gravel runs 105 lb/ft³ loose (1.42 US tons per cubic yard), pea gravel 96 lb/ft³, #57 stone 100 lb/ft³ loose, crusher run 125 lb/ft³ loose. Multiply volume by density, then divide pounds by 2,000 for tons." },
  { name: "Add a settling allowance", text: "Order 10% extra as standard; 15% where crusher run will be compacted or the subgrade is soft. Gravel consolidates the moment it leaves the truck — the allowance is not optional padding." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is the formula for calculating gravel in tons?",
    answer:
      "Tons = square feet × (depth in inches ÷ 12) × density (lb/ft³) ÷ 2,000, times a 1.10–1.15 waste factor. For common gravel at 105 lb/ft³, a useful shortcut is cubic yards × 1.42 = tons — one loose cubic yard weighs about 2,800 lb.",
  },
  {
    question: "How many tons are in a cubic yard of gravel?",
    answer:
      "About 1.42 US tons (2,800 lb) for common gravel, loose. Pea gravel is lighter at roughly 1.3 tons per yard, #57 stone runs about 1.35 loose, and compacted crusher run reaches 1.89 tons per cubic yard. Always match the factor to the specific material you are ordering.",
  },
  {
    question: "What depth should I calculate for?",
    answer:
      "2 inches for decorative cover over fabric, 3 inches for walkways and patios, and 4 inches per compacted lift for driveways — a new drive typically needs 8–12 inches total across two or three layers. Going below 2 inches leaves bare spots; the fabric shows within a season.",
  },
  {
    question: "How much extra gravel should I order?",
    answer:
      "10% is the standard allowance; go to 15% for crusher run that will be compacted, soft or muddy subgrade, or hand-spreading over an undulating surface. Running short costs a second delivery fee of $50–150, so the allowance nearly always pays for itself.",
  },
  {
    question: "Should I order in tons or cubic yards?",
    answer:
      "Order in whatever unit your supplier weighs or measures — most quarries sell by the ton off a certified scale, while landscape yards often sell by the loose cubic yard. Compute both from your volume and quote both on the phone; it flags conversion errors before the truck rolls.",
  },
  {
    question: "Does the calculation change for crusher run or pea gravel?",
    answer:
      "Only the density changes. Pea gravel drops to 96 lb/ft³, crusher run rises to 125 lb/ft³ loose and about 140 compacted — so a crusher run order in tons runs roughly 20% heavier than common gravel for the same volume. The five steps themselves are identical for every type.",
  },
];

const toc = tocFromTitles(
  "The five-step method",
  "The tonnage formula",
  "Worked example: gravel patio (imperial)",
  "Worked example: garden path (metric)",
  "Key conversions",
  "Same method, three materials",
);

export default function HowToCalculateGravelPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title,
            description,
            path,
            category: "Gravel",
            datePublished: "2026-07-15",
            author,
          }),
          howToSchema({
            name: "How to Calculate Gravel",
            description: "Five-step method for accurate gravel quantity takeoffs in tons or cubic yards.",
            path,
            steps,
            totalTime: "PT15M",
          }),
        ]}
      />
      <ArticleShell
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Method Guide"
              variant="centered"
              title="How to calculate gravel"
              description="Area, depth, density, allowance — the same five steps size a garden path and a 400-ton haul road. Learn them once and every quote you receive becomes checkable."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "How to Calculate Gravel", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Run the numbers"
            variant="inline-strip"
            items={pickLinks(gravelCalculatorLinks, GRAVEL.calculator, GRAVEL.cost)}
          />
        }
      >
        <Section title="The five-step method">
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step.name} className="flex gap-4 rounded-xl border p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold">{step.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="The tonnage formula">
          <FormulaBlock
            formula="Tons = ft² × (in ÷ 12) × density ÷ 2,000 × (1 + waste)"
            variables={[
              { symbol: "ft²", meaning: "Measured area", unit: "square feet" },
              { symbol: "in", meaning: "Depth", unit: "inches" },
              { symbol: "density", meaning: "Loose unit weight of the type", unit: "lb/ft³" },
              { symbol: "waste", meaning: "Settling allowance, 0.10–0.15", unit: "decimal" },
            ]}
            note="Common gravel: 105 lb/ft³ loose = 1,680 kg/m³ = 1.42 US tons/yd³. Divide cubic feet by 27 first if your supplier quotes cubic yards instead of tons."
          />
        </Section>

        <Section title="Worked example: gravel patio (imperial)">
          <ExampleBlock
            scenario="A 15 × 20 ft patio surfaced with 3 inches of common gravel over landscape fabric."
            steps={[
              { label: "Area", work: "15 × 20 = 300 ft²" },
              { label: "Volume at 3 in (0.25 ft)", work: "300 × 0.25 = 75 ft³ = 2.78 yd³" },
              { label: "Weight at 105 lb/ft³", work: "75 × 105 = 7,875 lb = 3.94 tons" },
              { label: "Add 10% settling allowance", work: "3.94 × 1.10 = 4.33 tons" },
            ]}
            result="Order 4.5 tons (about 3 loose cubic yards) — round up to the supplier's half-ton increment."
          />
        </Section>

        <Section title="Worked example: garden path (metric)">
          <ExampleBlock
            title="Worked example (metric)"
            scenario="A 12 m garden path, 1.5 m wide, dressed with 75 mm of common gravel."
            steps={[
              { label: "Area", work: "12 × 1.5 = 18 m²" },
              { label: "Volume at 75 mm (0.075 m)", work: "18 × 0.075 = 1.35 m³" },
              { label: "Mass at 1,680 kg/m³", work: "1.35 × 1,680 = 2,268 kg = 2.27 t" },
              { label: "Add 10% settling allowance", work: "2.27 × 1.10 = 2.49 t" },
            ]}
            result="Order 2.5 tonnes. Metric skips the ÷27 and ÷2,000 steps entirely — cubic metres × density in t/m³ is the whole calculation."
          />
        </Section>

        <Section title="Key conversions">
          <CoverageTable
            headers={["From", "To", "Operation"]}
            rows={[
              { label: "Inches", spec: "Feet", coverage: "÷ 12", note: "3 in = 0.25 ft — never multiply mixed units" },
              { label: "Cubic feet", spec: "Cubic yards", coverage: "÷ 27" },
              { label: "Cubic yards (common gravel)", spec: "US tons", coverage: "× 1.42", note: "Loose; 2,800 lb per yd³" },
              { label: "US tons (common gravel)", spec: "Coverage at 3 in", coverage: "× 76 ft²", note: "114 ft² at 2 in, 57 ft² at 4 in" },
              { label: "Cubic metres (common gravel)", spec: "Tonnes", coverage: "× 1.68" },
              { label: "Cubic yards", spec: "Cubic metres", coverage: "× 0.765" },
            ]}
            caption="The six conversions that cover nearly every gravel order. Densities for other types are in the density chart."
          />
          <TipBlock title="Quote both units on the phone">
            Tell the dispatcher your tons and your cubic yards. If their conversion doesn&apos;t
            land near yours, one of you has the wrong density — and it&apos;s a thirty-second fix
            now versus a short or heavy load on delivery day.
          </TipBlock>
        </Section>

        <Section title="Same method, three materials">
          <p className="text-muted-foreground">
            Area × depth × density is the universal takeoff. The identical five steps size a
            concrete pour — see{" "}
            <a href={CONCRETE.howTo} className="font-medium text-primary hover:underline">
              how to calculate concrete
            </a>{" "}
            — and an asphalt lift, covered in{" "}
            <a href={ASPHALT.howTo} className="font-medium text-primary hover:underline">
              how to calculate asphalt
            </a>
            . Only the density and the waste factor change: concrete at 150 lb/ft³, hot-mix
            asphalt at 145 compacted, gravel at 96–140 depending on type and compaction. Master
            the gravel version and the other two are substitutions.
          </p>
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Run your own takeoff"
          description="The gravel calculator applies this exact method with every density and unit conversion built in."
          href={GRAVEL.calculator}
          buttonLabel="Gravel Calculator"
        />

        <RelatedArticles
          title="Go deeper"
          variant="list"
          items={pickLinks(coreGuideLinks, GRAVEL.coverage, GRAVEL.densityChart, GRAVEL.volumeFormula)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[GREFS.astmC29, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
