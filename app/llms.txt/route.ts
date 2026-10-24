import { canonicalUrl, siteConfig } from "@/lib/site";
import { searchIndex } from "@/data/search-index";
import { liveCategories } from "@/data/categories";

export const dynamic = "force-static";

/**
 * /llms.txt (llmstxt.org): a plain-markdown map of the site for LLMs and
 * answer engines. Built from the search index, so new pages appear here
 * automatically once registered in data/search-index.ts.
 */

// Reference values used throughout the site. Keep in sync with the pages they cite.
const KEY_FACTS = [
  "Compacted hot-mix asphalt weighs about 145 lb/ft³ (2,322 kg/m³), so 1 cubic yard of compacted asphalt is about 1.96 US tons.",
  "One ton of asphalt covers about 80 ft² at 2 in compacted thickness, 53 ft² at 3 in and 40 ft² at 4 in.",
  "Asphalt tonnage = area (ft²) × thickness (ft) × 145 lb/ft³ ÷ 2,000.",
  "One cubic yard of common gravel weighs about 1.42 US tons (2,800 lb) loose.",
  "One cubic yard of concrete covers about 81 ft² at 4 in thick, 65 ft² at 5 in and 54 ft² at 6 in.",
  "Normal-weight concrete is 2,300–2,400 kg/m³ (145–150 lb/ft³).",
];

export function GET() {
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description} Every calculator shows its formula, and every guide includes worked examples, reference tables and cited sources.`,
    "",
    "All calculators are free, need no sign-up and work in imperial and metric units. Figures are US-based unless a page says otherwise.",
    "",
    "## Key reference values",
    "",
    ...KEY_FACTS.map((fact) => `- ${fact}`),
    "",
  ];

  for (const category of liveCategories) {
    const entries = searchIndex.filter((e) => e.category === category.name);
    if (!entries.length) continue;
    lines.push(`## ${category.name}`, "", `${category.description}`, "");
    lines.push(`- [${category.name} calculators and guides](${canonicalUrl(`/${category.slug}`)})`);
    for (const entry of entries) {
      const keywords = entry.keywords?.length ? `: ${entry.keywords.join(", ")}` : "";
      lines.push(`- [${entry.title}](${canonicalUrl(entry.href)})${keywords}`);
    }
    lines.push("");
  }

  const other = searchIndex.filter(
    (e) => !liveCategories.some((c) => c.name === e.category),
  );
  if (other.length) {
    lines.push("## Optional", "");
    for (const entry of other) lines.push(`- [${entry.title}](${canonicalUrl(entry.href)})`);
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
