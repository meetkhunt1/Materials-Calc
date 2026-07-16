import { Container } from "@/components/layout/container";
import { Hero } from "@/components/blocks/hero";
import { Breadcrumbs, breadcrumbTrail } from "@/components/breadcrumbs/breadcrumbs";
import { ArticleShell } from "@/components/layouts/article-shell";
import { Section, tocFromTitles } from "@/components/blocks/section";
import { WarningBlock, SuccessBlock } from "@/components/blocks/callout";
import { CostTable } from "@/components/tables/cost-table";
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

const title = "How to Save Money on Asphalt (Without Ruining the Job)";
const description =
  "Seven legitimate ways to cut an asphalt bid — timing, bundling, design and prep — plus the four places where saving money guarantees early failure, and the checklist for comparing quotes.";
const path = ASPHALT.costSaving;
const author = getAuthor("materials-team");

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  publishedTime: "2026-07-15",
});

const tips = [
  {
    name: "Get three or more quotes, in writing",
    text: "Paving bids on identical scope routinely spread 25–40% because backlogs differ. A written quote must state area, compacted thickness, tonnage, base scope and compaction method — anything vaguer is not comparable, and tonnage stated is your protection against a thin mat.",
  },
  {
    name: "Schedule mid-season and piggyback nearby jobs",
    text: "Contractors price desperation in spring and backlog in early summer. Mid-to-late season, a crew already mobilized on your street can add your driveway for hundreds less — the $1,500–3,000 mobilization is already paid. Ask every bidder when they will next have equipment in your area.",
  },
  {
    name: "Combine with neighbors to share mobilization",
    text: "Two adjacent driveways paved the same day split one mobilization and keep the paver working instead of trailering. Savings of 10–20% per household are realistic, and contractors actively prefer these jobs — a full crew-day of continuous tonnage is exactly what they staff for.",
  },
  {
    name: "Keep the design simple",
    text: "Straight edges, gentle curves and widths in multiples of the paver screed (8–10 ft) let the machine do the work. Every scalloped edge, tight radius and bump-out becomes hand-raked asphalt — the slowest, least dense, first-to-fail material on the job — billed at premium labor.",
  },
  {
    name: "Do your own site clearing where the contract allows",
    text: "Removing fencing, vegetation, and old edging, and hauling spoil you can legally move, are unskilled hours you can take off the bid. Confirm in writing which prep items the contractor will credit — and leave grading and base compaction to them, because that work carries the warranty.",
  },
  {
    name: "Consider millings for rural and secondary surfaces",
    text: "Reclaimed asphalt millings at $10–25 per ton cost a tenth of hot mix and make a serviceable farm lane, parking pad or secondary drive when spread and compacted properly. They are not a finished pavement and never will be — but where gravel was the alternative, millings beat it.",
  },
  {
    name: "Maintain on schedule — it is the biggest saving of all",
    text: "Sealcoating at roughly $0.30 per square foot every 3–5 years, plus crack filling, defers the day you need a $4-per-square-foot overlay. Over a 20-year life, an owner who maintains spends a fraction of what the replace-when-it-fails owner spends. No negotiation tactic comes close.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "When is asphalt cheapest to install?",
    answer:
      "Mid to late paving season — late summer into fall in most states — when contractors are filling gaps in their schedule rather than turning work away. Prices also soften when a contractor is already working in your neighborhood, since mobilization is the largest fixed cost on small jobs. Avoid the spring rush and the last frantic weeks before plants close.",
  },
  {
    question: "Is a cheaper 2-inch driveway a reasonable saving?",
    answer:
      "No. Dropping from 3 inches to 2 saves roughly 20–25% of the bid but removes a third of the structure, and pavement life falls disproportionately — fatigue cracking under wheel loads accelerates sharply below 3 inches compacted. Thickness is the last place to economize because it is unfixable after the fact without an overlay.",
  },
  {
    question: "Are asphalt millings a safe way to save?",
    answer:
      "For the right application, yes. At $10–25 per ton, millings suit farm lanes, rural drives and parking pads where a hot-mix finish is not required. Compact them in thin lifts, ideally in hot weather, and expect a surface that sheds gravel less than crushed stone but never seals like new asphalt. Do not accept millings where you paid for hot mix.",
  },
  {
    question: "How do I know a low bid is not a scam?",
    answer:
      "Check the quote states compacted thickness, tonnage, base scope and compaction method; verify licensing, insurance and a physical business address; and never pay more than a 10–30% deposit. The classic scam is a crew with leftover asphalt offering a same-day deal — the material is cold, the mat is thin, and the phone number is dead by winter.",
  },
  {
    question: "Does sealcoating really extend asphalt life?",
    answer:
      "It protects the binder from oxidation and water intrusion, which is what makes asphalt brittle and crack-prone. Sealed on a 3–5 year cycle with cracks filled annually, a residential driveway routinely reaches 20–25 years; neglected, 12–15 is typical. At $0.30 per square foot versus $4-plus for an overlay, the arithmetic is not close.",
  },
  {
    question: "Can I negotiate a paving quote?",
    answer:
      "Yes, but negotiate scope and schedule, not thickness. Legitimate levers: flexible timing that fits their routing, doing your own clearing, combining with a neighbor, and asking a bidder to match a competitor on identical written scope. A contractor who instead offers to hit your price by going thinner has told you exactly where the money comes from.",
  },
];

