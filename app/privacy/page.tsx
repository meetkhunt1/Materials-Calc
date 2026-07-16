import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { Section } from "@/components/blocks/section";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

const title = "Privacy Policy";
const description = "How MaterialsCalc handles your data — which is to say, barely at all.";
const path = "/privacy";

export const metadata = buildMetadata({ title, description, path, noIndex: false });

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title, description, path })} />
      <Hero
        eyebrow="Legal"
        variant="compact"
        title="Privacy policy"
        description="Effective July 15, 2026."
      >
        <Breadcrumbs items={breadcrumbTrail({ label: "Privacy Policy", href: path })} />
      </Hero>
      <Container size="narrow" className="space-y-10 py-12">
        <Section title="What we collect">
          <p className="text-muted-foreground">
            Calculator inputs are processed entirely in your browser — dimensions, prices and
            results are never transmitted to or stored on our servers. If you subscribe to the
            newsletter, we store the email address you provide, used solely to send the
            updates you requested.
          </p>
        </Section>
        <Section title="Analytics & cookies">
          <p className="text-muted-foreground">
            We use privacy-respecting, aggregate analytics to understand which pages are
            useful (page views, referrers, country-level location). We do not build
            individual profiles, and we do not sell or share visitor data with third
            parties. Functional cookies, where used, exist only to remember interface
            preferences.
          </p>
        </Section>
        <Section title="Third-party links">
          <p className="text-muted-foreground">
            Guides link to external standards bodies and references (ASTM, ACI, government
            sites). Their privacy practices are their own; this policy covers only
            materialscalc.com.
          </p>
        </Section>
        <Section title="Your rights & contact">
          <p className="text-muted-foreground">
            You can unsubscribe from the newsletter with one click at any time, and you may
            request deletion of your email address by writing to hello@materialscalc.com.
            Material changes to this policy will be dated at the top of this page.
          </p>
        </Section>
      </Container>
    </>
  );
}
