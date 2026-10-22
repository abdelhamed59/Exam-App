import type { IPaginatedPayload, ISuccessResponse } from "@/shared/types/api";
import type {  IAdminUser, IAdminUsersParams } from "../../types/auditUser";
import { api } from "@/shared/lib/axios";

export async function getAdminUsersApi(params: IAdminUsersParams) {
  const response = await api.get<ISuccessResponse<IPaginatedPayload<IAdminUser>>>(
    `/admin/users`,
    { params: { ...params } }
  );
  return response.data.payload;
}