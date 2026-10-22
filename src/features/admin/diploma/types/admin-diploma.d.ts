import type { IEntity, IPaginatedPayload } from "@/shared/types/api";
import type z from "zod";
import type { adminDiplomaSchema, diplomaSearchFiltersSchema } from "../schemas/adminDiploma-schema";

export interface IAdminDiploma extends IEntity {
  title: string;
  description: string;
  image: string;
}

export interface IAdminDiplomaParams {
  page: number;
  limit: number;
  sortBy?: "title" | "createdAt";
  sortOrder?: "asc" | "desc";
  immutable?: boolean;
  search?: string;
}
export interface IAdminDiplomaDetailResponse {
  diploma: IAdminDiploma;
}

export type IAdminDiplomasResponse = IPaginatedPayload<IAdminDiploma>;

  export type DiplomaSearchFiltersValues = z.infer<typeof diplomaSearchFiltersSchema>;


  export type IAdminDiplomaFormValues = z.infer<typeof adminDiplomaSchema>;

  export interface IDeleteDiplomaResponse {
  message: string;
}
export interface ISetDiplomaImmutableRequest {
  immutable: boolean;
}