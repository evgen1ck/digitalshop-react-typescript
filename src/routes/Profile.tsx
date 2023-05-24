import React, {useEffect, useState} from "react"
import {RowBlock, RowBlockUpper} from "../components/Blocks/PageBlocks";
import InputWithValidation, {TEXT} from "../components/Inputs/InputWithValidation";
import {isMinMaxLen, isNotBlank, isNotContainsSpace, isPassword} from "../lib/validators";
import {CentralTextBlock} from "../components/Blocks/CentralTextBlock";
import {ApiUserOrderUrl, getAxioser} from "../lib/queries";
import httpErrorsHandler from "../lib/responds";
import {useNavigate} from "react-router-dom";
import {Order, OrderCard} from "../components/Cards/OrderCards";

const Profile = () => {
    const navigate = useNavigate()

    const loginValue: string = localStorage.getItem("login") || "";
    const emailValue: string = localStorage.getItem("email") || "";

    const [mainData, setMainData] = useState<Order[]>([])
    const [mainDataLoading, setMainDataLoading] = useState(true)
    const [mainDataError, setMainDataError] = useState("")

    useEffect(() => {
        setMainDataLoading(true);
        getAxioser(ApiUserOrderUrl).then((data) => {
            setMainData(data);
        }).catch((response) => {
            httpErrorsHandler(response, navigate);
            setMainDataError("Серверная ошибка получения данных");
        }).finally(() => setMainDataLoading(false));
    }, []);
    if (mainDataLoading) return <CentralTextBlock text="Ожидаем ответ..." />
    if (mainDataError) return <CentralTextBlock text={mainDataError} />

    return (
        <div className="mx-auto">
            <CentralTextBlock text={"Данные"} />

            <RowBlockUpper>
                <InputWithValidation
                    addToClassName="max-w-3xl mx-auto"
                    nameField={"Электронная почта"}
                    placeholder={"ivan.ivanov@mail.ru"}
                    id={"field-email"}
                    type={TEXT}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(6, 64), isNotContainsSpace, isPassword]}
                    setValue={() => {}}
                    value={emailValue}
                    setError={() => {}}
                    error={""}
                    requiredField={true}
                    disabled={true}
                    insertSpace={false} />
                </RowBlockUpper>

            <RowBlockUpper>
                <InputWithValidation
                    addToClassName="max-w-3xl mx-auto"
                    nameField={"Псевдоним"}
                    placeholder={"ivanchik"}
                    id={"field-nickname"}
                    type={TEXT}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(5, 64), isNotContainsSpace]}
                    setValue={() => {}}
                    value={loginValue}
                    setError={() => {}}
                    error={""}
                    disabled={true}
                    requiredField={true}
                    insertSpace={false} />
            </RowBlockUpper>

            <CentralTextBlock text={"История заказов"} />

            <RowBlock>
                <div className="space-y-8 select-none">
                    {mainData && mainData.map((data) => (
                        <OrderCard order={data}
                                   key={data.order_id} />
                    ))}
                </div>
            </RowBlock>
        </div>


        // <div className="justify-between my-16 select-none">
        //     <div className="text-center">
        //         <h1 className="text-8xl font-bold mb-8">aboba</h1>
        //         <h3 className="text-3xl font-bold mb-12">aboba.</h3>
        //         <Link to="/" className="transition ease-in-out delay-50 hover:-translate-y-1 duration-300 inline-block outline hover:text-light-focusing dark:hover:text-dark-focusing px-6 py-2.5 text-xl font-medium uppercase rounded shadow-md">
        //             гг
        //         </Link>
        //     </div>
        // </div>
    )
}

export default Profile