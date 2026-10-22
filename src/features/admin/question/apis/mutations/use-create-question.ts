import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminQuestionApi } from "../admin-questions.api";
import type { IAdminQuestionFormValues } from "../../types/admin-question";
import { adminQuestionkey } from "../admin-question.key";

export function useCreateQuestion(examId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAdminQuestionFormValues) =>
      createAdminQuestionApi(examId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestionkey.all });
    },
  });
}