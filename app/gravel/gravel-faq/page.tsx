import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { tocFromTitles } from "@/components/blocks/section";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, faqSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { pick, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { getAuthor } from "@/data/authors";
import {
  GRAVEL,
  coreGuideLinks,
  gravelCalculatorLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-faq";
const title = "Gravel FAQ — The Questions Everyone Asks Before Ordering";
const description =
  "Fifteen substantive answers on gravel: what a ton covers, tons vs yards, depth by application, landscape fabric, compaction, delivery logistics and the best gravel type for every job.";
const path = GRAVEL.faq;
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

const buyingItems: FaqItem[] = [
  {
    question: "How much does a ton of gravel cover?",
    answer:
      "About 114 ft² at 2 inches deep for common gravel (105 lb/ft³ loose), 76 ft² at 3 inches, and 57 ft² at 4 inches. The trade rule of thumb — 100 ft² per ton at 2 inches — is the same math with a settling margin built in. Lighter pea gravel stretches to about 125 ft² at 2 inches; dense compacted crusher run drops to 86.",
  },
  {
    question: "Should I order gravel in tons or cubic yards?",
    answer:
      "Order in whatever unit your supplier actually measures: quarries weigh trucks and sell by the ton; landscape yards fill loaders and sell by the cubic yard. Compute both before calling — one cubic yard of common gravel is about 1.42 tons loose — and quote both numbers. If the dispatcher's conversion disagrees with yours, someone has the wrong density, and it's better to find out on the phone.",
  },
  {
    question: "How many tons of gravel are in a cubic yard?",
    answer:
      "About 1.42 US tons (2,800 lb) for common gravel, loose. Pea gravel runs 1.3 tons per yard, #57 stone 1.35, and crusher run 1.69 loose or 1.89 compacted. The spread is nearly 50% from lightest to heaviest, so never reuse a conversion factor across different materials.",
  },
  {
    question: "How much does gravel cost?",
    answer:
      "Bulk prices in 2026 run roughly $15–35 per ton for crusher run and common gravel, $30–60 for pea gravel and #57 stone, and $50–120+ for decorative rock — plus a $50–150 flat delivery fee per trip. Bagged gravel works out 4–6 times the bulk price per ton, which is why bags only make sense under about 15 bags' worth of stone.",
  },
  {
    question: "How much extra gravel should I order?",
    answer:
      "Add 10% to the calculated quantity as standard, or 15% when the stone will be compacted (any crusher run base), the subgrade is soft or uneven, or the shape has a lot of edge for its area. Then round up to the supplier's half-ton increment. A slightly generous order costs a few dollars; a short one costs a second delivery fee.",
  },
];

const depthItems: FaqItem[] = [
  {
    question: "How deep should gravel be?",
    answer:
      "2 inches for decorative cover over fabric, 3 inches for walking paths and patios, 4 inches per compacted lift for driveways (8–12 inches total in layers for a new drive), and 9 inches of loose fill for playground fall zones. Deeper is not automatically better: past 3 inches, loose rounded gravel shifts underfoot like dry sand.",
  },
  {
    question: "Do I need landscape fabric under gravel?",
    answer:
      "Under decorative gravel and paths, yes — a woven geotextile stops stone from disappearing into the soil and slows weeds without blocking drainage. Under driveways, use a heavier woven road fabric for separation and strength, not weed cloth. Skip fabric only inside French drains wrapped elsewhere, and never use solid plastic sheeting: it traps water and turns the bed into a bathtub.",
  },
  {
    question: "Does gravel need to be compacted?",
    answer:
      "Any gravel that carries load does. Compact crusher run and other fines-bearing stone in lifts of 3–4 inches with a plate compactor — it gains about 12% density and locks into a near-solid mat. Clean rounded stone like pea gravel barely compacts at all; it just displaces, which is exactly why it never belongs in a base layer.",
  },
  {
    question: "What goes under a gravel driveway?",
    answer:
      "From the bottom up: stripped and graded subgrade, woven geotextile fabric, 4 inches of compacted large base stone (#3 or crusher run), then one or two upper layers totaling another 4–8 inches, each compacted separately, finished with a crowned surface so water sheds sideways. Skipping the base layers is the root cause of most rutted, muddy driveways.",
  },
  {
    question: "How do I keep gravel from spreading everywhere?",
    answer:
      "Edging — there is no other answer. Steel, aluminum, concrete or timber borders set about an inch above grade contain the stone; without them, gravel migrates into lawns and down slopes on a schedule measured in months. Rounded stone migrates fastest, angular stone slowest, and on grades over a few percent consider geocell grids that pocket the stone in place.",
  },
];

const typesItems: FaqItem[] = [
  {
    question: "What is the best gravel for a driveway?",
    answer:
      "Crusher run (crushed stone with fines) for the base and middle layers — it compacts into a hard, interlocked mat. For the surface, either more crusher run or #57 stone if you prefer a cleaner look. Avoid pea gravel and rounded river rock anywhere on a driveway: round stones never lock together, so tires rut and scatter them.",
  },
  {
    question: "What is the difference between crushed stone and gravel?",
    answer:
      "Shape and origin. Crushed stone is quarried rock run through a crusher, leaving sharp angular faces that interlock under compaction. Natural gravel is river- or glacier-worn, rounded and smooth, so it drains beautifully and feels good underfoot but never locks up. Angular for anything structural; rounded for anything decorative or walked on barefoot.",
  },
  {
    question: "What gravel is best for drainage?",
    answer:
      "Clean, washed, single-size angular stone — #57 (about 1 inch) is the standard for French drains and foundation drains. The key word is clean: no fines. Fines are what make crusher run compact so well, and exactly what clogs the voids that drainage depends on. Wrap the trench in geotextile to keep surrounding soil from doing the same job fines would.",
  },
  {
    question: "What is the best gravel for walking paths?",
    answer:
      "Two proven recipes: pea gravel over a compacted stone-dust base — soft underfoot, good drainage, needs edging — or 3/8-inch minus crushed fines (decomposed granite style) that compact into a firm, wheelchair- and stroller-friendly surface. Pure loose crushed stone larger than 1/2 inch is tiring to walk on; save it for drainage and driveways.",
  },
  {
    question: "Can I put gravel straight over grass or dirt?",
    answer:
      "No. Gravel dumped on turf sinks as the grass rots, and on bare soil it punches in with the first rain, leaving a muddy, stone-studded mess by spring. Strip the sod, excavate to your planned depth, compact the subgrade, lay fabric, then place the stone. The extra afternoon of preparation is the difference between a surface and a slow disappearance.",
  },
];

const allFaqItems = [...buyingItems, ...depthItems, ...typesItems];

const toc = tocFromTitles(
  "Buying, coverage and cost",
  "Depth, base and installation",
  "Gravel types and best uses",
);

export default function GravelFaqPage() {
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
          faqSchema(allFaqItems),
        ]}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · FAQ Hub"
              variant={heroVariant}
              title="Gravel FAQ"
              description="Fifteen questions that come up before nearly every gravel order — coverage, units, depth, fabric, compaction and type selection — answered with the numbers estimators actually use."
              stats={[
                { value: "1.42 t", label: "per yd³, common gravel" },
                { value: "≈100 ft²", label: "one ton at 2 in" },
                { value: "3 in", label: "standard path depth" },
                { value: "10–15%", label: "waste allowance" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Gravel FAQ", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Answer engines"
            variant="inline-strip"
            items={pickLinks(gravelCalculatorLinks, GRAVEL.calculator, GRAVEL.cost)}
          />
        }
      >
        <p className="text-muted-foreground">
          Every answer below stands alone, but three guides carry the working math if
          you want the derivations: the{" "}
          <a href={GRAVEL.howTo} className="font-medium text-primary hover:underline">
            five-step calculation method
          </a>
          , the{" "}
          <a href={GRAVEL.coverage} className="font-medium text-primary hover:underline">
            coverage guide
          </a>{" "}
          and the{" "}
          <a href={GRAVEL.densityChart} className="font-medium text-primary hover:underline">
            density chart
          </a>
          . Type-specific questions have their own hub — see the{" "}
          <a href={GRAVEL.peaFaq} className="font-medium text-primary hover:underline">
            pea gravel FAQ
          </a>
          .
        </p>

        <Faq
          items={buyingItems}
          variant={faqVariant}
          withSchema={false}
          title="Buying, coverage and cost"
          id="buying-coverage-and-cost"
        />

        <Faq
          items={depthItems}
          variant={faqVariant}
          withSchema={false}
          title="Depth, base and installation"
          id="depth-base-and-installation"
        />

        <Faq
          items={typesItems}
          variant={faqVariant}
          withSchema={false}
          title="Gravel types and best uses"
          id="gravel-types-and-best-uses"
        />

        <Cta
          variant={ctaVariant}
          title="Numbers for your specific project"
          description="Tons, cubic yards, bags and cost from your dimensions — with the right density for every gravel type."
          href={GRAVEL.calculator}
          buttonLabel="Gravel Calculator"
        />

        <RelatedArticles
          title="The core gravel guides"
          variant={relatedStyle}
          items={pickLinks(
            coreGuideLinks,
            GRAVEL.howTo,
            GRAVEL.coverage,
            GRAVEL.weightChart,
            GRAVEL.measurement,
          )}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.astmC29, GREFS.fhwaGravel, GREFS.usgs, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
