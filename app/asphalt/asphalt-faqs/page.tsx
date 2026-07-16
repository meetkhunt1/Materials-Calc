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
import { ASPHALT, coreGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import { CONCRETE } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt FAQs — 15 Questions Answered";
const description =
  "Straight answers to the fifteen questions every first-time asphalt buyer asks: tonnage and coverage math, thickness and curing, sealcoating schedules, per-ton pricing and how asphalt stacks up against concrete.";
const path = ASPHALT.faqs;
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
    question: "How do I calculate how many tons of asphalt I need?",
    answer:
      "Square feet × (thickness in inches ÷ 12) × 145 ÷ 2,000, plus 5–10% waste. The 145 is compacted hot mix density in lb/ft³. A 600 ft² driveway at 3 in works out to 600 × 0.25 × 145 ÷ 2,000 = 10.9 tons — order 11.5 with waste. The asphalt calculator runs this with the conversions handled, but knowing the formula lets you sanity-check any quote in your head.",
  },
  {
    question: "How much area does a ton of asphalt cover?",
    answer:
      "80 ft² at 2 in compacted, 160 ft² at 1 in, 53 ft² at 3 in, 40 ft² at 4 in. Coverage halves as thickness doubles, so one memorized number generates the rest. These figures use the 145 lb/ft³ compacted density with a small practical allowance — the full table at every thickness, including per-truckload coverage, is in the coverage guide.",
  },
  {
    question: "How much does a cubic yard of asphalt weigh?",
    answer:
      "1.96 US tons compacted — 145 lb/ft³ × 27 ft³ = 3,915 lb. Call it 2 tons per yard for mental math. Loose in the truck the same material fluffs about 25% and weighs only ~117 lb/ft³ per unit volume, which is why asphalt is bought by the ton on a scale ticket, never by the truck-bed yard. The density chart covers every variant, from millings to cold patch.",
  },
  {
    question: "What is the 110 rule?",
    answer:
      "Field shorthand: 110 lb of hot mix per square yard per inch of compacted thickness. It restates the 145 lb/ft³ density in the units pavers think in — 9 ft² × (1/12) ft × 145 = 109 lb. Take your area in square yards, multiply by inches of thickness, multiply by 110, divide by 2,000, and you have tons. Crews use it to check plant tickets against laid area in real time.",
  },
  {
    question: "How much waste factor should I add?",
    answer:
      "5% on machine-laid rectangles with a tightly graded base; 10% for hand work, curves, or a subgrade that was left rough. Waste covers mix that fills low spots, edge spillage and the ton that cools in the truck. Under-ordering costs more than the overage: a return trip means a minimum-load fee plus a cold joint across your pavement where the loads meet.",
  },
];

const pavingFaqs: FaqItem[] = [
  {
    question: "How thick should asphalt be?",
    answer:
      "2 in for foot-traffic paths, 3 in over 6 in of aggregate base for residential driveways, 4 in for parking lots, and 6–8 in of total structure for streets. Thickness is set by wheel loads, not preference — 2 in of asphalt carrying daily vehicles ruts within a few seasons. The thickness guide maps every application to a section, layer by layer.",
  },
  {
    question: "How long before you can drive on new asphalt?",
    answer:
      "48–72 hours for normal vehicle traffic in mild weather; give it longer in summer heat, when the mat stays soft. Asphalt has no chemical cure like concrete — it simply stiffens as it cools, then hardens further over 6–12 months as the binder oxidizes. During that first year avoid sharp wheel-turning while parked and keep trailer jacks and kickstands off the surface.",
  },
  {
    question: "Can asphalt be laid in winter or in rain?",
    answer:
      "Not reliably. Hot mix must be compacted above roughly 185°F, and cold ground steals that heat in minutes — most northern plants simply close from late fall to spring. Rain is a hard stop: water flashes to steam under the mat and prevents bonding. If a contractor offers a bargain December driveway in a freezing climate, the discount is coming out of the pavement's life.",
  },
  {
    question: "Why does the base matter more than the asphalt?",
    answer:
      "Because asphalt is a flexible pavement: it distributes loads down into the aggregate base, which does the actual structural work. Six inches of well-compacted crushed stone under 3 in of asphalt outperforms 5 in of asphalt on soft ground. Nearly every alligator-cracked driveway you have seen is a base or drainage failure wearing an asphalt disguise.",
  },
  {
    question: "Should I choose asphalt or concrete?",
    answer:
      "Freezing climate, tighter upfront budget, or sub-15-year horizon: asphalt, at $2.50–5/ft² installed. Hot climate, decorative finishes, or a 30-year hold: concrete, at $7–12/ft² but 30–40 years of life. Over 30 years total costs nearly converge. The full head-to-head — cost tables, climate physics, pros and cons from both corners — is in the asphalt vs concrete comparison.",
  },
];

