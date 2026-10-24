import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { Section } from "@/components/blocks/section";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, drivewayGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import {
  BAND_UNDER_500,
  BAND_500_1000,
  bandRangePerSqFt,
  bandTotal,
} from "@/data/pricing";
import type { FaqItem } from "@/types";

const title = "Asphalt Driveway FAQs: Curing and Sealing";
const description =
  "Walk on new asphalt after 24 hours, drive on it after 2–3 days and seal it after 6–12 months. 12 straight answers on curing, cracks, plowing and replacement.";
const path = ASPHALT.drivewayFaqs;
const author = getAuthor("materials-team");
const modified = "2026-10-24";

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
  modifiedTime: modified,
});

const newDrivewayFaqs: FaqItem[] = [
  {
    question: "What is the difference between asphalt setting and curing?",
    answer:
      "Setting is cooling: hot mix arrives around 300°F and hardens as it drops to ambient over 24–72 hours, which is when you can use it. Curing is chemical: the binder oxidizes and stiffens over 6–12 months. A set driveway carries a car; a cured one resists scuffing and gouging. The first-year care rules exist because of that gap.",
  },
  {
    question: "When can I drive and park on a new asphalt driveway?",
    answer:
      "You can drive on a new asphalt driveway after 2–3 days in moderate weather, and longer in a heat wave, when the mat holds heat and stays tender. Parking is the stricter test: for the first few weeks vary the parking spot, and avoid dry-steering (turning the wheel while stopped), which twists divots into a soft surface. Foot traffic is fine after 24 hours.",
  },
  {
    question: "Why is my new driveway soft in its first summer?",
    answer:
      "A new driveway is soft in its first summer because the binder has not cured yet. Uncured asphalt still carries light oils, and on a 95°F day the surface can reach 140°F+ and soften noticeably. Expect faint tire marks and stay alert with point loads such as jack stands, trailer tongues and ladders. It stiffens permanently as the binder oxidizes; by the second summer the same driveway shrugs off what marked it in the first.",
  },
  {
    question: "Will a motorcycle kickstand damage new asphalt?",
    answer:
      "Yes. A side stand concentrates 250+ lb onto roughly one square inch, and on a warm first-season surface it will sink and leave a permanent divot. Put a puck, kickstand plate or even a flattened can under the stand for at least the first year. The same physics applies to trailer jacks, RV stabilizers and pointed furniture legs.",
  },
  {
    question: "How soon should a new driveway be sealed?",
    answer:
      "Seal a new driveway no sooner than 6–12 months after paving, with one full summer as the minimum. Sealing earlier traps the uncured oils and leaves the pavement permanently soft and scuff-prone. The first sealcoat belongs at 1–2 years, then every 3–5 years after at $0.20–0.45 per square foot. If a contractor offers to seal the driveway they just paved as a package deal, decline.",
  },
  {
    question: "Why do driveways crack along the edges first?",
    answer:
      "Driveways crack at the edges first because edges are the only part of the pavement with support on just one side. If the asphalt was not tamped at a 45° angle and backfilled with compacted topsoil, the edge stands unsupported and snaps off under any tire that wanders near it. Keep vehicles 6 in off the edges, backfill any gap that opens, and consider edge restraint where turning traffic is unavoidable.",
  },
];

