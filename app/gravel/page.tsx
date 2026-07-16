import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { Cta } from "@/components/blocks/cta";
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

const title = "Gravel Calculators, Guides & Reference Charts";
const description =
  "Five gravel calculators — general, pea gravel, crushed stone, driveways and cost — plus 35 guides and 5 standalone reference charts for densities, sizes, weights and coverage.";

export const metadata = buildMetadata({ title, description, path: GRAVEL.hub });

export default function GravelHubPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title, description, path: GRAVEL.hub })} />
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
