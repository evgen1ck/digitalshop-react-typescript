import {useNavigate} from "react-router-dom" 
import React, {useEffect, useRef, useState} from "react" 
import {RowBlock, RowBlockUpper} from "../components/Blocks/PageBlocks"
import InputWithValidation, {TEXT} from "../components/Inputs/InputWithValidation"
import {isMinMaxLen, isNotBlank} from "../lib/validators"
import {Product, ProductCardForMainpage} from "../components/Cards/ProductCards"
import {useAuthContext} from "../storage/auth";
import {PaymentModal} from "../components/Modals/PaymentModal";
import {ApiProductMainpageUrl, getAxioser} from "../lib/queries";
import {CentralTextBlock} from "../components/Blocks/CentralTextBlock";
import httpErrorsHandler from "../lib/responds";

export default function Home() {
    const navigate = useNavigate()
    const { role } = useAuthContext()

    const [mainData, setMainData] = useState<Product[]>([])
    const [mainDataLoading, setMainDataLoading] = useState(true)

    const [searchSubmitting, setSearchSubmitting] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [searchError, setSearchError] = useState("") 
    const searchRef = useRef<HTMLInputElement>(null)

    const [variantId, setVariantId] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleModalOpen = (id: string) => {
        setVariantId(id)
        setIsModalOpen(true)
    }

    const handleEnterPress = (event: any) => {
        if (event.key === 'Enter') {
            goSearch()
        }
    }

    const goSearch = () => {
        setSearchSubmitting(true)
        searchRef.current?.focus()
        searchRef.current?.blur()

        if (searchValue === "" ||
            searchError != "") {
            setSearchSubmitting(false)
            return
        }

        navigate(`?search=${encodeURIComponent(searchValue)}`)
    }

    useEffect(() => {
        setMainDataLoading(true)
        getAxioser(ApiProductMainpageUrl).then(data => {
            setMainData(data)
        }).catch((response) => {
            httpErrorsHandler(response, navigate)
            return (
                <CentralTextBlock text='Серверная ошибка получения данных.' />
            )
        })
        setMainDataLoading(false)
    }, [])

    if (mainDataLoading) return ( <CentralTextBlock text='Ожидаем ответ...' /> )

    return (
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="sm:text-3xl text-2xl font-bold mb-6 uppercase select-none">Поиск по товарам</h3>
                </div>
            </RowBlock>
            <RowBlockUpper addToClassName="pb-12 items-center justify-center flex">
                <div className="inline-flex sm:w-2/3 sm:items-center w-full">
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
                        inputRef={searchRef}
                        insertSpace={true}
                        requiredField={true}
                        onKeyPress={handleEnterPress} />
                    <button className="btn-classic-frame select-none flex text-center h-12 px-4 py-2 sm:mb-7 mt-2 sm:text-xl text-lg uppercase"
                            type="submit"
                            onClick={goSearch}
                            disabled={searchSubmitting}>
                        Искать
                    </button>
                </div>
            </RowBlockUpper>

            <RowBlock>
                <PaymentModal onShow={isModalOpen} setShow={setIsModalOpen} canLeave={true} variantId={variantId} />
                <div className="space-y-8 select-none">
                    {mainData && mainData.map((product) => (
                        <ProductCardForMainpage product={product}
                                                handleModalOpen={handleModalOpen}
                                                isPurchasing={role == 'user'}
                                                key={product.product_id} />
                    ))}
                </div>
            </RowBlock>
        </>
    )
}