import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { BarChart } from "@/components/charts/bar-chart";
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
import { GRAVEL, drivewayGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "driveway-gravel-base-layers";
const title = "Driveway Gravel Base Layers — The Three-Layer System";
const description =
  "How a gravel driveway is really built: 4 in of #3 stone on the bottom, 3–4 in of #57 in the middle, 2–3 in of crusher run on top — plus geotextile fabric, why the sizes step down, and per-layer tonnage for a real drive.";
const path = GRAVEL.drivewayLayers;
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
    question: "What are the layers of a gravel driveway?",
    answer:
      "Bottom to top: 4 inches of #3 crushed stone (roughly 1–2 in rocks) as the load-bearing base, 3–4 inches of #57 stone (about 3/4 in) as the middle course, and 2–3 inches of crusher run — or a decorative stone like pea gravel — as the driving surface. On soft or clay soil, a woven geotextile fabric goes under everything.",
  },
  {
    question: "Why does a gravel driveway need three layers?",
    answer:
      "Each layer does a different job. The big #3 stones bridge soft spots and spread wheel loads into the subgrade; the mid-size #57 fills the voids above them and creates a stable, free-draining platform; and the fine crusher run surface locks tight under compaction so tires get a smooth, bound running course. One stone size cannot do all three jobs at once.",
  },
  {
    question: "Can I skip the base layers and just use crusher run?",
    answer:
      "On firm, well-drained soil a full-depth crusher run drive (6–8 in placed in compacted lifts) can work. On anything soft, wet or clay-rich, skipping the open-graded base layers means the fines in the crusher run mix with the soil, drainage stops, and the drive ruts within a season or two. The layer system exists for exactly those sites.",
  },
  {
    question: "Do the layers go in all at once?",
    answer:
      "No — each layer is spread and compacted separately before the next arrives, ideally as separate deliveries a day or more apart. A plate compactor or roller only densifies the top 3–4 inches of loose stone, so a single 10 in dump compacted from the top leaves a loose core that ruts from the inside out.",
  },
  {
    question: "Is geotextile fabric really necessary?",
    answer:
      "On clay, silt or any soil that smears when wet: yes. The fabric is a separator, not a weed barrier — it stops the #3 base from punching down into the soil and stops soil fines from pumping up into the stone. At $0.30–0.50 per square foot it is the cheapest insurance in the whole build; replacing stone swallowed by mud costs far more.",
  },
  {
    question: "How thick should each driveway layer be?",
    answer:
      "The working standard for a new residential drive: 4 in of #3 base, 3–4 in of #57 middle, and 2–3 in of crusher run surface — 9–11 inches total compacted. Under regular truck traffic, thicken the base course rather than the surface; depth at the bottom is what spreads heavy wheel loads.",
  },
];

const toc = tocFromTitles(
  "The three-layer system, bottom to top",
  "What each layer actually does",
  "Geotextile: the layer under the layers",
  "Per-layer tonnage: a 400 ft² drive",
  "Sequencing the build",
);

