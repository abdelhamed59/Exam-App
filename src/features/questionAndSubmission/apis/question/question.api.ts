import { api } from "@/shared/lib/axios";
import type { ISuccessResponse } from "@/shared/types/api";
import type { IExamQuestionsPayload } from "../../types/question";
import { QUESTION_ENDPOINT } from "./question.endpoint";

export async function getExamQuestionsApi(examId: string) {
  const response = await api.get<ISuccessResponse<IExamQuestionsPayload>>(`${QUESTION_ENDPOINT}/exam/${examId}`);

  return response.data.payload;
}