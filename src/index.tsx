import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements, Navigate,
    Route,
    RouterProvider, useLocation
} from 'react-router-dom';
import './index.css';
import Home from './routes/Home';
import RootLayout from './layouts/RootLayout';
import NoMatch from './routes/NoMatch';
import Signup from './routes/Signup';
import Login from './routes/Login';
import CompletionOfSignup from "./routes/CompletionOfSignup";
import ConfirmSignup from "./routes/ConfirmSignup";
import {AuthProvider} from "./storage/auth";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("token");

    if (isLoggedIn != null) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children;
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="completion-of-signup" element={<CompletionOfSignup />} />
            <Route path="confirm-signup" element={<ConfirmSignup />} />
            <Route path="*" element={<NoMatch />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <div className="bg-light-main dark:bg-dark-main text-light-normal dark:text-dark-normal tracking-wide justify-between flex flex-col min-h-screen font-sans text-base font-medium antialiased transition-colors duration-300 ease-linear">
                <RouterProvider router={router} />
            </div>
        </AuthProvider>
    </React.StrictMode>
);