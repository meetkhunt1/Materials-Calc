# Google Search Console — Submission & Ranking Plan

**Site:** MaterialsCalc — construction material calculators & guides
**Base domain:** `https://materialscalc.com/`
**Prepared:** 2026-07-16

This is the step-by-step plan for getting the site indexed and ranking in Google.
Everything here assumes the site is deployed and reachable at the base domain over HTTPS.

---

## 1. Prerequisites (before touching GSC)

- [ ] Site is live at `https://materialscalc.com/` (HTTPS, valid cert).
- [ ] Non-www vs www decided — this site uses **non-www** (`materialscalc.com`). Redirect `www` → non-www (301).
- [ ] `robots.ts` is serving `https://materialscalc.com/robots.txt` and allows crawling.
- [ ] `sitemap.ts` is serving `https://materialscalc.com/sitemap.xml` (auto-generated from `data/search-index.ts`).
- [ ] Every URL returns HTTP 200 (no accidental 404 / redirect chains).

> The sitemap is generated automatically from `data/search-index.ts`. Any page **not**
> in that file is intentionally excluded from the sitemap (see §6, phase-2 pages).

---

## 2. Verify the property

Use a **Domain property** (covers http/https + all subdomains) — the strongest option.

1. GSC → *Add property* → **Domain** → enter `materialscalc.com`.
2. Copy the TXT record Google provides.
3. Add it to DNS (registrar / Cloudflare) as a TXT record on the root.
4. Wait for propagation (minutes–hours), click **Verify**.

*Fallback (if DNS access is limited):* URL-prefix property `https://materialscalc.com/`
verified via the HTML meta tag in `app/layout.tsx` `<head>`, or an HTML file upload.

---

## 3. Submit the sitemap

1. GSC → **Sitemaps**.
2. Enter `sitemap.xml` and submit → full URL: `https://materialscalc.com/sitemap.xml`.
3. Confirm status = *Success* and the discovered-URL count matches the live page count.

---

## 4. URL structure

Flat, category-first, keyword-slug structure. No trailing slash on inner pages.

```
https://materialscalc.com/                         ← home
https://materialscalc.com/about
https://materialscalc.com/contact
https://materialscalc.com/privacy
https://materialscalc.com/terms

https://materialscalc.com/concrete                 ← category hub
https://materialscalc.com/concrete/<page>

https://materialscalc.com/asphalt                  ← category hub
https://materialscalc.com/asphalt/<page>

https://materialscalc.com/gravel                   ← category hub
https://materialscalc.com/gravel/<page>
```

**Pattern:** `/{category}/{slug}` — one level deep, human-readable slug, matches the
primary target keyword for the page.

---

## 5. Full live URL list (currently in sitemap)

### Top-level
```
/
/about
/contact
/privacy
/terms
```

### Concrete — `/concrete`
```
/concrete
/concrete/concrete-calculator
/concrete/concrete-slab-calculator
/concrete/concrete-footing-calculator
/concrete/concrete-wall-calculator
/concrete/concrete-column-calculator
/concrete/how-to-calculate-concrete
/concrete/concrete-cost-guide
/concrete/concrete-density-chart
/concrete/concrete-coverage-guide
/concrete/concrete-mix-ratio-guide
/concrete/concrete-curing-guide
/concrete/concrete-vs-asphalt
```

### Asphalt — `/asphalt`
```
/asphalt
/asphalt/asphalt-calculator
/asphalt/asphalt-driveway-calculator
/asphalt/asphalt-weight-calculator
/asphalt/asphalt-cost-calculator
/asphalt/asphalt-volume-calculator
/asphalt/how-to-calculate-asphalt
/asphalt/asphalt-density-chart
/asphalt/asphalt-coverage-guide
/asphalt/asphalt-cost-guide
/asphalt/asphalt-thickness-guide
/asphalt/asphalt-vs-concrete
/asphalt/asphalt-faqs
/asphalt/standard-driveway-dimensions
/asphalt/best-asphalt-thickness-for-driveways
/asphalt/driveway-installation-guide
/asphalt/driveway-cost-guide
/asphalt/driveway-maintenance
/asphalt/driveway-lifespan
/asphalt/driveway-faqs
/asphalt/asphalt-weight-chart
/asphalt/tons-vs-cubic-yards
/asphalt/asphalt-density-explained
/asphalt/weight-conversion-guide
/asphalt/truck-load-capacity
/asphalt/hot-mix-vs-cold-mix-weight
/asphalt/asphalt-weight-faqs
/asphalt/asphalt-price-per-ton
/asphalt/asphalt-cost-per-square-foot
/asphalt/asphalt-labor-cost-guide
/asphalt/asphalt-equipment-cost
/asphalt/asphalt-cost-saving-tips
/asphalt/regional-asphalt-price-factors
/asphalt/asphalt-cost-faqs
/asphalt/asphalt-cubic-yard-guide
/asphalt/asphalt-cubic-foot-guide
/asphalt/asphalt-volume-formula
/asphalt/asphalt-density-and-volume
/asphalt/asphalt-measurement-guide
/asphalt/asphalt-unit-conversion
/asphalt/asphalt-volume-faqs
```

