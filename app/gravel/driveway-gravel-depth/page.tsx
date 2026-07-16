import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock } from "@/components/blocks/callout";
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
import { GRAVEL, drivewayGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const title = "Driveway Gravel Depth — How Deep Is Enough?";
const description =
  "How deep a gravel driveway really needs to be: 2 in for a top-up, 8 in on firm soil, 12 in on clay or under trucks — with per-layer breakdowns and the tonnage cost of every extra inch.";
const path = GRAVEL.drivewayDepth;
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
    question: "How deep should a gravel driveway be?",
    answer:
      "For a new build on firm, well-drained soil: 8 inches total, as 4 in of #57 stone base plus 4 in of crusher run surface. On clay or soft ground, go to 12 inches by adding a 4 in #2 stone sub-base underneath. Resurfacing a drive with a sound existing base needs only a 2 in crusher run top-up.",
  },
  {
    question: "Is 2 inches of gravel enough for a driveway?",
    answer:
      "Only as a top-up over an existing compacted base that still drains and holds shape. Two inches of stone placed directly on soil is a mud sandwich: tires push the stone into the ground within a season and you buy it all again. If you can see soil pumping up between the stones after rain, you need a base, not a top-up.",
  },
  {
    question: "How much extra gravel does one more inch of depth cost?",
    answer:
      "Each extra inch of crusher run adds about 2.9 tons per 500 ft² — roughly $55–90 in material at $18–30 per ton. On a 600 ft² single drive that is about 3.5 tons per inch; on a 2,400 ft² rural drive it is about 14 tons, a full tandem load. Depth is the biggest lever in the whole estimate.",
  },
  {
    question: "Do I need 12 inches of gravel on clay?",
    answer:
      "Yes — and geotextile fabric under it ($0.30–0.50/ft²). Clay deforms under load and pumps fines up into the stone, so the extra 4 in of #2 sub-base bridges the soft ground while the fabric keeps soil and stone separated. Skipping either is how a 12 in drive performs like a 6 in one within two years.",
  },
  {
    question: "How deep for trucks or heavy equipment?",
    answer:
      "Plan 12 inches minimum, and increase the #2 sub-base to 6 in where loaded tandems (about 14 tons per load), farm equipment or delivery trucks run routinely. Depth spreads the wheel load: what reaches the subgrade at 12 in is a fraction of the tire pressure at the surface. Rutting under trucks is almost always a depth problem, not a stone problem.",
  },
  {
    question: "Does gravel depth settle over time?",
    answer:
      "Compacted-in-lifts gravel loses very little to settlement — the loss you see is surface migration and crushing, roughly 1 inch every 2–3 years under regular use. Gravel dumped in one thick loose lift is different: it can settle 15–20% and rut immediately. Build the depth in 4 in compacted lifts and plan periodic top-ups instead.",
  },
];

const toc = tocFromTitles(
  "Total depth by scenario",
  "What an extra inch costs",
  "Build depth in lifts, not one dump",
  "Worked decision: a clay-site drive",
);

