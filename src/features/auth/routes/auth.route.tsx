import type { RouteObject } from "react-router";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import ForgotPasswordPage from "./pages/forgot-password-page";
import PasswordResetSentPage from "./pages/password-reset-sent-page";
import ResetPasswordPage from "./pages/reset-password-page";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <SignupPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "forgot-password/sent",
    element: <PasswordResetSentPage />,
  },
  {
    path: "reset-password",
    element: <ResetPasswordPage />,
  },
];
