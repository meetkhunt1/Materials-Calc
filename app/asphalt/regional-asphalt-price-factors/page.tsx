import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock } from "@/components/blocks/callout";
import { CostTable } from "@/components/tables/cost-table";
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
import { ASPHALT, costGuideLinks, pickLinks, AREFS } from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Regional Asphalt Price Factors — Why Quotes Vary 40%";
const description =
  "The same driveway prices ±40% across US regions. Plant proximity, binder terminals, season length, labor markets and competition density — the mechanics behind regional asphalt pricing in 2026.";
const path = ASPHALT.regionalPrices;
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
    question: "Which US region has the cheapest asphalt?",
    answer:
      "The South generally, at roughly $2.25–4.00 per square foot installed: year-round paving seasons, dense plant networks, competitive labor markets and strong contractor competition. But region is a blunt instrument — a rural site 40 miles from the nearest plant in a cheap state can out-price a competitive metro in an expensive one.",
  },
  {
    question: "Why does distance from the plant matter so much?",
    answer:
      "Hot mix leaves the plant near 300°F and must be placed and compacted before it cools too far — a practical haul radius of about 25 miles, or roughly 45–60 minutes. Beyond that, contractors pay for insulated trucks, warm-mix additives or a more distant plant premium, and trucking itself adds $8–20 per ton before any of that.",
  },
  {
    question: "Why is asphalt more expensive in northern states?",
    answer:
      "Season compression. Plants in cold states shut down for four to six months, so a year of demand squeezes into six to eight months of capacity — contractors price the backlog. Add prevailing higher labor costs and freeze-thaw base requirements (deeper gravel, more excavation) and installed prices run 15–25% above the national average.",
  },
  {
    question: "Do binder terminals affect my local price?",
    answer:
      "Yes, invisibly. Liquid binder moves from refineries to regional terminals by barge, rail and pipeline; plants far from a terminal pay meaningful freight on a $600–700-per-ton input that is 5–6% of every ton of mix. It is one reason inland and mountain markets show wider, less predictable pricing than coastal and river-corridor markets.",
  },
  {
    question: "How do I use regional data when reading a quote?",
    answer:
      "Treat it as a sanity band, not a target. If your quotes cluster inside the regional range, the market is working; if a single quote sits far above, ask what scope explains it — base work, removal, access — before assuming gouging. If all quotes sit high, your micro-market (plant distance, few contractors) is the cause, and more bids from farther afield may help.",
  },
];

const toc = tocFromTitles(
  "Installed cost by US region",
  "The regional index at a glance",
  "What actually drives the spread",
  "Worked example: metro vs 40 miles rural",
);

