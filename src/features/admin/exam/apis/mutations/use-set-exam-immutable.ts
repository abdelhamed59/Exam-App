import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setExamImmutableApi } from "../admin-exams.api";
import { adminExamkey } from "../admin-exam.key";



export function useSetExamImmutable(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (immutable: boolean) => setExamImmutableApi(id, { immutable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminExamkey.all });
    },
  });
}