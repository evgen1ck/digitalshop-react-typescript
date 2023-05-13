import React, {useEffect, useRef, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import {RowBlock, RowBlockUpper} from "../../components/PageBlocks";
import {AdminProductsCards, Product, ProductCardForMainpage} from "../../components/ProductCards";
import {ProductsQuery} from "../../queries/products";
import {AdminVariantsQuery} from "../../queries/admin";


export default function AdminProducts() {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [data, setData] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    // const [loginValue, setLoginValue] = useState("")
    // const [loginError, setLoginError] = useState("")
    // const inputEmailRef = useRef<HTMLInputElement>(null)
    //
    // const [passwordValue, setPasswordValue] = useState("")
    // const [passwordError, setPasswordError] = useState("")
    // const inputPasswordRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const abortController = new AbortController

        AdminVariantsQuery({
            signal: abortController.signal,
            navigate: navigate
        }).then(data => {
            setData(data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })

        return () => {
            abortController.abort()
        }
    }, [])

    function handleLoginClick() {
        setIsSubmitting(true)
        // setLoginError("")
        // setPasswordError("")
        //
        // inputEmailRef.current?.focus()
        // inputEmailRef.current?.blur()
        // inputPasswordRef.current?.focus()
        // inputPasswordRef.current?.blur()
        //
        // if (loginValue === "" || passwordValue === "") {
        //     setIsSubmitting(false)
        //     return
        // }
        //
        // AuthLoginQuery({
        //     login: loginValue,
        //     password: passwordValue,
        //     setLoginError: setLoginError,
        //     setPasswordError: setPasswordError,
        //     navigate: navigate
        // }).then(data => {
        //     data && CreateUserAuth(data, navigate, true, setAuthState)
        //     setIsSubmitting(false)
        // }).catch(() => {
        //     setIsSubmitting(false)
        // })

    }

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
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="sm:text-3xl text-2xl font-bold mb-6 uppercase select-none">Продукты</h3>
                </div>
            </RowBlock>

            <RowBlock>
                <div className=" flex justify-end items-center space-x-3 mb-6">
                    <div className="text-center w-auto mt-4">
                        <Link className="btn-classic-frame select-none px-6 py-2.5 sm:text-xl text-lg uppercase"
                              to="add">
                            Добавить
                        </Link>
                    </div>
                </div>

            </RowBlock>

            <RowBlock>
                {data && data.length > 0 && <AdminProductsCards products={data} />}
            </RowBlock>

        </>
    )
}