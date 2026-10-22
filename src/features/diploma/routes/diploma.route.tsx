import type { RouteObject } from "react-router";
import DiplomaPage from "./pages/diploma-page";

export const diplomaRoutes: RouteObject[] = [
  {
    index: true,
    element: <DiplomaPage />,
  },
];
