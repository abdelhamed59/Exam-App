import type { RouteObject } from "react-router";
import AdminExamsPage from "./pages/AdminExamsPage";
import AdminExamPage from "./pages/AdminExamPage";
import UpdateAndCreateExam from "./pages/UpdateAndCreateExam";

export const adminExamRoutes:RouteObject[]=[
    {
        path:"exams",
        element:<AdminExamsPage />
    },{
        path:"exams/:id",
        element:<AdminExamPage/>
    },{
        path:"exams/create",
        element:<UpdateAndCreateExam/>
    },{
        path:"exams/update/:id",
        element:<UpdateAndCreateExam/>
    }
]