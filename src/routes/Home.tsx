import {useLocation, useNavigate} from "react-router-dom"
import React, {useEffect, useMemo, useRef, useState} from "react"
import {RowBlock, RowBlockUpper} from "../components/Blocks/PageBlocks"
import InputWithValidation, {TEXT} from "../components/Inputs/InputWithValidation"
import {isMinMaxLen} from "../lib/validators"
import {Product, ProductCardForMainpage} from "../components/Cards/ProductCards"
import {useAuthContext} from "../storage/auth"
import {ApiProductMainpageUrl, getAxioser} from "../lib/queries"
import {CentralTextBlock} from "../components/Blocks/CentralTextBlock"
import httpErrorsHandler from "../lib/responds"
import {AxiosResponse} from "axios";

export default function Home() {
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { role } = useAuthContext()

    const [searchSubmitting, setSearchSubmitting] = useState(false)
    const [searchValue, setSearchValue] = useState(decodeURIComponent(queryParams.get('search') || ""))
    const [searchError, setSearchError] = useState("") 
    const searchRef = useRef<HTMLInputElement>(null)

    const handleEnterPress = (event: any) => {
        if (event.key === "Enter") {
            goSearch()
        }
    }

    const goSearch = () => {
        setSearchSubmitting(true)
        searchRef.current?.focus()
        searchRef.current?.blur()

        queryParams.set('search', searchValue)

        if (searchValue == "") {
            queryParams.delete('search')
        }

        navigate(`?${queryParams.toString()}`);

        goUpdate()
        setSearchSubmitting(false)
    }

    const [mainData, setMainData] = useState<Product[]>([])
    const [mainDataLoading, setMainDataLoading] = useState(true)
    const [mainDataError, setMainDataError] = useState("")

    const goUpdate = () => {
        setMainDataLoading(true)
        getAxioser(ApiProductMainpageUrl+"?"+queryParams).then(data => {
            setMainData(data)
        }).catch((response: AxiosResponse) => {
            httpErrorsHandler(response, navigate)
            setMainDataError("Серверная ошибка получения данных")
        }).finally(() => setMainDataLoading(false))
    }

    const goClear = () => {
        setSearchValue("")
        queryParams.delete('search')
        navigate(`?${queryParams.toString()}`)
    }

    useEffect(() => {
        goUpdate()
    }, [])

    const updatedQueryParams = useMemo(() => {
        return new URLSearchParams(location.search);
    }, [location.search]);
    useEffect(() => {
        goUpdate()
    }, [updatedQueryParams])

    return (
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="sm:text-3xl text-2xl font-bold mb-6 uppercase select-none">Поиск по товарам</h3>
                </div>
            </RowBlock>
            <RowBlockUpper addToClassName="items-center justify-center flex">
                <div className="inline-flex md:w-3/4 sm:items-center w-full">
                    <button className="btn-classic-frame select-none text-center h-12 px-4 py-2 sm:mb-7 mt-2 sm:text-xl text-lg uppercase hidden sm:block"
                            type="submit"
                            onClick={goClear}
                            disabled={searchSubmitting}>
                        Очистить
                    </button>
                    <InputWithValidation
                        nameField={""}
                        placeholder={"Поиск по товарам, например, GTA"}
                        id={"field-search"}
                        type={TEXT}
                        hasWarnLabel={true}
                        spellCheck={false}
                        requiredValidators={[isMinMaxLen(3, 32)]}
                        setValue={setSearchValue}
                        value={searchValue}
                        setError={setSearchError}
                        error={searchError}
                        inputRef={searchRef}
                        insertSpace={true}
                        requiredField={false}
                        onKeyPress={handleEnterPress} />
                    <button className="btn-classic-frame select-none text-center h-12 px-4 py-2 sm:mb-7 mt-2 sm:text-xl text-lg uppercase hidden sm:block"
                            type="submit"
                            onClick={goSearch}
                            disabled={searchSubmitting || searchValue == ""}>
                        Искать
                    </button>
                </div>
            </RowBlockUpper>

            <RowBlock>
                {mainDataLoading && <CentralTextBlock text="Загрузка данных..." />}
                {mainDataError && <CentralTextBlock text={mainDataError} />}
                <div className="space-y-8 select-none">
                    {mainData.length > 0 && mainData.map((product) => (
                        <ProductCardForMainpage product={product}
                                                isPurchasing={role == "user"}
                                                key={product.product_id} />
                    ))}
                    {mainData.length == 0 && (<CentralTextBlock text={"Не найдено"} />)}
                </div>
            </RowBlock>
        </>
    )
}