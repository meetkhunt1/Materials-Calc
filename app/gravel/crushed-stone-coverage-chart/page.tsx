import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
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
  stoneGuideLinks,
  referenceLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "crushed-stone-coverage-chart";
const title = "Crushed Stone Coverage Chart — Per Ton at 1–12 Inches";
const description =
  "How far a ton of crushed stone goes: 240 ft² at 1 inch down to 20 ft² at 12 inches for #57, with a separate compacted crusher run table, the compaction allowance, and a worked driveway example.";
const path = GRAVEL.stoneCoverage;
const author = getAuthor("materials-team");

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
  publishedTime: "2026-07-16",
});

const faqItems: FaqItem[] = [
  {
    question: "How much area does a ton of crushed stone cover?",
    answer:
      "For clean #57 stone at 100 lb/ft³ loose: about 240 ft² at 1 inch deep, 120 ft² at 2 inches, 80 ft² at 3 inches and 60 ft² at 4 inches. Halve the depth, double the coverage — the relationship is exactly inverse.",
  },
  {
    question: "Why does crusher run cover less than #57 per ton?",
    answer:
      "It is denser. Compacted crusher run packs about 140 lb of stone into each cubic foot versus 100 for loose #57, so the same 2,000 lb ton makes about 30% less volume — 43 ft² at 4 inches compacted versus 60 ft² of loose #57. Per ton it covers less; per finished driveway it is still the cheaper layer.",
  },
  {
    question: "How much extra should I order for compaction?",
    answer:
      "For layers that will be compacted, order 15–20% more than the compacted-volume math suggests — roughly 10% for the volume lost to compaction plus 5–10% normal waste. For loose decorative layers that only settle underfoot, 10% total is enough.",
  },
  {
    question: "How many square feet does 5 tons of crushed stone cover?",
    answer:
      "Multiply the per-ton figure: 5 tons of #57 covers about 600 ft² at 2 inches, 400 ft² at 3 inches or 300 ft² at 4 inches, loose. As compacted crusher run, 5 tons covers about 215 ft² at a finished 4 inch depth.",
  },
  {
    question: "What depth should I use for the lookup?",
    answer:
      "Decorative dressing over fabric: 2 inches. Walkable surface: 2–3 inches. Driveway top course: 3–4 inches. Base lifts: 4 inches compacted each. Drainage stone around pipe: 3 inches all sides. Using the intended finished depth — not the loose dumped depth — is what the compaction allowance is for.",
  },
  {
    question: "Does coverage change with rock type?",
    answer:
      "Slightly — limestone at 97 lb/ft³ covers about 3% more per ton than the chart, granite at 103 about 3% less. The 10% swing between rock types is smaller than the waste allowance, so the #57 table works for any clean stone; only fines-heavy products need their own column.",
  },
];

const toc = tocFromTitles(
  "Coverage per ton: clean #57 stone",
  "Coverage per ton: compacted crusher run",
  "The coverage formula",
  "Compaction allowance",
  "Worked example: parking pad",
);

export default function CrushedStoneCoverageChartPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
          datePublished: "2026-07-16",
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
              title="Crushed stone coverage chart"
              description="One number answers the whole page: a ton of clean #57 makes 20 cubic feet of stone, and depth decides how far that spreads. Look it up here for 1 to 12 inches — loose stone and compacted base in separate tables."
              stats={[
                { value: "240 ft²", label: "per ton at 1 in (#57)" },
                { value: "80 ft²", label: "per ton at 3 in (#57)" },
                { value: "43 ft²", label: "per ton at 4 in (crusher run, compacted)" },
                { value: "+15–20%", label: "compaction & waste allowance" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Crushed Stone Coverage Chart", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Coverage per ton: clean #57 stone">
          <CoverageTable
            headers={["Depth", "Coverage per ton", "Coverage per 5 tons"]}
            rows={[
              { label: "1 in", spec: "240 ft²", coverage: "1,200 ft²", note: "Too thin for most jobs — fabric shows through" },
              { label: "2 in", spec: "120 ft²", coverage: "600 ft²", note: "Decorative dressing minimum" },
              { label: "3 in", spec: "80 ft²", coverage: "400 ft²", note: "Walkways, drainage surround" },
              { label: "4 in", spec: "60 ft²", coverage: "300 ft²", note: "Driveway top course" },
              { label: "6 in", spec: "40 ft²", coverage: "200 ft²" },
              { label: "8 in", spec: "30 ft²", coverage: "150 ft²" },
              { label: "10 in", spec: "24 ft²", coverage: "120 ft²" },
              { label: "12 in", spec: "20 ft²", coverage: "100 ft²", note: "Dry wells, infiltration beds" },
            ]}
            caption="Clean #57 at 100 lb/ft³ loose (1.35 tons/yd³). Any clean crushed size — #2, #3, #8 — reads within a few percent of this table."
          />
        </Section>

        <Section title="Coverage per ton: compacted crusher run">
          <CoverageTable
            headers={["Finished depth", "Coverage per ton", "Coverage per 5 tons"]}
            rows={[
              { label: "1 in", spec: "171 ft²", coverage: "857 ft²" },
              { label: "2 in", spec: "86 ft²", coverage: "429 ft²", note: "Top-up over an existing base" },
              { label: "3 in", spec: "57 ft²", coverage: "286 ft²" },
              { label: "4 in", spec: "43 ft²", coverage: "214 ft²", note: "One standard base lift" },
              { label: "6 in", spec: "29 ft²", coverage: "143 ft²" },
              { label: "8 in", spec: "21 ft²", coverage: "107 ft²", note: "Two lifts — light-duty driveway total" },
              { label: "12 in", spec: "14 ft²", coverage: "71 ft²", note: "Three lifts — full new-build driveway" },
            ]}
            caption="Crusher run at 140 lb/ft³ compacted (1.89 tons/yd³). Depths are finished, rolled depths — the allowance below covers the difference."
          />
        </Section>

        <Section title="The coverage formula">
          <FormulaBlock
            formula="Coverage (ft² per ton) = 2,000 ÷ (density × depth ÷ 12)"
            variables={[
              { symbol: "density", meaning: "Unit weight — 100 loose clean stone, 140 compacted crusher run", unit: "lb/ft³" },
              { symbol: "depth", meaning: "Layer thickness", unit: "inches" },
            ]}
            note="Shortcut for #57: 240 ÷ depth-in-inches. For compacted crusher run: 171 ÷ depth. Densities for every product are in the crushed stone weight guide."
          />
        </Section>

        <Section title="Compaction allowance">
          <InfoBlock title="Order for the finished depth, not the dumped depth">
            <p>
              A ton is a ton, but a compacted layer holds more tons per inch than a loose
              one. If you compute a base from the crusher run table and order exactly that,
              the roller will leave you thin. Add 15–20% — about 10% for the volume the
              compactor removes plus 5–10% ordinary waste. Loose decorative layers that only
              settle underfoot need just 10% total. When comparing quotes, also confirm
              whether the supplier&apos;s own coverage chart assumes loose or compacted
              placement; mixing the two conventions is the most common way orders run short.
            </p>
          </InfoBlock>
        </Section>

        <Section title="Worked example: parking pad">
          <ExampleBlock
            scenario="A 20 × 20 ft parking pad: 4 inches of compacted crusher run base topped with 2 inches of loose #57."
            steps={[
              { label: "Base lookup", work: "400 ft² ÷ 43 ft²/ton (4 in compacted) = 9.3 tons crusher run" },
              { label: "Base with 15% allowance", work: "9.3 × 1.15 = 10.7 → order 11 tons" },
              { label: "Top course lookup", work: "400 ft² ÷ 120 ft²/ton (2 in loose #57) = 3.3 tons" },
              { label: "Top with 10% allowance", work: "3.3 × 1.10 = 3.7 → order 4 tons" },
            ]}
            result="11 tons of crusher run plus 4 tons of #57 — one delivery, two dump piles, and the pad finishes at its designed depths."
          />
          <Cta
            variant={ctaVariant}
            title="Run your own dimensions through the calculator"
            href={GRAVEL.crushed}
            buttonLabel="Crushed Stone Calculator"
          />
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Coverage questions" />

        <RelatedArticles
          title="Related references"
          variant={relatedStyle}
          items={[
            ...pickLinks(stoneGuideLinks, GRAVEL.stoneWeight, GRAVEL.stoneSizes),
            ...pickLinks(referenceLinks, GRAVEL.refCoverage, GRAVEL.refConversion),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-16" />

        <References items={[GREFS.astmC29, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
