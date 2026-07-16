import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
import { DonutChart } from "@/components/charts/donut-chart";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, weightGuideLinks, coreGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Density Explained — Loose, Compacted & Why It Matters";
const description =
  "What asphalt density actually measures — bulk specific gravity, air voids and the 92–93% compaction target — and why the gap between loose (117 lb/ft³) and compacted (145 lb/ft³) mix decides pavement life.";
const path = ASPHALT.densityExplained;
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
    question: "What is the density of asphalt?",
    answer:
      "Compacted dense-graded hot mix runs 145 lb/ft³ (2,322 kg/m³) — the estimating standard. Loose in the truck it is about 117 lb/ft³, compacted cold mix ~137 lb/ft³, and millings 103 loose to 122 lb/ft³ compacted. Specific mix designs vary a few percent either side of these values.",
  },
  {
    question: "What is Gmb versus Gmm?",
    answer:
      "Gmb is the bulk specific gravity of the compacted mix — its density including air voids, measured per ASTM D2726. Gmm is the theoretical maximum specific gravity with zero voids. Their ratio is percent compaction: field cores at 92–93% of Gmm mean 7–8% air voids in place.",
  },
  {
    question: "Why does asphalt compaction matter so much?",
    answer:
      "Air voids control durability. Above about 8% voids the mat becomes permeable, letting water and air age the binder and strip the aggregate; industry studies show each 1% of extra voids costs roughly 10% of pavement life. Compaction is the cheapest life-extension money buys — it is just roller passes.",
  },
  {
    question: "Why does asphalt weigh less in the truck than in the road?",
    answer:
      "Loose mix is a loosely packed particle assembly full of air — about 117 lb/ft³ against 145 compacted, a 25% fluff. Rolling forces aggregate particles into interlock and squeezes the void content down to the 7–8% target. The tonnage never changes; only the volume it occupies does.",
  },
  {
    question: "How is asphalt density measured in the field?",
    answer:
      "Two ways: cores cut from the mat and weighed per ASTM D2726 (the referee method), or nuclear/non-nuclear gauges that read density in seconds for rolling control. Specs typically require 92–93% of Gmm on the mat and slightly less at unconfined joints, verified per lot.",
  },
  {
    question: "Does temperature affect asphalt density?",
    answer:
      "It affects achievable density. Hot mix must be compacted while the binder is fluid — mat temperatures roughly 175–275°F depending on the roller pass. Below cessation temperature (~175°F) further rolling does nothing, which is why cold weather, thin lifts and long hauls all show up as low density and early failures.",
  },
];

const toc = tocFromTitles(
  "What density means for hot mix",
  "What a ton of HMA is made of",
  "Air voids: the 92–93% target",
  "Loose vs compacted, in numbers",
  "Checking compaction in the field",
);

export default function AsphaltDensityExplainedPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Asphalt",
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
              eyebrow="Asphalt · Fundamentals"
              variant="standard"
              title="Asphalt density explained"
              description="Density is the single number that connects your order (tons), your takeoff (cubic yards) and your pavement's lifespan (air voids). This guide covers all three uses — with the field numbers that matter."
            >
              <AuthorBox author={author} datePublished="2026-07-15" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Density Explained", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="What density means for hot mix">
          <p className="text-muted-foreground">
            For hot mix asphalt, &quot;density&quot; almost always means bulk specific gravity
            — Gmb — the as-compacted unit weight of the mix including its air voids, measured
            on cores or lab specimens per ASTM D2726. For estimating, that number is 145
            lb/ft³ (2,322 kg/m³) for a dense-graded mix rolled to spec: 3,915 lb per cubic
            yard, or 1.96 US tons. Every value in the{" "}
            <a href={ASPHALT.weightChart} className="font-medium text-primary hover:underline">
              asphalt weight chart
            </a>{" "}
            is a restatement of a Gmb for some material and state.
          </p>
          <InfoBlock title="One density, three jobs">
            The same 145 lb/ft³ converts volume to order tonnage, converts scale tickets back
            to coverage, and — compared against the mix&apos;s theoretical maximum — tells the
            inspector whether the rollers did their job. Estimators, haulers and QC techs are
            all reading the same number.
          </InfoBlock>
        </Section>

        <Section
          title="What a ton of HMA is made of"
          lead="By weight, hot mix is almost entirely rock. The binder is a thin, heavy glue — small by mass, decisive for behavior."
        >
          <DonutChart
            title="HMA composition by weight"
            centerValue="HMA"
            centerLabel="dense-graded mix"
            data={[
              { label: "Aggregate", value: 95 },
              { label: "PG binder", value: 5 },
            ]}
          />
          <p className="text-muted-foreground">
            Because aggregate dominates the mass, aggregate specific gravity dominates mix
            density: a mix on lightweight slag or on dense traprock can sit several percent
            either side of 145 lb/ft³ with identical binder content. That is why mix design
            sheets state the design density — and why cold mix, with its cutback or emulsified
            binder and higher voids, compacts to only about 137 lb/ft³ (see{" "}
            <a href={ASPHALT.hotVsColdWeight} className="font-medium text-primary hover:underline">
              hot mix vs cold mix weight
            </a>
            ).
          </p>
        </Section>

        <Section title="Air voids: the 92–93% target">
          <p className="text-muted-foreground">
            A finished mat is never void-free. Specifications target in-place density of
            92–93% of the theoretical maximum (Gmm) — that is, 7–8% air voids after rolling.
            Traffic densifies the mat slightly further toward the 4% design void content over
            the first hot seasons. The target is a compromise: too many voids and the mat is
            permeable; too few and the binder has nowhere to go in summer, bleeding and
            rutting.
          </p>
          <WarningBlock title="Every 1% of extra voids costs ~10% of pavement life">
            The correlation is one of the most repeated findings in pavement research: a mat
            left at 90% of Gmm instead of 93% gives up roughly a third of its service life to
            water intrusion, binder aging and raveling. Compaction is bought with roller
            passes while the mat is hot — it cannot be added back later at any price.
          </WarningBlock>
        </Section>

        <Section title="Loose vs compacted, in numbers">
          <p className="text-muted-foreground">
            Straight off the truck, hot mix sits at roughly 117 lb/ft³ — the particles are
            coated and lubricated but not interlocked, and about a quarter of the volume is
            air. Rolling drives that to 145 lb/ft³, a 25% volume reduction. The practical
            consequences: a 3-inch compacted lift must be spread about 3.75 inches loose
            (mix compacts roughly a quarter inch per inch of loose lift); a truck bed holds
            25% fewer &quot;compacted yards&quot; than its struck volume suggests; and any
            yardage figure is meaningless until someone says loose or compacted. Tonnage,
            by contrast, is compaction-proof — which is why the industry buys and sells by
            weight.
          </p>
        </Section>

        <Section title="Checking compaction in the field">
          <FormulaBlock
            formula="% compaction = (field density ÷ lab max density) × 100"
            variables={[
              { symbol: "field density", meaning: "core or gauge reading on the finished mat (Gmb)", unit: "lb/ft³" },
              { symbol: "lab max density", meaning: "theoretical maximum for the mix (Gmm), zero voids", unit: "lb/ft³" },
            ]}
            note="Example: core at 143.5 lb/ft³ against a Gmm of 154.3 lb/ft³ → 93.0% compaction = 7.0% in-place air voids. Passes a 92% spec."
          />
          <Cta
            variant="inline"
            title="Convert your volume to tons at the right density"
            href={ASPHALT.weight}
          />
        </Section>

        <Faq items={faqItems} variant="list" title="Density questions" />

        <RelatedArticles
          title="Put the density to work"
          variant="cards"
          items={[
            ...pickLinks(weightGuideLinks, ASPHALT.weightChart, ASPHALT.hotVsColdWeight),
            ...pickLinks(coreGuideLinks, ASPHALT.densityChart),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.astmD2726, AREFS.aashto, AREFS.ms2]} />
      </ArticleShell>
    </>
  );
}
