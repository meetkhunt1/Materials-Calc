import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
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
import { GRAVEL, peaGuideLinks, pickLinks, GREFS } from "@/content/gravel/links";
import type { FaqItem } from "@/types";

const title = "What Is Pea Gravel? A Practical Introduction";
const description =
  "Pea gravel explained by people who spread it: river-worn rounded stone, 1/4 to 5/8 inch, how it differs from crushed stone, where it excels and where it fails.";
const path = GRAVEL.whatIsPea;
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
    question: "What exactly is pea gravel?",
    answer:
      "Small, naturally rounded stone between 1/4 and 5/8 inch — about the size of a pea. It comes from river and glacial deposits, so water did the smoothing, not a crusher. That rounded shape is what makes it comfortable underfoot, free-draining, and prone to rolling out of anything without edging.",
  },
  {
    question: "Is pea gravel natural or man-made?",
    answer:
      "Natural. Suppliers dredge or excavate it from river-run and glacial deposits, then screen it to size. Nothing is crushed, which is why every stone is smooth and why color follows the local geology — tan and brown in most regions, grayer where deposits are granitic.",
  },
  {
    question: "How much does pea gravel weigh?",
    answer:
      "About 96 lb per cubic foot loose (1,540 kg/m³), which works out to roughly 1.3 tons per cubic yard — about 2,600 lb. That is lighter than most crushed stone, so a ton of pea gravel goes slightly further: about 125 ft² at 2 inches deep or 83 ft² at 3 inches.",
  },
  {
    question: "Can I use pea gravel for a driveway?",
    answer:
      "We advise against it. Rounded stones do not lock together, so tires push them into ruts and spray them off the edges — worse on any slope. Driveways want angular crushed stone like crusher run that compacts into a solid mat. Pea gravel driveways exist, but they demand rigid edging and constant raking.",
  },
  {
    question: "Does pea gravel need edging?",
    answer:
      "Always. Rounded stone behaves like a slow liquid — it migrates into lawns, down slopes and out of borders. Steel, aluminum or paver edging set about 1 inch above grade is the difference between a path that holds its lines for a decade and one that dissolves in a season.",
  },
  {
    question: "How deep should pea gravel be laid?",
    answer:
      "2 inches for walkways over a compacted base, 3 inches for patios, 4 inches for loose decorative fill, and 9 inches for playground fall zones per CPSC loose-fill guidance. Deeper is not better on walking surfaces — past 3 inches the rounded stones shift underfoot like dry sand.",
  },
];

const toc = tocFromTitles(
  "What pea gravel actually is",
  "Pea gravel vs crushed stone",
  "Where pea gravel excels",
  "Where pea gravel fails",
);

