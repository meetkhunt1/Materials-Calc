import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock } from "@/components/blocks/callout";
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
  asphaltCalculatorLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "How to Measure for Asphalt — Irregular Areas Included";
const description =
  "Field measurement for paving takeoffs: which tools hit ±0.5% versus ±5%, the offset method for curved edges, and how to decompose any footprint into shapes you can calculate.";
const path = ASPHALT.measurement;
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
    question: "What is the most accurate way to measure a paving area?",
    answer:
      "A steel tape or calibrated measuring wheel, run twice, gets you to ±0.5% — better than the waste factor you will apply anyway. Phone GPS apps drift ±2–5% and satellite tools ±1–3%, fine for a budget number but not for the order. Measure the final quantity on the ground.",
  },
  {
    question: "How do I measure a driveway with curved edges?",
    answer:
      "Use the offset method: stretch a tape down the centerline, measure the width every 10 ft perpendicular to it, and average the widths. Average width × centerline length is the area. Five or six stations capture most residential curves within a percent or two.",
  },
  {
    question: "How often should I take width measurements?",
    answer:
      "Every 10 ft is the standard station interval for driveways and paths; tighten to 5 ft where the edge changes direction quickly, and relax to 25 ft on long uniform runs. The rule is that the edge should be nearly straight between consecutive stations.",
  },
  {
    question: "Can I measure my driveway from satellite imagery?",
    answer:
      "For a first estimate, yes — mapping tools that trace polygons on aerial photos land within ±1–3% when the edges are visible and unshaded. Tree cover, shadows and lens distortion push errors higher. Use satellite for the budget, then tape the site before you place the order.",
  },
  {
    question: "How do I handle a paving area with multiple shapes?",
    answer:
      "Decompose it: split the footprint into rectangles, triangles and circle pieces at natural break lines, measure each piece, and sum the areas before multiplying by depth. Sketch the site first and label each piece — the sketch, not the math, is where errors hide.",
  },
  {
    question: "How accurate does depth measurement need to be?",
    answer:
      "More accurate than the plan area. On a 3-inch pavement, a quarter-inch depth error is an 8% volume error — larger than any plausible area mistake. Confirm the compacted design thickness with the contractor and check the base is graded uniformly before trusting one depth number.",
  },
];

const toc = tocFromTitles(
  "Tools and their real accuracy",
  "The offset method for irregular edges",
  "Decomposing shapes",
  "Worked example: a curved rural driveway",
);

export default function AsphaltMeasurementGuidePage() {
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
              variant="compact"
              title="How to measure for asphalt"
              description="Every takeoff is only as good as the numbers walked off the site. Here is how to get survey-adjacent accuracy with a tape, a wheel and a method — curved edges included."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Measurement Guide", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Tools and their real accuracy">
          <CoverageTable
            headers={["Method", "Typical accuracy", "Best use"]}
            rows={[
              { label: "100 ft steel tape", spec: "±0.5%", coverage: "Final order quantities", note: "Two people, kept taut and level" },
              { label: "Measuring wheel", spec: "±0.5%", coverage: "Long runs, one person", note: "Calibrate against a known 100 ft" },
              { label: "Phone GPS apps", spec: "±2–5%", coverage: "Rough scoping only", note: "Worse near trees and buildings" },
              { label: "Satellite measuring tools", spec: "±1–3%", coverage: "Budget estimates, remote bids", note: "Fails under canopy and shadow" },
            ]}
            caption="Field accuracy in ordinary conditions. Only the top two rows are order-grade."
          />
          <p className="text-muted-foreground">
            The pattern to notice: a tape costs nothing extra and beats every electronic
            shortcut by a factor of four. Estimate remotely if you must — measure physically
            before money changes hands.
          </p>
        </Section>

        <Section title="The offset method for irregular edges">
          <p className="text-muted-foreground">
            Curved and wandering edges defeat the length × width instinct, but they fall to
            the offset method: establish a straight centerline down the area with a tape or
            string, then measure the full width perpendicular to it at fixed stations —
            every 10 ft is standard. Average the widths and multiply by the centerline
            length. That is the trapezoidal rule in work boots, and with stations every 10
            ft it captures typical driveway curvature within 1–2%. Where the edge swings
            hard, add intermediate stations; where it runs straight, the extra readings cost
            you nothing but confirm the average.
          </p>
        </Section>

        <Section title="Decomposing shapes">
          <p className="text-muted-foreground">
            Footprints that are irregular in plan — an L, a T, a drive with a flared apron —
            are just simple shapes wearing a trench coat. Split at the inside corners into
            rectangles; treat tapers and flares as triangles (½ × base × height); handle
            turnarounds as circles or fractions of one. Sum the piece areas, then multiply
            once by the depth in feet. The one discipline that matters: draw the split on a
            sketch before measuring, so every tape reading lands on a labeled piece rather
            than in a notebook orphaned from its geometry.
          </p>
        </Section>

        <Section title="Worked example: a curved rural driveway">
          <ExampleBlock
            scenario="A 40 ft gravel drive with curving grass edges is being paved 3 in thick. The centerline is staked and widths are taped every 10 ft."
            steps={[
              { label: "Station widths (ft)", work: "0+00: 10 · 0+10: 11 · 0+20: 12 · 0+30: 12 · 0+40: 11" },
              { label: "Average width", work: "(10 + 11 + 12 + 12 + 11) ÷ 5 = 11.2 ft" },
              { label: "Area", work: "11.2 × 40 = 448 ft²" },
              { label: "Volume at 3 in (0.25 ft)", work: "448 × 0.25 = 112 ft³" },
              { label: "Cubic yards", work: "112 ÷ 27 = 4.1 yd³" },
            ]}
            result="4.1 yd³, about 8.1 tons compacted — order 8.5 tons with waste."
          />
          <TipBlock title="Measure twice, sketch always">
            Take every critical dimension twice and keep the pair that agrees. Sketch the
            site with dimensions written on it, then photograph the sketch — the photo
            survives rain, truck cabs and the three weeks between measuring and paving.
          </TipBlock>
        </Section>

        <Faq items={faqItems} variant="list" />

        <Cta
          variant="banner"
          title="Measurements done — now the math"
          description="Feed your field dimensions to the volume calculator and get yards, feet and meters in one pass."
          href={ASPHALT.volume}
          buttonLabel="Asphalt Volume Calculator"
        />

        <RelatedArticles
          title="Put the numbers to work"
          variant="inline-strip"
          items={[
            ...pickLinks(volumeGuideLinks, ASPHALT.volumeFormula, ASPHALT.cubicYardGuide),
            ...pickLinks(asphaltCalculatorLinks, ASPHALT.driveway),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
