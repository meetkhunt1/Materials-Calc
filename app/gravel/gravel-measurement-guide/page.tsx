import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock, TipBlock } from "@/components/blocks/callout";
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
  coreGuideLinks,
  gravelCalculatorLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-measurement-guide";
const title = "Gravel Measurement Guide — Measuring Real Sites";
const description =
  "How to measure a real site for gravel: rectangles, circles and triangles, the split and offset methods for irregular areas, when slopes matter, and how to set the waste factor.";
const path = GRAVEL.measurement;
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
    question: "How do I measure an irregular area for gravel?",
    answer:
      "Two field methods cover almost everything. Split method: divide the shape into rectangles, triangles and part-circles, compute each, and add them up. Offset method: for winding paths and curvy beds, measure the width every 5–10 feet along the length, average the widths, and multiply by the total length. Both get within a few percent — closer than your waste factor.",
  },
  {
    question: "How accurate do gravel measurements need to be?",
    answer:
      "Within about 5%. Gravel is ordered with a 10–15% allowance and rounded to half-ton increments, so chasing inch-perfect dimensions is wasted effort. A tape measure and honest right angles beat a laser survey plus sloppy depth assumptions every time — depth errors cost far more than length errors.",
  },
  {
    question: "Do I need to account for slope when measuring?",
    answer:
      "Rarely. The true surface of a slope is longer than its flat-map footprint by a factor of √(1 + slope²) — but at a 10% grade that's only 0.5% extra, and even 20% adds just 2%. Only on genuinely steep banks (over about 25%) should you run the tape along the ground instead of measuring the horizontal distance.",
  },
  {
    question: "How do I measure a circle for gravel?",
    answer:
      "Measure across the widest point (the diameter), halve it for the radius, then use area = π × r². An 18-ft-diameter circle: 3.14 × 9² ≈ 254 ft². For a ring — gravel around a fire pit or tree — compute the outer circle, compute the inner circle, and subtract.",
  },
  {
    question: "What waste factor should I add?",
    answer:
      "5% for a simple rectangle on firm, level ground; 10% as the standard for typical landscaping; 15% when the stone will be compacted (crusher run bases), the subgrade is soft or uneven, or the shape has lots of edge relative to its area. Long skinny paths lose proportionally more to edges than wide pads do.",
  },
  {
    question: "Can I just estimate area from a satellite photo?",
    answer:
      "Online map tools are good for a first budget — their area measurement is usually within 5–10% on open ground. But tree canopy, roof overhangs and shadow edges hide real boundaries, and no photo tells you the depth or the condition of the subgrade. Measure on the ground before money changes hands.",
  },
];

const toc = tocFromTitles(
  "Rectangles and squares",
  "Circles and rings",
  "Triangles",
  "Irregular areas: split it or offset it",
  "Slopes",
  "Setting the waste factor",
);

