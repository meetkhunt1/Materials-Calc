import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { WarningBlock, TipBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, howToSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, drivewayGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Driveway Installation Guide (Step by Step)";
const description =
  "How an asphalt driveway is built, step by step: excavation to 9–10 in, grading for drainage, 6 in of compacted aggregate base, tack coat, two hot mix lifts and final rolling — with the checks that separate a 25-year driveway from an 8-year one.";
const path = ASPHALT.drivewayInstall;
const author = getAuthor("materials-team");

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
});

const installSteps = [
  {
    name: "Layout and utility check",
    text: "Stake the footprint, confirm setbacks and curb-cut rules, and call 811 for utility locates before any digging. Verify the finished surface will sit slightly above surrounding grade so water leaves the pavement.",
  },
  {
    name: "Excavate 9–10 inches",
    text: "Strip topsoil and organics down to firm subgrade — typically 9–10 in below finished grade to fit 6 in of base plus 3 in of asphalt. Soft spots get dug out and replaced with compacted aggregate.",
  },
  {
    name: "Grade for drainage",
    text: "Shape the subgrade to the finished profile: 2% cross-slope minimum, running grade under 12–15%, and always falling away from the garage and foundation. Water that can't leave is the number-one pavement killer.",
  },
  {
    name: "Geotextile on soft soils",
    text: "On clay or wet subgrades, roll out a woven geotextile separation fabric before the base. It stops aggregate from punching into the clay and keeps fines from pumping up into the base under load.",
  },
  {
    name: "Place and compact base in lifts",
    text: "Spread 6 in of dense-graded aggregate (8 in on clay) in 3–4 in lifts, compacting each to 95%+ with a vibratory roller or plate. The finished base should not rut or flex under a loaded dump truck.",
  },
  {
    name: "Tack or prime",
    text: "Apply a prime coat to the aggregate base, and a tack coat on any lift-to-lift or existing-pavement joint. This glues the layers into a single structural section instead of loose sheets.",
  },
  {
    name: "Pave in lifts",
    text: "Place a 2 in compacted binder course, then a 1–1.5 in surface course of finer mix — 3 in total compacted. Mix should arrive at 275–325°F and be rolled before it cools below about 175°F.",
  },
  {
    name: "Compact and edge",
    text: "Roll immediately behind the paver — breakdown, intermediate and finish passes — and hand-tamp edges at 45°. Support the edges with backfilled topsoil; unsupported edges are where driveways start to crumble.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "How long does it take to install an asphalt driveway?",
    answer:
      "The paving itself usually takes one day; excavation and base work add another. Plan on 1–2 days on site for a typical residential drive, provided the base can be placed and compacted in dry conditions. If soft subgrade turns up during excavation, the fix — undercut and replace — can add a day.",
  },
  {
    question: "How soon can I drive on a new asphalt driveway?",
    answer:
      "Walk on it after 24 hours; drive on it after 2–3 days in moderate weather, longer in summer heat. Fresh asphalt cures by oxidation over 6–12 months, so for the first season avoid parking in the same spot daily, keep trailer jacks and kickstands off it, and don't turn the wheels while stationary.",
  },
  {
    question: "Can asphalt be paved over an existing driveway?",
    answer:
      "An overlay of 1.5–2 in over structurally sound asphalt is legitimate and costs roughly half of full replacement. But an overlay over alligator cracking or base failure just reprints the old cracks within 2–3 years — reflection cracking is relentless. Sound surface, overlay; failed base, remove and rebuild.",
  },
  {
    question: "What temperature is needed to pave a driveway?",
    answer:
      "Ambient and surface temperatures of 50°F and rising are the practical floor for 3 in residential lifts. Hot mix leaves the plant at 275–325°F and must be compacted before it cools below about 175°F — cold weather shortens that window dramatically, and mix compacted too cold never reaches density.",
  },
  {
    question: "Do I need a permit to pave a driveway?",
    answer:
      "Frequently, yes — most municipalities regulate the apron connection to the public street, curb cuts and drainage onto neighboring lots, and some require a right-of-way permit even when the driveway itself doesn't need one. A legitimate contractor handles this; a quote that never mentions permits is a small red flag.",
  },
  {
    question: "How do I know the crew compacted the base properly?",
    answer:
      "Ask for the numbers: base placed in 3–4 in lifts, each compacted to 95%+ of maximum density, verified by proof-rolling with a loaded truck. Watch the proof roll — visible rutting or pumping under the tires means more compaction or drainage work is needed. Any crew that spreads 6 in in one pass and hits it twice is building an 8-year driveway.",
  },
];

