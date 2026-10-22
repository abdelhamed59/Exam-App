import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../auth.api";
import type { IForgotPasswordFormValues } from "../../types/forgot-password";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (values: IForgotPasswordFormValues) =>
      forgotPasswordApi({
        ...values,
        // where the emailed link should send the user back to
        redirectUrl: `${window.location.origin}/reset-password`,
      }),
  });
}