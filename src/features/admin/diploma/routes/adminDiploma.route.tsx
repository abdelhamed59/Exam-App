import type { RouteObject } from "react-router";
import AdminDiplomasPage from "./pages/AdminDiplomasPage";
import AdminDiplomaPage from "./pages/AdminDiplomaPage";
import CreateAndUpdateDiploma from "./pages/CreateAndUpdateDiploma";


export const adminDiplomaRoutes: RouteObject[] = [
  {
    path: "diplomas",
    element: <AdminDiplomasPage />,
  },{
    path: "diplomas/:id",
    element: <AdminDiplomaPage />,
  },{
    path:"diplomas/create",
    element:<CreateAndUpdateDiploma/>
  },{
    path:"diplomas/update/:id",
    element:<CreateAndUpdateDiploma/>
  }

];