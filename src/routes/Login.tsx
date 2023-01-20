import { MyControls } from "../components/Controls";
import React, { useState } from "react";
import { IMain } from "../models/SystemInterfaces";
import {MainPageBlock, RowBlock, RowBlockLower, RowBlockUpper} from "../components/PageBlocks";

export default function Login() {

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
        <MainPageBlock>

            <RowBlock>
                <div className="text-center w-full ">
                    <div className=" text-3xl font-bold mb-6 uppercase">Авторизация</div>
                </div>
            </RowBlock>

            {initialFields && initialFields.map(({ fields}) => (
                <RowBlockUpper>
                    {fields && fields.map(field => (
                        <RowBlockLower>
                            <label className="block uppercase font-bold mb-2" htmlFor={field.id.toString()}>
                                {field.nameField}
                            </label>

                            {field.elementType === "input" ? MyControls.Input(field) : MyControls.Select(field)}

                            {field.hasWarnLabel ? <p className="text-light-second dark:text-dark-second text-sm italic invisible">test</p> : false }
                        </RowBlockLower>
                    ))}
                </RowBlockUpper>
            ))}

            <RowBlock>
                <div className="flex">
                    <div className="module-classic">
                        <input id="field-save-password" type="checkbox" className="checkbox-classic w-5 h-5"
                               checked={checked} onChange={() => setChecked(!checked)} />
                        <label htmlFor="field-save-password" className="select-none cursor-pointer ml-2 text-sm">
                            Запомнить пароль
                        </label>
                    </div>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full mt-12">
                    <button type="submit" className="btn-classic-frame select-none px-6 py-2.5 text-xl uppercase">
                        Войти
                    </button>
                </div>
            </RowBlock>

        </MainPageBlock>
    )
}