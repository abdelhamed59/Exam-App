import { type RouteObject } from "react-router";
import AuthLayout from "./features/auth/components/layout/auth-layout";
import { authRoutes } from "./features/auth/routes/auth.route";
import { diplomaRoutes } from "./features/diploma/routes/diploma.route";
import AuthGuard from "./features/auth/components/auth-guard";
import UserDashboardLayout from "./shared/components/user-dashboard/UserDashboardLayout";
import { examRoutes } from "./features/exam/routes/exam.route";
import { questionRoutes } from "./features/questionAndSubmission/routes/question.route";
import { userRoutes } from "./features/user/routes/user.route";
import AdminDashboardLayout from "./shared/components/admin-dashbord/AdminDashboardLayout";
import { adminDiplomaRoutes } from "./features/admin/diploma/routes/adminDiploma.route";
import { adminExamRoutes } from "./features/admin/exam/routes/adminExam.routes";
import { adminQuestionRoutes } from "./features/admin/question/routes/adminQuestion.routes";
import { auditLogRoutes } from "./features/admin/auditLog/routes/auditLog.routes";

export const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      // Authentication Routes
      {
        element: <AuthLayout />,
        children: authRoutes,
      },

      // User Routes
      {
        // Component: AuthGuard,
        element: <AuthGuard />,
         children: [
          {
            element: <UserDashboardLayout />,
            children: [ ...diplomaRoutes, ...examRoutes, ...questionRoutes,...userRoutes],
          },
        ],
      },
    ],
  },

  {
    path: "/dashboard",
      element: <AuthGuard />,
      children: [
        {
          element: <AdminDashboardLayout />,
          children: [...adminDiplomaRoutes,...adminExamRoutes,...adminQuestionRoutes,...auditLogRoutes],
        },
      ],
    },
];

// Authentication vs Authorization
