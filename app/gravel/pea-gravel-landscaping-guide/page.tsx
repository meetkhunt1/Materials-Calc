import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ProsCons } from "@/components/blocks/pros-cons";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
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
import { GRAVEL, peaGuideLinks, stoneGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "pea-gravel-landscaping-guide";
const title = "Pea Gravel Landscaping Guide — Paths, Patios, Xeriscape & More";
const description =
  "Where pea gravel earns its place in a landscape: paths, patios, xeriscapes, paver joints, dog runs and drainage strips — with honest pros and cons per use, edging and plant pairings, and the jobs it should never get.";
const path = GRAVEL.peaLandscaping;
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
    question: "Is pea gravel better than mulch for landscaping beds?",
    answer:
      "Different tools. Pea gravel never decomposes, never blows away and never feeds termites — but it also adds no organic matter and gets hot in full sun. Use it around drought-tolerant and Mediterranean plants; keep bark mulch around moisture-loving shrubs and vegetable beds where soil building matters.",
  },
  {
    question: "Can I put pea gravel between pavers or stepping stones?",
    answer:
      "Yes — it is one of the best-looking joint fills for wide gaps of 2 inches or more. Use the small 1/4 inch grade so it settles into joints, and set stepping stones proud by about half an inch so the gravel does not wash over them. For tight paver joints under 1 inch, angular stone dust locks better.",
  },
  {
    question: "Does pea gravel work on a slope?",
    answer:
      "Poorly beyond a gentle 5% or so grade. Rounded stones roll, so gravity plus rain slowly conveys the surface downhill. On mild slopes, cross the fall line with buried edging every few feet or use gravel stabilization grids; past that, switch to angular crushed stone or terraced beds.",
  },
  {
    question: "Is pea gravel safe around a fire pit?",
    answer:
      "Yes, with one caution: buy dry-screened stone from a landscape yard, not stones dredged straight from water. River rock with moisture trapped inside can crack or pop when the fire heats it. A 3 in bed extending 3–4 ft around the pit gives a clean, ember-resistant apron.",
  },
  {
    question: "What plants pair well with pea gravel?",
    answer:
      "Drought-lovers that appreciate the gravel's fast drainage and reflected warmth: lavender, rosemary, sedums, ornamental grasses, yucca, thyme and creeping groundcovers that spill over the stone. Avoid shallow-rooted moisture lovers — the gravel layer keeps rain moving down and away from them.",
  },
  {
    question: "Will pea gravel attract snakes or pests?",
    answer:
      "No more than any other ground cover, and less than organic mulch — there is nothing to eat in it and it holds no moisture. It will not harbor termites, fungus or mold. The one honest nuisance is leaf litter: leaves work into the stone and are tedious to blow out in fall.",
  },
];

const toc = tocFromTitles(
  "Paths and walkways",
  "Patios and seating areas",
  "Xeriscape and ground cover",
  "Dog runs and drainage strips",
  "Pairing with edging and plants",
  "What pea gravel is bad at",
);

