import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ProsCons } from "@/components/blocks/pros-cons";
import { ComparisonTable } from "@/components/tables/comparison-table";
import { CoverageTable } from "@/components/tables/coverage-table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/data/authors";
import { ASPHALT, weightGuideLinks, coreGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Hot Mix vs Cold Mix Asphalt — Weight & When to Use Each";
const description =
  "Hot mix compacts to 145 lb/ft³ and builds pavements; cold mix compacts to ~137 lb/ft³ and holds potholes until the plant opens. Densities, costs, bag math and the honest decision rule.";
const path = ASPHALT.hotVsColdWeight;
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
    question: "Does hot mix weigh more than cold mix?",
    answer:
      "Yes, by about 6% compacted: 145 lb/ft³ (3,915 lb/yd³) for dense-graded hot mix versus roughly 137 lb/ft³ (3,710 lb/yd³) for cold mix. Cold mix retains more air voids because it is compacted at ambient temperature with a slow-curing binder — you simply cannot densify it the way rollers densify 300°F mix.",
  },
  {
    question: "Why does cold mix cost more per ton than hot mix?",
    answer:
      "Packaging and chemistry. Bulk hot mix runs $100–150 per ton at the plant; bagged cold patch works out to $150–250 per ton equivalent because you pay for emulsified or cutback binder, additives that keep it workable in the bag, packaging and retail distribution. Per pothole it is still cheap — the premium only stings at volume.",
  },
  {
    question: "How many bags of cold patch do I need for a pothole?",
    answer:
      "A 50 lb bag places about 0.4 ft³ and reliably covers roughly 0.8 ft² at 2 inches once consolidated into a real, irregular pothole with the recommended overfill. A typical 2 ft × 2 ft, 2-inch-deep pothole therefore takes about 5 bags (250 lb). Measure the hole; potholes are always deeper than they look.",
  },
  {
    question: "Is cold mix a permanent repair?",
    answer:
      "Treat it as a 6–24 month repair. Quality high-performance cold patches can last years in low-traffic, well-drained holes, but cold mix never reaches hot-mix density or stability, ruts under heavy traffic and sheds under snowplows. The standard practice is cold patch in winter, cut back and replace with hot mix when plants reopen.",
  },
  {
    question: "Can I order less cold mix because it is lighter?",
    answer:
      "Barely — the 6% density difference is smaller than normal waste allowance. For the same hole volume, order essentially the same tonnage: volume × 137 lb/ft³ for cold mix versus × 145 for hot mix. What actually changes your quantity is overfill: cold patch is placed proud by 30–50% and compacted into the hole.",
  },
  {
    question: "When is hot mix simply not an option?",
    answer:
      "Below about 50°F ambient (colder for thin lifts), when plants are closed for the season, for jobs under plant minimums (often 1–2 tons), or when the repair cannot wait for a paving crew. In all four cases cold mix exists precisely to buy time — patch now, pave properly later.",
  },
];

const toc = tocFromTitles(
  "Head-to-head comparison",
  "Where each mix wins",
  "Bagged cold patch math",
  "The decision rule",
);

