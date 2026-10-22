
import { useLocation, useNavigate, useParams } from "react-router";
import {
  CircleQuestionMark,
  RotateCcw,
  FolderOpen,
} from "lucide-react";

import ResultCharts from "./ResultChart";
import { useSubmission } from "../../apis/submission/queries/use-submission";
import PageHeader from "@/shared/components/page-header/page-header";
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

export default function SubmissionPage() {
  const navigate=useNavigate()
  const { submissionId = "" } = useParams<{
    submissionId: string;
  }>();

  const location = useLocation();

  // ================================
  // Navigation State
  // ================================

  const navState = location.state as {
    diplomaTitle?: string;
    diplomaId?: string;
  } | null;

  // ================================
  // API
  // ================================

  const {
    data,
    isPending,
    isError,
    error,
  } = useSubmission(submissionId);

  // ================================
  // Loading
  // ================================

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-mono text-gray-500">
          Loading result...
        </p>
      </div>
    );
  }

  // ================================
  // Error
  // ================================

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-mono text-red-500">
          {error.message}
        </p>
      </div>
    );
  }

  // ================================
  // Data
  // ================================

  const submission = data?.submission;
  const analytics = data?.analytics ?? [];

  if (!submission) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-mono text-gray-500">
          Submission not found.
        </p>
      </div>
    );
  }

  // ================================
  // Values
  // ================================

  const correctAnswer = submission.correctAnswers;
  const wrongAnswer = submission.wrongAnswers;
  const totalQuestions = submission.totalQuestions;

  // ================================
  // Progress
  // ================================

  const progress = totalQuestions > 0 ? 100 : 0;

  // ================================
  // Render
  // ================================

  return (<>
   <Breadcrumb
        breadcrumb={[
          "Diplomas",
          navState?.diplomaTitle ?? "",
          submission.examTitle,
        ]}
      />
    <div className="flex  flex-col gap-6 p-4 ">

      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}

     
      <PageHeader
        icon={CircleQuestionMark}
        title={`${submission.examTitle} Questions`}
        backTo={
          navState?.diplomaId
            ? `/diplomas/${navState.diplomaId}/exams`
            : "/"
        }
      />

      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <div className="flex flex-1 flex-col bg-white  p-4 ">

        {/* ================================= */}
        {/* EXAM HEADER */}
        {/* ================================= */}

        <div>

          {/* Title + Question Number */}

          <div className="mb-1 flex flex-wrap items-center justify-between gap-2">

            <p className="min-w-0  font-mono text-sm text-gray-500">
              {navState?.diplomaTitle} - {submission.examTitle}
            </p>

            <p className="shrink-0 font-mono text-sm text-gray-500">
              Question{" "}
              <span className="font-semibold text-blue-600">
                {totalQuestions}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {totalQuestions}
              </span>
            </p>

          </div>

          {/* Progress Bar */}

          <div className="h-3 w-full bg-blue-50">

            <div
              className="h-full bg-blue-600 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* ================================= */}
        {/* RESULTS TITLE */}
        {/* ================================= */}

        <h2 className="pt-6 font-mono text-2xl font-semibold text-blue-600">
          Results:
        </h2>

        {/* ================================= */}
        {/* RESULTS CONTENT */}
        {/* ================================= */}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[275px_1fr]">

          {/* ================================= */}
          {/* RESULT CHART */}
          {/* ================================= */}

          <ResultCharts
            correctAnswer={correctAnswer}
            wrongAnswer={wrongAnswer}
          />

          {/* ================================= */}
          {/* QUESTIONS / ANSWERS */}
          {/* ================================= */}

          <div className="flex max-h-125 flex-col gap-6 overflow-y-auto border-2 border-dashed border-blue-200 p-6">

            {analytics.map((item) => {

              const selectedAnswerId =
                item.selectedAnswer?.id?.toString() ?? "";

              const correctAnswerId =
                item.correctAnswer?.id?.toString() ?? "";

              return (
                <div
                  key={item.questionId}
                  className="flex flex-col gap-3"
                >

                  {/* ================================= */}
                  {/* QUESTION */}
                  {/* ================================= */}

                  <h3 className="font-mono text-lg font-semibold text-blue-600">
                    {item.questionText}
                  </h3>

                  {/* ================================= */}
                  {/* SELECTED ANSWER */}
                  {/* ================================= */}

                  <div
                    className={`flex items-center gap-4 px-5 py-4 ${
                      item.isCorrect
                        ? "bg-green-50"
                        : "bg-red-50"
                    }`}
                  >

                    <RadioGroup
                      value={selectedAnswerId}
                      disabled
                      className="w-auto"
                      
                    >
                      <RadioGroupItem
                        value={selectedAnswerId}
                        className={
                          item.isCorrect
                            ? "size-4 border border-green-500 text-green-500"
                            : "size-4 border border-red-500 text-red-500"
                        }
                      />
                    </RadioGroup>

                    <span className="font-mono text-sm text-gray-800">
                      {item.selectedAnswer?.text}
                    </span>

                  </div>

                  {/* ================================= */}
                  {/* CORRECT ANSWER */}
                  {/* ================================= */}

                  {!item.isCorrect && (
                    <div className="flex items-center gap-4 bg-green-50 px-5 py-4">

                      <RadioGroup
                        value={correctAnswerId}
                        disabled
                        className="w-auto"
                      >
                        <RadioGroupItem
                          value={correctAnswerId}
                          className="size-4 border border-green-500 text-green-50"
                        />
                      </RadioGroup>

                      <span className="font-mono text-sm text-gray-800">
                        {item.correctAnswer?.text}
                      </span>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

        {/* ================================= */}
        {/* FOOTER */}
        {/* ================================= */}

        <div className="mt-6 grid grid-cols-2 gap-3 max-sm:gap-2">

          {/* Restart */}

          <button
          onClick={()=>navigate(`/diplomas/${navState?.diplomaId}/exams`)}
            type="button"
            className="flex h-12 cursor-pointer items-center justify-center gap-2 bg-gray-200 font-mono text-sm text-gray-700 transition hover:bg-gray-300"
          >
            <RotateCcw size={18} />

            Restart
          </button>

          {/* Explore */}

          <button
            type="button"
            className="flex h-12 cursor-pointer items-center justify-center gap-2 bg-blue-600 font-mono text-sm text-white transition hover:bg-blue-700"
          >
            <FolderOpen size={18} />

            Explore
          </button>

        </div>

      </div>
    </div>
    </>
  );
}