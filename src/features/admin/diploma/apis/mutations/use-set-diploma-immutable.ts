import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDiplomaImmutableApi } from "../admin-diplomas.api";
import { adminDiplomaKey } from "../admin-diploma.key";


export function useSetDiplomaImmutable(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (immutable: boolean) => setDiplomaImmutableApi(id, { immutable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminDiplomaKey.all });
    },
  });
}