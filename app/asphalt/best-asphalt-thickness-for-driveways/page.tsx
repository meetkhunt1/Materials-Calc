import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock } from "@/components/blocks/callout";
import { ComparisonTable } from "@/components/tables/comparison-table";
import { BarChart } from "@/components/charts/bar-chart";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, drivewayGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Best Asphalt Thickness for Driveways (2, 3 or 4 Inches?)";
const description =
  "2, 3 or 4 inches of asphalt for a driveway? The engineering answer: 3 in compacted hot mix in two lifts over 6 in of aggregate base for cars and pickups — with the tonnage, cost and lifespan numbers for each option.";
const path = ASPHALT.drivewayThickness;
const author = getAuthor("materials-team");

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
});

const faqItems: FaqItem[] = [
  {
    question: "Is 2 inches of asphalt enough for a driveway?",
    answer:
      "Only for light passenger cars on an excellent, well-drained 6 in base — and even then it is the economy option, not the recommended one. Two inches leaves no reserve for a loaded pickup, a moving truck or a concrete delivery, and it typically gives up 5–10 years of life versus a 3 in section. The savings are small; the downside is not.",
  },
  {
    question: "Why is 3 inches the standard driveway thickness?",
    answer:
      "Three inches compacted, placed as a 2 in binder lift plus a 1–1.5 in surface lift over 6 in of aggregate base, handles cars, SUVs and occasional heavy service vehicles with a 15–25 year design life. It is the point where added thickness stops buying meaningful life for residential loads — the sweet spot NAPA design guidance lands on for driveways.",
  },
  {
    question: "Is thickness measured before or after compaction?",
    answer:
      "Always compacted (in-place) thickness. Hot mix compresses about 20–25% under the roller, so a crew must lay roughly 4 in loose to finish at 3 in compacted. When comparing quotes, make contractors state compacted thickness in writing — quoting loose thickness is the oldest trick in residential paving.",
  },
  {
    question: "When is 4 inches of asphalt worth it?",
    answer:
      "When the driveway regularly carries heavy loads: an RV or boat trailer, a work truck with equipment, or frequent deliveries. Four inches (placed in two lifts) over a proper base behaves like light commercial pavement. It is also cheap insurance on marginal subgrades — though on true clay, upgrading the base to 8 in matters more than the extra asphalt.",
  },
  {
    question: "Does a thicker driveway need a thicker gravel base?",
    answer:
      "The base is set by the soil, not the asphalt. Standard is 6 in of compacted aggregate; go to 8 in over clay or poorly drained subgrade regardless of asphalt thickness. Asphalt spreads the wheel load, but the base carries it — 4 in of hot mix on 3 in of gravel will fail before 3 in of hot mix on a proper 6 in base.",
  },
  {
    question: "How many tons of asphalt do I need per inch of thickness?",
    answer:
      "At the standard compacted density of 145 lb/ft³, each inch of thickness weighs about 12.1 lb/ft² — roughly 3.6 tons per 600 ft² per inch. At the standard 3 in, one ton covers about 53 ft². Run your exact footprint through the driveway calculator to get tonnage with waste included.",
  },
];

const toc = tocFromTitles(
  "2 vs 3 vs 4 inches compared",
  "What each thickness weighs and costs",
  "Why the base decides everything",
  "Worked example: upgrading 2 in to 3 in",
);

