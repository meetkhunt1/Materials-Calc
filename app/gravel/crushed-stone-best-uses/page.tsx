import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { SuccessBlock, WarningBlock, TipBlock } from "@/components/blocks/callout";
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
  drivewayGuideLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "crushed-stone-best-uses";
const title = "Crushed Stone Best Uses — Matching Size to Job";
const description =
  "Which crushed stone size for which job: #57 for French drains, crusher run for driveway bases, #8 for pipe bedding, #10 for paver beds, #3 for railroad ballast — with depths and the reasoning behind each match.";
const path = GRAVEL.stoneUses;
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
    question: "What is the most versatile crushed stone size?",
    answer:
      "#57 — the 3/4 to 1 inch clean blend. It drains, it handles, it walks, it locks reasonably well, and it is the specified aggregate in most ready-mix concrete. If a yard could stock only one clean size, it would be #57, and most price lists confirm it: #57 is always there, always first.",
  },
  {
    question: "Can one size do the whole driveway?",
    answer:
      "Crusher run can, in a pinch — base and surface both — because it compacts at every depth. What fails is the reverse shortcut: an all-#57 driveway never locks together and migrates under tires. The proper build is still layered: large stone over soft ground, crusher run structure, then the surface course.",
  },
  {
    question: "What stone goes under a concrete slab?",
    answer:
      "A 4 inch layer of compactable base (crusher run or dense-graded aggregate) where the ground needs building up, or clean #57 where the slab needs a capillary break and drainage layer. Many specs use both: dense base for grade, 2 inches of clean stone on top. Never pour on soft or organic soil.",
  },
  {
    question: "Which size is best around a foundation for drainage?",
    answer:
      "Clean #57 wrapped in filter fabric against the footing drain. It is large enough to keep voids open under backfill pressure, small enough to bed the pipe evenly. #8 works close around small-diameter pipe; crusher run and screenings are disqualified — their fines seal the very voids the drain depends on.",
  },
  {
    question: "What crushed stone for a muddy construction entrance?",
    answer:
      "#2 or #3 — stone big enough not to disappear into the mud. A 6 inch lift of 2 inch stone over geotextile bridges soft ground and cleans tires. Smaller stone vanishes into the muck within a week; this is the one residential job where the big classes earn their keep.",
  },
  {
    question: "How deep should each application be?",
    answer:
      "Rules of thumb: French drains need 3 inches of stone around the pipe on all sides; driveway bases 4 inches per compacted lift (8–12 inches total on new builds); pipe bedding 4–6 inches; walkway surfaces 2–3 inches; paver leveling beds 1 inch of screenings over a 4–6 inch base. When in doubt, deeper base and thinner topping beats the reverse.",
  },
];

const toc = tocFromTitles(
  "Match the size to the job",
  "French drains and drainage: #57",
  "Driveway and shed bases: crusher run",
  "Concrete aggregate: #57 and #8",
  "Pipe bedding and paver beds: #8 and #10",
  "Ballast and heavy stone: #2 and #3",
);

