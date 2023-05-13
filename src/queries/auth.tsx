import UseHttpErrorsHandler from "../utils/httpResponds" 
import {toast} from "react-hot-toast" 
import {AppUrl, UnknownError} from "../storage/defs"
import React from "react" 
import {NavigateFunction} from "react-router-dom"

const authSignupUrl = AppUrl+"auth/signup"
const authSignupWithTokenUrl = AppUrl+"auth/signup-with-token"
const authLoginUrl = AppUrl+"auth/login"
const authLogoutUrl = AppUrl+"user/logout"
const authAlogin = AppUrl+"auth/alogin"

interface AuthSignup {
    nickname: string
    email: string
    password: string
    setEmailError: React.Dispatch<React.SetStateAction<string>>
    setNicknameError: React.Dispatch<React.SetStateAction<string>>
    navigate: NavigateFunction
}

export const AuthSignupQuery = async ({nickname, email, password, setEmailError, setNicknameError, navigate}: AuthSignup) => {
    const requestBody = {
        nickname: nickname,
        email: email,
        password: password,
    }

    try {
        const response = await fetch(authSignupUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
            const data = await response.json()
            switch (true) {
                case data.description.toLowerCase().includes("this nickname is already in use".toLowerCase()):
                    setNicknameError('Псевдоним уже используется')
                    return
                case data.description.toLowerCase().includes("the email domain is not exist".toLowerCase()):
                    setEmailError('Домена электронной почты не существует')
                    return
                case data.description.toLowerCase().includes("this email is already in use".toLowerCase()):
                    setEmailError('Электронная почта уже используется')
                    return
            }
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        navigate('/completion-of-signup', { state: { email: email } })
    } catch (error) {
        toast.error(UnknownError)
        console.error("Error fetching data: ", error)
    }
}

interface AuthSignupWithToken {
    token: string
    signal: AbortSignal
    navigate: NavigateFunction
}

export const AuthSignupWithTokenQuery = async ({token, signal, navigate}: AuthSignupWithToken) => {
    const requestBody = {
        token: token,
    }

    try {
        const response = await fetch(authSignupWithTokenUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            signal: signal,
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        return await response.json()
    } catch {}
}

interface AuthLogin {
    login: string
    password: string
    setLoginError: React.Dispatch<React.SetStateAction<string>>
    setPasswordError: React.Dispatch<React.SetStateAction<string>>
    navigate: NavigateFunction
}

export const AuthLoginQuery = async ({login, password, setLoginError, setPasswordError, navigate}: AuthLogin) => {
    let nickname, email: string
    if (login.includes('@')) {
        nickname = ""
        email = login
    } else {
        nickname = login
        email = ""
    }
    const requestBody = {
        nickname: nickname,
        email: email,
        password: password,
    }

    try {
        const response = await fetch(authLoginUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })

        const data = await response.json()

        if (!response.ok) {
            switch (true) {
                case data.description.toLowerCase().includes("invalid password".toLowerCase()):
                    setPasswordError('Неверный пароль')
                    return
                case data.description.toLowerCase().includes("user with this email was not found".toLowerCase()):
                    setLoginError('Аккаунта с этой электронной почтой не существует')
                    return
                case data.description.toLowerCase().includes("user with this nickname was not found".toLowerCase()):
                    setLoginError('Аккаунта с этим псевдонимом не существует')
                    return
                case data.description.toLowerCase().includes("the email domain is not exist".toLowerCase()):
                    setLoginError('Домена электронной почты не существует')
                    return
                case data.description.toLowerCase().includes("account has been blocked".toLowerCase()):
                    setPasswordError('Аккаунт заблокирован')
                    return
                case data.description.toLowerCase().includes("account has been deleted".toLowerCase()):
                    setPasswordError('Аккаунт был удалён')
                    return
            }
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        toast.success("Успешная авторизация")
        return data
    } catch (error) {
        toast.error(UnknownError)
        console.error("Error fetching data: ", error)
    }
}

interface AuthLogout {
    token: string
    navigate: NavigateFunction
}

export const AuthLogoutQuery = async ({token, navigate}: AuthLogout) => {
    try {
        const response = await fetch(authLogoutUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }) 

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        toast.success("Успешный выход")
    } catch (error) {
        toast.error(UnknownError)
        console.error("Error fetching data: ", error)
    }
}

interface AuthLogin {
    login: string
    password: string
    setLoginError: React.Dispatch<React.SetStateAction<string>>
    setPasswordError: React.Dispatch<React.SetStateAction<string>>
    navigate: NavigateFunction
}

export const AuthAloginQuery = async ({login, password, setLoginError, setPasswordError, navigate}: AuthLogin) => {
    const requestBody = {
        login: login,
        password: password,
    }

    try {
        const response = await fetch(authAlogin, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })

        const data = await response.json()

        if (!response.ok) {
            switch (true) {
                case data.description.toLowerCase().includes("invalid password".toLowerCase()):
                    setPasswordError('Неверный пароль')
                    return
                case data.description.toLowerCase().includes("admin with this login was not found".toLowerCase()):
                    setLoginError('Аккаунта с этим логином не существует')
                    return
                case data.description.toLowerCase().includes("the email domain is not exist".toLowerCase()):
                    setLoginError('Домена электронной почты не существует')
                    return
                case data.description.toLowerCase().includes("account has been blocked".toLowerCase()):
                    setPasswordError('Аккаунт заблокирован')
                    return
                case data.description.toLowerCase().includes("account has been deleted".toLowerCase()):
                    setPasswordError('Аккаунт был удалён')
                    return
            }
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        toast.success("Успешная авторизация")
        return data
    } catch (error) {
        toast.error(UnknownError)
        console.error("Error fetching data: ", error)
    }
}