import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock, TipBlock } from "@/components/blocks/callout";
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
  gravelCalculatorLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-volume-formula";
const title = "Gravel Volume Formula — Length × Width × Depth, Done Right";
const description =
  "The gravel volume formula step by step: length × width × depth in consistent units, the inches-vs-feet trap, converting cubic feet to cubic yards, and turning volume into tons via density.";
const path = GRAVEL.volumeFormula;
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
    question: "What is the formula for gravel volume?",
    answer:
      "Volume = length × width × depth, with all three dimensions in the same unit. In feet, the result is cubic feet; divide by 27 for cubic yards. The full imperial chain is: ft × ft × (inches ÷ 12) = ft³, then ÷ 27 = yd³, then × 1.42 = tons for common gravel.",
  },
  {
    question: "Why do I divide depth in inches by 12?",
    answer:
      "Because the formula needs every dimension in the same unit, and depth is habitually measured in inches while length and width are in feet. Dividing by 12 converts inches to feet: 3 inches becomes 0.25 ft. Multiplying feet by feet by inches without converting inflates the answer twelvefold — the single most expensive mistake in DIY estimating.",
  },
  {
    question: "Why divide cubic feet by 27 for cubic yards?",
    answer:
      "A cubic yard is a cube measuring 3 ft on each side, and 3 × 3 × 3 = 27 cubic feet. People sometimes divide by 9 (a square yard) or by 3 (a linear yard) — both wrong by a large margin. If your cubic-yard figure isn't roughly 1/27th of your cubic-foot figure, recheck the division.",
  },
  {
    question: "How do I convert gravel volume to tons?",
    answer:
      "Multiply volume by density, then convert to tons: cubic feet × density in lb/ft³ ÷ 2,000, or the shortcut cubic yards × 1.42 for common gravel (1.3 for pea gravel, 1.69 for loose crusher run). Density is the only step where gravel type matters — the volume math is identical for every material.",
  },
  {
    question: "How much gravel do I need per square foot?",
    answer:
      "Depth ÷ 12 cubic feet per square foot. At 2 inches that's 0.167 ft³ (about 17.5 lb of common gravel); at 3 inches, 0.25 ft³ (about 26 lb); at 4 inches, 0.333 ft³ (35 lb). Multiply by your square footage and you have total volume without ever writing the full formula.",
  },
  {
    question: "Does the formula work for metric units?",
    answer:
      "Perfectly — and with fewer steps. Meters × meters × meters gives cubic meters directly; multiply by density in tonnes per cubic meter (1.68 for common gravel) and you have tonnes. There is no 12, no 27 and no 2,000 anywhere in the metric chain, which is why estimators who work in both systems prefer it.",
  },
  {
    question: "Should I round up or add a percentage?",
    answer:
      "Both, in that order: add 10% for settling and edge waste (15% for compacted stone or rough subgrade), then round up to the supplier's ordering increment — usually a half ton or half yard. Running short costs a second delivery fee of $50–150, so the allowance is cheaper than the alternative.",
  },
];

const toc = tocFromTitles(
  "The volume formula",
  "The unit trap: inches are not feet",
  "Converting to cubic yards",
  "From cubic yards to tons",
  "The metric shortcut",
);

