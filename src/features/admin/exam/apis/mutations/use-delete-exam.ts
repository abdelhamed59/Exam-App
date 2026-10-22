import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletExamApi } from "../admin-exams.api"
import { adminExamkey } from "../admin-exam.key"

export const useDeleteExam=()=>{
    const queryClint=useQueryClient()
    return useMutation({
        mutationFn:(id:string)=>deletExamApi(id),
        onSuccess:()=>queryClint.invalidateQueries({queryKey:adminExamkey.all})

    })
}