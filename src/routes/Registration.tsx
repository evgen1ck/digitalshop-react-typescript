import React from 'react';
import {Link} from "react-router-dom";

export default function Registration() {

    return (
        <div className="m-auto max-w-6xl">
            <div className="w-full my-16 mx-12 w-4/5">
                <div className="flex flex-wrap w-full">
                    <div className="text-center w-full">
                        <h3 className="text-4xl font-bold mb-12 uppercase">Регистрация</h3>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 lg:mb-0 lg:w-1/2">
                        <label className="block uppercase font-bold mb-2" htmlFor="grid-first-name">
                            Имя
                        </label>
                        <input className="block w-full py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Иван" />
                        <p className="text-error text-sm italic">Данные поля не могут быть пустыми</p>
                    </div>
                    <div className="w-full lg:w-1/2 px-3">
                        <label className="block uppercase font-bold mb-2" htmlFor="grid-last-name">
                            Фамилия
                        </label>
                        <input className="block w-full py-3 px-4 mb-3" id="grid-last-name" type="text" placeholder="Иванов" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase font-bold mb-2" htmlFor="grid-password">
                            Электронная почта
                        </label>
                        <input className="block w-full py-3 px-4 mb-3" id="grid-password" type="email" placeholder="ivan.ivanov@gmail.com" />
                        <p className="text-error italic text-sm ">Указанная почта уже зарегистрирована</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase font-bold mb-2" htmlFor="grid-password">
                            Пароль
                        </label>
                        <input className="block w-full py-3 px-4 mb-3" id="grid-password" type="password" placeholder="*************" />
                        <p className="text-error italic text-sm">Пароль должен содержать более 4 символов</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase font-bold mb-2" htmlFor="grid-password">
                            Повторите пароль
                        </label>
                        <input className="block w-full py-3 px-4 mb-3" id="grid-password" type="password" placeholder="*************" />
                        <p className="text-error italic text-sm">Введённые пароли не совпадают</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full lg:w-1/3 px-3 mb-6 lg:mb-0">
                        <label className="block uppercase font-bold mb-2" htmlFor="grid-city">
                            City
                        </label>
                        <input className="block w-full py-3 px-4 mb-3" id="grid-city" type="text" placeholder="Albuquerque" />
                    </div>
                    <div className="w-full lg:w-1/3 px-3 mb-6 lg:mb-0">
                        <label className="block uppercase font-bold mb-2" htmlFor="grid-state">
                            State
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state">
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 px-3 mb-6 lg:mb-0">
                        <label className="block uppercase text-gray-700 font-bold mb-2" htmlFor="grid-zip">
                            Zip
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-zip" type="text" placeholder="90210" />
                    </div>
                </div>
                <div className="flex flex-wrap mt-16 w-full">
                    <div className="text-center w-full">
                        <button type="submit" className="transition ease-in-out delay-50 hover:-translate-y-1 duration-300 inline-block outline hover:text-light-focusing dark:hover:text-dark-focusing px-6 py-2.5 text-2xl uppercase rounded shadow-md ">
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// lg:w-1/2 px-3 mb-6 lg:mb-0 m-auto w-full text-center flex-wrap