import { Square, Ruler, Calculator, Circle, Car } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { CategoryNav } from "@/components/layout/category-nav";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { Newsletter } from "@/components/blocks/newsletter";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { CONCRETE } from "@/content/concrete/links";
import { GRAVEL } from "@/content/gravel/links";
import { ASPHALT } from "@/content/asphalt/links";
import type { RelatedArticle } from "@/types";

export const metadata = buildMetadata({
  title: `${siteConfig.name} — Construction Material Calculators`,
  description: siteConfig.description,
  path: "/",
});

/** Highest-search-volume calculators — linked directly from the homepage, the site's highest-authority page. */
const popularCalculators: RelatedArticle[] = [
  {
    title: "Concrete Slab Calculator",
    href: CONCRETE.slab,
    description: "Patios, sheds, garages and walkways",
    category: "Concrete",
    icon: Square,
  },
  {
    title: "Concrete Footing Calculator",
    href: CONCRETE.footing,
    description: "Strip footings & trenches by run length",
    category: "Concrete",
    icon: Ruler,
  },
  {
    title: "Gravel Calculator",
    href: GRAVEL.calculator,
    description: "Tons and cubic yards for driveways & landscaping",
    category: "Gravel",
    icon: Calculator,
  },
  {
    title: "Pea Gravel Calculator",
    href: GRAVEL.pea,
    description: "Coverage, bulk tons and bag counts",
    category: "Gravel",
    icon: Circle,
  },
  {
    title: "Asphalt Calculator",
    href: ASPHALT.calculator,
    description: "Hot-mix tonnage & cubic yards",
    category: "Asphalt",
    icon: Calculator,
  },
  {
    title: "Asphalt Driveway Calculator",
    href: ASPHALT.driveway,
    description: "Asphalt surface + crushed stone base",
    category: "Asphalt",
    icon: Car,
  },
];

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
        <RelatedArticles
          title="Popular calculators"
          variant="cards"
          items={popularCalculators}
        />
      </Container>
      <Container className="pb-14">
        <h2 className="text-2xl font-semibold tracking-tight">Browse by material</h2>
        <CategoryNav className="mt-6" />
      </Container>
      <Container size="narrow" className="pb-4">
        <Newsletter />
      </Container>
    </>
  );
}
