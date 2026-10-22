import { useInfiniteQuery } from "@tanstack/react-query";
import { diplomasInfiniteQueryOptions } from "../diploma.options";

export function useDiplomas(){
    return useInfiniteQuery(diplomasInfiniteQueryOptions())
}