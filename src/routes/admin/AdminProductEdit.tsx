import React, {useEffect, useRef, useState} from 'react'
import {Link, useLocation, useNavigate, useParams} from "react-router-dom"
import {ServicesDropDown} from "../../components/Dropdowns/ServicesDropDown"
import {RowBlock, RowBlockUpper} from "../../components/Blocks/PageBlocks"
import {GoPlus} from 'react-icons/go'
import InputWithValidation, {NUMBER, TEXT} from "../../components/Inputs/InputWithValidation"
import {
    isNotContainsConsecutiveSpaces,
    isNotContainsSpace,
    isMinMaxLen,
    isNotBlank,
    isMoney, isPercentage
} from "../../lib/validators"
import {ProductsDropDown} from "../../components/Dropdowns/ProductsDropDown"
import {TypesDropDown} from "../../components/Dropdowns/TypesDropDown"
import {SubtypesDropDown} from "../../components/Dropdowns/SubtypesDropDown"
import {StatesDropDown} from "../../components/Dropdowns/StatesDropDown"
import {ItemsDropDown} from "../../components/Dropdowns/ItemsDropDown"
import {AuthLogoutQuery} from "../../queries/auth";
import {DeleteUserAuth} from "../../storage/auth";
import {AdminGetTypesQuery, AdminNewVariantQuery, AdminVariantQuery, AdminVariantsQuery} from "../../queries/admin";
import {toast} from "react-hot-toast";

interface IData {
    product_id: string;
    product_image_url: string;
    product_name: string;
    description: string;
}

