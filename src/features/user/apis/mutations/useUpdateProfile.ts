import { useMutation } from "@tanstack/react-query";
import type { IUpdateProfileRequest } from "../../types/user";
import { updateProfileApi } from "../user.api";

export function useUpdateProfile(){
    return useMutation({
        mutationFn:(values:IUpdateProfileRequest)=>updateProfileApi(values),
      
    })
}