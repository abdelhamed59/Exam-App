import { useQuery } from "@tanstack/react-query";
import { adminDiplomaKey } from "../admin-diploma.key";
import { getAdminDiplomaByIdApi } from "../admin-diplomas.api";

export const useAdminDiploma = (id: string) => {
  return useQuery({
    queryKey: adminDiplomaKey.detail(id),
    queryFn: () => getAdminDiplomaByIdApi(id!),
    enabled: !!id,
  });
};
