import { useInfiniteQuery } from "@tanstack/react-query";
import { examsInfiniteQueryOptions } from "../exam.options";
 export function useExams(diplomaId: string) {
    return useInfiniteQuery(examsInfiniteQueryOptions(diplomaId))
 }