### Gravel — `/gravel`
```
/gravel
/gravel/gravel-calculator
/gravel/pea-gravel-calculator
/gravel/crushed-stone-calculator
/gravel/driveway-gravel-calculator
/gravel/gravel-cost-calculator
/gravel/how-to-calculate-gravel
/gravel/gravel-density-chart
/gravel/gravel-coverage-guide
/gravel/gravel-weight-chart
/gravel/gravel-volume-formula
/gravel/gravel-measurement-guide
/gravel/gravel-faq
/gravel/what-is-pea-gravel
/gravel/pea-gravel-sizes
/gravel/pea-gravel-cost
/gravel/pea-gravel-coverage
/gravel/pea-gravel-landscaping-guide
/gravel/pea-gravel-installation-guide
/gravel/pea-gravel-faq
/gravel/crushed-stone-sizes
/gravel/crushed-stone-weight
/gravel/crushed-stone-cost
/gravel/crushed-stone-vs-gravel
/gravel/crushed-stone-best-uses
/gravel/crushed-stone-coverage-chart
/gravel/driveway-gravel-depth
/gravel/driveway-gravel-base-layers
/gravel/best-gravel-for-driveways
/gravel/gravel-driveway-cost
/gravel/gravel-driveway-installation
/gravel/gravel-price-guide
/gravel/gravel-delivery-cost
/gravel/gravel-cost-per-ton
/gravel/gravel-cost-per-cubic-yard
/gravel/gravel-labor-cost
/gravel/gravel-density-database
/gravel/gravel-size-chart
```

---

## 6. Phase-2 pages (NOT yet live — add next week)

These 8 pages are planned but not built. They are **excluded from the sitemap and all
internal links** until they ship, so Google never sees a 404. Once built, add each back
to `data/search-index.ts` and the relevant array in `content/gravel/links.ts`, then
resubmit the sitemap.

```
/gravel/crushed-stone-faq
/gravel/gravel-driveway-maintenance
/gravel/gravel-driveway-faq
/gravel/gravel-budget-tips
/gravel/gravel-cost-faq
/gravel/gravel-weight-table
/gravel/gravel-coverage-chart
/gravel/gravel-conversion-chart
```

**When they go live:**
1. Re-add search-index + internal-link entries.
2. Rebuild & deploy.
3. GSC → **URL Inspection** → paste each new URL → *Request Indexing*.
4. Sitemap updates automatically; optionally re-submit to nudge a re-crawl.

---

## 7. Indexing & ranking plan

### Immediately after sitemap submission
- **URL Inspection → Request Indexing** for the highest-value pages first (don't wait for
  the natural crawl):
  1. Home `/`
  2. The 3 category hubs `/concrete`, `/asphalt`, `/gravel`
  3. The primary calculators (`concrete-calculator`, `asphalt-calculator`,
     `gravel-calculator`, `pea-gravel-calculator`, etc.)
- Manual requests are rate-limited (~10–15/day) — spend them on money pages, let the
  sitemap carry the long-tail guides.

### On-page SEO already handled by the framework (verify, don't rebuild)
- `buildMetadata()` → unique title/description, canonical, OG/Twitter per page.
- `<JsonLd>` → Organization + WebSite (layout), plus Breadcrumb, FAQPage, Article,
  WebApplication (calculator), HowTo schemas per page.
- Per-slug layout variation so no two pages are near-duplicates.
- Internal linking via `RelatedArticles` + in-prose links (topical clusters).

### Confirm in GSC over the first 2–4 weeks
- **Coverage / Pages** report: watch *Indexed* climb; investigate any *Excluded* /
  *Crawled – not indexed* / *Discovered – not indexed*.
- **Enhancements**: Breadcrumbs, FAQ, and Merchant/other rich-result reports should show
  valid items (from the JSON-LD). Fix any flagged errors.
- **Core Web Vitals** & **Mobile Usability**: should pass green (Next.js + next/image).
- **Sitemaps**: discovered = submitted, no fetch errors.

### Ongoing (monthly)
- **Performance** report: track impressions, clicks, avg position by query and page.
- Find pages ranking positions 5–20 → strengthen content + internal links to push to
  page 1 ("striking distance" optimization).
- Add internal links from high-authority pages to newer/weaker pages.
- Expand topical clusters (the phase-2 gravel pages, then sand / rebar / brick categories).

---

## 8. Quick checklist

- [ ] `www` → non-www 301 redirect confirmed
- [ ] Domain property verified in GSC
- [ ] `sitemap.xml` submitted, status Success
- [ ] Home + hubs + core calculators → Request Indexing
- [ ] Coverage report clean after ~1 week
- [ ] Rich-result (FAQ / Breadcrumb) enhancements valid
- [ ] Core Web Vitals passing
- [ ] Phase-2 pages plan documented (§6) for next week