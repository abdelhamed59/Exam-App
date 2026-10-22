import type { RouteObject } from "react-router";
import QuestionPage from "./pages/QuestionPage";
import SubmissionPage from "./pages/SubmissionPage";

export const questionRoutes: RouteObject[] = [
  {
    path: "/questions/exam/:examId",
    element: <QuestionPage/>,
  },{
    path: "submissions/:submissionId",
    element: <SubmissionPage />
  }
];