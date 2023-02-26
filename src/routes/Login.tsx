import React, { useState } from "react";
import { RowBlock, RowBlockLower, RowBlockUpper } from "../components/PageBlocks";
import {Link} from "react-router-dom";

export default function Login() {



    const [checked, setChecked] = useState(true);

    return (
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <div className="text-3xl font-bold mb-0 lg:mb-6 uppercase">Авторизация</div>
                </div>
            </RowBlock>


            <RowBlock>
                <div className="flex">
                    <div className="module-classic">
                        <input id="field-save-password" type="checkbox" className="checkbox-classic w-5 h-5"
                               checked={checked} onChange={() => setChecked(!checked)} />
                        <label htmlFor="field-save-password" className="select-none cursor-pointer ml-2 text-sm">
                            Запомнить пароль
                        </label>
                    </div>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full mt-4">
                    <button type="submit" className="btn-classic-frame select-none px-6 py-2.5 text-xl uppercase">
                        Войти
                    </button>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full lg:flex lg:justify-center">
                    <p className="leading-tight mx-3">Нет аккаунта? </p>
                    <Link to="/signup" className="btn-usual-link ">Создайте!</Link>
                </div>

            </RowBlock>
        </>
    )
}