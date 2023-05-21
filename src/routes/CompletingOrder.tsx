import React from "react"
import {Link} from "react-router-dom"

const CompletingOrder = () => {
    return (
        <div className="justify-between select-none">
            <div className="text-center">
                <h1 className="sm:text-5xl text-3xl font-bold mb-8">Покупка завершена</h1>
                <h3 className="sm:text-3xl text-xl font-bold mb-12">
                    Посетите свою почту для получения продукта<br/>
                </h3>
                <Link to="/"
                      className="transition ease-in-out delay-50 hover:-translate-y-1 duration-300 inline-block outline hover:text-light-focusing dark:hover:text-dark-focusing px-6 py-2.5 sm:text-xl text-base font-medium uppercase rounded shadow-md">
                    На главную
                </Link>
            </div>
        </div>
    )
}

export default CompletingOrder