import { api } from "@/shared/lib/axios";
import type { IDiploma } from "../types/diploma";
import type { IPaginatedPayload, ISuccessResponse } from "@/shared/types/api";
import { DIPLOMA_ENDPOINT } from "./diploma.endpoint";

export async function getDiplomasApi(page: number) {
    const response = await api.get<ISuccessResponse<IPaginatedPayload<IDiploma>>>(DIPLOMA_ENDPOINT, { params: { page, limit:6 } });
    return response.data.payload;
}

