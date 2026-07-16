import * as React from "react";
import type { FaqItem } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/jsonld";
import { slugify } from "@/lib/format";
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
        <Accordion type="single" collapsible className="mt-4 rounded-xl border px-5">
          {items.map((item) => (
            <AccordionItem key={item.question} value={slugify(item.question)}>
              <AccordionTrigger className="text-[15px]">{item.question}</AccordionTrigger>
              <AccordionContent className="leading-relaxed">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
