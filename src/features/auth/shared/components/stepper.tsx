interface StepperProps {
  step: number;
  totalSteps: number;
  fullWidth?: boolean;
}

export default function Stepper({
  step,
  totalSteps,
  fullWidth = false,
}: StepperProps) {
  const items = Array.from(
    { length: totalSteps },
    (_, i) => i + 1
  );

  return (
    <div className={`flex items-center ${fullWidth ? "w-full" : ""}`}>
      {items.map((s, i) => {
        const isDone = s < step;
        const isActive = s === step;
        const filled = isDone || isActive;

        return (
          <div
            key={s}
            className={`flex items-center ${
              fullWidth && i < items.length - 1 ? "flex-1" : ""
            }`}
          >
            <span
              className={`size-2.5 shrink-0 rotate-45 ${
                filled
                  ? "bg-blue-600"
                  : "border border-blue-300 bg-white"
              }`}
            />

            {i < items.length - 1 && (
              <span
                className={`mx-1 h-px ${
                  fullWidth ? "flex-1" : "w-14"
                } ${
                  isDone
                    ? "bg-blue-600"
                    : "border-t border-dashed border-blue-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
