import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { ProsCons } from "@/components/blocks/pros-cons";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
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
import { pick, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { getAuthor } from "@/data/authors";
import {
  GRAVEL,
  drivewayGuideLinks,
  stoneGuideLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "best-gravel-for-driveways";
const title = "Best Gravel for Driveways (Ranked, With Trade-offs)";
const description =
  "The best gravel for a driveway, ranked: crusher run for the surface, #57 for structure, why pea gravel fails under tires, decorative options that survive traffic — plus the regional names (road base, ABC, 21A) so you order the right stone anywhere.";
const path = GRAVEL.drivewayTypes;
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
    question: "What is the best gravel for a driveway surface?",
    answer:
      "Crusher run (crushed stone with fines, roughly 3/4 in down to dust) is the best all-around surface. The fines lock the angular stone into a tight, semi-bound crust under compaction, so it resists tire scatter, sheds water off the crown, and can be regraded for decades. Its regional names include road base, ABC, 21A/21B, crush-and-run, DGA and Class 5.",
  },
  {
    question: "Is #57 gravel good for driveways?",
    answer:
      "Excellent as the structural middle layer, workable but imperfect as a surface. Clean #57 stone has no fines, so it never binds — as a top course it stays slightly loose underfoot and migrates toward the edges, though it drains superbly and never gets muddy. Many rural drives run a #57 surface and simply rake it back periodically.",
  },
  {
    question: "Why is pea gravel bad for driveways?",
    answer:
      "Pea gravel is rounded, so it cannot interlock — under tires it behaves like ball bearings, rutting, washboarding and spraying out of the wheel paths. If you want its look, confine it: use it only as a 2 in decorative top course over a compacted crusher run structure, inside solid edging, and expect to rake and top it up regularly.",
  },
  {
    question: "What do road base, ABC and 21A mean?",
    answer:
      "They are regional names for the same family of material: dense-graded crushed stone with fines that compacts into a firm crust. Road base and Class 5 are common in the West and Midwest, ABC (aggregate base course) in the Carolinas, 21A/21B in Virginia, crusher run and crush-and-run across the Southeast, DGA (dense-graded aggregate) in the Northeast. Describe the job to your quarry and they will match the local product.",
  },
  {
    question: "What is the cheapest gravel that actually works on a driveway?",
    answer:
      "Crusher run is usually the cheapest per ton ($18–30 in most markets) because it is the least processed product a quarry sells — and it also happens to be the best surface. The expensive mistake is not the stone type, it is skipping base layers and buying the same stone twice.",
  },
  {
    question: "Are decorative gravels like marble chips worth it on a driveway?",
    answer:
      "Only as a thin top dressing on low-speed, flat drives. Decorative stone runs 2–5 times the price of crusher run, and any rounded product migrates under tires. If curb appeal matters, the durable pattern is a full crusher run build with a 1.5–2 in decorative angular stone (like 3/8–3/4 in granite chips) confined by steel or timber edging.",
  },
];

const toc = tocFromTitles(
  "The ranking at a glance",
  "Crusher run: the default answer",
  "#57 stone: structure first",
  "Why not pea gravel",
  "Decorative options that survive tires",
  "Regional names decoded",
);

