import { useMutation } from "@tanstack/react-query";
import { requestEmailChangeApi } from "../user.api";
import type { IChangeEmailFormValues } from "../../types/user";

export function useRequestEmailChange() {
  return useMutation({
    mutationFn: (values: IChangeEmailFormValues) => requestEmailChangeApi(values),
  });
}