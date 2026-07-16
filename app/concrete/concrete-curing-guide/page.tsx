import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock, TipBlock, InfoBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { ComparisonTable } from "@/components/tables/comparison-table";
import { BarChart } from "@/components/charts/bar-chart";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, howToSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { CONCRETE, guideLinks, calculatorLinks, pickLinks, REFS } from "@/content/concrete/links";
import type { FaqItem } from "@/types";

const title = "Concrete Curing Guide — Times, Methods & Strength Gain";
const description =
  "How concrete gains strength and how to cure it properly: the 7-day moist-cure rule, strength-vs-age data, curing methods compared, and hot/cold weather adjustments.";
const path = CONCRETE.curing;
const author = getAuthor("materials-team");

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
});

const curingSteps = [
  { name: "Finish and wait for set", text: "Begin curing as soon as the surface can't be marred — within an hour of finishing in warm weather." },
  { name: "Keep it wet for 7 days", text: "Water cure (ponding, wet burlap, soakers) or seal moisture in with curing compound or sheeting per ACI 308." },
  { name: "Protect from temperature extremes", text: "Keep concrete above 50°F (10°C) for strength gain; blanket it in cold, shade and fog-spray in heat." },
  { name: "Load progressively", text: "Foot traffic at 24–48 hrs, vehicles at 7 days, design loads at 28 days unless tests say sooner." },
];

const faqItems: FaqItem[] = [
  {
    question: "How long does concrete take to cure?",
    answer:
      "Concrete reaches about 65–70% of design strength in 7 days and its specified strength at 28 days — the age all codes benchmark. It never fully 'finishes': hydration continues for years at a diminishing rate as long as moisture is present.",
  },
  {
    question: "When can I walk or drive on new concrete?",
    answer:
      "Foot traffic after 24–48 hours, passenger vehicles after 7 days, heavy trucks after 28 days. Cold weather stretches every one of those numbers — the timeline is strength-based, not calendar-based.",
  },
  {
    question: "What happens if concrete dries too fast?",
    answer:
      "Hydration stops without water. A slab that dries out in the first days can permanently lose 30–50% of potential strength at the surface, and it shows up as dusting, plastic shrinkage cracks and poor abrasion resistance. Curing is cheap; weak concrete is forever.",
  },
  {
    question: "Should I spray water on new concrete?",
    answer:
      "Yes — after final set, keeping the surface continuously wet for 7 days is the gold-standard cure (ponding and wet coverings beat everything else in strength tests). The one mistake is spraying during finishing: working bleed water into the surface weakens it.",
  },
  {
    question: "Does curing compound work as well as water curing?",
    answer:
      "Membrane compounds (ASTM C309) retain enough moisture for ~90% of the water-cured result with a fraction of the labor, which is why they dominate commercial flatwork. Skip them where floors will receive coatings or toppings — the membrane interferes with bonding.",
  },
  {
    question: "How cold is too cold to pour concrete?",
    answer:
      "ACI 306 defines cold weather as below 40°F (4°C). Pouring is fine with precautions — heated water, accelerator, insulated blankets — but concrete must not freeze before reaching 500 psi (roughly 24–48 hrs). Fresh concrete that freezes loses up to half its ultimate strength.",
  },
];

const toc = tocFromTitles(
  "Strength vs age: the 28-day curve",
  "The curing timeline",
  "Curing methods compared",
  "Hot and cold weather adjustments",
  "Worked example: when can the forms come off?",
);

