import React, {useEffect, useState} from 'react' 
import {Link, useNavigate} from 'react-router-dom' 
import {CreateUserAuth, useAuthContext} from "../storage/auth" 
import {AuthSignupWithTokenQuery} from "../queries/auth" 


const CompletionOfSignup = () => {
    const navigate = useNavigate()
    const { setLoggedIn } = useAuthContext()
    const [data, setData] = useState(null) 
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
        const abortController = new AbortController 

        let token: string = new URLSearchParams(window.location.search).get('token') || '' 
        AuthSignupWithTokenQuery({
            token: token,
            signal: abortController.signal,
            navigate: navigate
        }).then(data => {
            setData(data)
            data && CreateUserAuth(data, navigate, true, setLoggedIn)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        }) 

        return () => {
            abortController.abort() 
        } 
    }, []) 

    if (loading) {
        return (
            <div className="justify-between select-none">
                <div className="text-center">
                    <h3 className="text-3xl font-bold mb-12">
                        Ожидаем ответ от сервера...
                    </h3>
                </div>
            </div>
        )
    }

    return (
        <div className="justify-between select-none">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-8">{!!data ? 'Регистрация завершена!': 'Регистрация не завершена.'}</h1>
                <h3 className="text-3xl font-bold mb-12">
                    {!!data ?
                        'Мы удостоверились, что электронная почта принадлежит Вам':
                        'Возможно, вы уже переходили по этой ссылке или её время действия истекло'}<br/><br/>
                    {!!data ?
                        'Теперь Вы можете перейти на главную страницу':
                        'Попробуйте заново зарегистрироваться или обновите страницу'}
                </h3>
                <Link to="/" className="transition ease-in-out delay-50 hover:-translate-y-1 duration-300 inline-block outline hover:text-light-focusing dark:hover:text-dark-focusing px-6 py-2.5 text-xl font-medium uppercase rounded shadow-md">
                    На главную
                </Link>
            </div>
        </div>
    ) 
} 

export default CompletionOfSignup 