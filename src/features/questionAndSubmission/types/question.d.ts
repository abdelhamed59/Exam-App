import type { IExam } from "@/features/exam/types/exam";
import type { IEntity } from "@/shared/types/api";

export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IQuestion extends IEntity {
  text: string;
  examId: string;
  answers: IAnswer[];
  exam: Pick<IExam,"id"|"title">
}

// GET /api/questions/exam/{examId} — plain array under "questions", no pagination
export interface IExamQuestionsPayload {
  questions: IQuestion[];
}