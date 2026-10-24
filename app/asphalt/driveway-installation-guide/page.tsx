import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { QuickAnswer } from "@/components/blocks/quick-answer";
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

const title = "Asphalt Driveway Installation Guide: 8 Steps";
const description =
  "Asphalt driveway installation takes 1–2 days: dig 9–10 in, compact 6 in of gravel base, then pave 3 in of hot mix in two lifts. See all 8 steps and crew checks.";
const path = ASPHALT.drivewayInstall;
const author = getAuthor("materials-team");
const modified = "2026-10-24";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
  modifiedTime: modified,
});

const installSteps = [
  {
    name: "Layout and utility check",
    text: "Stake the footprint, confirm setbacks and curb-cut rules, and call 811 for utility locates before any digging. Verify the finished surface will sit slightly above surrounding grade so water leaves the pavement.",
  },
  {
    name: "Excavate 9–10 inches",
    text: "Strip topsoil and organics down to firm subgrade, typically 9–10 in below finished grade to fit 6 in of base plus 3 in of asphalt. Soft spots get dug out and replaced with compacted aggregate.",
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
    text: "Place a 2 in compacted binder course, then a 1–1.5 in surface course of finer mix, for 3 in total compacted. Mix should arrive at 275–325°F and be rolled before it cools below about 175°F.",
  },
  {
    name: "Compact and edge",
    text: "Roll immediately behind the paver (breakdown, intermediate and finish passes) and hand-tamp edges at 45°. Support the edges with backfilled topsoil; unsupported edges are where driveways start to crumble.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "How long does it take to install an asphalt driveway?",
    answer:
      "Installing an asphalt driveway takes 1–2 days on site for a typical residential drive. The paving itself usually takes one day, and excavation and base work add another, provided the base can be placed and compacted in dry conditions. If soft subgrade turns up during excavation, the fix (undercut and replace) can add a day.",
  },
  {
    question: "Can asphalt be paved over an existing driveway?",
    answer:
      "Yes, if the old asphalt is structurally sound: an overlay of 1.5–2 in is legitimate and costs roughly half of full replacement. But an overlay over alligator cracking or base failure just reprints the old cracks within 2–3 years, because reflection cracking is relentless. Sound surface, overlay; failed base, remove and rebuild.",
  },
  {
    question: "What temperature is needed to pave a driveway?",
    answer:
      "Paving needs ambient and surface temperatures of 50°F and rising, the practical floor for 3 in residential lifts. Hot mix leaves the plant at 275–325°F and must be compacted before it cools below about 175°F. Cold weather shortens that window dramatically, and mix compacted too cold never reaches density.",
  },
  {
    question: "Do I need a permit to pave a driveway?",
    answer:
      "Frequently, yes. Most municipalities regulate the apron connection to the public street, curb cuts and drainage onto neighboring lots, and some require a right-of-way permit even when the driveway itself doesn't need one. A legitimate contractor handles this; a quote that never mentions permits is a small red flag.",
  },
  {
    question: "How do I know the crew compacted the base properly?",
    answer:
      "You know the base was compacted properly when it went down in 3–4 in lifts, each compacted to 95%+ of maximum density and verified by proof-rolling with a loaded truck. Ask for those numbers and watch the proof roll: visible rutting or pumping under the tires means more compaction or drainage work is needed. Any crew that spreads 6 in in one pass and hits it twice is building an 8-year driveway.",
  },
  {
    question: "How deep do you dig for an asphalt driveway?",
    answer:
      "Dig 9–10 inches below finished grade for a standard residential asphalt driveway. That depth fits 6 in of compacted aggregate base plus 3 in of compacted hot mix. On clay, plan for an 8 in base and a correspondingly deeper excavation, and dig out any soft spots down to firm subgrade.",
  },
  {
    question: "Can I install an asphalt driveway myself?",
    answer:
      "Not realistically for a full driveway. Hot mix arrives at 275–325°F and must be placed with a paver and compacted with a vibratory roller before it cools below about 175°F, which takes a crew working in step. DIY asphalt is practical only for small patches with cold mix and a hand tamper.",
  },
];