const AdminProductsEdit = () => {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Types data
    const [typeValue, setTypeValue] = useState('')
    const [typeError, setTypeError] = useState('')
    const [typesLoading, setTypesLoading] = useState(true)
    const [typesDisabled, setTypesDisabled] = useState(false)

    // Subtypes data
    const [subtypeValue, setSubtypeValue] = useState('')
    const [subtypeError, setSubtypeError] = useState('')
    const [subtypesLoading, setSubtypesLoading] = useState(true)
    const [subtypesDisabled, setSubtypesDisabled] = useState(false)

    // Service data
    const [serviceValue, setServiceValue] = useState('')
    const [serviceError, setServiceError] = useState('')
    const [servicesLoading, setServicesLoading] = useState(true)
    const [servicesDisabled, setServicesDisabled] = useState(false)

    // State data
    const [stateValue, setStateValue] = useState('')
    const [stateError, setStateError] = useState('')
    const [statesLoading, setStatesLoading] = useState(true)
    const [statesDisabled, setStatesDisabled] = useState(false)

    // Product data
    const [productValue, setProductValue] = useState('')
    const [productError, setProductError] = useState('')
    const [productsLoading, setProductsLoading] = useState(true)
    const [productsDisabled, setProductsDisabled] = useState(false)

    // Item data
    const [itemValue, setItemValue] = useState('')
    const [itemError, setItemError] = useState('')
    const [itemsLoading, setItemsLoading] = useState(true)
    const [itemsDisabled, setItemsDisabled] = useState(false)

    // Name data
    const [nameValue, setNameValue] = useState('')
    const [nameError, setNameError] = useState('')
    const inputNameRef = useRef<HTMLInputElement>(null)

    // Mask data
    const [maskValue, setMaskValue] = useState('')
    const [maskError, setMaskError] = useState('')
    const inputMaskRef = useRef<HTMLInputElement>(null)

    // Discount money data
    const [discountMoneyValue, setDiscountMoneyValue] = useState('')
    const [discountMoneyError, setDiscountMoneyError] = useState('')
    const inputDiscountMoneyRef = useRef<HTMLInputElement>(null)

    // Discount percent data
    const [discountPercentValue, setDiscountPercentValue] = useState('')
    const [discountPercentError, setDiscountPercentError] = useState('')
    const inputDiscountPercentRef = useRef<HTMLInputElement>(null)

    // Price data
    const [priceValue, setPriceValue] = useState('')
    const [priceError, setPriceError] = useState('')
    const inputPriceRef = useRef<HTMLInputElement>(null)
    const location = useLocation();

    const [data, setData] = useState<IData[]>([]);

    useEffect(() => {
        const abortController = new AbortController
        const queryParams = new URLSearchParams(location.search);
        const variant_id = queryParams.get('variant_id');

        console.log(variant_id)
        AdminVariantQuery({
            signal: abortController.signal,
            navigate: navigate,
            variantId: variant_id || ""
        }).then(data => {
            setData(data)
        })

        return () => {
            abortController.abort()
        }
    }, [])



    function handleAddClick() {
        setIsSubmitting(true)
        setTypeError("")
        setSubtypeError("")
        setProductError("")
        setNameError("")
        setServiceError("")
        setStateError("")
        setItemError("")
        setMaskError("")
        setPriceError("")
        setDiscountMoneyError("")
        setDiscountPercentError("")

        inputNameRef.current?.focus()
        inputNameRef.current?.blur()
        inputMaskRef.current?.focus()
        inputMaskRef.current?.blur()
        inputPriceRef.current?.focus()
        inputPriceRef.current?.blur()

        if (typeValue == "") setTypeError("Поле обязательно к заполнению!")
        if (subtypeValue == "") setSubtypeError("Поле обязательно к заполнению!")
        if (productValue == "") setProductError("Поле обязательно к заполнению!")
        if (serviceValue == "") setServiceError("Поле обязательно к заполнению!")
        if (stateValue == "") setStateError("Поле обязательно к заполнению!")
        if (itemValue == "") setItemError("Поле обязательно к заполнению!")
        if (typeValue == "" || subtypeValue == "" || productValue == "" || serviceValue == "" || stateValue == "" ||  itemValue == ""|| itemValue == "" || nameValue == "" || maskValue == "" || priceValue == "") {
            setIsSubmitting(false)
            return
        }

        if (discountPercentValue != "" && discountMoneyValue != "") {
            toast.error("Только одно поле скидки может быть заполнено")
            setIsSubmitting(false)
            return
        }

        const priceValueNum = parseFloat(priceValue)
        if (priceValueNum < 10) {
            setPriceError("Цена не может быть меньше 10")
            setIsSubmitting(false)
            return
        }

        const discountMoneyValueNum = parseFloat(discountMoneyValue)
        const discountPercentValueNum = parseFloat(discountPercentValue)

        if (discountMoneyValue !== "" && priceValueNum - discountMoneyValueNum < 10) {
            setDiscountMoneyError("Стоимость товара после скидки должна быть не менее 10")
            setIsSubmitting(false)
            return
        }

        if (discountPercentValue !== "" && priceValueNum - (priceValueNum * discountPercentValueNum / 100) < 10) {
            setDiscountPercentError("Стоимость товара после скидки должна быть не менее 10")
            setIsSubmitting(false)
            return
        }

        AdminNewVariantQuery({
            navigate: navigate,
            subtype: subtypeValue,
            product: productValue,
            name: nameValue,
            service: serviceValue,
            state: stateValue,
            mask: maskValue,
            discountMoney: discountMoneyValue,
            discountPercent: discountPercentValue,
            price: priceValue,
            item: itemValue
        })

        setIsSubmitting(false)
    }

    return (
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="sm:text-3xl text-2xl font-bold mb-6 uppercase select-none">Добавление варианта продукта</h3>
                </div>
            </RowBlock>

            <RowBlockUpper>
                <div className="flex inline-flex lg:w-1/2 w-full">
                    <TypesDropDown addToClassName=""
                                   header="Типы"
                                   nameField="Тип"
                                   placeholder="Поле типа"
                                   id="field-type"
                                   isLoading={typesLoading}
                                   setLoading={setTypesLoading}
                                   navigate={navigate}
                                   isClearable={true}
                                   isSearchable={true}
                                   setError={setTypeError}
                                   error={typeError}
                                   setValue={setTypeValue}
                                   value={typeValue}
                                   disabled={typesDisabled}
                                   setDisabled={setTypesDisabled}
                                   checkOnEmpty={true}
                                   hasWarnLabel={true} />
                </div>
                <div className="flex inline-flex lg:w-1/2 w-full">
                    <SubtypesDropDown addToClassName=""
                                      header="Подтипы"
                                      nameField="Подтип"
                                      placeholder="Поле подтипа"
                                      id="field-subtype"
                                      isLoading={subtypesLoading}
                                      setLoading={setSubtypesLoading}
                                      navigate={navigate}
                                      isClearable={true}
                                      isSearchable={true}
                                      setError={setSubtypeError}
                                      error={subtypeError}
                                      setValue={setSubtypeValue}
                                      value={subtypeValue}
                                      disabled={subtypesDisabled}
                                      setDisabled={setSubtypesDisabled}
                                      checkOnEmpty={true}
                                      typeName={typeValue}
                                      hasWarnLabel={true} />
                </div>
            </RowBlockUpper>

            <RowBlockUpper>
                <div className="flex inline-flex lg:w-1/2 w-full">
                    <ProductsDropDown addToClassName=""
                                      header="Продукты"
                                      nameField="Продукт"
                                      placeholder="Поле продукта"
                                      id="field-product"
                                      isLoading={productsLoading}
                                      setLoading={setProductsLoading}
                                      navigate={navigate}
                                      isClearable={true}
                                      isSearchable={true}
                                      setError={setProductError}
                                      error={productError}
                                      setValue={setProductValue}
                                      value={productValue}
                                      disabled={productsDisabled}
                                      setDisabled={setProductsDisabled}
                                      checkOnEmpty={true}
                                      hasWarnLabel={true} />
                    <button className="btn-classic-frame select-none flex text-center p-2 pt-3 sm:mt-8 mt-7 h-11 cursor-pointer"
                            type="submit"
                            disabled={productsDisabled}>
                        <GoPlus />
                    </button>
                </div>
                <div className="flex inline-flex lg:w-1/2 w-full">
                    <InputWithValidation
                        nameField={"Название варианта"}
                        placeholder={"Grand Theft Auto: San Andreas"}
                        id={"field-name"}
                        type={TEXT}
                        hasWarnLabel={true}
                        spellCheck={true}
                        requiredValidators={[isNotBlank, isMinMaxLen(3, 64), isNotContainsConsecutiveSpaces]}
                        setValue={setNameValue}
                        value={nameValue}
                        setError={setNameError}
                        error={nameError}
                        inputRef={inputNameRef}
                        requiredField={true}
                        insertSpace={true} />
                </div>
            </RowBlockUpper>

            <RowBlockUpper addToClassName="">
                <div className="flex inline-flex lg:w-1/2 w-full">
                    <ServicesDropDown addToClassName=""
                                      header="Сервисы"
                                      nameField="Сервис"
                                      placeholder="Поле сервиса"
                                      id="field-service"
                                      isLoading={servicesLoading}
                                      setLoading={setServicesLoading}
                                      navigate={navigate}
                                      isClearable={true}
                                      isSearchable={true}
                                      setError={setServiceError}
                                      error={serviceError}
                                      setValue={setServiceValue}
                                      value={serviceValue}
                                      disabled={servicesDisabled}
                                      setDisabled={setServicesDisabled}
                                      checkOnEmpty={true}
                                      hasWarnLabel={true} />
                    <button className="btn-classic-frame select-none flex text-center p-2 pt-3 sm:mt-8 mt-7 h-11 cursor-pointer"
                            type="submit"
                            disabled={servicesDisabled}>
                        <GoPlus />
                    </button>
                </div>
                <div className="flex inline-flex lg:w-1/2 w-full">
                    <StatesDropDown addToClassName=""
                                    header="Статусы"
                                    nameField="Статус"
                                    placeholder="Поле статуса"
                                    id="field-state"
                                    isLoading={statesLoading}
                                    setLoading={setStatesLoading}
                                    navigate={navigate}
                                    isClearable={true}
                                    isSearchable={true}
                                    setError={setStateError}
                                    error={stateError}
                                    setValue={setStateValue}
                                    value={stateValue}
                                    disabled={statesDisabled}
                                    setDisabled={setStatesDisabled}
                                    checkOnEmpty={true}
                                    hasWarnLabel={true} />
                </div>
            </RowBlockUpper>

            <RowBlockUpper>
                <div className="flex inline-flex lg:w-1/2 w-full">
                    <ItemsDropDown addToClassName=""
                                   header="Форматы"
                                   nameField="Формат"
                                   placeholder="Поле формата"
                                   id="field-item"
                                   isLoading={itemsLoading}
                                   setLoading={setItemsLoading}
                                   navigate={navigate}
                                   isClearable={true}
                                   isSearchable={true}
                                   setError={setItemError}
                                   error={itemError}
                                   setValue={setItemValue}
                                   value={itemValue}
                                   disabled={itemsDisabled}
                                   setDisabled={setItemsDisabled}
                                   checkOnEmpty={true}
                                   hasWarnLabel={true} />
                </div>
                <div className="flex inline-flex lg:w-1/2 w-full">
                    <InputWithValidation
                        nameField={"Маска формата"}
                        placeholder={"AAAAA-BBBBB-CCCCC"}
                        id={"field-mask"}
                        type={TEXT}
                        hasWarnLabel={true}
                        spellCheck={false}
                        maxLength={512}
                        requiredValidators={[isNotBlank, isMinMaxLen(4, 512), isNotContainsSpace]}
                        setValue={setMaskValue}
                        value={maskValue}
                        setError={setMaskError}
                        error={maskError}
                        inputRef={inputMaskRef}
                        requiredField={true}
                        insertSpace={false} />
                </div>
            </RowBlockUpper>

            <RowBlockUpper>
                <div className="flex inline-flex lg:w-1/3 w-full">
                    <InputWithValidation
                        nameField={"Стоимость"}
                        placeholder={"100,2"}
                        id={"field-price"}
                        type={NUMBER}
                        hasWarnLabel={true}
                        spellCheck={false}
                        maxLength={16}
                        requiredValidators={[isNotBlank, isMinMaxLen(1, 16), isNotContainsSpace, isMoney]}
                        setValue={setPriceValue}
                        value={priceValue}
                        setError={setPriceError}
                        error={priceError}
                        inputRef={inputPriceRef}
                        requiredField={true}
                        insertSpace={false} />
                </div>
                <div className="flex inline-flex lg:w-1/3 w-full">
                    <InputWithValidation
                        nameField={"Скидка в деньгах"}
                        placeholder={"100,2"}
                        id={"field-discount-money"}
                        type={NUMBER}
                        hasWarnLabel={true}
                        spellCheck={false}
                        requiredValidators={[isMinMaxLen(1, 16), isNotContainsSpace, isMoney]}
                        setValue={setDiscountMoneyValue}
                        value={discountMoneyValue}
                        setError={setDiscountMoneyError}
                        error={discountMoneyError}
                        inputRef={inputDiscountMoneyRef}
                        requiredField={false}
                        insertSpace={false} />
                </div>
                <div className="flex inline-flex lg:w-1/3 w-full">
                    <InputWithValidation
                        nameField={"Скидка в процентах"}
                        placeholder={"22"}
                        id={"field-discount-percent"}
                        type={NUMBER}
                        hasWarnLabel={true}
                        spellCheck={false}
                        requiredValidators={[isMinMaxLen(1, 2), isNotContainsSpace, isPercentage]}
                        setValue={setDiscountPercentValue}
                        value={discountPercentValue}
                        setError={setDiscountPercentError}
                        error={discountPercentError}
                        inputRef={inputDiscountPercentRef}
                        requiredField={false}
                        insertSpace={false} />
                </div>
            </RowBlockUpper>

            <RowBlock>
                <div className="text-center w-full mt-4">
                    <button className="btn-classic-frame select-none px-6 py-2.5 sm:text-xl text-lg uppercase"
                            type="submit"
                            onClick={handleAddClick}
                            disabled={isSubmitting || typeError != "" || subtypeError != "" || productError != "" || nameError != "" || serviceError != "" || stateError != "" || itemError != "" || maskError != "" || priceError != "" || discountMoneyError != "" || discountPercentError != ""}>
                        Добавить вариант
                    </button>
                </div>

            </RowBlock>
            <RowBlock>
                <div className="text-center w-full lg:flex lg:justify-center select-none">
                    <Link to="/admin/products" className="btn-usual-link">Вернуться назад</Link>
                </div>
            </RowBlock>
        </>
    )
}

export default AdminProductsEdit