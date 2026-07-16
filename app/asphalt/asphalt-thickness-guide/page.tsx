import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { WarningBlock } from "@/components/blocks/callout";
import { CoverageTable } from "@/components/tables/coverage-table";
import { ComparisonTable } from "@/components/tables/comparison-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import {
  ASPHALT,
  asphaltCalculatorLinks,
  coreGuideLinks,
  drivewayGuideLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Thickness Guide — Lifts, Layers & Applications";
const description =
  "How thick should asphalt be? 2 in for paths, 3 in over 6 in of base for driveways, 4 in for parking lots, 6–8 in of structure for streets — plus lift rules, layer roles and a worked RV-pad example.";
const path = ASPHALT.thickness;
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
    question: "How thick should an asphalt driveway be?",
    answer:
      "3 inches of compacted hot mix over 6 inches of compacted aggregate base is the residential standard, usually placed as one binder lift and one surface lift or as a single 3 in lift on smaller jobs. Households with trucks, trailers or RVs should step up to 4 in. The base matters as much as the asphalt — most driveway failures are base failures.",
  },
  {
    question: "Is 2 inches of asphalt enough for a driveway?",
    answer:
      "Only as an overlay on sound existing pavement. As new construction on aggregate, 2 in carries foot traffic and the occasional car but ruts and cracks under regular vehicle loads within a few seasons. The saving is small — going 2 in to 3 in adds about one ton per 160 ft², roughly $125 in material — and the life difference is measured in decades.",
  },
  {
    question: "What is a lift in asphalt paving?",
    answer:
      "One paver pass compacted before the next is placed. Thick sections go down in multiple lifts because rollers can only densify so much depth: a compacted lift is limited to roughly 3–4 in, and must be at least three times the mix's largest aggregate so stones can rearrange under the roller instead of bridging.",
  },
  {
    question: "What is the difference between binder course and surface course?",
    answer:
      "Binder course is the structural layer: larger aggregate (up to 1 in), cheaper per ton, laid thick to spread wheel loads. Surface course is the wearing layer: finer aggregate (3/8–1/2 in) for a tight, smooth, waterproof finish, laid 1.5–2 in thick. Highways add both over a deep base; a driveway may combine the duties in one lift.",
  },
  {
    question: "Does thicker asphalt need more base, too?",
    answer:
      "Usually the opposite trade is available — pavement design swaps between layers. But do not thin the base below 4–6 in on any vehicle-bearing pavement: base spreads loads on the subgrade and drains water from under the asphalt. Extra asphalt on a starved base is money layered over the failure mechanism.",
  },
];

const toc = tocFromTitles(
  "Thickness by application",
  "The layer stack, explained",
  "Lift rules that govern placement",
  "Worked example: choosing a section for an RV pad",
);

