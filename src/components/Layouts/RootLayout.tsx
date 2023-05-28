import React, { useState } from "react" 
import {Outlet, Link, useNavigate} from "react-router-dom" 
import SwitchTheme from "../../storage/switchTheme"
import {Toaster} from "react-hot-toast"
import {CheckUserAuth, DeleteUserAuth, useAuthContext} from "../../storage/auth"
import {AuthLogoutQuery} from "../../queries/auth"

interface ILink {
    name: string
    link: string
}

export default function RootLayout() {
    const { role } = useAuthContext()

    const initialLinks: ILink[] = [
        {
            name: "Главная",
            link: "/"
        },
        {
            name: "Ничего",
            link: "nothing"
        },
        {
            name: "Тоже ничего",
            link: "nothing"
        },
        {
            name: "Тут тоже",
            link: "nothing"
        }
    ]
    const navigate = useNavigate()
    const [links] = useState(initialLinks)
    const { isDarkMode, toggleDarkMode } = SwitchTheme()
    const { isLoggedIn, setAuthState } = useAuthContext()
    CheckUserAuth(setAuthState)

    const [isSubmitting, setIsSubmitting] = useState(false) 

    function handleLogoutClick() {
        setIsSubmitting(true)
        AuthLogoutQuery({
            token: localStorage.getItem("token") || "",
            navigate: navigate,
            role: role,
        }).then(_ => {
            DeleteUserAuth(navigate, true, setAuthState)
            setIsSubmitting(false)
        }).catch(_ => {
            setIsSubmitting(false)
        })
    }

    return (
        <>
            <header className="bg-light-additional dark:bg-dark-additional top-0 flex-none w-full mx-auto shadow-md select-none">
                <nav className="flex items-center justify-between flex-wrap p-6 max-w-6xl m-auto">
                    <div className="flex items-center flex-shrink-0 mr-6">
                        <Link to="/" className="hover:text-light-focusing dark:hover:text-dark-focusing">
                            <span className="font-semibold sm:text-2xl text-xl tracking-tight uppercase">Evgenick's digitals</span>
                        </Link>
                    </div>
                    <div className="block lg:hidden">
                        <button className="flex items-center px-3 py-2 border rounded">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="lg:flex-grow">
                            {links.map(link => {
                                return (
                                    <Link to={link.link} key={link.name} className="btn-classic block lg:inline-block lg:mt-0 ml-4">
                                        {link.name}
                                    </Link>
                                )})
                            }
                        </div>
                        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            <div className="lg:flex-grow">
                                {!isLoggedIn && (
                                    <div className="flex justify-end items-center">
                                        <Link to="/signup" className="btn-classic block lg:inline-block lg:mt-0 ml-4 mr-6">
                                            Зарегистрироваться
                                        </Link>
                                        <Link to="/login" className="btn-classic-frame bg-light-additional dark:bg-dark-additional block lg:inline-block py-2 uppercase max-w-md:hidden inline-block px-4 mt-4 lg:mt-0">
                                            Войти
                                        </Link>
                                    </div>
                                )}
                                {isLoggedIn && (
                                    <div className="flex justify-end items-center">
                                        {role == "user" && (
                                            <Link to="/profile" className="btn-classic block lg:inline-block lg:mt-0 ml-4 mr-6">
                                                Профиль аккаунта
                                            </Link>
                                        )}
                                        <button className="btn-classic-frame bg-light-additional dark:bg-dark-additional block lg:inline-block py-2 uppercase max-w-md:hidden inline-block px-4 mt-4 lg:mt-0"
                                                onClick={handleLogoutClick}
                                                disabled={isSubmitting}>
                                            Выйти
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="w-full px-4 py-6 mx-auto max-w-7xl">
                <div className="lg:flex">
                    <div className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
                        <div className="flex w-full">
                            <div className="flex-auto min-w-0 lg:my-12 lg:px-8 m-auto ">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-light-additional dark:bg-dark-additional py-6 sm:text-sm text-xs drop-shadow-sm select-none">
                <div className="w-full px-6 mx-auto max-w-6xl lg:justify-between lg:flex flex-wrap grid text-center lg:space-y-0 space-y-2">
                    <span>
                        <Link to="/" className="hover:underline uppercase ">Evgenick's digitals</Link> © Copyright {new Date().getFullYear()}
                    </span>
                    <span>
                        Telegram:{' '}
                        <a href={"https://t.me/evgen1ck"} className={"hover:underline"}>@evgen1ck</a>
                        <a> | </a>
                        <a>Сделано </a><a href="https://helloworld.evgenick.com" className="hover:underline">Кочетковым Евгением</a>
                        <a> | </a>
                        <a href="https://docs.digitalshop.evgenick.com" className="hover:underline">Документация</a>
                        <a> | </a>
                        <button onClick={() => toggleDarkMode()} className="hover:underline">
                            {isDarkMode ? "Светлая тема" : "Тёмная тема"}
                        </button>
                    </span>
                </div>
            </footer>

            <Toaster
                position="bottom-right"
                reverseOrder={true}
            />
        </>
    ) 
}

