import type { IAuditLogsParams } from "../types/auditLog";

export const AuditLogKey = {
  all: ["auditLogs"] as const,
  list: (params: IAuditLogsParams) => [...AuditLogKey.all, params] as const,
    detail: (id: string) => [...AuditLogKey.all, "detail", id] as const,
};