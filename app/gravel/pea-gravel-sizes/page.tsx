import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { InfoBlock } from "@/components/blocks/callout";
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
import { GRAVEL, peaGuideLinks, referenceLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const title = "Pea Gravel Sizes — 1/4 to 5/8 Inch, Decoded";
const description =
  "Every pea gravel size grade from 1/4 to 5/8 inch: what each suits, why 3/8 inch dominates, the ASTM sieve ranges behind the names, and how to pick a size for real jobs.";
const path = GRAVEL.peaSizes;
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
    question: "What size is standard pea gravel?",
    answer:
      "3/8 inch is the default almost everywhere. When a landscape yard says pea gravel with no qualifier, that is what loads into your truck. It walks well, screeds flat for patios, and moves cleanly through spreaders and wheelbarrows — the all-purpose grade for paths, patios and fill.",
  },
  {
    question: "Does pea gravel size change how much I need?",
    answer:
      "Not meaningfully. All grades from 1/4 to 5/8 inch run about 96 lb/ft³ loose — roughly 1.3 tons per cubic yard — so one ton covers about 125 ft² at 2 inches regardless of grade. Estimate by area and depth, not by stone size.",
  },
  {
    question: "Which pea gravel size is best for walkways?",
    answer:
      "3/8 inch at 2 inches deep over a compacted base. Smaller 1/4 inch packs a little firmer but tracks into the house in shoe treads; 1/2 inch and up rolls more underfoot. Whatever the size, steel or aluminum edging is what keeps the path a path.",
  },
  {
    question: "What size pea gravel for drainage?",
    answer:
      "Go larger — 1/2 to 5/8 inch. Bigger rounded stones leave bigger voids, so water moves faster and the surface resists clogging with sediment. For French-drain dressing and downspout splash zones, 1/2 inch is the workhorse; reserve 1/4 inch for cosmetic top layers.",
  },
  {
    question: "Is 5/8 inch still pea gravel?",
    answer:
      "It is the top of the range — some yards call it large pea gravel or river pebble. Its advantage is inertia: heavier stones migrate less and stay put better in decorative beds. The trade-off is a coarser look and a less comfortable walking surface than 3/8 inch.",
  },
  {
    question: "Can I mix pea gravel sizes?",
    answer:
      "You can, but blends pack tighter and drain slower than a single screened grade, and topping up later with a matching mix is nearly impossible. For picky work — bocce courts, exposed aggregate — buy one grade from one supplier in one load, and ask for the gradation sheet.",
  },
];

const toc = tocFromTitles(
  "The size grades at a glance",
  "Why 3/8 inch dominates",
  "Sieve sizes behind the names",
  "Choosing a size: dog run example",
);

export default function PeaGravelSizesPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
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
              eyebrow="Gravel · Pea Gravel"
              variant="compact"
              title="Pea gravel sizes, decoded"
              description="Four grades span 1/4 to 5/8 inch. One of them is the right answer for almost every job — but the exceptions matter, and the sieve numbers tell you what you're actually buying."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Pea Gravel Sizes", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="The size grades at a glance">
          <CoverageTable
            headers={["Size", "Best use", "Notes"]}
            rows={[
              { label: "1/4 in", spec: "Paver joint filler, bocce courts", coverage: "Packs firmest of the range; tracks in shoe treads", note: "Sometimes sold as fine pea gravel" },
              { label: "3/8 in", spec: "Paths, patios, aquariums — the standard", coverage: "The default grade at nearly every yard" },
              { label: "1/2 in", spec: "Dog runs, drainage, splash zones", coverage: "Bigger voids drain faster and resist clogging" },
              { label: "5/8 in", spec: "Decorative beds and borders", coverage: "Heaviest stones — migrates least, stays put better" },
            ]}
            caption="All grades weigh ≈96 lb/ft³ loose (≈1.3 tons/yd³), so coverage math is identical across sizes."
          />
          <p className="text-muted-foreground">
            Size changes behavior, not quantity. Whatever grade you choose, one ton still
            covers about 125 ft² at 2 inches and 83 ft² at 3 inches — the full tables are in
            the coverage guide, and every grade still needs edging.
          </p>
        </Section>

        <Section title="Why 3/8 inch dominates">
          <p className="text-muted-foreground">
            3/8 inch wins on three practical counts. It walks well: stones are small enough
            to bed into each other underfoot instead of rolling like the larger grades. It
            screeds flat: a patio surface pulled with a board comes out even, because no
            single stone is tall enough to snag the screed. And it machine-handles: it flows
            through spreaders, drops cleanly from a skid-steer bucket, and shovels without
            bridging. Suppliers stock it deepest for the same reasons, which usually makes it
            the cheapest grade per ton. Unless the job specifically rewards a different size
            — drainage wants bigger, joint filler wants smaller — 3/8 is the answer.
          </p>
        </Section>

        <Section title="Sieve sizes behind the names">
          <InfoBlock title="What the yard's gradation sheet means">
            <p>
              Pea gravel is not one standardized product — it spans the ASTM D448 size range
              from roughly #8 (3/8 to #8 sieve) up toward #4-adjacent blends at the 5/8 inch
              end. Two yards selling &quot;pea gravel&quot; can hand you visibly different
              stone. If the job is picky — bocce courts, exposed-aggregate concrete, paver
              joints — ask for the actual gradation sheet before ordering, not after the
              truck leaves.
            </p>
          </InfoBlock>
        </Section>

        <Section title="Choosing a size: dog run example">
          <ExampleBlock
            scenario="A 10 × 25 ft dog run for two large dogs. The tension: drainage (bigger is better) versus paw comfort (smaller is better)."
            steps={[
              { label: "Drainage requirement", work: "Urine and rain must pass fast — rules out 1/4 in, which packs and holds odor" },
              { label: "Paw comfort", work: "5/8 in rolls under paws and lodges between pads — too coarse" },
              { label: "The split decision", work: "1/2 in balances both: open voids, still comfortable to trot on" },
              { label: "Quantity at 4 in deep", work: "250 ft² × (4 ÷ 12) = 83 ft³ ≈ 4 tons after 10% waste" },
            ]}
            result="1/2 inch pea gravel, 4 inches deep over a 2 inch compacted base — about 4 tons, hosed clean monthly."
          />
        </Section>

        <Faq items={faqItems} variant="list" title="Size questions" />

        <Cta
          variant="banner"
          title="Size chosen — now get the tonnage"
          description="The pea gravel calculator turns your dimensions into tons, yards and bag counts."
          href={GRAVEL.pea}
          buttonLabel="Open the Pea Gravel Calculator"
        />

        <RelatedArticles
          title="Keep reading"
          variant="inline-strip"
          items={[
            ...pickLinks(peaGuideLinks, GRAVEL.whatIsPea, GRAVEL.peaCoverage),
            ...pickLinks(referenceLinks, GRAVEL.refSizes),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[GREFS.astmD448, GREFS.aashtoM43]} />
      </ArticleShell>
    </>
  );
}
