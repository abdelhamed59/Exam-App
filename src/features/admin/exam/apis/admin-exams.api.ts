import { api } from "@/shared/lib/axios";
import type { IAdminExam, IAdminExamDetailResponse, IAdminExamFormValues, IAdminExamParams, IDeleteExamResponse, ISetExamImmutableRequest } from "../types/admin-exam";
import { ADMIN_EXAM_ENDPOINT } from "./admin-exam.endpoint";
import type { IPaginatedPayload, ISuccessResponse } from "@/shared/types/api";

export async function getAdminExamsApi(params:IAdminExamParams) {
    const response=await api.get<ISuccessResponse<IPaginatedPayload<IAdminExam>>>(ADMIN_EXAM_ENDPOINT,{
        params:{
            ...params,
        }
    })
    return response.data.payload
}

export async function getAdminExamByIdApi(id:string) {
    const response=await api.get<ISuccessResponse<IAdminExamDetailResponse>>(`${ADMIN_EXAM_ENDPOINT}/${id}`);
    return response.data.payload.exam
    
}

export async function createExamApi(values:IAdminExamFormValues) {
    const response=await api.post<IAdminExamDetailResponse>(ADMIN_EXAM_ENDPOINT,values)
    return response.data.exam
    
}

export async function updateExamApi(id:string,values:IAdminExamFormValues) {
    const response=await api.put<IAdminExamDetailResponse>(`${ADMIN_EXAM_ENDPOINT}/${id}`,values)
    return response.data.exam
}

export async function deletExamApi(id:string) {
    const response=await api.delete<IDeleteExamResponse>(`${ADMIN_EXAM_ENDPOINT}/${id}`);
    return response.data.message
    
}

export async function setExamImmutableApi(id: string, values: ISetExamImmutableRequest) {
  await api.patch(`/admin/exams/${id}/immutable`, values);
}