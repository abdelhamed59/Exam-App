import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDiplomaApi } from "../admin-diplomas.api";
import { adminDiplomaKey } from "../admin-diploma.key";

export function useDeleteDiploma() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDiplomaApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminDiplomaKey.all });
    },
  });
}