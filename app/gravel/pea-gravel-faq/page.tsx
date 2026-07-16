import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { InfoBlock } from "@/components/blocks/callout";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, faqSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { pick, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { getAuthor } from "@/data/authors";
import { GRAVEL, peaGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "pea-gravel-faq";
const title = "Pea Gravel FAQ — Migration, Weeds, Dogs, Winter and More";
const description =
  "Fourteen straight answers about living with pea gravel: does it migrate, do weeds grow in it, is it safe for dogs and bare feet, what happens in winter, can it go over concrete, and how long it actually lasts.";
const path = GRAVEL.peaFaq;
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

const livingItems: FaqItem[] = [
  {
    question: "Does pea gravel migrate and scatter?",
    answer:
      "Yes — it is the material's defining flaw. Every stone is rounded, so nothing interlocks; foot traffic, rain and gravity move the surface toward any open edge. Continuous edging set about an inch above the gravel stops nearly all of it. Unedged pea gravel does not stay put anywhere, ever — plan the border before the stone.",
  },
  {
    question: "Can you walk on pea gravel barefoot?",
    answer:
      "Comfortably — it is the only common landscape aggregate that is genuinely pleasant under bare feet. The stones are water-rounded with no cut edges, so a 3/8 in pea gravel patio walks like a coarse, firm beach. Crushed stone of the same size is the opposite: sharp faces that most people will not cross unshod.",
  },
  {
    question: "Is pea gravel safe for dogs and their paws?",
    answer:
      "Yes — it is the standard dog-run surface for that reason. Rounded stone does not cut pads the way angular crushed stone can, drains urine through with a weekly hose-down, and stays cooler than concrete in sun. Use the 1/2 in grade: big enough to drain fast, small enough not to lodge between paw pads. Puppies that eat stones need supervision on any gravel.",
  },
  {
    question: "Do wheelbarrows, strollers and wheelchairs work on pea gravel?",
    answer:
      "Poorly. Narrow wheels plow through loose round stone rather than rolling over it — a loaded wheelbarrow on 3 in of pea gravel is a workout, and a wheelchair is effectively blocked. If wheeled access matters, keep the layer to 2 in over a hard-compacted base, add stabilization grids, or run a paver ribbon through the gravel for the wheel line.",
  },
  {
    question: "Does pea gravel get hot in summer?",
    answer:
      "Warm, not scorching. Light-colored pea gravel reflects more sun than asphalt or dark pavers and the air voids between stones shed heat quickly after sunset. Barefoot at noon in a hot climate you will notice it; by evening it is cooler than any slab. Tan and white blends run cooler than gray or black decorative stone.",
  },
];

const maintenanceItems: FaqItem[] = [
  {
    question: "Do weeds grow in pea gravel?",
    answer:
      "Not from below if woven landscape fabric is underneath — but yes from above. Dust and leaf litter settle between stones and windblown seeds germinate in that film. The fix is a few minutes of pulling after rain or a torch pass in spring; established beds average minutes per month, dramatically less weeding than mulch.",
  },
  {
    question: "Does pea gravel get muddy?",
    answer:
      "A properly built layer does not — water passes straight through stone with no fines to hold it. Mud means the profile failed, not the gravel: stone placed directly on soil gets pressed into it, soil pumps up between the stones, and the surface turns to gravel-studded mud. The cure is the missing compacted base and fabric, not more gravel.",
  },
  {
    question: "How does pea gravel handle winter and snow?",
    answer:
      "Freeze-thaw does not hurt it — there is nothing to crack — and it will not heave like slabs can. The friction point is snow removal: a steel shovel blade scoops stone with the snow. Shovel with a plastic blade held an inch high, or let thin snow melt through (the dark stone absorbs sun and clears itself surprisingly fast). Skip the metal-edge snowblower.",
  },
  {
    question: "How long does pea gravel last?",
    answer:
      "The stone itself is effectively permanent — it does not decompose, fade meaningfully or break down under foot traffic. What ages is the installation: expect to rake the surface level a few times a year and top up roughly 10–15% of the original volume every 2–3 years to replace what migrates and settles. With solid edging, a top-up is one delivery and an afternoon.",
  },
  {
    question: "How do I clean leaves and debris out of pea gravel?",
    answer:
      "A leaf blower on low power, angled shallow, lifts leaves without launching stones — the fall ritual for every gravel garden. Rakes work but drag stone out of grade; re-screed afterward. For embedded silt after some years, rinsing sections through a wheelbarrow screen restores the just-delivered look, though most owners simply top-dress with fresh stone instead.",
  },
];

const setupItems: FaqItem[] = [
  {
    question: "Can I put pea gravel over concrete?",
    answer:
      "Yes, with two provisos. Drainage: a slab sheds water, so unless it slopes freely the gravel sits in a puddle tray — check that water runs off before covering it. Containment: stone on smooth concrete migrates even faster than on soil, so the perimeter needs solid edging or the patio border to hold it. A 1–2 in layer is plenty; deeper just rolls more.",
  },
  {
    question: "Does pea gravel really need edging everywhere?",
    answer:
      "Everywhere it has an open boundary, yes. Rounded stone behaves like a slow liquid and flows toward any exit — into lawns, down slopes, across walks. Steel, aluminum, brick or timber all work; what matters is that the border is continuous, anchored, and stands about an inch above the finished surface. Edging is the single highest-leverage dollar in a pea gravel project.",
  },
  {
    question: "How deep should pea gravel be?",
    answer:
      "2 inches for paths, 2–3 inches for patios — always over a compacted base — 2–3 inches for decorative beds over fabric, 4 inches for dog runs, and 6–9 inches for play areas needing fall protection. Deeper is not better on walked surfaces: past 3 inches, round stone shifts underfoot like dry sand.",
  },
  {
    question: "Will heavy rain wash pea gravel away?",
    answer:
      "Sheet rain through a flat, edged bed does nothing — water drops between the stones and moves on. Concentrated flow is different: a downspout aimed across a gravel path or a swale routed through a bed will carve a channel and carry stone with it. Give concentrated water its own armored path (larger river rock or a drain) and keep pea gravel out of the current.",
  },
];

const allFaqItems: FaqItem[] = [...livingItems, ...maintenanceItems, ...setupItems];

const toc = tocFromTitles(
  "Living with it: comfort and mobility",
  "Weather, weeds and maintenance",
  "Placement and setup",
);

export default function PeaGravelFaqPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title,
            description,
            path,
            category: "Gravel",
            datePublished,
            author,
          }),
          faqSchema(allFaqItems),
        ]}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Pea Gravel"
              variant={heroVariant}
              title="Pea gravel FAQ"
              description="Fourteen questions people actually ask after the truck leaves — migration, weeds, dogs, bare feet, snow shovels and whether it can go over that old slab. Straight answers, numbers included."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Pea Gravel FAQ", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Need quantities, not answers?"
            description="Tons, yards and bag counts from your dimensions in seconds."
            href={GRAVEL.pea}
            buttonLabel="Pea Gravel Calculator"
          />
        }
      >
        <Section title="Living with it: comfort and mobility">
          <Faq
            items={livingItems}
            variant={faqVariant}
            withSchema={false}
            id="faq-living"
            title="Underfoot, under paw, under wheel"
          />
        </Section>

        <Section title="Weather, weeds and maintenance">
          <Faq
            items={maintenanceItems}
            variant={faqVariant}
            withSchema={false}
            id="faq-maintenance"
            title="Rain, snow, weeds and the long haul"
          />
        </Section>

        <Section title="Placement and setup">
          <Faq
            items={setupItems}
            variant={faqVariant}
            withSchema={false}
            id="faq-setup"
            title="Where it can go and how deep"
          />
          <InfoBlock title="The one-sentence summary">
            Pea gravel is permanent, comfortable and nearly maintenance-free — as long as
            every installation question above gets the same answer: a compacted base under
            walked surfaces, woven fabric below, and continuous edging around. The full
            method is in the{" "}
            <a href={GRAVEL.peaInstall} className="font-medium text-primary hover:underline">
              installation guide
            </a>
            .
          </InfoBlock>
        </Section>

        <Cta
          variant={ctaVariant}
          title="From questions to quantities"
          description="The pea gravel calculator turns area and depth into tons, cubic yards and bags — waste allowance included."
          href={GRAVEL.pea}
          buttonLabel="Open the Pea Gravel Calculator"
        />

        <RelatedArticles
          title="The rest of the pea gravel series"
          variant={relatedStyle}
          items={pickLinks(peaGuideLinks, GRAVEL.whatIsPea, GRAVEL.peaCoverage, GRAVEL.peaInstall)}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.astmD448, GREFS.nssga, GREFS.usgs]} />
      </ArticleShell>
    </>
  );
}
