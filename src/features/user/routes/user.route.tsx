import type { RouteObject } from "react-router";
import UserPage from "./pages/UserPage";
import Porfile from "../components/Porfile";
import ChangePassword from "../components/ChangePassword";

export const userRoutes:RouteObject[]=[
    {
        path:"account",
        element:<UserPage/>,
        children:[{
            index:true,
            element:<Porfile/>
        },{
            path:"changePassword",
            element:<ChangePassword/>
        }]
    }
]