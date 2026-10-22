


export const questionsKeys = {
  all: ["questions"] as const,
  questions: (examId: string) => [...questionsKeys.all, examId, "questions"] as const,
};