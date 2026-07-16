import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { calculatorLinks, guideLinks, CONCRETE } from "@/content/concrete/links";

const title = "Concrete Calculators & Estimating Guides";
const description =
  "Five concrete calculators — slabs, footings, walls, columns — plus cost, density, coverage, mix ratio and curing guides written to industry standards.";

export const metadata = buildMetadata({
  title,
  description,
  path: CONCRETE.hub,
});

export default function ConcreteHubPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title, description, path: CONCRETE.hub })} />
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

      <Container className="py-12">
        <RelatedArticles title="Calculators" variant="cards" items={calculatorLinks} />
      </Container>

      <Container className="pb-12">
        <RelatedArticles title="Guides & references" variant="list" items={guideLinks} />
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
