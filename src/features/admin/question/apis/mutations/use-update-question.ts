import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminQuestionApi } from "../admin-questions.api";
import { adminQuestionkey } from "../admin-question.key";
import type { IAdminQuestionFormValues } from "../../types/admin-question";

export function useUpdateQuestion(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAdminQuestionFormValues) =>
      updateAdminQuestionApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestionkey.all });
    },
  });
}