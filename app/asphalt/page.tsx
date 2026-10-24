import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { QuickAnswer } from "@/components/blocks/quick-answer";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { Faq } from "@/components/faq/faq";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import {
  ASPHALT,
  asphaltCalculatorLinks,
  coreGuideLinks,
  drivewayGuideLinks,
  weightGuideLinks,
  costGuideLinks,
  volumeGuideLinks,
} from "@/content/asphalt/links";
import { CONCRETE, calculatorLinks as concreteCalcs, pickLinks as pickConcrete } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Calculators and Paving Guides";
const description =
  "Compacted asphalt weighs 145 lb/ft³, so a cubic yard is 1.96 tons and a ton covers about 53 ft² at 3 in. Use 5 free calculators and 30+ paving guides.";
const modified = "2026-10-24";

export const metadata = buildMetadata({
  title,
  description,
  path: ASPHALT.hub,
  modifiedTime: modified,
});

const faqItems: FaqItem[] = [
  {
    question: "Which asphalt calculator should I use?",
    answer:
      "Use the asphalt calculator for tons and cubic yards on any paving area. The driveway calculator adds the gravel base underneath, the weight calculator converts a known volume to tons, the cost calculator turns tonnage into a material budget, and the volume calculator reports cubic yards, feet and meters.",
  },
  {
    question: "Do the asphalt calculators use loose or compacted thickness?",
    answer:
      "They use compacted thickness, the depth after rolling that plans and quotes specify. Tonnage is based on 145 lb/ft³ compacted hot mix; the weight calculator also offers loose, cold mix and millings densities when you are sizing trucks or stockpiles.",
  },
  {
    question: "Do the calculators include a waste allowance?",
    answer:
      "Yes, the asphalt, driveway and cost calculators let you pick 5%, 10% or 15% waste, with 10% as the typical choice. The volume calculator reports geometric volume with no waste, so add 5–15% before ordering from it.",
  },
  {
    question: "Can I calculate asphalt in metric units?",
    answer:
      "Yes. The calculators accept metric dimensions and report tonnes and cubic meters alongside US tons and cubic yards. Compacted hot mix is 2,322 kg/m³, so one cubic meter weighs about 2.32 tonnes.",
  },
  {
    question: "Where do the asphalt figures on this site come from?",
    answer:
      "The densities, thicknesses and design rules come from standard industry references: the Asphalt Institute's MS-4 Asphalt Handbook, NAPA's pavement design guidance, ASTM D2726 for compacted density, and FHWA guidance on mix selection and truck weight limits. Prices are 2026 estimating ranges, so confirm them with local quotes.",
  },
];

export default function AsphaltHubPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({ title, description, path: ASPHALT.hub, dateModified: modified })}
      />
      <Hero
        eyebrow="Asphalt"
        variant="standard"
        title="Asphalt calculators and paving guides"
        description="Asphalt is bought by the ton but planned by the square foot. Every tool here handles that conversion, and the guides explain the density, thickness and pricing behind it."
      >
        <Breadcrumbs items={breadcrumbTrail({ label: "Asphalt", href: ASPHALT.hub })} />
      </Hero>

      <Container size="narrow" className="pt-12">
        <QuickAnswer
          question="How much asphalt do I need?"
          answer="Multiply the area in square feet by the compacted thickness in feet and by 145 lb/ft³, divide by 2,000 for US tons, then add 5–10% waste. One ton of hot mix covers about 53 ft² at 3 inches compacted, so a 600 ft² driveway needs roughly 11–12 tons."
          ruleOfThumb="1 compacted cubic yard of asphalt ≈ 2 tons."
          formula="Tons = ft² × (in ÷ 12) × 145 ÷ 2,000"
        />
      </Container>

      <Container className="py-12">
        <RelatedArticles title="Calculators" variant="cards" items={asphaltCalculatorLinks} />
      </Container>

      <Container className="space-y-10 pb-12">
        <RelatedArticles title="Asphalt basics" variant="inline-strip" items={coreGuideLinks} />
        <RelatedArticles title="Driveways" variant="inline-strip" items={drivewayGuideLinks} />
        <RelatedArticles title="Weight & hauling" variant="inline-strip" items={weightGuideLinks} />
        <RelatedArticles title="Pricing" variant="inline-strip" items={costGuideLinks} />
        <RelatedArticles title="Volume & measurement" variant="inline-strip" items={volumeGuideLinks} />
      </Container>

      <Container className="pb-12">
        <RelatedArticles
          title="Comparing with concrete?"
          variant="list"
          items={pickConcrete(concreteCalcs, CONCRETE.calculator, CONCRETE.slab)}
        />
      </Container>

      <Container size="narrow" className="pb-12">
        <Faq items={faqItems} variant="accordion" title="Asphalt calculator questions" />
      </Container>

      <Container size="narrow" className="pb-16">
        <Cta
          variant="banner"
          title="Start with the tonnage"
          description="The asphalt calculator converts your area and thickness into the tons a plant will actually quote."
          href={ASPHALT.calculator}
          buttonLabel="Open Asphalt Calculator"
        />
      </Container>
    </>
  );
}