export default function PeaGravelLandscapingGuidePage() {
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
              eyebrow="Gravel · Pea Gravel"
              variant={heroVariant}
              title="Pea gravel landscaping guide"
              description="The most versatile decorative stone in the yard — and the most misused. Where pea gravel genuinely belongs, what each use trades away, and the two jobs it should always refuse."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Pea Gravel Landscaping Guide", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Paths and walkways">
          <p className="text-muted-foreground">
            The signature use. A 2 in layer of 3/8 in pea gravel over a compacted crusher
            run base makes the classic crunching garden path — instantly permeable, softer
            underfoot than any paver, and cheaper per foot than every hard alternative. The
            crunch itself is a feature: you hear visitors arrive. Keep the profile at
            2 inches; deeper feels like walking on a beach.
          </p>
          <ProsCons
            subject="Pea gravel paths"
            pros={[
              "Cheapest walkable surface per square foot — $2–5/ft² DIY including base and edging",
              "Drains instantly; no puddles, no ice sheet, permeable for stormwater rules",
              "Curves cost nothing — no cutting, no pattern math, any shape you can rake",
              "Repairs are a bag and a rake, not a mason",
            ]}
            cons={[
              "Migrates without continuous edging on both sides",
              "Hostile to wheelbarrows, strollers and wheelchairs — wheels plow, not roll",
              "Tracks indoors in shoe treads; keep it away from door thresholds",
              "Needs raking and a top-up roughly every 2–3 years",
            ]}
          />
        </Section>

        <Section title="Patios and seating areas">
          <p className="text-muted-foreground">
            A pea gravel patio is the budget path to a large outdoor room: 2–3 inches
            screeded flat over a compacted base, rigid edging all around, furniture on top.
            Chairs sink slightly unless you set flagstones or pavers as landing pads under
            the table — the best patios mix the two, hard pads where furniture lives and
            gravel everywhere else.
          </p>
          <ProsCons
            subject="Pea gravel patios"
            pros={[
              "A fraction of paver cost — big patios become affordable ($15–30/ft² for pavers vs $2–5)",
              "Screeds genuinely flat; reads as a designed surface, not a gravel pile",
              "No frost heave, no cracked slabs, no polymeric sand maintenance",
              "Combines beautifully with flagstone pads and steel edging",
            ]}
            cons={[
              "Chair and table legs sink without pads under them",
              "Not barefoot-perfect for everyone — fine for most, tender-footed guests notice",
              "Snow shoveling scoops stone along with the snow",
              "Spilled food and leaf litter are harder to clean off than off pavers",
            ]}
          />
        </Section>

        <Section title="Xeriscape and ground cover">
          <p className="text-muted-foreground">
            In dry-climate and low-water landscapes, pea gravel is the workhorse ground
            plane: a 2–3 in layer over woven landscape fabric suppresses weeds, eliminates
            irrigation for the covered area, and reflects gentle warmth up into
            Mediterranean plantings. Between pavers and stepping stones, the small 1/4 in
            grade settles into wide joints and stays put better than it does in the open.
            It also makes a clean maintenance strip against foundations — a 12–18 in
            gravel band keeps soil (and rot) off siding and mulch away from termite
            inspectors&apos; sightlines.
          </p>
          <InfoBlock title="Fabric under decorative gravel — yes, here">
            Under walked surfaces, landscape fabric is debatable. Under ornamental beds it
            is not: a woven geotextile under 2–3 in of stone is the difference between an
            annual five-minute weed patrol and a perennial weeding job, and it stops the
            gravel from slowly disappearing into the soil below. Buy woven, not the
            flimsy spun-bonded rolls that tear on the first rake stroke.
          </InfoBlock>
        </Section>

        <Section title="Dog runs and drainage strips">
          <p className="text-muted-foreground">
            Rounded stone is the pet-friendly aggregate: easy on paws where crushed stone
            is not, and a 4 in bed over free-draining soil lets urine flush through with a
            weekly hose-down instead of pooling. Use the 1/2 in grade — big enough to
            drain fast, small enough to trot on comfortably. The same free-draining
            property makes pea gravel the standard dressing for drainage strips: downspout
            splash zones, French drain tops, and dry creek beds that carry roof water away
            from the house while looking deliberate all summer.
          </p>
          <p className="text-muted-foreground">
            One caveat for both uses: pea gravel is the visible top layer, not the working
            depth. A French drain still wants angular{" "}
            <a href={GRAVEL.stoneUses} className="font-medium text-primary hover:underline">
              crushed stone
            </a>{" "}
            around the pipe; the pea gravel just dresses the top two inches.
          </p>
        </Section>

        <Section title="Pairing with edging and plants">
          <p className="text-muted-foreground">
            Every pea gravel feature is really a two-material design: the stone and
            whatever holds it. Steel edging gives crisp modern lines and disappears
            visually; aluminum does the same without rust; concrete or brick soldier
            courses read traditional and double as a mowing strip; timber suits cottage
            paths but rots on the schedule timber rots. Set any of them about an inch
            proud of the finished gravel — flush edging is decorative, not functional.
            Plant partners that earn their place: lavender, rosemary, ornamental grasses
            and sedums love the drainage; creeping thyme softens edges and forgives being
            walked on; small multi-stem trees rising out of a gravel plane is the signature
            gravel-garden move.
          </p>
        </Section>

        <Section title="What pea gravel is bad at">
          <WarningBlock title="Two jobs to refuse, one to think hard about">
            <p>
              <strong>Driveways under real traffic.</strong> Rounded stones never
              interlock, so tires rut, spin and spray them off the edges. Driveways want
              angular crushed stone — see{" "}
              <a href={GRAVEL.drivewayTypes} className="font-medium underline">
                best gravel for driveways
              </a>
              . A pea gravel drive is a rake-forever commitment.
            </p>
            <p>
              <strong>Slopes.</strong> Anything past a gentle grade turns the surface into
              a slow conveyor belt headed downhill. Rain accelerates it. Terrace the bed,
              add stabilization grids, or use angular stone instead.
            </p>
            <p>
              <strong>Load-bearing base layers.</strong> Under pavers, slabs or sheds,
              rounded stone acts like ball bearings and never compacts to refusal. Bases
              are crusher run territory — pea gravel is a finish material, full stop.
            </p>
          </WarningBlock>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Landscaping questions" />

        <Cta
          variant={ctaVariant}
          title="Design settled — now quantity"
          description="Measure each area, pick a depth, and the calculator returns tons, yards and bags per zone."
          href={GRAVEL.pea}
          buttonLabel="Open the Pea Gravel Calculator"
        />

        <RelatedArticles
          title="Build it right"
          variant={relatedStyle}
          items={[
            ...pickLinks(peaGuideLinks, GRAVEL.peaInstall, GRAVEL.peaCoverage),
            ...pickLinks(stoneGuideLinks, GRAVEL.stoneVsGravel),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.nssga, GREFS.astmD448]} />
      </ArticleShell>
    </>
  );
}
