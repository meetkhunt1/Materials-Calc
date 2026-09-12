import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
import { ProsCons } from "@/components/blocks/pros-cons";
import { ComparisonTable } from "@/components/tables/comparison-table";
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
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import {
  ASPHALT,
  coreGuideLinks as asphaltCoreGuides,
  asphaltCalculatorLinks,
  drivewayGuideLinks as asphaltDrivewayGuides,
  pickLinks as pickAsphalt,
} from "@/content/asphalt/links";
import { BAND_500_1000, RECURRING_RATES, bandRangePerSqFt } from "@/data/pricing";
import type { FaqItem } from "@/types";

const title = "Concrete vs Asphalt — Cost & Lifespan";
const description =
  "A driveway-focused comparison of concrete and asphalt: service life, climate performance, maintenance schedules, repairability and when each one wins — plus what asphalt actually costs to install and own for 30 years.";
/**
 * 30-year ownership, worked for a 600 ft² driveway. Only the asphalt side is
 * computable: its install cost comes from a derived band and its maintenance
 * rates are stated consistently sitewide. There is no defensible per-ft²
 * concrete install figure yet, so the head-to-head chart this page used to
 * carry has been removed rather than rebuilt on a guess.
 */
const AREA_SQFT = 600;
const SEALCOAT_CYCLES = 6;
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const installLow = BAND_500_1000.low * AREA_SQFT;
const installHigh = BAND_500_1000.high * AREA_SQFT;
const sealLow = RECURRING_RATES.sealcoat.low * AREA_SQFT * SEALCOAT_CYCLES;
const sealHigh = RECURRING_RATES.sealcoat.high * AREA_SQFT * SEALCOAT_CYCLES;
const overlayLow = RECURRING_RATES.overlay.low * AREA_SQFT;
const overlayHigh = RECURRING_RATES.overlay.high * AREA_SQFT;
const asphalt30Low = installLow + sealLow + overlayLow;
const asphalt30High = installHigh + sealHigh + overlayHigh;

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
      `Asphalt wins on day one — a 500–1,000 ft² asphalt driveway installs at ${bandRangePerSqFt(BAND_500_1000)} all-in, and concrete costs meaningfully more. We are not putting a number on concrete: our per-square-foot concrete figures disagreed with each other and none were traceable to a source, so they have been withdrawn until we have one. What the asphalt side does show is that the day-one saving is not the whole story — over 30 years sealcoating every 3–5 years and an overlay around year 15–20 add roughly as much again, while concrete usually reaches year 30 on joint sealing and occasional panel repairs.`,
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
    question: "How soon can you drive on each?",
    answer:
      "Asphalt: 2–3 days after paving (longer in hot weather while the mat stays soft). Concrete: 7 days for vehicle loads while it builds strength, though foot traffic is fine after 24–48 hours. If the driveway is your only access and downtime is critical, asphalt's fast return to service is a genuine advantage.",
  },
  {
    question: "Can you pave asphalt over concrete or vice versa?",
    answer:
      "Asphalt over sound concrete is common — a 1.5–2 in overlay on a stable slab is cheap and quick, though the concrete joints will reflect through as hairline cracks within a couple of years; crews mitigate but rarely eliminate this. Concrete over asphalt — 'whitetopping' — is a real technique at 4+ inches. Both beat full demolition when the existing slab is stable; neither fixes a failed base.",
  },
];

