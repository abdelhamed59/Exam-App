import { useMutation } from "@tanstack/react-query";
import { deletAccountApi } from "../user.api";

export function useDeleteAccount() {
  return useMutation({
    mutationFn:()=> deletAccountApi(),
  });
}