const livingWithItFaqs: FaqItem[] = [
  {
    question: "How do I stop weeds and grass growing at the driveway edges?",
    answer:
      "Stop edge weeds by keeping the asphalt-to-soil seam closed and maintained, because vegetation exploits the seam where asphalt meets soil, and roots physically pry the edge apart. Maintain a mowed or mulched border, spot-treat shoots at the seam before they establish, and fill any edge gap with compacted soil so there is no open joint to colonize. Weeds coming up through mid-surface cracks are a signal those cracks are past due for filler.",
  },
  {
    question: "My driveway ponds water after rain: how bad is that?",
    answer:
      "It is worth fixing if puddles deeper than about 1/4 in persist an hour after rain. Standing water accelerates oxidation, feeds any crack it touches, and in winter becomes an ice patch that concentrates freeze-thaw damage in one spot. Small birdbaths can be leveled with a thin patch; recurring ponds along the edges usually mean regrading the shoulder drainage.",
  },
  {
    question: "Can an RV or loaded truck park on a residential driveway?",
    answer:
      "Occasionally, yes; permanently, it depends on the section. A standard 3 in driveway over a 6 in base is designed around passenger vehicles, and a 15,000 lb motorhome parked in one spot all season can rut it, especially in summer heat. If heavy vehicles are part of the plan, build for it: 4 in of asphalt over an 8 in base, and plywood pads under jacks regardless.",
  },
  {
    question: "How should a plow be set up for an asphalt driveway?",
    answer:
      "Run the blade with shoes or skids set about 1/2 in above the surface. Steel edges dropped to the pavement will gouge a summer-softened repair, catch raised crack filler, and scalp any high spot. Mark the edges with stakes before the first storm; the lawn-and-edge damage from a blind plow pass is the most common winter repair we see. Plastic shovels are kinder than steel for hand work.",
  },
  {
    question: "Should I resurface or replace my asphalt driveway?",
    answer:
      "Resurface if the base is sound and replace if it has failed; the pattern of cracking, not the amount, tells you which. Scattered block or linear cracks on a firm surface mean the base is sound: a 2 in overlay at $3–5 per square foot resets the clock for 10–12 years. Alligator cracking, ruts or spots that flex underfoot mean the base has failed, and an overlay reprints the damage within 2–3 years, so replacement is the honest fix.",
  },
  {
    question: "What does it cost to redo an asphalt driveway?",
    answer:
      `Redoing an asphalt driveway costs the new-build price plus $1–3 per square foot for removal and hauling: ${bandRangePerSqFt(BAND_500_1000)} installed for a 500–1,000 ft² drive, and more per square foot on anything smaller. A 12 × 40 ft single drive (${bandTotal(BAND_UNDER_500, 480)} new) comes to roughly $5,000–7,150 with demolition. An overlay, where the base qualifies, runs roughly half that. Get the base assessed before accepting either quote; it is the variable that decides which job you actually need.`,
  },
];

export default function DrivewayFaqsPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Asphalt",
          datePublished: "2026-07-15",
          dateModified: modified,
          author,
        })}
      />
      <ArticleShell
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Driveway FAQ"
              variant="standard"
              title="Asphalt driveway FAQs"
              description="Twelve questions that fill our inbox every paving season, answered with numbers, not reassurance. Split into the new-driveway phase and the 20 years after."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Driveway FAQs", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <QuickAnswer
          question="How long before you can drive on a new asphalt driveway?"
          answer="You can walk on a new asphalt driveway after 24 hours and drive on it after 2–3 days in moderate weather, longer in a heat wave. The surface keeps curing for 6–12 months, so vary where you park, avoid turning the wheel while stopped, and wait at least 6–12 months before the first sealcoat."
          ruleOfThumb="24 hours to walk, 2–3 days to drive, 6–12 months to seal."
        />

        <Section title="New driveways">
          <p className="text-muted-foreground">
            The first year is the vulnerable one, because the mix has set but not cured. Most of
            these answers trace back to that distinction. If you are still at the planning
            stage, start with the{" "}
            <a href={ASPHALT.driveway} className="font-medium text-primary hover:underline">
              driveway calculator
            </a>{" "}
            for tonnage and the{" "}
            <a href={ASPHALT.drivewayThickness} className="font-medium text-primary hover:underline">
              thickness guide
            </a>{" "}
            for the 2-vs-3-vs-4 inch decision.
          </p>
          <Faq items={newDrivewayFaqs} variant="list" title="First-year questions" />
        </Section>

        <Section title="Living with it">
          <p className="text-muted-foreground">
            After year one, the questions shift from protection to upkeep. The{" "}
            <a href={ASPHALT.drivewayMaintenance} className="font-medium text-primary hover:underline">
              maintenance guide
            </a>{" "}
            has the full schedule and prices; the{" "}
            <a href={ASPHALT.drivewayCost} className="font-medium text-primary hover:underline">
              cost guide
            </a>{" "}
            covers what repairs and rebuilds run in 2026.
          </p>
          <Faq
            items={livingWithItFaqs}
            variant="list"
            title="Ownership questions"
            withSchema={false}
          />
        </Section>

        <Cta
          variant="banner"
          title="Planning a new driveway?"
          description="The driveway calculator sizes the hot mix and the gravel base underneath in one pass."
          href={ASPHALT.driveway}
          buttonLabel="Driveway Calculator"
        />

        <RelatedArticles
          title="The full driveway series"
          variant="cards"
          items={pickLinks(
            drivewayGuideLinks,
            ASPHALT.drivewayDimensions,
            ASPHALT.drivewayThickness,
            ASPHALT.drivewayInstall,
            ASPHALT.drivewayCost,
            ASPHALT.drivewayMaintenance,
            ASPHALT.drivewayLifespan,
          )}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified={modified} />

        <References items={[AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
