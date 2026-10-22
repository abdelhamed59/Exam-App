import type { IEntity } from "@/shared/types/api";
import type z from "zod";
import type { adminBulkQuestionSchema, adminQuestionSchema } from "../schemas/adminQuestion.schema";

export interface IAdminAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IAdminQuestion extends IEntity {
  text: string;
  examId: string;
  answers: IAdminAnswer[];
  exam: {
    id: string;
    title: string;
  };
}

export interface IAdminQuestionsListResponse {
  questions: IAdminQuestion[];
}

export interface IAdminQuestionDetailResponse {
  question: IAdminQuestion;
}


export interface IAdminDeleteQuestionResponse {
  message: string;
}

export interface ISetQuestionImmutableRequest {
  immutable: boolean;
}

export interface IAdminQuestionsParams {
  sortBy?: "title" | "createdAt";
  sortOrder?: "asc" | "desc";
  immutable?: boolean;
  search?: string;
}


export type IAdminQuestionFormValues=z.infer<typeof adminQuestionSchema>
export type IAdminBulkQuestionFormValues = z.infer<typeof adminBulkQuestionSchema>;
