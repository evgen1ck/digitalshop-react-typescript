import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";

import './index.css';
import Home from "./routes/Home";
import About from "./routes/About";
import RootLayout from "./layouts/RootLayout";
import NoMatch from './routes/NoMatch';
import Signup from './routes/Registration';
import Login from './routes/Login';

// import { useSelector } from "../../redux/store";
// import { Navigate, useLocation } from "react-router-dom";
//
// function ProtectedRoute(props: any) {
//     const { children } = props;
//     const location = useLocation();
//     const { isLoggedIn } = useSelector((store) => store.auth);
//
//     if (!isLoggedIn) {
//         return <Navigate to="/login" state={{ from: location }} />
//     }
//
//     return children;
// }

const router = createBrowserRouter (
    createRoutesFromElements (
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoMatch />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("application") as HTMLElement).render(
    <React.StrictMode>
        <div className="bg-light-main dark:bg-dark-main text-light-normal dark:text-dark-normal tracking-wide justify-between flex flex-col min-h-screen font-sans text-base font-medium antialiased transition-colors duration-300 ease-linear">
            <RouterProvider router={router} />
        </div>
    </React.StrictMode>
);