const toc = tocFromTitles(
  "The 60-second verdict",
  "What each one costs to install and own",
  "Head-to-head specification table",
  "Strengths and weaknesses of each",
  "Climate is the tiebreaker",
  "When each one is the right call",
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
              description="Both are excellent pavements installed well and disappointments installed badly. This comparison sticks to measurable differences — service life, climate behavior, maintenance cycles and repairability — and tells you when each one is the right call."
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

        <Section title="What each one costs to install and own">
          <CostTable
            currency="USD"
            rows={[
              {
                item: "Asphalt — installed, 500–1,000 ft² drive",
                unit: "ft²",
                low: BAND_500_1000.low,
                high: BAND_500_1000.high,
                note: "All-in: excavation, base, 3 in mix, labor, mobilization",
              },
              {
                item: "Asphalt sealcoat (recurring)",
                unit: "ft²",
                low: RECURRING_RATES.sealcoat.low,
                high: RECURRING_RATES.sealcoat.high,
                note: "Every 3–5 years",
              },
              {
                item: "Asphalt overlay (~yr 15–20)",
                unit: "ft²",
                low: RECURRING_RATES.overlay.low,
                high: RECURRING_RATES.overlay.high,
              },
              { item: "Concrete joint reseal (~yr 10)", unit: "ft²", low: 0.15, high: 0.3 },
            ]}
            caption="Asphalt installed cost is derived from a driveway costed line by line in our driveway cost guide; maintenance rates are US national ranges for mid-2026. Concrete install and repair prices are deliberately absent — see below."
          />
          <WarningBlock title="We have withdrawn our concrete price per square foot">
            This page used to put concrete at $7–12/ft² installed. Elsewhere the same site
            said $6–10 and $8–15, none of the three traced to a source, and none were
            calculated from a worked job the way the asphalt figures are. Rather than pick the
            most plausible one and present it as fact, we have removed all three and will
            publish a concrete rate again when we have one we can show our working for. The
            non-price comparison below — service life, climate behavior, maintenance cycles,
            repairability — is unaffected.
          </WarningBlock>
          <p className="text-muted-foreground">
            Half of the 30-year picture can still be built. On a {AREA_SQFT} ft² driveway,
            asphalt costs {usd(installLow)}–{usd(installHigh)} to install, roughly{" "}
            {usd(sealLow)}–{usd(sealHigh)} across six sealcoat cycles, and{" "}
            {usd(overlayLow)}–{usd(overlayHigh)} for one overlay around year 15–20 — about{" "}
            {usd(asphalt30Low)}–{usd(asphalt30High)} over thirty years, of which maintenance
            is very roughly as much again as the original paving. That is the number worth
            carrying: asphalt&apos;s day-one saving is real, and so is the recurring bill that
            follows it.
          </p>
          <p className="text-muted-foreground">
            We are not publishing the other half. Comparing lifetime totals needs a concrete
            install price, and ours is withdrawn — so the head-to-head chart this section used
            to show has been removed rather than rebuilt around a guess. It previously claimed
            asphalt overtakes concrete somewhere around year 18–22; that conclusion rested
            entirely on the figures above, and we are not standing behind it until the concrete
            side is sourced. Per-cubic-yard concrete pricing, which is unaffected, is in the{" "}
            <a href={CONCRETE.cost} className="font-medium text-primary hover:underline">
              concrete cost guide
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
              { feature: "Renewal option", values: { concrete: "None short of replacement", asphalt: "Overlay restores to near-new" } },
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

        <Section title="When each one is the right call">
          <p className="text-muted-foreground">
            Choose asphalt when the climate freezes, the budget is upfront-constrained, the
            ownership horizon is under ~15 years, or the pavement will one day be trenched
            for utilities — patches disappear under the next sealcoat. Choose concrete for
            hot climates, decorative finishes, or a set-and-forget 30-year hold. Either way
            the base layer decides more than the surface material: 6 in of properly compacted
            aggregate under a budget surface outlasts a premium surface on mud, every time.
            If asphalt is winning your case, the{" "}
            <a href={ASPHALT.thickness} className="font-medium text-primary hover:underline">
              asphalt thickness guide
            </a>{" "}
            sets the lift depths and the{" "}
            <a href={ASPHALT.drivewayCost} className="font-medium text-primary hover:underline">
              driveway cost guide
            </a>{" "}
            prices the job line by line.
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
          title="If asphalt is winning your case"
          variant="inline-strip"
          items={[
            ...pickAsphalt(asphaltCoreGuides, ASPHALT.thickness),
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
