import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout";

import Login from "./pages/Login";
import Home, { loader as HomeLoader } from "./pages/Home"

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },
        ]
    },

    {
        path: '/home',
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: HomeLoader
            }
        ]
    }
]);

export default router