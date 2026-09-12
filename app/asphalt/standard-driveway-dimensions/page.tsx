import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
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
import { getAuthor } from "@/data/authors";
import { ASPHALT, drivewayGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import {
  BAND_500_1000,
  bandRangeShort,
  LARGE_JOB_GUIDANCE_SHORT,
} from "@/data/pricing";
import type { FaqItem } from "@/types";

const title = "Standard Driveway Dimensions Guide";
const description =
  "Standard driveway dimensions for single, double and circular layouts: 10–12 ft single lanes, 20–24 ft doubles, turning radii by vehicle, apron flares, and the slope limits that keep bumpers off the pavement.";
const path = ASPHALT.drivewayDimensions;
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
    question: "How wide should a driveway be for one car?",
    answer:
      "Plan on 10–12 ft. A car is only about 6 ft wide, but you need door-swing room and a walking margin so nobody steps off the edge onto turf. Go 12 ft if the drive is bordered by a wall, fence or retaining wall on either side — fixed obstructions make 10 ft feel tight fast.",
  },
  {
    question: "How wide is a standard two-car driveway?",
    answer:
      "20–24 ft at the parking area. Two 10 ft lanes work when both vehicles are compact; 22–24 ft is the comfortable standard so both doors can open at once. If budget is tight, taper: run a 12 ft single lane from the street and widen to 20–24 ft only where the cars actually sit.",
  },
  {
    question: "How long does a driveway need to be per car?",
    answer:
      "Allow 18–20 ft of length per parked vehicle — a mid-size car is about 16 ft and a crew-cab pickup runs 20 ft or more. A 30–40 ft drive stacks two cars in line with room to walk around them. Keep the last 3–4 ft before the garage door flat so bumpers clear the slab transition.",
  },
  {
    question: "What is the minimum radius for a circular driveway?",
    answer:
      "Use a 15 ft minimum inside radius with a 10–12 ft lane, which puts the outside radius at 25–27 ft. Tighter than that and drivers cut the inside edge, which crushes unsupported asphalt. If the lot can afford it, an 18–20 ft inside radius handles delivery vans and guests who corner wide without riding the edge.",
  },
  {
    question: "Does a wider driveway cost proportionally more?",
    answer:
      "Not quite — area drives the bill, but extra width is cheaper per square foot than the job average. Widening a 40 ft drive from 10 ft to 12 ft adds 80 ft², and because mobilization, excavation setup and crew time are already paid for, that increment costs close to material and placement rather than the full installed rate. It is the cheapest pavement you will ever buy on that job — which is why width is worth adding during initial paving, never as a patched-on strip later.",
  },
  {
    question: "How much extra area does a turnaround add?",
    answer:
      "A backing-out pad (a Y or hammerhead turnaround) typically needs a 10 × 20 ft to 12 × 24 ft branch — about 200–290 ft² of extra pavement. At 3 in of compacted hot mix that is roughly 4–5.5 additional tons of asphalt. On a busy road, it is the single best safety upgrade a driveway layout can include.",
  },
];

const toc = tocFromTitles(
  "Standard configurations",
  "Vehicle envelopes and turning space",
  "Slopes, grades and transitions",
  "Worked example: sizing a double drive with turnaround",
);

