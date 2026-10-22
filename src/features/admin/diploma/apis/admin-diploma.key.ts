import type { IAdminDiplomaParams } from "../types/admin-diploma";

export const adminDiplomaKey = {
  all: ["admin-diplomas"] as const,

  list: (params: IAdminDiplomaParams) =>
    [...adminDiplomaKey.all, params] as const,

  detail:(id: string)=> [...adminDiplomaKey.all, "detail", id] as const,
};