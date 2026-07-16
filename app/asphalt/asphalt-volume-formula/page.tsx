import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock } from "@/components/blocks/callout";
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
import { ASPHALT, volumeGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import { CONCRETE } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Volume Formula — Every Shape, Every Unit";
const description =
  "The three formulas that cover every paving footprint — rectangle, circle and triangle — plus the unit traps that wreck takeoffs and two worked examples in yards and tons.";
const path = ASPHALT.volumeFormula;
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
    question: "What is the basic asphalt volume formula?",
    answer:
      "Volume = length × width × depth, with all three dimensions in the same unit. In US practice that means feet: divide the result by 27 for cubic yards, or multiply by 145 lb/ft³ and divide by 2,000 for tons. Metric users multiply meters directly and read cubic meters.",
  },
  {
    question: "How do I calculate asphalt volume for an irregular shape?",
    answer:
      "Decompose it. Any straight-edged footprint splits into rectangles and triangles; curved features are circles or circle segments. Compute each piece with its own formula, sum the areas, then multiply once by depth. Two shapes cover 95% of driveways; three cover almost everything.",
  },
  {
    question: "Does the formula use loose or compacted depth?",
    answer:
      "Compacted depth — the finished pavement thickness on the drawings. Density (145 lb/ft³) already accounts for the compacted state when you convert to tons. If you instead measure a loose windrow at about 117 lb/ft³, you are in a different bookkeeping system; never mix the two.",
  },
  {
    question: "How do I convert the volume result to tons?",
    answer:
      "Multiply cubic feet by 145 and divide by 2,000, or take the shortcut: cubic yards × 1.96. A 170 ft³ takeoff is 170 × 145 ÷ 2,000 = 12.3 tons. Metric: cubic meters × 2.32 gives tonnes.",
  },
  {
    question: "Is the asphalt formula different from the concrete formula?",
    answer:
      "No — volume is material-blind. Length × width × depth works identically for both; only the density constant and the order unit change. If you have run a concrete takeoff, an asphalt takeoff is the same worksheet with 145 lb/ft³ substituted for concrete's 150.",
  },
];

const toc = tocFromTitles(
  "The rectangle formula",
  "Circles and triangles",
  "The three unit traps",
  "Worked example: L-shaped driveway",
  "Worked example: circular cul-de-sac",
);

