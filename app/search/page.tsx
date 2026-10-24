import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { SearchResults } from "@/components/layout/search-results";
import { buildMetadata } from "@/lib/seo";

const title = "Search";
const description = "Search calculators and guides across MaterialsCalc.";
const path = "/search";

// Internal search results are not useful indexed on its own; kept out of the
// sitemap and search index. Exists so Google's Sitelinks SearchBox has a
// real, working target (see websiteSchema's potentialAction).
export const metadata = buildMetadata({ title, description, path, noIndex: true });

export default function SearchPage() {
  return (
    <>
      <Hero
        eyebrow="Search"
        variant="compact"
        title="Search MaterialsCalc"
        description="Find any calculator, guide or chart."
      >
        <Breadcrumbs items={breadcrumbTrail({ label: "Search", href: path })} />
      </Hero>
      <Container size="narrow" className="py-12">
        <Suspense fallback={null}>
          <SearchResults />
        </Suspense>
      </Container>
    </>
  );
}
