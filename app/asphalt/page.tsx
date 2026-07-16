import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { RelatedArticles } from "@/components/blocks/related-articles";
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

const title = "Asphalt Calculators & Paving Guides";
const description =
  "Five asphalt calculators — tonnage, driveways, weight, cost and volume — backed by 35 guides on density, thickness, pricing and maintenance.";

export const metadata = buildMetadata({ title, description, path: ASPHALT.hub });

export default function AsphaltHubPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title, description, path: ASPHALT.hub })} />
      <Hero
        eyebrow="Asphalt"
        variant="standard"
        title="Asphalt calculators and paving guides"
        description="Asphalt is bought by the ton but planned by the square foot — every tool here handles that conversion, and the guides explain the density, thickness and pricing behind it."
      >
        <Breadcrumbs items={breadcrumbTrail({ label: "Asphalt", href: ASPHALT.hub })} />
      </Hero>

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
