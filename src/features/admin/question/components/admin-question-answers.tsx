


import { useState } from "react";
import {
  get,
  useFieldArray,
  type ArrayPath,
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormReturn,
} from "react-hook-form";

import { Button } from "@/components/ui/button/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input/input";
import { Check, CheckCheck, PlusIcon, Trash2, X } from "lucide-react";
import { cn } from "@/shared/lib/tailwind-merge";

interface IAnswerValue {
  text: string;
  isCorrect: boolean;
}

interface AdminQuestionAnswersProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  /** "answers" for a single question, `questions.${index}.answers` in bulk mode */
  name: ArrayPath<T>;
}

const MAX_ANSWERS = 4;

type ErrorLike = { message?: string } | undefined;

export default function AdminQuestionAnswers<T extends FieldValues>({
  form,
  name,
}: AdminQuestionAnswersProps<T>) {
  const [openAddAnswer, setOpenAddAnswer] = useState(false);
  const [newAnswer, setNewAnswer] = useState("");
  const [newAnswerError, setNewAnswerError] = useState("");

  const { control, register, watch, setValue, formState } = form;

const { fields, append, remove } = useFieldArray<T, typeof name>({
  control,
  name,
});
  const answers = (watch(name as Path<T>) ?? []) as IAnswerValue[];

  const answersError = (get(formState.errors, `${name}.root`) ??
    get(formState.errors, name)) as ErrorLike;

 const handleAddAnswer = () => {
  const trimmedAnswer = newAnswer.trim();

  if (!trimmedAnswer) {
    setNewAnswerError("Answer text is required");
    return;
  }

  if (fields.length >= MAX_ANSWERS) return;

  setNewAnswerError("");

  append({
  text: trimmedAnswer,
  isCorrect: false,
} as Parameters<typeof append>[0]);

  setNewAnswer("");
  setOpenAddAnswer(false);
};

  const handleToggleCorrect = (index: number) => {
    answers.forEach((_, answerIndex) => {
      setValue(
        `${name}.${answerIndex}.isCorrect` as Path<T>,
        (answerIndex === index) as PathValue<T, Path<T>>,
        { shouldDirty: true, shouldValidate: true },
      );
    });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      
<div className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-2 bg-gray-200 p-2 sm:grid-cols-[50px_minmax(0,1fr)_150px] sm:gap-0 sm:p-0">
  <div />

  <div className="flex min-w-0 items-center">
    <p className="font-mono text-xs font-medium text-gray-800 sm:text-sm">
      Body
    </p>
  </div>

  <Button
    type="button"
    disabled={fields.length >= MAX_ANSWERS}
    className="h-9 px-2 text-xs whitespace-nowrap bg-emerald-500 hover:bg-emerald-500 sm:h-10 sm:px-4 sm:text-sm"
    onClick={() => {
      setOpenAddAnswer(true);
      setNewAnswerError("");
    }}
  >
    <PlusIcon className="size-4" />
    <span className="sm:hidden">Add</span>
    <span className="hidden sm:inline">Add Answers</span>
  </Button>
</div>

      <ul>
        {fields.map((field, index) => {
          const isCorrect = answers[index]?.isCorrect === true;
          const answerTextPath = `${name}.${index}.text` as Path<T>;
          const answerError = get(formState.errors, answerTextPath) as ErrorLike;

          return (
            <li
              key={field.id}
              className={cn(
  "grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-1 border-b border-gray-100 p-1 sm:grid-cols-[50px_minmax(0,1fr)_150px] sm:gap-0 sm:p-0",
  isCorrect && "bg-emerald-50",
)}
            >
              <Button
  type="button"
  variant="ghost"
  aria-label={`Delete answer ${index + 1}`}
  className="size-9 min-w-0 bg-red-50 p-0 text-red-600 hover:bg-red-100 sm:size-10"
  onClick={() => remove(index)}
>
  <Trash2 size={16} className="sm:size-4.5" />
</Button>

              <Field className="min-w-0">
  <Input
    {...register(answerTextPath)}
    aria-invalid={!!answerError}
    placeholder={`Answer ${index + 1}`}
    className="h-9 min-w-0 border-0 px-2 text-sm sm:h-10 sm:px-3"
  />
</Field>

              <div className="flex min-w-0 justify-center px-0.5 sm:px-2">
  {isCorrect ? (
    <Button
      type="button"
      variant="ghost"
      className="h-9 gap-1 px-1.5 text-xs text-emerald-600 hover:bg-emerald-100 sm:h-10 sm:gap-1.5 sm:px-3 sm:text-sm"
    >
      <CheckCheck size={16} />
      <span className="sm:hidden">Correct</span>
      <span className="hidden sm:inline">Correct Answer</span>
    </Button>
  ) : (
    <Button
      type="button"
      className="h-9 gap-1 bg-gray-200 px-1.5 text-xs text-gray-800 hover:bg-gray-300 sm:h-10 sm:gap-1.5 sm:px-3 sm:text-sm"
      onClick={() => handleToggleCorrect(index)}
    >
      <Check size={15} />
      <span className="sm:hidden">Correct?</span>
      <span className="hidden sm:inline">Mark Correct</span>
    </Button>
  )}
</div>

              {answerError?.message && (
                <FieldError className="col-span-3 flex justify-center py-2">
                  {answerError.message}
                </FieldError>
              )}
            </li>
          );
        })}

        {/* Array-level validation error */}
        {answersError?.message && (
          <li className="bg-red-50 px-4 py-2">
            <FieldError>{answersError.message}</FieldError>
          </li>
        )}

        {/* Add new answer */}
       <li
  className={cn(
    "grid-cols-[40px_minmax(0,1fr)_auto] items-start gap-1 bg-emerald-100 p-1 sm:grid-cols-[50px_minmax(0,1fr)_150px] sm:items-center sm:gap-0 sm:p-0",
    openAddAnswer ? "grid" : "hidden",
  )}
>
  <Button
    type="button"
    variant="ghost"
    aria-label="Cancel adding answer"
    className=" mt-1 sm:mt-0 min-w-0 p-0 hover:bg-transparent "
    onClick={() => {
      setOpenAddAnswer(false);
      setNewAnswer("");
      setNewAnswerError("");
    }}
  >
    <div className="flex size-7.5 items-center justify-center rounded-full border border-gray-300 text-gray-800">
      <X size={18} />
    </div>
  </Button>

  <Field className="min-w-0 py-2 sm:ps-2.5">
    <Input
      value={newAnswer}
      aria-invalid={!!newAnswerError}
      onChange={(event) => {
        setNewAnswer(event.target.value);
        if (event.target.value.trim()) setNewAnswerError("");
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handleAddAnswer();
        }
      }}
      placeholder="Enter answer body"
      className="h-9 min-w-0 border-emerald-500 text-sm hover:border-emerald-500 focus:border-emerald-500 sm:h-10"
    />

    {newAnswerError && <FieldError>{newAnswerError}</FieldError>}
  </Field>

  <div className="pt-2 sm:p-2.5">
    <Button
      type="button"
      className="h-9 gap-1 w-full bg-emerald-500 px-2 text-xs hover:bg-emerald-500 sm:h-10 sm:px-4 sm:text-sm"
      onClick={handleAddAnswer}
    >
      <PlusIcon size={16} />
      Add
    </Button>
  </div>
</li>
      </ul>
    </div>
  );
}