export default function GravelVolumeFormulaPage() {
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
              eyebrow="Gravel · Formula Guide"
              variant={heroVariant}
              title="The gravel volume formula"
              description="Length times width times depth — three numbers, one multiplication, and two unit conversions where nearly every estimating error hides. Here is the formula with every trap flagged."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Volume Formula", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="The volume formula">
          <FormulaBlock
            formula="Volume (ft³) = Length (ft) × Width (ft) × Depth (ft)"
            variables={[
              { symbol: "Length", meaning: "Longest side of the area", unit: "feet" },
              { symbol: "Width", meaning: "Shorter side of the area", unit: "feet" },
              { symbol: "Depth", meaning: "Gravel layer thickness — convert inches ÷ 12 first", unit: "feet" },
            ]}
            note="Every dimension must be in the same unit before multiplying. The formula itself never changes — for circles, triangles and irregular shapes, only the area part changes (see the measurement guide)."
          />
          <p className="text-muted-foreground">
            This one line sizes every rectangular gravel job from a planter strip to a
            haul road. Everything that follows — yards, tons, cost — is unit conversion
            applied to its output. For non-rectangular sites, compute the area with the
            shape formulas in the{" "}
            <a href={GRAVEL.measurement} className="font-medium text-primary hover:underline">
              measurement guide
            </a>{" "}
            and multiply by depth exactly the same way.
          </p>
        </Section>

        <Section title="The unit trap: inches are not feet">
          <WarningBlock title="The 12× mistake">
            Multiplying feet by feet by <em>inches</em> gives a number twelve times too
            big. A 12 × 3 ft path at 3 inches deep is 12 × 3 × 0.25 = 9 ft³ — but
            plugging in the raw 3 gives 108, which prices out as a 12-ton order for a
            1-ton job. If your answer implies more than a dump truck for a garden path,
            you have almost certainly hit this trap.
          </WarningBlock>
          <ExampleBlock
            title="Converting depth the right way"
            scenario="A 12 ft × 3 ft garden path with 3 inches of gravel."
            steps={[
              { label: "Convert depth to feet", work: "3 in ÷ 12 = 0.25 ft" },
              { label: "Apply the formula", work: "12 × 3 × 0.25 = 9 ft³" },
              { label: "Sanity check", work: "9 ft³ × 105 lb/ft³ = 945 lb ≈ half a ton — plausible for a small path" },
            ]}
            result="9 cubic feet. The sanity check — does the implied weight sound like this job? — catches unit errors before the supplier does."
          />
        </Section>

        <Section title="Converting to cubic yards">
          <FormulaBlock
            formula="Cubic yards = Cubic feet ÷ 27"
            variables={[
              { symbol: "27", meaning: "Cubic feet in one cubic yard (3 × 3 × 3)", unit: "ft³/yd³" },
            ]}
            note="Divide by 27, not 9 (that's a square yard) and not 3 (a linear yard). Suppliers, truck capacities and most bulk prices all speak in cubic yards."
          />
          <ExampleBlock
            scenario="A 12 × 18 ft seating area with 3 inches of gravel — how many cubic yards?"
            steps={[
              { label: "Volume in cubic feet", work: "12 × 18 × (3 ÷ 12) = 54 ft³" },
              { label: "Divide by 27", work: "54 ÷ 27 = 2.0 yd³" },
            ]}
            result="2 cubic yards — a small single-axle dump load. Most full-size dump trucks carry 10–14 yd³, pickup beds about 1 yd³ of gravel by weight limit."
          />
        </Section>

        <Section title="From cubic yards to tons">
          <FormulaBlock
            formula="Tons = Cubic yards × Density factor (t/yd³)"
            variables={[
              { symbol: "1.42", meaning: "Common gravel, loose (2,800 lb/yd³)", unit: "t/yd³" },
              { symbol: "1.30", meaning: "Pea gravel (2,600 lb/yd³)", unit: "t/yd³" },
              { symbol: "1.35", meaning: "#57 stone, loose (2,700 lb/yd³)", unit: "t/yd³" },
              { symbol: "1.69", meaning: "Crusher run, loose (3,375 lb/yd³)", unit: "t/yd³" },
            ]}
            note="Density is where gravel type finally enters the math. Factors for every material are in the density chart and weight chart."
          />
          <ExampleBlock
            title="The full chain, start to finish"
            scenario="The same 12 × 18 ft seating area, ordered in tons of common gravel with a 10% allowance."
            steps={[
              { label: "Volume", work: "12 × 18 × 0.25 = 54 ft³ = 2.0 yd³" },
              { label: "Convert to tons", work: "2.0 × 1.42 = 2.84 tons" },
              { label: "Add 10% allowance", work: "2.84 × 1.10 = 3.12 tons" },
              { label: "Round to the ordering increment", work: "3.12 → 3.5 tons (half-ton increments)" },
            ]}
            result="Order 3.5 tons. Four short steps take you from a tape measure to a phone order — and each one is checkable."
          />
          <p className="text-muted-foreground">
            If a quote arrives in the other unit, the conversion runs both ways: tons ÷
            1.42 = loose cubic yards. The{" "}
            <a href={GRAVEL.weightChart} className="font-medium text-primary hover:underline">
              weight chart
            </a>{" "}
            covers every direction of this conversion, and the{" "}
            <a href={GRAVEL.coverage} className="font-medium text-primary hover:underline">
              coverage guide
            </a>{" "}
            translates the result into square feet on the ground.
          </p>
        </Section>

        <Section title="The metric shortcut">
          <FormulaBlock
            formula="Tonnes = L (m) × W (m) × D (m) × Density (t/m³)"
            variables={[
              { symbol: "D", meaning: "Depth in meters — 75 mm = 0.075 m", unit: "m" },
              { symbol: "Density", meaning: "1.68 for common gravel, 1.54 pea, 2.00 crusher run loose", unit: "t/m³" },
            ]}
            note="No 12, no 27, no 2,000. One multiplication chain from tape measure to order weight."
          />
          <TipBlock title="Use metric to audit your imperial math">
            The two systems make independent errors. Run a quick metric version of any
            large order (1 ft = 0.305 m) — if the tonnes and tons figures don&apos;t
            land within about 10% of each other (a tonne is 2,205 lb vs 2,000), one of
            your conversions is wrong, and you&apos;ve found it for free.
          </TipBlock>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Formula questions" />

        <Cta
          variant={ctaVariant}
          title="Let the calculator run the chain"
          description="Volume, yards, tons and bags from your dimensions — with the right density for every gravel type built in."
          href={GRAVEL.calculator}
          buttonLabel="Gravel Calculator"
        />

        <RelatedArticles
          title="Go deeper"
          variant={relatedStyle}
          items={[
            ...pickLinks(coreGuideLinks, GRAVEL.howTo, GRAVEL.measurement, GRAVEL.weightChart),
            ...pickLinks(gravelCalculatorLinks, GRAVEL.calculator),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.astmC29, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
