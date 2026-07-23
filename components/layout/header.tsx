import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SiteSearch } from "@/components/layout/site-search";
import { MobileNav } from "@/components/layout/mobile-nav";
import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/site";

/** Sticky site header: logo, category nav, search, mobile menu. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={436}
            height={90}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {categories.map((category) =>
            category.comingSoon ? (
              <span
                key={category.slug}
                className="cursor-default rounded-lg px-3 py-2 text-sm text-muted-foreground/60"
                title="Coming soon"
              >
                {category.name}
              </span>
            ) : (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {category.name}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <SiteSearch />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
