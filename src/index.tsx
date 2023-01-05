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
import Dashboard from './routes/Dashboard';
import NoMatch from './routes/NoMatch';

const router = createBrowserRouter (
    createRoutesFromElements (
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoMatch />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("application") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);