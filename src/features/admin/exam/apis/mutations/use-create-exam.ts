import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createExamApi } from "../admin-exams.api";
import type { IAdminExamFormValues } from "../../types/admin-exam";
import { adminExamkey } from "../admin-exam.key";

export function useCreateExam(){
    const queryClint=useQueryClient()
    const navigate=useNavigate()
    return useMutation({
        mutationFn:(values:IAdminExamFormValues)=>createExamApi(values),
        onSuccess:()=>{
            queryClint.invalidateQueries({queryKey:adminExamkey.all})
            navigate("/dashboard/exams")
        }
    })
}