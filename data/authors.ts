import type { Author } from "@/types";

/**
 * Site authors. Content pages reference authors by slug so bios stay
 * consistent everywhere and Article JSON-LD is always complete.
 */
export const authors: Record<string, Author> = {
  "materials-team": {
    slug: "materials-team",
    name: "MaterialsCalc Editorial Team",
    role: "Construction Estimating Editors",
    bio: "Our editorial team combines hands-on construction experience with careful research. Every calculator and guide is checked against industry standards and supplier data before publishing.",
    avatar: "/authors/materials-team.jpg",
    url: "/about",
  },
};

export function getAuthor(slug: string): Author {
  const author = authors[slug];
  if (!author) throw new Error(`Unknown author: ${slug}`);
  return author;
}
