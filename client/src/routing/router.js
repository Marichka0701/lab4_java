import {createBrowserRouter, Navigate} from "react-router-dom";

import {MAIN_ROUTES} from "./mainRoutes";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import MainPage from "../pages/MainPage/MainPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import DetailedPizzaItem from "../components/DetailedPizzaItem/DetailedPizzaItem";

const isUser = JSON.parse(localStorage?.getItem('token'));

export const router = createBrowserRouter([
    {
        index: true,
        element: isUser ? <Navigate to={MAIN_ROUTES.MAIN}/> : <Navigate to={MAIN_ROUTES.LOGIN}/>
    },
    {
        path: MAIN_ROUTES.LOGIN,
        element: <LoginPage/>,
    },
    {
        path: MAIN_ROUTES.SIGN_UP,
        element: <SignUpPage/>,
    },
    {
        path: MAIN_ROUTES.MAIN,
        element: <MainPage/>,
    },
    {
        path: MAIN_ROUTES.SETTINGS,
        element: <SettingsPage/>,
    },
    {
        path: `${MAIN_ROUTES.DETAILED_INFO_PIZZA}/:id`,
        element: <DetailedPizzaItem/>,
    },
]);