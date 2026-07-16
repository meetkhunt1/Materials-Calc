import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
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
  allGravelGuides,
  referenceLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { CoverageRow, FaqItem } from "@/types";

const slug = "gravel-size-chart";
const title = "Gravel Size Chart — Every Standard Aggregate Size Number";
const description =
  "All standard aggregate sizes in one chart: #1, #2, #3, #357, #5, #57, #67, #8, #89 and #10, plus crusher run, pea gravel and river rock — dimension ranges and typical uses, per ASTM D448 / AASHTO M 43.";
const path = GRAVEL.refSizes;
const datePublished = "2026-07-16";
const author = getAuthor("materials-team");

const heroVariant = pick(slug, HERO_VARIANTS);
const tocPosition = pick(slug, ["toc-right", "toc-left"] as const);
const faqVariant = pick(slug, ["accordion", "list"] as const);
const relatedVariant = pick(slug, RELATED_STYLES);

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: datePublished,
});

const sizeRows: CoverageRow[] = [
  {
    label: "#1",
    spec: "1.5–3.5 in (37.5–90 mm)",
    coverage: "Culvert bedding, stabilizing very soft ground, erosion control",
    note: "Too large to shovel or rake — machine-placed",
  },
  {
    label: "#2",
    spec: "1.5–2.5 in (37.5–63 mm)",
    coverage: "Railroad ballast, construction entrances, mud control",
  },
  {
    label: "#3",
    spec: "1–2 in (25–50 mm)",
    coverage: "Drainage beds, dry wells, first lift of a driveway base",
  },
  {
    label: "#357",
    spec: "2 in–No. 4 (50–4.75 mm)",
    coverage: "Thick base lifts, pipe backfill, subgrade stabilization",
    note: "Graded blend spanning sizes #3 through #7",
  },
  {
    label: "#5",
    spec: "1/2–1 in (12.5–25 mm)",
    coverage: "Road base topping, filter stone around structures",
  },
  {
    label: "#57",
    spec: "1 in–No. 4 (25–4.75 mm)",
    coverage: "Concrete aggregate, driveway topping, French drains, pipe bedding",
    note: "The most-ordered size in North America",
  },
  {
    label: "#67",
    spec: "3/4 in–No. 4 (19–4.75 mm)",
    coverage: "Concrete mixes, pipe bedding, slightly tighter finish than #57",
  },
  {
    label: "#8",
    spec: "3/8 in–No. 8 (9.5–2.36 mm)",
    coverage: "Chip seal, asphalt mixes, walkway topping over a base",
  },
  {
    label: "#89",
    spec: "3/8 in–No. 16 (9.5–1.18 mm)",
    coverage: "Paver joint filling, permeable paving reservoirs, decorative topping",
  },
  {
    label: "#10",
    spec: "No. 4 to dust (< 4.75 mm)",
    coverage: "Screenings: paver leveling beds, path binder, fill under slabs",
    note: "Also sold as stone dust or manufactured sand",
  },
  {
    label: "Crusher run",
    spec: '3/4 or 1.5 in "minus" — stone down to dust',
    coverage: "Compactable base for driveways, patios and sheds",
    note: "Regional names: CR-6, 21A/21B, DGA, road base",
  },
  {
    label: "Pea gravel",
    spec: "1/4–5/8 in (6–16 mm), rounded",
    coverage: "Walkways, playgrounds, dog runs, mulch alternative",
    note: "A commercial name, not an ASTM size number",
  },
  {
    label: "River rock",
    spec: "1–3 in (25–75 mm), rounded",
    coverage: "Dry creek beds, borders, decorative ground cover",
    note: "Screened natural stone; larger cobbles also sold",
  },
];

