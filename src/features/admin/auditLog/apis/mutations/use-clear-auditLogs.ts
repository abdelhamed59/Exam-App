import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuditLogKey } from "../auditLog.key";
import { clearAllAuditLogsApi } from "../auditLog.api";

export function useClearAllAuditLogs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearAllAuditLogsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AuditLogKey.all });
    },
  });
}