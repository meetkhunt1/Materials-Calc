import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock, TipBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { BarChart } from "@/components/charts/bar-chart";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { pick, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { getAuthor } from "@/data/authors";
import {
  GRAVEL,
  coreGuideLinks,
  referenceLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "gravel-coverage-guide";
const title = "Gravel Coverage Guide — What a Ton & a Yard Cover";
const description =
  "Coverage tables for a ton and a cubic yard of gravel at 1–6 inch depths, a worked sizing example, and the three factors — compaction, subgrade, waste — that quietly shrink real-world coverage.";
const path = GRAVEL.coverage;
const author = getAuthor("materials-team");
const datePublished = "2026-07-16";

const heroVariant = pick(slug, HERO_VARIANTS);
const tocPosition = pick(slug, ["toc-right", "toc-left"] as const);
const faqVariant = pick(slug, ["accordion", "list"] as const);
const relatedStyle = pick(slug, RELATED_STYLES);
const ctaVariant = pick(slug, ["banner", "card", "inline"] as const);

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: datePublished,
});

const faqItems: FaqItem[] = [
  {
    question: "How much does a ton of gravel cover?",
    answer:
      "At the typical loose density of 105 lb/ft³, a US ton is about 19 cubic feet of gravel — roughly 114 ft² at 2 inches deep, 76 ft² at 3 inches, or 57 ft² at 4 inches. The industry rule of thumb of 100 ft² per ton at 2 inches builds in a margin for settling and edge waste, which is why it survives on every quarry's price sheet.",
  },
  {
    question: "How much does a cubic yard of gravel cover?",
    answer:
      "A cubic yard is exactly 27 cubic feet regardless of gravel type, so coverage is pure geometry: 162 ft² at 2 inches, 108 ft² at 3 inches, 81 ft² at 4 inches. Unlike per-ton coverage, these numbers never change with density — only real-world losses like compaction and spillage eat into them.",
  },
  {
    question: "Why does my gravel never cover as much as the chart says?",
    answer:
      "Three reasons: gravel consolidates 5–15% under foot and vehicle traffic, an unlevel subgrade swallows extra stone in its low spots, and some material is always lost to edges, spillage and the last shovelful in the truck bed. Together they routinely cost 10–20% of theoretical coverage — which is exactly what the standard waste allowance exists to absorb.",
  },
  {
    question: "Does gravel type change coverage per ton?",
    answer:
      "Yes, because coverage per ton is driven by density. Light pea gravel at 96 lb/ft³ stretches to about 125 ft² at 2 inches, while dense crusher run at 125 lb/ft³ loose manages only 96 ft² — and just 86 ft² once compacted to 140 lb/ft³. Per-yard coverage, by contrast, is identical for every type.",
  },
  {
    question: "How do I convert coverage back into an order quantity?",
    answer:
      "Divide your area by the coverage figure for your depth and material, then add 10% (15% if the stone will be compacted or the ground is rough). A 600 ft² driveway topping at 3 inches with common gravel: 600 ÷ 76 = 7.9 tons, times 1.10 ≈ 8.7 — order 9 tons.",
  },
  {
    question: "Is it cheaper to order by coverage per ton or per yard?",
    answer:
      "Neither is inherently cheaper — a supplier's ton and yard prices describe the same stone. What matters is comparing like with like: convert every quote to cost per ton using the material's density (a yard of common gravel is about 1.42 tons loose) before deciding. The gravel cost calculator does this conversion automatically.",
  },
];

const toc = tocFromTitles(
  "What a ton of gravel covers",
  "What a cubic yard covers",
  "Worked example: sizing a parking pad",
  "What shrinks real-world coverage",
  "Coverage by gravel type",
);

