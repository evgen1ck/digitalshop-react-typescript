import React from 'react';
import {Link, Outlet} from 'react-router-dom';

export default function NoMatch() {

    return (
        <>
            <div className="justify-between my-16">
                <div className="text-center">
                    <h1 className="text-9xl font-bold mb-8">404</h1>
                    <h3 className="text-4xl font-bold mb-12">Страница не найдена или её не существует.</h3>
                    <Link to="/" className="transition ease-in-out delay-50 hover:-translate-y-1 duration-300 inline-block outline hover:text-light-focusing dark:hover:text-dark-focusing px-6 py-2.5 text-2xl font-medium uppercase rounded shadow-md transition duration-150 ease-in-out">
                        На главную
                    </Link>
                </div>
                <Outlet />
            </div>
        </>
    );
}