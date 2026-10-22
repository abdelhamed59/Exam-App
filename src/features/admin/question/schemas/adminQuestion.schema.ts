import { z } from "zod";

const answerSchema = z.object({
  text: z.string().nonempty("Answer text is required"),
  isCorrect: z.boolean(),
});

export const adminQuestionSchema = z.object({
  text: z.string().nonempty("Question text is required"),
  answers: z
    .array(answerSchema)
    .min(2, "Must have at least 2 answers")
    .max(4,"Must be less than or equal 4 answers")
    .refine(
      (answers) => answers.filter((a) => a.isCorrect).length === 1,
      "Must have exactly one correct answer"
    ),
});

export const adminBulkQuestionSchema = z.object({
  questions: z.array(adminQuestionSchema).min(1, "Add at least one question"),
});