export default function DrivewayGravelDepthPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
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
              eyebrow="Gravel · Driveways"
              variant="centered"
              title="Driveway gravel depth — how deep is enough?"
              description="Depth is the difference between a road and a rock scatter. Here is the total depth each site actually needs, layer by layer, and what every extra inch costs in tons."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Driveway Gravel Depth", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Total depth by scenario">
          <p className="text-muted-foreground">
            There is no single correct driveway depth — there are four standard answers,
            set by what is under the gravel and what drives on top of it. Match your site
            to a row, then hold the per-layer thicknesses: they come straight from
            gravel-road practice scaled to residential loads.
          </p>
          <CoverageTable
            headers={["Scenario", "Total depth", "Layer breakdown"]}
            rows={[
              {
                label: "Top-up, existing sound base",
                spec: "2 in",
                coverage: "2 in crusher run, re-crowned",
                note: "Surface renewal only — base must still drain and hold shape",
              },
              {
                label: "New build, firm soil",
                spec: "8 in",
                coverage: "4 in #57 base + 4 in crusher run surface",
                note: "The standard two-layer build",
              },
              {
                label: "New build, clay or soft ground",
                spec: "12 in",
                coverage: "4 in #2 sub-base + 4 in #57 + 4 in crusher run",
                note: "Geotextile fabric under the stone, $0.30–0.50/ft²",
              },
              {
                label: "Regular truck traffic",
                spec: "12+ in",
                coverage: "6 in #2 sub-base + 4 in #57 + 4 in crusher run",
                note: "Loaded tandem ≈ 14 tons — depth spreads the load",
              },
            ]}
            caption="Total compacted depths. Each layer is placed and compacted separately before the next goes down."
          />
          <p className="text-muted-foreground">
            Not sure which soil you have? Dig a test hole the day after rain. If the
            sides stand clean and the bottom is firm underfoot, build the 8 in two-layer
            drive. If the hole weeps, smears or squeezes underfoot, price the 12 in
            build — the{" "}
            <a href={GRAVEL.drivewayLayers} className="font-medium text-primary hover:underline">
              base layers guide
            </a>{" "}
            explains what each layer is doing down there.
          </p>
        </Section>

        <Section title="What an extra inch costs">
          <FormulaBlock
            title="Tons per extra inch of depth"
            formula="Extra tons = Area × (1 ÷ 12) × density ÷ 2,000"
            variables={[
              { symbol: "Area", meaning: "surface area", unit: "ft²" },
              { symbol: "density", meaning: "compacted unit weight", unit: "lb/ft³" },
            ]}
            note="Crusher run runs 140 lb/ft³ compacted, #57 stone 109 lb/ft³. For crusher run that works out to ≈2.9 tons per extra inch per 500 ft² of driveway."
          />
          <p className="text-muted-foreground">
            Run it both directions. Adding an inch of crusher run to a 600 ft² drive is
            about 3.5 tons — cheap insurance on a marginal subgrade. But specifying 12 in
            on a firm sandy site where 8 in would do wastes roughly a tandem load per
            1,200 ft². Depth should be a decision, not a guess — the{" "}
            <a href={GRAVEL.driveway} className="font-medium text-primary hover:underline">
              driveway gravel calculator
            </a>{" "}
            prices each scenario layer by layer.
          </p>
        </Section>

        <Section title="Build depth in lifts, not one dump">
          <WarningBlock title="One thick lift compacted once = soft at depth">
            <p>
              A plate compactor only densifies the top 3–4 inches of loose stone. Dump
              8–12 in in one lift, compact the top, and you have a crust over a loose
              core — it feels solid for a month, then ruts from the inside out. Place
              every layer in 4 in lifts and compact each one before the next load
              arrives. Same tonnage, completely different road.
            </p>
          </WarningBlock>
          <p className="text-muted-foreground">
            This is also why the surface needs a 2–4% crown (about 1/4 in per foot of
            half-width) built in at every lift, not raked on at the end. Water that runs
            off never gets the chance to soften the depth you paid for. The{" "}
            <a href={GRAVEL.drivewayInstall} className="font-medium text-primary hover:underline">
              installation guide
            </a>{" "}
            walks the full sequence.
          </p>
        </Section>

        <Section title="Worked decision: a clay-site drive">
          <ExampleBlock
            scenario="A 40 × 12 ft drive (480 ft²) on clay that smears in the test hole. The owner hoped 8 in would do; the site says otherwise."
            steps={[
              { label: "Scenario match", work: "Clay/soft ground → 12 in three-layer build + geotextile" },
              { label: "Geotextile", work: "480 ft² × $0.30–0.50 = $145–240" },
              { label: "#2 sub-base, 4 in", work: "≈9.0 tons (with 10% allowance)" },
              { label: "#57 base, 4 in at 109 lb/ft³", work: "480 × 0.333 × 109 ÷ 2,000 × 1.10 ≈ 9.6 tons" },
              { label: "Crusher run surface, 4 in at 140 lb/ft³", work: "480 × 0.333 × 140 ÷ 2,000 × 1.10 ≈ 12.3 tons" },
              { label: "Total", work: "≈31 tons → 2–3 tandem loads (≈14 tons each)" },
            ]}
            result="About 31 tons across three separate deliveries, plus $145–240 of fabric. The 8 in shortcut would have saved ~9 tons up front and cost a full rebuild inside three years."
          />
        </Section>

        <Faq items={faqItems} title="Driveway depth questions" variant="accordion" />

        <Cta
          variant="banner"
          title="Get tonnage for your exact depth"
          description="Pick top-up, two-layer or three-layer and the calculator returns tons per layer and truck loads."
          href={GRAVEL.driveway}
          buttonLabel="Driveway Gravel Calculator"
        />

        <RelatedArticles
          title="Next in the driveway series"
          variant="cards"
          items={pickLinks(
            drivewayGuideLinks,
            GRAVEL.drivewayLayers,
            GRAVEL.drivewayTypes,
            GRAVEL.drivewayInstall,
          )}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[GREFS.fhwaGravel, GREFS.aashtoM43]} />
      </ArticleShell>
    </>
  );
}
