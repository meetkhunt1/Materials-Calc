import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { Mail, Bug, FileQuestion } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

const title = "Contact MaterialsCalc";
const description =
  "Report a calculation error, suggest a calculator, or ask about the site.";
const path = "/contact";

export const metadata = buildMetadata({ title, description, path });

const channels = [
  {
    icon: Bug,
    title: "Report an error",
    body: "Found a number that doesn't check out? Tell us the page URL and the inputs you used — data corrections are our highest priority and typically ship within days.",
    email: "corrections@materialscalc.com",
  },
  {
    icon: FileQuestion,
    title: "Suggest a calculator or guide",
    body: "Tell us what you were trying to estimate and what was missing. The most-requested tools move to the top of the build list.",
    email: "suggestions@materialscalc.com",
  },
  {
    icon: Mail,
    title: "Everything else",
    body: "Partnerships, licensing our data tables, press, or anything that doesn't fit above.",
    email: "hello@materialscalc.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title, description, path })} />
      <Hero
        eyebrow="Contact"
        variant="compact"
        title="Get in touch"
        description="No forms, no tickets — email the right inbox and a human reads it."
      >
        <Breadcrumbs items={breadcrumbTrail({ label: "Contact", href: path })} />
      </Hero>
      <Container size="narrow" className="py-12">
        <div className="space-y-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div key={channel.email} className="flex gap-4 rounded-xl border p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="font-semibold">{channel.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {channel.body}
                  </p>
                  <a
                    href={`mailto:${channel.email}`}
                    className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    {channel.email}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}
