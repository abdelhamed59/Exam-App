import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi } from "../auth.api";
import type { ISignupOtpFormValues } from "../../types/signup";

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (values: ISignupOtpFormValues & { email: string }) => verifyOtpApi(values),
  });
}
