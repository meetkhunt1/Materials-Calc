/**
 * Central site configuration. Every SEO utility, layout component and
 * JSON-LD builder reads from here so a single edit propagates everywhere.
 */
export const siteConfig = {
  name: "MaterialsCalc",
  shortName: "MaterialsCalc",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://materialscalc.com",
  description:
    "Free construction material calculators, density charts, cost guides and coverage tables — concrete, asphalt, gravel, sand and more.",
  locale: "en_US",
  twitterHandle: "@materialscalc",
  organization: {
    name: "MaterialsCalc",
    logo: "/logo.png",
  },
  /** Default social sharing image */
  ogImage: "/og-default.png",
} as const;

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Canonical page URL — always trailing-slash-terminated to match
 * next.config.ts's `trailingSlash: true`, so it never 301-redirects.
 * Use this (not `absoluteUrl`) for any URL that points at an app route
 * (canonical tags, JSON-LD `url`/`@id`/breadcrumb links). Keep using
 * `absoluteUrl` for static assets (images, sitemap.xml) which aren't
 * subject to trailing-slash routing. Preserves an optional #fragment.
 */
export function canonicalUrl(path: string): string {
  const [pathname, hash] = path.split("#");
  const base = absoluteUrl(pathname || "/");
  const withSlash = base.endsWith("/") ? base : `${base}/`;
  return hash ? `${withSlash}#${hash}` : withSlash;
}
