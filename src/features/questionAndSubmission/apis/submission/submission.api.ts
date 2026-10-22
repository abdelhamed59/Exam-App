import { api } from "@/shared/lib/axios";
import { SUBMISSION_ENDPOINT } from "./submission.endpoint";
import type { IPaginatedPayload, ISuccessResponse } from "@/shared/types/api";
import type {
  IGetSubmissionsParams,
  ISubmission,
  ISubmitExamRequest,
  ISubmitExamResponse,
} from "../../types/Submission";

export async function submitExamApi(values: ISubmitExamRequest) {
  const response = await api.post<ISuccessResponse<ISubmitExamResponse>>(SUBMISSION_ENDPOINT, values);
  return response.data.payload;
}

export async function getSubmissionApi(submissionId: string) {
  const response = await api.get<ISuccessResponse<ISubmitExamResponse>>(`${SUBMISSION_ENDPOINT}/${submissionId}`);
  return response.data.payload;
}

export async function getSubmissionsApi(params: IGetSubmissionsParams) {
  const response = await api.get<ISuccessResponse<IPaginatedPayload<ISubmission>>>(SUBMISSION_ENDPOINT, { params });
  return response.data.payload;
}