import React, {useEffect, useMemo, useRef, useState} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {RowBlock, RowBlockUpper} from "../../components/Blocks/PageBlocks"
import {
    AdminProductCard,
    ProductWithVariant
} from "../../components/Cards/ProductCards"
import {
    ApiAdminVariantUrl,
    deleteAxioser,
    getAxioser, putAxioser
} from "../../lib/queries"
import httpErrorsHandler from "../../lib/responds"
import {CentralTextBlock} from "../../components/Blocks/CentralTextBlock"
import {toast} from "react-hot-toast"
import axios, {AxiosError} from "axios"
import Select from "react-select"
import {formatGroupLabel} from "../../components/Dropdowns/DropDownData"
import {isMinMaxLen, isNotBlank, isNotContainsConsecutiveSpaces} from "../../lib/validators";
import {GoPlus} from "react-icons/go";
import {SortDropDown} from "../../components/Dropdowns/SortDropDown";
import InputWithValidation, {TEXT} from "../../components/Inputs/InputWithValidation";
import {useAuthContext} from "../../storage/auth";
import {translateSort} from "../../lib/translate";
import {FaSortAmountDown, FaSortAmountDownAlt} from "react-icons/fa";
import CommonCheckField from "../../components/Checkboxs/Checkboxs";
import {tr} from "date-fns/locale";


