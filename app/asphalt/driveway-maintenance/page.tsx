import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { WarningBlock, SuccessBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { CostTable } from "@/components/tables/cost-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import {
  ASPHALT,
  drivewayGuideLinks,
  asphaltCalculatorLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Driveway Maintenance — Schedule & Costs";
const description =
  "The asphalt driveway maintenance schedule that reaches 25 years: first sealcoat at 1–2 years, re-seal every 3–5 at $0.20–0.45/ft², annual crack filling, and the overlay decision at year 12–18 — with costs for every task.";
const path = ASPHALT.drivewayMaintenance;
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
    question: "How often should I sealcoat my driveway?",
    answer:
      "Every 3–5 years after the first application at 1–2 years old. Seal on the shorter cycle in high-UV climates or where the surface looks gray and dry; sealing more often than every 2–3 years just builds up a slick film that peels. At $0.20–0.45 per square foot, a 720 ft² double drive costs roughly $145–325 per cycle.",
  },
  {
    question: "Can I sealcoat a driveway myself?",
    answer:
      "Yes — DIY is the one paving task genuinely within reach. Bucket sealer from the supply store, a squeegee and a dry 50–85°F weekend handle a typical drive for $80–200 in materials, versus $150–500 hired out. The quality difference is in prep: professionals clean better and fill cracks first. Whoever does it, cracks get filled before sealer goes down.",
  },
  {
    question: "What size cracks need filling?",
    answer:
      "Anything wider than about 1/4 in gets hot-pour or quality cold-pour crack filler, ideally every fall before freeze-up. Hairline surface checking is cosmetic and sealcoat handles it. The reason 1/4 in matters: that is the width where meaningful water starts reaching the base, and freeze-thaw turns every wet crack into a wider one by spring.",
  },
  {
    question: "What do driveway repairs cost?",
    answer:
      "Rule-of-thumb 2026 figures: crack filling $1–3 per linear foot, patching $3–6 per square foot, and a 2 in overlay of the whole surface at $3–5 per square foot. The pattern to notice is the escalation — a $100 fall crack-filling session prevents the $600 patch, which prevents the $2,500 overlay arriving five years early.",
  },
  {
    question: "When is it time to overlay instead of repair?",
    answer:
      "Assess around years 12–18. If cracking covers more than 25–30% of the surface but the base is still sound — no rutting, no pumping, no alligator areas — a 2 in overlay buys another 10–12 years for about half the cost of replacement. Alligator cracking or soft spots mean base failure, and an overlay there just reprints the cracks within 2–3 years.",
  },
  {
    question: "Should I do anything to a brand-new driveway?",
    answer:
      "For the first year, almost nothing — that is the point. Let it cure and oxidize; do not sealcoat it. Just keep gasoline and oil drips cleaned off (fresh asphalt dissolves in petroleum), avoid parking in one spot every day through the first summer, and keep sprinklers from soaking the edges. The first real task is the initial sealcoat at 1–2 years.",
  },
];

const toc = tocFromTitles(
  "The maintenance calendar",
  "What each task costs",
  "The fall checklist",
  "The one mistake: sealing too early",
);

export default function DrivewayMaintenancePage() {
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
              eyebrow="Asphalt · Driveway Guide"
              variant="compact"
              title="Asphalt driveway maintenance — schedule and costs"
              description="Asphalt is the pavement you maintain — that is the deal you accepted for the lower install price. The full schedule takes a weekend every few years and is the difference between a 15-year and a 25-year driveway."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Driveway Maintenance", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="What does the work buy you?"
            description="See how maintained and neglected driveways diverge year by year."
            href={ASPHALT.drivewayLifespan}
            buttonLabel="Driveway Lifespan Guide"
          />
        }
      >
        <Section title="The maintenance calendar">
          <CoverageTable
            headers={["When", "Task", "Why"]}
            rows={[
              {
                label: "Year 1",
                spec: "Nothing — let it cure",
                coverage: "Oils must oxidize out before any sealer goes on",
                note: "Clean fuel/oil drips promptly",
              },
              {
                label: "Years 1–2",
                spec: "First sealcoat",
                coverage: "Locks the surface against UV and water once cured",
              },
              {
                label: "Every 3–5 years",
                spec: "Re-seal",
                coverage: "Replaces the sacrificial wear layer",
                note: "Shorter cycle in high-UV climates",
              },
              {
                label: "Annually (fall)",
                spec: "Fill cracks over 1/4 in",
                coverage: "Keeps freeze-thaw water out of the base",
              },
              {
                label: "Years 12–18",
                spec: "Assess for a 2 in overlay",
                coverage: "Resets the surface while the base is still sound",
              },
            ]}
            caption="The full ownership schedule. Total effort: roughly one weekend every 3–4 years plus an annual walk-around."
          />
        </Section>

        <Section title="What each task costs">
          <CostTable
            caption="2026 contractor pricing. DIY sealcoating runs roughly half the low figure in materials."
            rows={[
              { item: "Sealcoating", unit: "per ft²", low: 0.2, high: 0.45 },
              {
                item: "Crack filling",
                unit: "per linear ft",
                low: 1,
                high: 3,
                note: "Hot-pour lasts longer than cold-pour",
              },
              {
                item: "Patching",
                unit: "per ft²",
                low: 3,
                high: 6,
                note: "Full-depth repair of isolated failures",
              },
              {
                item: "2 in overlay",
                unit: "per ft²",
                low: 3,
                high: 5,
                note: "Requires a structurally sound base",
              },
            ]}
          />
          <p className="text-muted-foreground">
            For scale: a maintained 720 ft² double drive spends roughly $1,500–2,500 on
            upkeep across 25 years — less than a tenth of what it cost to build.
          </p>
          <Cta
            variant="inline"
            title="Re-check your driveway's material numbers"
            href={ASPHALT.driveway}
          />
        </Section>

        <Section title="The fall checklist">
          <SuccessBlock title="One October afternoon, every year">
            <p>
              Four items, in order: sweep and hose the surface clean; fill every crack
              wider than 1/4 in while daytime temperatures still allow filler to bond;
              walk the edges and check that water still drains off and away — ponding
              spots get marked for spring regrading; and degrease oil spots with detergent
              or a dedicated cleaner so they do not soften through the winter. Done before
              the first freeze, this list is what keeps small defects from becoming
              spring repairs.
            </p>
          </SuccessBlock>
        </Section>

        <Section title="The one mistake: sealing too early">
          <WarningBlock title="Do not seal a driveway less than 6–12 months old">
            New asphalt needs its light oils to oxidize out before sealer is applied.
            Sealing inside the first 6–12 months traps those volatiles, and the pavement
            stays permanently soft — it scuffs under turning tires and tracks in summer
            heat, and there is no fix short of waiting years for it to slowly harden.
            Wait a minimum of one full summer; most of the industry says a year.
          </WarningBlock>
          <p className="text-muted-foreground">
            The opposite error is milder but real: a driveway never sealed at all
            oxidizes gray, turns brittle at the surface, and starts raveling — shedding
            aggregate — years ahead of schedule. The 3–5 year cycle is the middle path.
          </p>
        </Section>

        <Faq items={faqItems} variant="list" title="Maintenance questions" />

        <RelatedArticles
          title="Keep reading"
          variant="inline-strip"
          items={[
            ...pickLinks(drivewayGuideLinks, ASPHALT.drivewayLifespan, ASPHALT.drivewayFaqs),
            ...pickLinks(asphaltCalculatorLinks, ASPHALT.driveway),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
