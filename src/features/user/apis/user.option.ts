import { queryOptions } from "@tanstack/react-query";
import { getCurrentUserApi } from "./user.api";
import { userKeys } from "./user.key";

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: userKeys.me(),
    queryFn: getCurrentUserApi,
  });
