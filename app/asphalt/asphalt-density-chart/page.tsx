import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
import { DensityTable } from "@/components/tables/density-table";
import { CoverageTable } from "@/components/tables/coverage-table";
import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import {
  ASPHALT,
  asphaltCalculatorLinks,
  weightGuideLinks,
  volumeGuideLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import { CONCRETE } from "@/content/concrete/links";
import { asphaltDensities } from "@/content/asphalt/charts/density-data";
import type { FaqItem } from "@/types";

const title = "Asphalt Density: 145 lb/ft³ (2,322 kg/m³) Chart";
const description =
  "Compacted hot mix asphalt has a density of 145 lb/ft³ (2,322 kg/m³), or 1.96 tons per cubic yard. Chart of loose mix, cold patch, millings and base.";
const path = ASPHALT.densityChart;
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
    question: "What is the density of compacted asphalt?",
    answer:
      "145 lb/ft³, equal to 2,322 kg/m³ or 1.96 US tons per cubic yard. Real mixes measured under ASTM D2726 land between 142 and 148 lb/ft³ depending on aggregate specific gravity and in-place air voids, but 145 is the estimating standard the industry quotes and plants assume.",
  },
  {
    question: "What is the density of loose asphalt?",
    answer:
      "About 117 lb/ft³ in the truck bed, roughly 25% fluffier than the same material after rolling. A cubic yard of loose mix therefore weighs about 1.58 tons versus 1.96 compacted. Use loose density only for truck volume checks, never for tonnage takeoffs.",
  },
  {
    question: "How much does a cubic yard of loose vs compacted asphalt weigh?",
    answer:
      "About 1.96 tons compacted in place versus about 1.58 tons loose. Compacted: 145 × 27 = 3,915 lb, just under 2 tons per yard, which is the shorthand most estimators carry. Loose in a truck the same yard of volume holds only about 3,160 lb, which is why truck beds are measured in tons hauled, not yards.",
  },
  {
    question: "How many cubic yards is a ton of asphalt?",
    answer:
      "About 0.51 yd³ compacted, the reciprocal of 1.96 tons per yard. In cubic feet, one ton compacts into 13.8 ft³. Loose in the truck, the same ton occupies roughly 17 ft³, which is why delivered loads look larger than the pavement they become.",
  },
  {
    question: "What density should I use to convert asphalt volume to tons?",
    answer:
      "Use 145 lb/ft³ for compacted hot mix. It is the value behind every takeoff on this site, giving 1.96 tons per cubic yard. Use it whenever your volume is a designed pavement thickness. Only switch constants if you are pricing millings, cold mix, or loose material by the truckload.",
  },
  {
    question: "Why does the same volume of asphalt weigh different amounts?",
    answer:
      "Because density depends on state (compacted or loose), not just on the material. Compacted hot mix packs to about 145 lb/ft³; the same mix loose in a truck bed runs near 117 lb/ft³, and recycled millings fall in between. Ten cubic yards therefore spans roughly 15.8 to 19.6 tons depending on state.",
  },
  {
    question: "How do I check a ton quote against my volume takeoff?",
    answer:
      "Convert the quote to volume: tons × 13.8 gives compacted cubic feet, then ÷ 27 for yards. If the supplier quotes 25 tons and your takeoff says 12 yd³ (23.5 tons), the quote carries about 6% extra, which is a reasonable waste allowance rather than an error.",
  },
  {
    question: "How heavy are asphalt millings?",
    answer:
      "Loose millings run about 1,650 kg/m³ (103 lb/ft³) and compact to roughly 1,950 kg/m³ (122 lb/ft³). A tandem load of millings therefore spreads noticeably further than the same tonnage of new hot mix. Compacted millings make a serviceable base or rural wearing surface at a fraction of hot mix cost.",
  },
  {
    question: "What is Gmb versus Gmm?",
    answer:
      "Gmb is the bulk specific gravity of the compacted mix (its density including air voids), measured per ASTM D2726. Gmm is the theoretical maximum specific gravity with zero voids. Their ratio is percent compaction: field cores at 92–93% of Gmm mean 7–8% air voids in place.",
  },
  {
    question: "Why does asphalt compaction matter so much?",
    answer:
      "Compaction matters because air voids control durability. Above about 8% voids the mat becomes permeable, letting water and air age the binder and strip the aggregate; industry studies show each 1% of extra voids costs roughly 10% of pavement life. Compaction is the cheapest life extension money buys, because it is just roller passes.",
  },
  {
    question: "How is asphalt density measured in the field?",
    answer:
      "Asphalt density is measured two ways: cores cut from the mat and weighed per ASTM D2726 (the referee method), or nuclear/non-nuclear gauges that read density in seconds for rolling control. Specs typically require 92–93% of Gmm on the mat and slightly less at unconfined joints, verified per lot.",
  },
  {
    question: "Does temperature affect asphalt density?",
    answer:
      "Yes, temperature controls achievable density. Hot mix must be compacted while the binder is fluid, at mat temperatures of roughly 175–275°F depending on the roller pass. Below cessation temperature (~175°F) further rolling does nothing, which is why cold weather, thin lifts and long hauls all show up as low density and early failures.",
  },
  {
    question: "Why do plants sell by weight instead of volume?",
    answer:
      "Plants sell by weight because weight is invariant and volume is not. The same ton occupies about 17 ft³ loose in the truck and 13.8 ft³ after compaction. Scales at the plant read weight to the pound; nobody can measure a fluffed truck bed to 5%. Every ticket, price and takeoff therefore runs in tons or tonnes.",
  },
  {
    question: "What is the unit weight of asphalt?",
    answer:
      "The unit weight of compacted hot mix asphalt is about 145 lb/ft³ (2,322 kg/m³, or 22.8 kN/m³). Unit weight and density are used interchangeably in paving estimates. Loose mix runs about 117 lb/ft³ and compacted cold patch about 137 lb/ft³.",
  },
  {
    question: "How much does asphalt weigh per cubic meter?",
    answer:
      "A cubic meter of compacted hot mix asphalt weighs about 2,322 kg, or 2.32 tonnes. Loose mix in the truck weighs about 1,870 kg/m³ and compacted millings about 1,950 kg/m³. Multiply cubic meters by 2.32 to get tonnes of finished pavement.",
  },
  {
    question: "What is the specific gravity of liquid asphalt?",
    answer:
      "Liquid asphalt binder (bitumen) has a specific gravity of about 1.03, or roughly 1,030 kg/m³ (64 lb/ft³), only slightly heavier than water. Binder makes up about 5–6% of hot mix by weight, so the density of the finished mix is driven by the aggregate, not the binder.",
  },
];

