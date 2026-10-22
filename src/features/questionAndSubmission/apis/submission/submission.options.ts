import { queryOptions } from "@tanstack/react-query"
import { submissionKeys } from "./submission.key"
import { getSubmissionApi } from "./submission.api"

export const submissionQueryOptions=(submissionId: string)=>
queryOptions({
    queryKey:submissionKeys.submissins(submissionId),
    queryFn:()=> getSubmissionApi(submissionId),
    enabled:!!submissionId
})
