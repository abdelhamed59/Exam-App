import { useQuery } from "@tanstack/react-query";
import { getAuditLogApi } from "../auditLog.api";
import { AuditLogKey } from "../auditLog.key";


export function useAdminAuditLog(id: string) {
  return useQuery({
    queryKey: AuditLogKey.detail(id),
    queryFn: () => getAuditLogApi(id),
    enabled: !!id,
  });
}