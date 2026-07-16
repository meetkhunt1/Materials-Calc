import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { ConcreteCalculatorCard } from "@/content/concrete/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock, TipBlock } from "@/components/blocks/callout";
import { DensityTable } from "@/components/tables/density-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { JsonLd } from "@/components/seo/json-ld";
import { calculatorSchema, webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { concreteDensities } from "@/content/concrete/charts/density-data";
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import {
  ASPHALT,
  asphaltCalculatorLinks,
  coreGuideLinks as asphaltGuides,
  pickLinks as pickAsphalt,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Concrete Calculator — Volume, Bags & Weight";
const description =
  "Work out exactly how much concrete to order in cubic yards or meters, plus bag counts and weight. Handles mixed units and includes a waste allowance.";
const path = CONCRETE.calculator;
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
    question: "How much concrete do I need for a 10×10 slab?",
    answer:
      "At the standard 4-inch thickness: 10 × 10 × 0.333 = 33.3 ft³ = 1.23 yd³. With a 10% waste allowance, order 1.5 yd³ (ready-mix is sold in quarter-yard steps). Hand mixing instead? That's 56 bags of 80 lb mix.",
  },
  {
    question: "How many 80 lb bags make a yard of concrete?",
    answer:
      "One 80 lb bag yields 0.60 ft³, and a cubic yard is 27 ft³ — so 27 ÷ 0.60 = 45 bags per yard. For 60 lb bags it's 60, and for 40 lb bags it's 90. Above roughly one yard, ready-mix is almost always cheaper and far less work.",
  },
  {
    question: "Should I order concrete in cubic yards or cubic meters?",
    answer:
      "US and Canadian ready-mix plants sell by the cubic yard; most other countries sell by the cubic meter. This calculator reports both, so read whichever line matches your supplier. 1 yd³ = 0.765 m³.",
  },
  {
    question: "What waste percentage should I use?",
    answer:
      "10% covers typical spillage, over-excavation and slab thickness variation. Drop to 5% only for formed pours on a compacted, laser-leveled base. Use 15% when pouring against bare earth (trench footings) or hand mixing, where batch-to-batch yield varies.",
  },
  {
    question: "Does the calculator account for rebar displacing concrete?",
    answer:
      "No, and it shouldn't. Reinforcement typically occupies under 2% of the section, which is well inside the waste allowance. Estimators ignore steel displacement for quantity takeoffs.",
  },
  {
    question: "How much does a yard of concrete weigh?",
    answer:
      "Normal-weight concrete runs about 4,050 lb (roughly 2 US tons) per cubic yard, or 2,400 kg/m³. That matters for delivery access — a fully loaded 10-yard mixer truck exceeds 66,000 lb and will crack a residential driveway it parks on.",
  },
];

const toc = tocFromTitles(
  "How this calculator works",
  "The concrete volume formula",
  "Worked examples",
  "Common estimating mistakes",
  "Concrete weight quick reference",
);

