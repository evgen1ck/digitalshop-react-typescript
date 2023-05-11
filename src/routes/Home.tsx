import {useNavigate} from "react-router-dom" 
import React, {useEffect, useRef, useState} from "react" 
import {ProductsQuery} from "../queries/products" 
import {RowBlock, RowBlockUpper} from "../components/PageBlocks"
import InputWithValidation, {TEXT} from "../components/InputWithValidation" 
import {isMinMaxLen, isNotBlank} from "../utils/dataValidators" 
import {Product, ProductCardForMainpage} from "../components/ProductCards"

export default function Games() {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [data, setData] = useState<Product[]>([])
    const [loading, setLoading] = useState(true) 

    const [searchValue, setSearchValue] = useState("") 
    const [searchError, setSearchError] = useState("") 
    const inputSearchRef = useRef<HTMLInputElement>(null)

    const handleEnterPress = (event: any) => {
        if (event.key === 'Enter') {
            goSearch()
        }
    }

    const goSearch = () => {
        setIsSubmitting(true)
        inputSearchRef.current?.focus()
        inputSearchRef.current?.blur()

        if (searchValue === "" ||
            searchError != "") {
            setIsSubmitting(false)
            return
        }

        navigate(`?query=${encodeURIComponent(searchValue)}`)
    }

    useEffect(() => {
        const abortController = new AbortController 

        ProductsQuery({
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
                    <h3 className="sm:text-3xl text-2xl font-bold mb-6 uppercase select-none">Поиск по товарам</h3>
                </div>
            </RowBlock>
            <RowBlockUpper addToClassName="pb-12 items-center justify-center flex">
                <div className="flex inline-flex lg:w-2/3 lg:items-center w-full">
                    <InputWithValidation
                        nameField={""}
                        placeholder={"Поиск по товарам, например, GTA"}
                        id={"field-search"}
                        type={TEXT}
                        hasWarnLabel={true}
                        spellCheck={false}
                        requiredValidators={[isNotBlank, isMinMaxLen(3, 32)]}
                        setValue={setSearchValue}
                        value={searchValue}
                        setError={setSearchError}
                        error={searchError}
                        inputRef={inputSearchRef}
                        insertSpace={true}
                        requiredField={true}
                        onKeyPress={handleEnterPress} />
                    <button className="btn-classic-frame select-none flex text-center h-12 px-4 py-2 sm:mb-7 mt-2 sm:text-xl text-lg uppercase"
                            type="submit"
                            onClick={goSearch}
                            disabled={isSubmitting}>
                        Искать
                    </button>
                </div>
            </RowBlockUpper>

            <RowBlock>
                {data && data.length > 0 && <ProductCardForMainpage products={data} />}
            </RowBlock>
        </>
    )
}