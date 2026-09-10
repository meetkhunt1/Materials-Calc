import { ConcreteCalculatorCard } from "@/content/concrete/calculators/cards";
import { CONCRETE } from "@/content/concrete/links";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Concrete Calculator (Embeddable Widget)",
  description: "Embeddable concrete calculator widget for third-party sites.",
  path: "/embed/concrete-calculator",
  noIndex: true,
});

export default function EmbedConcreteCalculatorPage() {
  return (
    <>
      <ConcreteCalculatorCard />
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Free calculator provided by{" "}
        <a
          href={`${siteConfig.url}${CONCRETE.calculator}`}
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
