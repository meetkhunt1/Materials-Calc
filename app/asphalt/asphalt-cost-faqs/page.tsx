import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, costGuideLinks, pickLinks } from "@/content/asphalt/links";
import {
  BAND_UNDER_500,
  BAND_500_1000,
  bandRangePerSqFt,
  bandRangeShort,
  bandTotal,
  LARGE_JOB_GUIDANCE_SHORT,
} from "@/data/pricing";
import { CONCRETE } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Cost FAQs: 12 Paving Price Questions";
const description =
  `Hot mix asphalt costs $100–150 per ton and driveways run ${bandRangeShort(BAND_500_1000)} installed. Direct answers on deposits, overlays, millings, DIY and hidden fees.`;
const path = ASPHALT.costFaqs;
const author = getAuthor("materials-team");

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
  modifiedTime: "2026-10-24",
});

const faqItems: FaqItem[] = [
  {
    question: "What is the price of hot mix asphalt per ton?",
    answer:
      "Standard hot mix runs $100–150 per ton at the plant, with delivery adding $8–20 per ton depending on haul distance. Polymer-modified mixes run $15–30 more; millings cost $10–25 per ton. The liquid binder (about $600–700 per ton and 5–6% of mix weight) is what moves the price month to month, because it tracks crude oil.",
  },
  {
    question: "Does job size or thickness drive the price per square foot?",
    answer:
      `Job size, by far. All-in at 3 in compacted, a 500–1,000 ft² driveway runs ${bandRangePerSqFt(BAND_500_1000)} and a job under 500 ft² runs ${bandRangePerSqFt(BAND_UNDER_500)}, because mobilization dominates small jobs. Thickness moves the material term only, by about $0.75–1.10 per square foot per additional inch. For anything larger, ${LARGE_JOB_GUIDANCE_SHORT}.`,
  },
  {
    question: "How much does a whole asphalt driveway cost?",
    answer:
      `A single-car driveway around 600 square feet typically lands at ${bandTotal(BAND_500_1000, 600)} installed; a two-car at 1,200 square feet, $4,000–7,500. Add $0.50–1.50 per square foot for new gravel base and $1–2 per square foot if old pavement must be removed and hauled. Almost no full driveway prices below about $2,500, because the mobilization minimum of $1,500–3,000 sets the floor.`,
  },
  {
    question: "Why do my three quotes differ by thousands of dollars?",
    answer:
      "Usually scope, not greed. Check whether each bid states the same compacted thickness, includes base work, includes removal, and states tonnage. A quote at 2 inches on the existing base can legitimately be 40% under one at 3 inches with 6 inches of new gravel. Backlog also matters: a contractor with a full season prices to decline work, one with gaps prices to win it.",
  },
  {
    question: "How much deposit is normal for paving work?",
    answer:
      "10–30% is the industry norm, reasonably covering material commitment and scheduling. Treat a demand for 50% as a caution flag and 100% up front as a walk-away, because established contractors have plant credit and do not need your cash to buy mix. Deposits should be documented against a written contract with a start window, never handed over on a verbal same-week promise.",
  },
  {
    question: "When do I pay the balance?",
    answer:
      "On completion, after you have walked the job. It is reasonable to check edges, drainage flow, uniform texture, and thickness at a visible edge against the contract. Commercial work commonly runs 30-day terms with retainage; residential is typically same-day on completion. Never pay the final balance before the work is finished, whatever the discount offered for doing so.",
  },
  {
    question: "Is asphalt cheaper than concrete?",
    answer:
      `To install, yes: a 500–1,000 ft² asphalt driveway runs ${bandRangePerSqFt(BAND_500_1000)} all-in, and concrete costs meaningfully more. We are re-sourcing our concrete per-square-foot figures and will not quote a rate until we have one we can stand behind. Over 30 years the gap narrows: asphalt wants sealcoating every 3–5 years and an overlay around year 15–20, while concrete mostly wants joint sealing. Climate and use decide the winner more than the sticker.`,
  },
  {
    question: "What does an overlay cost versus full replacement?",
    answer:
      "An overlay runs $1.50–3.00 per square foot: 1.5 to 2 inches of new asphalt over structurally sound existing pavement. Full replacement runs $2.50–6.00 plus $1–2 for removal and disposal. The overlay is the bargain only if the base is sound: overlaying alligator-cracked pavement buys 3–5 years, not 15, because the failure reflects through from below.",
  },
  {
    question: "How much do asphalt millings cost?",
    answer:
      "$10–25 per ton picked up at the plant or milling site, plus trucking, which makes millings often the cheapest paving material available. Spread and compacted 3–4 inches thick, a 600 square foot pad needs roughly 10–12 tons: $150–300 in material against $1,400-plus for hot mix. The trade-off is a surface that never fully knits like new asphalt; it suits lanes and pads, not finished driveways.",
  },
  {
    question: "How much can I really save with DIY?",
    answer:
      "On hot-mix paving, close to nothing at driveway scale: material is only 40–50% of the installed price, and hot mix must be machine-placed and rolled to density inside a cooling window that hand work cannot meet. Realistic DIY savings live in the edges of the job (demolition, clearing, hauling, and cold-patch pothole repairs at $4–6 per 50 lb bag), worth a few hundred dollars, not a few thousand.",
  },
  {
    question: "Are there seasonal discounts or financing for paving?",
    answer:
      "Yes. Mid-to-late season is the discount window in most markets, when crews have schedule gaps and plants are still open; spring carries a demand premium. Real savings also come from piggybacking a crew already mobilized nearby. Many established contractors offer financing through third-party lenders at typical home-improvement rates; compare against a home-equity line before signing, and never let financing terms substitute for a written scope.",
  },
  {
    question: "What hidden fees should I ask about before signing?",
    answer:
      "Mobilization (is the $1,500–3,000 minimum inside the quote?), base work and grading, removal and disposal of existing pavement, permits, binder price-adjustment clauses on jobs scheduled months out, extra hand work for tight access or curves, and trucking surcharges for long plant hauls. A fixed-price written contract that names all of these is worth more than the lowest headline number.",
  },
];

