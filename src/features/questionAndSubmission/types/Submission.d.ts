import type { IAnswer } from "./question";

export interface ISubmittedAnswer {
  questionId: string;
  answerId: string;
}

export interface ISubmitExamRequest {
  examId: string;
  answers: ISubmittedAnswer[];
  startedAt: string;
}

export interface ISubmissionExamSummary {
  id: string;
  title: string;
  duration: number;
}

export interface ISubmission {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  exam: ISubmissionExamSummary;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubmissionAnalyticsItem {
  questionId: string;
  questionText: string;
  selectedAnswer: IAnswer;
  isCorrect: boolean;
  correctAnswer: IAnswer;
}

// Shape shared by both POST /api/submissions and GET /api/submissions/{id}
export interface ISubmitExamResponse {
  submission: ISubmission;
  analytics: ISubmissionAnalyticsItem[];
}

export interface IGetSubmissionsParams {
  examId?: string;
  page?: number;
  limit?: number;
  search?: string;
}

