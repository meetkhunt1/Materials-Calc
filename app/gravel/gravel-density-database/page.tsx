import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { FormulaBlock } from "@/components/blocks/formula-block";
import { InfoBlock, WarningBlock } from "@/components/blocks/callout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Faq } from "@/components/faq/faq";
import { RelatedArticles } from "@/components/blocks/related-articles";
import { References } from "@/components/blocks/references";
import { AuthorBox } from "@/components/author/author-box";
import { Cta } from "@/components/blocks/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { pick, HERO_VARIANTS, RELATED_STYLES } from "@/lib/variation";
import { formatNumber } from "@/lib/format";
import { getAuthor } from "@/data/authors";
import {
  GRAVEL,
  allGravelGuides,
  referenceLinks,
  pickLinks,
  GREFS,
} from "@/content/gravel/links";
import {
  densityDatabase,
  type AggregateDensityRow,
} from "@/content/gravel/charts/density-database";
import type { FaqItem } from "@/types";

const slug = "gravel-density-database";
const title = "Gravel Density Database — 30 Aggregates, Loose & Compacted";
const description =
  "Loose and compacted unit weights for 30 aggregates — every gravel type, crushed stone size, sand, limestone, granite, river rock, recycled concrete and slag — in lb/ft³, kg/m³ and US tons/yd³, per ASTM C29.";
const path = GRAVEL.refDensity;
const datePublished = "2026-07-16";
const author = getAuthor("materials-team");

const heroVariant = pick(slug, HERO_VARIANTS);
const tocPosition = pick(slug, ["toc-right", "toc-left"] as const);
const faqVariant = pick(slug, ["accordion", "list"] as const);
const relatedVariant = pick(slug, RELATED_STYLES);

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: datePublished,
});

/** kg/m³ → lb/ft³ */
const toLb = (kg: number) => kg * 0.062428;
/** kg/m³ → US tons per cubic yard */
const toTonsYd3 = (kg: number) => (kg * 0.062428 * 27) / 2000;