export default function AdminProducts() {
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { role } = useAuthContext()

    const [searchSubmitting2, setSearchSubmitting2] = useState(queryParams.get('active_first') !== null ? queryParams.get('active_first') === "true" : true)

    const [deleteLoading, setDeleteLoading] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)

    const [searchSubmitting, setSearchSubmitting] = useState(false)
    const [searchValue, setSearchValue] = useState(decodeURIComponent(queryParams.get('search') || ""))
    const [searchError, setSearchError] = useState("")
    const searchRef = useRef<HTMLInputElement>(null)

    const [sortValue, setSortValue] = useState("")
    const [sortError, setSortError] = useState("")
    const [sortsLoading, setSortsLoading] = useState(false)
    const [sortsDisabled, setSortsDisabled] = useState(false)

    const [sortTypeIsAsc, setSortTypeIsAsc] = useState(queryParams.get("sort_type") == "desc")

    const [mainData, setMainData] = useState<ProductWithVariant[]>([])
    const [mainDataLoading, setMainDataLoading] = useState(true)
    const [mainDataError, setMainDataError] = useState("")
    const goUpdate = () => {
        setMainDataLoading(true);
        getAxioser(ApiAdminVariantUrl + "?" + queryParams).then((data) => {
            setMainData(data);
        }).catch((response) => {
            httpErrorsHandler(response, navigate);
            setMainDataError("Серверная ошибка получения данных");
        }).finally(() => setMainDataLoading(false));
    };

    useEffect(() => {
        goUpdate();
    }, []);

    const updatedQueryParams = useMemo(() => {
        return new URLSearchParams(location.search);
    }, [location.search]);
    useEffect(() => {
        goUpdate()
    }, [updatedQueryParams])

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

        navigate(`?${queryParams.toString()}`)
        setSearchSubmitting(false)
    }

    useEffect(() => {
        setSortsLoading(true)
        let sortBy: string = translateSort(sortValue, true)

        queryParams.set('sort_by', sortBy)

        navigate(`?${queryParams.toString()}`)
        setSortsLoading(false)
    }, [sortValue])

    useEffect(() => {
        setSortsLoading(true)

        queryParams.set('active_first', String(searchSubmitting2))

        navigate(`?${queryParams.toString()}`)
        setSortsLoading(false)
    }, [searchSubmitting2])

    async function handleDeleteClick(id: string) {
        setDeleteLoading(true)
        deleteAxioser(ApiAdminVariantUrl + "?id=" + id).then(() => {
            toast.success("Удаление прошло успешно")
            setMainData(data => data.filter(item => item.variant_id !== id))
        }).catch((error: AxiosError) => {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status == 409) {
                    toast.error("Продукт используется в заказах")
                } else
                    httpErrorsHandler(error.response, navigate)
            }
        }).finally(() => setDeleteLoading(false))
    }

    function handleSortTypeClick() {
        setSortTypeIsAsc(!sortTypeIsAsc)
        queryParams.set('sort_type', sortTypeIsAsc ? "asc" : "desc")
        navigate(`?${queryParams.toString()}`)
    }

    function handleClearClick() {
        setSearchValue("")
        setSortTypeIsAsc(false)
        setSortValue("по типу")
        setSearchSubmitting2(true)

        queryParams.delete('search')
        queryParams.delete('sort_type')
        queryParams.delete('sort_by')
        queryParams.delete('active_first')
        navigate(`?${queryParams.toString()}`)
    }

    return (
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="sm:text-3xl text-2xl font-bold mb-6 uppercase select-none">Поиск по товарам</h3>
                </div>
            </RowBlock>
            <RowBlockUpper addToClassName="items-center justify-center flex">
                <div className="inline-flex sm:w-2/3 sm:items-center w-full">
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
                    <button className="btn-classic-frame select-none flex text-center h-12 px-4 py-2 sm:mb-7 mt-2 sm:text-xl text-lg uppercase"
                            type="submit"
                            onClick={goSearch}
                            disabled={searchSubmitting || searchValue == ""}>
                        Искать
                    </button>
                </div>
            </RowBlockUpper>

            <RowBlock>
                <div className="flex justify-between items-center space-x-3">
                    <div className="inline-flex lg:w-[44%] w-full">
                        <SortDropDown addToClassName=""
                                      header="Сортировки"
                                      nameField="Сортировка"
                                      placeholder="Поле сортировки"
                                      id="field-sort"
                                      isLoading={sortsLoading}
                                      setLoading={setSortsLoading}
                                      navigate={navigate}
                                      isClearable={false}
                                      isSearchable={false}
                                      defaultValue={translateSort(queryParams.get("sort_by") || "type_name", false)}
                                      setError={setSortError}
                                      error={sortError}
                                      setValue={setSortValue}
                                      value={sortValue}
                                      disabled={sortsDisabled}
                                      setDisabled={setSortsDisabled}
                                      checkOnEmpty={true}
                                      hasWarnLabel={true} />
                        <button className="btn-classic-frame select-none flex text-center sm:mt-8 mt-7 h-11 cursor-pointer p-3"
                                type="submit"
                                onClick={handleSortTypeClick}>
                            {sortTypeIsAsc ? <FaSortAmountDown /> : <FaSortAmountDownAlt /> }
                        </button>
                        <button className="btn-classic-frame select-none flex text-center sm:mt-8 mt-7 h-11 cursor-pointer p-3 ml-4 uppercase"
                                type="submit"
                                onClick={handleClearClick}>
                            Очистить
                        </button>
                    </div>
                    <div className="flex justify-end items-center space-x-3 mb-6">
                        <div className="text-center w-auto mt-4">
                            <CommonCheckField id={"field-active-first"} text={"Сначала активные"} value={searchSubmitting2} setValue={setSearchSubmitting2} />
                        </div>
                        <div className="text-center w-auto mt-4">
                            <button className="btn-classic-frame select-none px-6 py-2.5 sm:text-xl text-lg uppercase"
                                    onClick={() => {goUpdate()}}>
                                Обновить
                            </button>
                        </div>
                        <div className="text-center w-auto mt-4">
                            <Link className="btn-classic-frame select-none px-6 py-2.5 sm:text-xl text-lg uppercase"
                                  to="add">
                                Добавить
                            </Link>
                        </div>
                    </div>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="space-y-8 select-none">
                    {mainDataLoading && <CentralTextBlock text="Загрузка данных..." />}
                    {mainDataError && <CentralTextBlock text={mainDataError} />}
                    {mainData && mainData.map((data) => (
                        <AdminProductCard variant={data}
                                          uploadLoading={uploadLoading}
                                          deleteLoading={deleteLoading}
                                          handleDelete={handleDeleteClick}
                                          key={data.variant_id} />
                    ))}
                    {mainData == null && (<CentralTextBlock text={"Не найдено"} />)}
                </div>
            </RowBlock>
        </>
    )
}