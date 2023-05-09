import { RedirectTo } from "../utils/redirect"
import { NavigateFunction } from "react-router-dom"
import React, { createContext, ReactNode, useContext, useState } from "react"

interface IAuthContext {
    isLoggedIn: boolean
    role: string
    setAuthState: (isLoggedIn: boolean, role: string) => void
}

const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    role: "",
    setAuthState: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = (props: { children: ReactNode }) => {
    const { children } = props
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false)
    const [role, setRole] = useState<string>("")

    const setAuthState = (isLoggedIn: boolean, role: string) => {
        setLoggedIn(isLoggedIn)
        setRole(role)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, role, setAuthState }}>
            {children}
        </AuthContext.Provider>
    )
}

export const CreateUserAuth = (
    data: any,
    navigate: NavigateFunction,
    withRedirect: boolean,
    setAuthState: (isLoggedIn: boolean, role: string) => void) => {
    localStorage.setItem("token", data.token)
    localStorage.setItem("role", data.role)
    localStorage.setItem("uuid", data.uuid)
    localStorage.setItem("nickname", data.nickname)
    localStorage.setItem("email", data.email)
    localStorage.setItem("registration-method", data.registration_method)
    localStorage.setItem("avatar-url", data.avatar_url)

    setAuthState(true, data.role)

    withRedirect && RedirectTo("/", navigate, 5000)
}

export const CheckUserAuth = (setAuthState: (isLoggedIn: boolean, role: string) => void) => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    setAuthState(token !== null, role || "")
}

export const DeleteUserAuth = (
    navigate: NavigateFunction,
    withRedirect: boolean,
    setAuthState: (isLoggedIn: boolean, role: string) => void) => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("uuid")
    localStorage.removeItem("nickname")
    localStorage.removeItem("email")
    localStorage.removeItem("registration-method")
    localStorage.removeItem("avatar-url")

    setAuthState(false, "")

    withRedirect && RedirectTo("/", navigate, 100)
}
