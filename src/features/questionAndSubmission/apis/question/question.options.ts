
import { queryOptions } from "@tanstack/react-query";
import { questionsKeys } from "./question.key";
import { getExamQuestionsApi } from "./question.api";


export const examQuestionsQueryOptions = (examId: string) =>
  queryOptions({
    queryKey: questionsKeys.questions(examId),
    queryFn: () => getExamQuestionsApi(examId),
    enabled: !!examId,
  });