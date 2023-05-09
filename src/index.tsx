import React, {ReactNode} from 'react' 
import ReactDOM from 'react-dom/client' 
import {
    createBrowserRouter,
    createRoutesFromElements, Navigate,
    Route,
    RouterProvider, useLocation
} from 'react-router-dom' 
import './index.css' 
import Home from './routes/Home' 
import RootLayout from './layouts/RootLayout' 
import NoMatch from './routes/NoMatch' 
import Signup from './routes/Signup' 
import Login from './routes/Login' 
import CompletionOfSignup from "./routes/CompletionOfSignup" 
import ConfirmSignup from "./routes/ConfirmSignup" 
import {AuthProvider, useAuthContext} from "./storage/auth"
import Profile from "./routes/Profile"
import AdminProducts from "./routes/AdminProducts"

const AuthProtectedRoute = (props: { children: ReactNode, accountRole: string }) => {
    const { children, accountRole } = props
    const location = useLocation()
    const { isLoggedIn, role } = useAuthContext()

    console.log(accountRole + " 11 " + role)
    let redirectTo = accountRole === "user" ? "/login" : "/alogin"

    if (!isLoggedIn || role != accountRole) return <Navigate to={redirectTo} state={{ from: location }} />
    return <>{children}</>
}

const NoAgainAuth = (props: { children: ReactNode }) => {
    const { children } = props
    const location = useLocation()
    const { isLoggedIn } = useAuthContext()

    if (isLoggedIn) return <Navigate to="/" state={{ from: location }} />
    return <>{children}</>
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<NoAgainAuth> <Login/> </NoAgainAuth>} />
            <Route path="signup" element={<NoAgainAuth> <Signup /> </NoAgainAuth>} />
            <Route path="completion-of-signup" element={<NoAgainAuth> <CompletionOfSignup /> </NoAgainAuth>} />
            <Route path="confirm-signup" element={<NoAgainAuth> <ConfirmSignup /> </NoAgainAuth>} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin/product" element={<AdminProducts />} />
            <Route path="*" element={<NoMatch />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <div className="z-100 bg-light-main dark:bg-dark-main text-light-normal dark:text-dark-normal tracking-wide justify-between flex flex-col min-h-screen font-sans sm:text-base text-sm font-medium antialiased transition-colors duration-300 ease-linear break-words">
                <RouterProvider router={router} />
            </div>
        </AuthProvider>
    </React.StrictMode>
) 