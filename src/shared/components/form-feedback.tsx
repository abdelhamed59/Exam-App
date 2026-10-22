import React from "react";
import { cn } from "../lib/tailwind-merge";
import { CircleX } from "lucide-react";

interface FormFeedbackProps extends React.HTMLAttributes<HTMLDivElement> {
  errors?: (string | undefined)[];
}

export default function FormFeedback({ className, children, errors, ...props }: FormFeedbackProps) {
  const messages = (errors?.filter(Boolean) as string[]) ?? [];

  const content =
    children ??
    (messages.length === 0 ? null : messages.length === 1 ? (
      messages[0]
    ) : (
      <ul className="ml-4 list-disc space-y-0.5 text-left">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    ));

  if (!content) return null;

  return (
    <div
      className={cn(
        "relative flex min-h-9.5 items-center justify-center border border-red-600 bg-red-50 px-6 py-2 text-sm text-red-500",
        className,
      )}
      {...props}
    >
      {/* Icon */}
      <CircleX size={18} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

      {/* Message(s) */}
      {content}
    </div>
  );
}