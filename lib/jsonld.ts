import type { ArticleMeta, Author, BreadcrumbItem, FaqItem } from "@/types";
import { absoluteUrl, canonicalUrl, siteConfig } from "@/lib/site";

/**
 * JSON-LD builders. Each returns a plain object ready for <JsonLd data={…} />.
 * Multiple schemas on one page should share the page URL as @id anchors.
 */

type Schema = Record<string, unknown>;

// Actual dimensions of the static assets referenced below — keep in sync if
// public/logo.png or public/og-default.png are replaced.
const LOGO_DIMENSIONS = { width: 436, height: 90 };
const OG_IMAGE_DIMENSIONS = { width: 1200, height: 630 };

export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": canonicalUrl("/#organization"),
    name: siteConfig.organization.name,
    url: canonicalUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.organization.logo),
      ...LOGO_DIMENSIONS,
    },
  };
}

export function websiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": canonicalUrl("/#website"),
    name: siteConfig.name,
    url: canonicalUrl("/"),
    publisher: { "@id": canonicalUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${canonicalUrl("/search")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: canonicalUrl(item.href),
    })),
  };
}

export function faqSchema(items: FaqItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function personSchema(author: Author): Schema {
  return {
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    ...(author.url && { url: canonicalUrl(author.url) }),
    ...(author.sameAs?.length && { sameAs: author.sameAs }),
    ...(author.knowsAbout?.length && { knowsAbout: author.knowsAbout }),
  };
}

export function articleSchema(meta: ArticleMeta): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": canonicalUrl(`${meta.path}#article`),
    headline: meta.title,
    description: meta.description,
    url: canonicalUrl(meta.path),
    inLanguage: "en-US",
    isAccessibleForFree: true,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified ?? meta.datePublished,
    author: personSchema(meta.author),
    publisher: { "@id": canonicalUrl("/#organization") },
    mainEntityOfPage: canonicalUrl(meta.path),
    // "h1" is present on every article; ".quick-answer" only matches on pages
    // that include <QuickAnswer> — harmless no-op on the rest.
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".quick-answer"] },
    ...(meta.image && { image: absoluteUrl(meta.image) }),
    ...(meta.keywords?.length && { keywords: meta.keywords.join(", ") }),
  };
}

export function webPageSchema(options: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonicalUrl(`${options.path}#webpage`),
    name: options.title,
    description: options.description,
    url: canonicalUrl(options.path),
    inLanguage: "en-US",
    isPartOf: { "@id": canonicalUrl("/#website") },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.ogImage),
      ...OG_IMAGE_DIMENSIONS,
    },
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
    ...((options.dateModified ?? options.datePublished) && {
      lastReviewed: options.dateModified ?? options.datePublished,
    }),
  };
}

const DEFAULT_CALCULATOR_FEATURES = [
  "Imperial and metric unit conversion",
  "Instant material volume and weight calculation",
  "Waste factor allowance",
  "Bag count and bulk ready-mix breakdown",
  "Printable and shareable estimate",
];

/** Schema for interactive calculator pages (WebApplication). */
export function calculatorSchema(options: {
  name: string;
  description: string;
  path: string;
  /** Override the default feature list where a calculator's capabilities differ. */
  features?: string[];
}): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": canonicalUrl(`${options.path}#calculator`),
    name: options.name,
    description: options.description,
    url: canonicalUrl(options.path),
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Construction Material Calculator",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Modern browser.",
    featureList: options.features ?? DEFAULT_CALCULATOR_FEATURES,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: { "@id": canonicalUrl("/#organization") },
  };
}

export function howToSchema(options: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
  totalTime?: string; // ISO 8601 duration, e.g. "PT15M"
  /** Materials consumed by the project, e.g. "Ready-mix concrete or bagged mix". */
  supplies?: string[];
  /** Equipment used but not consumed, e.g. "Tape measure". */
  tools?: string[];
  /**
   * Only set this when the page also renders a matching `id={`step-${n}`}`
   * on each visible step — otherwise the deep link points at nothing.
   */
  deepLinkSteps?: boolean;
}): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": canonicalUrl(`${options.path}#howto`),
    name: options.name,
    description: options.description,
    url: canonicalUrl(options.path),
    ...(options.totalTime && { totalTime: options.totalTime }),
    ...(options.supplies?.length && {
      supply: options.supplies.map((name) => ({ "@type": "HowToSupply", name })),
    }),
    ...(options.tools?.length && {
      tool: options.tools.map((name) => ({ "@type": "HowToTool", name })),
    }),
    step: options.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(options.deepLinkSteps && { url: `${canonicalUrl(options.path)}#step-${index + 1}` }),
    })),
  };
}
