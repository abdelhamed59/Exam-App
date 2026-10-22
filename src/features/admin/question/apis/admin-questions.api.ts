import { api } from "@/shared/lib/axios";
import { ADMIN_QUESTION_ENDPOINT } from "./admin-question.endpoint";
import type { ISuccessResponse } from "@/shared/types/api";
import type { IAdminBulkQuestionFormValues, IAdminDeleteQuestionResponse, IAdminQuestionDetailResponse, IAdminQuestionFormValues, IAdminQuestionsListResponse, IAdminQuestionsParams, ISetQuestionImmutableRequest } from "../types/admin-question";

export async function getAdminQuestionsApi(examId: string, params: IAdminQuestionsParams) {
  const response = await api.get<ISuccessResponse<IAdminQuestionsListResponse>>(
    `${ADMIN_QUESTION_ENDPOINT}/exam/${examId}`,
    { params }
  );
  return response.data.payload.questions;
};

export async function getAdminQuestionDetailsApi(id:string) {
  const response=await api.get<ISuccessResponse<IAdminQuestionDetailResponse>>(`${ADMIN_QUESTION_ENDPOINT}/${id}`)
  return response.data.payload.question;
}

export async function deleteAdminQuestionApi(id:string) {
  const response=await api.delete<ISuccessResponse<IAdminDeleteQuestionResponse>>(`${ADMIN_QUESTION_ENDPOINT}/${id}`)
  return response.data.payload
  
}


export async function updateAdminQuestionApi(id: string, data: IAdminQuestionFormValues) {
  const response = await api.put<ISuccessResponse<IAdminQuestionDetailResponse>>(
    `${ADMIN_QUESTION_ENDPOINT}/${id}`,
    data
  );
  return response.data.payload.question;
}


export async function createAdminQuestionApi(examId: string, data: IAdminQuestionFormValues) {
  const response = await api.post<ISuccessResponse<IAdminQuestionDetailResponse>>(
    `${ADMIN_QUESTION_ENDPOINT}/exam/${examId}`,
    data
  );
  return response.data.payload.question;
}

export async function createBulkAdminQuestionsApi(examId: string, data: IAdminBulkQuestionFormValues) {
  const response = await api.post<ISuccessResponse<IAdminQuestionsListResponse>>(
    `${ADMIN_QUESTION_ENDPOINT}/exam/${examId}/bulk`,
    data
  );
  return response.data.payload.questions;
}

export async function setQuestionImmutableApi(id: string, values: ISetQuestionImmutableRequest) {
  await api.patch(`/admin/questions/${id}/immutable`, values);
}