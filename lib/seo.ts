import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Site-relative path beginning with "/" — canonical is derived from it */
  path: string;
  /** Social image path or absolute URL. Falls back to the site default. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * One call builds the complete Metadata object for any page:
 * title template, description, canonical, Open Graph, Twitter card and robots.
 *
 *   export const metadata = buildMetadata({
 *     title: "Concrete Calculator",
 *     description: "…",
 *     path: "/concrete/concrete-calculator",
 *   });
 */
export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    image,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    keywords,
    noIndex,
  } = options;

  const url = absoluteUrl(path);
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl(siteConfig.ogImage);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

/** Root-layout defaults — merged by Next with per-page metadata. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Construction Material Calculators`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false },
};
