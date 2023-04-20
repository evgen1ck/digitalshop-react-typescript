import React, {useRef, useState} from "react";
import { RowBlock, RowBlockUpper } from "../components/PageBlocks";
import {Link, useNavigate} from "react-router-dom";
import InputWithValidation, {EMAIL, PASSWORD, TEXT} from "../components/InputWithValidation";
import {isContainsSpace, isMinMaxLen, isNotBlank, isPassword} from "../utils/dataValidators";
import {toast} from "react-hot-toast";
import {CreateUserAuth, useAuthContext} from "../storage/auth";
import {AuthLoginQuery} from "../queries/auth";

export default function Login() {
    const navigate = useNavigate()
    const { setLoggedIn } = useAuthContext()

    const [loginValue, setLoginValue] = useState("");
    const [loginError, setLoginError] = useState("");
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const handleEmailChange = (value: string, error: string) => {
        setLoginValue(value);
        setLoginError(error);
    };

    const [passwordValue, setPasswordValue] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const handlePasswordChange = (value: string, error: string) => {
        setPasswordValue(value);
        setPasswordError(error);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSignupClick() {
        setIsSubmitting(true);
        setLoginError("");
        setPasswordError("");

        inputEmailRef.current?.focus();
        inputEmailRef.current?.blur();
        inputPasswordRef.current?.focus();
        inputPasswordRef.current?.blur();

        if (loginValue === "" || loginValue === "" || passwordValue === "") {
            toast.error("Заполните все поля ввода данных")
            setIsSubmitting(false);
            return;
        }

        if (loginError != "" || loginError != "" || passwordError != "") {
            toast.error("Введите корректные данные")
            setIsSubmitting(false);
            return;
        }

        AuthLoginQuery({
            login: loginValue,
            password: passwordValue,
            setLoginError: setLoginError,
            setPasswordError: setPasswordError,
            navigate: navigate
        }).then(data => {
            data && CreateUserAuth(data, navigate, true, setLoggedIn)
            setIsSubmitting(false)
        }).catch(_ => {
            setIsSubmitting(false)
        })
    }

    return (
        <div className="mx-auto max-w-4xl">
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="text-3xl font-bold mb-6 uppercase select-none">Авторизация</h3>
                </div>
            </RowBlock>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"Электронная почта или псевдоним"}
                    placeholder={"ivan.ivanov@mail.ru / ivanchik"}
                    id={"field-login"}
                    type={TEXT}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(5, 64), isContainsSpace]}
                    value={loginValue}
                    error={loginError}
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
                    requiredValidators={[isNotBlank, isMinMaxLen(6, 64), isContainsSpace, isPassword]}
                    value={passwordValue}
                    error={passwordError}
                    onChange={handlePasswordChange}
                    inputRef={inputPasswordRef}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlock>
                <div className="text-center w-full mt-4">
                    <button className="btn-classic-frame select-none px-6 py-2.5 text-xl uppercase"
                            type="submit"
                            onClick={handleSignupClick}
                            disabled={isSubmitting}>Авторизоваться
                    </button>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full lg:flex lg:justify-center select-none">
                    <p className="leading-tight mx-1">Нет аккаунта?</p>
                    <Link to="/signup" className="btn-usual-link">Сделайте!</Link>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full lg:flex lg:justify-center select-none">
                    <p className="leading-tight mx-1">Забыли пароль?</p>
                    <Link to="/recover-password" className="btn-usual-link">Восстановите!</Link>
                </div>
            </RowBlock>
        </div>
    )
}