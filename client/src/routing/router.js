import {createBrowserRouter, Navigate} from "react-router-dom";

import {MAIN_ROUTES} from "./mainRoutes";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

export const router = createBrowserRouter([
    {
        index: true,
        element: <Navigate to={MAIN_ROUTES.LOGIN}/>
    },
    {
        path: MAIN_ROUTES.LOGIN,
        element: <LoginPage/>,
    },
    {
        path: MAIN_ROUTES.SIGN_UP,
        element: <SignUpPage/>,
    }
]);