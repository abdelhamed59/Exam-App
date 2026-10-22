import { cn } from "@/shared/lib/tailwind-merge";

export default function Heading({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("font-inter text-3xl font-bold", className)} {...props} />;
}
