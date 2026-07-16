import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { Section } from "@/components/blocks/section";
import { AuthorBox } from "@/components/author/author-box";
import { SuccessBlock } from "@/components/blocks/callout";
import { CategoryNav } from "@/components/layout/category-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";

const title = "About MaterialsCalc — Who Writes This Site";
const description =
  "Who builds these calculators, how the numbers are checked, and the editorial standards behind every guide.";
const path = "/about";
const author = getAuthor("materials-team");

export const metadata = buildMetadata({ title, description, path });

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path }),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": absoluteUrl("/about#aboutpage"),
            name: title,
            url: absoluteUrl(path),
            isPartOf: { "@id": absoluteUrl("/#website") },
            about: { "@id": absoluteUrl("/#organization") },
          },
        ]}
      />
      <Hero
        eyebrow="About"
        variant="centered"
        title="Numbers you can pour against"
        description="MaterialsCalc exists because material estimating is unforgiving: order light and the pour stops, order heavy and the budget bleeds. Every tool here is built to survive contact with a real job site."
      >
        <Breadcrumbs items={breadcrumbTrail({ label: "About", href: path })} />
      </Hero>

      <Container size="narrow" className="space-y-12 py-12">
        <Section title="Who writes and reviews the content">
          <AuthorBox author={author} />
          <p className="text-muted-foreground">
            Our editorial team combines field construction experience with careful
            standards research. Calculators are drafted from first principles, checked
            against published industry data, and re-derived independently before launch.
            Where a topic is governed by a code or standard — ACI, ASTM, AASHTO, IS codes,
            the IRC, Asphalt Institute manuals — we cite it at the bottom of the page and
            defer to it in the text.
          </p>
        </Section>

        <Section title="Our editorial standards">
          <SuccessBlock title="Every published page must pass four checks">
            <p>
              1. Formulas are derived and unit-checked, never copied blind. 2. Constants
              (densities, coverage rates, prices) are consistent across every page on the
              site — the same cubic yard weighs the same everywhere. 3. Cost data reflects
              current-year ranges and says so. 4. Anything structural — footing sizes,
              lift thicknesses, mix grades — points the reader to the governing code and
              their local authority, not just our tables.
            </p>
          </SuccessBlock>
          <p className="text-muted-foreground">
            Pages carry their publish date, and we update figures when standards revise or
            market prices move meaningfully. If you find an error, we want to know —
            see the contact page.
          </p>
        </Section>

        <Section title="What this site is (and isn't)">
          <p className="text-muted-foreground">
            These calculators produce planning estimates for ordering material. They are
            not engineering services: structural decisions — footing dimensions, pavement
            sections, mix designs for load-bearing work — belong to your local code and,
            where required, a licensed engineer. We say this on every calculator because
            it&apos;s true on every job.
          </p>
        </Section>

        <Section title="Explore the calculators">
          <CategoryNav />
        </Section>
      </Container>
    </>
  );
}
