import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ProsCons } from "@/components/blocks/pros-cons";
import { ComparisonTable } from "@/components/tables/comparison-table";
import { CostTable } from "@/components/tables/cost-table";
import { BarChart } from "@/components/charts/bar-chart";
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
  asphaltCalculatorLinks,
  drivewayGuideLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import {
  CONCRETE,
  guideLinks as concreteGuides,
  pickLinks as pickConcrete,
} from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt vs Concrete — The Paving Decision";
const description =
  "Asphalt vs concrete for driveways and pavements: installed cost ($2.50–5 vs $7–12 per ft²), lifespan (15–25 vs 30–40 years), climate behavior, maintenance schedules and 30-year total cost of ownership.";
const path = ASPHALT.vsConcrete;
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
    question: "Is asphalt cheaper than concrete?",
    answer:
      "Installed, yes — decisively. Asphalt runs $2.50–5 per square foot for a standard 3 in driveway section versus $7–12 for a 4–5 in concrete slab. On a 600 ft² driveway that is roughly $3,000 versus $5,500 on day one. Over 30 years, sealcoating and an overlay narrow the gap to nearly nothing.",
  },
  {
    question: "How much longer does concrete last than asphalt?",
    answer:
      "Concrete typically serves 30–40 years to asphalt's 15–25 on residential drives. But asphalt's number assumes an overlay around year 15–20 restores it to near-new for $3–5/ft² — a renewal option concrete does not really have. Both figures collapse on a poorly compacted base; neither material outperforms its foundation.",
  },
  {
    question: "How soon can you drive on each?",
    answer:
      "Asphalt: 2–3 days after paving (longer in hot weather while the mat stays soft). Concrete: 7 days for vehicle loads while it builds strength, though foot traffic is fine after 24–48 hours. If the driveway is your only access and downtime is critical, asphalt's fast return to service is a genuine advantage.",
  },
  {
    question: "Which is better in cold climates?",
    answer:
      "Asphalt. It flexes with freeze-thaw ground movement instead of cracking, tolerates road salt chemically, and its black surface sheds snow and ice faster. Concrete works in cold climates only with air-entrained mix and a salt-free first winter — get either wrong and the surface scales within a few seasons.",
  },
  {
    question: "Which is better in hot climates?",
    answer:
      "Concrete. Asphalt is viscoelastic — above roughly 120°F surface temperature (an ordinary sunny 95°F day) it softens and ruts under parked wheels, and it runs 20–30°F hotter than concrete in the sun. Across the southern US the default residential answer flips to concrete for exactly this reason.",
  },
  {
    question: "Can asphalt be paved over an old concrete driveway?",
    answer:
      "Yes, if the slab is stable — a 1.5–2 in overlay on sound concrete is common and cheap. Expect the concrete joints to reflect through as hairline cracks within a couple of years; crews mitigate but rarely eliminate this. If panels are heaving or the base has failed, overlaying just relocates the problem upward.",
  },
];

const toc = tocFromTitles(
  "Head-to-head specification table",
  "Cost: installed and over 30 years",
  "Strengths and weaknesses of each",
  "When asphalt is the right call",
);

