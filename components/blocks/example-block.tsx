import * as React from "react";
import { PencilRuler } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExampleStep {
  label: string;
  /** The worked math, e.g. "12 ft × 10 ft × 0.33 ft = 39.6 ft³" */
  work: string;
}

interface ExampleBlockProps {
  title?: string;
  /** Scenario sentence, e.g. "A 12×10 ft patio poured 4 inches thick." */
  scenario: string;
  steps: ExampleStep[];
  /** Final answer, highlighted */
  result: string;
  className?: string;
}

/** Worked example with numbered steps and a highlighted result. */
export function ExampleBlock({
  title = "Worked example",
  scenario,
  steps,
  result,
  className,
}: ExampleBlockProps) {
  return (
    <figure className={cn("overflow-hidden rounded-xl border", className)}>
      <figcaption className="flex items-center gap-2 border-b bg-muted/60 px-5 py-3">
        <PencilRuler className="size-4 text-primary" aria-hidden />
        <span className="text-sm font-semibold">{title}</span>
      </figcaption>
      <div className="space-y-4 px-5 py-5">
        <p className="text-sm leading-relaxed text-muted-foreground">{scenario}</p>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-3 text-sm">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary-soft-foreground">
                {index + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="font-medium">{step.label}</p>
                <p className="mt-0.5 overflow-x-auto font-mono text-[13px] text-muted-foreground">
                  {step.work}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="rounded-lg bg-primary-soft px-4 py-3 text-sm font-semibold text-primary-soft-foreground">
          Result: {result}
        </p>
      </div>
    </figure>
  );
}
