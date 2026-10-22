import { useQuery } from "@tanstack/react-query";
import { examQuestionsQueryOptions } from "../question.options";

export function useExamQuestions(examId:string) {

  return useQuery(examQuestionsQueryOptions(examId));
}