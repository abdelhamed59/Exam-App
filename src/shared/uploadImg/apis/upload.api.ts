import { api } from "@/shared/lib/axios";
import type { IUploadResponse } from "../types/upload";
import { UPLOAD_ENDPOINT } from "./upload.endpoint";
import type { ISuccessResponse } from "@/shared/types/api";

export async function uploadImage(file:File){
    const formData=new FormData();
    formData.append("image", file);

    const response=await api.post<ISuccessResponse<IUploadResponse>>(UPLOAD_ENDPOINT,formData,{
        headers:{"Content-Type":"multipart/form-data"}
    })

    return response.data.payload;
}