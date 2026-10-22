import { useMutation } from "@tanstack/react-query";
import { resendOtpApi } from "../auth.api";

export function useResendOtp() {
  return useMutation({
    mutationFn: (email: string) => resendOtpApi(email),
  });
}