export default function StandardDrivewayDimensionsPage() {
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
              eyebrow="Asphalt · Driveway Guide"
              variant="standard"
              title="Standard driveway dimensions"
              description="Width, length and turning space are the three numbers that decide whether a driveway works for the next 20 years. Here are the dimensions that do — by configuration and by vehicle."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Standard Driveway Dimensions", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Dimensions settled?"
            description="Feed the footprint into the driveway calculator for tonnage and base gravel."
            href={ASPHALT.driveway}
            buttonLabel="Driveway Calculator"
          />
        }
      >
        <Section title="Standard configurations">
          <p className="text-muted-foreground">
            These are the layouts that survive contact with real vehicles. Every one assumes
            3 in of compacted hot mix over a 6 in aggregate base — thickness is covered
            separately; this page is purely geometry. Once the footprint is settled, the{" "}
            <a href={ASPHALT.drivewayInstall} className="font-medium text-primary hover:underline">
              driveway installation guide
            </a>{" "}
            takes it from excavation depth through final roll.
          </p>
          <CoverageTable
            headers={["Configuration", "Width", "Length / geometry"]}
            rows={[
              {
                label: "Single drive",
                spec: "10–12 ft",
                coverage: "30–40 ft typical from street to garage",
                note: "12 ft where walls or fences border the lane",
              },
              {
                label: "Double drive",
                spec: "20–24 ft",
                coverage: "30–40 ft; can taper to a 12 ft lane at the street",
                note: "22 ft is the comfortable two-door minimum",
              },
              {
                label: "Circular drive",
                spec: "10–12 ft lane",
                coverage: "Min 15 ft inside radius (25–27 ft outside)",
                note: "Tighter radii get edge-cut by tires",
              },
              {
                label: "Street apron flare",
                spec: "+2–4 ft per side",
                coverage: "Flares over the last 8–10 ft to the street",
                note: "Lets vehicles swing in without tracking the lawn",
              },
            ]}
            caption="Residential layout standards. Check local code — many jurisdictions cap apron width at the curb cut."
          />
        </Section>

        <Section title="Vehicle envelopes and turning space">
          <p className="text-muted-foreground">
            Design for the largest vehicle that will use the drive weekly, not the family
            sedan. The envelope is the parked footprint; the turning radius is what the
            approach and any turnaround must accommodate.
          </p>
          <CoverageTable
            headers={["Vehicle", "Envelope (W × L)", "Curb-to-curb turning radius"]}
            rows={[
              { label: "Passenger car", spec: "6 × 16 ft", coverage: "18–20 ft" },
              { label: "Pickup / full-size SUV", spec: "7 × 20 ft", coverage: "22–26 ft" },
              {
                label: "RV / motorhome",
                spec: "8.5 × 30+ ft",
                coverage: "30–40 ft",
                note: "Also check overhead clearance on the approach",
              },
              {
                label: "Delivery box truck",
                spec: "8 × 24 ft",
                coverage: "28–34 ft",
                note: "Worth checking if the drive doubles as service access",
              },
            ]}
            caption="Plan turning geometry to the largest regular user, not the occasional visitor."
          />
          <TipBlock title="The chalk test">
            Before committing a layout to excavation, stripe it with marking chalk and drive
            every household vehicle through it — in reverse too. Ten minutes with a chalk
            line finds the pinch points that are expensive to fix in asphalt.
          </TipBlock>
        </Section>

        <Section title="Slopes, grades and transitions">
          <p className="text-muted-foreground">
            Grade limits matter as much as width. Hold the running grade to a maximum of
            12–15% — beyond that, low-clearance cars scrape, winter traction fails, and
            pavers struggle to compact uniformly. Build in a 2% cross-slope (about 1/4 in
            per foot) so water sheets off the surface instead of ponding, and never drain
            toward the garage.
          </p>
          <InfoBlock title="Transition zones prevent scraping">
            Where a steep drive meets a flat street or garage slab, insert a 10–15 ft
            transition at roughly half the main grade. The break-over angle — not the slope
            itself — is what grinds bumpers and drags hitches. A 14% grade with proper
            transitions drives better than an 8% grade that changes angle abruptly.
          </InfoBlock>
          <p className="text-muted-foreground">
            Geometry decided at this stage outlives the pavement itself: a drive that ponds
            water or forces a three-point turn onto the lawn edge fails early no matter how
            good the mix was. That link between layout and service life is the subject of the{" "}
            <a href={ASPHALT.drivewayLifespan} className="font-medium text-primary hover:underline">
              driveway lifespan guide
            </a>
            , and the{" "}
            <a href={ASPHALT.drivewayFaqs} className="font-medium text-primary hover:underline">
              driveway FAQs
            </a>{" "}
            answer the width, apron and setback questions that come up once you start marking
            the ground.
          </p>
        </Section>

        <Section title="Worked example: sizing a double drive with turnaround">
          <ExampleBlock
            scenario="A double driveway 22 ft wide and 36 ft long from street to garage, plus a 12 × 20 ft hammerhead turnaround and apron flares adding 3 ft per side over the last 8 ft."
            steps={[
              { label: "Main slab", work: "22 × 36 = 792 ft²" },
              { label: "Turnaround branch", work: "12 × 20 = 240 ft²" },
              { label: "Apron flares (two triangles)", work: "2 × (0.5 × 3 × 8) = 24 ft²" },
              { label: "Total area", work: "792 + 240 + 24 = 1,056 ft²" },
              {
                label: "Tonnage at 3 in compacted (1 ton ≈ 53 ft²)",
                work: "1,056 ÷ 53 ≈ 19.9 → order ~22 tons with 10% waste",
              },
            ]}
            result={`About 1,060 ft² of pavement and a 22-ton hot mix order. At that size the per-square-foot rate is below the ${bandRangeShort(BAND_500_1000)} a 500–1,000 ft² drive carries, but ${LARGE_JOB_GUIDANCE_SHORT}.`}
          />
          <p className="text-muted-foreground">
            That square-footage figure is the input every quote is built on, so it is worth
            pricing before you call anyone: the{" "}
            <a href={ASPHALT.costGuide} className="font-medium text-primary hover:underline">
              asphalt cost guide
            </a>{" "}
            breaks the same job into material, labor, mobilization and the fees that only
            appear on the invoice.
          </p>
        </Section>

        <Faq items={faqItems} variant="list" title="Dimension questions" />

        <RelatedArticles
          title="Next: thickness, build and budget"
          variant="cards"
          items={pickLinks(
            drivewayGuideLinks,
            ASPHALT.drivewayThickness,
            ASPHALT.drivewayInstall,
            ASPHALT.drivewayCost,
          )}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
