import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
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

const title = "Asphalt Weight FAQs";
const description =
  "Quick, numeric answers to the asphalt weight questions that come up on every job: pounds per yard and square foot, truck loads, scale tickets, millings, demolition tonnage and unit conversions.";
const path = ASPHALT.weightFaqs;
const author = getAuthor("materials-team");

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
});

const orderingFaqs: FaqItem[] = [
  {
    question: "How much does a cubic yard of asphalt weigh?",
    answer:
      "3,915 lb compacted — 1.96 US tons, from the standard 145 lb/ft³ density. Loose in the truck bed the same material runs about 3,155 lb per cubic yard because it fluffs roughly 25% before rolling. When anyone quotes you a 'yard' of asphalt, confirm whether they mean loose or compacted before converting.",
  },
  {
    question: "How much does asphalt weigh per square foot?",
    answer:
      "12 lb per square foot per inch of compacted thickness. A 2-inch overlay is 24 lb/ft², a 3-inch driveway lift 36 lb/ft², a 4-inch commercial section 48 lb/ft². Multiply your area in square feet by inches of thickness by 12 and you have the order weight in pounds; divide by 2,000 for US tons.",
  },
  {
    question: "How many tons of asphalt does a typical driveway take?",
    answer:
      "A 600 ft² single-car driveway at 3 inches compacted is 600 × 36 = 21,600 lb — about 10.8 US tons, or roughly one loaded tandem. A 1,200 ft² double runs about 21.6 tons plus base. Add 5% waste and round up to the plant's sale increment before ordering.",
  },
  {
    question: "How do I convert a quote in tonnes to US tons?",
    answer:
      "Multiply tonnes by 1.102: an 80-tonne quote is 88.2 US tons. Going the other way, US tons × 0.907 = tonnes. The two units differ by 10.2% — 1 US ton is 2,000 lb while a metric tonne is 2,204.6 lb — which is far more than any waste allowance, so never treat them as interchangeable.",
  },
  {
    question: "How do I check a scale ticket?",
    answer:
      "Net weight = gross (loaded truck) minus tare (empty truck), both printed on the ticket. Sanity-check it against your takeoff: compacted cubic yards × 1.96 should land within a few percent of the summed net weights across all loads. A ticket that implies far more tonnage than your geometry allows deserves a phone call before payment.",
  },
  {
    question: "Does rain change the weight of asphalt?",
    answer:
      "Marginally. A well-compacted mat at 7–8% air voids absorbs very little water, so the weight change is a fraction of a percent — you will never see it on an order or a scale ticket. Drainage matters far more than absorption: standing water degrades the pavement through stripping and freeze-thaw, not through added weight.",
  },
];

const haulingFaqs: FaqItem[] = [
  {
    question: "How many tons of asphalt fit in a dump truck?",
    answer:
      "By legal payload: single axle 6–8 US tons, tandem 13–15, tri-axle 16–19, quad or quint 19–26, semi end dump 23–25, super dump up to 26. Asphalt is dense enough that trucks reach axle-weight limits well before their beds are volumetrically full, so payload — not bed size — is the planning number.",
  },
  {
    question: "Can I haul asphalt in a pickup?",
    answer:
      "A little. A half-ton pickup's real payload is roughly 1,500–2,000 lb, which at 117 lb/ft³ loose is only 13–17 ft³ — about half a cubic yard, enough for modest patching. Overloading is the common failure: a heaped 8-ft bed would hold over 4,000 lb of mix. Weigh cheap trailer rental against two trips.",
  },
  {
    question: "How much do asphalt millings weigh?",
    answer:
      "About 103 lb/ft³ loose (2,780 lb per cubic yard) and 122 lb/ft³ once compacted (3,290 lb/yd³). So a tandem load of 14 loose cubic yards of millings is roughly 19.5 tons — over its legal payload — which is why milling trucks run visibly short of full. Plan millings hauls by weight, not by bed volume.",
  },
  {
    question: "How much does demolished asphalt weigh for disposal?",
    answer:
      "Weigh it in place first: square feet × inches of thickness × 12 lb. A 600 ft² driveway at 3 inches is about 10.8 tons of debris regardless of how it breaks. Broken material bulks roughly 25% or more in volume, so it needs more truck space, but tipping fees are charged on the unchanged tonnage.",
  },
  {
    question: "What happens if a truck runs overweight?",
    answer:
      "The federal cap is 80,000 lb gross with per-axle limits under the bridge formula; states enforce with fixed and portable scales. Fines scale per pound over and reach thousands of dollars, the load can be grounded until legalized, and citations follow both the hauler and the project. The exposure lands on whoever loaded the truck as well as whoever drove it.",
  },
  {
    question: "How accurate are plant weighbridges?",
    answer:
      "Certified legal-for-trade truck scales are typically accurate to about 0.1% — 20–40 lb on a 20-ton load — and are inspected on a government schedule. Real discrepancies almost always trace to tare, not the scale: mud, snow or leftover material in the bed inflates the tare weight and quietly shorts the net. Insist on a fresh tare if the bed was not clean.",
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
              description="Twelve questions, twelve numeric answers. Everything here derives from a handful of constants: 145 lb/ft³ compacted, 1.96 tons per cubic yard, 12 lb per square foot per inch — and the legal payloads of the trucks that carry it."
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
        <Section title="Ordering by weight">
          <p className="text-muted-foreground">
            These answers convert between what you measure and what you buy. For the full
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
            Weight limits, truck payloads and demolition tonnage. Truck classes and load
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
            ASPHALT.densityExplained,
            ASPHALT.weightConversion,
            ASPHALT.truckCapacity,
            ASPHALT.hotVsColdWeight,
          )}
        />

        <Cta
          variant="banner"
          title="Stop estimating — calculate"
          description="Length, width, thickness in; pounds, tons and tonnes out, at the correct density for your material."
          href={ASPHALT.weight}
          buttonLabel="Asphalt Weight Calculator"
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4, AREFS.astmD2726]} />
      </ArticleShell>
    </>
  );
}
