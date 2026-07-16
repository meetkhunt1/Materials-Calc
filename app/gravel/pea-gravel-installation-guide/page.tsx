import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { TipBlock, WarningBlock } from "@/components/blocks/callout";
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
import { GRAVEL, peaGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "pea-gravel-installation-guide";
const title = "Pea Gravel Installation Guide — Base, Edging, Depth, Screeding";
const description =
  "How to install pea gravel that stays put: excavation depth, when a compacted base is required, landscape fabric, why edging is non-negotiable for round stone, screeding flat, the tool list and the mistakes that ruin the job.";
const path = GRAVEL.peaInstall;
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
    name: "Mark and excavate",
    text: "Outline the area with paint or a hose, then dig out 4–5 inches for walked surfaces (2 in base + 2–3 in gravel) or 3–4 inches for decorative beds. Slope the excavation slightly away from structures — about 1 inch per 8 feet.",
  },
  {
    name: "Compact the subgrade",
    text: "Tamp the exposed soil with a hand tamper or plate compactor until footprints no longer show. Soft spots found now cost minutes; found later they cost a rebuild.",
  },
  {
    name: "Lay landscape fabric",
    text: "Roll woven geotextile fabric over the subgrade with 6 inch overlaps at seams and edges pinned every 2–3 feet. It separates stone from soil, blocks weeds from below, and stops the gravel from sinking into the ground over time.",
  },
  {
    name: "Place and compact the base (walked surfaces)",
    text: "Spread 2–3 inches of crusher run or stone dust, rake it to grade, wet it lightly and compact it until a plate compactor stops leaving marks. Skip the base only for purely decorative beds nobody walks on.",
  },
  {
    name: "Install edging",
    text: "Set steel, aluminum, paver or timber edging around the entire perimeter, anchored per the product and standing about 1 inch above the finished gravel level. Round stone rolls — a continuous border is the only thing that keeps it inside the lines.",
  },
  {
    name: "Spread the pea gravel",
    text: "Dump or barrow the stone in piles inside the edging, then rake to an even 2 inches for paths, 2–3 inches for patios. Deeper than 3 inches makes a walked surface soft and tiring.",
  },
  {
    name: "Screed flat and settle",
    text: "Pull a straight 2×4 across the surface riding on the edging (or on temporary screed pipes) to strike it flat, mist with a hose to settle dust and fines, then walk it and touch up low spots.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Do I really need a base under pea gravel?",
    answer:
      "For any surface people walk on, yes — 2–3 inches of compacted crusher run or stone dust. Pea gravel placed straight on soil squishes into it within a season and the surface goes soft and muddy. For purely decorative beds nobody walks on, fabric alone over compacted soil is acceptable.",
  },
  {
    question: "Should landscape fabric go under pea gravel?",
    answer:
      "Almost always. Woven geotextile stops stone from migrating down into the soil, blocks weeds rooted below, and keeps the base and gravel layers separate. The exception some installers make is directly under high-traffic path surfaces where fabric can eventually work loose — there, a well-compacted stone-dust base does the separation instead.",
  },
  {
    question: "How deep should I excavate for a pea gravel patio?",
    answer:
      "Figure the layers backwards from finished grade: 2–3 in of pea gravel plus 2–3 in of compacted base means digging out 4–6 inches. Set the finished gravel about an inch below adjacent lawn or paving so stone does not wash over the border.",
  },
  {
    question: "What edging works best for pea gravel?",
    answer:
      "Steel or aluminum for clean lines and durability, concrete or brick soldier courses where you want a mowing strip, pressure-treated timber on a budget. Whatever the material, it must be continuous, anchored, and stand roughly 1 inch above the finished gravel. Gaps in the edging become gravel exits within weeks.",
  },
  {
    question: "Can I install pea gravel myself in a weekend?",
    answer:
      "Comfortably, for anything up to a few hundred square feet. Budget roughly 90 minutes per 100 ft² once materials are on site: excavation is the slow part, spreading and screeding the fast part. The heavy lifting is real — a 200 ft² patio moves about 2.5 tons of material — so recruit a second wheelbarrow.",
  },
  {
    question: "How do I keep the finished surface flat?",
    answer:
      "Screed it like concrete: pull a straight board across the surface riding on the edging or on temporary guide pipes set to finished height. Rake alone leaves waves you will feel underfoot. After screeding, a light hose-down settles the stone; re-screed high spots and the surface stays furniture-flat.",
  },
];

const toc = tocFromTitles(
  "Decide the profile first",
  "Tools and materials",
  "Step-by-step installation",
  "Edging: the step that decides everything",
  "Common mistakes",
);

