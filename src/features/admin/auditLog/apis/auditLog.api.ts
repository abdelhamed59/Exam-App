import type { IPaginatedPayload, ISuccessResponse } from "@/shared/types/api";
import type { IAuditLog, IAuditLogDetailResponse, IAuditLogsParams, IClearAllAuditLogsResponse, IDeleteAuditLogResponse } from "../types/auditLog";
import { api } from "@/shared/lib/axios";
import { AUDIT_LOG_ENDPOINT } from "./auditLog.endpoint";

export async function getAuditLogsApi(params: IAuditLogsParams) {
  const response = await api.get<ISuccessResponse<IPaginatedPayload<IAuditLog>>>(
    `${AUDIT_LOG_ENDPOINT}`,
    { params }
  );
  return response.data.payload;
}

export async function getAuditLogApi(id: string) {
  const response = await api.get<ISuccessResponse<IAuditLogDetailResponse>>(
    `${AUDIT_LOG_ENDPOINT}/${id}`
  );
  return response.data.payload.auditLog;
}

export async function clearAllAuditLogsApi() {
  const response = await api.delete<ISuccessResponse<IClearAllAuditLogsResponse>>(
    `${AUDIT_LOG_ENDPOINT}`
  );
  return response.data.payload.deletedCount;
}

export async function deleteAuditLogApi(id: string) {
  const response = await api.delete<ISuccessResponse<IDeleteAuditLogResponse>>(
    `${AUDIT_LOG_ENDPOINT}/${id}`
  );
  return response.data.payload.message;
}