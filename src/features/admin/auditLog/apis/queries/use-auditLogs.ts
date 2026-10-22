import { useQuery } from "@tanstack/react-query";
import type { IAuditLogsParams } from "../../types/auditLog";
import { AuditLogKey } from "../auditLog.key";
import { getAuditLogsApi } from "../auditLog.api";


export function useAdminAuditLogs(params: IAuditLogsParams) {
  return useQuery({
    queryKey: AuditLogKey.list(params),
    queryFn: () => getAuditLogsApi(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}