export default function DrivewayThicknessPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Asphalt",
          datePublished: "2026-07-15",
          author,
        })}
      />
      <ArticleShell
        tocPosition="toc-left"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Driveway Guide"
              variant="centered"
              title="Best asphalt thickness for driveways"
              description="The short answer is 3 inches compacted — a 2 in binder lift plus a 1–1.5 in surface lift over 6 in of aggregate base. The long answer is knowing when 2 or 4 inches is the right call instead."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Best Asphalt Thickness for Driveways", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="2 vs 3 vs 4 inches compared">
          <ComparisonTable
            caption="Compacted thickness over a properly compacted aggregate base. Tonnage at 145 lb/ft³, geometric — add 5–15% waste when ordering."
            columns={[
              { key: "two", label: "2 in" },
              { key: "three", label: "3 in (recommended)", highlight: true },
              { key: "four", label: "4 in" },
            ]}
            rows={[
              {
                feature: "Suitable vehicles",
                values: {
                  two: "Passenger cars only",
                  three: "Cars, SUVs, pickups, occasional trucks",
                  four: "RVs, trailers, regular heavy vehicles",
                },
              },
              {
                feature: "Base needed",
                values: {
                  two: "6 in, flawless drainage",
                  three: "6 in standard (8 in on clay)",
                  four: "6–8 in",
                },
              },
              {
                feature: "Tons per 600 ft²",
                values: { two: "7.3", three: "10.9", four: "14.5" },
              },
              {
                feature: "Relative installed cost",
                values: { two: "Baseline", three: "+10–15%", four: "+20–30%" },
              },
              {
                feature: "Expected life",
                values: { two: "8–15 years", three: "15–25 years", four: "20–30 years" },
              },
            ]}
          />
          <p className="text-muted-foreground">
            Note the cost column: because excavation, base and mobilization dominate the
            budget, going from 2 in to 3 in raises the total project cost only 10–15% while
            roughly doubling the realistic service life. That asymmetry is why 3 in is the
            default answer. For parking lots, roads and commercial sections, the{" "}
            <a href={ASPHALT.thickness} className="font-medium text-primary hover:underline">
              general thickness guide
            </a>{" "}
            covers the heavier designs.
          </p>
        </Section>

        <Section title="What each thickness weighs and costs">
          <BarChart
            title="Hot mix required for a 600 ft² driveway (tons, before waste)"
            unit="tons"
            data={[
              { label: "2 in", value: 7.3 },
              { label: "3 in", value: 10.9 },
              { label: "4 in", value: 14.5 },
            ]}
          />
          <p className="text-muted-foreground">
            Each extra inch adds about 3.6 tons per 600 ft². At typical hot mix pricing of
            $100–150 per ton delivered, the material for the 2-to-3 in upgrade on this
            driveway is $360–540 — a rounding error against the $3,000–6,000 total project,
            and the cheapest decade of pavement life money can buy.
          </p>
        </Section>

        <Section title="Why the base decides everything">
          <WarningBlock title="Thin asphalt over a weak base always fails the same way">
            Alligator cracking — the interconnected fatigue pattern that looks like reptile
            skin — is a base failure, not a surface failure, and no asphalt thickness
            prevents it over soft or saturated ground. If the subgrade pumps or the base is
            under-compacted, 4 in cracks just like 2 in, only more expensively. Spend on
            6 in of compacted aggregate (8 in on clay) and drainage before spending on a
            fourth inch of asphalt.
          </WarningBlock>
          <p className="text-muted-foreground">
            The asphalt layer distributes wheel loads; the base carries them and drains
            water away from the subgrade. Per FHWA mix-selection guidance, surface and
            binder lifts should each be at least three times the mix&apos;s maximum aggregate
            size — one reason driveways use two lifts rather than one thick pass.
          </p>
        </Section>

        <Section title="Worked example: upgrading 2 in to 3 in">
          <ExampleBlock
            scenario="A 12 × 40 ft single driveway (480 ft²) quoted at 2 in compacted. What does upgrading to the recommended 3 in actually cost?"
            steps={[
              {
                label: "Extra material volume",
                work: "480 ft² × (1 ÷ 12) ft = 40 ft³ of additional hot mix",
              },
              { label: "Extra weight at 145 lb/ft³", work: "40 × 145 = 5,800 lb ≈ 2.9 tons" },
              {
                label: "Extra material cost at $100–150/ton",
                work: "2.9 × $100–150 = $290–435",
              },
              {
                label: "Extra placement cost",
                work: "Same crew, same day, one slightly thicker binder lift — typically $100–200 more in labor",
              },
            ]}
            result="Roughly $400–650 extra on a ~$3,500 project buys an expected life of 15–25 years instead of 8–15. Take the upgrade."
          />
        </Section>

        <Faq items={faqItems} variant="accordion" title="Thickness questions" />

        <Cta
          variant="banner"
          title="Get tonnage for your exact thickness"
          description="The driveway calculator prices 2, 3 and 4 in sections with base gravel included."
          href={ASPHALT.driveway}
          buttonLabel="Driveway Calculator"
        />

        <RelatedArticles
          title="Keep planning the driveway"
          variant="cards"
          items={pickLinks(
            drivewayGuideLinks,
            ASPHALT.drivewayDimensions,
            ASPHALT.drivewayInstall,
            ASPHALT.drivewayCost,
          )}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.fhwa]} />
      </ArticleShell>
    </>
  );
}
