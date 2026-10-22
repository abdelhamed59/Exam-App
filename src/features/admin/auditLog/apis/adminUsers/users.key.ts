import type { IAdminUsersParams } from "../../types/auditUser";

export const adminUserKey = {
  all: ["adminUsers"] as const,
  list: (params: IAdminUsersParams) => [...adminUserKey.all, "list", params] as const,
};