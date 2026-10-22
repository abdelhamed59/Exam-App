import { useQuery } from "@tanstack/react-query";
import { adminQuestionkey } from "../admin-question.key";
import { getAdminQuestionDetailsApi } from "../admin-questions.api";

export function useAdminQuestion(id:string){
    return useQuery({
        queryKey:adminQuestionkey.detail(id),
        queryFn:()=>getAdminQuestionDetailsApi(id),
        enabled:!!id
    })
}