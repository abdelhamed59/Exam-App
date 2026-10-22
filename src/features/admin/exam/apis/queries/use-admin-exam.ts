import { useQuery } from "@tanstack/react-query"
import { adminExamkey } from "../admin-exam.key"
import { getAdminExamByIdApi } from "../admin-exams.api"

export const useAdminExam=(id:string)=>{
    return useQuery({
        queryKey:adminExamkey.detail(id),
        queryFn:()=>getAdminExamByIdApi(id!),
        enabled:!!id
    })

}