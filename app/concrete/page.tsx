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
import { calculatorLinks, guideLinks, CONCRETE } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Concrete Calculators: Slabs, Footings, Walls";
const description =
  "Free concrete calculators for slabs, footings, walls and columns that give cubic yards, bags and weight, plus guides to cost, density, mix ratios and curing.";

export const metadata = buildMetadata({
  title,
  description,
  path: CONCRETE.hub,
  modifiedTime: "2026-10-24",
});

const faqItems: FaqItem[] = [
  {
    question: "Are these concrete calculators free?",
    answer:
      "Yes. Every concrete calculator on MaterialsCalc is free with no sign-up, and your inputs are processed in your browser rather than sent to a server. Results can be copied, printed or shared as a link.",
  },
  {
    question: "What density do the concrete calculators use?",
    answer:
      "2,400 kg/m³ (150 lb/ft³), the normal-weight reinforced value that ACI 318 and IS 456 build their load tables around. The density chart lists plain, lightweight and heavyweight concrete if your mix differs.",
  },
  {
    question: "Do the calculators work in metric?",
    answer:
      "Yes. You can enter feet, inches, yards, meters or centimeters in any combination, and the results show both cubic yards and cubic meters, so you can read whichever unit your supplier sells.",
  },
  {
    question: "How much concrete does a typical driveway need?",
    answer:
      "About 11 cubic yards for a 16 × 40 ft driveway poured 5 inches thick, including 10% waste. A 5-inch slab uses roughly 1 cubic yard per 65 ft², so divide your driveway area by 65 for a quick estimate.",
  },
  {
    question: "Should I combine slab, footing and wall pours into one order?",
    answer:
      "Yes, when they pour on the same day. Run each element through its calculator, add the volumes and order one delivery: full loads avoid the $50–150 short-load fee plants charge on orders under about 4–5 yards.",
  },
];

export default function ConcreteHubPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title, description, path: CONCRETE.hub, dateModified: "2026-10-24" })} />
      <Hero
        eyebrow="Concrete"
        variant="stat-strip"
        title="Concrete calculators and estimating guides"
        description="Every tool on this page uses the same engine: measure, convert, add waste, order. The guides explain the numbers so you can defend your estimate."
        stats={[
          { value: "5", label: "Interactive calculators" },
          { value: "7", label: "In-depth guides" },
          { value: "2,400", label: "kg/m³ design density" },
          { value: "10%", label: "Standard waste allowance" },
        ]}
      >
        <Breadcrumbs items={breadcrumbTrail({ label: "Concrete", href: CONCRETE.hub })} />
      </Hero>

      <Container size="narrow" className="pt-12">
        <QuickAnswer
          question="Which concrete calculator should I use?"
          answer="Use the slab calculator for patios, driveways and garage floors, the footing calculator for continuous strip footings, the wall calculator for poured foundation and retaining walls, and the column calculator for sonotubes and piers. The general concrete calculator handles any rectangular pour and reports cubic yards, cubic meters, bags and weight."
          ruleOfThumb="1 cubic yard of concrete covers about 81 ft² at 4 in thick."
        />
      </Container>

      <Container className="py-12">
        <RelatedArticles title="Calculators" variant="cards" items={calculatorLinks} />
      </Container>

      <Container className="pb-12">
        <RelatedArticles title="Guides & references" variant="list" items={guideLinks} />
      </Container>

      <Container size="narrow" className="pb-12">
        <Faq items={faqItems} variant="list" title="Concrete calculator questions" />
      </Container>

      <Container size="narrow" className="pb-16">
        <Cta
          variant="banner"
          title="Not sure where to start?"
          description="The general concrete calculator handles any rectangular pour and links out to every guide."
          href={CONCRETE.calculator}
          buttonLabel="Open Concrete Calculator"
        />
      </Container>
    </>
  );
}
