import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { BarChart } from "@/components/charts/bar-chart";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { pick, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { getAuthor } from "@/data/authors";
import {
  GRAVEL,
  coreGuideLinks,
  referenceLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-weight-chart";
const title = "Gravel Weight Chart — Per Yard, Foot & Meter";
const description =
  "How much gravel weighs: pounds and tons per cubic yard, lb/ft³ and kg/m³ for pea gravel, common gravel, #57 stone and crusher run — loose vs compacted, with worked conversion examples.";
const path = GRAVEL.weightChart;
const author = getAuthor("materials-team");
const datePublished = "2026-07-16";

const heroVariant = pick(slug, HERO_VARIANTS);
const tocPosition = pick(slug, ["toc-right", "toc-left"] as const);
const faqVariant = pick(slug, ["accordion", "list"] as const);
const relatedStyle = pick(slug, RELATED_STYLES);
const ctaVariant = pick(slug, ["banner", "card", "inline"] as const);

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: datePublished,
});

const faqItems: FaqItem[] = [
  {
    question: "How much does a cubic yard of gravel weigh?",
    answer:
      "About 2,800 lb — 1.42 US tons — for common gravel, loose. Pea gravel is lighter at roughly 2,600 lb (1.3 tons), #57 stone runs about 2,700 lb (1.35 tons), and crusher run reaches 3,375 lb loose and roughly 3,780 lb (1.89 tons) once compacted. Moisture can add another 10–15% on top of any of these.",
  },
  {
    question: "How much does a cubic foot of gravel weigh?",
    answer:
      "Between 96 and 140 lb depending on type and compaction: pea gravel 96 lb/ft³, #57 stone about 100, common gravel 105, crusher run 125 loose and up to 140 compacted. A standard 0.5 ft³ retail bag therefore weighs roughly 48–55 lb — which is why they are sold at that size.",
  },
  {
    question: "How much does a cubic meter of gravel weigh?",
    answer:
      "Roughly 1,540–2,240 kg. Common gravel is about 1,680 kg/m³ (1.68 tonnes), pea gravel 1,540, #57 stone 1,600, and crusher run 2,000 loose to 2,240 compacted. Metric estimating is pleasantly direct: cubic meters × density in t/m³ is your order weight in tonnes, no intermediate conversions.",
  },
  {
    question: "Why does compacted gravel weigh more per yard than loose?",
    answer:
      "The stone itself doesn't get heavier — compaction squeezes air out of the voids so more particles fit in each cubic yard. Crusher run gains about 12% because its fines pack the gaps between larger stones; clean single-size aggregates like #57 gain closer to 9% since uniform particles can't nest as tightly.",
  },
  {
    question: "Is a ton of gravel the same as a tonne?",
    answer:
      "No. A US (short) ton is 2,000 lb; a metric tonne is 1,000 kg, or about 2,205 lb — 10% heavier. Suppliers in the US quote short tons; most of the rest of the world quotes tonnes. On a 20-ton order the difference is two full tons of stone, so confirm the unit before comparing prices.",
  },
  {
    question: "How many bags of gravel make a cubic yard?",
    answer:
      "54 bags at the standard 0.5 ft³ size (27 ft³ per yard ÷ 0.5). At typical bag prices that's $215–380 for a yard of stone that costs $40–80 in bulk — the arithmetic behind the universal advice to buy bulk for anything bigger than a small path repair.",
  },
];

const toc = tocFromTitles(
  "Weight per cubic yard",
  "Weight per cubic foot and cubic meter",
  "Loose vs compacted",
  "Worked conversions",
);

