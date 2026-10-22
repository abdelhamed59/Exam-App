import { useQuery } from "@tanstack/react-query";
import { currentUserQueryOptions } from "../user.option";

export function useCurrentUser() {
  return useQuery(currentUserQueryOptions());
}
