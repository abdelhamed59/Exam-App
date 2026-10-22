import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/shared/lib/tailwind-merge";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // Color & Border
        "dark:bg-input/30 dark:disabled:bg-input/80 border border-gray-200 bg-white text-gray-800 transition-colors hover:border-blue-600",

        // Size & Spacing
        "h-11.5 w-full min-w-0 px-2.5 py-1",

        // Typography
        "file:text-foreground text-base file:text-sm file:font-medium placeholder:text-gray-400 md:text-sm",

        // Focus
        "outline-none focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-100",

        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400",

        // Invalid
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-2",
        "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",

        // File input specific
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