export default function ConcreteCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Concrete Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="split"
        hero={
          <>
            <Hero
              eyebrow="Concrete"
              variant="standard"
              title="Concrete Calculator"
              description="Enter dimensions in any units — feet, inches, meters — and get the volume to order, bag counts and total weight. Built around the same takeoff method estimators use."
            >
              <AuthorBox author={author} datePublished="2026-07-15" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Concrete Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        calculator={<ConcreteCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <Section
          title="How this calculator works"
          lead="Four steps, the same ones a professional estimator follows on every takeoff."
        >
          <p className="text-muted-foreground">
            The calculator multiplies length × width × depth to get a gross volume, converts
            every input to a common unit first (so mixing feet with inches is fine), multiplies
            by your pour count, then adds a waste allowance. The result is reported in cubic
            yards for US ready-mix orders and cubic meters for metric suppliers, alongside a
            bag count if you&apos;re mixing on site.
          </p>
          <TipBlock title="Measure twice, at multiple points">
            Slab excavations are never perfectly uniform. Measure depth at 5–6 points and use
            the average — a slab that averages 4.5 in when you planned 4 in silently consumes
            12% more concrete, which is more than the entire waste allowance.
          </TipBlock>
        </Section>

        <Section title="The concrete volume formula">
          <FormulaBlock
            formula="V = L × W × D × N × (1 + waste)"
            variables={[
              { symbol: "V", meaning: "volume to order", unit: "yd³ or m³" },
              { symbol: "L", meaning: "length of the pour" },
              { symbol: "W", meaning: "width of the pour" },
              { symbol: "D", meaning: "depth or thickness" },
              { symbol: "N", meaning: "number of identical pours" },
              { symbol: "waste", meaning: "allowance as a decimal (0.10 = 10%)" },
            ]}
            note="All three dimensions must be in the same unit before multiplying. Divide cubic feet by 27 to get cubic yards; divide by 35.31 to get cubic meters."
          />
          <p className="text-muted-foreground">
            The only part people get wrong is unit conversion. Thickness is usually quoted in
            inches while plan dimensions are in feet — 4 inches is 0.333 ft, not 0.4. Every
            formula on this site converts internally, but if you&apos;re checking by hand, do the
            conversion first, not last. The full method, including irregular shapes, is covered
            step by step in our{" "}
            <a href={CONCRETE.howTo} className="font-medium text-primary hover:underline">
              guide to calculating concrete
            </a>
            .
          </p>
        </Section>

        <Section title="Worked examples">
          <ExampleBlock
            scenario="A 24 × 24 ft two-car garage slab, poured 6 inches thick on a compacted gravel base."
            steps={[
              { label: "Convert thickness to feet", work: "6 in ÷ 12 = 0.5 ft" },
              { label: "Gross volume", work: "24 × 24 × 0.5 = 288 ft³" },
              { label: "Convert to cubic yards", work: "288 ÷ 27 = 10.67 yd³" },
              { label: "Add 10% waste", work: "10.67 × 1.10 = 11.73 yd³" },
            ]}
            result="Order 12 yd³ of ready-mix (rounded to the quarter yard)."
          />
          <ExampleBlock
            title="Metric example"
            scenario="A 6 m × 1.2 m garden path, 100 mm thick, mixed by hand from 80 lb bags."
            steps={[
              { label: "Convert thickness to meters", work: "100 mm = 0.10 m" },
              { label: "Gross volume", work: "6 × 1.2 × 0.10 = 0.72 m³" },
              { label: "Add 15% waste for hand mixing", work: "0.72 × 1.15 = 0.83 m³" },
              { label: "Divide by the 80 lb bag yield (0.017 m³)", work: "0.83 ÷ 0.017 = 48.8" },
            ]}
            result="49 bags of 80 lb concrete mix — at that count, price ready-mix too."
          />
        </Section>

        <Section title="Common estimating mistakes">
          <WarningBlock title="The five errors that cause short pours">
            <p>
              1. Using nominal thickness instead of measured average depth. 2. Forgetting that
              ready-mix is sold in 0.25 yd³ increments — a 1.9 yd³ estimate is a 2.0 yd³ order.
              3. Treating a sloped site as flat: depth at the low corner can be double the plan
              value. 4. Skipping waste entirely to save money — a second truck for half a yard
              costs more in short-load fees than 10% waste ever will. 5. Mixing up cubic feet and
              cubic yards when comparing bag prices to ready-mix quotes.
            </p>
          </WarningBlock>
          <p className="text-muted-foreground">
            Running short mid-pour is the expensive failure: a cold joint forms in about 30–45
            minutes in warm weather, and most plants charge a short-load fee of $50–100 for the
            rescue truck. The cheapest insurance is ordering the extra quarter yard. Current
            plant pricing and fee structures are broken down in the{" "}
            <a href={CONCRETE.cost} className="font-medium text-primary hover:underline">
              concrete cost guide
            </a>
            .
          </p>
        </Section>

        <Section
          title="Concrete weight quick reference"
          lead="Weight drives truck access, pump decisions and structural loads. Full tables in the density chart."
        >
          <DensityTable
            rows={concreteDensities.slice(0, 4)}
            highlight="Normal-weight concrete (reinforced)"
            caption="Typical unit weights per PCA. See the complete concrete density chart for ingredients and special mixes."
          />
        </Section>

        <Faq items={faqItems} />

        <RelatedArticles
          title="Concrete guides & references"
          variant="cards"
          items={guideLinks}
        />

        <RelatedArticles
          title="Need a shape-specific tool?"
          variant="inline-strip"
          items={pickLinks(calculatorLinks, CONCRETE.slab, CONCRETE.footing, CONCRETE.wall, CONCRETE.column)}
        />

        <RelatedArticles
          title="Paving with asphalt instead?"
          variant="list"
          items={[
            ...pickAsphalt(asphaltCalculatorLinks, ASPHALT.calculator),
            ...pickAsphalt(asphaltGuides, ASPHALT.vsConcrete),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[REFS.astmC94, REFS.aci318, REFS.pca]} />
      </CalculatorPageShell>
    </>
  );
}
