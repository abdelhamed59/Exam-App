import { useQuery } from "@tanstack/react-query";
import type { IAdminExamParams } from "../../types/admin-exam";
import { adminExamkey } from "../admin-exam.key";
import { getAdminExamsApi } from "../admin-exams.api";

export function useAdminExams(params: IAdminExamParams) {
  return useQuery({
    queryKey: adminExamkey.list(params),
    queryFn: () => getAdminExamsApi(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}