export default function AsphaltVsConcretePage() {
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
          keywords: ["asphalt vs concrete", "driveway comparison", "paving cost"],
        })}
      />
      <ArticleShell
        tocPosition="toc-left"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Comparison"
              variant="stat-strip"
              title="Asphalt vs concrete"
              description="The two pavements solve the same problem with opposite physics: one flexes, one is rigid. The right choice falls out of four numbers and your climate."
              stats={[
                { value: "$2.50–5 vs $7–12", label: "installed per ft²" },
                { value: "15–25 vs 30–40", label: "years of service life" },
                { value: "2–3 vs 7", label: "days until you can drive on it" },
                { value: "3–5 yrs", label: "asphalt sealcoat cycle (concrete: none)" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Asphalt vs Concrete", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Run the numbers"
            variant="inline-strip"
            items={pickLinks(asphaltCalculatorLinks, ASPHALT.calculator, ASPHALT.cost)}
          />
        }
      >
        <Section title="Head-to-head specification table">
          <ComparisonTable
            columns={[
              { key: "asphalt", label: "Asphalt", highlight: true },
              { key: "concrete", label: "Concrete" },
            ]}
            rows={[
              { feature: "Installed cost (residential)", values: { asphalt: "$2.50–5 /ft²", concrete: "$7–12 /ft²" } },
              { feature: "Service life", values: { asphalt: "15–25 years", concrete: "30–40 years" } },
              { feature: "Usable by vehicles", values: { asphalt: "2–3 days", concrete: "7 days" } },
              { feature: "Maintenance cycle", values: { asphalt: "Sealcoat every 3–5 yrs; overlay ~yr 15–20", concrete: "Joint reseal ~yr 10" } },
              { feature: "Cold / salt climate", values: { asphalt: "Flexes with frost; salt-immune", concrete: "Needs air-entrainment; salt-sensitive early" } },
              { feature: "Hot climate", values: { asphalt: "Softens and ruts above ~120°F surface", concrete: "Stable; stays 20–30°F cooler" } },
              { feature: "Repairs", values: { asphalt: "Patches blend after sealcoat", concrete: "Panel replacement — always visible" } },
              { feature: "Renewal option", values: { asphalt: "Overlay restores to near-new", concrete: "None short of replacement" } },
              { feature: "Finish options", values: { asphalt: "Black, smooth", concrete: "Broom, stamped, colored, exposed" } },
            ]}
            caption="Typical residential performance. We wrote this same table from concrete's corner too — the numbers agree, the emphasis differs."
          />
          <p className="text-muted-foreground">
            This page argues from asphalt&apos;s corner of the ring. The mirror image — the
            same comparison written from concrete&apos;s side, same data, opposite highlight —
            is at{" "}
            <a href={CONCRETE.vsAsphalt} className="font-medium text-primary hover:underline">
              concrete vs asphalt
            </a>
            . Read whichever matches the material you are leaning toward; if that turns out to
            be concrete, the{" "}
            <a href={CONCRETE.calculator} className="font-medium text-primary hover:underline">
              concrete calculator
            </a>{" "}
            will size the slab.
          </p>
        </Section>

        <Section title="Cost: installed and over 30 years">
          <CostTable
            currency="USD"
            rows={[
              { item: "Asphalt — installed (3 in over 6 in base)", unit: "ft²", low: 2.5, high: 5 },
              { item: "Concrete — installed (4–5 in slab)", unit: "ft²", low: 7, high: 12 },
              { item: "Asphalt sealcoat (every 3–5 yrs)", unit: "ft²", low: 0.2, high: 0.45 },
              { item: "Asphalt overlay (~yr 15–20)", unit: "ft²", low: 3, high: 5 },
              { item: "Concrete joint reseal (~yr 10)", unit: "ft²", low: 0.15, high: 0.3 },
              { item: "Concrete panel repair (as needed)", unit: "ft²", low: 8, high: 15, note: "Full-depth replacement of failed panels" },
            ]}
            caption="US national ranges, mid-2026. Asphalt front-loads less capital but commits you to a maintenance schedule; concrete is the opposite trade."
          />
          <BarChart
            title="30-year cost of ownership, 600 ft² driveway"
            unit="USD"
            monochrome={false}
            data={[
              { label: "Asphalt: install + 6 sealcoats + 1 overlay", value: 8300, color: "var(--chart-1)" },
              { label: "Concrete: install + resealing + minor repair", value: 7400, color: "var(--chart-3)" },
            ]}
          />
          <p className="text-muted-foreground">
            Over 30 years the totals nearly converge — concrete edges ahead around year
            18–22 as asphalt&apos;s recurring maintenance accumulates. The practical readings:
            selling within ten years favors asphalt&apos;s low entry price; owning for decades
            makes the choice about climate and preference, not money.
          </p>
        </Section>

        <Section title="Strengths and weaknesses of each">
          <ProsCons
            subject="Asphalt"
            pros={[
              "Half the installed cost of concrete, or better",
              "Drivable within 2–3 days of paving",
              "Flexes over frost heave; unaffected by de-icing salt",
              "Repairs and overlays blend in — renewal is built into the system",
            ]}
            cons={[
              "Sealcoating every 3–5 years, for the life of the pavement",
              "Softens and ruts in sustained heat",
              "15–25 year life; plan the overlay around year 15–20",
              "Fuel and oil drips dissolve the binder",
            ]}
          />
          <ProsCons
            subject="Concrete"
            pros={[
              "30–40 year service life with minimal upkeep",
              "Indifferent to heat; no rutting under point loads",
              "Stamped, colored and exposed finish options",
              "Lower lifetime maintenance effort",
            ]}
            cons={[
              "2–3× the upfront cost",
              "7-day wait before vehicle use",
              "Salt scaling risk in the first winters",
              "Repairs are conspicuous; no equivalent of an overlay",
            ]}
          />
        </Section>

        <Section title="When asphalt is the right call">
          <p className="text-muted-foreground">
            Choose asphalt when the climate freezes, the budget is upfront-constrained, the
            ownership horizon is under ~15 years, or the pavement will one day be trenched
            for utilities (patches disappear under sealcoat). Choose concrete for hot
            climates, decorative finishes, or a set-and-forget 30-year hold. Either way the
            base layer decides more than the surface material — 6 in of properly compacted
            aggregate under a budget surface outlasts a premium surface on mud, every time.
          </p>
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Asphalt won? Price the job."
          description="Area, thickness and your local per-ton quote in — material budget out."
          href={ASPHALT.cost}
          buttonLabel="Asphalt Cost Calculator"
        />

        <RelatedArticles
          title="Keep researching"
          variant="list"
          items={[
            ...pickLinks(drivewayGuideLinks, ASPHALT.drivewayCost, ASPHALT.drivewayLifespan),
            ...pickConcrete(concreteGuides, CONCRETE.vsAsphalt),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