export default function HotMixVsColdMixWeightPage() {
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
              eyebrow="Asphalt · Comparison"
              variant="centered"
              title="Hot mix vs cold mix asphalt"
              description="One is a structural pavement placed at 300°F; the other is a repair material that pours from a bag in January. They differ in weight, cost and lifespan — and each is the wrong answer to the other's problem."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Hot Mix vs Cold Mix", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Head-to-head comparison">
          <ComparisonTable
            columns={[
              { key: "hot", label: "Hot mix (HMA)", highlight: true },
              { key: "cold", label: "Cold mix / cold patch" },
            ]}
            rows={[
              {
                feature: "Compacted density",
                values: { hot: "145 lb/ft³ (3,915 lb/yd³)", cold: "~137 lb/ft³ (3,710 lb/yd³)" },
              },
              {
                feature: "Placement temperature",
                values: { hot: "275–325°F at the paver", cold: "Ambient — even below freezing" },
              },
              {
                feature: "Strength & stability",
                values: { hot: "Full structural pavement", cold: "Repair-grade; ruts under heavy traffic" },
              },
              {
                feature: "Cost per ton",
                values: { hot: "$100–150 bulk at the plant", cold: "$150–250 bagged equivalent" },
              },
              {
                feature: "Availability",
                values: { hot: "Plant hours, seasonal, 1–2 ton minimums", cold: "Bags and buckets, year-round, any quantity" },
              },
              {
                feature: "Service life",
                values: { hot: "15–25 years as a pavement", cold: "6–24 months as a patch" },
              },
              {
                feature: "Best use",
                values: { hot: "Driveways, lots, roads — anything permanent", cold: "Potholes, utility cuts, winter emergencies" },
              },
            ]}
            caption="Dense-graded HMA vs typical emulsion/cutback cold patch. Proprietary high-performance cold mixes narrow — but do not close — the gap."
          />
          <p className="text-muted-foreground">
            The density gap is not a manufacturing tolerance — it is the whole story. Hot
            binder lubricates the aggregate so rollers can squeeze air voids down to 7–8%;
            cold binder cannot, so voids stay high and density, strength and life all follow.
            The mechanics are unpacked in{" "}
            <a href={ASPHALT.densityExplained} className="font-medium text-primary hover:underline">
              asphalt density explained
            </a>
            .
          </p>
        </Section>

        <Section title="Where each mix wins">
          <ProsCons
            subject="Hot mix"
            pros={[
              "Full structural strength — the only choice for pavements",
              "Compacts to 145 lb/ft³ with 7–8% voids; sheds water",
              "Cheapest per ton in bulk ($100–150)",
              "15–25 year service life placed on a proper base",
            ]}
            cons={[
              "Needs a plant in season, plus haul within a 2–3 hour window",
              "Plant minimums make tiny jobs expensive",
              "Placement below ~50°F ambient risks failed compaction",
              "Requires paver/roller equipment or a contractor",
            ]}
          />
          <ProsCons
            subject="Cold mix"
            pros={[
              "Works year-round, straight from bag or stockpile",
              "No equipment beyond a tamper — genuinely DIY",
              "Available in exact small quantities (50 lb bags)",
              "Keeps a pothole safe until a permanent repair",
            ]}
            cons={[
              "Repair-grade only: lower density (~137 lb/ft³) and stability",
              "2–3× hot mix cost per ton in bagged form",
              "Cures slowly; can shove and rut under traffic while green",
              "Typical patch life 6–24 months, less under plows and trucks",
            ]}
          />
        </Section>

        <Section
          title="Bagged cold patch math"
          lead="Bag quantities for pothole work, using consolidated in-place coverage — not the optimistic loose spread."
        >
          <CoverageTable
            headers={["Quantity", "Volume placed", "Coverage"]}
            rows={[
              {
                label: "50 lb bag",
                spec: "≈ 0.4 ft³",
                coverage: "≈ 0.8 ft² at 2 in deep",
                note: "Consolidated, with the 30–50% overfill real potholes need",
              },
              {
                label: "2 ft × 2 ft pothole, 2 in deep",
                spec: "4 ft² of repair",
                coverage: "≈ 5 bags (250 lb)",
              },
              {
                label: "1 ton of cold mix",
                spec: "40 × 50 lb bags",
                coverage: "≈ 32 ft² of 2 in patches",
                note: "Past ~15 bags, price a bulk cold-mix stockpile instead",
              },
            ]}
            caption="Manufacturer ratings vary; irregular depth and required overfill consume more material than flat-slab math suggests. Round bags up."
          />
        </Section>

        <Section title="The decision rule">
          <p className="text-muted-foreground">
            Building or resurfacing anything: hot mix, full stop. Holding a pothole, a
            utility cut or an edge break — especially between November and April — cold mix,
            placed proud, compacted hard and scheduled for a hot-mix cutback when plants
            reopen. The costly mistake is not picking the wrong product; it is asking cold
            mix to be a pavement. It is a splint, not a bone.
          </p>
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Weigh your job in both mixes"
          description="The weight calculator converts your dimensions to tons at hot-mix or cold-mix density — order the right amount either way."
          href={ASPHALT.weight}
          buttonLabel="Asphalt Weight Calculator"
        />

        <RelatedArticles
          title="Keep reading"
          variant="list"
          items={[
            ...pickLinks(weightGuideLinks, ASPHALT.densityExplained, ASPHALT.weightChart),
            ...pickLinks(coreGuideLinks, ASPHALT.densityChart),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4, AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
