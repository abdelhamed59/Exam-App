import { infiniteQueryOptions } from "@tanstack/react-query";
import { examsKey } from "./exam.key";
import { getDiplomaExamsApi } from "./exams.api"
export function examsInfiniteQueryOptions(diplomaId: string) {
  return infiniteQueryOptions({
    queryKey: examsKey.infinite(diplomaId),
    queryFn: ({ pageParam }) =>
      getDiplomaExamsApi(diplomaId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.metadata.page <
        lastPage.metadata.totalPages
        ? lastPage.metadata.page + 1
        : undefined;
    },
  });
}