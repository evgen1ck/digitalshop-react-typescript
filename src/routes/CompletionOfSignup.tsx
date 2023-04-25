import React from 'react' 
import {useLocation} from 'react-router-dom' 


const CompletionOfSignup = () => {
    const location = useLocation() 
    const email = location.state?.email || '' 

    return (
        <div className="justify-between select-none">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-8">Почти зарегистрировались!</h1>
                <h3 className="text-3xl font-bold mb-12">
                    Осталось удостовериться, что электронная почта принадлежит Вам<br/><br/>
                    Перейдите на почту
                    <span className="text-light-focusing dark:text-dark-focusing"> {email} </span>
                    и пройдите по ссылке<br/>
                </h3>
            </div>
        </div>
    ) 
} 

export default CompletionOfSignup 