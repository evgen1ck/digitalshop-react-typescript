import React, {useRef, useState} from "react" 
import { RowBlock, RowBlockUpper } from "../components/PageBlocks" 
import {Link, useNavigate} from "react-router-dom" 
import InputWithValidation, {PASSWORD, TEXT} from "../components/InputWithValidation"
import {isNotContainsSpace, isMinMaxLen, isNotBlank, isPassword} from "../utils/dataValidators"
import {CreateUserAuth, useAuthContext} from "../storage/auth"
import {AuthLoginQuery} from "../queries/auth"

export default function Login() {
    const navigate = useNavigate()
    const { setAuthState } = useAuthContext()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [loginValue, setLoginValue] = useState("") 
    const [loginError, setLoginError] = useState("") 
    const inputEmailRef = useRef<HTMLInputElement>(null)

    const [passwordValue, setPasswordValue] = useState("") 
    const [passwordError, setPasswordError] = useState("") 
    const inputPasswordRef = useRef<HTMLInputElement>(null)

    function handleLoginClick() {
        setIsSubmitting(true)
        setLoginError("")
        setPasswordError("") 

        inputEmailRef.current?.focus() 
        inputEmailRef.current?.blur() 
        inputPasswordRef.current?.focus() 
        inputPasswordRef.current?.blur() 

        if (loginValue === "" || passwordValue === "") {
            setIsSubmitting(false)
            return 
        }

        AuthLoginQuery({
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
                    <h3 className="sm:text-3xl text-2xl font-bold mb-6 uppercase select-none">Авторизация</h3>
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
                    requiredValidators={[isNotBlank, isMinMaxLen(5, 64), isNotContainsSpace]}
                    setValue={setLoginValue}
                    value={loginValue}
                    setError={setLoginError}
                    error={loginError}
                    inputRef={inputEmailRef}
                    requiredField={true}
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
                            onClick={handleLoginClick}
                            disabled={isSubmitting || loginError != "" || passwordError != ""}>
                        Войти
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