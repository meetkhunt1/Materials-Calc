import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { Section } from "@/components/blocks/section";
import { WarningBlock } from "@/components/blocks/callout";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

const title = "Terms of Use";
const description = "The terms that govern use of MaterialsCalc's calculators and guides.";
const path = "/terms";

export const metadata = buildMetadata({ title, description, path });

export default function TermsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title, description, path })} />
      <Hero
        eyebrow="Legal"
        variant="compact"
        title="Terms of use"
        description="Effective July 15, 2026."
      >
        <Breadcrumbs items={breadcrumbTrail({ label: "Terms of Use", href: path })} />
      </Hero>
      <Container size="narrow" className="space-y-10 py-12">
        <WarningBlock title="Estimates, not engineering">
          Everything on this site — calculators, tables, guides — provides planning
          estimates for material quantities and budgets. It is not engineering,
          architectural, or professional construction advice. Structural decisions must
          follow your local building code and, where required, a licensed professional.
          Always confirm final quantities with your supplier before ordering.
        </WarningBlock>
        <Section title="Acceptable use">
          <p className="text-muted-foreground">
            You may use the calculators and reference tables freely for personal and
            commercial estimating, and you may quote small excerpts with attribution and a
            link. You may not scrape, republish, or redistribute substantial portions of
            the site&apos;s content or data tables without written permission.
          </p>
        </Section>
        <Section title="No warranty">
          <p className="text-muted-foreground">
            Content is provided &quot;as is.&quot; We work hard to keep formulas correct and
            data current, but we make no warranty of accuracy, completeness, or fitness for
            a particular purpose, and we accept no liability for losses arising from use of
            the site — including ordering errors. Densities, prices and coverage rates vary
            by region, supplier and product; the numbers on your delivery ticket govern.
          </p>
        </Section>
        <Section title="Changes">
          <p className="text-muted-foreground">
            We may update these terms as the site evolves; the effective date above will
            change accordingly. Continued use after an update constitutes acceptance.
          </p>
        </Section>
      </Container>
    </>
  );
}
