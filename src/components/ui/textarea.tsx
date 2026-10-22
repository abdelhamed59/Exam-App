import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "dark:bg-input/30 dark:disabled:bg-input/80  w-full resize-y border border-gray-200 bg-white px-2.5 py-2 text-base text-gray-800 transition-colors hover:border-blue-600 md:text-sm",
        "placeholder:text-gray-400",
        "outline-none focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-100",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
