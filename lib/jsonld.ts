import type { ArticleMeta, Author, BreadcrumbItem, FaqItem } from "@/types";
import { absoluteUrl, siteConfig } from "@/lib/site";

/**
 * JSON-LD builders. Each returns a plain object ready for <JsonLd data={…} />.
 * Multiple schemas on one page should share the page URL as @id anchors.
 */

type Schema = Record<string, unknown>;

export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.organization.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.organization.logo),
  };
}

export function websiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": absoluteUrl("/#organization") },
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
      item: absoluteUrl(item.href),
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
    ...(author.url && { url: absoluteUrl(author.url) }),
    ...(author.sameAs?.length && { sameAs: author.sameAs }),
  };
}

export function articleSchema(meta: ArticleMeta): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": absoluteUrl(`${meta.path}#article`),
    headline: meta.title,
    description: meta.description,
    url: absoluteUrl(meta.path),
    datePublished: meta.datePublished,
    dateModified: meta.dateModified ?? meta.datePublished,
    author: personSchema(meta.author),
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(meta.path),
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
    "@id": absoluteUrl(`${options.path}#webpage`),
    name: options.title,
    description: options.description,
    url: absoluteUrl(options.path),
    isPartOf: { "@id": absoluteUrl("/#website") },
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
  };
}

/** Schema for interactive calculator pages (WebApplication). */
export function calculatorSchema(options: {
  name: string;
  description: string;
  path: string;
}): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": absoluteUrl(`${options.path}#calculator`),
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function howToSchema(options: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
  totalTime?: string; // ISO 8601 duration, e.g. "PT15M"
}): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    ...(options.totalTime && { totalTime: options.totalTime }),
    step: options.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
