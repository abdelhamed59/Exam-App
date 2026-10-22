import { infiniteQueryOptions } from "@tanstack/react-query";
import { diplomaKey } from "./diploma.key";
import { getDiplomasApi } from "./diplomas.api";

export function diplomasInfiniteQueryOptions() {
  return infiniteQueryOptions({
    queryKey: diplomaKey.infinite(),

    queryFn: ({ pageParam }) =>
      getDiplomasApi(pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      return lastPage.metadata.page <
        lastPage.metadata.totalPages
        ? lastPage.metadata.page + 1
        : undefined;
    },
  });
}

