import { useMutation } from "@tanstack/react-query";
import { sendOtpApi } from "../auth.api";
import type { ISignupEmailFormValues } from "../../types/signup";

export function useSignupEmail() {
  return useMutation({
    mutationFn: (values: ISignupEmailFormValues) => sendOtpApi(values),
  });
}