export default function PeaGravelInstallationGuidePage() {
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
            name: "How to Install Pea Gravel",
            description:
              "Excavate, compact, lay fabric, build a base, set edging, spread and screed pea gravel for a surface that stays flat and stays put.",
            path,
            totalTime: "PT4H",
            steps: installSteps,
          }),
        ]}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Pea Gravel"
              variant={heroVariant}
              title="Pea gravel installation guide"
              description="Pea gravel is the easiest hardscape a homeowner can build — and the easiest to build wrong. The stone is round, so the whole method comes down to what you put under it and around it."
              stats={[
                { value: "2–3 in", label: "gravel depth, walked surfaces" },
                { value: "2–3 in", label: "compacted base beneath" },
                { value: "1 in", label: "edging above finished grade" },
                { value: "~90 min", label: "install time per 100 ft²" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Pea Gravel Installation Guide", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Decide the profile first">
          <p className="text-muted-foreground">
            Every pea gravel install is a sandwich, and the recipe depends on whether feet
            will use it. Walked surfaces — paths, patios, seating areas — get the full
            stack: compacted subgrade, woven landscape fabric, 2–3 inches of compacted
            crusher run or stone dust, then 2 inches of pea gravel (up to 3 on patios).
            Decorative beds nobody walks on can skip the base: compacted soil, fabric, and
            2–3 inches of stone. The one profile that fails everywhere is pea gravel
            straight on dirt — the stones press into the soil within a season and the
            &quot;2 inch path&quot; becomes a muddy scatter. Coverage math for each depth
            is in the{" "}
            <a href={GRAVEL.peaCoverage} className="font-medium text-primary hover:underline">
              coverage guide
            </a>
            ; quantities come from the calculator below.
          </p>
        </Section>

        <Section title="Tools and materials">
          <CoverageTable
            headers={["Item", "Job", "Notes"]}
            rows={[
              { label: "Spade + mattock", spec: "Excavation", coverage: "Rent a sod cutter for lawn areas over ~100 ft²" },
              { label: "Hand tamper or plate compactor", spec: "Subgrade and base compaction", coverage: "Plate compactor rental ≈ $60–90/day; worth it past 50 ft²" },
              { label: "Woven geotextile fabric", spec: "Soil/stone separation, weed block", coverage: "Woven, not spun-bonded; 6 in seam overlaps", note: "$0.15–0.40/ft²" },
              { label: "Crusher run or stone dust", spec: "Base layer, walked surfaces", coverage: "2–3 in compacted — see the coverage guide for tonnage" },
              { label: "Edging + stakes", spec: "Containment", coverage: "Steel, aluminum, paver or timber — continuous, no gaps" },
              { label: "Straight 2×4 + rake", spec: "Screeding flat", coverage: "The 2×4 rides the edging; the rake does rough grading" },
              { label: "Wheelbarrow + gloves", spec: "Moving stone", coverage: "A ton is ~15 heaped barrow loads — plan your route" },
            ]}
            caption="The complete kit. Nothing here is specialty — the plate compactor is the only rental most installs need."
          />
        </Section>

        <Section title="Step-by-step installation">
          <ol className="list-decimal space-y-4 pl-5 text-muted-foreground">
            {installSteps.map((step) => (
              <li key={step.name} className="leading-relaxed">
                <strong className="text-foreground">{step.name}.</strong> {step.text}
              </li>
            ))}
          </ol>
          <TipBlock title="Order the base and the pea gravel together">
            One delivery fee instead of two, and the truck drops each pile where you point.
            Have the driver place the base stone nearest the work and the pea gravel behind
            it — you will use the base first.
          </TipBlock>
        </Section>

        <Section title="Edging: the step that decides everything">
          <p className="text-muted-foreground">
            Angular crushed stone locks itself together; pea gravel does not. Every stone
            is a smooth ball, so the material behaves like a very slow liquid — it flows
            toward any open edge under foot traffic, rain and gravity. That makes edging
            structural on a pea gravel job, not decorative. It must be continuous around
            the entire perimeter (a one-foot gap becomes the drain the whole surface
            empties through), anchored so it cannot lean, and set about 1 inch above the
            finished gravel so stones cannot hop over. Steel and aluminum give the
            cleanest lines and the longest life; a paver or brick soldier course doubles
            as a mowing strip; timber works on a budget if you accept its lifespan. Budget
            edging into the project from the start — it is typically 20–30% of the total
            cost and 100% of the reason the job still looks sharp in year five.
          </p>
        </Section>

        <Section title="Common mistakes">
          <WarningBlock title="The five ways pea gravel installs fail">
            <p>
              <strong>No base under a walked surface.</strong> Stone on soil equals mud in
              a season. 2–3 in of compacted crusher run is not optional under paths and patios.
            </p>
            <p>
              <strong>Too deep.</strong> Four-plus inches of round stone on a path walks
              like dry sand. Cap walked surfaces at 2–3 in and spend the surplus on base.
            </p>
            <p>
              <strong>Edging gaps — or edging later.</strong> &quot;We&apos;ll add the
              border next month&quot; means re-buying a third of the stone from the lawn.
            </p>
            <p>
              <strong>Skipping compaction between layers.</strong> A base raked flat but
              never compacted settles unevenly and telegraphs every dip to the surface.
            </p>
            <p>
              <strong>Guessing quantities.</strong> Under-ordering a half ton costs a
              second delivery fee that can exceed the stone&apos;s price. Calculate, add
              10%, round up.
            </p>
          </WarningBlock>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Installation questions" />

        <Cta
          variant={ctaVariant}
          title="Get base and gravel tonnage in one pass"
          description="Enter the area once — the pea gravel calculator returns stone for every layer, with waste included."
          href={GRAVEL.pea}
          buttonLabel="Pea Gravel Calculator"
        />

        <RelatedArticles
          title="Before and after the install"
          variant={relatedStyle}
          items={pickLinks(peaGuideLinks, GRAVEL.peaCoverage, GRAVEL.peaCost, GRAVEL.peaFaq)}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.nssga, GREFS.fhwaGravel]} />
      </ArticleShell>
    </>
  );
}