export default function GravelMeasurementGuidePage() {
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
              eyebrow="Gravel · Field Guide"
              variant={heroVariant}
              title="Gravel measurement guide"
              description="Real sites are not rectangles. Here is how estimators measure curved paths, circular pits, sloping banks and odd-shaped beds with nothing but a tape — and how much waste factor each situation deserves."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Measurement Guide", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Run the numbers"
            variant="inline-strip"
            items={pickLinks(gravelCalculatorLinks, GRAVEL.calculator, GRAVEL.driveway)}
          />
        }
      >
        <Section title="Rectangles and squares">
          <FormulaBlock
            formula="Area = Length × Width"
            note="Measure both dimensions at ground level along the actual edge of the planned gravel, not the fence or the lawn line — the difference is often a foot on each side."
          />
          <p className="text-muted-foreground">
            Even on a &ldquo;rectangular&rdquo; site, measure both widths and both
            lengths. Yards are rarely square, and using the larger of each pair costs
            pennies while using the smaller risks a short order. Check squareness with
            the 3-4-5 rule: from a corner, mark 3 ft along one edge and 4 ft along the
            other — the diagonal between the marks is 5 ft only if the corner is a true
            right angle. Once you have the area, depth and volume follow the{" "}
            <a href={GRAVEL.volumeFormula} className="font-medium text-primary hover:underline">
              volume formula
            </a>{" "}
            unchanged.
          </p>
        </Section>

        <Section title="Circles and rings">
          <FormulaBlock
            formula="Circle: A = π × r²   ·   Ring: A = π × (R² − r²)"
            variables={[
              { symbol: "r", meaning: "Radius — half the widest measurement", unit: "ft" },
              { symbol: "R", meaning: "Outer radius (for rings around pits or trees)", unit: "ft" },
              { symbol: "π", meaning: "3.14 is plenty of precision for gravel", unit: "" },
            ]}
            note="Can't find the center? Measure the widest crossing in two directions and average them — good enough for an order with a 10% allowance."
          />
          <ExampleBlock
            scenario="An 18-ft-diameter circular seating area around a fire pit, graveled 3 inches deep, with the 4-ft-diameter pit itself left bare."
            steps={[
              { label: "Outer circle", work: "3.14 × 9² = 254 ft²" },
              { label: "Subtract the pit", work: "3.14 × 2² = 13 ft² → 254 − 13 = 241 ft²" },
              { label: "Volume at 3 in", work: "241 × 0.25 = 60 ft³ = 2.2 yd³" },
              { label: "Tons of pea gravel + 10%", work: "2.2 × 1.30 × 1.10 = 3.2 tons" },
            ]}
            result="Order 3.5 tons of pea gravel. The ring subtraction saved half a ton versus graveling the full circle."
          />
        </Section>

        <Section title="Triangles">
          <FormulaBlock
            formula="Area = ½ × Base × Height"
            variables={[
              { symbol: "Base", meaning: "Any side you can measure cleanly", unit: "ft" },
              { symbol: "Height", meaning: "Perpendicular distance from that side to the far corner", unit: "ft" },
            ]}
            note="Height is measured at a right angle to the base — not along the slanted side. A corner bed 14 ft along the fence and 9 ft out to the point is ½ × 14 × 9 = 63 ft²."
          />
          <p className="text-muted-foreground">
            Triangles earn their keep as the correction pieces in the split method
            below: almost any straight-edged shape decomposes into one big rectangle
            plus a triangle or two at the awkward corners.
          </p>
        </Section>

        <Section title="Irregular areas: split it or offset it">
          <p className="text-muted-foreground">
            <strong className="text-foreground">The split method</strong> handles
            straight-edged but odd-shaped areas: sketch the site, slice it into
            rectangles, triangles and part-circles, measure each piece, and sum the
            areas. An L-shaped patio is two rectangles; a five-sided bed is a rectangle
            plus a triangle. Number the pieces on your sketch and keep the arithmetic
            visible — it makes the order checkable a week later.
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">The offset method</strong> is for
            curves: winding paths, kidney-shaped beds, anything a rectangle refuses to
            fit. Run a tape down the centerline, measure the width at regular stations
            (every 5 ft for tight curves, 10 ft for gentle ones), average the widths,
            and multiply by the centerline length. It is the field version of numerical
            integration, and it converges fast.
          </p>
          <ExampleBlock
            title="Offset method on a winding path"
            scenario="A curved garden path, 40 ft along its centerline, width measured every 10 ft."
            steps={[
              { label: "Station widths", work: "4.0, 5.0, 3.5, 4.5, 4.0 ft (5 stations)" },
              { label: "Average width", work: "(4.0 + 5.0 + 3.5 + 4.5 + 4.0) ÷ 5 = 4.2 ft" },
              { label: "Area", work: "4.2 × 40 = 168 ft²" },
              { label: "Tons at 3 in, common gravel, +10%", work: "168 × 0.25 × 105 ÷ 2,000 × 1.10 = 2.4 tons" },
            ]}
            result="Order 2.5 tons. Five width readings tamed a shape no formula fits."
          />
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Measurement questions" />

        <Section title="Slopes">
          <InfoBlock title="Slopes matter less than people think">
            The surface of a slope is longer than its horizontal footprint by
            √(1 + slope²). At a 10% driveway grade that is a 0.5% difference; at 20%,
            about 2% — both smaller than your waste factor, so ignore them. Only past
            roughly 25% (a bank you would hesitate to mow) should you measure along the
            ground surface with the tape rather than horizontally. What slopes
            genuinely change is <strong>material choice</strong>: rounded stone
            migrates downhill, so steep sections want angular crushed stone and
            possibly geocell confinement — covered in the{" "}
            <a href={GRAVEL.drivewayInstall} className="font-medium text-primary hover:underline">
              driveway installation guide
            </a>
            .
          </InfoBlock>
        </Section>

        <Section title="Setting the waste factor">
          <CoverageTable
            headers={["Site condition", "Waste factor", "Why"]}
            rows={[
              { label: "Simple rectangle, firm level base", spec: "5%", coverage: "Minimal edges, no compaction loss" },
              { label: "Typical landscaping job", spec: "10%", coverage: "The default — settling plus edge spill" },
              { label: "Compacted base (crusher run)", spec: "15%", coverage: "Compaction alone consumes ~12%" },
              { label: "Soft, muddy or uneven subgrade", spec: "15%", coverage: "Low spots and punch-in losses", note: "Grade first if you can — it's cheaper than stone" },
              { label: "Long narrow paths, complex edges", spec: "10–15%", coverage: "High edge-to-area ratio loses more to borders" },
            ]}
            caption="Apply the factor to the calculated quantity, then round up to the supplier's half-ton or half-yard increment."
          />
          <TipBlock title="Measure depth in more than one place">
            Area errors are usually small; depth errors are usually large. On an
            existing surface being topped up, probe the current gravel depth at five or
            six spots — the average is often an inch less than it looks at the edge,
            and an inch across a driveway is tons.
          </TipBlock>
          <Cta
            variant={ctaVariant}
            title="Turn your measurements into an order"
            href={GRAVEL.calculator}
            buttonLabel="Gravel Calculator"
          />
        </Section>

        <RelatedArticles
          title="Next steps"
          variant={relatedStyle}
          items={pickLinks(
            coreGuideLinks,
            GRAVEL.volumeFormula,
            GRAVEL.howTo,
            GRAVEL.coverage,
          )}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.fhwaGravel, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