const toc = tocFromTitles(
  "How is an asphalt driveway installed?",
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
            dateModified: modified,
            author,
          }),
          howToSchema({
            name: "How to Install an Asphalt Driveway",
            description:
              "Eight-step residential driveway installation: excavation, base, tack and two-lift paving.",
            path,
            steps: installSteps,
            totalTime: "P2D",
            tools: ["Plate compactor", "String line & stakes", "Rake", "Asphalt lute", "Hand tamper"],
            supplies: [
              "Hot mix asphalt (HMA)",
              "Crushed stone base",
              "Tack coat / asphalt emulsion",
              "Landscape edging",
            ],
            deepLinkSteps: true,
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
              description="A driveway is a small road: same physics, same failure modes. Here is the full build sequence, plus the compaction and drainage checks that decide whether it lasts 8 years or 25."
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
        <QuickAnswer
          question="How is an asphalt driveway installed?"
          answer="A residential asphalt driveway is installed in 1–2 days: the crew excavates 9–10 in, grades for drainage, compacts 6 in of aggregate base in 3–4 in lifts, applies a tack or prime coat, then paves 3 in of hot mix in two lifts and rolls it before it cools below about 175°F."
          ruleOfThumb="6 in of base, 3 in of asphalt, 2% cross-slope, 50°F and rising."
        />

        <Section title="How is an asphalt driveway installed?">
          <p className="text-muted-foreground">
            An asphalt driveway is installed in eight steps, from utility locates to final
            rolling, and the subgrade and base steps decide most of its service life.
          </p>
          <ol className="space-y-4">
            {installSteps.map((step, index) => (
              <li id={`step-${index + 1}`} key={step.name} className="flex gap-4 rounded-xl border p-4">
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
            placed in 3–4 in lifts and each lift compacted to 95%+ of maximum dry density.
            Dumping 6 in in one pass and rolling the top is how you build hidden soft
            layers that alligator-crack within five years. The asphalt itself follows the
            same law: mix rolled after it cools below ~175°F never densifies, and
            under-compacted asphalt lets in the water that destroys it from below.
          </WarningBlock>
          <p className="text-muted-foreground">
            Compaction is the one step you can verify from the sidewalk: count the
            base lifts going in, and watch the proof roll. Everything else on this page is
            recoverable; a bad base is a rebuild.
          </p>
        </Section>

        <Section title="Weather windows">
          <TipBlock title="Schedule for temperature, not the calendar">
            Book paving for daytime temperatures of 50°F and rising, and never allow
            placement on a saturated base, because trapped moisture flashes to steam under
            300°F mix and destroys the bond. In marginal spring or fall weather, a morning
            pour beats an afternoon one: the mat has the warm hours to be compacted before
            temperatures fall off.
          </TipBlock>
          <p className="text-muted-foreground">
            Rain the day before is fine if the base drains and proof-rolls dry; rain during
            paving stops the job. Good contractors reschedule without argument. The ones
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
                coverage: "Steady arrivals, because mix sitting in a truck is cooling",
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
                coverage: "Thin, uniform coat; puddles bleed through the surface",
              },
            ]}
            caption="A typical residential paving crew. Missing rollers or a two-man crew are quote-stage warning signs."
          />
        </Section>

        <Faq items={faqItems} variant="list" title="Installation questions" />

        <Cta
          variant="banner"
          title="Price the materials before the quotes arrive"
          description="The driveway calculator returns hot mix tonnage and base gravel for your footprint, so you can sanity-check every bid."
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

        <AuthorBox author={author} datePublished="2026-07-15" dateModified={modified} />

        <References items={[AREFS.napa, AREFS.ms4, AREFS.fhwa]} />
      </ArticleShell>
    </>
  );
}