export default function AsphaltCostFaqsPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Asphalt",
          datePublished: "2026-07-15",
          dateModified: "2026-10-24",
          author,
        })}
      />
      <ArticleShell
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Cost Series"
              variant="centered"
              title="Asphalt cost FAQs"
              description="Twelve questions, twelve numerate answers: per-ton prices, installed rates, deposits, overlays, millings and the fees that hide in quotes. No hedging, 2026 US figures throughout."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Cost FAQs", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <QuickAnswer
          question="How much does asphalt paving cost?"
          answer={`Asphalt paving costs about ${bandRangePerSqFt(BAND_500_1000)} installed for a 500–1,000 ft² driveway at 3 inches compacted, which puts a 600 ft² single-car driveway at ${bandTotal(BAND_500_1000, 600)}. The hot mix itself is $100–150 per ton at the plant, and most contractors charge a $1,500–3,000 mobilization minimum on any job.`}
          ruleOfThumb="Budget per square foot for installed work, per ton for material only."
        />

        <Faq items={faqItems} variant="accordion" title="The twelve questions" />

        <p className="text-muted-foreground">
          Every figure above is unpacked in the rest of the series: start with the{" "}
          <a href={ASPHALT.pricePerTon} className="font-medium text-primary hover:underline">
            price per ton guide
          </a>{" "}
          for material, the{" "}
          <a href={ASPHALT.costPerSqft} className="font-medium text-primary hover:underline">
            cost per square foot guide
          </a>{" "}
          for installed rates, and the{" "}
          <a href={ASPHALT.drivewayCost} className="font-medium text-primary hover:underline">
            driveway cost guide
          </a>{" "}
          for full-project line items. Weighing materials? The{" "}
          <a href={CONCRETE.vsAsphalt} className="font-medium text-primary hover:underline">
            concrete vs asphalt comparison
          </a>{" "}
          puts installed cost, lifespan and maintenance for both pavements side by side. For
          a number specific to your dimensions, the{" "}
          <a href={ASPHALT.cost} className="font-medium text-primary hover:underline">
            asphalt cost calculator
          </a>{" "}
          turns area, thickness and a local per-ton price into tonnage and total cost.
        </p>

        <Cta
          variant="banner"
          title="Get your number, not the average"
          description="Enter area, thickness and local price per ton to get tonnage and total cost in seconds."
          href={ASPHALT.cost}
          buttonLabel="Asphalt Cost Calculator"
        />

        <RelatedArticles
          title="The full cost series"
          variant="cards"
          items={pickLinks(
            costGuideLinks,
            ASPHALT.pricePerTon,
            ASPHALT.costPerSqft,
            ASPHALT.laborCost,
            ASPHALT.equipmentCost,
            ASPHALT.costSaving,
            ASPHALT.regionalPrices,
          )}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified="2026-10-24" />

      </ArticleShell>
    </>
  );
}
