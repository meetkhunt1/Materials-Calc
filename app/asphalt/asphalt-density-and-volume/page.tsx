import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { BarChart } from "@/components/charts/bar-chart";
import { CoverageTable } from "@/components/tables/coverage-table";
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
  volumeGuideLinks,
  weightGuideLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Density & Volume — How Asphalt Orders Become Tons";
const description =
  "The single formula that turns a volume takeoff into a plant order in tons, why the same 10 cubic yards can weigh 16 or 20 tons, and how to work backwards from a ton quote.";
const path = ASPHALT.densityAndVolume;
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
    question: "What density should I use to convert asphalt volume to tons?",
    answer:
      "145 lb/ft³ for compacted hot mix — the value behind every takeoff on this site, giving 1.96 tons per cubic yard. Use it whenever your volume is a designed pavement thickness. Only switch constants if you are pricing millings, cold mix, or loose material by the truckload.",
  },
  {
    question: "Why does the same volume of asphalt weigh different amounts?",
    answer:
      "Because density is a state, not a property of the black stuff itself. Compacted hot mix packs to about 145 lb/ft³; the same mix loose in a truck bed runs near 117 lb/ft³, and recycled millings fall in between. Ten cubic yards therefore spans roughly 15.8 to 19.6 tons depending on state.",
  },
  {
    question: "How many cubic yards is a ton of asphalt?",
    answer:
      "About 0.51 yd³ compacted — the reciprocal of 1.96 tons per yard. In cubic feet, one ton compacts into 13.8 ft³. Loose in the truck, the same ton occupies roughly 17 ft³, which is why delivered loads look larger than the pavement they become.",
  },
  {
    question: "How do I check a ton quote against my volume takeoff?",
    answer:
      "Convert the quote to volume: tons × 13.8 gives compacted cubic feet, then ÷ 27 for yards. If the supplier quotes 25 tons and your takeoff says 12 yd³ (23.5 tons), the quote carries about 6% extra — a reasonable waste allowance, not an error.",
  },
  {
    question: "Do plants measure my order in yards or tons?",
    answer:
      "Tons, always — every truck crosses a certified scale and the ticket is a weight. Volume never appears on the paperwork, which is exactly why you must own the density conversion. State your order in tons, keep your yards in the takeoff file, and reconcile the two with 1.96.",
  },
  {
    question: "What density applies to asphalt millings?",
    answer:
      "Compacted millings run about 122 lb/ft³ — roughly 16.5 tons per 10 yd³ — though gradation and binder content move that figure a few percent either way. Loose millings in a stockpile are lighter still. Ask the supplier for their measured unit weight before ordering large quantities.",
  },
];

const toc = tocFromTitles(
  "The conversion formula",
  "Same volume, four different tonnages",
  "Why the state you pick matters",
  "Working backwards from a ton quote",
  "Worked example: reconciling a delivery",
);

export default function AsphaltDensityAndVolumePage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Asphalt",
          datePublished: "2026-07-15",
          author,
        })}
      />
      <ArticleShell
        tocPosition="toc-left"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Volume Guide"
              variant="standard"
              title="Density &amp; volume: how orders become tons"
              description="You measure in cubic yards; the plant sells in tons. Density is the exchange rate between the two, and picking the wrong density state moves a 10-yard order by almost 4 tons."
            >
              <AuthorBox author={author} variant="inline" datePublished="2026-07-15" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Density & Volume", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Six states, one tool"
            description="The weight calculator does this conversion for six density states — hot, cold, millings, loose and more."
            href={ASPHALT.weight}
            buttonLabel="Asphalt Weight Calculator"
          />
        }
      >
        <Section title="The conversion formula">
          <FormulaBlock
            formula="Tons = Volume (ft³) × Density (lb/ft³) ÷ 2,000"
            variables={[
              { symbol: "Volume", meaning: "cubic feet — multiply cubic yards by 27 first" },
              { symbol: "Density", meaning: "145 lb/ft³ compacted hot mix; see the chart below for other states" },
              { symbol: "2,000", meaning: "pounds per US short ton" },
            ]}
            note="Shortcut for standard hot mix: yd³ × 1.96 = tons. Metric: m³ × 2.32 = tonnes."
          />
        </Section>

        <Section title="Same volume, four different tonnages">
          <p className="text-muted-foreground">
            Here is the same 10 yd³ (270 ft³) order run through the formula at four common
            density states. The volume never changes — only the pounds packed into each
            cubic foot.
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
        </Section>

        <Section title="Why the state you pick matters">
          <p className="text-muted-foreground">
            The spread on that chart is 3.8 tons on a 10-yard order — enough to strand a
            paving crew or leave a quarter of a truckload cooling on the ground. The rule
            for choosing: if your volume came off drawings as a finished pavement thickness,
            it is a compacted volume, so use the compacted density for your mix type. If you
            measured a stockpile, a windrow or a heaped truck bed, that is loose material at
            roughly 117 lb/ft³ — about 24% more volume per ton than the pavement it will
            become. Mixing the two states in one calculation is the most expensive mistake
            in small-lot asphalt buying, because it always errs in the same direction: short.
          </p>
        </Section>

        <Section title="Working backwards from a ton quote">
          <p className="text-muted-foreground">
            Suppliers quote tons, so invert the formula to see the volume you will actually
            receive: Volume (ft³) = Tons × 2,000 ÷ Density. For compacted hot mix that
            collapses to a constant worth memorizing — one ton places 13.8 ft³ of finished
            pavement, or about half a cubic yard. A 20-ton quote is therefore 276 ft³ = 10.2
            yd³ of compacted mat; at 3 inches thick it will cover about 1,100 ft². Running
            this check on every quote takes thirty seconds and catches both over-quoting and
            the occasional decimal slip before the truck rolls.
          </p>
          <CoverageTable
            headers={["Density state", "Unit weight", "Per cubic yard"]}
            rows={[
              { label: "Compacted hot mix", spec: "145 lb/ft³", coverage: "1.96 tons", note: "13.8 ft³ per ton" },
              { label: "Compacted cold mix", spec: "137 lb/ft³", coverage: "1.85 tons", note: "14.6 ft³ per ton" },
              { label: "Compacted millings", spec: "122 lb/ft³", coverage: "1.65 tons", note: "16.4 ft³ per ton" },
              { label: "Loose hot mix", spec: "117 lb/ft³", coverage: "1.58 tons", note: "17.1 ft³ per ton" },
            ]}
            caption="Both directions of the conversion at the four common states. Tons per yd³ = density × 27 ÷ 2,000."
          />
        </Section>

        <Section title="Worked example: reconciling a delivery">
          <ExampleBlock
            scenario="Your takeoff says 12 yd³ of compacted hot mix; the supplier delivered and billed 25 tons. Is the invoice defensible?"
            steps={[
              { label: "Takeoff volume in cubic feet", work: "12 × 27 = 324 ft³" },
              { label: "Takeoff weight", work: "324 × 145 ÷ 2,000 = 23.5 tons" },
              { label: "Delivered volume", work: "25 × 13.8 = 345 ft³ = 12.8 yd³" },
              { label: "Difference", work: "25 ÷ 23.5 = 1.064 → 6.4% over takeoff" },
            ]}
            result="The invoice is sound — 6.4% over the geometric takeoff sits inside a normal 5–10% waste and yield allowance."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <RelatedArticles
          title="Related guides"
          variant="cards"
          items={[
            ...pickLinks(volumeGuideLinks, ASPHALT.volumeFormula, ASPHALT.cubicYardGuide),
            ...pickLinks(weightGuideLinks, ASPHALT.densityExplained),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.astmD2726, AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
