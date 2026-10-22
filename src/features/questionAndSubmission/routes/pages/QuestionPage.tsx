import {useRef, useState } from "react";
import { CircleQuestionMark, ChevronRight, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router";
import PageHeader from "@/shared/components/page-header/page-header";
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import { useExamQuestions } from "../../apis/question/queries/use-question";
import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireError,
  QuestionnairePrevious,
  QuestionnaireNext,
  QuestionnaireSubmit,
} from "@/components/ui/questionnaire";
import ExamTimer from "./ExamTimer";
import { useSubmitExam } from "../../apis/submission/mutations/use-submit-exam";
export default function QuestionPage() {
  const startedAtRef = useRef(new Date().toISOString());
  const { mutate: submitExam, isPending: isSubmitting } = useSubmitExam();
  const { examId } = useParams<{ examId: string }>();

  const location = useLocation();
    const navigate=useNavigate()

  const navState = location.state as {
    diplomaTitle: string;
    examTitle: string;
    diplomaId?: string;
    duration?: number;
  } | null;

  const durationMinutes = navState?.duration;
  const diplomaId = navState?.diplomaId;
  const examTitle = navState?.examTitle;
  const diplomaTitle = navState?.diplomaTitle;

  // =====================================
  // GET QUESTIONS
  // =====================================

  const { data, error, isPending, isError } = useExamQuestions(examId!);

  // =====================================
  // CURRENT QUESTION
  // =====================================

  const [currentIndex, setCurrentIndex] = useState(0);

  // =====================================
  // FORM REF
  // =====================================

  const formRef = useRef<HTMLFormElement>(null);

  // =====================================
  // TIMER END
  // =====================================

  

  // =====================================
  // LOADING
  // =====================================

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-mono text-gray-500">Loading questions...</p>
      </div>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (isError) {
    return (
      <div className="p-6">
        <p className="font-mono text-red-500">{error.message}</p>
      </div>
    );
  }

  // =====================================
  // QUESTIONS
  // =====================================

  const questions = data?.questions ?? [];

  if (!questions.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-mono text-gray-500">No questions found for this exam.</p>
      </div>
    );
  }

  // =====================================
  // PROGRESS
  // =====================================

  const progress = ((currentIndex + 1) / questions.length) * 100;

  // =====================================
  // QUESTIONNAIRE ITEMS
  // =====================================

  const items = questions.map((question) => ({
    name: question.id,
    prompt: question.text,
    choices: question.answers.map((answer) => ({
      value: answer.id,
      label: answer.text,
    })),
  }));

  // =====================================
  // SUBMIT ANSWERS
  // =====================================
  function submitAnswers(formData: FormData) {
    if (!examId) return;

    const answers = questions.map((question) => ({
      questionId: question.id,
      answerId: String(formData.get(question.id) ?? ""),
    }));

    submitExam({
      examId,
      startedAt: startedAtRef.current,
      answers,
    },{
      onSuccess:(payload)=>{
navigate(`/submissions/${payload.submission.id}`,{state:{diplomaTitle,diplomaId}})
        }
    });
  }

  // =====================================
  // FORM SUBMIT
  // =====================================

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    submitAnswers(formData);
  }

  // =====================================
  // UI
  // =====================================

  return (<>
        <Breadcrumb breadcrumb={["Diplomas", diplomaTitle!, examTitle!]} />

    <div className="flex  flex-col gap-6 p-4 sm:p-6">
      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}
      <PageHeader
        icon={CircleQuestionMark}
        title={`${examTitle} Questions`}
        backTo={`/diplomas/${diplomaId}/exams`}
      />

      {/* ================================= */}
      {/* EXAM CONTENT */}
      {/* ================================= */}

      <div className=" w-full bg-white md:p-6 md:gap-4">
        <Questionnaire
          items={items}
          ref={formRef}

          onItemChange={(item) => {
            const index = items.findIndex((question) => question.name === item);

            if (index !== -1) {
              setCurrentIndex(index);
            }
          }}

          onSubmit={handleFormSubmit}

          className="space-y-0 p-0"
        >
          {/* ================================= */}
          {/* EXAM HEADER */}
          {/* ================================= */}

          <div className="flex items-center gap-3 sm:gap-6">
            {/* ================================= */}
            {/* LEFT SIDE */}
            {/* ================================= */}

            <div className="flex-1">
              {/* Quiz title + question counter */}

              <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <p className="min-w-0 text-pretty font-mono text-sm font-normal text-gray-700">
                  {diplomaTitle} - {examTitle}
                </p>

                <p className="shrink-0 font-mono text-sm text-gray-500">
                  Question <span className="font-semibold text-blue-600">{currentIndex + 1}</span> of{" "}
                  <span className="font-semibold text-gray-700">{questions.length}</span>
                </p>
              </div>

              {/* ================================= */}
              {/* PROGRESS BAR */}
              {/* ================================= */}

              <div className="h-3 w-full overflow-hidden bg-blue-50">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {/* ================================= */}
            {/* TIMER */}
            {/* ================================= */}

            <ExamTimer
              duration={durationMinutes ?? 0}
              onTimeEnd={() => formRef.current?.requestSubmit()}
            />
          </div>

          {/* ================================= */}
          {/* QUESTIONS */}
          {/* ================================= */}

          {items.map((question, index) => (
            <QuestionnaireItem key={question.name} name={question.name} className="border-0 p-0">
              {/* ================================= */}
              {/* QUESTION */}
              {/* ================================= */}

              <QuestionnaireTitle className="font-mono text-xl font-semibold text-blue-600 sm:text-2xl">
                {index + 1}. {question.prompt}
              </QuestionnaireTitle>

              {/* ================================= */}
              {/* ANSWERS */}
              {/* ================================= */}

              <QuestionnaireChoices className="">
                {question.choices.map((choice) => (
                  <QuestionnaireChoice
                    key={choice.value}
                    value={choice.value}
                    className="group flex cursor-pointer items-center gap-3 border-0 bg-gray-50 font-mono transition-colors hover:bg-blue-50"
                  >
                    <span className="font-mono text-sm font-normal text-gray-800">{choice.label}</span>
                  </QuestionnaireChoice>
                ))}
              </QuestionnaireChoices>

              {/* ================================= */}
              {/* ERROR */}
              {/* ================================= */}

              <QuestionnaireError className="mt-2" />
            </QuestionnaireItem>
          ))}

          {/* ================================= */}
          {/* FOOTER */}
          {/* ================================= */}

          <div className="mt-8 grid grid-cols-2 gap-3">
            {/* ================================= */}
            {/* PREVIOUS */}
            {/* ================================= */}

            <QuestionnairePrevious className="flex h-12 cursor-pointer items-center justify-center gap-2 bg-gray-200 font-mono text-gray-400">
              <ChevronLeft size={18} />
              Previous
            </QuestionnairePrevious>

            {/* ================================= */}
            {/* NEXT */}
            {/* ================================= */}

            <QuestionnaireNext className="flex h-12 cursor-pointer items-center justify-center gap-2 bg-blue-600 font-mono text-white hover:bg-blue-600">
              Next
              <ChevronRight size={18} />
            </QuestionnaireNext>

            {/* ================================= */}
            {/* SUBMIT */}
            {/* ================================= */}

            <QuestionnaireSubmit
              disabled={isSubmitting}
              className="flex h-12 cursor-pointer items-center justify-center gap-2 bg-blue-600 font-mono text-white hover:bg-blue-600"
            >
              {isSubmitting ? "Submitting..." : "Submit Exam"}
            </QuestionnaireSubmit>
          </div>
        </Questionnaire>
      </div>
    </div>
    </>
  );
}