export default function CrushedStoneBestUsesPage() {
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
        hero={
          <>
            <Hero
              eyebrow="Gravel · Crushed Stone"
              variant={heroVariant}
              title="Crushed stone best uses"
              description="Every size number exists because some job demanded it. Match the stone to the work — drainage wants clean and open, structure wants fines and compaction, bedding wants small and uniform — and the material does the rest."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Crushed Stone Best Uses", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Match the size to the job">
          <CoverageTable
            headers={["Job", "Best size", "Typical depth"]}
            rows={[
              { label: "French drain", spec: "#57 clean", coverage: "3 in around the pipe, all sides", note: "Wrap the trench in filter fabric" },
              { label: "Driveway / shed base", spec: "Crusher run", coverage: "4 in per compacted lift" },
              { label: "Concrete aggregate", spec: "Washed #57 or #8", coverage: "Per mix design" },
              { label: "Pipe bedding", spec: "#8", coverage: "4–6 in under and beside pipe" },
              { label: "Paver leveling bed", spec: "#10 screenings", coverage: "1 in over compacted base" },
              { label: "Walkway surface", spec: "#8 or screenings", coverage: "2–3 in over base" },
              { label: "Railroad ballast", spec: "#3", coverage: "12 in+ under ties" },
              { label: "Construction entrance", spec: "#2 or #3", coverage: "6 in over geotextile" },
              { label: "Dry well / infiltration bed", spec: "#3 or #57", coverage: "Per storage volume" },
            ]}
            caption="The size-to-job matrix. Size ranges behind each number are decoded in the crushed stone sizes guide."
          />
        </Section>

        <Section title="French drains and drainage: #57">
          <p className="text-muted-foreground">
            Drainage stone has one requirement: voids that stay open for decades. Clean #57
            is the industry answer — its 3/4 to 1 inch particles leave generous channels for
            water while sitting heavily enough not to migrate off the pipe under backfill.
            The build: filter fabric lining the trench, 3 inches of #57 below the perforated
            pipe, 3 inches beside and above it, fabric folded over the top before backfill.
            The fabric keeps soil fines out of the voids; the stone keeps the water moving.
          </p>
          <WarningBlock title="No fines, ever">
            One skid-steer bucket of crusher run in a French drain undoes the whole trench —
            the fines wash into the voids and seal them within a season. Drainage stone must
            be washed or screened clean. If dust coats your hand when you grab a fistful,
            it belongs under a driveway, not around a pipe.
          </WarningBlock>
        </Section>

        <Section title="Driveway and shed bases: crusher run">
          <p className="text-muted-foreground">
            Bases have the opposite requirement: no voids at all. Crusher run — stone plus
            fines, dust through 3/4 or 1 1/2 inch — compacts to about 140 lb/ft³, spreading
            wheel loads so the subgrade never feels a point load. Place it in 4 inch lifts,
            compacting each with a plate compactor or roller before the next; a new driveway
            wants 8–12 inches total, a garden shed 4–6. Over soft or wet subgrade, start
            with a lift of #2/#3 to bridge the mud, then build crusher run on top. The full
            layer system is covered in the{" "}
            <a href={GRAVEL.drivewayLayers} className="font-medium text-primary hover:underline">
              driveway base layers guide
            </a>
            .
          </p>
          <Cta
            variant={ctaVariant}
            title="Size a base layer in tons"
            href={GRAVEL.crushed}
            buttonLabel="Crushed Stone Calculator"
          />
        </Section>

        <Section title="Concrete aggregate: #57 and #8">
          <p className="text-muted-foreground">
            Coarse aggregate is 60–75% of a concrete mix by volume, and angular crushed
            stone is the premium choice: fractured faces give cement paste more grip than
            rounded gravel, improving strength for the same cement content. Standard
            structural mixes call for washed #57; thin slabs, pumped mixes and tight rebar
            spacing drop to #8 so the stone passes between bars. Concrete-grade stone must
            meet ASTM C33 cleanliness limits — this is the one use where you should ask the
            quarry for certification, not just a size number.
          </p>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Use-case questions" />

        <Section title="Pipe bedding and paver beds: #8 and #10">
          <p className="text-muted-foreground">
            Small stone shines where something rigid needs uniform support. #8 cradles pipe
            without the point loads big stone would impose — 4–6 inches under and beside
            sewer, drain and conduit runs, compacted lightly so the pipe bears evenly along
            its length. #10 screenings do the same for pavers: a 1 inch screeded bed over a
            compacted crusher run base lets each paver seat perfectly flat. Keep the
            screenings layer thin — at an inch it is a leveling course; at four it is a
            water-holding sponge.
          </p>
          <TipBlock title="The bedding rule of thumb">
            Bedding stone should be no larger than about a tenth of the pipe diameter, and
            never dumped from height onto plastic pipe. For a 4 inch drain line, 3/8 inch #8
            is exactly right — which is why it is the default in nearly every utility spec.
          </TipBlock>
        </Section>

        <Section title="Ballast and heavy stone: #2 and #3">
          <p className="text-muted-foreground">
            The big classes solve big-load problems. Railroad ballast is the classic #3 job:
            a foot or more of 1–2 inch stone locks around the ties, drains instantly, and
            can be re-tamped for decades. Residentially, the same sizes bridge soft ground —
            construction entrances, first lifts over mud, culvert surrounds and erosion
            aprons at downspout outfalls. Their limitation is handling: nothing this size
            spreads by rake, walks comfortably, or sits still on a slope face smaller stone
            would grip.
          </p>
          <SuccessBlock title="The two-question test">
            Before ordering any size, ask: must water pass through it (clean stone), and
            must it carry load (dense-graded)? Every row in the table above is just an
            answer to those two questions — plus a particle size scaled to the pipe, paver
            or tire on top of it.
          </SuccessBlock>
        </Section>

        <RelatedArticles
          title="Next reads"
          variant={relatedStyle}
          items={[
            ...pickLinks(stoneGuideLinks, GRAVEL.stoneSizes, GRAVEL.stoneVsGravel, GRAVEL.stoneCoverage),
            ...pickLinks(drivewayGuideLinks, GRAVEL.drivewayLayers),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-16" />

        <References items={[GREFS.astmD448, GREFS.astmC33, GREFS.aashtoM43, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