export default function GravelWeightChartPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
          datePublished,
          author,
        })}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Reference Chart"
              variant={heroVariant}
              title="Gravel weight chart"
              description="A cubic yard of gravel weighs 2,600 to 3,800 pounds depending on what's in it and how hard it's been packed. Here are the working numbers per yard, per foot and per meter — and the conversions between them."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Weight Chart", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Skip the arithmetic"
            description="The calculator converts volume to tons with the right density for every gravel type."
            href={GRAVEL.calculator}
            buttonLabel="Gravel Calculator"
          />
        }
      >
        <Section title="Weight per cubic yard">
          <p className="text-muted-foreground">
            The cubic yard is the unit most US suppliers load by, and the ton is the
            unit they weigh by — this table is the bridge between them. All figures are
            for dry material; a rained-on stockpile can run 10–15% heavier on the scale.
          </p>
          <CoverageTable
            headers={["Gravel type", "Pounds per yd³", "US tons per yd³"]}
            rows={[
              { label: "Pea gravel", spec: "≈ 2,600 lb", coverage: "1.30", note: "Rounded river stone, no fines" },
              { label: "#57 stone (loose)", spec: "≈ 2,700 lb", coverage: "1.35", note: "Clean 1-inch crushed stone" },
              { label: "Common gravel (loose)", spec: "≈ 2,800 lb", coverage: "1.42", note: "The default estimating figure" },
              { label: "River rock (1–3 in)", spec: "≈ 2,700 lb", coverage: "1.35", note: "Large rounds; wide natural variation" },
              { label: "Crusher run (loose)", spec: "≈ 3,375 lb", coverage: "1.69", note: "Fines fill the voids" },
              { label: "Crusher run (compacted)", spec: "≈ 3,780 lb", coverage: "1.89", note: "In-place weight after compaction" },
            ]}
            caption="Weight per cubic yard, dry. Multiply loose cubic yards by the tons column to convert a volume order to a weight order."
          />
        </Section>

        <Section title="Weight per cubic foot and cubic meter">
          <CoverageTable
            headers={["Gravel type", "lb per ft³", "kg per m³"]}
            rows={[
              { label: "Pea gravel", spec: "96", coverage: "1,540", note: "1.54 t/m³" },
              { label: "#57 stone (loose)", spec: "100", coverage: "1,600", note: "1.60 t/m³" },
              { label: "Common gravel (loose)", spec: "105", coverage: "1,680", note: "1.68 t/m³" },
              { label: "Crusher run (loose)", spec: "125", coverage: "2,000", note: "2.00 t/m³" },
              { label: "Crusher run (compacted)", spec: "140", coverage: "2,240", note: "2.24 t/m³" },
            ]}
            caption="Unit weights per ASTM C29 typical values. To convert: kg/m³ = lb/ft³ × 16.02."
          />
          <p className="text-muted-foreground">
            These are the same unit weights the{" "}
            <a href={GRAVEL.densityChart} className="font-medium text-primary hover:underline">
              density chart
            </a>{" "}
            documents in full — repeated here in the units you need for weight
            conversions. For 20+ materials including limestone, decomposed granite and
            recycled concrete, see the{" "}
            <a href={GRAVEL.refDensity} className="font-medium text-primary hover:underline">
              complete density database
            </a>
            .
          </p>
        </Section>

        <Section title="Loose vs compacted">
          <BarChart
            title="Loose vs compacted weight, lb per cubic yard"
            unit="lb"
            data={[
              { label: "#57 stone, loose", value: 2700 },
              { label: "#57 stone, compacted", value: 2940 },
              { label: "Crusher run, loose", value: 3375 },
              { label: "Crusher run, compacted", value: 3780 },
            ]}
          />
          <InfoBlock title="Which figure do you order from?">
            Order from the <strong>loose</strong> weight when the supplier sells by
            loose cubic yard (that&apos;s what the truck holds), but size the required
            volume from the <strong>compacted</strong> figure whenever the spec calls
            for a compacted thickness — a 4-inch compacted lift of crusher run needs
            about 12% more stone than a 4-inch loose one. Getting the two mixed up is
            the most common reason driveway lifts finish low.
          </InfoBlock>
        </Section>

        <Section title="Worked conversions">
          <ExampleBlock
            title="Imperial: yards on the quote, tons on the scale"
            scenario="A landscaper quotes 8 loose cubic yards of crusher run for a base course. The quarry sells by the ton — how many tons is that quote?"
            steps={[
              { label: "Loose density", work: "125 lb/ft³ × 27 = 3,375 lb per yd³" },
              { label: "Convert to tons per yard", work: "3,375 ÷ 2,000 = 1.69 tons/yd³" },
              { label: "Multiply by the volume", work: "8 yd³ × 1.69 = 13.5 tons" },
            ]}
            result="The 8-yard quote equals about 13.5 tons. If the quarry's per-ton price × 13.5 beats the landscaper's number, buy direct."
          />
          <ExampleBlock
            title="Metric: cubic meters to tonnes"
            scenario="A European plan calls for 4.5 m³ of common gravel, supplied by the tonne."
            steps={[
              { label: "Density in tonnes", work: "1,680 kg/m³ = 1.68 t/m³" },
              { label: "Mass", work: "4.5 × 1.68 = 7.56 t" },
              { label: "Add 10% settling allowance", work: "7.56 × 1.10 = 8.3 t" },
            ]}
            result="Order 8.5 tonnes. Metric needs no ÷27 or ÷2,000 — volume × density is the entire conversion."
          />
          <p className="text-muted-foreground">
            The full method behind these conversions — including when to use 15%
            instead of 10% — is laid out step by step in{" "}
            <a href={GRAVEL.howTo} className="font-medium text-primary hover:underline">
              how to calculate gravel
            </a>
            , and the volume side of the math lives in the{" "}
            <a href={GRAVEL.volumeFormula} className="font-medium text-primary hover:underline">
              volume formula guide
            </a>
            .
          </p>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Weight questions" />

        <Cta
          variant={ctaVariant}
          title="Convert your volume to tons in one step"
          href={GRAVEL.calculator}
          buttonLabel="Gravel Calculator"
        />

        <RelatedArticles
          title="Related charts & guides"
          variant={relatedStyle}
          items={[
            ...pickLinks(coreGuideLinks, GRAVEL.densityChart, GRAVEL.coverage),
            ...pickLinks(referenceLinks, GRAVEL.refWeight, GRAVEL.refConversion),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.astmC29, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
