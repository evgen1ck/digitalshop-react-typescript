import {RedirectTo} from "../utils/redirect";
import {NavigateFunction} from "react-router-dom";
import React, {createContext, ReactNode, useContext, useState} from "react";

export const CreateUserAuth = (data: any, navigate: NavigateFunction, withRedirect: boolean, setLoggedIn: (value: boolean) => void) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    localStorage.setItem('uuid', data.uuid)
    localStorage.setItem('nickname', data.nickname)
    localStorage.setItem('email', data.email)
    localStorage.setItem('registration-method', data.registration_method)
    localStorage.setItem('avatar-url', data.avatar_url)

    setLoggedIn(true);

    withRedirect && RedirectTo('/', navigate, 100)
}

export const CheckUserAuth = (setLoggedIn: (value: boolean) => void) => {
    setLoggedIn(localStorage.getItem('token') !== null)
};


export const DeleteUserAuth = (navigate: NavigateFunction, withRedirect: boolean, setLoggedIn: (value: boolean) => void) => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('uuid')
    localStorage.removeItem('nickname')
    localStorage.removeItem('email')
    localStorage.removeItem('registration-method')
    localStorage.removeItem('avatar-url')

    setLoggedIn(false)

    withRedirect && RedirectTo('/', navigate, 100)
}

interface IAuthContext {
    isLoggedIn: boolean;
    setLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    setLoggedIn: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};