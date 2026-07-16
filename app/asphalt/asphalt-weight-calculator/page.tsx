import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { CalculatorPageShell } from "@/components/layouts/calculator-page-shell";
import { WeightCalculatorCard } from "@/content/asphalt/calculators/cards";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TableOfContents } from "@/components/toc/table-of-contents";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock, WarningBlock } from "@/components/blocks/callout";
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
import { ASPHALT, weightGuideLinks, asphaltCalculatorLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import { CONCRETE, guideLinks as concreteGuides, pickLinks as pickConcrete } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Weight Calculator — Volume to Tons";
const description =
  "Convert cubic yards, feet or meters of asphalt to tons, tonnes, pounds and kilograms — for ordering, hauling and demolition disposal.";
const path = ASPHALT.weight;
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
    question: "How much does a cubic yard of asphalt weigh?",
    answer:
      "Compacted in place: about 3,915 lb — call it 2 tons. Loose in the truck: around 3,150 lb. The 25% difference between those two numbers causes more ordering errors than any other figure in paving.",
  },
  {
    question: "How much does a square foot of asphalt weigh?",
    answer:
      "12 lb per square foot per inch of compacted thickness (145 ÷ 12). A 3 in driveway therefore carries about 36 lb/ft² of asphalt — handy for estimating removal weight on tear-outs.",
  },
  {
    question: "How many tons of asphalt fit in a dump truck?",
    answer:
      "Tandem-axle: 13–15 tons legally. Tri-axle: 16–19. Quad and super dumps: 19–26. End dumps: 23–25. Legal payload is gross vehicle weight limit minus empty weight — the truck load capacity guide has the full table.",
  },
  {
    question: "How much does removed (demolition) asphalt weigh?",
    answer:
      "In place it's simple: area × thickness × 145 lb/ft³. Loaded in the truck as broken chunks it bulks enormously — plan on nearly double the truck volume, though the weight stays the same. Disposal is priced by the ton, so the in-place number is the one your budget needs.",
  },
  {
    question: "Is hot asphalt heavier than cold?",
    answer:
      "Per unit volume, hot mix compacted is slightly denser than cold mix (145 vs ~137 lb/ft³) because it compacts tighter. Temperature itself changes density trivially — the real differences come from mix design and compaction, covered in hot mix vs cold mix weight.",
  },
];

const toc = tocFromTitles(
  "Weight = volume × density",
  "Worked example: sizing a tear-out",
  "Loose vs compacted: the 25% trap",
);

export default function WeightCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, datePublished: "2026-07-15" }),
          calculatorSchema({ name: "Asphalt Weight Calculator", description, path }),
        ]}
      />
      <CalculatorPageShell
        variant="hero-flow"
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Weight"
              variant="standard"
              title="Asphalt Weight Calculator"
              description="Six material states, four weight units, and a truck-load count — because volume is what you measure, but weight is what you order, haul and pay for."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Weight Calculator", href: path },
                )}
              />
            </Container>
          </>
        }
        preCalculator={
          <FormulaBlock
            formula="Weight = Volume × Density"
            variables={[
              { symbol: "Volume", meaning: "measured or calculated", unit: "yd³, ft³, m³" },
              { symbol: "Density", meaning: "state-dependent — pick it honestly", unit: "lb/ft³" },
            ]}
            note="Compacted hot mix: 145 lb/ft³. Loose in the truck: ~117. Millings: 103 loose / 122 compacted. Wrong state = wrong trucks."
          />
        }
        calculator={<WeightCalculatorCard />}
        aside={<TableOfContents items={toc} />}
      >
        <Section title="Weight = volume × density">
          <p className="text-muted-foreground">
            There&apos;s only one formula on this page — the skill is choosing the density that
            matches the material&apos;s state. Asphalt exists on your job in at least three
            states (loose in the truck, compacted in the pavement, broken in the demo pile),
            and each has its own unit weight. Full numbers and the reasons behind them live in{" "}
            <a href={ASPHALT.densityExplained} className="font-medium text-primary hover:underline">
              asphalt density explained
            </a>{" "}
            and the{" "}
            <a href={ASPHALT.weightChart} className="font-medium text-primary hover:underline">
              weight chart
            </a>
            . Comparing against cement-based materials? The{" "}
            <a href={CONCRETE.density} className="font-medium text-primary hover:underline">
              concrete density chart
            </a>{" "}
            is the companion page.
          </p>
          <BarChart
            title="One cubic yard, by material state"
            unit="lb"
            data={[
              { label: "Hot mix, compacted", value: 3915 },
              { label: "Cold mix, compacted", value: 3710 },
              { label: "Millings, compacted", value: 3290 },
              { label: "Hot mix, loose", value: 3155 },
              { label: "Millings, loose", value: 2780 },
            ]}
          />
        </Section>

        <Section title="Worked example: sizing a tear-out">
          <ExampleBlock
            scenario="Removing a failed 20 × 50 ft parking area, 4 in thick. How many truckloads of debris, and what will disposal cost at $28/ton?"
            steps={[
              { label: "In-place volume", work: "20 × 50 × 0.333 = 333 ft³ (12.3 yd³)" },
              { label: "Weight (in-place density)", work: "333 × 145 = 48,285 lb = 24.1 tons" },
              { label: "Truckloads at 14-ton payload", work: "24.1 ÷ 14 = 1.7 → 2 tandem loads" },
              { label: "Disposal", work: "24.1 × $28 = $675" },
            ]}
            result="Two tandem loads, ~$675 tipping — and the trucks will look overfull because chunks bulk to nearly twice the in-place volume."
          />
        </Section>

        <Section title="Loose vs compacted: the 25% trap">
          <WarningBlock title="Same yard, different weight">
            Quotes, tickets and specs silently switch between states. A supplier selling
            millings &quot;by the yard&quot; means loose yards off the pile (103 lb/ft³); your
            pavement design needs compacted yards (122). Buy loose volume for a compacted
            requirement and you arrive 16% short. Convert to tons first — weight never lies.
          </WarningBlock>
          <TipBlock title="Sanity-check any delivery">
            Divide the scale ticket&apos;s net tons by the truck&apos;s struck volume. Hot mix should
            land near 1.55–1.6 tons per loose cubic yard. A number far off means the wrong
            material or a wrong ticket — catch it before the truck dumps.
          </TipBlock>
        </Section>

        <Faq items={faqItems} />

        <Cta
          variant="inline"
          title="Need the volume first? Run the asphalt volume calculator"
          href={ASPHALT.volume}
        />

        <RelatedArticles title="The weight series" variant="cards" items={weightGuideLinks} />

        <RelatedArticles
          title="Related tools & references"
          variant="inline-strip"
          items={[
            ...pickLinks(asphaltCalculatorLinks, ASPHALT.calculator, ASPHALT.volume),
            ...pickConcrete(concreteGuides, CONCRETE.density),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.astmD2726, AREFS.ms4, AREFS.bridgeFormula]} />
      </CalculatorPageShell>
    </>
  );
}
