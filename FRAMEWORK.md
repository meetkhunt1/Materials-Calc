# MaterialsCalc Framework Reference

Complete component + utility catalog. Every future page (calculators, guides,
comparisons, charts, FAQ hubs) is assembled from these pieces — nothing here
should need to be rebuilt per page.

---

## 1. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack), Server Components by default |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 (`@theme` tokens in `app/globals.css`) |
| Components | shadcn-style primitives in `components/ui/` (Radix under the hood) |
| Icons | lucide-react |
| Animation | `motion` — only via `<FadeIn>`, used sparingly |
| Fonts | DM Sans via `next/font/google` (`--font-dm-sans`) |

Design language: neutral grayscale + primary `#FE6617`, `rounded-xl`, clean and
professional (Stripe / Linear / Vercel docs). No gradients, no glassmorphism.

---

## 2. Directory map

```
app/                    routes only (thin — compose components)
  layout.tsx            header/footer shell + Organization/WebSite JSON-LD
  globals.css           all design tokens (light + dark)
  robots.ts, sitemap.ts automatic — sitemap reads data/search-index.ts
components/
  ui/                   button, card, input, label, select, accordion, badge,
                        separator, table, tabs, skeleton, fade-in
  layout/               container, header, footer, mobile-nav, site-search,
                        category-nav, pagination
  layouts/              calculator-page-shell (3 variants), article-shell
  calculator/           calculator-card, -field, -results, -actions
  charts/               bar-chart, donut-chart (zero-JS, server-rendered)
  tables/               density-table, cost-table, coverage-table, comparison-table
  blocks/               section, hero, callout (warning/tip/info/success),
                        formula-block, example-block, pros-cons,
                        related-articles, references, cta, newsletter
  faq/                  faq (accordion|list + FAQPage schema)
  seo/                  json-ld
  breadcrumbs/          breadcrumbs (+ BreadcrumbList schema, breadcrumbTrail())
  toc/                  table-of-contents (scrollspy) + inline-toc
  author/               author-box (card | inline byline)
lib/
  site.ts               siteConfig + absoluteUrl()
  seo.ts                buildMetadata() — canonical/OG/Twitter in one call
  jsonld.ts             organization, website, breadcrumb, faq, article,
                        webPage, calculator (WebApplication), howTo schemas
  units.ts              unit registry + convert()/toBase()/fromBase()
  calculator.ts         defineCalculator(), validate(), compute(), resultsToText()
  variation.ts          deterministic per-slug variation (see §5)
  format.ts             formatNumber/Currency/Date, ceilTo, slugify
hooks/                  use-calculator, use-toc (scrollspy), use-copy
data/                   categories.ts, authors.ts, search-index.ts
types/                  all shared interfaces
content/<category>/     typed TS data files per category
  calculators/ guides/ comparisons/ charts/ faq/
```

---

## 3. Building a calculator

1. Copy `content/concrete/calculators/_template.ts`.
2. Declare fields (`number` + `unitCategory` renders a unit dropdown; `select`
   options can carry `data: { density: 2400 }` payloads exposed to compute as
   `"fieldId.density"`).
3. Write `compute()` — all unit fields arrive converted to SI base units
   (length→m, area→m², volume→m³, weight→kg, density→kg/m³). Convert outputs
   with `fromBase(value, "yd3")` etc. Mark the main answer `primary: true`.
4. Render via a client wrapper — a CalculatorDefinition contains compute(),
   which CANNOT be passed as a prop from a server page to the client
   CalculatorCard (RSC serialization error at build). Add a component to the
   category's `calculators/cards.tsx` (`"use client"`) that binds the
   definition, e.g. `export function SlabCalculatorCard() { return
   <CalculatorCard definition={slabCalculator} columns={2}/> }`, and render
   that from the page. Copy / Print / Share / Reset ship automatically.
5. Add `calculatorSchema({name, description, path})` JSON-LD to the page.

## 4. Page assembly recipes

**Calculator page**
```tsx
const slug = "concrete-slab-calculator";
const layout = pick(slug, CALCULATOR_LAYOUTS);      // split | hero-flow | sidebar
const heroVariant = pick(slug, HERO_VARIANTS);

export const metadata = buildMetadata({ title, description, path });

<CalculatorPageShell
  variant={layout}
  hero={<><Hero variant={heroVariant} …><AuthorBox variant="inline" …/></Hero>
        <Container className="pt-6"><Breadcrumbs items={breadcrumbTrail(…)}/></Container></>}
  calculator={<CalculatorCard definition={…}/>}
  preCalculator={<FormulaBlock …/>}                  // hero-flow only
  aside={<TableOfContents items={toc}/>}
>
  <Section title="…">…</Section>
  <ExampleBlock …/> <DensityTable …/> <TipBlock>…</TipBlock>
  <Faq items={…} variant={pick(slug, ["accordion","list"] as const)}/>
  <RelatedArticles variant={pick(slug, RELATED_STYLES)} items={…}/>
  <AuthorBox author={…} …/>
  <References items={…}/>
</CalculatorPageShell>
<JsonLd data={[webPageSchema(…), calculatorSchema(…)]}/>
```

**Guide / comparison page** — same idea with `<ArticleShell hero={…} toc={…}
tocPosition={pick(slug, ["toc-right","toc-left"] as const)}>`, `prose-article`
class for free-flowing prose, `ProsCons`, `ComparisonTable`, `BarChart`,
`Cta variant={pick(slug, ["banner","card","inline"] as const)}`.

**Always finish a page by** adding it to `data/search-index.ts`
(search + sitemap) and running `npm run build`.

## 5. Variation system (`lib/variation.ts`)

Deterministic per-slug randomness — stable across builds, different across pages:

- `pick(slug, VARIANTS)` — choose a variant
- `shuffle(slug, sections)` — reorder optional sections
- `chance(slug + "-img", 0.5)` — include/exclude optional blocks
- Named sets: `CALCULATOR_LAYOUTS`, `HERO_VARIANTS`, `FAQ_POSITIONS`,
  `RELATED_STYLES`, `TABLE_STYLES`

Rule of thumb: layout shell, hero variant, FAQ position/variant, related style,
and at least one optional block (chart vs table, tip vs info) must all derive
from the slug. Two sibling pages should never share the same combination.

## 6. SEO checklist (all automatic — just call the utilities)

- `buildMetadata()` → title template, description, canonical, OG, Twitter
- `<Breadcrumbs>` → visual trail + BreadcrumbList schema
- `<Faq withSchema>` → FAQPage schema
- `articleSchema`/`webPageSchema`/`calculatorSchema`/`howToSchema` via `<JsonLd>`
- Sitemap + robots read from `data/` automatically
- Author E-E-A-T: `<AuthorBox>` + `authors.ts`; sources via `<References>`

## 7. Performance rules

- Server Components by default; the only client components are the calculator,
  search, mobile nav, TOC scrollspy, newsletter, FadeIn.
- Charts are zero-JS (HTML/CSS bars, SVG donut) — never add a chart library.
- Images: `next/image` with explicit sizes; real photos only (no AI-generated).
- No new dependencies without checking bundle impact.
