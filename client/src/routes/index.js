import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Login from '../pages/Login';
import DashboardHome from "../pages/Dashboard/DashboardHome";
import identityPath from "../utils/helpers/identityPath";
import PublicRoutes from "./PublicRoutes";
import RegisterHome from "../pages/Register/RegisterHome";
import AddExams from "../pages/Dashboard/doctor/AddExams";
import OpenExam from "../pages/Dashboard/doctor/OpenExam";
import StudentsData from "../pages/Dashboard/doctor/StudentsData";
import About from "../pages/About";
import { Suspense } from "react";

const Routes = () => {

    const { auth } = useSelector((state) => state);

    const publicRoutes = [
        {
            path: "/",
            element: <PublicRoutes />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/signup",
                    element: <RegisterHome />
                },
                {
                    path: "/auth/login",
                    element: <Login />
                },
                {
                    path: '/about',
                    element:
                        <Suspense fallback={false}>
                            <About />
                        </Suspense>
                }
            ]
        }
    ]

    const authenticatedRoutes = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: identityPath(auth.user_token, auth.user._id),
                    element: <DashboardHome />
                },
                {
                    path: `${identityPath(auth.user_token, auth.user._id)}/createExam`,
                    element: <AddExams />
                },
                {
                    path: `${identityPath(auth.user_token, auth.user._id)}/exam`,
                    element: <OpenExam />
                },
                {
                    path: `${identityPath(auth.user_token, auth.user._id)}/students-data`,
                    element: <StudentsData />
                }
            ]
        }
    ];

    const router = createBrowserRouter([
        ...publicRoutes,
        ...authenticatedRoutes
    ]);
    // , { basename: process.env.PUBLIC_URL }
    return <RouterProvider router={router} />

}

export default Routes


