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
  stoneGuideLinks,
  referenceLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "crushed-stone-sizes";
const title = "Crushed Stone Sizes — #1 to #10 and Crusher Run, Decoded";
const description =
  "Every standard crushed stone size explained: #1, #2, #3, #5, #57, #8, #10 screenings and crusher run — nominal inch ranges, what each is for, and the ASTM D448 system behind the numbers.";
const path = GRAVEL.stoneSizes;
const author = getAuthor("materials-team");

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
  publishedTime: "2026-07-16",
});

const faqItems: FaqItem[] = [
  {
    question: "What do crushed stone size numbers mean?",
    answer:
      "They are gradation classes from ASTM D448 (mirrored by AASHTO M 43): each number defines which sieves the stone must pass and be retained on. Counterintuitively, smaller numbers mean bigger stone — #1 runs 2 to 4 inches while #10 is screenings that pass a 3/8 inch sieve. Two-digit numbers like #57 are blends spanning two single-size classes.",
  },
  {
    question: "What size is #57 crushed stone?",
    answer:
      "#57 is a blend graded from about 3/4 to 1 inch — it passes a 1 inch sieve, with allowance up to 1 1/2 inches, and is retained above the #4 sieve. It is the most-stocked size in North America because it drains freely, handles easily, and works for French drains, concrete aggregate, driveway top layers and pipe backfill alike.",
  },
  {
    question: "What is crusher run?",
    answer:
      "Crusher run (also called dense-graded aggregate, road base, ABC or #411-type blends depending on region) is crushed stone with the fines left in — everything from dust up to a 3/4 or 1 1/2 inch top size. It is not a single ASTM D448 number. The fines let it compact into a near-solid layer, which is exactly what a base course needs and exactly what a drainage layer must avoid.",
  },
  {
    question: "What is #10 crushed stone?",
    answer:
      "#10 is screenings or stone dust — the fine fraction passing the 3/8 inch sieve, down to dust. It compacts hard and screeds flat, which makes it the standard leveling bed under pavers and a good topping for hard-packed paths. It does not drain; never use it where water must pass.",
  },
  {
    question: "Which crushed stone size is best for a driveway?",
    answer:
      "Two sizes, in layers: crusher run for the compacted base (4 inches per lift), and either more crusher run or #57 as the surface. Large open stone like #2 or #3 works as a first lift over soft subgrade. A driveway made only of clean large stone never locks together; one made only of screenings turns to mud.",
  },
  {
    question: "Are crushed stone sizes the same at every quarry?",
    answer:
      "The number system is standardized but regional names are not — one yard's crusher run is another's ABC, road bond or dense-graded base. When it matters, skip the nickname and confirm the gradation: ask whether the product meets ASTM D448 or AASHTO M 43 for the size number you need, and request the sieve-analysis sheet for base or concrete work.",
  },
];

const toc = tocFromTitles(
  "The size chart",
  "How the numbering system works",
  "The workhorse sizes",
  "Crusher run and screenings",
  "Matching a size to the job",
);

