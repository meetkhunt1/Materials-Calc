import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { WarningBlock, SuccessBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, howToSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { pick, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { getAuthor } from "@/data/authors";
import { GRAVEL, drivewayGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-driveway-installation";
const title = "Gravel Driveway Installation (Step by Step)";
const description =
  "How to install a gravel driveway that lasts: layout and utility locates, excavation to 8–12 in, grading a 2–3% crown, geotextile fabric, three stone layers compacted one at a time, and edging — with the tool list and the checks that matter.";
const path = GRAVEL.drivewayInstall;
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

const installSteps = [
  {
    name: "Layout and utility locates",
    text: "Stake both edges of the drive with string lines, check setbacks and any culvert or apron rules with the municipality, and call 811 for utility locates before any digging. Plan the finished surface to sit slightly above the surrounding grade so water has somewhere to go.",
  },
  {
    name: "Excavate 8–12 inches",
    text: "Strip all topsoil and organic material down to firm mineral subgrade — typically 8 in deep on firm soil, 12 in on clay or soft ground. Organics rot and settle; any left behind becomes a dip in two years. Dig out soft pockets and fill them with compacted base stone.",
  },
  {
    name: "Grade the subgrade and set the crown",
    text: "Shape the excavation to the finished profile: a 2–3% crown (about 1/4 to 3/8 in of fall per foot from centerline to edge) so the finished drive sheds water sideways, with ditches or swales along the edges where runoff collects. The crown is built into every layer, not raked on at the end.",
  },
  {
    name: "Lay geotextile fabric",
    text: "On clay, silt or wet ground, roll out woven separation geotextile across the full excavation, overlapping seams 12–18 in and running the fabric up the sides of the cut. It keeps stone and soil separated for the life of the drive.",
  },
  {
    name: "Place and compact the #3 base",
    text: "Spread 4 in of #3 crushed stone (1–2 in angular rock), rake it level while holding the crown, and compact with 4–6 passes of a plate compactor or roller. This layer spreads wheel loads into the subgrade — it is the structural heart of the drive.",
  },
  {
    name: "Place and compact the #57 middle layer",
    text: "Spread 3–4 in of #57 stone over the compacted base, keeping the crown, and compact again. The 3/4 in stone chokes the surface voids of the base layer and builds a free-draining platform for the wear course.",
  },
  {
    name: "Place, crown and compact the surface",
    text: "Spread 2–3 in of crusher run, shape the final 2–3% crown carefully, dampen lightly if the stone is dust-dry, and compact to a tight crust. This is the layer you see and drive on — take the time to get the profile true.",
  },
  {
    name: "Edge and finish",
    text: "Contain the edges with steel edging, timber, or a compacted soil shoulder flush with the surface, and cut in any drainage ditches or culvert aprons. Unsupported edges are where gravel drives start to unravel — and where every future rake-back begins.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Can I lay a gravel driveway over grass or dirt?",
    answer:
      "No — stone placed on turf or topsoil sinks as the organics beneath it rot and compress, and you effectively buy the same gravel twice. Always strip to firm mineral subgrade first. The one exception is topping up an existing gravel drive that already has a sound compacted base.",
  },
  {
    question: "How long does it take to install a gravel driveway?",
    answer:
      "With a rented skid steer and plate compactor, a 600 ft² single-car drive is a solid 2–3 day DIY project: one day to excavate and grade, one to two days to place and compact three layers. A contractor crew with a tractor and roller typically does the same drive in a day once materials are staged.",
  },
  {
    question: "What slope should a gravel driveway have?",
    answer:
      "A 2–3% cross-slope crown — the center 1/4 to 3/8 in higher per foot of half-width — so rain sheds to the edges instead of soaking in or running down the wheel paths. Along its length, gravel handles running grades up to about 10–12%; steeper sections migrate downhill and usually need a paved or grid-stabilized strip.",
  },
  {
    question: "Do I need to compact every layer separately?",
    answer:
      "Yes. A plate compactor only densifies the top 3–4 in of loose stone, so compaction has to happen layer by layer — 4–6 passes each, working from the edges toward the crown. Stone dumped 8–10 in deep and compacted once forms a crust over a loose core that ruts from the inside out.",
  },
  {
    question: "What equipment do I need to build a gravel driveway?",
    answer:
      "Minimum: a machine to dig and move stone (skid steer, compact tractor, or a mini excavator plus wheelbarrows for small drives), a plate compactor, a landscape rake, string lines and a line level for the crown, and a utility knife for fabric. All of it rents for a combined $350–550 per weekend in most markets.",
  },
  {
    question: "When is the best time of year to install?",
    answer:
      "Late spring through early fall, on a dry subgrade. Compacting stone over saturated soil traps water and pumps mud into the base; frozen ground cannot be graded or compacted at all. If the excavation floor is wet enough to smear underfoot, wait — a week of patience buys years of performance.",
  },
];

const toc = tocFromTitles(
  "The eight-step build",
  "The crown: the geometry that does the work",
  "Compaction, layer by layer",
  "Tools and equipment",
  "The finish checks",
);

export default function GravelDrivewayInstallationPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title,
            description,
            path,
            category: "Gravel",
            datePublished,
            author,
          }),
          howToSchema({
            name: "How to Install a Gravel Driveway",
            description:
              "Eight-step gravel driveway installation: layout, excavation, crowned grading, geotextile, three compacted stone layers and edging.",
            path,
            steps: installSteps,
            totalTime: "P3D",
          }),
        ]}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Driveways"
              variant={heroVariant}
              title="Gravel driveway installation"
              description="Every lasting gravel drive is built the same way: dig to firm ground, grade a crown, then place three stone layers and compact each one. Here is the full sequence, with the checks that separate a 20-year drive from a 2-year one."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Gravel Driveway Installation", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Plan the materials"
            variant="inline-strip"
            items={pickLinks(drivewayGuideLinks, GRAVEL.drivewayDepth, GRAVEL.drivewayCost)}
          />
        }
      >
        <Section title="The eight-step build">
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
          <p className="text-muted-foreground">
            What each stone layer is doing structurally — and why the sizes step down
            from bottom to top — is covered in the{" "}
            <a href={GRAVEL.drivewayLayers} className="font-medium text-primary hover:underline">
              base layers guide
            </a>
            .
          </p>
        </Section>

        <Section title="The crown: the geometry that does the work">
          <FormulaBlock
            title="Crown height from cross-slope"
            formula="Crown rise = half-width × slope"
            variables={[
              { symbol: "half-width", meaning: "centerline to edge", unit: "ft" },
              { symbol: "slope", meaning: "target cross-slope, 0.02–0.03", unit: "decimal" },
            ]}
            note="A 12 ft wide drive (6 ft half-width) at 2.5% needs the centerline about 1.8 in higher than the edges. Check it with a string line and line level across the drive — eyeballing a crown reliably produces a flat one."
          />
          <p className="text-muted-foreground">
            Water is the only force that destroys gravel drives — everything else just
            rearranges stone. A true crown sheds rain sideways in seconds; a flat or
            dished surface ponds it, softens the layers below, and turns wheel paths
            into ruts the next time a car passes. Build the crown into the subgrade and
            hold it through every layer, checking with the string line as you rake.
          </p>
        </Section>

        <Section title="Compaction, layer by layer">
          <WarningBlock title="Never compact three layers in one pass">
            A plate compactor densifies only the top 3–4 inches of loose material. If
            the stone goes down as one 9 in lift, the bottom two-thirds stay loose
            forever — the drive feels firm for a few weeks, then ruts from the inside
            out under the first heavy rain. Place, rake, crown and compact each layer
            with 4–6 overlapping passes before the next delivery is spread. Same
            tonnage, completely different driveway.
          </WarningBlock>
          <p className="text-muted-foreground">
            Compact from the edges toward the center so stone migrates uphill into the
            crown rather than off the shoulders. Crusher run compacts best slightly
            damp — if the surface layer is dust-dry, mist it with a hose before the
            final passes and the fines will bind into a crust.
          </p>
        </Section>

        <Section title="Tools and equipment">
          <CoverageTable
            headers={["Tool / machine", "Job", "Typical rental"]}
            rows={[
              {
                label: "Skid steer or compact tractor",
                spec: "Excavation, moving and spreading stone",
                coverage: "$250–400 / day",
                note: "A box blade attachment makes grading far easier",
              },
              {
                label: "Plate compactor (heavier is better)",
                spec: "Compacting each layer",
                coverage: "$90–160 / day",
              },
              {
                label: "Landscape rake (wide aluminum)",
                spec: "Leveling and crowning each lift",
                coverage: "$30–50 to buy",
              },
              {
                label: "String lines + line level",
                spec: "Checking crown and grade",
                coverage: "$20 to buy",
              },
              {
                label: "Woven geotextile fabric",
                spec: "Soil/stone separation on soft ground",
                coverage: "$0.30–0.50 / ft²",
              },
              {
                label: "Steel or timber edging",
                spec: "Containing the surface course",
                coverage: "$2–6 / linear ft",
              },
            ]}
            caption="The full DIY kit rents for roughly $350–550 a weekend — a small line in a budget that stone dominates."
          />
        </Section>

        <Section title="The finish checks">
          <SuccessBlock title="Three checks before you call it done">
            <p>
              Walk the drive after the final compaction pass and verify: the string
              line still shows 2–3% of crown at three stations along the length; a slow
              hose stream placed on the centerline runs to the edge and off — not down
              the drive; and a hard heel twist anywhere on the surface leaves a scuff,
              not a hole. Pass all three and the drive is ready for its first car.
            </p>
          </SuccessBlock>
          <p className="text-muted-foreground">
            Then put the maintenance dates in a calendar — a light regrade after the
            first winter locks in the profile while the stone is still fresh, ahead of
            the pothole repairs and annual top-up the surface will need over time.
          </p>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Installation questions" />

        <Cta
          variant={ctaVariant}
          title="Calculate stone for every layer before you dig"
          href={GRAVEL.driveway}
          buttonLabel="Driveway Gravel Calculator"
        />

        <RelatedArticles
          title="Before and after the build"
          variant={relatedStyle}
          items={pickLinks(
            drivewayGuideLinks,
            GRAVEL.drivewayLayers,
            GRAVEL.drivewayCost,
            GRAVEL.drivewayMaintenance,
          )}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.fhwaGravel, GREFS.aashtoM43]} />
      </ArticleShell>
    </>
  );
}
