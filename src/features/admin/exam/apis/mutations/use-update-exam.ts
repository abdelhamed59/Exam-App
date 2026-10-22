import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { IAdminExamFormValues } from "../../types/admin-exam";
import { updateExamApi } from "../admin-exams.api";
import { adminExamkey } from "../admin-exam.key";

export function useUpdateExam(id:string){
    const queryClint=useQueryClient()
    const navigate=useNavigate()
    return useMutation({
        mutationFn:(values:IAdminExamFormValues)=> updateExamApi(id,values),
        onSuccess:()=>{
            queryClint.invalidateQueries({queryKey:adminExamkey.all})
            navigate("/dashboard/exams")
        }
    })
}