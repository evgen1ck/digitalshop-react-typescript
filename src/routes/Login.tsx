import React, {useRef, useState} from "react";
import { RowBlock, RowBlockUpper } from "../components/PageBlocks";
import {Link} from "react-router-dom";
import InputWithValidation, {EMAIL, PASSWORD, TEXT} from "../components/InputWithValidation";
import {isContainsSpace, isEmail, isMinMaxLen, isNotBlank, isPassword} from "../utils/dataValidators";

export default function Login() {
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    function handleSignupClick() {
        setIsSubmitting(true);
        inputEmailRef.current?.focus();
        inputEmailRef.current?.blur();
        inputPasswordRef.current?.focus();
        inputPasswordRef.current?.blur();
        setIsSubmitting(false);
    }
        return (
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="text-3xl font-bold mb-6 uppercase select-none">Авторизация</h3>
                </div>
            </RowBlock>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"Электронная почта"}
                    placeholder={"ivan.ivanov@mail.ru"}
                    id={"field-email"}
                    type={EMAIL}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(6, 64), isContainsSpace, isEmail]}
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
        </>
    )
}