export default function WhatIsPeaGravelPage() {
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
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Gravel · Pea Gravel"
              variant="standard"
              title="What is pea gravel?"
              description="The smooth, rounded stone that dominates paths, patios and play areas — what it is, why its shape changes everything, and the jobs it should never be asked to do."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "What Is Pea Gravel?", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Know how much you need?"
            description="Tons, yards and bag counts from your dimensions."
            href={GRAVEL.pea}
            buttonLabel="Pea Gravel Calculator"
          />
        }
      >
        <Section title="What pea gravel actually is">
          <p className="text-muted-foreground">
            Pea gravel is river-worn natural stone screened to 1/4&ndash;5/8 inch — pea
            sized, hence the name. Every stone is rounded and smooth because moving water
            tumbled it for centuries; no crusher ever touched it. That single fact drives
            everything else about the material: it feels good under bare feet, it pours and
            spreads like coarse sand, it drains almost instantly because there are no fines
            packing the voids, and it will not stay where you put it without a border.
          </p>
          <p className="text-muted-foreground">
            The numbers you need for estimating: loose pea gravel weighs about 96 lb/ft³
            (1,540 kg/m³), or roughly 1.3 tons per cubic yard (2,600 lb). One ton covers
            about 125 ft² at 2 inches deep and 83 ft² at 3 inches. Sizing is standardized —
            most pea gravel corresponds to ASTM D448 size #8 — but suppliers sell it by name,
            not number, so what matters at the yard is the screen size and the deposit color.
          </p>
        </Section>

        <Section title="Pea gravel vs crushed stone">
          <p className="text-muted-foreground">
            The comparison that decides most projects is pea gravel against a similarly sized
            crushed stone like #8. Same size class, opposite behavior — the full breakdown is
            in the{" "}
            <a href={GRAVEL.stoneVsGravel} className="font-medium text-primary hover:underline">
              crushed stone vs gravel guide
            </a>
            , but the short version fits in one table.
          </p>
          <ComparisonTable
            caption="Pea gravel and crushed #8 are the same size class — shape does the rest."
            columns={[
              { key: "pea", label: "Pea gravel", highlight: true },
              { key: "crushed", label: "Crushed stone #8" },
            ]}
            rows={[
              { feature: "Shape", values: { pea: "Rounded, smooth", crushed: "Angular, sharp-edged" } },
              { feature: "Source", values: { pea: "River / glacial deposits, screened", crushed: "Quarried rock, mechanically crushed" } },
              { feature: "Drainage", values: { pea: "Excellent — no fines, open voids", crushed: "Good, but fines can slow it" } },
              { feature: "Underfoot feel", values: { pea: "Comfortable, barefoot-friendly", crushed: "Harsh; hard on paws and knees" } },
              { feature: "Stays put", values: { pea: "Poor — migrates without edging", crushed: "Good — angular faces interlock" } },
              { feature: "Typical cost", values: { pea: "$30–60/ton bulk", crushed: "Similar; often cheaper near quarries" } },
            ]}
          />
        </Section>

        <Section title="Where pea gravel excels">
          <CoverageTable
            headers={["Application", "Depth", "Why it works"]}
            rows={[
              { label: "Garden paths & walkways", spec: "2 in over base", coverage: "Comfortable, crunchy, drains instantly" },
              { label: "Patios & seating areas", spec: "3 in over base", coverage: "Screeds flat; softer than pavers underfoot" },
              { label: "Playgrounds", spec: "9 in loose fill", coverage: "CPSC-recognized impact-absorbing surface" },
              { label: "Dog runs & pet areas", spec: "4 in", coverage: "Rounded stone is easy on paws; rinses clean" },
              { label: "Drainage & downspout zones", spec: "3–4 in", coverage: "No fines — near-total infiltration", note: "French-drain dressing, splash zones" },
              { label: "Exposed-aggregate concrete", spec: "Seeded in surface", coverage: "The classic decorative aggregate finish" },
            ]}
            caption="The application matrix. Depths assume 2–3 in of compacted crusher run or stone dust beneath any walked surface."
          />
        </Section>

        <Section title="Where pea gravel fails">
          <WarningBlock title="Three jobs pea gravel should never get">
            <p>
              <strong>Driveways — especially on slopes.</strong> Rounded stone will not
              interlock; tires rut it, spin in it and fling it into the lawn. Every grade
              over a few percent turns the surface into a slow conveyor headed downhill.
            </p>
            <p>
              <strong>Load-bearing base layers.</strong> Under pavers, slabs or sheds it acts
              like a layer of ball bearings — it never compacts to refusal. Bases want
              angular crusher run or stone dust.
            </p>
            <p>
              <strong>Anywhere unedged.</strong> Without a physical border, migration is not
              a risk, it is a schedule. Budget edging into every pea gravel project or budget
              annual top-ups instead.
            </p>
          </WarningBlock>
        </Section>

        <Faq items={faqItems} variant="accordion" title="Pea gravel basics" />

        <RelatedArticles
          title="Next in the pea gravel series"
          variant="cards"
          items={pickLinks(peaGuideLinks, GRAVEL.peaSizes, GRAVEL.peaLandscaping, GRAVEL.peaInstall)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[GREFS.astmD448, GREFS.nssga]} />
      </ArticleShell>
    </>
  );
}
