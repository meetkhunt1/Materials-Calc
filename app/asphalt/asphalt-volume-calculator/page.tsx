import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { VolumeCalculatorCard } from "@/content/asphalt/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { InlineToc } from "@/components/toc/table-of-contents";
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
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, volumeGuideLinks, asphaltCalculatorLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import { CONCRETE, guideLinks as concreteGuides, pickLinks as pickConcrete } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Volume Calculator — Cubic Yards, Feet & Meters";
const description =
  "Pure geometric volume from plan dimensions, in every unit — plus the equivalent hot-mix tonnage at standard density.";
const path = ASPHALT.volume;
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
    question: "How do I calculate asphalt volume?",
    answer:
      "Length × width × compacted depth, all in one unit system. In feet, divide the cubic-foot result by 27 for cubic yards. The volume formula guide walks every step with the unit traps flagged.",
  },
  {
    question: "How many cubic feet in a ton of asphalt?",
    answer:
      "Compacted hot mix: 2,000 ÷ 145 = 13.8 ft³ per ton. Loose in the truck it's about 17 ft³ per ton. Divide any volume by those figures to convert to order tons.",
  },
  {
    question: "Should I calculate volume loose or compacted?",
    answer:
      "Compacted — that's what drawings specify and what ends up in the pavement. The paver's screed lays material about 25% thicker, then rollers bring it down; plants and crews handle that internally.",
  },
  {
    question: "Why does this calculator show tons at all?",
    answer:
      "Because pure volume is almost never the final answer in asphalt — plants sell weight. The tons line uses the standard 145 lb/ft³ so you can go straight to ordering; for other mixes use the weight calculator with the right density.",
  },
  {
    question: "How do I handle multiple areas?",
    answer:
      "Either sum the areas first (if thickness is uniform) or use the identical-sections field for repeats. Different thicknesses — a drive at 3 in plus a pad at 4 in — must be computed separately and the tons summed.",
  },
];

const toc = tocFromTitles(
  "The volume formula",
  "Volume-to-tons cheat sheet",
  "Worked example: pathway network",
);

export default function VolumeCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Asphalt Volume Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="sidebar"
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Volume"
              variant="centered"
              title="Asphalt Volume Calculator"
              description="Sometimes you just need the geometry. Cubic yards, cubic feet, cubic meters and liters from plan dimensions — with tonnage as the final line because that's what you'll order."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Volume Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<VolumeCalculatorCard />}
        aside={
          <Cta
            variant="card"
            title="Volume in hand?"
            description="Convert it to tons for any mix state with the weight calculator."
            href={ASPHALT.weight}
            buttonLabel="Weight Calculator"
          />
        }
      >
        <InlineToc items={toc} />

        <Section title="The volume formula">
          <FormulaBlock
            formula="V = L × W × D × N"
            variables={[
              { symbol: "L, W", meaning: "plan dimensions", unit: "ft or m" },
              { symbol: "D", meaning: "compacted depth", unit: "ft or m — convert inches first" },
              { symbol: "N", meaning: "identical sections" },
            ]}
            note="Identical to the concrete volume formula — the materials differ, the geometry doesn't. Waste is NOT included here; add 5–15% at ordering time."
          />
          <p className="text-muted-foreground">
            The formula, its unit conversions and irregular-shape decomposition are covered in
            depth across the{" "}
            <a href={ASPHALT.volumeFormula} className="font-medium text-primary hover:underline">
              volume formula
            </a>
            ,{" "}
            <a href={ASPHALT.measurement} className="font-medium text-primary hover:underline">
              measurement
            </a>{" "}
            and{" "}
            <a href={ASPHALT.unitConversion} className="font-medium text-primary hover:underline">
              unit conversion
            </a>{" "}
            guides. The same method drives our{" "}
            <a href={CONCRETE.howTo} className="font-medium text-primary hover:underline">
              concrete calculation guide
            </a>{" "}
            — learn it once, use it for every material on site.
          </p>
        </Section>

        <Section title="Volume-to-tons cheat sheet">
          <CoverageTable
            headers={["Volume", "Compacted hot mix", "Loose hot mix"]}
            rows={[
              { label: "1 cubic foot", spec: "145 lb", coverage: "≈117 lb" },
              { label: "1 cubic yard", spec: "1.96 tons", coverage: "≈1.58 tons" },
              { label: "1 cubic meter", spec: "2.32 tonnes", coverage: "≈1.87 tonnes" },
              { label: "10 ft³ (a wheelbarrow ×2)", spec: "0.73 tons", coverage: "≈0.59 tons" },
            ]}
            caption="At 145 lb/ft³ compacted / 117 loose. Full conversion tables in the cubic yard and cubic foot guides."
          />
          <TipBlock title="Volume is the check, tons are the order">
            Estimators carry both numbers: volume catches geometric mistakes (does 12 yd³ look
            right for this driveway?), tonnage matches the plant&apos;s scale tickets. When the
            two disagree with the crew&apos;s gut, remeasure before the trucks roll.
          </TipBlock>
        </Section>

        <Section title="Worked example: pathway network">
          <ExampleBlock
            scenario="A park with four identical 80 × 6 ft walking paths, 2 in compacted asphalt."
            steps={[
              { label: "One path volume", work: "80 × 6 × (2 ÷ 12) = 80 ft³" },
              { label: "Four sections", work: "80 × 4 = 320 ft³ = 11.85 yd³" },
              { label: "As tons", work: "320 × 145 ÷ 2,000 = 23.2 tons" },
              { label: "With 10% waste at ordering", work: "23.2 × 1.10 = 25.5 tons" },
            ]}
            result="11.9 yd³ geometric volume; order 25–26 tons of hot mix."
          />
        </Section>

        <Faq items={faqItems} />

        <RelatedArticles title="The volume series" variant="cards" items={volumeGuideLinks} />

        <RelatedArticles
          title="Related calculators & guides"
          variant="inline-strip"
          items={[
            ...pickLinks(asphaltCalculatorLinks, ASPHALT.calculator, ASPHALT.weight, ASPHALT.cost),
            ...pickConcrete(concreteGuides, CONCRETE.howTo),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4, AREFS.napa]} />
      </CalculatorPageShell>
    </>
  );
}
