"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { categories } from "@/data/categories";
import { Badge } from "@/components/ui/badge";

/** Hamburger menu for small screens. */
export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-9 items-center justify-center rounded-xl border bg-background shadow-sm transition-colors hover:bg-muted md:hidden"
        >
          <Menu className="size-4" />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 md:hidden" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 w-72 border-l bg-background p-6 shadow-lg md:hidden">
          <DialogPrimitive.Title className="sr-only">Navigation</DialogPrimitive.Title>
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Categories
            </span>
            <DialogPrimitive.Close
              aria-label="Close menu"
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {categories.map((category) =>
              category.comingSoon ? (
                <span
                  key={category.slug}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted-foreground/60"
                >
                  {category.name}
                  <Badge variant="secondary">Soon</Badge>
                </span>
              ) : (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  {category.name}
                </Link>
              ),
            )}
          </nav>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
