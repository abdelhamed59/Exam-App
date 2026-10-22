import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IAdminBulkQuestionFormValues } from "../../types/admin-question";
import { adminQuestionkey } from "../admin-question.key";
import { createBulkAdminQuestionsApi } from "../admin-questions.api";

export function useCreateBulkQuestions(examId: string) {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IAdminBulkQuestionFormValues) => createBulkAdminQuestionsApi(examId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminQuestionkey.all });
        },
    });
}