const jobRows: CoverageRow[] = [
  {
    label: "French drain",
    spec: "#57, washed",
    coverage: "Open voids move water; no fines to clog the fabric",
  },
  {
    label: "Driveway base",
    spec: "Crusher run (or #3 first lift)",
    coverage: "Fines lock under compaction into a near-solid layer",
  },
  {
    label: "Driveway surface",
    spec: "#57",
    coverage: "Big enough to stay put, small enough to drive on",
  },
  {
    label: "Paver joints & bedding",
    spec: "#89 joints, #10 bedding",
    coverage: "Fine chip sweeps into joints; screenings screed flat",
  },
  {
    label: "Walkway or patio surface",
    spec: "Pea gravel or #8",
    coverage: "Comfortable underfoot; contain with edging",
  },
  {
    label: "Muddy site entrance",
    spec: "#2 or #3",
    coverage: "Large stone bridges soft ground and sheds mud",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What size is #57 gravel?",
    answer:
      "#57 stone is graded from 1 inch down to the No. 4 sieve (25 to 4.75 mm) — most particles are about 3/4 inch. It is the default order for concrete aggregate, driveway topping and French drains, and if a supplier just says 'gravel', #57 is usually what arrives.",
  },
  {
    question: "Do smaller size numbers mean smaller stone?",
    answer:
      "The opposite: under ASTM D448 the numbering runs from #1 (up to 3.5 inches) down to #10 (screenings passing 4.75 mm). Multi-digit designations like #57, #67, #89 and #357 are graded blends spanning the sizes their digits reference — #57 covers the #5-to-#7 range.",
  },
  {
    question: "What is the best gravel size for a driveway?",
    answer:
      "Use two sizes: a compacted crusher-run base (its fines lock into a near-solid layer), topped with 2–3 inches of #57 for the running surface. Skipping the base and laying #57 straight on soil is the classic mistake — clean stone migrates and ruts without a locked base under it.",
  },
  {
    question: "Are ASTM D448 and AASHTO M 43 sizes the same?",
    answer:
      "Effectively yes — the two standards use the same size numbers and gradation bands. ASTM D448 is the general classification; AASHTO M 43 adopts it for road and bridge work, which is why a DOT spec and a landscape yard both understand '#57' identically.",
  },
  {
    question: "Is pea gravel an official ASTM size?",
    answer:
      "No. Pea gravel is a commercial name for rounded natural stone screened to roughly 1/4–5/8 inch. Its nearest ASTM cousin by particle size is #8, but #8 is crushed and angular — the two behave very differently underfoot and are not interchangeable in drainage or paving specs.",
  },
  {
    question: "What size gravel drains best?",
    answer:
      "Clean, washed single-size stone in the #57 range drains best for most work: its voids stay open because there are no fines to plug them. Go larger (#3) for dry wells and high-flow beds. Never use crusher run or screenings where drainage matters — the fines seal the layer.",
  },
];

const toc = tocFromTitles(
  "The gravel size chart",
  "How to read aggregate size numbers",
  "Matching size to the job",
);

export default function GravelSizeChartPage() {
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
              eyebrow="Gravel · Reference Chart"
              variant={heroVariant}
              title="Gravel size chart"
              description="Every standard aggregate size number — #1 through #10, the graded blends, crusher run, pea gravel and river rock — with dimension ranges and the jobs each size is made for, per ASTM D448 and AASHTO M 43."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Size Chart", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section
          title="The gravel size chart"
          lead="Size numbers per ASTM D448 / AASHTO M 43. Each range runs from the sieve nearly all particles pass down to the sieve nearly all are retained on."
        >
          <CoverageTable
            headers={["Size / name", "Particle range", "Typical uses"]}
            rows={sizeRows}
            caption="Standard aggregate sizes with nominal particle ranges. Sieve designations: No. 4 = 4.75 mm, No. 8 = 2.36 mm, No. 16 = 1.18 mm."
          />
          <p className="text-muted-foreground">
            Weights for these sizes live in the{" "}
            <a href={GRAVEL.refDensity} className="font-medium text-primary hover:underline">
              density database
            </a>
            , and the crushed-stone cluster has a{" "}
            <a href={GRAVEL.stoneSizes} className="font-medium text-primary hover:underline">
              deeper guide to each size
            </a>{" "}
            if you want more than one line per number.
          </p>
        </Section>

        <Section title="How to read aggregate size numbers">
          <p className="text-muted-foreground">
            The system dates to early highway specifications and reads backwards from
            intuition: <strong>the smaller the number, the larger the stone</strong>. #1 is
            fist-sized rock; #10 is dust. Single-digit numbers are close to one particle
            size; multi-digit designations are graded blends named by the sizes they span —
            #57 covers the #5-to-#7 band, #89 the #8-to-#9 band, and #357 runs all the way
            from #3 down to #7.
          </p>
          <InfoBlock title="Blends compact, clean sizes drain">
            The blend-versus-single-size distinction matters more than the exact dimensions.
            Graded blends and anything with fines (crusher run, #10) pack tight and make
            structural layers. Clean single-size stone (#57, #8) keeps open voids and makes
            drainage layers. Pick the family first, then the size.
          </InfoBlock>
        </Section>

        <Section
          title="Matching size to the job"
          lead="Six decisions that cover most residential orders."
        >
          <CoverageTable
            headers={["Job", "Best size", "Why it works"]}
            rows={jobRows}
          />
          <TipBlock title="Order the boring name">
            Quarries speak size numbers, not marketing names. Asking for &quot;#57
            limestone&quot; or &quot;3/4-minus crusher run&quot; gets you an exact product and
            a comparable quote from every supplier; asking for &quot;driveway gravel&quot;
            gets you whatever each yard decides that means.
          </TipBlock>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Size chart questions" />

        <Cta
          variant="banner"
          title="Sized the stone? Now size the order"
          description="Enter your dimensions and gravel type — the calculator returns cubic yards and tons."
          href={GRAVEL.calculator}
          buttonLabel="Open the Gravel Calculator"
        />

        <RelatedArticles
          title="Related references & guides"
          variant={relatedVariant}
          items={[
            ...pickLinks(referenceLinks, GRAVEL.refDensity, GRAVEL.refWeight),
            ...pickLinks(allGravelGuides, GRAVEL.stoneSizes, GRAVEL.peaSizes),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.astmD448, GREFS.aashtoM43, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
