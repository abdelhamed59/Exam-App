import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuditLogKey } from "../auditLog.key";
import { deleteAuditLogApi } from "../auditLog.api";


export function useDeleteAuditLog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAuditLogApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AuditLogKey.all });
    },
  });
}