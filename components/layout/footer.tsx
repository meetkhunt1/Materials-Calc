import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/site";

const legalLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-muted/40">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center" aria-label={`${siteConfig.name} home`}>
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={436}
                height={90}
                className="h-7 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Accurate, free construction material calculators and estimating
              guides for contractors and homeowners.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories.map((category) => (
                <li key={category.slug}>
                  {category.comingSoon ? (
                    <span className="cursor-default text-muted-foreground/60">
                      {category.name} <span className="text-xs">(soon)</span>
                    </span>
                  ) : (
                    <Link
                      href={`/${category.slug}`}
                      className="transition-colors hover:text-foreground"
                    >
                      {category.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Disclaimer</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Estimates are for planning purposes only. Always confirm
              quantities with your supplier before ordering materials.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built for accuracy. Checked against industry standards.</p>
        </div>
      </Container>
    </footer>
  );
}
