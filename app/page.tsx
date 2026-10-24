import { Square, Ruler, Calculator, Circle, Car } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { CategoryNav } from "@/components/layout/category-nav";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { Newsletter } from "@/components/blocks/newsletter";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { CONCRETE } from "@/content/concrete/links";
import { GRAVEL } from "@/content/gravel/links";
import { ASPHALT } from "@/content/asphalt/links";
import type { RelatedArticle } from "@/types";

const title = "Material Calculators: Asphalt, Gravel, Concrete";
const description =
  "Free calculators that turn length, width and depth into tons, cubic yards and bags of asphalt, gravel and concrete, plus density charts and cost guides.";

export const metadata = buildMetadata({
  title,
  description,
  path: "/",
  modifiedTime: "2026-10-24",
});

/** Highest-search-volume calculators, linked directly from the homepage (the site's highest-authority page). */
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
          title,
          description,
          path: "/",
          dateModified: "2026-10-24",
        })}
      />
      <Hero
        eyebrow="Free estimating tools"
        variant="centered"
        title="Get material quantities right the first time"
        description="MaterialsCalc is a free set of construction material calculators. Enter your dimensions and get the tons, cubic yards or bags of asphalt, gravel or concrete to order, backed by density charts and cost guides."
      />
      <Container size="narrow" className="pt-10">
        <p className="text-muted-foreground">
          It is built for contractors, estimators and homeowners planning a driveway, slab,
          patio or landscaping job who need an order quantity they can check. Every calculator page
          explains its formula, uses the same density values as the reference charts (for
          example, 145 lb/ft³ for compacted hot mix asphalt and 2,400 kg/m³ for reinforced
          concrete), and adds a waste allowance before rounding to what a supplier sells.
        </p>
      </Container>
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
