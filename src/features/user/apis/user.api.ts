import { api } from "@/shared/lib/axios";
import { USER_ENDPOINT } from "./user.endpoint";
import type { ISuccessResponse } from "@/shared/types/api";
import type { IChangeEmailFormValues, IChangePassword, IChangePasswordResponse, IConfirmEmailChangeResponse, ICurrentUserResponse, IEmailOtpFormValues, IRequestEmailChangeResponse, IUpdateProfileRequest } from "../types/user";

export async function getCurrentUserApi() {
  const response = await api.get<ISuccessResponse<ICurrentUserResponse>>(`${USER_ENDPOINT}/profile`);
  return response.data.payload;
}

export async function updateProfileApi(values:IUpdateProfileRequest){
  const response = await api.patch<ISuccessResponse<ICurrentUserResponse>>(`${USER_ENDPOINT}/profile`,values);  
  return response.data.payload;
}

export async function requestEmailChangeApi(values: IChangeEmailFormValues) {
  const response = await api.post<IRequestEmailChangeResponse>(`${USER_ENDPOINT}/email/request`, values);
  return response.data;
}

export async function confirmEmailChangeApi(values: IEmailOtpFormValues) {
  const response = await api.post<IConfirmEmailChangeResponse>(`${USER_ENDPOINT}/email/confirm`, values);
  return response.data;
}

export async function deletAccountApi() {
  const response = await api.delete(`${USER_ENDPOINT}/account`);
  return response.data;
}

export async function changePasswordApi(values: IChangePassword) {
  const response = await api.post<IChangePasswordResponse>(`${USER_ENDPOINT}/change-password`, values);
  return response.data;
}