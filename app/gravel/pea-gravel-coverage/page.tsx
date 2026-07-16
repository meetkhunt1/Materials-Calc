import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock } from "@/components/blocks/callout";
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
import { GRAVEL, peaGuideLinks, referenceLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "pea-gravel-coverage";
const title = "Pea Gravel Coverage — Per Ton, Per Yard, Per Bag";
const description =
  "How far pea gravel goes: one ton covers 125 ft² at 2 in and 62 ft² at 4 in, full coverage tables per ton, cubic yard and bag, recommended depths by application, and a worked path example.";
const path = GRAVEL.peaCoverage;
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
    question: "How much does a ton of pea gravel cover?",
    answer:
      "About 125 ft² at 2 inches deep, 83 ft² at 3 inches, and 62 ft² at 4 inches. The math comes from pea gravel's loose weight of roughly 96 lb/ft³: a ton is about 21 cubic feet of stone, and depth divides that volume into area.",
  },
  {
    question: "How much does a cubic yard of pea gravel cover?",
    answer:
      "A cubic yard is 27 ft³, so it covers about 162 ft² at 2 inches deep and 108 ft² at 3 inches. A yard weighs roughly 1.3 tons (about 2,600 lb), which is why yard coverage runs about 30% higher than ton coverage at every depth.",
  },
  {
    question: "How many bags of pea gravel do I need per square foot?",
    answer:
      "A standard 0.5 ft³ bag covers 3 ft² at 2 inches deep and 2 ft² at 3 inches. Flip it around: a 100 ft² patio at 3 inches needs about 50 bags — which is exactly why anything beyond a small accent area should be ordered in bulk.",
  },
  {
    question: "How deep should pea gravel be for a walkway?",
    answer:
      "2 inches over a compacted base of crusher run or stone dust. Deeper is worse, not better — past about 3 inches, rounded stones shift underfoot like dry sand and the path becomes tiring to walk. Save the depth budget for the base layer instead.",
  },
  {
    question: "How deep should pea gravel be in a play area?",
    answer:
      "6 inches is the practical minimum for a residential play area, and 9 inches of loose fill is the CPSC guideline for playground fall zones under climbing equipment. Coverage drops fast at these depths — one ton covers only about 42 ft² at 6 inches — so play areas consume far more stone than their footprint suggests.",
  },
  {
    question: "Should I add extra to my pea gravel estimate?",
    answer:
      "Add 10% for waste, settling into the base and uneven excavation. On small orders, round up to the supplier's next half-ton increment. Running short means paying a second delivery fee for a wheelbarrow's worth of stone — the most expensive gravel you will ever buy.",
  },
];

const toc = tocFromTitles(
  "Coverage per ton at 1–4 inches",
  "Coverage per cubic yard and per bag",
  "Recommended depths by application",
  "The coverage formula",
  "Worked example: a garden path",
);

