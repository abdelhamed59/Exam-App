import { api } from "@/shared/lib/axios";
import type { IPaginatedPayload, ISuccessResponse } from "@/shared/types/api";
import type { IExam } from "../types/exam";
import { DEFAULT_LIMIT } from "@/shared/constants/api.constant";
import { EXAM_ENDPOINT } from "./exam.endpont";

export async function getDiplomaExamsApi(diplomaId: string, page: number) {
    const response = await api.get<ISuccessResponse<IPaginatedPayload<IExam>>>(`${EXAM_ENDPOINT}`, { params: { diplomaId, page, limit: DEFAULT_LIMIT } });
    return response.data.payload;

}