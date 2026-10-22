import type { IEntity, IPaginatedPayload } from "@/shared/types/api";
import type { adminExamSchema, examSearchFiltersSchema } from "../schemas/adminExam-schema";

export interface IAdminExam extends IEntity {
  title: string;
  description: string;
  image: string;
   duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma:{
    id: string;
  title: string;
  }
};
export interface IAdminExamDetailResponse {
  exam: IAdminExam;
}
export type IAdminExamsResponse = IPaginatedPayload<IAdminExam>;

export interface IAdminExamParams {
  page: number;
  limit: number;
  sortBy?: "title" | "createdAt" | "questions";
  sortOrder?: "asc" | "desc";
  immutable?: boolean;
  search?: string;
   diplomaId?: string;
}


export type examSearchFiltersValues = z.infer<typeof examSearchFiltersSchema>;

  export type IAdminExamFormValues = z.infer<typeof adminExamSchema>;


export interface IDeleteExamResponse {
  message: string;
}

export interface ISetExamImmutableRequest {
  immutable: boolean;
}