const toc = tocFromTitles(
  "Seven ways to cut the bid",
  "Where never to save",
  "The quote-comparison checklist",
);

export default function AsphaltCostSavingTipsPage() {
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
        tocPosition="toc-right"
        toc={toc}
        hero={
          <>
            <Hero
              eyebrow="Asphalt · Cost Series"
              variant="centered"
              title="Save on asphalt without ruining the job"
              description="Roughly half an asphalt bid is fixed costs and scheduling — real money moves there. The other half is structure, and every dollar cut from it comes back with interest. Know which half you are negotiating."
            />
            <Container className="pt-6">
              <Breadcrumbs
                items={breadcrumbTrail(
                  { label: "Asphalt", href: ASPHALT.hub },
                  { label: "Cost Saving Tips", href: path },
                )}
              />
            </Container>
          </>
        }
      >
        <Section title="Seven ways to cut the bid">
          <ol className="space-y-4">
            {tips.map((tip, index) => (
              <li key={tip.name} className="flex gap-4 rounded-xl border p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold">{tip.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <CostTable
            currency="USD"
            rows={[
              { item: "Competitive bidding (3+ written quotes)", unit: "job", low: 500, high: 2000, note: "On a typical $5,000 driveway" },
              { item: "Mid-season / piggyback scheduling", unit: "job", low: 300, high: 1000, note: "Mobilization already amortized" },
              { item: "Shared mobilization with a neighbor", unit: "job", low: 400, high: 1200, note: "10–20% per household" },
              { item: "Simple, machine-width design", unit: "job", low: 200, high: 800, note: "Less hand work at edges" },
              { item: "Owner site clearing (where credited)", unit: "job", low: 150, high: 500, note: "Unskilled prep hours only" },
              { item: "Millings instead of hot mix (rural surfaces)", unit: "job", low: 1000, high: 3000, note: "Different product — right jobs only" },
              { item: "On-schedule sealcoat vs deferred overlay", unit: "20 yr", low: 2000, high: 5000, note: "$0.30/ft² cycles vs $4/ft² overlay" },
            ]}
            caption="Realistic savings per tip on a ~1,000 ft² residential job at 2026 prices. They stack — but the first four are available on every job, the last three only where they fit."
          />
        </Section>

        <Section title="Where never to save">
          <WarningBlock title="Four lines that are not negotiable">
            Base thickness and compaction — the pavement is only as strong as what it sits
            on, and base failures cannot be patched from above. Asphalt thickness — 3 inches
            compacted is the residential floor; a thin mat fails in fatigue years early.
            Drainage — water under pavement destroys it from below, and regrading later
            costs more than doing it now. And never hire door-knockers offering
            &quot;leftover asphalt from a job up the road&quot; — it is the industry&apos;s
            oldest scam: cold mix, no base work, no tonnage, no warranty, no callback.
          </WarningBlock>
        </Section>

        <Section title="The quote-comparison checklist">
          <SuccessBlock title="A comparable quote answers all of these">
            Compacted thickness stated in inches — not &quot;2–3 inches&quot; and not loose
            thickness? Base scope specified — existing base accepted, or new gravel at a
            stated depth with compaction? Tonnage stated — the one number that makes a thin
            mat provable? Compaction method named — vibratory roller, not a plate
            compactor? Add mobilization, timeline and warranty terms, and any two bids that
            answer all of it can be compared dollar for dollar. A bid that dodges tonnage
            or thickness is not the cheap option; it is the unpriced one.
          </SuccessBlock>
        </Section>

        <Faq items={faqItems} variant="accordion" />

        <Cta
          variant="banner"
          title="Know your number before you negotiate"
          description="Work out material tonnage and cost yourself — the strongest position in any quote conversation."
          href={ASPHALT.cost}
          buttonLabel="Asphalt Cost Calculator"
        />

        <RelatedArticles
          title="Continue the cost series"
          variant="cards"
          items={pickLinks(costGuideLinks, ASPHALT.pricePerTon, ASPHALT.costPerSqft, ASPHALT.regionalPrices)}
        />

        <AuthorBox author={author} datePublished="2026-07-15" />

        <References items={[AREFS.napa]} />
      </ArticleShell>
    </>
  );
}
