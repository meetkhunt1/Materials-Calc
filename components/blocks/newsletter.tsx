"use client";

import * as React from "react";
import { Mail, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Newsletter signup. Wire the onSubmit to a real provider (ConvertKit,
 * Mailchimp, Resend) later — the component validates and gives UI feedback now.
 */
export function Newsletter({
  title = "Get new calculators first",
  description = "One short email when we launch new tools and cost guides. No spam, ever.",
  className,
}: NewsletterProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "error" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    // TODO: POST to your email provider endpoint here.
    setStatus("done");
  };

  return (
    <div className={cn("rounded-xl border bg-muted/40 p-6 sm:p-8", className)}>
      <div className="mx-auto max-w-md text-center">
        <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Mail className="size-5" />
        </span>
        <h2 className="mt-3 text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>

        {status === "done" ? (
          <p className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-success">
            <CircleCheck className="size-4" />
            You&apos;re on the list — thanks for subscribing!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-invalid={status === "error"}
              className="flex-1 bg-background"
            />
            <Button type="submit" className="shrink-0">
              Subscribe
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-xs text-destructive">Please enter a valid email address.</p>
        )}
      </div>
    </div>
  );
}
