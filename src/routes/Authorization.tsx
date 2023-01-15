import {MyControls, IMain } from "../components/Controls";
import {Link} from "react-router-dom";
import React, { useState } from "react";

export default function Authorization() {

    const initialFields: IMain[] = [
        {
            fields: [
                {
                    nameField: "Электронная почта",
                    placeholder: "ivan.ivanov@mail.ru",
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
            ],
        },
    ]

    const [checked, setChecked] = useState(true);

    return (
        <div className="w-full px-4 mx-auto max-w-6xl">
            <div className="lg:flex">
                <div className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
                    <div className="flex w-full">
                        <div className="flex-auto max-w-4xl min-w-0 my-12 pt-6 lg:px-8 lg:pt-8 pb:12 xl:pb-24 lg:pb-16 m-auto">
                            <div className="flex flex-wrap m-auto">
                                <div className="text-center w-full">
                                    <div className="text-center w-full">
                                        <h3 className="text-4xl font-bold mb-10 uppercase">Авторизация</h3>
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

                                                {field.elementType === "input" ? MyControls.Input(field) : MyControls.Select(field)}

                                                {field.hasWarnLabel ? <p className="text-light-second dark:text-dark-second text-sm italic invisible">test</p> : false }
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            <div className="flex items-center px-4 ">
                                <div className="module-classic">
                                    <input id="field-save-password" type="checkbox" className="checkbox-classic w-5 h-5"
                                           checked={checked} onChange={() => setChecked(!checked)} />
                                    <label htmlFor="field-save-password" className="select-none cursor-pointer ml-2 text-sm">
                                        Запомнить пароль
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-wrap mt-12 m-auto">
                                <div className="text-center w-full">
                                    <button type="submit" className="btn-classic-frame select-none px-6 py-2.5 text-xl uppercase">
                                        Войти
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