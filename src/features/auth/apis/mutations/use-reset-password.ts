import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { resetPasswordApi } from "../auth.api";
import type { IResetPasswordFormValues } from "../../types/reset-password";

export function useResetPassword(token: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: IResetPasswordFormValues) =>
      resetPasswordApi({
        token,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      }),
    onSuccess: () => navigate("/login"),
  });
}