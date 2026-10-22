import { api } from "@/shared/lib/axios";

import type { IPaginatedPayload, ISuccessResponse } from "@/shared/types/api";

import type { IAdminDiploma, IAdminDiplomaDetailResponse, IAdminDiplomaFormValues, IAdminDiplomaParams, IDeleteDiplomaResponse, ISetDiplomaImmutableRequest } from "../types/admin-diploma";

import { ADMIN_DIPLOMA_ENDPOINT } from "./admin-diploma.endpoint";

export async function getAdminDiplomasApi(params: IAdminDiplomaParams) {
  const response = await api.get<ISuccessResponse<IPaginatedPayload<IAdminDiploma>>>(ADMIN_DIPLOMA_ENDPOINT ,{
    params:{
        ...params,
        limit: 12,
    }
  });
  return response.data.payload;
}

export async function getAdminDiplomaByIdApi(id: string) {
  const response = await api.get<ISuccessResponse<IAdminDiplomaDetailResponse>>(`${ADMIN_DIPLOMA_ENDPOINT}/${id}`);
  return response.data.payload.diploma;
}

export async function createDiplomaApi(values: IAdminDiplomaFormValues) {
  const response = await api.post<IAdminDiplomaDetailResponse>(ADMIN_DIPLOMA_ENDPOINT, values);
  return response.data.diploma;
}

export async function updateDiplomaApi(id: string, values: IAdminDiplomaFormValues) {
  const response = await api.put<IAdminDiplomaDetailResponse>(`${ADMIN_DIPLOMA_ENDPOINT}/${id}`, values);
  return response.data.diploma;
}

export async function deleteDiplomaApi(id: string) {
  const response = await api.delete<IDeleteDiplomaResponse>(`${ADMIN_DIPLOMA_ENDPOINT}/${id}`);
  return response.data.message;
}

export async function setDiplomaImmutableApi(id: string, values: ISetDiplomaImmutableRequest) {
  await api.patch(`/admin/diplomas/${id}/immutable`, values);
}