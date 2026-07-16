import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { InfoBlock } from "@/components/blocks/callout";
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
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import {
  ASPHALT,
  coreGuideLinks as asphaltCoreGuides,
  asphaltCalculatorLinks,
  drivewayGuideLinks as asphaltDrivewayGuides,
  pickLinks as pickAsphalt,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Concrete vs Asphalt — Cost, Lifespan & Maintenance Compared";
const description =
  "A driveway-focused comparison of concrete and asphalt: installed cost, 30-year total cost of ownership, climate performance, maintenance schedules and when each wins.";
const path = CONCRETE.vsAsphalt;
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
    question: "Which is cheaper, concrete or asphalt?",
    answer:
      "Asphalt wins on day one: $5–8/ft² installed versus $7–12 for concrete. Over 30 years the gap closes or reverses — asphalt needs sealcoating every 3–5 years and typically a full overlay around year 15–20, while concrete usually reaches year 30 on joint sealing and occasional panel repairs.",
  },
  {
    question: "Which lasts longer?",
    answer:
      "Concrete: 30–40 years is routine for a properly built residential drive, versus 15–25 for asphalt. Both numbers collapse without a compacted base — the material argument is moot on bad subgrade.",
  },
  {
    question: "Which is better in cold climates?",
    answer:
      "Asphalt tolerates freeze-thaw movement better and its dark surface melts snow faster; road salt doesn't chemically attack it. Concrete handles cold fine if it's air-entrained and you skip salt the first winter — but bargain-mix concrete in salt country scales visibly within a few seasons.",
  },
  {
    question: "Which is better in hot climates?",
    answer:
      "Concrete, clearly. Asphalt softens above ~120°F surface temperature (a sunny 95°F day), rutting under parked tires, and its blacktop runs 20–30°F hotter than concrete. Southern US driveways are overwhelmingly concrete for this reason.",
  },
  {
    question: "Can you pave asphalt over concrete or vice versa?",
    answer:
      "Asphalt over sound concrete is common (mind the joints reflecting through). Concrete over asphalt — 'whitetopping' — is a real technique at 4+ inches. Both beat full demolition when the existing slab is stable; neither fixes a failed base.",
  },
];

const toc = tocFromTitles(
  "The 60-second verdict",
  "Cost comparison, installed and lifetime",
  "Head-to-head specification table",
  "Strengths and weaknesses of each",
  "Climate is the tiebreaker",
);

export default function ConcreteVsAsphaltPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Concrete",
          datePublished: "2026-07-15",
          author,
          keywords: ["concrete vs asphalt", "driveway comparison", "paving cost"],
        })}
      />
      <ArticleShell
        tocPosition="toc-left"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Concrete · Comparison"
              variant="standard"
              title="Concrete vs asphalt"
              description="Both are excellent pavements installed well and disappointments installed badly. This comparison sticks to measurable differences — cost per square foot, service life, maintenance hours — and tells you when each one is the right call."
            >
              <AuthorBox author={author} datePublished="2026-07-15" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Concrete vs Asphalt", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Leaning concrete?"
            description="Get the slab volume and a realistic material budget in two minutes."
            href={CONCRETE.calculator}
            buttonLabel="Concrete Calculator"
          />
        }
      >
        <Section title="The 60-second verdict">
          <InfoBlock title="Skip to the answer">
            Hot climate, long ownership horizon, or you want stamped/colored finishes →
            concrete. Cold-salt climate, tight upfront budget, or resale within ten years →
            asphalt. Everything else is detail — and the details are below.
          </InfoBlock>
        </Section>

        <Section title="Cost comparison, installed and lifetime">
          <CostTable
            currency="USD"
            rows={[
              { item: "Asphalt — installed", unit: "ft²", low: 5, high: 8, note: "2–3 in lift on 6–8 in base" },
              { item: "Concrete — installed", unit: "ft²", low: 7, high: 12, note: "4–5 in slab, broom finish" },
              { item: "Concrete — decorative", unit: "ft²", low: 12, high: 22, note: "Stamped, exposed, colored" },
              { item: "Asphalt sealcoat (recurring)", unit: "ft²", low: 0.2, high: 0.45, note: "Every 3–5 years" },
              { item: "Asphalt overlay (~yr 15–20)", unit: "ft²", low: 3, high: 5 },
              { item: "Concrete joint reseal (~yr 10)", unit: "ft²", low: 0.15, high: 0.3 },
            ]}
            caption="US national ranges, mid-2026, typical residential driveways. Regional labor swings these ±25%."
          />
          <BarChart
            title="30-year cost of ownership, 600 ft² driveway"
            unit="USD"
            monochrome={false}
            data={[
              { label: "Asphalt: install + 6 sealcoats + 1 overlay", value: 8300, color: "var(--chart-3)" },
              { label: "Concrete: install + resealing + minor repair", value: 7400, color: "var(--chart-1)" },
            ]}
          />
          <p className="text-muted-foreground">
            The lifetime chart surprises people: asphalt&apos;s recurring maintenance quietly
            overtakes concrete&apos;s higher day-one price somewhere around year 18–22. Current
            per-yard concrete pricing behind that estimate is in the{" "}
            <a href={CONCRETE.cost} className="font-medium text-primary hover:underline">
              cost guide
            </a>
            .
          </p>
        </Section>

        <Section title="Head-to-head specification table">
          <ComparisonTable
            columns={[
              { key: "concrete", label: "Concrete", highlight: true },
              { key: "asphalt", label: "Asphalt" },
            ]}
            rows={[
              { feature: "Service life (residential)", values: { concrete: "30–40 years", asphalt: "15–25 years" } },
              { feature: "Cure / usable", values: { concrete: "7 days to drive", asphalt: "2–3 days" } },
              { feature: "Maintenance cycle", values: { concrete: "Joint seal ~10 yrs", asphalt: "Sealcoat 3–5 yrs, overlay ~yr 15" } },
              { feature: "Hot-climate behavior", values: { concrete: "Stable; stays cooler", asphalt: "Softens, ruts, tracks" } },
              { feature: "Cold-climate behavior", values: { concrete: "Needs air-entrainment; salt-sensitive early", asphalt: "Flexible; salt-tolerant" } },
              { feature: "Repairs", values: { concrete: "Panel replacement — visible", asphalt: "Patch + sealcoat — blends in" } },
              { feature: "Finish options", values: { concrete: "Broom, stamped, colored, exposed", asphalt: "Black. That's the option." } },
              { feature: "Load capacity (equal base)", values: { concrete: "Rigid — spreads loads", asphalt: "Flexible — rutting under point loads" } },
            ]}
            caption="Typical residential performance; commercial designs change the numbers but rarely the direction."
          />
        </Section>

        <Section title="Strengths and weaknesses of each">
          <ProsCons
            subject="Concrete"
            pros={[
              "Longest service life of any residential pavement",
              "Handles heat, point loads and heavy vehicles without rutting",
              "Wide finish palette — stamped and colored options",
              "Lower lifetime maintenance cost and effort",
            ]}
            cons={[
              "25–50% higher installed cost",
              "7-day wait before vehicle use",
              "Early-age salt exposure causes surface scaling",
              "Repairs are conspicuous; cracks can't be 'sealed black'",
            ]}
          />
          <ProsCons
            subject="Asphalt"
            pros={[
              "Lowest upfront cost and fastest installation",
              "Usable within days; repairs blend invisibly",
              "Flexible over frost heave; unaffected by de-icing salt",
              "Dark surface accelerates snow melt",
            ]}
            cons={[
              "Sealcoating every 3–5 years, forever",
              "Softens and ruts in hot sun",
              "Full overlay typically needed by year 15–20",
              "Oil and fuel drips dissolve the binder",
            ]}
          />
        </Section>

        <Section title="Climate is the tiebreaker">
          <p className="text-muted-foreground">
            Material physics decides the marginal cases. Asphalt is a viscoelastic material —
            it flexes with freeze-thaw ground movement but flows under heat. Concrete is rigid
            — indifferent to heat but dependent on air-entrained mix design (and a salt-free
            first winter) in freezing climates. Map your climate onto that sentence and the
            decision usually makes itself. If concrete wins yours, the{" "}
            <a href={CONCRETE.slab} className="font-medium text-primary hover:underline">
              slab calculator
            </a>{" "}
            will size the pour, and the{" "}
            <a href={CONCRETE.curing} className="font-medium text-primary hover:underline">
              curing guide
            </a>{" "}
            covers that critical first week.
          </p>
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Concrete won? Price the slab."
          description="Volume, bags and weight for your exact dimensions — then take the number to your contractor."
          href={CONCRETE.calculator}
          buttonLabel="Open the Concrete Calculator"
        />

        <RelatedArticles
          title="Keep researching"
          variant="list"
          items={[
            ...pickLinks(guideLinks, CONCRETE.cost, CONCRETE.curing, CONCRETE.coverage),
            ...pickLinks(calculatorLinks, CONCRETE.slab),
          ]}
        />

        <RelatedArticles
          title="The same comparison, from asphalt's corner"
          variant="inline-strip"
          items={[
            ...pickAsphalt(asphaltCoreGuides, ASPHALT.vsConcrete),
            ...pickAsphalt(asphaltCalculatorLinks, ASPHALT.calculator),
            ...pickAsphalt(asphaltDrivewayGuides, ASPHALT.drivewayCost),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[REFS.pca, REFS.aci318]} />
      </ArticleShell>
    </>
  );
}
