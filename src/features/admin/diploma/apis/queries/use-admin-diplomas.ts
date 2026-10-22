import { useQuery } from "@tanstack/react-query";
import { getAdminDiplomasApi } from "../admin-diplomas.api";
import { adminDiplomaKey } from "../admin-diploma.key";
import type { IAdminDiplomaParams } from "../../types/admin-diploma";

export function useAdminDiplomas(params: IAdminDiplomaParams) {
  return useQuery({
    queryKey: adminDiplomaKey.list(params),

    queryFn: () => getAdminDiplomasApi(params),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,
  });
}
