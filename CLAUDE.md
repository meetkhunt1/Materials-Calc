# MaterialsCalc — Framework Rules

Construction-material calculator site (concrete, asphalt, gravel, sand…).
Next.js 15 App Router · TypeScript · Tailwind CSS 4 · shadcn-style components · DM Sans · brand `#FE6617`.

**Read `FRAMEWORK.md` before creating any page — it documents every component and the page recipes.**

## Non-negotiable rules

1. **No two pages may look identical.** Every page derives its structure from its slug via `lib/variation.ts`:
   - Calculator pages: `pick(slug, CALCULATOR_LAYOUTS)` → `<CalculatorPageShell variant={…}>` (3 structural layouts).
   - Heroes: `pick(slug, HERO_VARIANTS)` (4 variants). Related: `pick(slug, RELATED_STYLES)`. FAQ position: `pick(slug, FAQ_POSITIONS)`.
   - Also vary section order, callout types, which tables/charts appear, and FAQ variant (`accordion`/`list`).
2. **SEO is automatic — never hand-write meta tags.** Use `buildMetadata()` from `lib/seo.ts` and `<JsonLd>` + builders from `lib/jsonld.ts` (breadcrumb, faq, article, webpage, calculator, howto). Breadcrumbs component emits its own schema.
3. **Calculators are declared, not built.** Create a `CalculatorDefinition` with `defineCalculator()` (see `content/concrete/calculators/_template.ts`). NEVER pass a definition from a server page into `<CalculatorCard>` — compute() can't cross the RSC boundary (build error). Instead add a bound wrapper in the category's `calculators/cards.tsx` (`"use client"`) and render that (see `content/concrete/calculators/cards.tsx`). Engine handles validation, unit conversion (SI base units into `compute()`), copy/print/share/reset.
4. **Every new page must be registered** in `data/search-index.ts` — this feeds both site search and the sitemap.
5. **Design:** neutral grayscale + `#FE6617` accents only, `rounded-xl`, no gradients, no glassmorphism, Stripe/Linear/Vercel-docs feel. Server Components by default; `"use client"` only where interactive. Subtle `<FadeIn>` (motion) sparingly.
6. **Images:** use `next/image`; source real photos (never AI-generated).
7. Content sources live in `content/<category>/…` as typed TS data files; routes live in `app/<category>/…`.

## Key paths

- `lib/` — site.ts (config), seo.ts, jsonld.ts, units.ts, calculator.ts, variation.ts, format.ts
- `components/` — ui/ · layout/ · calculator/ · charts/ · tables/ · faq/ · seo/ · breadcrumbs/ · toc/ · author/ · blocks/ · layouts/
- `data/` — categories.ts, authors.ts, search-index.ts
- Build: `npm run build` (turbopack) — must pass before finishing any task.
