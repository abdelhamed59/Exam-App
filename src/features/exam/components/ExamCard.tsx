import { CircleQuestionMark, Clock, MoveRight } from "lucide-react";
import type { IExam } from "../types/exam";
import { Button } from "@/components/ui/button/button";
import { useNavigate } from "react-router";

interface IExamCardProps {
  exam: IExam;
}

export default function ExamCard({ exam }: IExamCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full gap-4 bg-blue-50 p-4 sm:flex-row sm:items-center">
      <div className="shrink-0 self-start border border-blue-300 bg-blue-100 px-2">
        {exam.image ? (
          <img
            src={exam.image}
            alt={exam.title}
            className="size-18.5 object-contain"
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <h3 className="min-w-0  font-mono text-xl font-semibold text-blue-600">
            {exam.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="flex items-center gap-1.5 font-mono text-sm font-normal text-gray-800">
              <CircleQuestionMark size={18} />
              {exam.questionsCount} Questions
            </span>
            <span className="flex items-center gap-1.5 font-mono text-sm font-normal text-gray-800 sm:border-l sm:border-gray-300 sm:pl-3">
              <Clock size={18} />
              {exam.duration} mins
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-1 line-clamp-4 font-mono text-sm font-normal text-gray-500">
          {exam.description}
        </p>

        {/* Start button */}
        <div className="mt-auto flex justify-end pt-2">
          <Button
            onClick={() =>
              navigate(`/questions/exam/${exam.id}`, {
                state: {
                  diplomaTitle: exam.diploma.title,
                  examTitle: exam.title,
                  diplomaId: exam.diplomaId,
                  duration: exam.duration,
                },
              })
            }
            size="sm"
              disabled={exam.questionsCount === 0}
            className="gap-2.5 px-4 py-2 font-mono"
          >
            START <MoveRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