export default function RegionalAsphaltPriceFactorsPage() {
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
              eyebrow="Asphalt · Cost Series"
              variant="stat-strip"
              title="Why asphalt quotes vary 40% by region"
              description="Asphalt is a local product made from a global commodity. The binder tracks oil markets everywhere; everything else — plants, trucks, crews, seasons — is stubbornly regional."
              stats={[
                { value: "±40%", label: "regional swing on identical scope" },
                { value: "$8–20", label: "per ton trucking from the plant" },
                { value: "~25 mi", label: "practical hot-mix haul radius" },
                { value: "4–6 mo", label: "winter plant shutdown, cold states" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Regional Price Factors", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <RelatedArticles
            title="Related reading"
            variant="inline-strip"
            items={pickLinks(costGuideLinks, ASPHALT.pricePerTon, ASPHALT.costSaving, ASPHALT.costFaqs)}
          />
        }
      >
        <Section title="Installed cost by US region">
          <CostTable
            currency="USD"
            rows={[
              { item: "Northeast", unit: "ft²", low: 3.5, high: 6.0, note: "Short season, union labor, high land and permit costs" },
              { item: "Midwest", unit: "ft²", low: 2.75, high: 4.5, note: "Good plant density; winter shutdown compresses schedules" },
              { item: "South", unit: "ft²", low: 2.25, high: 4.0, note: "Year-round season, strong competition" },
              { item: "Mountain West", unit: "ft²", low: 2.5, high: 5.5, note: "Widest spread — plant distance varies enormously" },
              { item: "West Coast", unit: "ft²", low: 3.25, high: 6.0, note: "High labor and compliance costs, metro concentration" },
            ]}
            caption="Representative installed ranges at 3 in compacted on existing base, 2026. City vs rural moves prices more than state lines do — a metro with six competing contractors beats a cheap-state rural market with one."
          />
        </Section>

        <Section title="The regional index at a glance">
          <BarChart
            title="Installed price index by region (national average = 100)"
            unit="index"
            data={[
              { label: "Northeast", value: 115 },
              { label: "West Coast", value: 112 },
              { label: "Mountain West", value: 100 },
              { label: "Midwest", value: 95 },
              { label: "South", value: 88 },
            ]}
          />
        </Section>

        <Section title="What actually drives the spread">
          <p className="text-muted-foreground">
            Six factors explain nearly all regional variation. Plant proximity first: hot
            mix has a practical haul radius of about 25 miles before temperature loss
            compromises compaction, so your price is set by the plants inside that circle —
            one plant is a monopoly, five is a market. Binder terminal distance adds silent
            freight on the costliest ingredient. Aggregate availability matters where good
            stone is scarce and quarried material travels. Season length compresses demand
            in the north. Labor markets set crew rates that vary nearly two-to-one across
            states. And competition density — contractors per capita — determines how much
            of all that cost structure gets passed through versus absorbed.
          </p>
          <p className="text-muted-foreground">
            Note what is not on the list: the asphalt itself. Per-ton plant pricing varies
            far less than installed pricing — see the{" "}
            <a href={ASPHALT.pricePerTon} className="font-medium text-primary hover:underline">
              price per ton guide
            </a>{" "}
            — because binder is priced off national indices. The regional spread lives in
            trucking, labor, season and competition, which is why it shows up in installed
            quotes more than in material quotes.
          </p>
          <InfoBlock title="Short season, compressed demand">
            A plant that closes from November to April sells a year of tonnage in six or
            seven months, and every contractor&apos;s calendar fills accordingly. Northern
            owners pay for that scarcity twice: higher unit prices, and less scheduling
            leverage — the mid-season discount window that southern owners enjoy barely
            exists. If you are paving in a cold state, book early and be flexible on dates;
            flexibility is the only discount lever the calendar leaves you.
          </InfoBlock>
        </Section>

        <Section title="Worked example: metro vs 40 miles rural">
          <ExampleBlock
            scenario="The same 600 ft² driveway at 3 in (≈11 tons), quoted in a competitive metro with a plant 8 miles out, and at a rural site 40 miles from the nearest plant."
            steps={[
              { label: "Metro material", work: "11 tons × ($120 + $9 trucking) = $1,420" },
              { label: "Metro labor + equipment + mobilization", work: "≈ $2,080 → total $3,500 ($5.85/ft²)" },
              { label: "Rural material", work: "11 tons × ($125 + $19 trucking) = $1,585, warm-mix additive for the haul +$60" },
              { label: "Rural fixed costs", work: "Longer crew travel and equipment move: mobilization +$700 → total $4,845 ($8.10/ft²)" },
            ]}
            result="Same driveway, same spec: $3,500 vs roughly $4,850 — a 38% premium from geography alone. Distance to the plant and the crew, not the asphalt, is the price."
          />
        </Section>

        <Faq items={faqItems} variant="list" />

        <Cta
          variant="banner"
          title="Localize the estimate"
          description="Plug your local per-ton quote into the calculator — regional averages are for sanity checks, not orders."
          href={ASPHALT.cost}
          buttonLabel="Asphalt Cost Calculator"
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa, AREFS.fhwa]} />
      </ArticleShell>
    </>
  );
}
