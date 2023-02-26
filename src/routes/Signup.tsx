import React, {useRef, useState} from 'react';
import {RowBlock, RowBlockUpper} from "../components/PageBlocks";
import InputWithValidation, {TEXT, EMAIL, PASSWORD} from "../components/InputWithValidation";
import {
    isContainsSpace,
    isEmail,
    isMinMaxLen,
    isNickname,
    isNotBlank,
    isPassword
} from "../validator/Validator";
import {Link} from "react-router-dom";

export default function Signup() {
    const [nicknameValue, setNicknameValue] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const inputNicknameRef = useRef<HTMLInputElement>(null);
    const handleNicknameChange = (value: string, error: string) => {
        setNicknameValue(value);
        setNicknameError(error);
    };

    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState("");
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const handleEmailChange = (value: string, error: string) => {
        setEmailValue(value);
        setEmailError(error);
    };

    const [passwordValue, setPasswordValue] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const handlePasswordChange = (value: string, error: string) => {
        setPasswordValue(value);
        setPasswordError(error);
    };

    const [repeatPasswordValue, setRepeatPasswordValue] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const inputRepeatPasswordRef = useRef<HTMLInputElement>(null);
    const handleRepeatPasswordChange = (value: string, error: string) => {
        setRepeatPasswordValue(value);
        setRepeatPasswordError(error);
    };

    function handleSignupClick() {
        inputNicknameRef.current?.focus();
        inputNicknameRef.current?.blur();
        inputEmailRef.current?.focus();
        inputEmailRef.current?.blur();
        inputPasswordRef.current?.focus();
        inputPasswordRef.current?.blur();
        inputRepeatPasswordRef.current?.focus();
        inputRepeatPasswordRef.current?.blur();
    }

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
                    validators={[isNotBlank, isMinMaxLen(5, 32), isContainsSpace, isNickname]}
                    value={nicknameValue}
                    error={nicknameError}
                    onChange={handleNicknameChange}
                    inputRef={inputNicknameRef}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"Электронная почта"}
                    placeholder={"ivan.ivanov@mail.ru"}
                    id={"field-email"}
                    type={EMAIL}
                    hasWarnLabel={true}
                    spellCheck={false}
                    validators={[isNotBlank, isMinMaxLen(6, 64), isContainsSpace, isEmail]}
                    value={emailValue}
                    error={emailError}
                    onChange={handleEmailChange}
                    inputRef={inputEmailRef}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"Пароль"}
                    placeholder={"********"}
                    id={"field-password"}
                    type={PASSWORD}
                    hasWarnLabel={true}
                    spellCheck={false}
                    validators={[isNotBlank, isMinMaxLen(6, 64), isContainsSpace, isPassword]}
                    value={passwordValue}
                    error={passwordError}
                    onChange={handlePasswordChange}
                    inputRef={inputPasswordRef}
                    insertSpace={false} />

                <InputWithValidation
                    nameField={"Повторите пароль"}
                    placeholder={"********"}
                    id={"field-repeat-password"}
                    type={PASSWORD}
                    hasWarnLabel={true}
                    spellCheck={false}
                    validators={[isNotBlank, isMinMaxLen(6, 64), isContainsSpace, isPassword]}
                    value={repeatPasswordValue}
                    error={repeatPasswordError}
                    onChange={handleRepeatPasswordChange}
                    inputRef={inputRepeatPasswordRef}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlock>
                <div className="text-center w-full mt-4">
                    <button type="submit" className="btn-classic-frame select-none px-6 py-2.5 text-xl uppercase" onClick={handleSignupClick}>
                        Зарегистрироваться
                    </button>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full lg:flex lg:justify-center">
                    <p className="leading-tight mx-1">Есть аккаунт?</p>
                    <Link to="/login" className="btn-usual-link">Войдите!</Link>
                </div>
            </RowBlock>
        </>
    )
}