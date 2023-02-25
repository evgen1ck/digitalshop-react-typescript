import React, {useEffect, useState} from 'react';
import Select from "react-select";
import OptionTypeBase from "react-select";
import { Outlet, Link } from "react-router-dom";
import {ILink} from "../models/SystemInterfaces";

export default function RootLayout() {

    const initialLinks: ILink[] = [
        {
            name: 'Главная',
            link: '/'
        },
        {
            name: 'Новости',
            link: 'news'
        },
        {
            name: 'Поддержка',
            link: 'support'
        },
        {
            name: 'О нас',
            link: 'about'
        }
    ]
    const [links] = useState(initialLinks)

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem(
        'color-theme',
        localStorage.getItem('color-theme') === 'dark' || (!localStorage.getItem('color-theme') && prefersDark)
            ? 'dark'
            : 'light'
    );

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('color-theme') === 'dark')
    useEffect(() => {
        const currentMode = localStorage.getItem('color-theme');
        if (currentMode === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);
    const handleModeChange = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            localStorage.setItem('color-theme', 'light');
            document.documentElement.classList.remove('dark')
        } else {
            localStorage.setItem('color-theme', 'dark');
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <>
            <header className="bg-light-additional dark:bg-dark-additional top-0 z-40 flex-none w-full mx-auto shadow-md">
                <nav className="flex items-center justify-between flex-wrap p-6 max-w-6xl m-auto">
                    <div className="flex items-center flex-shrink-0 mr-6">
                        <Link to="/" className="hover:text-light-focusing dark:hover:text-dark-focusing">
                            <span className="font-semibold text-2xl tracking-tight uppercase">Evgenick's digitals</span>
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
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ">
                        <div className="lg:flex-grow">
                            {links.map(link => {
                                return (
                                    <Link to={link.link} key={link.name} className="btn-classic select-none block lg:inline-block lg:mt-0 ml-4">
                                        {link.name}
                                    </Link>
                                )})
                            }
                        </div>
                        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            <div className="lg:flex-grow">
                                <Link to="/signup" className="btn-classic select-none block lg:inline-block lg:mt-0 ml-4 mr-6">
                                    Зарегистрироваться
                                </Link>
                                <Link to="/login" className="btn-classic-frame select-none bg-light-additional dark:bg-dark-additional block lg:inline-block py-2 uppercase max-w-md:hidden inline-block px-4 mt-4 lg:mt-0">
                                    Войти
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="w-full px-4 mx-auto max-w-6xl">
                <div className="lg:flex">
                    <div className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
                        <div className="flex w-full">
                            <div className="flex-auto max-w-4xl min-w-0 lg:my-12 lg:px-8 m-auto">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-light-additional dark:bg-dark-additional py-6 text-sm drop-shadow-sm">
                <div className="w-full px-6 mx-auto max-w-6xl lg:justify-between lg:flex flex-wrap grid text-center lg:space-y-0 space-y-2">
                    <span>
                        <Link to="/" className="hover:underline uppercase">Evgenick's digitals</Link> © Copyright {new Date().getFullYear()}
                    </span>
                    <span>
                        <a>Сделано </a><a href="https://helloworld.evgenick.com" className="hover:underline">Кочетковым Евгением</a>
                        <a> | </a>
                        <a href="https://docs.digitalshop.evgenick.com" className="hover:underline">Документация</a>
                        <a> | </a>
                        <button onClick={() => handleModeChange()} className="hover:underline">
                            {isDarkMode ? "Светлая тема" : "Тёмная тема"}
                        </button>
                    </span>
                </div>
            </footer>
        </>
    );
}