export default function AsphaltThicknessGuidePage() {
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
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Design Guide"
              variant="standard"
              title="How thick should asphalt be?"
              description="Thickness is a structural decision, not a budget knob. This guide maps applications to sections — surface, binder and base — and covers the lift rules that decide how those inches actually get placed."
            >
              <AuthorBox author={author} datePublished="2026-07-15" variant="inline" />
            </Hero>
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Thickness Guide", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Driveway-specific version"
            description="Choosing between 2, 3 and 4 inches for a driveway? There is a dedicated guide matched to vehicle types."
            href={ASPHALT.drivewayThickness}
            buttonLabel="Driveway Thickness Guide"
          />
        }
      >
        <Section title="Thickness by application">
          <CoverageTable
            headers={["Application", "Asphalt thickness", "Base underneath"]}
            rows={[
              { label: "Walking paths, bike trails", spec: "2 in, single lift", coverage: "4 in aggregate", note: "No vehicle loads" },
              { label: "Residential driveways", spec: "3 in compacted", coverage: "6 in aggregate", note: "The standard section" },
              { label: "Parking lots (cars)", spec: "4 in (2 lifts)", coverage: "6–8 in aggregate" },
              { label: "Local streets", spec: "6–8 in structure", coverage: "8–12 in aggregate", note: "Binder + surface over deep base" },
              { label: "Truck yards, loading docks", spec: "Engineered", coverage: "Designed from soil data", note: "No rule of thumb survives an 80,000 lb axle group" },
            ]}
            caption="Typical sections for average subgrades. Soft clay or poor drainage pushes every number up — that judgment is what geotechnical reports are for."
          />
        </Section>

        <Section title="The layer stack, explained">
          <ComparisonTable
            columns={[
              { key: "surface", label: "Surface course" },
              { key: "binder", label: "Binder course" },
              { key: "base", label: "Aggregate base" },
            ]}
            rows={[
              { feature: "Role", values: { surface: "Wearing skin — smooth, tight, sheds water", binder: "Structure — spreads wheel loads", base: "Foundation and drainage layer" } },
              { feature: "Typical thickness", values: { surface: "1.5–2 in", binder: "2–4 in", base: "6–12 in" } },
              { feature: "Max aggregate size", values: { surface: "3/8–1/2 in", binder: "3/4–1 in", base: "1–1.5 in crushed stone" } },
              { feature: "Material", values: { surface: "Fine-graded hot mix", binder: "Coarse-graded hot mix", base: "Dense-graded crushed aggregate" } },
              { feature: "Cost per ton", values: { surface: "Highest", binder: "~10% less", base: "$15–30 — a fraction of hot mix" } },
            ]}
            caption="Load spreads downward like a pyramid: each layer only needs to be strong enough for the (already spread) stress that reaches it."
          />
        </Section>

        <Section title="Lift rules that govern placement">
          <WarningBlock title="Two lift rules crews cannot break">
            A lift must be at least 3× the mix&apos;s maximum aggregate size — a 1 in stone
            binder cannot go down thinner than 3 in or the stones bridge and the mat tears.
            And a single lift cannot exceed roughly 3–4 in compacted, because rollers cannot
            achieve density deeper than that. A 6 in section is therefore always two lifts;
            specifying it as one is specifying a soft, permeable bottom half.
          </WarningBlock>
          <p className="text-muted-foreground">
            These two constraints bound every real section. They are also why quotes list
            lifts separately: each lift is a full paver-and-roller cycle, and a two-lift job
            costs more per inch than a one-lift job even at identical tonnage.
          </p>
        </Section>

        <Section title="Worked example: choosing a section for an RV pad">
          <ExampleBlock
            scenario="A 14 × 40 ft parking pad for a 16,000 lb motorhome on firm, well-drained subgrade."
            steps={[
              { label: "Load class", work: "Heavier than a car, far lighter than trucks — between driveway and parking-lot duty" },
              { label: "Pick the section", work: "4 in asphalt (2 in binder + 2 in surface) over 8 in aggregate base" },
              { label: "Asphalt tonnage", work: "560 ft² × (4 ÷ 12) × 145 ÷ 2,000 × 1.05 = 14.2 → 14.5 tons" },
              { label: "Base tonnage", work: "560 × 0.667 ft ≈ 14 yd³ ≈ 21 tons crushed stone" },
              { label: "Lift check", work: "Two 2 in lifts ✓ (each ≤ 4 in, each ≥ 3× aggregate size)" },
            ]}
            result="A 4-over-8 section, placed in two lifts — one tandem load of hot mix. The extra inch over driveway spec costs ~3.5 tons (~$450) and prevents rutting at the wheel positions where the RV parks for months."
          />
          <Cta
            variant="inline"
            title="Run your own section through the asphalt calculator"
            href={ASPHALT.calculator}
          />
        </Section>

        <Faq items={faqItems} variant="list" />

        <RelatedArticles
          title="Calculators"
          variant="inline-strip"
          items={pickLinks(asphaltCalculatorLinks, ASPHALT.calculator, ASPHALT.driveway)}
        />

        <RelatedArticles
          title="Related guides"
          variant="list"
          items={[
            ...pickLinks(drivewayGuideLinks, ASPHALT.drivewayThickness, ASPHALT.drivewayInstall),
            ...pickLinks(coreGuideLinks, ASPHALT.coverage),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.fhwa, AREFS.aashto]} />
      </ArticleShell>
    </>
  );
}