export default function CrushedStoneSizesPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
          datePublished: "2026-07-16",
          author,
        })}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        aside={
          <Cta
            variant={ctaVariant}
            title="Size picked — get the tonnage"
            description="The crushed stone calculator carries densities for every size on this page, loose and compacted."
            href={GRAVEL.crushed}
            buttonLabel="Crushed Stone Calculator"
          />
        }
        hero={
          <>
            <Hero
              eyebrow="Gravel · Crushed Stone"
              variant={heroVariant}
              title="Crushed stone sizes, decoded"
              description="#1, #57, #8, #10 — the numbers are a sieve-based code from ASTM D448, and once you can read it, every quarry price list makes sense. Smaller number, bigger stone."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Crushed Stone Sizes", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="The size chart">
          <CoverageTable
            headers={["Size number", "Nominal range", "Primary uses"]}
            rows={[
              { label: "#1", spec: "2–4 in", coverage: "Culvert armor, fill over very soft ground, erosion aprons", note: "The largest standard class — machine-placed only" },
              { label: "#2", spec: "1 1/2 – 2 1/2 in", coverage: "Construction entrances, first lift over mud, heavy-truck base", note: "Bridges soft subgrade where smaller stone would sink" },
              { label: "#3", spec: "1–2 in", coverage: "Railroad ballast, dry wells, drainage beds under slabs" },
              { label: "#5", spec: "3/8 – 1 1/2 in", coverage: "Road base blends, paver sub-base", note: "Often specified in DOT base courses" },
              { label: "#57", spec: "3/4 – 1 in blend", coverage: "French drains, concrete aggregate, driveway surface, pipe backfill", note: "The all-purpose size — most-stocked class in North America" },
              { label: "#8", spec: "3/8 – 1/2 in", coverage: "Pipe bedding, asphalt mixes, walkway topping", note: "Angular counterpart to pea gravel" },
              { label: "#10", spec: "Dust – 3/8 in", coverage: "Paver leveling beds, path topping, joint filler", note: "Screenings / stone dust — compacts hard, does not drain" },
              { label: "Crusher run", spec: "Dust – 3/4 or 1 1/2 in", coverage: "Compacted base for driveways, roads, sheds and patios", note: "Dense-graded blend with fines — not an ASTM number" },
            ]}
            caption="Nominal ranges per ASTM D448 / AASHTO M 43 size classes. Regional names vary; the numbers do not."
          />
        </Section>

        <Section title="How the numbering system works">
          <p className="text-muted-foreground">
            ASTM D448 defines each size class by a pair of sieves: nearly all of the stone
            must pass the upper sieve and be retained on the lower one. The classes were
            numbered from coarse to fine, which is why the scale runs backwards — #1 is the
            biggest stone and #10 is dust. Two-digit designations are blends: #57 spans the
            #5 and #7 classes, #67 spans #6 and #7, and so on. AASHTO M 43 adopts the same
            gradations for road and bridge work, so a DOT spec and a quarry ticket are
            speaking the same language.
          </p>
          <InfoBlock title="Clean stone vs dense-graded">
            <p>
              Every numbered class is &quot;clean&quot; — screened to a narrow band with the
              fines washed or sieved out, so it drains but never locks fully solid.
              Dense-graded products like crusher run deliberately keep the fines so the mix
              compacts tight. That single distinction — clean or dense-graded — decides
              whether a product belongs in a drain or under a driveway.
            </p>
          </InfoBlock>
        </Section>

        <Section title="The workhorse sizes">
          <p className="text-muted-foreground">
            Three products cover the vast majority of residential orders. <strong>#57</strong>{" "}
            is the default clean stone: big enough to leave drainage voids, small enough to
            shovel, rake and walk on. It is the specified aggregate in most ready-mix
            concrete and the standard fill around French-drain pipe.{" "}
            <strong>#8</strong> is the fine clean stone — the angular cousin of pea gravel —
            used where a smaller, tighter surface matters: pipe bedding, asphalt mixes and
            walkways that feel better underfoot. <strong>Crusher run</strong> is the base
            material: it does nothing decorative and everything structural. If a project has
            layers, crusher run is almost always the bottom one. See{" "}
            <a href={GRAVEL.stoneUses} className="font-medium text-primary hover:underline">
              crushed stone best uses
            </a>{" "}
            for the full size-to-job matrix.
          </p>
        </Section>

        <Section title="Crusher run and screenings">
          <p className="text-muted-foreground">
            The two fines-heavy products confuse buyers most. Crusher run is a full gradation
            — dust through 3/4 inch or larger — that compacts to about 140 lb/ft³ and behaves
            almost like weak concrete once rolled. Screenings (#10 / stone dust) are only the
            fine fraction: they screed dead flat and pack hard, which is why paver installers
            level with them, but a thick layer holds water and pumps into mud under load.
            Rule of thumb: crusher run in structural lifts, screenings in a thin finishing
            bed, never the reverse.
          </p>
          <TipBlock title="Ordering by phone">
            Name the job, not just the size. &quot;Four inches of compacted base for a
            driveway&quot; gets you the right local product even where crusher run goes by
            ABC, road bond, DGA or 21A. Sizes and densities for the order math are in the{" "}
            <a href={GRAVEL.stoneWeight} className="font-medium text-primary hover:underline">
              crushed stone weight guide
            </a>
            .
          </TipBlock>
        </Section>

        <Section title="Matching a size to the job">
          <p className="text-muted-foreground">
            Choosing comes down to two questions. Does water need to pass? Then use clean
            stone — #57 for most drains, #3 for high-flow beds and dry wells, #8 around small
            pipe. Does the layer need to carry load? Then use dense-graded — crusher run in 4
            inch compacted lifts, with #2 or #3 beneath it if the subgrade is soft. Decorative
            surfaces sit in between: #8 and #57 both walk well, while anything larger is
            strictly for machines and ballast. When two sizes both work, buy the one your
            nearest quarry stocks deepest — it will be cheaper per ton and easier to match on
            a top-up later.
          </p>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Size questions" />

        <RelatedArticles
          title="Keep reading"
          variant={relatedStyle}
          items={[
            ...pickLinks(stoneGuideLinks, GRAVEL.stoneWeight, GRAVEL.stoneUses, GRAVEL.stoneVsGravel),
            ...pickLinks(referenceLinks, GRAVEL.refSizes),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-16" />

        <References items={[GREFS.astmD448, GREFS.aashtoM43, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
