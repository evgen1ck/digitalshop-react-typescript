import React, {ReactNode} from "react" 
import ReactDOM from "react-dom/client" 
import {
    createBrowserRouter,
    createRoutesFromElements, Navigate,
    Route,
    RouterProvider, useLocation
} from "react-router-dom" 
import "./index.css" 
import RootLayout from "./components/Layouts/RootLayout"
import NoMatch from "./routes/NoMatch" 
import Signup from "./routes/Signup" 
import Login from "./routes/Login" 
import CompletionOfSignup from "./routes/CompletionOfSignup" 
import ConfirmSignup from "./routes/ConfirmSignup" 
import {AuthProvider, useAuthContext} from "./storage/auth"
import Profile from "./routes/Profile"
import AdminProductsAdd from "./routes/admin/AdminProductsAdd"
import Forbidden from "./routes/Forbidden"
import CompletingOrder from "./routes/CompletingOrder"
import AdminProducts from "./routes/admin/AdminProducts"
import Alogin from "./routes/Alogin"
import AdminProductsEdit from "./routes/admin/AdminProductEdit"
import Home from "./routes/Home"

// const AuthProtectedRoute = (props: { children: ReactNode, accountRole: string }) => {
//     const { children, accountRole } = props
//     const location = useLocation()
//     const { isLoggedIn, role } = useAuthContext()
//
//     if (!isLoggedIn && accountRole == "user") {
//         return <Navigate to="/login" state={{ from: location }} />
//     } else if (!isLoggedIn && accountRole == "admin") {
//         return <Navigate to="/alogin" state={{ from: location }} />
//     } else if (isLoggedIn && accountRole != role) {
//         return <Navigate to="/forbidden" state={{ from: location }} />
//     }
//
//     return <>{children}</>
// }

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
            <Route path="alogin" element={<NoAgainAuth> <Alogin/> </NoAgainAuth>} />
            <Route path="signup" element={<NoAgainAuth> <Signup /> </NoAgainAuth>} />
            <Route path="completion-of-signup" element={<NoAgainAuth> <CompletionOfSignup /> </NoAgainAuth>} />
            <Route path="confirm-signup" element={<NoAgainAuth> <ConfirmSignup /> </NoAgainAuth>} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/products/edit" element={<AdminProductsEdit />} />
            <Route path="admin/products/add" element={<AdminProductsAdd />} />
            <Route path="forbidden" element={<Forbidden />} />
            <Route path="finish" element={<CompletingOrder />} />
            <Route path="*" element={<NoMatch />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <div className="z-100 bg-light-main dark:bg-dark-main text-light-normal dark:text-dark-normal tracking-wide justify-between flex flex-col min-h-screen font-sans sm:text-base text-sm font-medium antialiased transition-colors duration-300 ease-linear break-words">
                <RouterProvider router={router} />
            </div>
        </AuthProvider>
    </React.StrictMode>
) 