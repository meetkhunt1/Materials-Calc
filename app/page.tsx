import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { CategoryNav } from "@/components/layout/category-nav";
import { Newsletter } from "@/components/blocks/newsletter";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: `${siteConfig.name} — Construction Material Calculators`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          title: `${siteConfig.name} — Construction Material Calculators`,
          description: siteConfig.description,
          path: "/",
        })}
      />
      <Hero
        eyebrow="Free estimating tools"
        variant="centered"
        title="Get material quantities right the first time"
        description="Accurate calculators, density charts and cost guides for concrete, asphalt, gravel and sand — built for contractors and serious DIYers."
      />
      <Container className="py-14">
        <h2 className="text-2xl font-semibold tracking-tight">Browse by material</h2>
        <CategoryNav className="mt-6" />
      </Container>
      <Container size="narrow" className="pb-4">
        <Newsletter />
      </Container>
    </>
  );
}
