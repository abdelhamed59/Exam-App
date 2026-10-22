import { api } from "@/shared/lib/axios";
import { AUTH_ENDPOINT } from "./auth.endpoint";
import type { ILoginFormValues, ILoginResponse } from "../types/login";
import type { IForgotPasswordRequest } from "../types/forgot-password";
import type { IResetPasswordRequest } from "../types/reset-password";
import type {
  ISignupCompleteRequest,
  ISignupCompleteResponse,
  ISignupEmailFormValues,
  ISignupOtpFormValues,
} from "../types/signup";
import type { ISuccessResponse } from "@/shared/types/api";

export async function loginApi(values: ILoginFormValues) {
  const response = await api.post<ISuccessResponse<ILoginResponse>>(`${AUTH_ENDPOINT}/login`, values);

  return response.data;
}

export async function forgotPasswordApi(values: IForgotPasswordRequest) {
  const response = await api.post<ISuccessResponse<null>>(`${AUTH_ENDPOINT}/forgot-password`, values);

  return response.data;
}

export async function resetPasswordApi(values: IResetPasswordRequest) {
  const response = await api.post<ISuccessResponse<null>>(`${AUTH_ENDPOINT}/reset-password`, values);

  return response.data;
}

// Verifies the email is reachable before the account is actually created —
// doesn't create anything, that only happens in registerApi below.
export async function sendOtpApi(values: ISignupEmailFormValues) {
  const response = await api.post<ISuccessResponse<null>>(`${AUTH_ENDPOINT}/send-email-verification`, values);

  return response.data;
}

export async function verifyOtpApi(values: ISignupOtpFormValues & { email: string }) {
  const response = await api.post<ISuccessResponse<null>>(`${AUTH_ENDPOINT}/confirm-email-verification`, values);

  return response.data;
}

export async function resendOtpApi(email: string) {
  const response = await api.post<ISuccessResponse<null>>(`${AUTH_ENDPOINT}/send-email-verification`, { email });

  return response.data;
}

// Matches the Swagger contract: one call, all fields, at the last step.
export async function registerApi(values: ISignupCompleteRequest) {
  const response = await api.post<ISuccessResponse<ISignupCompleteResponse>>(`${AUTH_ENDPOINT}/register`, values);

  return response.data;
}
