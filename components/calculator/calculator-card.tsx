"use client";

import * as React from "react";
import { Calculator as CalculatorIcon } from "lucide-react";
import type { CalculatorDefinition } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalculatorField } from "@/components/calculator/calculator-field";
import { CalculatorResults } from "@/components/calculator/calculator-results";
import { CalculatorActions } from "@/components/calculator/calculator-actions";
import { useCalculator } from "@/hooks/use-calculator";
import { cn } from "@/lib/utils";

interface CalculatorCardProps {
  definition: CalculatorDefinition;
  /** "card" = bordered card (default), "plain" = borderless for custom shells */
  variant?: "card" | "plain";
  /** Two-column field grid on wider screens (good for many fields) */
  columns?: 1 | 2;
  className?: string;
}

/**
 * The complete interactive calculator: fields → validate → results → actions.
 * Drop it on any page with just a CalculatorDefinition:
 *
 *   <CalculatorCard definition={concreteSlabCalculator} />
 */
export function CalculatorCard({
  definition,
  variant = "card",
  columns = 1,
  className,
}: CalculatorCardProps) {
  const calc = useCalculator(definition);

  const body = (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        calc.calculate();
      }}
      className="space-y-5"
    >
      <div className={cn("grid gap-4", columns === 2 && "sm:grid-cols-2")}>
        {definition.fields.map((field) => (
          <CalculatorField
            key={field.id}
            field={field}
            value={calc.values[field.id]}
            error={calc.submitted ? calc.errorFor(field.id) : undefined}
            onValueChange={(v) => calc.setValue(field.id, v)}
            onUnitChange={(u) => calc.setUnit(field.id, u)}
          />
        ))}
      </div>

      <Button type="submit" size="lg" className="w-full">
        <CalculatorIcon />
        Calculate
      </Button>

      {calc.results && calc.results.length > 0 && (
        <>
          <Separator />
          <CalculatorResults results={calc.results} disclaimer={definition.disclaimer} />
        </>
      )}

      <CalculatorActions
        getText={calc.asText}
        shareTitle={definition.name}
        onReset={calc.reset}
        hasResults={Boolean(calc.results && calc.results.length > 0)}
      />
    </form>
  );

  if (variant === "plain") {
    return <div className={className}>{body}</div>;
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b bg-muted/40">
        <CardTitle className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CalculatorIcon className="size-4" />
          </span>
          {definition.name}
        </CardTitle>
        {definition.description && (
          <CardDescription>{definition.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-6">{body}</CardContent>
    </Card>
  );
}
