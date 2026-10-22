import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../upload.api";

export function useUploadImage(){
    return useMutation({
        mutationFn: (file:File)=>uploadImage(file),
    })
}
