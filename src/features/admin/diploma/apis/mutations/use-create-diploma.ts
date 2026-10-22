import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IAdminDiplomaFormValues } from "../../types/admin-diploma";
import { createDiplomaApi } from "../admin-diplomas.api";
import { adminDiplomaKey } from "../admin-diploma.key";
import { useNavigate } from "react-router";

export function useCreateDiploma(){
const queryClint=useQueryClient()
const navigate=useNavigate()
    return useMutation({
        mutationFn:(value:IAdminDiplomaFormValues)=>createDiplomaApi(value),
        onSuccess:()=>{queryClint.invalidateQueries({queryKey:adminDiplomaKey.all});
        navigate("/dashboard/diplomas")
                  }
    })
}