function DatabaseTable({
  rows,
  caption,
}: {
  rows: AggregateDensityRow[];
  caption?: string;
}) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead>Material</TableHead>
          <TableHead className="text-right">
            Loose
            <span className="block text-xs font-normal">lb/ft³</span>
          </TableHead>
          <TableHead className="text-right">
            Compacted
            <span className="block text-xs font-normal">lb/ft³</span>
          </TableHead>
          <TableHead className="text-right">
            Loose
            <span className="block text-xs font-normal">kg/m³</span>
          </TableHead>
          <TableHead className="text-right">
            Compacted
            <span className="block text-xs font-normal">kg/m³</span>
          </TableHead>
          <TableHead className="text-right">
            Loose
            <span className="block text-xs font-normal">t/yd³</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.material}>
            <TableCell className="font-medium">
              {row.material}
              {row.note && (
                <span className="block text-xs font-normal text-muted-foreground">
                  {row.note}
                </span>
              )}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {formatNumber(toLb(row.looseKg), { precision: 0 })}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {row.compactedKg
                ? formatNumber(toLb(row.compactedKg), { precision: 0 })
                : "—"}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {formatNumber(row.looseKg, { precision: 0 })}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {row.compactedKg ? formatNumber(row.compactedKg, { precision: 0 }) : "—"}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {formatNumber(toTonsYd3(row.looseKg), { precision: 2 })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const faqItems: FaqItem[] = [
  {
    question: "What is the density of gravel per cubic yard?",
    answer:
      "Common dry gravel weighs 1.42 US tons per cubic yard loose (2,830 lb, from 105 lb/ft³ × 27). Across the database the range runs from lava rock at 0.67 t/yd³ to compacted crusher run at 1.89 t/yd³ — which is why ordering from a generic figure instead of your material's row can miss by 30% or more.",
  },
  {
    question: "Should I use the loose or compacted density?",
    answer:
      "Use loose density to convert an order into delivered tons — that is the state the truck weighs. Use compacted density to work out how much stone a finished, rolled layer contains. For a compacted base, run the math both ways: in-place volume × compacted density gives the tons you must order loose.",
  },
  {
    question: "Which aggregate is heaviest, and which is lightest?",
    answer:
      "Compacted crusher run tops the database at 2,240 kg/m³ (140 lb/ft³) because its fines fill every void; crushed trap rock is the densest clean stone at 1,700 kg/m³ loose. Lava rock is the lightest at 800 kg/m³ — half the weight of common gravel, so a ton covers roughly twice the area.",
  },
  {
    question: "How accurate are these values for my local quarry?",
    answer:
      "Treat them as typical estimating values, accurate within about ±5% for most sources. Parent-rock specific gravity, particle shape and gradation all shift the number, so any quarry that runs ASTM C29 tests can hand you a certified bulk density for the exact product you are buying — worth requesting on large orders.",
  },
  {
    question: "Why do sand and screenings compact so much more than clean stone?",
    answer:
      "Fine particles can rearrange into the voids between larger ones. Stone dust gains about 13% from loose to compacted (1,600 to 1,810 kg/m³), while uniform clean stone like #57 gains only about 9% — its single-size particles bridge against each other and leave the voids open.",
  },
];

const toc = tocFromTitles(
  "The density database",
  ["Gravel & rounded stone", 3],
  ["Crushed stone by size number", 3],
  ["By rock type", 3],
  ["Sand & fines", 3],
  ["Specialty, decorative & recycled", 3],
  "How density is measured: ASTM C29",
  "Loose vs compacted unit weight",
  "Moisture and scale weight",
);

export default function GravelDensityDatabasePage() {
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
              eyebrow="Gravel · Reference Database"
              variant={heroVariant}
              title="Gravel density database"
              description="Thirty aggregates, each with loose and compacted bulk density in lb/ft³, kg/m³ and US tons per cubic yard. Every value traces to ASTM C29 typical figures and stays consistent across this site's calculators and charts."
              stats={[
                { value: "30", label: "aggregates listed" },
                { value: "105 lb/ft³", label: "common gravel, loose" },
                { value: "1.42", label: "tons per yd³, loose" },
                { value: "+8–13%", label: "typical compaction gain" },
              ]}
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Gravel", href: GRAVEL.hub },
                  { label: "Density Database", href: path },
                )}
              />
            </Container>
          </>
        }
        aside={
          <Cta
            variant="card"
            title="Skip the lookup"
            description="The gravel calculator carries these densities — pick a material and it converts your dimensions straight to tons."
            href={GRAVEL.calculator}
            buttonLabel="Gravel Calculator"
          />
        }
      >
        <Section
          title="The density database"
          lead="Loose values are material as it leaves the truck; compacted values approximate a rodded or rolled layer. Tons per cubic yard are US short tons, derived from the loose figure."
        >
          {densityDatabase.map((group) => (
            <Section key={group.group} title={group.group} level={3}>
              <DatabaseTable rows={group.rows} />
            </Section>
          ))}
          <p className="text-muted-foreground">
            Need only the everyday types? The condensed{" "}
            <a href={GRAVEL.densityChart} className="font-medium text-primary hover:underline">
              gravel density chart
            </a>{" "}
            covers the ten materials behind most residential orders, and the{" "}
            <a href={GRAVEL.weightChart} className="font-medium text-primary hover:underline">
              gravel weight chart
            </a>{" "}
            restates these densities as pounds per yard, foot and meter.
          </p>
        </Section>

        <Section
          title="How density is measured: ASTM C29"
          lead="Every figure above is a bulk density — stone plus the air between particles — measured by a standardized fill-and-weigh procedure."
        >
          <p className="text-muted-foreground">
            ASTM C29 fills a rigid container of known volume and weighs it two ways. For the
            loose condition, aggregate is discharged from a shovel or scoop with no
            consolidation — mirroring a stockpile or truck bed. For the rodded (compacted)
            condition, the container is filled in three layers, each consolidated with 25
            strokes of a tamping rod — approximating a placed, compacted lift. Bulk density is
            simply net mass divided by container volume; the same test also yields the void
            content between particles.
          </p>
          <FormulaBlock
            formula="Bulk density = (Mass of aggregate + container − container) ÷ container volume"
            variables={[
              { symbol: "Mass", meaning: "Weighed on a calibrated scale", unit: "lb or kg" },
              { symbol: "Volume", meaning: "Rigid calibrated measure", unit: "ft³ or m³" },
            ]}
            note="Bulk density includes inter-particle voids — it is always lower than the solid rock's specific-gravity density (typically 2,600–2,900 kg/m³ for quarry rock)."
          />
        </Section>

        <Section title="Loose vs compacted unit weight">
          <p className="text-muted-foreground">
            Compaction closes the air voids between particles, so the same volume holds more
            stone. How much more depends on gradation: well-graded blends with fines gain the
            most (crusher run +12%, stone dust +13%) because small particles fill the gaps
            between large ones; clean single-size stone gains the least (#57 about +9%);
            rounded pea gravel and river rock gain only 5–7% because smooth particles cannot
            interlock.
          </p>
          <InfoBlock title="Which column to order from">
            Suppliers weigh trucks, and trucks carry loose material — so convert order volume
            to tons with the loose column. But if you are back-calculating how much stone an
            existing compacted base contains, or sizing an order to achieve a compacted
            design thickness, work from the compacted column and order that tonnage loose.
          </InfoBlock>
        </Section>

        <Section title="Moisture and scale weight">
          <WarningBlock title="Water rides on your ticket">
            The database lists dry values. Water clinging to particle surfaces adds 10–15% to
            scale weight without adding any stone — common gravel goes from 1,680 kg/m³ dry
            to about 1,920 wet. When a supplier loads from an uncovered, rained-on stockpile,
            that difference is billed as gravel. On big orders, ask whether the plant applies
            a moisture correction, or buy by loose cubic yard, which moisture cannot inflate.
          </WarningBlock>
        </Section>

        <Faq items={faqItems} variant={faqVariant} title="Density database questions" />

        <RelatedArticles
          title="Related references"
          variant={relatedVariant}
          items={[
            ...pickLinks(referenceLinks, GRAVEL.refWeight, GRAVEL.refConversion, GRAVEL.refSizes),
            ...pickLinks(allGravelGuides, GRAVEL.densityChart, GRAVEL.stoneWeight),
          ]}
        />

        <AuthorBox author={author} datePublished={datePublished} />

        <References items={[GREFS.astmC29, GREFS.astmD448, GREFS.nssga, GREFS.usgs]} />
      </ArticleShell>
    </>
  );
}