export default function GravelCoverageGuidePage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
          datePublished,
          author,
        })}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Coverage Guide"
              variant={heroVariant}
              title="Gravel coverage guide"
              description="A ton of gravel covers 114 ft² at 2 inches — until compaction, a wavy subgrade and edge waste take their cut. Here are the honest coverage numbers, per ton and per yard, at every practical depth."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Coverage Guide", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="What a ton of gravel covers">
          <p className="text-muted-foreground">
            A US ton (2,000 lb) of common gravel at 105 lb/ft³ loose is about 19 cubic
            feet of stone. Spread thinner, it goes further — coverage scales inversely
            with depth, so halving the depth doubles the footage. The table gives the
            straight geometric numbers; the popular &ldquo;100 ft² per ton at 2
            inches&rdquo; rule of thumb is simply the 2-inch row with a built-in
            settling margin.
          </p>
          <CoverageTable
            headers={["Depth", "Coverage per ton", "Where that depth belongs"]}
            rows={[
              { label: "1 inch", spec: "≈ 229 ft²", coverage: "Refresh top-ups only", note: "Too thin for new cover — the fabric shows" },
              { label: "2 inches", spec: "≈ 114 ft²", coverage: "Decorative cover over fabric", note: "Rule of thumb: 100 ft² after allowance" },
              { label: "3 inches", spec: "≈ 76 ft²", coverage: "Paths, patios, pet areas" },
              { label: "4 inches", spec: "≈ 57 ft²", coverage: "One compacted driveway lift" },
              { label: "5 inches", spec: "≈ 46 ft²", coverage: "Heavy-traffic single lift" },
              { label: "6 inches", spec: "≈ 38 ft²", coverage: "Base course, drainage beds" },
            ]}
            caption="Coverage per US ton of common gravel (105 lb/ft³ loose). Divide your area by the coverage figure to get tons."
          />
          <p className="text-muted-foreground">
            These figures assume common gravel. Lighter and heavier types shift them —
            the{" "}
            <a href={GRAVEL.densityChart} className="font-medium text-primary hover:underline">
              density chart
            </a>{" "}
            has the unit weight for every type, and the last section below shows what
            that does to coverage.
          </p>
        </Section>

        <Section title="What a cubic yard covers">
          <p className="text-muted-foreground">
            Per-yard coverage is friendlier than per-ton coverage because it ignores
            density entirely: a cubic yard is 27 ft³ of any material, so the same table
            works for pea gravel, crusher run and river rock alike. That makes yards
            the safer unit when you are still choosing the gravel type.
          </p>
          <CoverageTable
            headers={["Depth", "Coverage per cubic yard", "Note"]}
            rows={[
              { label: "1 inch", spec: "324 ft²", coverage: "27 ft³ ÷ (1/12 ft)" },
              { label: "2 inches", spec: "162 ft²", coverage: "≈ 1.42 tons of common gravel" },
              { label: "3 inches", spec: "108 ft²", coverage: "The all-purpose landscaping depth" },
              { label: "4 inches", spec: "81 ft²", coverage: "One driveway lift" },
              { label: "5 inches", spec: "65 ft²", coverage: "" },
              { label: "6 inches", spec: "54 ft²", coverage: "Two 3-inch lifts compact better than one 6-inch" },
            ]}
            caption="Coverage per loose cubic yard — identical for every gravel type, since a yard is a volume, not a weight."
          />
        </Section>

        <Section title="Worked example: sizing a parking pad">
          <ExampleBlock
            scenario="A 20 × 24 ft gravel parking pad topped with 3 inches of common gravel over an existing compacted base."
            steps={[
              { label: "Area", work: "20 × 24 = 480 ft²" },
              { label: "Tons from the coverage table", work: "480 ÷ 76 ft²/ton = 6.3 tons" },
              { label: "Cross-check in yards", work: "480 × 0.25 ft = 120 ft³ ÷ 27 = 4.4 yd³ (× 1.42 = 6.3 tons ✓)" },
              { label: "Add 10% for settling and edges", work: "6.3 × 1.10 = 6.9 tons" },
            ]}
            result="Order 7 tons (about 5 loose cubic yards). The two routes to 6.3 tons agreeing is your arithmetic check."
          />
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Coverage questions" />

        <Section title="What shrinks real-world coverage">
          <p className="text-muted-foreground">
            Charts describe gravel resting loose on a perfectly flat plane. Real sites
            take three predictable bites out of that number, and experienced estimators
            price them in rather than hoping they won&apos;t happen.
          </p>
          <WarningBlock title="Compaction is not optional — it happens either way">
            Gravel consolidates 5–15% whether you run a plate compactor over it or just
            let traffic and rain do the work over the first season. Crusher run with its
            fines loses the most volume (its density climbs from 125 to about 140
            lb/ft³); clean single-size stone like #57 loses the least. If you spread
            exactly the chart quantity, the surface will sit visibly low within months.
          </WarningBlock>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Irregular subgrade</strong> is the second
            thief. A subgrade that undulates by an inch means your &ldquo;3-inch&rdquo;
            layer is really 2–4 inches — and the low spots must be filled to reach the
            target surface, consuming stone the flat-plane math never counted. Grading
            before delivery is cheaper than the extra tonnage it saves.{" "}
            <strong className="text-foreground">Waste</strong> takes the last cut:
            spillage at the edges, stone trodden into soft ground during spreading, and
            the material that never quite leaves the truck bed. The standard remedy for
            all three is a 10% allowance, raised to 15% for compacted crusher run or
            rough ground — the same allowance built into the{" "}
            <a href={GRAVEL.howTo} className="font-medium text-primary hover:underline">
              five-step calculation method
            </a>
            .
          </p>
        </Section>

        <Section title="Coverage by gravel type">
          <BarChart
            title="Coverage per ton at 2 inches deep, by type"
            unit="ft²"
            monochrome={false}
            data={[
              { label: "Pea gravel (96 lb/ft³)", value: 125 },
              { label: "#57 stone (100 lb/ft³)", value: 120 },
              { label: "Common gravel (105 lb/ft³)", value: 114 },
              { label: "Crusher run, loose (125 lb/ft³)", value: 96 },
              { label: "Crusher run, compacted (140 lb/ft³)", value: 86 },
            ]}
          />
          <p className="text-muted-foreground">
            The spread is worth money: a ton of pea gravel covers 45% more area than a
            ton of compacted crusher run at the same depth. When comparing per-ton
            quotes across types, convert to cost per covered square foot — the{" "}
            <a href={GRAVEL.weightChart} className="font-medium text-primary hover:underline">
              weight chart
            </a>{" "}
            has the per-yard weights that make the conversion quick.
          </p>
          <TipBlock title="Check the compacted row, not the loose one">
            If the stone will be compacted — any driveway or base course — size the
            order from the compacted density. Ordering crusher run off the loose figure
            leaves the finished surface about an inch low on a 4-inch lift.
          </TipBlock>
          <Cta
            variant={ctaVariant}
            title="Get tons and yards for your exact dimensions"
            href={GRAVEL.calculator}
            buttonLabel="Gravel Calculator"
          />
        </Section>

        <RelatedArticles
          title="Keep estimating"
          variant={relatedStyle}
          items={[
            ...pickLinks(coreGuideLinks, GRAVEL.howTo, GRAVEL.weightChart, GRAVEL.measurement),
            ...pickLinks(referenceLinks, GRAVEL.refCoverage),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.astmC29, GREFS.fhwaGravel, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
