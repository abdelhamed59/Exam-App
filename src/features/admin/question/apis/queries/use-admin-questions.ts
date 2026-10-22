import { useQuery } from "@tanstack/react-query";
import type { IAdminQuestionsParams } from "../../types/admin-question";
import { getAdminQuestionsApi } from "../admin-questions.api";
import { adminQuestionkey } from "../admin-question.key";

export function useAdminQuestions(examId: string, params: IAdminQuestionsParams) {
  return useQuery({
    queryKey: adminQuestionkey.list(params),
    queryFn: () => getAdminQuestionsApi(examId, params),
    enabled: !!examId,
  });
}