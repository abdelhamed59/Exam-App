import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  Chart as ChartJS,
  Tooltip,
  Legend,
} from "chart.js";
import { Square } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AnswerProps {
  correctAnswer: number;
  wrongAnswer: number;
}

export default function ResultCharts({
  correctAnswer,
  wrongAnswer,
}: AnswerProps) {
  const data = useMemo(
    () => ({
      labels: ["Correct", "Wrong"],
      datasets: [
        {
          data: [correctAnswer, wrongAnswer],
          backgroundColor: ["#00BC7D", "#EF4444"],
          borderWidth: 0,
          hoverOffset: 0,
        },
      ],
    }),
    [correctAnswer, wrongAnswer],
  );

  return (
    <div className="flex bg-blue-50 justify-items-center items-center flex-col gap-6 border border-blue-200 p-4 sm:p-9">
      {/* Chart */}
      <div className="relative mx-auto aspect-square w-full max-w-50.75">
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "60%",
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
      </div>

      <div className="flex flex-col gap-3">
        {/* Correct */}
        <div className="flex items-center gap-2">
          <Square
            size={16}
            fill="#00BC7D"
            color="#00BC7D"
          />
          <span  className="font-mono font-medium text-sm text-black">
            Correct: {correctAnswer}
          </span>
        </div>
        {/* Wrong */}
        <div className="flex items-center gap-2">
          <Square
            size={16}
            fill="#EF4444"
            color="#EF4444"
          />

          <span className="font-mono font-medium text-sm text-black">
            Incorrect: {wrongAnswer}
          </span>
        </div>

      </div>
    </div>
  );
}