const costFaqs: FaqItem[] = [
  {
    question: "How much does asphalt cost per ton?",
    answer:
      "$100–150 per ton for hot mix at the plant in 2026, with binder-course mixes at the low end and fine surface mixes at the top. Prices track the PG binder (asphalt cement) market, so quotes older than a season are stale. Trucking is extra — typically $100–200 per load and rising sharply past about 25 miles, because the mix must arrive hot enough to compact.",
  },
  {
    question: "How much does an asphalt driveway cost installed?",
    answer:
      "$2.50–5 per square foot for the standard section — 3 in of compacted hot mix over 6 in of aggregate base. A 600 ft² driveway lands around $3,000–3,300; material is only 40–50% of that, with crew, equipment and mobilization making up the rest. Small jobs price above the range because a $1,500+ mobilization amortizes over too few square feet.",
  },
  {
    question: "How often does asphalt need sealcoating?",
    answer:
      "First application 6–12 months after paving (once initial curing finishes), then every 3–5 years. Sealcoat is UV and water protection for the binder, not structure — at roughly $0.20–0.45/ft² it is the cheapest life-extension in pavement maintenance. Skipping it does not fail the driveway immediately; it quietly moves the overlay date up by years.",
  },
  {
    question: "How long does an asphalt driveway last?",
    answer:
      "15–25 years to first overlay, assuming a proper base, working drainage and a sealcoat habit. The overlay itself — 1.5–2 in of new surface at $3–5/ft² — restores near-new condition and buys another 15 years, which is asphalt's structural advantage over concrete: renewal is designed into the system rather than requiring replacement.",
  },
  {
    question: "Are asphalt millings worth using?",
    answer:
      "For base layers, farm lanes and rural driveways, absolutely: at $10–30 per ton they cost a tenth of new hot mix, and they re-compact to about 1,950 kg/m³ — a serviceable surface that sheds water reasonably well. They will not give you the tight black finish of new pavement, and supply is hit-or-miss since they exist only where milling jobs are running.",
  },
];

export default function AsphaltFaqsPage() {
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
              variant="compact"
              title="Asphalt FAQs — 15 questions answered"
              description="Everything first-time buyers ask, grouped the way the questions actually arrive: how much to order, how the paving behaves, and what it all costs."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Asphalt FAQs", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Ordering & quantities">
          <p className="text-muted-foreground">
            Five questions about the math. If you want the answers computed for your
            dimensions, the{" "}
            <a href={ASPHALT.calculator} className="font-medium text-primary hover:underline">
              asphalt calculator
            </a>{" "}
            applies the same constants; the{" "}
            <a href={ASPHALT.coverage} className="font-medium text-primary hover:underline">
              coverage guide
            </a>{" "}
            and{" "}
            <a href={ASPHALT.densityChart} className="font-medium text-primary hover:underline">
              density chart
            </a>{" "}
            hold the full tables behind them.
          </p>
          <Faq items={orderingFaqs} variant="list" title="Ordering & quantities" id="faq-ordering" />
        </Section>

        <Section title="Paving & performance">
          <p className="text-muted-foreground">
            How the material behaves once it leaves the truck. Section design gets its own
            treatment in the{" "}
            <a href={ASPHALT.thickness} className="font-medium text-primary hover:underline">
              thickness guide
            </a>
            .
          </p>
          <Faq
            items={pavingFaqs}
            variant="list"
            title="Paving & performance"
            id="faq-paving"
            withSchema={false}
          />
        </Section>

        <Section title="Cost & maintenance">
          <p className="text-muted-foreground">
            The money questions — and since half of them end in &quot;or should I just pour
            concrete?&quot;, the comparison written from concrete&apos;s corner is at{" "}
            <a href={CONCRETE.vsAsphalt} className="font-medium text-primary hover:underline">
              concrete vs asphalt
            </a>
            .
          </p>
          <Faq
            items={costFaqs}
            variant="list"
            title="Cost & maintenance"
            id="faq-cost"
            withSchema={false}
          />
        </Section>

        <Cta
          variant="banner"
          title="Question answered? Get your tonnage."
          description="The calculator turns dimensions into an order — tons, coverage and a waste allowance included."
          href={ASPHALT.calculator}
          buttonLabel="Open the Asphalt Calculator"
        />

        <RelatedArticles
          title="The full asphalt guide set"
          variant="cards"
          items={pickLinks(
            coreGuideLinks,
            ASPHALT.howTo,
            ASPHALT.densityChart,
            ASPHALT.coverage,
            ASPHALT.costGuide,
            ASPHALT.thickness,
            ASPHALT.vsConcrete,
          )}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4, AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
