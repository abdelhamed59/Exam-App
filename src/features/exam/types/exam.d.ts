import type { IDiploma } from "@/features/diploma/types/diploma";

export interface IExam{
        id: string,
        title: string,
        description: string,
        image: string,
        duration: number,
        questionsCount: number,
        diplomaId: string,
        diploma:Pick<IDiploma, "id" | "title" >
    }