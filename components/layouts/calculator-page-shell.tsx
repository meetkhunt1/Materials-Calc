import * as React from "react";
import { Container } from "@/components/layout/container";
import type { CalculatorLayoutVariant } from "@/lib/variation";
import { cn } from "@/lib/utils";

interface CalculatorPageShellProps {
  /**
   * Which structural layout to use. Pages should derive it from their slug:
   *   const variant = pick(slug, CALCULATOR_LAYOUTS);
   * so every calculator page gets a stable but different structure.
   */
  variant: CalculatorLayoutVariant;
  /** Hero / title area — rendered full-width above everything */
  hero: React.ReactNode;
  /** The <CalculatorCard> (or a custom calculator composition) */
  calculator: React.ReactNode;
  /** Long-form supporting content: sections, tables, examples, FAQ */
  children: React.ReactNode;
  /** Optional sidebar content (TOC, related links). Placement depends on variant. */
  aside?: React.ReactNode;
  /** Optional block shown between hero and calculator in "hero-flow" (e.g. FormulaBlock) */
  preCalculator?: React.ReactNode;
  className?: string;
}

/**
 * Three structurally different calculator page layouts:
 *
 *  "split"     — calculator pinned left, content scrolls right (app-like)
 *  "hero-flow" — hero → formula → centered calculator → guide (editorial)
 *  "sidebar"   — article left, sticky calculator + aside right (docs-like)
 *
 * Using different variants across pages guarantees no two calculator
 * pages share an identical skeleton.
 */
export function CalculatorPageShell({
  variant,
  hero,
  calculator,
  children,
  aside,
  preCalculator,
  className,
}: CalculatorPageShellProps) {
  if (variant === "split") {
    return (
      <div className={className}>
        {hero}
        <Container className="py-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(360px,420px)_1fr] lg:gap-12">
            <div>
              <div className="lg:sticky lg:top-24">
                {calculator}
                {aside && <div className="mt-8 hidden lg:block">{aside}</div>}
              </div>
            </div>
            <div className="min-w-0 space-y-12">{children}</div>
          </div>
        </Container>
      </div>
    );
  }

  if (variant === "hero-flow") {
    return (
      <div className={className}>
        {hero}
        <Container size="narrow" className="py-10">
          {preCalculator && <div className="mb-8">{preCalculator}</div>}
          {calculator}
        </Container>
        <Container className="pb-10">
          <div
            className={cn(
              "grid gap-12",
              aside && "lg:grid-cols-[1fr_240px]",
            )}
          >
            <div className="min-w-0 max-w-3xl space-y-12">{children}</div>
            {aside && <aside className="hidden lg:block">{aside}</aside>}
          </div>
        </Container>
      </div>
    );
  }

  // "sidebar"
  return (
    <div className={className}>
      {hero}
      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(340px,400px)] lg:gap-12">
          <div className="order-2 min-w-0 space-y-12 lg:order-1">{children}</div>
          <div className="order-1 lg:order-2">
            <div className="space-y-8 lg:sticky lg:top-24">
              {calculator}
              {aside && <div className="hidden lg:block">{aside}</div>}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
