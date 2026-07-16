import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
  as?: "div" | "section" | "article" | "main";
}

/** Consistent page gutter + max-width. `narrow` for prose, `wide` for dashboards. */
export function Container({
  size = "default",
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "default" && "max-w-6xl",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
      {...props}
    />
  );
}
