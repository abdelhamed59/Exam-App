import type { IAdminExamParams } from "../types/admin-exam";

export const adminExamkey={
    all:["admin-exams"] as const,
    list:(params:IAdminExamParams)=>[...adminExamkey.all,params] as const,
    detail:(id: string)=> [...adminExamkey.all, "detail", id] as const,
}