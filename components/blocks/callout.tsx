import * as React from "react";
import {
  AlertTriangle,
  Lightbulb,
  Info,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutTone = "warning" | "tip" | "info" | "success";

const toneConfig: Record<
  CalloutTone,
  { icon: LucideIcon; box: string; iconColor: string; defaultTitle: string }
> = {
  warning: {
    icon: AlertTriangle,
    box: "border-warning/30 bg-warning/5",
    iconColor: "text-warning",
    defaultTitle: "Warning",
  },
  tip: {
    icon: Lightbulb,
    box: "border-primary/25 bg-primary-soft/60",
    iconColor: "text-primary",
    defaultTitle: "Pro tip",
  },
  info: {
    icon: Info,
    box: "border-info/25 bg-info/5",
    iconColor: "text-info",
    defaultTitle: "Good to know",
  },
  success: {
    icon: CircleCheck,
    box: "border-success/25 bg-success/5",
    iconColor: "text-success",
    defaultTitle: "Best practice",
  },
};

interface CalloutProps {
  tone: CalloutTone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/** Base callout. Prefer the named exports for readable page code. */
export function Callout({ tone, title, children, className }: CalloutProps) {
  const config = toneConfig[tone];
  const Icon = config.icon;

  return (
    <aside role="note" className={cn("rounded-xl border p-4 sm:p-5", config.box, className)}>
      <div className="flex gap-3">
        <Icon className={cn("mt-0.5 size-5 shrink-0", config.iconColor)} aria-hidden />
        <div className="min-w-0 text-sm leading-relaxed">
          <p className="mb-1 font-semibold">{title ?? config.defaultTitle}</p>
          <div className="text-muted-foreground [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

type NamedCalloutProps = Omit<CalloutProps, "tone">;

export const WarningBlock = (props: NamedCalloutProps) => <Callout tone="warning" {...props} />;
export const TipBlock = (props: NamedCalloutProps) => <Callout tone="tip" {...props} />;
export const InfoBlock = (props: NamedCalloutProps) => <Callout tone="info" {...props} />;
export const SuccessBlock = (props: NamedCalloutProps) => <Callout tone="success" {...props} />;
