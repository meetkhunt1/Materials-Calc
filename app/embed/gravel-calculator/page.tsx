import { GravelCalculatorCard } from "@/content/gravel/calculators/cards";
import { GRAVEL } from "@/content/gravel/links";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Gravel Calculator (Embeddable Widget)",
  description: "Embeddable gravel calculator widget for third-party sites.",
  path: "/embed/gravel-calculator",
  noIndex: true,
});

export default function EmbedGravelCalculatorPage() {
  return (
    <>
      <GravelCalculatorCard />
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Free calculator provided by{" "}
        <a
          href={`${siteConfig.url}${GRAVEL.calculator}`}
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
