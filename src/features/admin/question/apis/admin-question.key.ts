import type { IAdminQuestionsParams } from "../types/admin-question";

export const adminQuestionkey={
    all:["admin-questions"] as const,
    list:(params:IAdminQuestionsParams)=>[...adminQuestionkey.all,params] as const,
    detail:(id: string)=> [...adminQuestionkey.all, "detail", id] as const,
}