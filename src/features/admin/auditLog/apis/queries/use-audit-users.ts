import { useQuery } from "@tanstack/react-query";
import type { IAdminUsersParams } from "../../types/auditUser";
import { adminUserKey } from "../adminUsers/users.key";
import { getAdminUsersApi } from "../adminUsers/users.api";


export function useAuditUsers(params: IAdminUsersParams) {
  return useQuery({
    queryKey: adminUserKey.list(params),
    queryFn: () => getAdminUsersApi(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}