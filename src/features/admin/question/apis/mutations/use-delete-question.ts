import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminQuestionApi } from "../admin-questions.api";
import { adminQuestionkey } from "../admin-question.key";

export function useDeleteQuestion(){
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:(id:string)=>deleteAdminQuestionApi(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:adminQuestionkey.all})
        }
    })
}