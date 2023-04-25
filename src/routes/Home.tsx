import {useNavigate} from "react-router-dom" 
import React, {useEffect, useRef, useState} from "react" 
import {ProductsQuery} from "../queries/products" 
import {RowBlock, RowBlockUpper} from "../components/PageBlocks" 
import InputWithValidation, {TEXT} from "../components/InputWithValidation" 
import {isMinMaxLen, isNotBlank} from "../utils/dataValidators" 
import {Product, ProductCardForMainpage} from "../components/ProductCards" 

export default function Games() {
    const navigate = useNavigate()
    const [data, setData] = useState<Product[]>([]) 
    const [loading, setLoading] = useState(true) 

    const [searchValue, setSearchValue] = useState("") 
    const [searchError, setSearchError] = useState("") 
    const inputSearchRef = useRef<HTMLInputElement>(null) 
    const handleSearchChange = (value: string, error: string) => {
        setSearchValue(value) 
        setSearchError(error) 
    } 

    const handleEnterPress = (event: any) => {
        if (event.key === 'Enter') {
            console.log('Enter pressed') 
        }
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
                    <h3 className="text-3xl font-bold mb-6 uppercase select-none">Поиск по товарам</h3>
                </div>
            </RowBlock>
            <RowBlockUpper addToClassName="w-3/5 pb-10 flex items-center justify-center">
                <InputWithValidation
                    nameField={""}
                    placeholder={"Поиск по товарам, например, GTA 5"}
                    id={"field-search"}
                    type={TEXT}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(5, 32)]}
                    value={searchValue}
                    error={searchError}
                    onChange={handleSearchChange}
                    inputRef={inputSearchRef}
                    insertSpace={true}
                    onKeyPress={handleEnterPress} />
                <button className="btn-classic-frame select-none px-6 py-2.5 mb-4 text-xl uppercase " type="submit">
                    Искать
                </button>
            </RowBlockUpper>

            <RowBlock>
                {data && <ProductCardForMainpage products={data} />}
            </RowBlock>
        </>
    )
}