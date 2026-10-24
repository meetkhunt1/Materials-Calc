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
import { ASPHALT, weightGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Weight FAQs: Tons, Trucks and Tickets";
const description =
  "Asphalt weighs 12 lb per ft² per inch, so a 600 ft² driveway at 3 in is about 10.8 tons. 12 numeric answers on loose yards, trucks, tickets and millings.";
const path = ASPHALT.weightFaqs;
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

const orderingFaqs: FaqItem[] = [
  {
    question: "How much does a loose cubic yard of asphalt weigh?",
    answer:
      "A loose cubic yard of hot mix in the truck bed weighs about 3,155 lb (1.58 US tons), because the mix fluffs roughly 25% before rolling. The same yard compacted weighs 3,915 lb (1.96 tons) at the standard 145 lb/ft³ density. When anyone quotes you a 'yard' of asphalt, confirm whether they mean loose or compacted before converting.",
  },
  {
    question: "How much does a 2-inch asphalt overlay weigh?",
    answer:
      "A 2-inch asphalt overlay weighs about 24 lb per square foot, from 12 lb per square foot per inch of compacted thickness. A 3-inch driveway lift is 36 lb/ft² and a 4-inch commercial section 48 lb/ft². Multiply your area in square feet by inches of thickness by 12 and you have the order weight in pounds; divide by 2,000 for US tons.",
  },
  {
    question: "How many tons of asphalt does a typical driveway take?",
    answer:
      "A typical 600 ft² single-car driveway takes about 10.8 US tons of asphalt at 3 inches compacted (600 × 36 = 21,600 lb), roughly one loaded tandem. A 1,200 ft² double runs about 21.6 tons plus base. Add 5% waste and round up to the plant's sale increment before ordering.",
  },
  {
    question: "Why does an 80-tonne quote become 88 tons on a US invoice?",
    answer:
      "Because a metric tonne is 10.2% heavier than a US ton: multiply tonnes by 1.102 to get US tons, so an 80-tonne quote is 88.2 US tons. Going the other way, US tons × 0.907 = tonnes. The two units differ by 10.2% (1 US ton is 2,000 lb while a metric tonne is 2,204.6 lb), which is far more than any waste allowance, so never treat them as interchangeable.",
  },
  {
    question: "How do I check a scale ticket?",
    answer:
      "Check that net weight equals gross (loaded truck) minus tare (empty truck), both printed on the ticket. Sanity-check it against your takeoff: compacted cubic yards × 1.96 should land within a few percent of the summed net weights across all loads. A ticket that implies far more tonnage than your geometry allows deserves a phone call before payment.",
  },
  {
    question: "Does rain change the weight of asphalt?",
    answer:
      "Only marginally. A well-compacted mat at 7–8% air voids absorbs very little water, so the weight change is a fraction of a percent and you will never see it on an order or a scale ticket. Drainage matters far more than absorption: standing water degrades the pavement through stripping and freeze-thaw, not through added weight.",
  },
];

const haulingFaqs: FaqItem[] = [
  {
    question: "How many truckloads of asphalt does a driveway need?",
    answer:
      "A typical 600 ft² driveway at 3 inches (about 10.8 tons, or 11.4 with waste) needs one tandem load, since a tandem legally carries 13–15 tons. A 1,200 ft² double at about 21.6 tons needs two tandems or one end dump. Divide total tons by the truck's legal payload and round up.",
  },
  {
    question: "Can I haul asphalt in a pickup?",
    answer:
      "Only a little. A half-ton pickup's real payload is roughly 1,500–2,000 lb, which at 117 lb/ft³ loose is only 13–17 ft³, about half a cubic yard, enough for modest patching. Overloading is the common failure: a heaped 8-ft bed would hold over 4,000 lb of mix. Weigh cheap trailer rental against two trips.",
  },
  {
    question: "How much do asphalt millings weigh?",
    answer:
      "Asphalt millings weigh about 103 lb/ft³ loose (2,780 lb per cubic yard) and 122 lb/ft³ once compacted (3,290 lb/yd³). So a tandem load of 14 loose cubic yards of millings is roughly 19.5 tons, over its legal payload, which is why milling trucks run visibly short of full. Plan millings hauls by weight, not by bed volume.",
  },
  {
    question: "How much does demolished asphalt weigh for disposal?",
    answer:
      "Demolished asphalt weighs the same as it did in place: square feet × inches of thickness × 12 lb. A 600 ft² driveway at 3 inches is about 10.8 tons of debris regardless of how it breaks. Broken material bulks roughly 25% or more in volume, so it needs more truck space, but tipping fees are charged on the unchanged tonnage.",
  },
  {
    question: "What happens if a truck runs overweight?",
    answer:
      "An overweight truck faces fines and can be grounded. The federal cap is 80,000 lb gross with per-axle limits under the bridge formula; states enforce with fixed and portable scales. Fines scale per pound over and reach thousands of dollars, the load can be grounded until legalized, and citations follow both the hauler and the project. The exposure lands on whoever loaded the truck as well as whoever drove it.",
  },
  {
    question: "How accurate are plant weighbridges?",
    answer:
      "Certified legal-for-trade truck scales are typically accurate to about 0.1% (20–40 lb on a 20-ton load) and are inspected on a government schedule. Real discrepancies almost always trace to tare, not the scale: mud, snow or leftover material in the bed inflates the tare weight and quietly shorts the net. Insist on a fresh tare if the bed was not clean.",
  },
];

export default function AsphaltWeightFaqsPage() {
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
              eyebrow="Asphalt · FAQ"
              variant="standard"
              title="Asphalt weight FAQs"
              description="Twelve questions, twelve numeric answers. Everything here derives from a handful of constants: 145 lb/ft³ compacted, 1.96 tons per cubic yard, 12 lb per square foot per inch, and the legal payloads of the trucks that carry it."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Weight FAQs", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <QuickAnswer
          question="How do you convert asphalt volume to weight?"
          answer="Multiply compacted cubic feet by 145 lb, or compacted cubic yards by 1.96 US tons, to get the weight of hot mix asphalt. For flat work, a quicker route is 12 lb per square foot per inch of thickness, so a 600 ft² driveway at 3 inches weighs about 21,600 lb, or 10.8 tons."
          ruleOfThumb="12 lb per ft² per inch; 1.96 tons per compacted yard."
          formula="Tons = ft² × inches × 12 ÷ 2,000"
        />

        <Section title="Ordering by weight">
          <p className="text-muted-foreground">
            Asphalt is ordered by weight, so these answers convert between what you measure
            and what you buy. For the full
            unit-weight tables behind them, see the{" "}
            <a href={ASPHALT.weightChart} className="font-medium text-primary hover:underline">
              asphalt weight chart
            </a>
            ; for the volume-to-tons factor in detail, see{" "}
            <a href={ASPHALT.tonsVsYards} className="font-medium text-primary hover:underline">
              tons vs cubic yards
            </a>
            . To run your own dimensions, the{" "}
            <a href={ASPHALT.weight} className="font-medium text-primary hover:underline">
              asphalt weight calculator
            </a>{" "}
            applies these constants automatically.
          </p>
          <Faq items={orderingFaqs} variant="list" title="Ordering questions" />
        </Section>

        <Section title="Hauling & disposal">
          <p className="text-muted-foreground">
            Truck payload, not bed volume, sets how much asphalt each load can carry.
            This section covers weight limits, truck payloads and demolition tonnage. Truck classes and load
            planning get a full treatment in the{" "}
            <a href={ASPHALT.truckCapacity} className="font-medium text-primary hover:underline">
              truck load capacity guide
            </a>
            .
          </p>
          <Faq items={haulingFaqs} variant="list" title="Hauling questions" withSchema={false} />
        </Section>

        <RelatedArticles
          title="The full weight series"
          variant="cards"
          items={pickLinks(
            weightGuideLinks,
            ASPHALT.weightChart,
            ASPHALT.tonsVsYards,
            ASPHALT.weightConversion,
            ASPHALT.truckCapacity,
            ASPHALT.hotVsColdWeight,
          )}
        />

        <Cta
          variant="banner"
          title="Stop estimating and calculate"
          description="Length, width, thickness in; pounds, tons and tonnes out, at the correct density for your material."
          href={ASPHALT.weight}
          buttonLabel="Asphalt Weight Calculator"
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified={modified} />

        <References items={[AREFS.ms4, AREFS.astmD2726]} />
      </ArticleShell>
    </>
  );
}
