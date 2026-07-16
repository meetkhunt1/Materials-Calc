import Image from "next/image";
import Link from "next/link";
import { UserRound, CalendarDays, RefreshCw } from "lucide-react";
import type { Author } from "@/types";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AuthorBoxProps {
  author: Author;
  datePublished?: string;
  dateModified?: string;
  variant?: "card" | "inline";
  className?: string;
}

/**
 * Author attribution. `card` renders a full bio box (article footer);
 * `inline` renders a compact byline (under the page title).
 */
export function AuthorBox({
  author,
  datePublished,
  dateModified,
  variant = "card",
  className,
}: AuthorBoxProps) {
  const avatar = author.avatar ? (
    <Image
      src={author.avatar}
      alt={author.name}
      width={variant === "card" ? 56 : 36}
      height={variant === "card" ? 56 : 36}
      className="rounded-full border object-cover"
    />
  ) : (
    <span
      className={cn(
        "flex items-center justify-center rounded-full bg-primary-soft text-primary-soft-foreground",
        variant === "card" ? "size-14" : "size-9",
      )}
    >
      <UserRound className={variant === "card" ? "size-6" : "size-4"} />
    </span>
  );

  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2 text-sm", className)}>
        <span className="flex items-center gap-2">
          {avatar}
          <span>
            <span className="block font-medium leading-tight">{author.name}</span>
            <span className="block text-xs text-muted-foreground">{author.role}</span>
          </span>
        </span>
        {datePublished && (
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {formatDate(datePublished)}
          </span>
        )}
        {dateModified && dateModified !== datePublished && (
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <RefreshCw className="size-3.5" />
            Updated {formatDate(dateModified)}
          </span>
        )}
      </div>
    );
  }

  return (
    <aside
      aria-label="About the author"
      className={cn("rounded-xl border bg-muted/40 p-6", className)}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {avatar}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Written by
          </p>
          <p className="mt-0.5 font-semibold">
            {author.url ? (
              <Link href={author.url} className="hover:text-primary">
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </p>
          <p className="text-sm text-muted-foreground">{author.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
          {(datePublished || dateModified) && (
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {datePublished && <span>Published {formatDate(datePublished)}</span>}
              {dateModified && dateModified !== datePublished && (
                <span>Last updated {formatDate(dateModified)}</span>
              )}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
