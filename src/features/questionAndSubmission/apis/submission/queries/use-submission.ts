import { useQuery } from "@tanstack/react-query";
import { submissionQueryOptions } from "../submission.options";

export function useSubmission(submissionId: string) {
    return useQuery(submissionQueryOptions(submissionId))
}