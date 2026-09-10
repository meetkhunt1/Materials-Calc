import { AsphaltCalculatorCard } from "@/content/asphalt/calculators/cards";
import { ASPHALT } from "@/content/asphalt/links";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Asphalt Calculator (Embeddable Widget)",
  description: "Embeddable asphalt calculator widget for third-party sites.",
  path: "/embed/asphalt-calculator",
  noIndex: true,
});

export default function EmbedAsphaltCalculatorPage() {
  return (
    <>
      <AsphaltCalculatorCard />
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Free calculator provided by{" "}
        <a
          href={`${siteConfig.url}${ASPHALT.calculator}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline"
        >
          MaterialsCalc
        </a>
      </p>
    </>
  );
}
