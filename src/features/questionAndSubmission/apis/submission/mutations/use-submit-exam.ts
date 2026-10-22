import { useMutation } from "@tanstack/react-query";
import { submitExamApi } from "../submission.api";
import type { ISubmitExamRequest } from "@/features/questionAndSubmission/types/Submission";

export function useSubmitExam(){
    return useMutation({
        mutationFn:(values:ISubmitExamRequest)=>submitExamApi(values),
      
    })
}