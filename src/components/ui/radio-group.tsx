import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/shared/lib/tailwind-merge";

function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        `
        group/radio-group-item
        peer
        relative
        flex
        aspect-square
        size-4
        shrink-0
        rounded-full
        border-2
        border-gray-300
        outline-none
        after:absolute
        after:-inset-x-3
        after:-inset-y-2
        focus-visible:border-ring
        focus-visible:ring-3
        focus-visible:ring-ring/50
        disabled:cursor-not-allowed
        disabled:opacity-100
        [&_[data-slot="radio-group-indicator"]]:size-full
        [&_[data-slot="radio-group-indicator"]>span]:absolute
        [&_[data-slot="radio-group-indicator"]>span]:top-1/2
        [&_[data-slot="radio-group-indicator"]>span]:left-1/2
        [&_[data-slot="radio-group-indicator"]>span]:size-2.5
        [&_[data-slot="radio-group-indicator"]>span]:-translate-x-1/2
        [&_[data-slot="radio-group-indicator"]>span]:-translate-y-1/2
        [&_[data-slot="radio-group-indicator"]>span]:rounded-full
        [&_[data-slot="radio-group-indicator"]>span]:bg-transparent
        data-checked:[&_[data-slot="radio-group-indicator"]>span]:bg-current
        `,
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-full items-center justify-center"
      >
        <span />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };