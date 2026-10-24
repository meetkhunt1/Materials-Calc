import * as React from "react";
import type { FaqItem } from "@/types";
import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/jsonld";
import { cn } from "@/lib/utils";

interface FaqProps {
  items: FaqItem[];
  title?: string;
  /** Emit FAQPage JSON-LD (default true). Set false when a page has two FAQ blocks. */
  withSchema?: boolean;
  /** "accordion" (default) or always-open "list" for shorter FAQs */
  variant?: "accordion" | "list";
  id?: string;
  className?: string;
}

/**
 * FAQ block with automatic FAQPage structured data.
 * Two visual variants so FAQ sections vary across pages.
 */
export function Faq({
  items,
  title = "Frequently asked questions",
  withSchema = true,
  variant = "accordion",
  id = "faq",
  className,
}: FaqProps) {
  if (items.length === 0) return null;

  return (
    <section id={id} className={cn("scroll-mt-24", className)} aria-label={title}>
      {withSchema && <JsonLd data={faqSchema(items)} />}
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>

      {variant === "accordion" ? (
        // Native <details>: answers ship in the static HTML (crawlers and AI
        // answer engines read them without JS) and toggling needs no client code.
        <div className="mt-4 rounded-xl border px-5">
          {items.map((item) => (
            <details key={item.question} className="group border-b last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[15px] font-medium transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      ) : (
        <dl className="mt-6 space-y-6">
          {items.map((item) => (
            <div key={item.question} className="rounded-xl border p-5">
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
