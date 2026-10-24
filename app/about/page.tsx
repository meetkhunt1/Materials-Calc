import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { Section } from "@/components/blocks/section";
import { AuthorBox } from "@/components/author/author-box";
import { SuccessBlock } from "@/components/blocks/callout";
import { CategoryNav } from "@/components/layout/category-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { canonicalUrl } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";

const title = "About MaterialsCalc: Who Writes This Site";
const description =
  "MaterialsCalc is written by a construction estimating editorial team. See how every formula is derived and unit-checked, and cited to ACI, ASTM and IRC.";
const path = "/about";
const author = getAuthor("materials-team");

export const metadata = buildMetadata({ title, description, path, modifiedTime: "2026-10-24" });

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title, description, path, dateModified: "2026-10-24" }),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": canonicalUrl("/about#aboutpage"),
            name: title,
            url: canonicalUrl(path),
            isPartOf: { "@id": canonicalUrl("/#website") },
            about: { "@id": canonicalUrl("/#organization") },
          },
        ]}
      />
      <Hero
        eyebrow="About"
        variant="centered"
        title="Numbers you can pour against"
        description="MaterialsCalc is a free set of construction material calculators and reference guides for asphalt, gravel and concrete. It exists because estimating is unforgiving: order light and the pour stops, order heavy and the budget bleeds."
      >
        <Breadcrumbs items={breadcrumbTrail({ label: "About", href: path })} />
      </Hero>

      <Container size="narrow" className="space-y-12 py-12">
        <Section title="Who writes and reviews the content">
          <AuthorBox author={author} />
          <p className="text-muted-foreground">
            Every page is written and reviewed by the MaterialsCalc Editorial Team, a group of
            construction estimating editors who combine field construction experience with
            careful standards research. Calculators are drafted from first principles,
            checked against published industry data, and re-derived independently before
            launch. Where a topic is governed by a code or standard (ACI, ASTM, AASHTO, IS
            codes, the IRC, Asphalt Institute manuals), we cite it at the bottom of the page
            and defer to it in the text.
          </p>
        </Section>

        <Section title="How are the numbers sourced and verified?">
          <p className="text-muted-foreground">
            Every number on the site comes from a published standard, a manufacturer&apos;s
            data sheet, or a worked example you can follow on the page.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              <strong className="text-foreground">Densities</strong> use the typical values
              published by PCA, ACI and the Asphalt Institute, and the same value is used
              everywhere: reinforced concrete is 2,400 kg/m³ (150 lb/ft³) and compacted hot
              mix asphalt is 145 lb/ft³ on every page and in every calculator.
            </li>
            <li>
              <strong className="text-foreground">Bag yields</strong> come from manufacturer
              data (an 80 lb concrete bag yields 0.60 ft³, so 45 bags make a cubic yard).
            </li>
            <li>
              <strong className="text-foreground">Formulas</strong> are explained on each
              calculator page alongside at least one worked example, so you can check the
              arithmetic by hand. The calculators convert every input to one unit system
              before computing, so mixing feet, inches and meters is safe.
            </li>
            <li>
              <strong className="text-foreground">Installed prices</strong> are derived from
              worked examples priced line by line on the site, not from rules of thumb. When
              figures cannot be traced to a source or a worked example, we withdraw them: our
              concrete price per square foot was removed for exactly that reason, and the
              concrete vs asphalt guide explains why.
            </li>
            <li>
              <strong className="text-foreground">Structural guidance</strong> (footing sizes,
              slab thickness, mix grades) is condensed from the governing code tables, such as
              IRC Table R403.1 and IS 456, and each page lists its references.
            </li>
          </ul>
        </Section>

        <Section title="Our editorial standards">
          <SuccessBlock title="Every published page must pass four checks">
            <p>
              1. Formulas are derived and unit-checked, never copied blind. 2. Constants
              (densities, coverage rates, prices) are consistent across every page on the
              site: the same cubic yard weighs the same everywhere. 3. Cost data reflects
              current-year ranges and says so. 4. Anything structural (footing sizes,
              lift thicknesses, mix grades) points the reader to the governing code and
              their local authority, not just our tables.
            </p>
          </SuccessBlock>
          <p className="text-muted-foreground">
            Pages carry their publish and last-updated dates, and we update figures when
            standards revise or market prices move meaningfully. If you find an error, we want
            to know: send the page URL and your inputs through the{" "}
            <a href="/contact/" className="font-medium text-primary hover:underline">
              contact page
            </a>
            . Data corrections are our highest priority and typically ship within days.
          </p>
        </Section>

        <Section title="What this site is (and isn't)">
          <p className="text-muted-foreground">
            These calculators produce planning estimates for ordering material. They are
            not engineering services. Structural decisions (footing dimensions, pavement
            sections, mix designs for load-bearing work) belong to your local code and,
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
