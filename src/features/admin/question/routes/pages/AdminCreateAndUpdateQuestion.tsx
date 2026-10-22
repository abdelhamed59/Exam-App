import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import AdminQuestionAnswers from "../../components/admin-question-answers";
import { Input } from "@/components/ui/input/input";
import Breadcrumb from "@/shared/components/page-header/Breadcrumb";
import { Button } from "@/components/ui/button/button";
import { CopyPlus, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import type { IAdminQuestionFormValues } from "../../types/admin-question";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminQuestionSchema } from "../../schemas/adminQuestion.schema";
import { useNavigate, useParams } from "react-router";
import { useAdminExam } from "@/features/admin/exam/apis/queries/use-admin-exam";
import { useCreateQuestion } from "../../apis/mutations/use-create-question";
import { useUpdateQuestion } from "../../apis/mutations/use-update-question";
import { useEffect } from "react";
import { useAdminQuestion } from "../../apis/queries/use-admin-question";
import FormFeedback from "@/shared/components/form-feedback";

export default function AdminCreateAndUpdateQuestion() {
  const navigate = useNavigate();
  const { examId, id } = useParams<{ examId: string; id: string }>();
  const isUpdateMode = !!id;
  const { data: exam } = useAdminExam(examId!);
  const ADMIN_QUESTION_FORM_ID = "admin-question-form";

  const createQuestionMutation = useCreateQuestion(examId!);

  const updateQuestionMutation = useUpdateQuestion(id!);

  const form = useForm<IAdminQuestionFormValues>({
    resolver: zodResolver(adminQuestionSchema),

    defaultValues: {
      text: "",
      answers: [],
    },
  });

  const { data: question } = useAdminQuestion(id!);

  useEffect(() => {
    if (!question || !isUpdateMode) return;
    form.reset({
      text: question.text,
      answers: question.answers.map((answer) => ({
        text: answer.text,
        isCorrect: answer.isCorrect,
      })),
    });
  }, [question, isUpdateMode, form]);

  const isPending = createQuestionMutation.isPending || updateQuestionMutation.isPending;

  const handleSubmit = (values: IAdminQuestionFormValues) => {
    if (isUpdateMode) {
      updateQuestionMutation.mutate(values, {
        onSuccess: () => {
          navigate(`/dashboard/exams/${question?.examId}`);
        },
      });

      return;
    }

    createQuestionMutation.mutate(values, {
      onSuccess: () => {
        form.reset({
          text: "",
          answers: [],
        });
        navigate(`/dashboard/exams/${examId}`);
      },
    });
  };

  const handleCancel = () => {
    if (isUpdateMode) {
      navigate(`/dashboard/exams/${question?.examId}`);
    } else {
      navigate(`/dashboard/exams/${examId}`);
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-100">
      <Breadcrumb breadcrumb={["Exams", isUpdateMode ? "Edit Question" : "Create New Question"]} />

      {/* Header */}
     {/* Header */}
<div className="flex flex-col gap-3 border-t border-gray-100 bg-white p-3 sm:px-6 sm:py-3 lg:flex-row lg:items-center lg:justify-between">
  <Button
    onClick={() =>
      navigate(
        `/dashboard/questions/exam/${examId ?? question?.examId}/createbulk`,
      )
    }
    type="button"
    variant="secondary"
    className="w-full sm:w-fit"
  >
    <CopyPlus size={18} />
    Bulk Add Mode
  </Button>

  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
    <Button
      onClick={handleCancel}
      type="button"
      variant="secondary"
      className="w-full sm:w-fit"
    >
      <X size={18} />
      Cancel
    </Button>

    <Button
      type="submit"
      form={ADMIN_QUESTION_FORM_ID}
      disabled={isPending}
      className="w-full bg-emerald-500 text-white hover:bg-emerald-600 sm:w-fit"
    >
      <Save size={18} />
      {isPending
        ? "Saving..."
        : isUpdateMode
          ? "Update Question"
          : "Save Question"}
    </Button>
  </div>
</div>

      {/* ================================= */}
      {/* Form */}
      {/* ================================= */}

        <form
      id={ADMIN_QUESTION_FORM_ID}
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex min-w-0 flex-col gap-4 p-3 sm:gap-6 sm:p-4 lg:p-6"
    >
      {/* Question Information */}
      <section className="min-w-0 overflow-hidden rounded-sm">
        <div className="bg-blue-600 p-2.5">
          <p className="font-mono font-semibold text-white">
            Question Information
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-4 bg-white p-3 sm:gap-6 sm:p-6">
          <Field>
            <FieldLabel>Exam</FieldLabel>
            <Input
              value={exam?.title ?? question?.exam.title ?? ""}
              placeholder="Select exam"
              readOnly
              className="w-full min-w-0"
            />
          </Field>

          <Field>
            <FieldLabel>Question Headline</FieldLabel>
            <Input
              {...form.register("text")}
              aria-invalid={!!form.formState.errors.text}
              placeholder="Enter question headline"
              className="w-full min-w-0"
            />

            {form.formState.errors.text && (
              <FieldError className="py-2">
                {form.formState.errors.text.message}
              </FieldError>
            )}
          </Field>
        </div>
      </section>

      {/* Question Answers */}
      <section className="min-w-0 overflow-hidden rounded-sm">
        <div className="bg-blue-600 p-2.5">
          <p className="font-mono font-semibold text-white">
            Question Answers
          </p>
        </div>

        <AdminQuestionAnswers form={form} name="answers" />
      </section>

      {form.formState.errors.answers?.message && (
        <FormFeedback>
          {form.formState.errors.answers.message}
        </FormFeedback>
      )}
    </form>
          {createQuestionMutation.error || updateQuestionMutation.error ? (
      <div className="px-3 pb-3 sm:px-6">
        <FormFeedback className="bg-red-100 text-red-700">
          {createQuestionMutation.error?.message ||
            updateQuestionMutation.error?.message}
        </FormFeedback>
      </div>
    ) : null}
    </div>
  );
}
