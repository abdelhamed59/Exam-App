import type { RouteObject } from "react-router";
import AdminQuestionView from "./pages/AdminQuestionView";
import AdminCreateAndUpdateQuestion from "./pages/AdminCreateAndUpdateQuestion";
import AdminAddBulkQuestions from "./pages/AdminAddBulkQuestions";

export const adminQuestionRoutes:RouteObject[]=[
    {
        path:"questions/:id",
        element:<AdminQuestionView/>
    },{
        path:"questions/exam/:examId/create",
        element:<AdminCreateAndUpdateQuestion/>
    },{
        path:"questions/:id/update",
        element:<AdminCreateAndUpdateQuestion/>
    },{
        path:"questions/exam/:examId/createbulk",
        element:<AdminAddBulkQuestions/>
    }
]