import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ExampleBlock } from "@/components/blocks/example-block";
import { TipBlock } from "@/components/blocks/callout";
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
import {
  ASPHALT,
  volumeGuideLinks,
  weightGuideLinks,
  pickLinks,
  AREFS,
} from "@/content/asphalt/links";
import type { FaqItem } from "@/types";

const title = "Asphalt Cubic Foot Guide — Small-Batch & Patch Math";
const description =
  "Cubic-foot math for repairs: 1 ft³ = 145 lb compacted, a 50 lb cold-patch bag fills 0.33 ft³ compacted, and a bags-per-pothole table that gets the count right the first trip.";
const path = ASPHALT.cubicFootGuide;
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
    question: "How much does a cubic foot of asphalt weigh?",
    answer:
      "145 lb compacted — the standard hot-mix density used across this site. Loose material runs about 117 lb/ft³, so a cubic foot shoveled from a pile weighs noticeably less than a cubic foot rolled into a pavement. Always state which condition you mean when comparing quantities.",
  },
  {
    question: "How many cubic feet does a 50 lb bag of cold patch fill?",
    answer:
      "About 0.4 ft³ loose out of the bag, compacting down to roughly 0.33 ft³ in the hole — call it three bags per compacted cubic foot. Manufacturers vary slightly, so check the bag, but 0.33 ft³ compacted is the planning number that keeps you from a second store run.",
  },
  {
    question: "How many bags do I need for one pothole?",
    answer:
      "Volume in cubic feet is length × width × depth, all in feet, then divide by 0.33. A 24 × 24 in hole 3 in deep is 1 ft³ — three bags. Add 25% because cold patch keeps consolidating under traffic; an underfilled repair becomes a dish within weeks.",
  },
  {
    question: "When should I switch from bags to bulk hot mix?",
    answer:
      "Around 25–30 bags the economics flip. That is roughly 8–10 ft³, and most plants will sell a half ton (about 6.9 ft³ compacted) or full ton (13.8 ft³) at a fraction of the per-pound bag price. The catch is hauling: hot mix must be placed within about two hours.",
  },
  {
    question: "How many cubic feet are in a ton of asphalt?",
    answer:
      "13.8 ft³ compacted (2,000 lb ÷ 145 lb/ft³). Loose, the same ton occupies about 17 ft³. If you are checking a small bulk delivery against your patch list, use the compacted figure — that is the volume that ends up in the pavement.",
  },
  {
    question: "Can I calculate patches in gallons or buckets?",
    answer:
      "Yes — a 5-gallon bucket holds about 0.67 ft³, a useful field unit for carrying loose mix to scattered repairs. Two bucket loads of loose material compact to roughly one cubic foot in the hole. It is coarse, but for pothole work coarse and fast beats precise and late.",
  },
];

const toc = tocFromTitles(
  "Cubic foot quick facts",
  "Pothole math: bags per hole",
  "Worked example: a ten-pothole lot",
);

export default function AsphaltCubicFootGuidePage() {
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
              eyebrow="Asphalt · Volume Guide"
              variant="compact"
              title="Asphalt cubic foot guide"
              description="Yards are for paving; feet are for fixing. Pothole repairs, utility cuts and edge patches are all cubic-foot problems, and the unit maps neatly onto the bags and buckets you actually carry."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Cubic Foot Guide", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Cubic foot quick facts">
          <p className="text-muted-foreground">
            The cubic foot is the right scale for repair work: big enough to price a patch,
            small enough to count in bags. Three numbers cover almost every small-batch
            decision.
          </p>
          <CoverageTable
            headers={["Quantity", "Volume", "Note"]}
            rows={[
              { label: "1 ft³ compacted hot mix", spec: "145 lb", coverage: "27 ft³ = 1 yd³", note: "Loose ≈ 117 lb/ft³" },
              { label: "50 lb cold-patch bag", spec: "≈ 0.4 ft³ loose", coverage: "≈ 0.33 ft³ compacted", note: "≈ 3 bags per compacted ft³" },
              { label: "5-gallon bucket", spec: "≈ 0.67 ft³", coverage: "≈ 78 lb of loose mix", note: "Handy field measure" },
              { label: "1 US ton, compacted", spec: "13.8 ft³", coverage: "≈ 17 ft³ loose", note: "The bulk crossover unit" },
            ]}
            caption="Small-batch reference values at 145 lb/ft³ compacted and ≈ 117 lb/ft³ loose."
          />
        </Section>

        <Section title="Pothole math: bags per hole">
          <p className="text-muted-foreground">
            Measure the hole after squaring its edges — length, width and depth in feet —
            multiply the three, and divide by 0.33 ft³ per bag. The table shows how quickly
            volume grows: doubling a hole&apos;s width and length quadruples the bags.
          </p>
          <CoverageTable
            headers={["Pothole size", "Compacted volume", "50 lb bags"]}
            rows={[
              { label: "12 × 12 in, 2 in deep", spec: "0.17 ft³", coverage: "1 bag" },
              { label: "24 × 24 in, 3 in deep", spec: "1 ft³", coverage: "3 bags" },
              { label: "36 × 36 in, 4 in deep", spec: "3 ft³", coverage: "9 bags" },
            ]}
            caption="Bags at 0.33 ft³ compacted each, before the 25% overfill allowance."
          />
          <TipBlock title="Overfill 25% and compact in two lifts">
            Cold patch keeps compacting under traffic long after you leave. Mound each hole
            about 25% proud, place anything deeper than 2 inches in two compacted lifts, and
            the repair finishes flush instead of finishing as a dish.
          </TipBlock>
        </Section>

        <Section title="Worked example: a ten-pothole lot">
          <ExampleBlock
            title="Patching a parking lot"
            scenario="A retail lot has 10 potholes averaging 24 × 24 in and 2 in deep after squaring. How many 50 lb bags does the crew load?"
            steps={[
              { label: "Volume per hole", work: "2 × 2 × 0.167 = 0.67 ft³" },
              { label: "Total compacted volume", work: "0.67 × 10 = 6.7 ft³" },
              { label: "Bags at 0.33 ft³ each", work: "6.7 ÷ 0.33 = 20.3 bags" },
              { label: "Add 25% overfill", work: "20.3 × 1.25 = 25.4" },
            ]}
            result="Load 26 bags — about 1,300 lb of cold patch, comfortably one pickup trip."
          />
          <p className="text-muted-foreground">
            At 26 bags this job sits right at the bulk crossover: a half ton of hot mix would
            cover it if a plant is nearby and the crew can place it hot.
          </p>
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Size the patch, skip the second trip"
          description="The volume calculator turns hole dimensions into cubic feet, yards and meters instantly."
          href={ASPHALT.volume}
          buttonLabel="Asphalt Volume Calculator"
        />

        <RelatedArticles
          title="Related guides"
          variant="cards"
          items={[
            ...pickLinks(volumeGuideLinks, ASPHALT.cubicYardGuide, ASPHALT.measurement),
            ...pickLinks(weightGuideLinks, ASPHALT.hotVsColdWeight),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.ms4]} />
      </ArticleShell>
    </>
  );
}
