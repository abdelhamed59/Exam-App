import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "../user.api";
import type { IChangePassword } from "../../types/user";

export function useChangePassword() {
  return useMutation({
    mutationFn: (values: IChangePassword) => changePasswordApi(values),
  });
}