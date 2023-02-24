import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {MyControls} from '../components/Controls';
import { IMain } from '../models/SystemInterfaces';
import {RowBlock, RowBlockLower, RowBlockUpper} from "../components/PageBlocks";
import InputWithValidation, {TEXT, EMAIL, PASSWORD} from "../components/InputWithValidation";
import {isEmail, isNotBlank} from "../validator/Validator";

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

    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (value: string, error: string) => {
        setEmailValue(value);
        setEmailError(error);
    };

    const handlePasswordChange = (value: string, error: string) => {
        setPasswordValue(value);
        setPasswordError(error);
    };

    return (
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="text-3xl font-bold mb-6 uppercase">Регистрация</h3>
                </div>
            </RowBlock>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"Псевдоним"}
                    placeholder={"ivanchik"}
                    id={"field-nickname"}
                    type={TEXT}
                    hasWarnLabel={true}
                    spellCheck={false}
                    validators={[isNotBlank]}
                    value={emailValue}
                    error={emailError}
                    onChange={handleEmailChange} />
            </RowBlockUpper>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"Электронная почта (с подтверждением)"}
                    placeholder={"ivan-ivanov@mail.ru"}
                    id={"field-email"}
                    type={EMAIL}
                    hasWarnLabel={true}
                    spellCheck={false}
                    validators={[isNotBlank, isEmail]}
                    value={emailValue}
                    error={emailError}
                    onChange={handleEmailChange} />
            </RowBlockUpper>


            {/*{initialFields && initialFields.map(({ fields}) => (*/}
            {/*    <RowBlockUpper>*/}
            {/*        {fields && fields.map(field => (*/}
            {/*            <RowBlockLower>*/}
            {/*                <label className="block uppercase font-bold mb-2" htmlFor={field.id.toString()}>*/}
            {/*                    {field.nameField}*/}
            {/*                </label>*/}

            {/*                {field.elementType === "input" ? MyControls.Input(field) : MyControls.Select(field)}*/}

            {/*                {field.hasWarnLabel ? <p className="text-light-second dark:text-dark-second text-sm italic invisible">test</p> : false }*/}
            {/*            </RowBlockLower>*/}
            {/*        ))}*/}
            {/*    </RowBlockUpper>*/}
            {/*))}*/}
        </>
    )
}