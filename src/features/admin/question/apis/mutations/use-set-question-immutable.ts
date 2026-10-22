import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQuestionkey } from "../admin-question.key";
import { setQuestionImmutableApi } from "../admin-questions.api";


export function useSetQuestionImmutable(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (immutable: boolean) => setQuestionImmutableApi(id, { immutable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestionkey.all });
    },
  });
}