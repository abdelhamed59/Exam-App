import type z from 'zod';
import { auditLogSearchFiltersSchema } from './../schemas/auditLog-schema';
import type { IPaginatedPayload } from "@/shared/types/api";

export interface IAuditLog {
  id: string;
  createdAt: string;
  actorUserId: string;
  actorUsername: string;
  actorEmail: string;
  actorRole: string;
  category: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Any;
  ipAddress: string;
  userAgent: string;
  httpMethod: string;
  path: string;
}

export type IAuditLogsListResponse = IPaginatedPayload<IAuditLog>;

export interface IAuditLogDetailResponse {
  auditLog: IAuditLog;
}

export interface IClearAllAuditLogsResponse {
  deletedCount: number;
}

export interface IDeleteAuditLogResponse {
  message: string;
}

export interface IAuditLogsParams {
  page: number;
  limit: number;
  category?: "DIPLOMA" | "EXAM" | "QUESTION" | "USER" | "SYSTEM";
  action?: "CREATE" | "UPDATE" | "DELETE" | "SET_IMMUTABLE" | "SEED_DATA";
  actorUserId?: string;
  sortBy?: "action" | "user" | "entity" | "createdAt";
  sortOrder?: "asc" | "desc";
  search?: string;
}

export type IAuditLogSearchFiltersValues = z.infer<typeof auditLogSearchFiltersSchema>;
