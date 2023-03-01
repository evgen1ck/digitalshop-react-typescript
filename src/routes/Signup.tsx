import React, { useRef, useState } from 'react';
import { RowBlock, RowBlockUpper } from "../components/PageBlocks";
import InputWithValidation, {TEXT, EMAIL, PASSWORD} from "../components/InputWithValidation";
import { useMutation } from "@apollo/client";
import {
    isContainsSpace,
    isEmail,
    isMinMaxLen,
    isNickname,
    isNotBlank,
    isPassword
} from "../utils/dataValidators";
import { Link } from "react-router-dom";
import { SIGNUP_WITHOUT_CODE_MUTATION } from "../graphql/graphql";
import Modals from "../components/Modals";

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

    const [signupWithoutCodeMutation, { data, error, loading }] = useMutation(SIGNUP_WITHOUT_CODE_MUTATION);

    const [showModal, setShowModal] = useState(false);
    function closeModal() {
        setShowModal(false);
    }

    async function signup(nickname: string, email: string, password: string) {
        try {
            await signupWithoutCodeMutation({ variables: { nickname: nickname, email: email, password: password } });
            if (loading) {
                console.log("LOADING...")
            } else if (data) {
                console.log("MY_DATA:" + data.authSignupWithoutCode)
            }
        }
        catch (_) {
            if (error) {
                console.log(error?.message)
            }
        }
    }

    const [show, setShow] = useState<boolean>(false)

    const [isSubmitting, setIsSubmitting] = useState(false);
    function handleSignupClick() {
        setIsSubmitting(true);
        inputNicknameRef.current?.focus();
        inputNicknameRef.current?.blur();
        inputEmailRef.current?.focus();
        inputEmailRef.current?.blur();
        inputPasswordRef.current?.focus();
        inputPasswordRef.current?.blur();
        inputRepeatPasswordRef.current?.focus();
        inputRepeatPasswordRef.current?.blur();

        if (passwordValue !== repeatPasswordValue) {
            setPasswordError("Пароли не совпадают");
            setRepeatPasswordError("Пароли не совпадают");
            setIsSubmitting(false);
            console.log("aboc");
            setShow(() => !show);
            return;
        }

        if (nicknameError !== "" || emailError !== "" || passwordError !== "" || repeatPasswordError !== "") {
            setIsSubmitting(false);
            return;
        }
// setIsSubmitting(false);3

// dwwda##ddeer444D
        signup(nicknameValue, emailValue, passwordValue).then(r => {});

        setIsSubmitting(false);
    }




        return (
        <>
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
                            onClick={handleSignupClick}
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




            <Modals onShow={show} setShow={setShow} >
                <p>Reusable Modal with options to customize.</p>
                <input type="email" placeholder="Email" />
            </Modals>


        </>
    )
}