export default function DrivewayGravelBaseLayersPage() {
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
              eyebrow="Gravel · Driveways"
              variant={heroVariant}
              title="Driveway gravel base layers"
              description="A gravel driveway is a sandwich, not a pile. Big stone on the bottom, medium stone in the middle, fine stone on top — here is why the sizes step down and how many tons each course takes."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Driveway Base Layers", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="The three-layer system, bottom to top">
          <p className="text-muted-foreground">
            The layer system comes straight from gravel-road engineering: stone sizes
            step down from bottom to top so that each course fills and confines the one
            below it. Read the table from the bottom row up — that is the order the
            trucks arrive in.
          </p>
          <CoverageTable
            headers={["Layer", "Thickness", "Stone"]}
            rows={[
              {
                label: "Surface (top)",
                spec: "2–3 in",
                coverage: "Crusher run — or pea/decorative stone over fabric",
                note: "The running course tires actually touch",
              },
              {
                label: "Middle course",
                spec: "3–4 in",
                coverage: "#57 stone (≈3/4 in, angular)",
                note: "Free-draining structural fill",
              },
              {
                label: "Base (bottom)",
                spec: "4 in",
                coverage: "#3 crushed stone (≈1–2 in)",
                note: "Bridges soft ground, spreads wheel loads",
              },
              {
                label: "Geotextile fabric",
                spec: "—",
                coverage: "Woven separation fabric on the subgrade",
                note: "Required on clay or soft soil",
              },
            ]}
            caption="The standard three-layer residential build: 9–11 in total compacted depth. Each layer is compacted before the next goes down."
          />
          <p className="text-muted-foreground">
            Total depth by site condition — firm soil, clay, truck traffic — is covered
            in the{" "}
            <a href={GRAVEL.drivewayDepth} className="font-medium text-primary hover:underline">
              driveway gravel depth guide
            </a>
            ; this page is about what goes inside that depth.
          </p>
        </Section>

        <Section title="What each layer actually does">
          <p className="text-muted-foreground">
            The #3 base course is the foundation. Its fist-size angular stones interlock
            into a rigid mat that bridges soft pockets and spreads a 1,000 lb wheel load
            across several square feet of subgrade instead of one tire print. Large
            stone also leaves large voids, so water that gets in drains straight down
            and out rather than sitting under the drive.
          </p>
          <p className="text-muted-foreground">
            The #57 middle course is the transition. Its 3/4 in stones are small enough
            to rattle down into the surface voids of the #3 layer and choke them, but
            big enough to stay open-graded and free-draining themselves. Skip it and the
            fine surface stone simply disappears into the base voids over the first
            year — you paid for crusher run and bought filler.
          </p>
          <p className="text-muted-foreground">
            The crusher run surface is the wear course. Because it is crushed stone
            with fines all the way down to dust, it compacts into a tight, almost
            pavement-like crust that sheds water sideways to the edges — which is why
            the surface, not the base, carries the 2–3% crown. Where a decorative
            surface like pea gravel is wanted, it replaces only this top course, kept to
            2 in so tires still reach firm material. The{" "}
            <a href={GRAVEL.drivewayTypes} className="font-medium text-primary hover:underline">
              best gravel for driveways guide
            </a>{" "}
            compares the surface options honestly.
          </p>
          <InfoBlock title="Angular stone or nothing">
            Every structural layer must be crushed, angular stone. Rounded river gravel
            and pea gravel act like ball bearings under load — they never interlock, no
            matter how hard you compact them. Rounded stone belongs only in the top
            decorative course, and only over a compacted crushed-stone structure.
          </InfoBlock>
        </Section>

        <Section title="Geotextile: the layer under the layers">
          <p className="text-muted-foreground">
            On clay or soft ground, a woven geotextile goes down before any stone. Its
            job is separation: under repeated wheel loads, wet subgrade soil pumps
            upward into clean stone while the stone punches downward into the soil.
            Within a few seasons an unseparated base is 30–40% mud by volume — it stops
            draining, stops spreading load, and the drive ruts as if the base were never
            built. The fabric keeps the two materials apart forever, at $0.30–0.50 per
            square foot.
          </p>
          <WarningBlock title="Fabric is a separator, not a shortcut">
            Geotextile does not replace stone depth. A common failure is fabric plus
            4 in of crusher run directly on clay: the fabric keeps the mud out, but
            there is not enough structure above it to spread the load, so the thin
            layer ruts anyway. Fabric plus the full layer stack is the combination that
            works.
          </WarningBlock>
        </Section>

        <Section title="Per-layer tonnage: a 400 ft² drive">
          <ExampleBlock
            scenario="A 10 × 40 ft straight drive (400 ft²) on soil that needs the full three-layer build. Densities: #3 stone ≈105 lb/ft³ placed, #57 ≈109 lb/ft³, crusher run ≈140 lb/ft³ compacted. Each layer gets a 10% allowance."
            steps={[
              { label: "Geotextile", work: "400 ft² × $0.30–0.50 = $120–200" },
              { label: "#3 base, 4 in", work: "400 × (4÷12) × 105 ÷ 2,000 × 1.10 ≈ 7.7 tons" },
              { label: "#57 middle, 3 in", work: "400 × (3÷12) × 109 ÷ 2,000 × 1.10 ≈ 6.0 tons" },
              { label: "Crusher run surface, 2 in", work: "400 × (2÷12) × 140 ÷ 2,000 × 1.10 ≈ 5.1 tons" },
              { label: "Total stone", work: "≈18.8 tons → order as three separate deliveries" },
            ]}
            result="Call it 19 tons across three loads, plus fabric. Note the counter-intuitive result: the thinnest layer is nearly as heavy per inch as the thickest, because crusher run is the densest stone in the stack."
          />
          <BarChart
            title="Tons per layer, 400 ft² drive"
            unit="tons"
            data={[
              { label: "#3 base, 4 in", value: 7.7 },
              { label: "#57 middle, 3 in", value: 6.0 },
              { label: "Crusher run, 2 in", value: 5.1 },
            ]}
          />
        </Section>

        <Section title="Sequencing the build">
          <p className="text-muted-foreground">
            Order the layers as separate deliveries and compact each one — four to six
            passes with a plate compactor or roller — before the next truck arrives.
            Stone sizes must never be blended in place: a mixed pile compacts
            unpredictably and drains poorly. The full dig-to-crown sequence, including
            grading and edging, is walked step by step in the{" "}
            <a href={GRAVEL.drivewayInstall} className="font-medium text-primary hover:underline">
              gravel driveway installation guide
            </a>
            .
          </p>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Base layer questions" />

        <Cta
          variant={ctaVariant}
          title="Get tonnage for every layer"
          description="The driveway calculator prices the #3, #57 and surface courses separately from your dimensions."
          href={GRAVEL.driveway}
          buttonLabel="Driveway Gravel Calculator"
        />

        <RelatedArticles
          title="Next in the driveway series"
          variant={relatedStyle}
          items={pickLinks(
            drivewayGuideLinks,
            GRAVEL.drivewayDepth,
            GRAVEL.drivewayInstall,
            GRAVEL.drivewayTypes,
          )}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.fhwaGravel, GREFS.aashtoM43, GREFS.astmD448]} />
      </ArticleShell>
    </>
  );
}
