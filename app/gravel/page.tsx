import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { Cta } from "@/components/blocks/cta";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { Faq } from "@/components/faq/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import {
  GRAVEL,
  gravelCalculatorLinks,
  coreGuideLinks,
  peaGuideLinks,
  stoneGuideLinks,
  drivewayGuideLinks,
  costGuideLinks,
  referenceLinks,
} from "@/content/gravel/links";
import { CONCRETE, calculatorLinks as concreteCalcs, pickLinks as pickConcrete } from "@/content/concrete/links";
import { ASPHALT, asphaltCalculatorLinks, pickLinks as pickAsphalt } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Gravel Calculators, Guides and Charts";
const description =
  "Common gravel weighs about 1.42 tons per loose cubic yard (105 lb/ft³). Use 5 gravel calculators, 35 guides and 5 reference charts for tons, yards and cost.";
const dateModified = "2026-10-24";

export const metadata = buildMetadata({ title, description, path: GRAVEL.hub, modifiedTime: dateModified });

const faqItems: FaqItem[] = [
  {
    question: "How much gravel do I need?",
    answer:
      "Multiply length × width × depth in feet, divide by 27 for cubic yards, then multiply by 1.42 for tons of common gravel. A 10 × 10 ft area at 3 inches deep is 25 ft³, or 0.93 yd³ and about 1.3 tons before a 10% waste allowance.",
  },
  {
    question: "How much area does a cubic yard of gravel cover?",
    answer:
      "One cubic yard (27 ft³) covers about 162 ft² at 2 inches deep, 108 ft² at 3 inches and 81 ft² at 4 inches. Coverage per yard is the same for every gravel type because it is a volume; only coverage per ton changes with density.",
  },
  {
    question: "Is gravel sold by the ton or by the cubic yard?",
    answer:
      "Both. Quarries weigh trucks and sell by the ton, while many landscape yards sell by the loader bucket or cubic yard. For common gravel, 1 cubic yard is about 1.42 tons and 1 ton is about 0.7 cubic yards, so convert before comparing quotes.",
  },
  {
    question: "How many tons of gravel do I need for a 100 ft driveway?",
    answer:
      "About 21 tons of common gravel for a 100 × 12 ft driveway at 4 inches deep, or roughly 23 tons with 10% waste. The math is 1,200 ft² × 0.33 ft = 400 ft³ = 14.8 yd³, times 1.42 tons per yard. A new drive built in three layers needs two to three times that.",
  },
  {
    question: "Which gravel calculator should I use?",
    answer:
      "Use the general gravel calculator for most beds, paths and fill. Switch to the pea gravel calculator for rounded stone and bag counts, the crushed stone calculator for #57 or crusher run bases, the driveway calculator for layered drives, and the cost calculator when you need a price.",
  },
];

export default function GravelHubPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title, description, path: GRAVEL.hub, dateModified })} />
      <Hero
        eyebrow="Gravel"
        variant="stat-strip"
        title="Gravel calculators and aggregate references"
        description="Gravel is sold by the ton and the yard, quoted loose and placed compacted. These tools keep the units straight; the reference charts hold the data every estimate leans on."
        stats={[
          { value: "1.42", label: "tons per loose yd³" },
          { value: "105", label: "lb/ft³ common gravel" },
          { value: "5", label: "calculators" },
          { value: "40", label: "guides & reference charts" },
        ]}
      >
        <Breadcrumbs items={breadcrumbTrail({ label: "Gravel", href: GRAVEL.hub })} />
      </Hero>

      <Container size="narrow" className="pt-12">
        <QuickAnswer
          question="How many tons of gravel are in a cubic yard?"
          answer="A cubic yard of common loose gravel weighs about 1.42 US tons (105 lb/ft³ × 27 ft³ ≈ 2,835 lb), so 1 ton is about 0.7 cubic yards. Lighter pea gravel runs about 1.3 tons per yard and compacted crusher run about 1.89, so pick the calculator that matches your stone."
          ruleOfThumb="One ton of common gravel covers about 100 ft² at 2 in deep."
          formula="Tons = L × W × D (ft) ÷ 27 × 1.42"
        />
      </Container>

      <Container className="py-12">
        <RelatedArticles title="Calculators" variant="cards" items={gravelCalculatorLinks} />
      </Container>

      <Container className="pb-12">
        <RelatedArticles title="Reference charts" variant="cards" items={referenceLinks} />
      </Container>

      <Container className="space-y-10 pb-12">
        <RelatedArticles title="Gravel basics" variant="inline-strip" items={coreGuideLinks} />
        <RelatedArticles title="Pea gravel" variant="inline-strip" items={peaGuideLinks} />
        <RelatedArticles title="Crushed stone" variant="inline-strip" items={stoneGuideLinks} />
        <RelatedArticles title="Gravel driveways" variant="inline-strip" items={drivewayGuideLinks} />
        <RelatedArticles title="Pricing" variant="inline-strip" items={costGuideLinks} />
      </Container>

      <Container className="pb-12">
        <RelatedArticles
          title="Other materials"
          variant="list"
          items={[
            ...pickConcrete(concreteCalcs, CONCRETE.calculator),
            ...pickAsphalt(asphaltCalculatorLinks, ASPHALT.calculator),
          ]}
        />
      </Container>

      <Container size="narrow" className="pb-12">
        <Faq items={faqItems} variant="accordion" title="Gravel quick questions" />
      </Container>

      <Container size="narrow" className="pb-16">
        <Cta
          variant="banner"
          title="Start with the tonnage"
          description="The gravel calculator handles every common type with the right density built in."
          href={GRAVEL.calculator}
          buttonLabel="Open Gravel Calculator"
        />
      </Container>
    </>
  );
}