export default function AsphaltVolumeFormulaPage() {
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
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Volume Guide"
              variant="centered"
              title="The asphalt volume formula"
              description="Three formulas — rectangle, circle, triangle — dispatch every paving footprint you will ever measure. The formulas are trivial; the unit discipline around them is where takeoffs go wrong."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Volume Formula", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="The rectangle formula">
          <FormulaBlock
            formula="V = L × W × D"
            variables={[
              { symbol: "L, W", meaning: "length and width in feet" },
              { symbol: "D", meaning: "compacted depth in feet (inches ÷ 12; 4 in = 0.333 ft)" },
              { symbol: "V", meaning: "cubic feet — ÷ 27 for yd³, × 145 ÷ 2,000 for tons" },
            ]}
            note="This one formula, applied to decomposed pieces, handles nearly every job. Metric: meters in, cubic meters out, × 2.32 for tonnes."
          />
          <p className="text-muted-foreground">
            The method is identical for concrete —{" "}
            <a href={CONCRETE.howTo} className="font-medium text-primary hover:underline">
              how to calculate concrete
            </a>{" "}
            walks the same five steps with a different density — so a takeoff skill learned
            on one material transfers whole to the other.
          </p>
        </Section>

        <Section title="Circles and triangles">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormulaBlock
              formula="V = π × r² × D"
              variables={[
                { symbol: "r", meaning: "radius in feet (half the diameter)" },
                { symbol: "D", meaning: "depth in feet" },
              ]}
              note="Cul-de-sacs, turnarounds, tank pads. Half and quarter circles: multiply by 0.5 or 0.25."
            />
            <FormulaBlock
              formula="V = ½ × b × h × D"
              variables={[
                { symbol: "b", meaning: "triangle base in feet" },
                { symbol: "h", meaning: "height perpendicular to the base" },
              ]}
              note="Entrance flares, tapers and skewed corners — measure h square to b, not along the slanted edge."
            />
          </div>
          <CoverageTable
            headers={["Site feature", "Shape to use", "Area formula"]}
            rows={[
              { label: "Driveway run, pad, lane", spec: "Rectangle", coverage: "L × W" },
              { label: "Cul-de-sac, turnaround", spec: "Circle", coverage: "π × r²", note: "Half circle: × 0.5" },
              { label: "Entrance flare, taper", spec: "Triangle", coverage: "½ × b × h" },
              { label: "L or T footprint", spec: "Two+ rectangles", coverage: "Sum of L × W pieces", note: "Split at inside corners" },
              { label: "Curved edge", spec: "Averaged rectangle", coverage: "Avg width × length", note: "Width stations every 10 ft" },
            ]}
            caption="Matching real features to formulas. Compute areas first, then multiply the total once by depth."
          />
        </Section>

        <Section title="The three unit traps">
          <WarningBlock title="Where takeoffs actually fail">
            First: multiplying feet by inches — a 4 in depth is 0.333 ft, and 40 × 12 × 4 is
            a number with no physical meaning. Second: forgetting ÷ 27 and quoting cubic feet
            as yards, a 27-fold error that somehow still reaches suppliers weekly. Third:
            mixing loose and compacted depth — the formula wants compacted design thickness,
            because the 145 lb/ft³ density that converts it to tons is a compacted figure.
          </WarningBlock>
        </Section>

        <Section title="Worked example: L-shaped driveway">
          <ExampleBlock
            scenario="An L-shaped driveway: a 40 × 12 ft main run plus a 20 × 10 ft parking leg, paved 3 in thick."
            steps={[
              { label: "Split at the inside corner", work: "Rectangle A: 40 × 12 = 480 ft² · Rectangle B: 20 × 10 = 200 ft²" },
              { label: "Total area", work: "480 + 200 = 680 ft²" },
              { label: "Volume at 3 in (0.25 ft)", work: "680 × 0.25 = 170 ft³" },
              { label: "Cubic yards", work: "170 ÷ 27 = 6.3 yd³" },
              { label: "Tons for the plant", work: "170 × 145 ÷ 2,000 = 12.3 tons" },
            ]}
            result="6.3 yd³ geometric — order about 13 tons with a 5% waste allowance."
          />
        </Section>

        <Section title="Worked example: circular cul-de-sac">
          <ExampleBlock
            title="Circular cul-de-sac"
            scenario="A 40 ft diameter turnaround paved 3 in thick. One circle formula, no decomposition needed."
            steps={[
              { label: "Radius", work: "40 ÷ 2 = 20 ft" },
              { label: "Area", work: "π × 20² = 1,256.6 ft²" },
              { label: "Volume at 3 in (0.25 ft)", work: "1,256.6 × 0.25 = 314.2 ft³" },
              { label: "Cubic yards", work: "314.2 ÷ 27 = 11.6 yd³" },
              { label: "Tons", work: "314.2 × 145 ÷ 2,000 = 22.8 tons" },
            ]}
            result="11.6 yd³ — call the plant for 24 tons with waste included."
          />
        </Section>

        <Faq items={faqItems} variant="list" />

        <Cta
          variant="banner"
          title="Let the calculator carry the units"
          description="Rectangle, feet, inches or meters — the volume calculator applies these formulas with the conversions handled."
          href={ASPHALT.volume}
          buttonLabel="Asphalt Volume Calculator"
        />

        <RelatedArticles
          title="Next in the volume series"
          variant="inline-strip"
          items={pickLinks(volumeGuideLinks, ASPHALT.measurement, ASPHALT.densityAndVolume, ASPHALT.unitConversion)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4, AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
