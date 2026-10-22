import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmEmailChangeApi } from "../user.api";
import { userKeys } from "../user.key";
import type { IEmailOtpFormValues } from "../../types/user";

export function useConfirmEmailChange() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: IEmailOtpFormValues) => confirmEmailChangeApi(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}