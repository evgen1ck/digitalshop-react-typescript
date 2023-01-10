import React from 'react';
import { Link } from 'react-router-dom';
import { IMain, GetElementInput, GetSelect } from '../components/Inputs';

export default function Registration() {

    const initialFields: IMain[] = [
        {
            fields: [
                {
                    nameField: "Имя",
                    placeholder: "Иван",
                    id: "field-first-name",
                    type: "text",
                    elementType: "input",
                    hasWarnLabel: true,
                },
                {
                    nameField: "Фамилия",
                    placeholder: "Иванов",
                    id: "field-last-name",
                    type: "text",
                    elementType: "input",
                    hasWarnLabel: true,
                },
            ],
        },
        {
            fields: [
                {
                    nameField: "Электронная почта",
                    placeholder: "ivan.ivanov@email.ru",
                    id: "field-email",
                    type: "email",
                    elementType: "input",
                    hasWarnLabel: true,
                },
            ],
        },
        {
            fields: [
                {
                    nameField: "Пароль",
                    placeholder: "********",
                    id: "field-password",
                    type: "password",
                    elementType: "input",
                    hasWarnLabel: true,
                },
                {
                    nameField: "Повторите пароль",
                    placeholder: "********",
                    id: "field-repeat-password",
                    type: "password",
                    elementType: "input",
                    hasWarnLabel: false,
                },
            ],

        },
        {
            fields: [
                {
                    nameField: "Основная валюта",
                    placeholder: "none (its select)",
                    id: "field-currency",
                    type: "text",
                    elementType: "select",
                    hasWarnLabel: false,
                    selects: [
                        {
                            id: "rub",
                            value: "₽ - Русский рубль",
                        },
                        {
                            id: "usd",
                            value: "₸ - Казахстанский тенге",
                        },
                        {
                            id: "usd",
                            value: "$ - Доллар США",
                        },
                    ]
                }
            ],
        },
    ]

    return (
        <div className="w-full px-4 mx-auto max-w-6xl">
            <div className="lg:flex">
                <div className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
                    <div className="flex w-full">
                        <div className="flex-auto max-w-4xl min-w-0 my-12 pt-6 lg:px-8 lg:pt-8 pb:12 xl:pb-24 lg:pb-16 m-auto">
                            <div className="flex flex-wrap m-auto">
                                <div className="text-center w-full">
                                    <div className="text-center w-full">
                                        <h3 className="text-4xl font-bold mb-10 uppercase">Регистрация</h3>
                                    </div>
                                </div>
                            </div>
                            {initialFields && initialFields.map(({ fields}) => (
                                <div className="flex flex-wrap mb-4 m-auto">
                                    {fields && fields.map(field => (
                                        <div className="flex-grow mb-2 lg:mb-0 px-4">
                                            <label className="block uppercase font-bold mb-2" htmlFor={field.id.toString()}>
                                                {field.nameField}
                                            </label>

                                            {field.elementType === "input" ? GetElementInput(field) : GetSelect(field)}

                                            {field.hasWarnLabel ? <p className="text-light-second dark:text-dark-second text-sm italic invisible">test</p> : false }
                                        </div>
                                    ))}
                                </div>
                                )
                            )}
                            <div className="flex items-center">
                                <input id="link-checkbox" type="checkbox" value=""
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="link-checkbox"
                                           className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the
                                        <Link to="/" className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</Link>.
                                    </label>
                            </div>
                            <div className="flex flex-wrap mt-12 m-auto">
                                <div className="text-center w-full">
                                    <button type="submit" className="transition ease-in-out delay-50 hover:-translate-y-1 duration-300 inline-block outline hover:text-light-focusing dark:hover:text-dark-focusing px-6 py-2.5 text-2xl uppercase rounded shadow-md ">
                                        Зарегистрироваться
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}