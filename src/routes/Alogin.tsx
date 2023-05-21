import React, {useRef, useState} from "react"
import { RowBlock, RowBlockUpper } from "../components/Blocks/PageBlocks"
import {useNavigate} from "react-router-dom"
import InputWithValidation, {PASSWORD, TEXT} from "../components/Inputs/InputWithValidation"
import {isNotContainsSpace, isMinMaxLen, isNotBlank, isPassword} from "../lib/validators"
import {CreateUserAuth, useAuthContext} from "../storage/auth"
import {AuthAloginQuery} from "../queries/auth"

export default function Alogin() {
    const navigate = useNavigate()
    const { setAuthState } = useAuthContext()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [loginValue, setLoginValue] = useState("")
    const [loginError, setLoginError] = useState("")
    const inputLoginRef = useRef<HTMLInputElement>(null)

    const [passwordValue, setPasswordValue] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const inputPasswordRef = useRef<HTMLInputElement>(null)

    function handleAloginClick() {
        setIsSubmitting(true)
        setLoginError("")
        setPasswordError("")

        inputLoginRef.current?.focus()
        inputLoginRef.current?.blur()
        inputPasswordRef.current?.focus()
        inputPasswordRef.current?.blur()

        if (loginValue === "" || passwordValue === "") {
            setIsSubmitting(false)
            return
        }

        AuthAloginQuery({
            login: loginValue,
            password: passwordValue,
            setLoginError: setLoginError,
            setPasswordError: setPasswordError,
            navigate: navigate
        }).then(data => {
            data && CreateUserAuth(data, navigate, true, setAuthState)
            setIsSubmitting(false)
        }).catch(() => {
            setIsSubmitting(false)
        })
    }

    return (
        <div className="mx-auto max-w-4xl">
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="sm:text-3xl text-2xl font-bold mb-6 uppercase select-none">Авторизация администратора</h3>
                </div>
            </RowBlock>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"Логин администратора"}
                    placeholder={"administrator"}
                    id={"field-login"}
                    type={TEXT}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(5, 64), isNotContainsSpace]}
                    setValue={setLoginValue}
                    value={loginValue}
                    setError={setLoginError}
                    error={loginError}
                    inputRef={inputLoginRef}
                    requiredField={true}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"Пароль администратора"}
                    placeholder={"********"}
                    id={"field-password"}
                    type={PASSWORD}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(6, 64), isNotContainsSpace, isPassword]}
                    setValue={setPasswordValue}
                    value={passwordValue}
                    setError={setPasswordError}
                    error={passwordError}
                    inputRef={inputPasswordRef}
                    requiredField={true}
                    insertSpace={false} />
            </RowBlockUpper>

            <RowBlock>
                <div className="text-center w-full mt-4">
                    <button className="btn-classic-frame select-none px-6 py-2.5 sm:text-xl text-lg uppercase"
                            type="submit"
                            onClick={handleAloginClick}
                            disabled={isSubmitting || loginError != "" || passwordError != ""}>
                        Войти
                    </button>
                </div>
            </RowBlock>
        </div>
    )
}