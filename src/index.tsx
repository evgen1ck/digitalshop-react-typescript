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
import RootLayout from "./layouts/HeaderLayout";
import Dashboard from './routes/Dashboard';
import NoMatch from './routes/NoMatch';
import FooterLayout from './layouts/FooterLayout';

const router = createBrowserRouter (
    createRoutesFromElements (
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route id="dashboard" path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoMatch />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("application") as HTMLElement).render(
    <React.StrictMode>
        <div className="bg-light-main dark:bg-dark-main text-light-normal dark:text-dark-normal flex flex-col min-h-screen justify-between font-sans text-base">
            <RouterProvider router={router} />
            <FooterLayout />
        </div>
    </React.StrictMode>
);