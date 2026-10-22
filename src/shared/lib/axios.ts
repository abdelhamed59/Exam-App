import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { IApiError, IApiResponse, IErrorResponse } from "@/shared/types/api";
import { TOKEN_KEY } from "../constants/token.constant";


  // Variables
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse<IApiResponse>) => response,
  (error: AxiosError<IErrorResponse>) => {
    const data = error.response?.data;
    const message = data?.message ?? error.message ?? "Something went wrong";

    const apiError: IApiError = Object.assign(new Error(message), {
      errors: data?.errors,
    });

    return Promise.reject(apiError);
  },
);