export default function CuringGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title,
            description,
            path,
            category: "Concrete",
            datePublished: "2026-07-15",
            author,
          }),
          howToSchema({
            name: "How to Cure Concrete",
            description: "Four-step curing procedure per ACI 308.",
            path,
            steps: curingSteps,
            totalTime: "P7D",
          }),
        ]}
      />
      <ArticleShell
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Concrete · Curing"
              variant="stat-strip"
              title="Concrete curing guide"
              description="You paid for 4,000 psi concrete — curing is how you actually get it. The chemistry, the timeline, and the methods ranked by effectiveness."
              stats={[
                { value: "7 days", label: "minimum moist cure (ACI 308)" },
                { value: "65%", label: "of strength at day 7" },
                { value: "28 days", label: "specified strength age" },
                { value: "50°F+", label: "productive curing temp" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Concrete", href: CONCRETE.hub },
                  { label: "Curing Guide", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Still at the ordering stage?"
            description="Volume first, curing plan second."
            href={CONCRETE.calculator}
            buttonLabel="Concrete Calculator"
          />
        }
      >
        <Section title="Strength vs age: the 28-day curve">
          <BarChart
            title="Typical strength gain, moist-cured at 70°F (% of 28-day f′c)"
            unit="%"
            data={[
              { label: "1 day", value: 16 },
              { label: "3 days", value: 40 },
              { label: "7 days", value: 65 },
              { label: "14 days", value: 90 },
              { label: "28 days", value: 100 },
              { label: "90 days", value: 115 },
            ]}
          />
          <p className="text-muted-foreground">
            The curve is steep exactly when concrete is most often abused. Half the strength
            you&apos;ll ever get arrives in the first week — and only if water is present for
            the cement to hydrate. Cut curing short at day 2 and the surface locks in at a
            fraction of its design strength, no matter how good the{" "}
            <a href={CONCRETE.mixRatio} className="font-medium text-primary hover:underline">
              mix ratio
            </a>{" "}
            was.
          </p>
        </Section>

        <Section title="The curing timeline">
          <CoverageTable
            headers={["Age", "Milestone", "What's allowed"]}
            rows={[
              { label: "0–4 hours", spec: "Initial set", coverage: "Finishing operations only" },
              { label: "24–48 hours", spec: "~500 psi, final set", coverage: "Foot traffic; strip vertical forms (walls)", note: "Keep curing measures on" },
              { label: "7 days", spec: "≈65% of f′c", coverage: "Passenger vehicles on slabs; end minimum moist cure" },
              { label: "14 days", spec: "≈90% of f′c", coverage: "Light construction loading" },
              { label: "28 days", spec: "100% of specified f′c", coverage: "Full design loads; acceptance testing (ASTM C39)" },
            ]}
            caption="Type I/GU cement at ~70°F. High-early (Type III) mixes compress this timeline; cold stretches it."
          />
        </Section>

        <Section title="Curing methods compared">
          <ComparisonTable
            caption="Effectiveness relative to continuous water curing, per ACI 308R guidance and PCA test data."
            columns={[
              { key: "how", label: "How it works" },
              { key: "eff", label: "Effectiveness" },
              { key: "fit", label: "Best fit" },
            ]}
            rows={[
              { feature: "Ponding / continuous spray", values: { how: "Free water on surface", eff: "100% — benchmark", fit: "Flat slabs, test panels" } },
              { feature: "Wet burlap + plastic", values: { how: "Saturated covering, re-wet daily", eff: "95–100%", fit: "Slabs, columns, small crews" } },
              { feature: "Plastic sheeting alone", values: { how: "Traps bleed/mix water", eff: "85–95%", fit: "Cool weather; watch discoloration" } },
              { feature: "Curing compound (C309)", values: { how: "Sprayed membrane seals moisture", eff: "~90%", fit: "Large flatwork, windy sites" } },
              { feature: "Leave forms in place", values: { how: "Forms block evaporation", eff: "Good for formed faces", fit: "Walls and columns, first 3–7 days" } },
              { feature: "Nothing (air dry)", values: { how: "—", eff: "50–70%, surface worse", fit: "Never acceptable" } },
            ]}
          />
        </Section>

        <Section title="Hot and cold weather adjustments">
          <div className="grid gap-4 sm:grid-cols-2">
            <WarningBlock title="Hot weather (ACI 305)">
              <p>
                Above ~85°F with wind, plastic-shrinkage cracking starts within minutes.
                Dampen the subgrade, pour early morning, fog-spray between finishing passes,
                and get curing cover on immediately. Evaporation retarders are cheap insurance.
              </p>
            </WarningBlock>
            <InfoBlock title="Cold weather (ACI 306)">
              <p>
                Below 40°F, hydration crawls and freezing is the kill risk. Order heated mix
                water and 1–2% accelerator, place against unfrozen ground only, and blanket for
                a minimum of 3 days. Never pour on frost — the slab settles when it thaws.
              </p>
            </InfoBlock>
          </div>
          <TipBlock title="The blanket rule of thumb">
            Insulated blankets hold hydration heat in: a covered 4-inch slab typically keeps
            itself 20–30°F above ambient for the first 48 hours — usually enough to self-cure
            through a frosty night without heaters.
          </TipBlock>
        </Section>

        <Section title="Worked example: when can the forms come off?">
          <ExampleBlock
            scenario="An 8 ft foundation wall poured Monday at 8 am, daytime 60°F, nights at 45°F. When do panels strip, and when can it be backfilled?"
            steps={[
              { label: "Form pressure gone (final set)", work: "Monday evening — but strength, not set, governs stripping" },
              { label: "Strip walls at ~500–750 psi", work: "48 hrs at these temps → Wednesday am" },
              { label: "Keep curing after stripping", work: "Sheeting or compound through day 7 → following Monday" },
              { label: "Backfill (needs ~2,000+ psi and first-floor bracing)", work: "Day 7–10, with equipment kept off the wall line" },
            ]}
            result="Strip Wednesday, cure to Monday, backfill after day 7 with the floor framing on."
          />
        </Section>

        <Faq items={faqItems} variant="list" title="Curing questions" />

        <RelatedArticles
          title="Plan the pour end-to-end"
          variant="cards"
          items={[
            ...pickLinks(calculatorLinks, CONCRETE.wall, CONCRETE.slab),
            ...pickLinks(guideLinks, CONCRETE.mixRatio),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[REFS.aci308, REFS.pca, REFS.aci318]} />
      </ArticleShell>
    </>
  );
}
