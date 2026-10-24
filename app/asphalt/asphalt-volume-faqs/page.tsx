import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { Section } from "@/components/blocks/section";
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
import { ASPHALT, volumeGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Volume FAQs: 13.8 ft³ per Ton and More";
const description =
  "One ton of compacted asphalt fills 13.8 ft³ and a cubic yard weighs 1.96 tons. Get 12 numeric answers on cubic yards, loose volume, waste and minimums.";
const path = ASPHALT.volumeFaqs;
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

const calculatingItems: FaqItem[] = [
  {
    question: "How do I calculate cubic yards of asphalt?",
    answer:
      "Multiply length × width × depth in feet and divide by 27 to get cubic yards of asphalt. Or multiply the cubic feet by 145 lb/ft³ and divide by 2,000 for tons. A 20 × 40 ft pad at 4 in (0.333 ft) is 266 ft³ = 9.9 yd³ = 19.3 tons.",
  },
  {
    question: "How many cubic feet are in a ton of asphalt?",
    answer:
      "A ton of compacted asphalt fills 13.8 ft³: 2,000 lb divided by the standard 145 lb/ft³ hot-mix density. Loose in the truck, the same ton occupies about 17 ft³ at roughly 117 lb/ft³. Use the compacted figure for takeoffs, because pavement thickness on drawings is always a compacted dimension.",
  },
  {
    question: "How many cubic yards do I need for a driveway?",
    answer:
      "A typical 480 ft² single-car driveway takes 4.4 yd³ at 3 in; a 720 ft² double takes 6.7 yd³. The general rule: square feet × depth in inches ÷ 12 ÷ 27. Add 5–10% waste before ordering, and remember the plant will want the number in tons, so multiply yards by 1.96.",
  },
  {
    question: "What is the difference between loose and compacted volume?",
    answer:
      "Loose asphalt takes up about 25% more volume than compacted asphalt. Compacted hot mix runs 145 lb/ft³; loose material in a truck or windrow runs about 117 lb/ft³, so a ton of mix shrinks from roughly 17 ft³ loose to 13.8 ft³ under the roller. Calculate with compacted depth and let density handle the rest; never add the 25% yourself.",
  },
  {
    question: "How do I handle areas with different thicknesses?",
    answer:
      "Split the job into thickness zones and calculate each separately: a 600 ft² drive at 3 in plus a 200 ft² apron at 4 in is (600 × 0.25) + (200 × 0.333) = 216.7 ft³, not 800 ft² at some averaged depth. Averaging thickness only works when the areas are equal, while splitting is always correct.",
  },
  {
    question: "How do I calculate volume for a circular area?",
    answer:
      "Circular volume is π × radius² × depth, everything in feet. A 30 ft diameter turnaround at 3 in is π × 15² × 0.25 = 176.7 ft³ = 6.5 yd³, about 12.8 tons. For half circles multiply by 0.5. Measure the diameter twice at right angles and average, because few field circles are truly round.",
  },
];

const orderingItems: FaqItem[] = [
  {
    question: "What waste factor should I add to a volume takeoff?",
    answer:
      "Add 5% for a simple rectangle on a well-graded base and 10% for irregular shapes, handwork around structures, or a base with uneven grade. Go toward 15% only for trench patching and cuts where edges are ragged. The factor covers yield loss, edge overrun and grade variation, and running short costs far more than the margin.",
  },
  {
    question: "How do I convert my volume to metric for a supplier?",
    answer:
      "Multiply cubic yards by 0.765 for cubic meters; cubic meters × 2.32 gives metric tonnes of compacted hot mix. Watch the ton trap: a metric tonne is 2,204.6 lb against the US short ton's 2,000 lb, a 10% difference that must be labeled explicitly on any mixed-unit order.",
  },
  {
    question: "How do asphalt plants measure what they sell me?",
    answer:
      "Asphalt plants measure what they sell by weight, over a certified truck scale; the delivery ticket states tons, never yards. The plant weighs the truck empty and loaded; the difference is your invoice. Your volume takeoff exists to predict that scale number: cubic yards × 1.96 should match the tickets within your waste factor.",
  },
  {
    question: "Who owns leftover asphalt at the end of the job?",
    answer:
      "You do: you paid for it by the ton, so contractually it is yours. But hot mix is worthless once cold, so in practice leftovers return to the plant or become contractor stock. If you want extras used on site (a shed apron, a mailbox pad), say so before paving day, not when the truck is leaving.",
  },
  {
    question: "Is there a minimum order for asphalt?",
    answer:
      "Most plants set a 1–2 ton minimum for pickup and a 5–10 ton minimum for delivery, and many charge a small-load fee below about 5 tons. If your takeoff comes to 1.5 tons (around 21 ft³ compacted), compare the plant minimum plus fee against bagged cold patch before deciding.",
  },
  {
    question: "What is the difference between volume and coverage?",
    answer:
      "Volume is how much asphalt there is and coverage is how much area it paves. Volume is the three-dimensional quantity (yd³, ft³, m³); coverage is the area that volume spreads over at a stated depth. One cubic yard covers 81 ft² at 4 in but 162 ft² at 2 in: same volume, different coverage. Suppliers quoting coverage per ton (80 ft² at 2 in) are just restating density and depth.",
  },
];

export default function AsphaltVolumeFaqsPage() {
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
              eyebrow="Asphalt · Volume Guide"
              variant="compact"
              title="Asphalt volume FAQs"
              description="Twelve questions that account for most of the volume math confusion we see, answered in plain numbers with the constants used across this site: 145 lb/ft³ compacted, 1.96 tons per cubic yard, 13.8 ft³ per ton."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Volume FAQs", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <QuickAnswer
          question="How many cubic feet are in a ton of asphalt?"
          answer="One US ton of compacted hot mix asphalt occupies about 13.8 cubic feet (2,000 lb ÷ 145 lb/ft³), or 0.51 cubic yards. Loose in the truck the same ton takes up about 17 cubic feet, so always calculate takeoffs with compacted depth and convert to tons for the plant."
          ruleOfThumb="13.8 ft³ per ton compacted; 1.96 tons per cubic yard."
          formula="ft³ = tons × 2,000 ÷ 145"
        />

        <Section title="Calculating volume">
          <p className="text-muted-foreground">
            Asphalt volume is length × width × compacted depth, and these answers get you
            from field dimensions to a defensible cubic-yard figure.
            For the full derivations, see the{" "}
            <a href={ASPHALT.volumeFormula} className="font-medium text-primary hover:underline">
              volume formula guide
            </a>{" "}
            and the{" "}
            <a href={ASPHALT.cubicYardGuide} className="font-medium text-primary hover:underline">
              cubic yard guide
            </a>
            , or let the{" "}
            <a href={ASPHALT.volume} className="font-medium text-primary hover:underline">
              volume calculator
            </a>{" "}
            run the numbers directly.
          </p>
          <CoverageTable
            headers={["Constant", "Value", "Used for"]}
            rows={[
              { label: "1 cubic yard", spec: "27 ft³ = 0.765 m³", coverage: "Volume conversions" },
              { label: "Compacted hot mix", spec: "145 lb/ft³", coverage: "1 yd³ = 1.96 tons · 1 m³ = 2.32 tonnes" },
              { label: "1 US ton, compacted", spec: "13.8 ft³", coverage: "Checking quotes against takeoffs" },
              { label: "Loose hot mix", spec: "≈ 117 lb/ft³", coverage: "Truck and stockpile volumes" },
            ]}
            caption="The constants behind every answer on this page."
          />
          <Faq items={calculatingItems} variant="list" title="Calculation questions" />
        </Section>

        <Section title="Volume to order">
          <p className="text-muted-foreground">
            Asphalt is sold by the ton, so the last step is turning a takeoff into a plant
            order without surprises. The{" "}
            <a href={ASPHALT.weight} className="font-medium text-primary hover:underline">
              weight calculator
            </a>{" "}
            handles the volume-to-tons conversion for every density state.
          </p>
          <Faq
            items={orderingItems}
            variant="list"
            title="Ordering questions"
            withSchema={false}
            id="faq-ordering"
          />
        </Section>

        <Cta
          variant="banner"
          title="Run your own numbers"
          description="Length, width and depth in; cubic yards, feet, meters and tons out."
          href={ASPHALT.volume}
          buttonLabel="Asphalt Volume Calculator"
        />

        <RelatedArticles
          title="The full volume series"
          variant="cards"
          items={pickLinks(
            volumeGuideLinks,
            ASPHALT.cubicYardGuide,
            ASPHALT.cubicFootGuide,
            ASPHALT.volumeFormula,
            ASPHALT.measurement,
            ASPHALT.unitConversion,
          )}
        />

        <AuthorBox author={author} datePublished="2026-07-15" dateModified={modified} />

        <References items={[AREFS.ms4, AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
