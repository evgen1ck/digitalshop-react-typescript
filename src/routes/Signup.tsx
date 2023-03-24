import React, { useRef, useState } from 'react';
import { RowBlock, RowBlockUpper } from "../components/PageBlocks";
import InputWithValidation, {TEXT, EMAIL, PASSWORD} from "../components/InputWithValidation";
import {
    isContainsSpace,
    isEmail,
    isMinMaxLen,
    isNickname,
    isNotBlank,
    isPassword,
} from "../utils/dataValidators";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import UseHttpErrorsHandler from "../utils/http";
import {AppUrl} from "../index";

export default function Signup() {
    const navigate = useNavigate();
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    function handleSignup() {
        setIsSubmitting(true);
        setNicknameError("");
        setEmailError("");
        setPasswordError("");
        setRepeatPasswordError("");

        inputNicknameRef.current?.focus();
        inputNicknameRef.current?.blur();
        inputEmailRef.current?.focus();
        inputEmailRef.current?.blur();
        inputPasswordRef.current?.focus();
        inputPasswordRef.current?.blur();
        inputRepeatPasswordRef.current?.focus();
        inputRepeatPasswordRef.current?.blur();

        if (nicknameValue === "" || emailValue === "" || passwordValue === "" || repeatPasswordValue === "") {
            toast.error("Заполните все поля ввода данных")
            setIsSubmitting(false);
            return;
        }

        if (nicknameError != "" || emailError != "" || passwordError != "" || repeatPasswordError != "") {
            toast.error("Введите корректные данные")
            setIsSubmitting(false);
            return;
        }

        if (passwordValue !== repeatPasswordValue) {
            toast.error("Пароли не совпадают")
            setPasswordError("Пароли не совпадают");
            setRepeatPasswordError("Пароли не совпадают");
            setIsSubmitting(false);
            return;
        }

        fetchSignup().then(_ => setIsSubmitting(false));
    }

    async function fetchSignup() {
        try {
            const requestBody = {
                nickname: nicknameValue,
                email: emailValue,
                password: passwordValue,
            };
            const response = await fetch(AppUrl+"/api/v1/auth/signup", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    //"Authorization": `Bearer ${TIMEWEB_CLOUD_TOKEN}`
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const data = await response.json();
                switch (true) {
                    case data.description.toLowerCase().includes("the email domain is not exist".toLowerCase()):
                        setEmailError('Домен электронной почты не существует');
                        return;
                    case data.description.toLowerCase().includes("this nickname is already in use".toLowerCase()):
                        setNicknameError('Псевдоним уже используется');
                        return;
                    case data.description.toLowerCase().includes("this email is already in use".toLowerCase()):
                        setEmailError('Электронная почта уже используется');
                        return;
                }
                await UseHttpErrorsHandler(response);
                return;
            }

            //const data = await response.json();
            //console.log("Data received:", data);
            navigate('/completion-of-signup', { state: { email: emailValue } });
        } catch (error) {
            toast.error("Неизвестная ошибка");
            console.error("Error fetching data: ", error);
        }
    }

    // dwwda##ddeer444D
    return (
        <div className="mx-auto max-w-4xl">
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="text-3xl font-bold mb-6 uppercase select-none">Регистрация</h3>
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
                    requiredValidators={[isNotBlank, isMinMaxLen(5, 32), isContainsSpace, isNickname]}
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
                    requiredValidators={[isNotBlank, isMinMaxLen(6, 64), isContainsSpace, isEmail]}
                    value={emailValue}
                    error={emailError}
                    onChange={handleEmailChange}
                    inputRef={inputEmailRef}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlockUpper>
                <InputWithValidation
                    addToClassName="sm:w-1/2"
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

                <InputWithValidation
                    addToClassName="sm:w-1/2"
                    nameField={"Повторите пароль"}
                    placeholder={"********"}
                    id={"field-repeat-password"}
                    type={PASSWORD}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(6, 64), isContainsSpace, isPassword]}
                    value={repeatPasswordValue}
                    error={repeatPasswordError}
                    onChange={handleRepeatPasswordChange}
                    inputRef={inputRepeatPasswordRef}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlock>
                <div className="text-center w-full mt-4">
                    <button className="btn-classic-frame select-none px-6 py-2.5 text-xl uppercase"
                            type="submit"
                            onClick={handleSignup}
                            disabled={isSubmitting}>Зарегистрироваться
                    </button>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full lg:flex lg:justify-center select-none">
                    <p className="leading-tight mx-1">Есть аккаунт?</p>
                    <Link to="/login" className="btn-usual-link">Войдите!</Link>
                </div>
            </RowBlock>

            {/*<Modals onShow={show} setShow={setShow} canLeave={true} title="Регистрация">*/}
            {/*    <RowBlockUpper>*/}
            {/*        <InputWithValidation*/}
            {/*            nameField={"Код подтверждения почты"}*/}
            {/*            placeholder={"123456"}*/}
            {/*            id={"field-confirmation-code"}*/}
            {/*            type={NUMBER}*/}
            {/*            maxLength={6}*/}
            {/*            hasWarnLabel={true}*/}
            {/*            spellCheck={false}*/}
            {/*            requiredValidators={[isNotBlank, isLen(6), isContainsSpace, isUint64]}*/}
            {/*            value={codeValue}*/}
            {/*            error={codeError}*/}
            {/*            onChange={handleCodeChange}*/}
            {/*            inputRef={inputCodeRef}*/}
            {/*            insertSpace={false} />*/}
            {/*    </RowBlockUpper>*/}

            {/*    <RowBlockUpper>*/}
            {/*        <button className="btn-classic block lg:inline-block lg:mt-0 ml-4 mr-6" onClick={handleSignupWithCodeClick}>*/}
            {/*            Подтвердить*/}
            {/*        </button>*/}
            {/*    </RowBlockUpper>*/}
            {/*</Modals>*/}
        </div>
    )
}