const toc = tocFromTitles(
  "The eight-step installation sequence",
  "Compaction: the make-or-break variable",
  "Weather windows",
  "Who and what shows up on paving day",
);

export default function DrivewayInstallationGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title,
            description,
            path,
            category: "Asphalt",
            datePublished: "2026-07-15",
            author,
          }),
          howToSchema({
            name: "How to Install an Asphalt Driveway",
            description:
              "Eight-step residential driveway installation: excavation, base, tack and two-lift paving.",
            path,
            steps: installSteps,
            totalTime: "P2D",
          }),
        ]}
      />
      <ArticleShell
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Driveway Guide"
              variant="stat-strip"
              title="Asphalt driveway installation guide"
              description="A driveway is a small road: same physics, same failure modes. Here is the full build sequence — and the compaction and drainage checks that decide whether it lasts 8 years or 25."
              stats={[
                { value: "1–2 days", label: "typical install" },
                { value: "6 in", label: "standard aggregate base" },
                { value: "2–3 days", label: "before driving on it" },
                { value: "15–25 yr", label: "service life when built right" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Driveway Installation Guide", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="The eight-step installation sequence">
          <ol className="space-y-4">
            {installSteps.map((step, index) => (
              <li key={step.name} className="flex gap-4 rounded-xl border p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold">{step.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Compaction: the make-or-break variable">
          <WarningBlock title="Compaction is everything">
            Nearly every premature driveway failure traces back to density. The base must be
            placed in 3–4 in lifts and each lift compacted to 95%+ of maximum dry density —
            dumping 6 in in one pass and rolling the top is how you build hidden soft
            layers that alligator-crack within five years. The asphalt itself follows the
            same law: mix rolled after it cools below ~175°F never densifies, and
            under-compacted asphalt lets in the water that destroys it from below.
          </WarningBlock>
          <p className="text-muted-foreground">
            Compaction is also the one step you can verify from the sidewalk: count the
            base lifts going in, and watch the proof roll. Everything else on this page is
            recoverable; a bad base is a rebuild.
          </p>
        </Section>

        <Section title="Weather windows">
          <TipBlock title="Schedule for temperature, not the calendar">
            Book paving for daytime temperatures of 50°F and rising, and never allow
            placement on a saturated base — trapped moisture flashes to steam under
            300°F mix and destroys the bond. In marginal spring or fall weather, a morning
            pour beats an afternoon one: the mat has the warm hours to be compacted before
            temperatures fall off.
          </TipBlock>
          <p className="text-muted-foreground">
            Rain the day before is fine if the base drains and proof-rolls dry; rain during
            paving stops the job. Good contractors reschedule without argument — the ones
            who pave anyway are spending your 20 years of service life to save their
            afternoon.
          </p>
        </Section>

        <Section title="Who and what shows up on paving day">
          <CoverageTable
            headers={["Equipment / role", "What it does", "Watch for"]}
            rows={[
              {
                label: "Dump trucks (2–4)",
                spec: "Haul mix from the plant",
                coverage: "Steady arrivals — mix sitting in a truck is cooling",
              },
              {
                label: "Paver",
                spec: "Places the mat at uniform depth",
                coverage: "Consistent speed; stopping mid-pull leaves a bump",
              },
              {
                label: "Vibratory roller",
                spec: "Breakdown and finish compaction",
                coverage: "Rolling starts immediately behind the paver",
              },
              {
                label: "Plate compactor / hand tamp",
                spec: "Edges, corners, tie-ins",
                coverage: "Edges tamped at 45° and backfilled after",
              },
              {
                label: "Foreman + 3–5 crew",
                spec: "Raking, joints, grade checks",
                coverage: "Someone checking depth behind the paver with a probe",
              },
              {
                label: "Tack/prime distributor",
                spec: "Bonds lifts and base",
                coverage: "Thin, uniform coat — puddles bleed through the surface",
              },
            ]}
            caption="A typical residential paving crew. Missing rollers or a two-man crew are quote-stage warning signs."
          />
        </Section>

        <Faq items={faqItems} variant="list" title="Installation questions" />

        <Cta
          variant="banner"
          title="Price the materials before the quotes arrive"
          description="The driveway calculator returns hot mix tonnage and base gravel for your footprint — so you can sanity-check every bid."
          href={ASPHALT.driveway}
          buttonLabel="Driveway Calculator"
        />

        <RelatedArticles
          title="Before and after the build"
          variant="cards"
          items={pickLinks(
            drivewayGuideLinks,
            ASPHALT.drivewayCost,
            ASPHALT.drivewayMaintenance,
            ASPHALT.drivewayDimensions,
          )}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.ms4, AREFS.fhwa]} />
      </ArticleShell>
    </>
  );
}
