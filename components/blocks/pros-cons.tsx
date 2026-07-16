import { ThumbsUp, ThumbsDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProsConsProps {
  pros: string[];
  cons: string[];
  /** Optional subject, e.g. "Ready-mix concrete" — used in the column headers */
  subject?: string;
  className?: string;
}

/** Side-by-side pros & cons — used heavily on comparison pages. */
export function ProsCons({ pros, cons, subject, className }: ProsConsProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      <div className="rounded-xl border border-success/25 bg-success/5 p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-success">
          <ThumbsUp className="size-4" />
          {subject ? `${subject}: Pros` : "Pros"}
        </h3>
        <ul className="mt-3 space-y-2.5">
          {pros.map((pro) => (
            <li key={pro} className="flex gap-2.5 text-sm leading-relaxed">
              <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
              <span className="text-muted-foreground">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-destructive/25 bg-destructive/5 p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-destructive">
          <ThumbsDown className="size-4" />
          {subject ? `${subject}: Cons` : "Cons"}
        </h3>
        <ul className="mt-3 space-y-2.5">
          {cons.map((con) => (
            <li key={con} className="flex gap-2.5 text-sm leading-relaxed">
              <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
              <span className="text-muted-foreground">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