const toc = tocFromTitles(
  "What is the density of asphalt?",
  "Densities compared",
  "What density actually measures",
  "What a ton of HMA is made of",
  "From volume to weight",
  "Same volume, four different tonnages",
  "Working backwards from a ton quote",
  "Loose vs compacted: the 25% trap",
  "Air voids: the 92–93% target",
  "Checking compaction in the field",
);

export default function AsphaltDensityChartPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Asphalt",
          datePublished: "2026-07-15",
          dateModified: "2026-10-24",
          author,
        })}
      />
      <ArticleShell
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Reference Chart"
              variant="compact"
              title="Asphalt density chart"
              description="Every asphalt tonnage calculation is volume × density. This chart supplies the density for hot mix, warm mix, cold patch, millings and the aggregate base underneath, then shows what that number measures and how to turn it into an order in tons."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Density Chart", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Convert volume to tons"
            description="The weight calculator applies these densities to any volume in any unit."
            href={ASPHALT.weight}
            buttonLabel="Asphalt Weight Calculator"
          />
        }
      >
        <QuickAnswer
          question="What is the density of asphalt?"
          answer="The density of compacted hot mix asphalt is about 145 lb/ft³, which equals 2,322 kg/m³ (2.32 t/m³) or 1.96 US tons per cubic yard. Real mixes measure 142–148 lb/ft³ depending on aggregate and air voids. Loose mix in the truck is lighter, about 117 lb/ft³ (1,870 kg/m³), until it is rolled."
          ruleOfThumb="A compacted cubic yard of asphalt weighs just under 2 tons; a cubic meter weighs about 2.3 tonnes."
          formula="Tons = yd³ × 1.96; tonnes = m³ × 2.32"
        />

        <Section title="What is the density of asphalt?">
          <p className="text-muted-foreground">
            Compacted hot mix asphalt weighs 145 lb/ft³ (2,322 kg/m³). The chart below gives
            the unit weight of every asphalt material you are likely to order, in both
            imperial and metric units.
          </p>
          <DensityTable
            rows={asphaltDensities}
            highlight="Hot mix asphalt (compacted)"
            caption="Unit weights for estimating. The highlighted row (145 lb/ft³ compacted hot mix) is the constant behind every tonnage formula on this site."
          />
          <p className="text-muted-foreground">
            For context, normal-weight concrete sits at 2,400 kg/m³, about 3% denser than
            compacted hot mix. If you work both materials, the{" "}
            <a href={CONCRETE.density} className="font-medium text-primary hover:underline">
              concrete density chart
            </a>{" "}
            is the companion reference.
          </p>
        </Section>

        <Section title="Densities compared">
          <BarChart
            title="Asphalt material densities, kg/m³"
            unit="kg/m³"
            data={[
              { label: "Hot mix (compacted)", value: 2322 },
              { label: "Warm mix (compacted)", value: 2300 },
              { label: "Aggregate base (dense-graded)", value: 2240 },
              { label: "Cold mix / cold patch", value: 2200 },
              { label: "Millings (compacted)", value: 1950 },
              { label: "Hot mix (loose, in truck)", value: 1870 },
              { label: "Millings (loose)", value: 1650 },
            ]}
          />
          <p className="text-muted-foreground">
            Compacted hot mix is the densest asphalt material at 2,322 kg/m³, and loose
            millings the lightest at 1,650 kg/m³. The spread matters commercially: a tandem
            truck legally hauling 14 tons carries the same weight whether it is hot mix or
            millings, but the millings occupy about
            40% more bed volume and spread further on the ground. Density is why identical
            tonnages produce different-looking stockpiles.
          </p>
        </Section>

        <Section title="What density actually measures">
          <p className="text-muted-foreground">
            For hot mix asphalt, &quot;density&quot; almost always means bulk specific gravity
            (Gmb): the as-compacted unit weight of the mix including its air voids, measured
            on cores or lab specimens per ASTM D2726. For estimating, that number is 145
            lb/ft³ (2,322 kg/m³) for a dense-graded mix rolled to spec: 3,915 lb per cubic
            yard, or 1.96 US tons. Every value in the{" "}
            <a href={ASPHALT.weightChart} className="font-medium text-primary hover:underline">
              asphalt weight chart
            </a>{" "}
            is a restatement of a Gmb for some material and state.
          </p>
          <InfoBlock title="One density, three jobs">
            The same 145 lb/ft³ converts volume to order tonnage, converts scale tickets back
            to coverage, and, compared against the mix&apos;s theoretical maximum, tells the
            inspector whether the rollers did their job. Estimators, haulers and QC techs are
            all reading the same number.
          </InfoBlock>
        </Section>

        <Section
          title="What a ton of HMA is made of"
          lead="By weight, hot mix is almost entirely rock. The binder is a thin, heavy glue: small by mass, decisive for behavior."
        >
          <DonutChart
            title="HMA composition by weight"
            centerValue="HMA"
            centerLabel="dense-graded mix"
            data={[
              { label: "Aggregate", value: 95 },
              { label: "PG binder", value: 5 },
            ]}
          />
          <p className="text-muted-foreground">
            Because aggregate dominates the mass, aggregate specific gravity dominates mix
            density: a mix on lightweight slag or on dense traprock can sit several percent
            either side of 145 lb/ft³ with identical binder content. That is why mix design
            sheets state the design density, and why cold mix, with its cutback or emulsified
            binder and higher voids, compacts to only about 137 lb/ft³ (see{" "}
            <a href={ASPHALT.hotVsColdWeight} className="font-medium text-primary hover:underline">
              hot mix vs cold mix weight
            </a>
            ).
          </p>
        </Section>

        <Section title="From volume to weight">
          <FormulaBlock
            formula="Tons = Volume (ft³) × Density (lb/ft³) ÷ 2,000"
            variables={[
              {
                symbol: "Volume",
                meaning: "compacted in-place volume (multiply cubic yards by 27 first)",
                unit: "ft³",
              },
              {
                symbol: "Density",
                meaning: "145 lb/ft³ compacted hot mix; see the chart above for other states",
                unit: "lb/ft³",
              },
              { symbol: "2,000", meaning: "pounds per US short ton" },
            ]}
            note="Shortcut for standard hot mix: yd³ × 1.96 = tons. Metric: m³ × 2.32 = tonnes."
          />
          <p className="text-muted-foreground">
            Tons equal cubic feet times 145, divided by 2,000. One worked line: a 20 ft × 30 ft pad at 3 in compacted is 600 × 0.25 = 150 ft³,
            times 145 lb/ft³ = 21,750 lb = 10.9 tons. Every asphalt takeoff reduces to that
            single multiplication once the volume is known.
          </p>
        </Section>

        <Section title="Same volume, four different tonnages">
          <p className="text-muted-foreground">
            The same 10 yd³ can weigh anywhere from 15.8 to 19.6 tons depending on density
            state. Here is that 270 ft³ order run through the formula at four common states.
            The volume never changes, only the pounds packed into each cubic foot.
          </p>
          <BarChart
            title="Tons delivered by 10 yd³, by density state"
            unit="tons"
            data={[
              { label: "Compacted hot mix (145 lb/ft³)", value: 19.6 },
              { label: "Compacted cold mix (137 lb/ft³)", value: 18.5 },
              { label: "Compacted millings (122 lb/ft³)", value: 16.5 },
              { label: "Loose hot mix (117 lb/ft³)", value: 15.8 },
            ]}
          />
          <p className="text-muted-foreground">
            The spread on that chart is 3.8 tons on a 10-yard order, enough to strand a
            paving crew or leave a quarter of a truckload cooling on the ground. The rule
            for choosing: if your volume came off drawings as a finished pavement thickness,
            it is a compacted volume, so use the compacted density for your mix type. If you
            measured a stockpile, a windrow or a heaped truck bed, that is loose material at
            roughly 117 lb/ft³, about 24% more volume per ton than the pavement it will
            become. Mixing the two states in one calculation is the most expensive mistake
            in small-lot asphalt buying, because it always errs in the same direction: short.
          </p>
        </Section>

        <Section title="Working backwards from a ton quote">
          <p className="text-muted-foreground">
            Suppliers quote tons, so invert the formula to see the volume you will actually
            receive: Volume (ft³) = Tons × 2,000 ÷ Density. For compacted hot mix that
            collapses to a constant worth memorizing: one ton places 13.8 ft³ of finished
            pavement, or about half a cubic yard. A 20-ton quote is therefore 276 ft³ = 10.2
            yd³ of compacted mat; at 3 inches thick it will cover about 1,100 ft². Running
            this check on every quote takes thirty seconds and catches both over-quoting and
            the occasional decimal slip before the truck rolls.
          </p>
          <CoverageTable
            headers={["Density state", "Unit weight", "Per cubic yard"]}
            rows={[
              {
                label: "Compacted hot mix",
                spec: "145 lb/ft³",
                coverage: "1.96 tons",
                note: "13.8 ft³ per ton",
              },
              {
                label: "Compacted cold mix",
                spec: "137 lb/ft³",
                coverage: "1.85 tons",
                note: "14.6 ft³ per ton",
              },
              {
                label: "Compacted millings",
                spec: "122 lb/ft³",
                coverage: "1.65 tons",
                note: "16.4 ft³ per ton",
              },
              {
                label: "Loose hot mix",
                spec: "117 lb/ft³",
                coverage: "1.58 tons",
                note: "17.1 ft³ per ton",
              },
            ]}
            caption="Both directions of the conversion at the four common states. Tons per yd³ = density × 27 ÷ 2,000."
          />
          <ExampleBlock
            scenario="Your takeoff says 12 yd³ of compacted hot mix; the supplier delivered and billed 25 tons. Is the invoice defensible?"
            steps={[
              { label: "Takeoff volume in cubic feet", work: "12 × 27 = 324 ft³" },
              { label: "Takeoff weight", work: "324 × 145 ÷ 2,000 = 23.5 tons" },
              { label: "Delivered volume", work: "25 × 13.8 = 345 ft³ = 12.8 yd³" },
              { label: "Difference", work: "25 ÷ 23.5 = 1.064 → 6.4% over takeoff" },
            ]}
            result="The invoice is sound: 6.4% over the geometric takeoff sits inside a normal 5–10% waste and yield allowance."
          />
        </Section>

        <Section title="Loose vs compacted: the 25% trap">
          <WarningBlock title="Never estimate with loose density">
            Mix leaves the plant at roughly 117 lb/ft³ and finishes under the roller at 145,
            a ~25% volume change at constant weight. Estimators who measure a fluffed mat or a
            truck bed and multiply by 145 over-order by a quarter; crews who set screed height
            to the finished thickness end up thin after roll-down. Takeoffs use compacted
            dimensions and compacted density; only screed settings use the loose number.
          </WarningBlock>
          <p className="text-muted-foreground">
            Straight off the truck, hot mix sits at roughly 117 lb/ft³. The particles are
            coated and lubricated but not interlocked, and about a quarter of the volume is
            air. Rolling drives that to 145 lb/ft³, a 25% volume reduction. The practical
            consequences: a 3-inch compacted lift must be spread about 3.75 inches loose
            (mix compacts roughly a quarter inch per inch of loose lift); a truck bed holds
            25% fewer &quot;compacted yards&quot; than its struck volume suggests; and any
            yardage figure is meaningless until someone says loose or compacted. Tonnage,
            by contrast, is compaction-proof, which is why the industry buys and sells by
            weight.
          </p>
        </Section>

        <Section title="Air voids: the 92–93% target">
          <p className="text-muted-foreground">
            A finished mat is never void-free. Specifications target in-place density of
            92–93% of the theoretical maximum (Gmm), that is, 7–8% air voids after rolling.
            Traffic densifies the mat slightly further toward the 4% design void content over
            the first hot seasons. The target is a compromise: too many voids and the mat is
            permeable; too few and the binder has nowhere to go in summer, bleeding and
            rutting.
          </p>
          <WarningBlock title="Every 1% of extra voids costs ~10% of pavement life">
            The correlation is one of the most repeated findings in pavement research: a mat
            left at 90% of Gmm instead of 93% gives up roughly a third of its service life to
            water intrusion, binder aging and raveling. Compaction is bought with roller
            passes while the mat is hot. It cannot be added back later at any price.
          </WarningBlock>
        </Section>

        <Section title="Checking compaction in the field">
          <FormulaBlock
            formula="% compaction = (field density ÷ lab max density) × 100"
            variables={[
              {
                symbol: "field density",
                meaning: "core or gauge reading on the finished mat (Gmb)",
                unit: "lb/ft³",
              },
              {
                symbol: "lab max density",
                meaning: "theoretical maximum for the mix (Gmm), zero voids",
                unit: "lb/ft³",
              },
            ]}
            note="Example: core at 143.5 lb/ft³ against a Gmm of 154.3 lb/ft³ → 93.0% compaction = 7.0% in-place air voids. Passes a 92% spec."
          />
          <Cta
            variant="inline"
            title="Convert your volume to tons at the right density"
            href={ASPHALT.weight}
          />
        </Section>

        <Faq items={faqItems} variant="list" />

        <RelatedArticles
          title="Related guides and tools"
          variant="cards"
          items={[
            ...pickLinks(
              weightGuideLinks,
              ASPHALT.weightChart,
              ASPHALT.hotVsColdWeight,
              ASPHALT.tonsVsYards,
            ),
            ...pickLinks(volumeGuideLinks, ASPHALT.volumeFormula),
            ...pickLinks(asphaltCalculatorLinks, ASPHALT.calculator),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

        <References items={[AREFS.astmD2726, AREFS.ms2, AREFS.ms4, AREFS.aashto]} />
      </ArticleShell>
    </>
  );
}
