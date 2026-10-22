import { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  Chart as ChartJS,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExamTimerProps {
  duration: number; 
  onTimeEnd?: () => void;
}

export default function ExamTimer({
  duration,
  onTimeEnd,
}: ExamTimerProps) {
  const totalSeconds = duration * 60;

  const [remainingSeconds, setRemainingSeconds] =useState(totalSeconds);



  useEffect(() => {
    if (remainingSeconds <= 0) {
      onTimeEnd?.();
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeEnd?.();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds, onTimeEnd]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  const data = useMemo(
    () => ({
      datasets: [
        {
          data: [
            remainingSeconds,
            Math.max(totalSeconds - remainingSeconds, 0),
          ],
          backgroundColor: ["#2563EB", "#DBEAFE"],
          borderWidth: 0,
          hoverOffset: 0,
        },
      ],
    }),
    [remainingSeconds, totalSeconds],
  );

  return (
    <div className="relative size-16.25 shrink-0">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          rotation: 0,
          circumference: 360,
          animation: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        }}
      />

      {/* Center time */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[10px] font-medium text-gray-800">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}