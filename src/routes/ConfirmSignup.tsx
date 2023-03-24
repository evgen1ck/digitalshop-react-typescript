import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import UseHttpErrorsHandler from "../utils/http";
import {toast} from "react-hot-toast";
import {AppUrl} from "../index";


const CompletionOfSignup = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const abortController = new AbortController();

        fetchCompletionOfSignup(abortController.signal).then(data => setData(data));

        return () => {
            abortController.abort();
        };
    }, []);


    return (
        <div className="justify-between select-none">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-8">{!!data ? 'Регистрация завершена!': 'Регистрация не завершена.'}</h1>
                <h3 className="text-3xl font-bold mb-12">
                    {!!data ?
                        'Мы удостоверились, что электронная почта принадлежит Вам':
                        'Мы не удостоверились, что электронная почта принадлежит Вам'}<br/><br/>
                    {!!data ?
                        'Теперь Вы можете перейти на главную страницу':
                        'Попробуйте заново зарегистрироваться или обновите страницу'}
                </h3>
                <Link to="/" className="transition ease-in-out delay-50 hover:-translate-y-1 duration-300 inline-block outline hover:text-light-focusing dark:hover:text-dark-focusing px-6 py-2.5 text-xl font-medium uppercase rounded shadow-md">
                    На главную
                </Link>
            </div>
        </div>
    );
};

async function fetchCompletionOfSignup(signal: AbortSignal) {
    try {

        const requestBody = {
            token: getCurrentToken(),
        };
        const response = await fetch(AppUrl+"/api/v1/auth/signup-with-token", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            signal: signal,
        });

        if (!response.ok) {
            await UseHttpErrorsHandler(response);
            return;
        }

       return await response.json()
    } catch (error) {
        toast.error("Неизвестная ошибка");
        console.error("Error fetching data: ", error);
    }
}

const getCurrentToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
};


export default CompletionOfSignup;