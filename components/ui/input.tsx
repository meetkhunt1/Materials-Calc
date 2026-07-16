import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm shadow-sm transition-colors",
          "placeholder:text-muted-foreground",
          "focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:outline-destructive/30",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
