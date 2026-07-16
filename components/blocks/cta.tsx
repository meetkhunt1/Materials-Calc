import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaProps {
  title: string;
  description?: string;
  href: string;
  buttonLabel?: string;
  /** "banner" = full-width strip, "card" = boxed, "inline" = one-liner in prose */
  variant?: "banner" | "card" | "inline";
  className?: string;
}

/**
 * Internal CTA driving readers to a calculator or related guide.
 * Three variants keep repeated CTAs from looking templated.
 */
export function Cta({
  title,
  description,
  href,
  buttonLabel = "Open calculator",
  variant = "card",
  className,
}: CtaProps) {
  if (variant === "inline") {
    return (
      <p className={cn("text-sm", className)}>
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
        >
          <Calculator className="size-4" />
          {title}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </p>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "flex flex-col items-start justify-between gap-4 rounded-xl bg-primary px-6 py-6 text-primary-foreground sm:flex-row sm:items-center sm:px-8",
          className,
        )}
      >
        <div>
          <p className="text-lg font-semibold">{title}</p>
          {description && <p className="mt-1 text-sm text-primary-foreground/85">{description}</p>}
        </div>
        <Button
          asChild
          size="lg"
          className="shrink-0 bg-white text-primary hover:bg-white/90"
        >
          <Link href={href}>
            {buttonLabel}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-xl border-2 border-primary/20 bg-primary-soft/50 p-6",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-primary">
        <Calculator className="size-5" />
        <p className="font-semibold text-foreground">{title}</p>
      </div>
      {description && <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>}
      <Button asChild>
        <Link href={href}>
          {buttonLabel}
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