export default function PeaGravelCoveragePage() {
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
              eyebrow="Gravel · Pea Gravel"
              variant={heroVariant}
              title="Pea gravel coverage"
              description="A ton of pea gravel covers a patio or vanishes into a play area — depth decides which. Here is exactly how far a ton, a yard and a bag go at every practical depth."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Pea Gravel Coverage", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Coverage per ton at 1–4 inches">
          <p className="text-muted-foreground">
            Pea gravel weighs about 96 lb/ft³ loose, so a 2,000 lb ton is roughly 21 cubic
            feet of stone. Spread thinner, that volume stretches; spread deeper, it
            disappears. Doubling the depth exactly halves the coverage:
          </p>
          <BarChart
            title="Area one ton of pea gravel covers, by depth"
            unit="ft²"
            data={[
              { label: "1 in deep", value: 250 },
              { label: "2 in deep", value: 125 },
              { label: "3 in deep", value: 83 },
              { label: "4 in deep", value: 62 },
            ]}
          />
          <p className="text-muted-foreground">
            One inch is a dusting for refreshing an existing surface; it will not hide the
            ground below on a new install. Two inches is the working minimum over a
            compacted base, and four inches is loose decorative fill. All grades from 1/4
            to 5/8 inch weigh essentially the same, so these numbers hold whatever{" "}
            <a href={GRAVEL.peaSizes} className="font-medium text-primary hover:underline">
              size
            </a>{" "}
            you buy.
          </p>
        </Section>

        <Section title="Coverage per cubic yard and per bag">
          <CoverageTable
            headers={["Depth", "Per cubic yard (27 ft³)", "Per 0.5 ft³ bag"]}
            rows={[
              { label: "1 in", spec: "324 ft²", coverage: "6 ft²" },
              { label: "2 in", spec: "162 ft²", coverage: "3 ft²" },
              { label: "3 in", spec: "108 ft²", coverage: "2 ft²" },
              { label: "4 in", spec: "81 ft²", coverage: "1.5 ft²", note: "≈54 bags to match one cubic yard" },
            ]}
            caption="A cubic yard weighs ≈1.3 tons (2,600 lb), so yard coverage runs ≈30% above ton coverage at every depth."
          />
          <p className="text-muted-foreground">
            Suppliers quote in tons or yards interchangeably, and mixing the two units is
            the classic ordering mistake — a yard is 1.3 tons, not one. Bags exist for
            jobs measured in single squares of coverage; the{" "}
            <a href={GRAVEL.peaCost} className="font-medium text-primary hover:underline">
              cost guide
            </a>{" "}
            shows the bag-vs-bulk crossover lands around 15 bags.
          </p>
        </Section>

        <Section title="Recommended depths by application">
          <CoverageTable
            headers={["Application", "Depth", "One ton covers"]}
            rows={[
              { label: "Garden path / walkway", spec: "2 in over compacted base", coverage: "≈125 ft²" },
              { label: "Patio / seating area", spec: "2–3 in over compacted base", coverage: "≈83–125 ft²" },
              { label: "Decorative bed / ground cover", spec: "2–3 in over fabric", coverage: "≈83–125 ft²" },
              { label: "Dog run", spec: "4 in", coverage: "≈62 ft²" },
              { label: "Play area", spec: "6 in minimum", coverage: "≈42 ft²", note: "9 in loose fill for CPSC playground fall zones" },
            ]}
            caption="Walked surfaces cap at 2–3 in — deeper pea gravel shifts underfoot. Fall-protection surfaces go the other way."
          />
          <TipBlock title="Depth is a budget lever, not a quality lever">
            On paths and patios, extra pea gravel depth makes the surface worse and the
            bill bigger. If you want a firmer, longer-lasting surface, put the money into
            2–3 inches of compacted crusher run underneath and keep the pea gravel at
            2 inches on top.
          </TipBlock>
        </Section>

        <Section title="The coverage formula">
          <FormulaBlock
            title="Tons from area and depth"
            formula="Tons = Area × (Depth ÷ 12) × 96 ÷ 2,000"
            variables={[
              { symbol: "Area", meaning: "surface to cover", unit: "ft²" },
              { symbol: "Depth", meaning: "stone depth", unit: "in" },
              { symbol: "96", meaning: "loose unit weight of pea gravel", unit: "lb/ft³" },
            ]}
            note="Divide the result by 1.3 to convert tons to cubic yards, or multiply cubic feet by 2 to get 0.5 ft³ bag counts. Add 10% for waste and settling."
          />
        </Section>

        <Section title="Worked example: a garden path">
          <ExampleBlock
            scenario="A 40 ft garden path, 3 ft wide, at the standard 2 in walkway depth over an existing compacted base."
            steps={[
              { label: "Area", work: "40 × 3 = 120 ft²" },
              { label: "Volume", work: "120 × (2 ÷ 12) = 20 ft³" },
              { label: "Weight", work: "20 × 96 = 1,920 lb ≈ 0.96 tons" },
              { label: "Waste allowance", work: "0.96 × 1.10 ≈ 1.1 tons — order 1 ton and keep 2–3 bags in reserve" },
              { label: "Bag check", work: "20 ft³ ÷ 0.5 = 40 bags — well past the ~15-bag crossover, so buy bulk" },
            ]}
            result="One bulk ton plus a couple of reserve bags covers the path. In bags alone, the same stone would cost roughly four times as much."
          />
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Coverage questions" />

        <Cta
          variant={ctaVariant}
          title="Skip the arithmetic"
          description="Enter length, width and depth — the pea gravel calculator returns tons, cubic yards and bag counts with waste built in."
          href={GRAVEL.pea}
          buttonLabel="Open the Pea Gravel Calculator"
        />

        <RelatedArticles
          title="Plan the rest of the job"
          variant={relatedStyle}
          items={[
            ...pickLinks(peaGuideLinks, GRAVEL.peaCost, GRAVEL.peaInstall),
            ...pickLinks(referenceLinks, GRAVEL.refCoverage),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.astmC29, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
