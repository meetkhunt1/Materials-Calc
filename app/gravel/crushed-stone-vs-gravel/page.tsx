import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { InfoBlock } from "@/components/blocks/callout";
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
import { pick, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { getAuthor } from "@/data/authors";
import {
  GRAVEL,
  stoneGuideLinks,
  peaGuideLinks,
  coreGuideLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const slug = "crushed-stone-vs-gravel";
const title = "Crushed Stone vs Gravel — Angular vs Rounded, Compared";
const description =
  "Crushed stone is angular and locks solid under compaction; natural gravel is rounded, drains freely and feels better underfoot. Full comparison table, pros and cons, and which to pick for driveways, drains, paths and concrete.";
const path = GRAVEL.stoneVsGravel;
const author = getAuthor("materials-team");

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
  publishedTime: "2026-07-16",
});

const faqItems: FaqItem[] = [
  {
    question: "What is the difference between crushed stone and gravel?",
    answer:
      "Origin and shape. Crushed stone is quarried rock mechanically broken into angular, sharp-edged pieces. Gravel in the strict sense is naturally weathered rock from rivers and glacial deposits — rounded and smooth. The angular faces of crushed stone interlock and compact into a near-solid layer; rounded gravel stays loose, drains freely and rolls underfoot.",
  },
  {
    question: "Which is better for a driveway — crushed stone or gravel?",
    answer:
      "Crushed stone, without much debate. A driveway needs layers that lock together under wheel loads, and angular particles do that; rounded stones displace sideways, forming ruts and washboard. The standard build is compacted crusher run base topped with #57 or more crusher run. Rounded gravel on a driveway is a maintenance subscription.",
  },
  {
    question: "Which drains better?",
    answer:
      "Rounded pea gravel drains marginally faster in theory, but clean crushed stone like #57 is the standard in French drains for a better reason: it drains excellently AND stays put around the pipe without migrating. In practice, cleanliness (no fines) matters far more for drainage than particle shape.",
  },
  {
    question: "Which is cheaper — crushed stone or gravel?",
    answer:
      "Whichever is local. Crushed stone is usually cheaper near quarries — crusher run at $15–30 per ton undercuts everything. Natural pea gravel is cheaper near river and glacial deposits, at $30–60 per ton. Freight dominates aggregate pricing, so the material from 10 miles away nearly always wins.",
  },
  {
    question: "Can I use crushed stone where the spec says gravel?",
    answer:
      "Usually, and often it is an upgrade — most construction specs use gravel loosely to mean any coarse aggregate, and angular stone exceeds rounded material for anything structural. The exceptions run the other way: walking surfaces, play areas and dog runs genuinely want rounded stone for comfort, and exposed decorative work is a taste call.",
  },
  {
    question: "Is crushed stone or pea gravel better for walkways?",
    answer:
      "Pea gravel feels better barefoot and looks softer, but migrates and needs edging. Crushed fines or #8 with screenings compact into a firmer, wheelchair- and stroller-friendlier surface that stays where you raked it. High-traffic utility path: crushed. Garden stroll: pea gravel. Both are covered in the pea gravel landscaping guide.",
  },
];

const toc = tocFromTitles(
  "The one difference that matters",
  "Head to head",
  "Pros and cons",
  "Which to pick, by application",
);

export default function CrushedStoneVsGravelPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title,
          description,
          path,
          category: "Gravel",
          datePublished: "2026-07-16",
          author,
        })}
      />
      <ArticleShell
        tocPosition={tocPosition}
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Comparison"
              variant={heroVariant}
              title="Crushed stone vs gravel"
              description="One is blasted and broken, the other tumbled smooth by rivers. That single difference — angular vs rounded — decides how each compacts, drains, walks and wears. Pick by shape and you will pick right."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Crushed Stone vs Gravel", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="The one difference that matters">
          <p className="text-muted-foreground">
            Crushed stone is manufactured: quarried rock fed through crushers and screens,
            leaving every particle with sharp, fractured faces. Natural gravel is found:
            rock rounded by water or glacial action, mined from pits and riverbeds. Under
            load, the two behave like different materials. Angular particles wedge against
            each other — friction and interlock turn a compacted lift of crusher run into
            something close to weak concrete. Rounded particles act like ball bearings: they
            resist compaction, keep large open voids, and displace sideways when a tire or
            heel pushes down. Neither behavior is better in the abstract; each is exactly
            what half the jobs in a yard need.
          </p>
          <InfoBlock title="Watch the loose vocabulary">
            <p>
              Suppliers and specs often say &quot;gravel&quot; for any coarse aggregate,
              crushed or not. When you order, confirm the actual product: angular crushed
              stone by size number (see the{" "}
              <a href={GRAVEL.stoneSizes} className="font-medium text-primary hover:underline">
                sizes guide
              </a>
              ) or rounded natural material like{" "}
              <a href={GRAVEL.whatIsPea} className="font-medium text-primary hover:underline">
                pea gravel
              </a>
              . The word on the ticket matters less than the shape in the truck.
            </p>
          </InfoBlock>
        </Section>

        <Section title="Head to head">
          <ComparisonTable
            columns={[
              { key: "crushed", label: "Crushed stone (angular)" },
              { key: "gravel", label: "Natural gravel (rounded)" },
            ]}
            rows={[
              { feature: "Origin", values: { crushed: "Quarried rock, mechanically crushed and screened", gravel: "River and glacial deposits, naturally weathered" } },
              { feature: "Particle shape", values: { crushed: "Angular, sharp fractured faces", gravel: "Rounded, smooth" } },
              { feature: "Compaction", values: { crushed: "Interlocks — compacts to a near-solid layer", gravel: "Resists compaction; stays loose" } },
              { feature: "Load bearing", values: { crushed: "Excellent — the standard for bases and roads", gravel: "Poor — ruts and displaces under wheels" } },
              { feature: "Drainage", values: { crushed: "Excellent when clean (e.g. #57); nil with fines", gravel: "Excellent — voids never close" } },
              { feature: "Underfoot / paws", values: { crushed: "Firm but sharp-edged", gravel: "Comfortable — the walking surface" } },
              { feature: "Migration", values: { crushed: "Stays put once compacted", gravel: "Rolls and scatters; needs edging" } },
              { feature: "Look", values: { crushed: "Uniform gray, utilitarian", gravel: "Varied natural color, softer" } },
              { feature: "Typical 2026 price", values: { crushed: "$15–45 per ton", gravel: "$30–60 per ton" } },
              { feature: "Weight, loose", values: { crushed: "≈100 lb/ft³ clean; 125 with fines", gravel: "≈96 lb/ft³ (pea gravel)" } },
            ]}
            caption="The structural columns all trace back to particle shape. Prices are 2026 quarry/pit-gate ranges."
          />
        </Section>

        <Section title="Pros and cons">
          <ProsCons
            subject="Crushed stone"
            pros={[
              "Compacts into a stable, load-bearing layer — the only choice for driveway and road bases",
              "Angular particles stay put; no migration once rolled",
              "Cheapest structural material per ton (crusher run $15–30)",
              "Clean sizes double as first-rate drainage stone",
            ]}
            cons={[
              "Sharp edges — unpleasant barefoot, hard on paws and knees",
              "Utilitarian gray look unless you pay decorative prices",
              "Dense-graded products seal up — wrong anywhere water must pass",
              "Dust in dry weather from the fine fraction",
            ]}
          />
          <ProsCons
            subject="Natural gravel"
            pros={[
              "Comfortable walking surface — the pick for paths, play areas and dog runs",
              "Drains freely forever; voids cannot close under traffic",
              "Natural rounded look and varied color",
              "Easy to rake, redistribute and hand-work",
            ]}
            cons={[
              "Will not compact — never structural, never a base",
              "Migrates constantly; edging is mandatory",
              "Ruts and washboards under vehicle traffic",
              "Often pricier than crushed equivalents away from river deposits",
            ]}
          />
        </Section>

        <Section title="Which to pick, by application">
          <CoverageTable
            headers={["Application", "Pick", "Why"]}
            rows={[
              { label: "Driveway base & surface", spec: "Crushed — crusher run + #57", coverage: "Interlock carries wheel loads without rutting" },
              { label: "French drain / drainage", spec: "Crushed — clean #57", coverage: "Drains like gravel but never migrates off the pipe" },
              { label: "Garden path, patio", spec: "Rounded — 3/8 in pea gravel", coverage: "Comfort and looks; loads are only feet" },
              { label: "Dog run / play area", spec: "Rounded — 1/2 in pea gravel", coverage: "Paw- and knee-friendly, hoses clean" },
              { label: "Concrete aggregate", spec: "Crushed — washed #57/#8", coverage: "Angular faces bond better with cement paste" },
              { label: "Decorative beds", spec: "Either", coverage: "Taste call — rounded looks softer, crushed stays put" },
            ]}
            caption="The pattern: wheels and structure want angular; feet and looks want rounded; drains want clean."
          />
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Comparison questions" />

        <Cta
          variant={ctaVariant}
          title="Decided? Get your tonnage"
          description="The crushed stone calculator handles angular products; the pea gravel calculator covers rounded. Both return tons, yards and cost."
          href={GRAVEL.crushed}
          buttonLabel="Crushed Stone Calculator"
        />

        <RelatedArticles
          title="Keep comparing"
          variant={relatedStyle}
          items={[
            ...pickLinks(stoneGuideLinks, GRAVEL.stoneSizes, GRAVEL.stoneUses),
            ...pickLinks(peaGuideLinks, GRAVEL.whatIsPea),
            ...pickLinks(coreGuideLinks, GRAVEL.densityChart),
          ]}
        />

        <AuthorBox author={author} datePublished="2026-07-16" />

        <References items={[GREFS.astmD448, GREFS.nssga, GREFS.fhwaGravel]} />
      </ArticleShell>
    </>
  );
}
