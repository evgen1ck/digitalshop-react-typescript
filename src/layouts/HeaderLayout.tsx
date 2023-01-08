import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

export default function HeaderLayout() {

    interface ILink {
        name: string
        link: string
    }
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

    return (
        <>
            <div className="bg-light-additional dark:bg-dark-additional">
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
                                    <Link to={link.link} key={link.name} className="hover:border-b-2 transition ease-in-out delay-50 hover:-translate-y-1 duration-300 hover:text-light-focusing dark:hover:text-dark-focusing block lg:inline-block lg:mt-0 ml-4 font-medium">
                                        {link.name}
                                    </Link>

                                )})
                            }
                        </div>
                        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            <div className="lg:flex-grow">
                                <Link to="/registration" className="hover:border-b-2 transition ease-in-out delay-50 hover:-translate-y-1 duration-300 hover:text-light-focusing dark:hover:text-dark-focusing block lg:inline-block py-2 font-medium uppercase max-w-md:hidden inline-block text-sm mx-4 leading-none mt-4 lg:mt-0">
                                    Зарегистрироваться
                                </Link>
                                <Link to="/authorization" className="transition ease-in-out delay-50 hover:-translate-y-1 duration-300 hover:text-light-focusing dark:hover:text-dark-focusing block lg:inline-block py-2 font-medium uppercase max-w-md:hidden inline-block px-4 leading-none shadow border-2 rounded mt-4 lg:mt-0">
                                    Войти
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <Outlet />
        </>
    );
}