export default function BestGravelForDrivewaysPage() {
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
              eyebrow="Gravel · Driveways"
              variant={heroVariant}
              title="Best gravel for driveways"
              description="Three stones do 95% of driveway duty — and one hugely popular stone should almost never touch a driveway. The ranking, the trade-offs, and the regional names that keep orders straight."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Best Gravel for Driveways", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="The ranking at a glance">
          <p className="text-muted-foreground">
            Every driveway stone is a trade between three forces: traction (does it
            bind into a crust?), migration (does it stay where tires push it?), and
            drainage (does water pass through or shed off?). No stone wins all three —
            which is why the right answer is usually two stones in{" "}
            <a href={GRAVEL.drivewayLayers} className="font-medium text-primary hover:underline">
              separate layers
            </a>
            .
          </p>
          <ComparisonTable
            columns={[
              { key: "crusher", label: "Crusher run", highlight: true },
              { key: "fiftyseven", label: "#57 stone" },
              { key: "pea", label: "Pea gravel" },
            ]}
            rows={[
              {
                feature: "Best role",
                values: {
                  crusher: "Driving surface",
                  fiftyseven: "Structural mid-layer",
                  pea: "Decorative top only",
                },
              },
              {
                feature: "Shape",
                values: {
                  crusher: "Angular + fines",
                  fiftyseven: "Angular, clean",
                  pea: "Rounded, smooth",
                },
              },
              {
                feature: "Traction / binding",
                values: {
                  crusher: "Compacts into a firm crust",
                  fiftyseven: "Interlocks but stays loose on top",
                  pea: "Never binds — rolls underfoot",
                },
              },
              {
                feature: "Migration under tires",
                values: {
                  crusher: "Minimal once compacted",
                  fiftyseven: "Moderate — rake back yearly",
                  pea: "Severe — needs edging",
                },
              },
              {
                feature: "Drainage",
                values: {
                  crusher: "Sheds off the crown",
                  fiftyseven: "Drains straight through",
                  pea: "Drains through",
                },
              },
              {
                feature: "Typical bulk price",
                values: {
                  crusher: "$18–30 / ton",
                  fiftyseven: "$25–45 / ton",
                  pea: "$30–60 / ton",
                },
              },
            ]}
            caption="The three driveway candidates. Crusher run and #57 are teammates, not rivals — most good drives use both."
          />
        </Section>

        <Section title="Crusher run: the default answer">
          <p className="text-muted-foreground">
            Crusher run is crushed stone straight off the crusher with everything from
            3/4 in rock down to stone dust left in. Those fines are the whole point:
            wetted and compacted, they cement the angular fragments into a crust firm
            enough to shovel snow off and tight enough to shed rain toward the edges.
            It is also the cheapest product most quarries sell.
          </p>
          <ProsCons
            subject="Crusher run"
            pros={[
              "Compacts into a semi-bound, almost pavement-like surface",
              "Best traction of any gravel — for tires and for boots",
              "Cheapest per ton; regradable and reusable for decades",
              "Holds a crown, so it sheds water instead of soaking",
            ]}
            cons={[
              "Fines mean dust in dry spells and a firm-but-muddy skin in long rains",
              "Must be compacted — dumped loose it is just a rock pile",
              "Plain gray; nobody chooses it for looks",
              "Sheds water — so the base below must still handle runoff",
            ]}
          />
        </Section>

        <Section title="#57 stone: structure first">
          <p className="text-muted-foreground">
            #57 is the clean, 3/4 in angular workhorse of the aggregate world. With no
            fines it can never bind into a crust — but that same open grading makes it
            the best-draining structural stone you can buy, which is why it is the
            standard middle layer over a #3 base. As a surface it works on rural drives
            where a slightly loose, never-muddy top is an acceptable trade for annual
            raking. The full size family is covered in the{" "}
            <a href={GRAVEL.stoneSizes} className="font-medium text-primary hover:underline">
              crushed stone sizes guide
            </a>
            .
          </p>
          <InfoBlock title="The two-stone pattern">
            The most durable budget build in most regions: #3 base, #57 middle, crusher
            run surface. You get #57&apos;s drainage where water lives — inside the
            structure — and crusher run&apos;s traction where tires live. Neither stone
            alone does both.
          </InfoBlock>
        </Section>

        <Section title="Why not pea gravel">
          <WarningBlock title="Rounded stone cannot carry traffic">
            Pea gravel never interlocks — every stone is a polished ball. Under a
            turning tire the surface flows like dry beans: ruts in the wheel paths,
            berms at the edges, stones thrown into the lawn. It also migrates downhill
            on any grade over about 4%. No amount of compaction fixes shape; angularity
            is a property of the rock, not the installer.
          </WarningBlock>
          <p className="text-muted-foreground">
            The honest exception: a flat parking court or short cottage drive where
            looks outrank everything, built as 2 in of pea gravel over a compacted
            crusher run base with steel edging on every side. Expect to rake weekly and
            top up yearly — the{" "}
            <a href={GRAVEL.whatIsPea} className="font-medium text-primary hover:underline">
              pea gravel guide
            </a>{" "}
            covers where the stone genuinely belongs.
          </p>
        </Section>

        <Section title="Decorative options that survive tires">
          <p className="text-muted-foreground">
            If plain gray will not do, choose decorative stone that keeps the two
            properties tires demand — angular shape and modest size. Crushed granite
            chips (3/8–3/4 in), crushed limestone in buff or white, and quarried
            bluestone chips all interlock acceptably as a 1.5–2 in top course over a
            crusher run structure. Costs run 2–5 times crusher run, so confine the
            premium stone to the visible top inches, never the full depth. Steel or
            timber edging pays for itself by keeping the expensive stone on the drive.
          </p>
        </Section>

        <Section title="Regional names decoded">
          <p className="text-muted-foreground">
            The same material wears a dozen names across North America. If a supplier
            does not recognize one name, describe the gradation — &quot;3/4 inch minus
            with fines, compactable&quot; — and you will get the right product.
          </p>
          <CoverageTable
            headers={["Name you'll hear", "What it is", "Where"]}
            rows={[
              {
                label: "Crusher run / crush-and-run",
                spec: "3/4 in minus with fines",
                coverage: "Southeast, Mid-Atlantic",
              },
              {
                label: "Road base / Class 5",
                spec: "Dense-graded base, 3/4–1 in minus",
                coverage: "West, Upper Midwest",
              },
              {
                label: "ABC (aggregate base course)",
                spec: "1 in minus with fines",
                coverage: "The Carolinas",
              },
              {
                label: "21A / 21B",
                spec: "VDOT dense-graded base specs",
                coverage: "Virginia",
              },
              {
                label: "DGA / QP (quarry process)",
                spec: "Dense-graded aggregate with dust",
                coverage: "Northeast",
              },
              {
                label: "3/4 minus",
                spec: "Generic: 3/4 in top size with fines",
                coverage: "Pacific Northwest, Mountain West",
              },
            ]}
            caption="Regional aliases for compactable dense-graded surface stone. All build the same crust; gradation specs differ slightly by state DOT."
          />
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Driveway stone questions" />

        <Cta
          variant={ctaVariant}
          title="Price your stone choice"
          description="Pick a surface and the driveway calculator returns tons per layer and total cost for your dimensions."
          href={GRAVEL.driveway}
          buttonLabel="Driveway Gravel Calculator"
        />

        <RelatedArticles
          title="Keep planning the drive"
          variant={relatedStyle}
          items={[
            ...pickLinks(
              drivewayGuideLinks,
              GRAVEL.drivewayLayers,
              GRAVEL.drivewayCost,
              GRAVEL.drivewayInstall,
            ),
            ...pickLinks(stoneGuideLinks, GRAVEL.stoneVsGravel),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.fhwaGravel, GREFS.astmD448, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
