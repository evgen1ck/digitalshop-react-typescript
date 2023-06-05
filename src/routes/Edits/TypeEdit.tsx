import React, {useEffect, useRef, useState} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {ApiAdminSubtypeUrl, ApiAdminTypeUrl, getAxioser, patchAxioser, postAxioser} from "../../lib/queries";
import {toast} from "react-hot-toast";
import axios, {AxiosResponse} from "axios";
import {isMinMaxLen, isNotBlank, isNotContainsConsecutiveSpaces} from "../../lib/validators";
import httpErrorsHandler from "../../lib/responds";
import {CentralTextBlock} from "../../components/Blocks/CentralTextBlock";
import {RowBlock, RowBlockUpper} from "../../components/Blocks/PageBlocks";
import InputWithValidation, {TEXT} from "../../components/Inputs/InputWithValidation";
import {DataOption} from "../../components/Dropdowns/TypesDropDown";
import {HistoryNavigation} from "../../lib/redirect";

interface AddModalProps {
    onShow: boolean
    setShow: (value: boolean) => void
    canLeave: boolean
    name: string
}

export const TypeEdit = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const [data, setData] = useState<DataOption[]>([])
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        const id = new URLSearchParams(location.search).get("name")
        getAxioser(ApiAdminTypeUrl + "?type_name=" + id).then((data2: DataOption[]) => {
            if (data2 && data2.length > 0) {
                setData(data2)
                setValue(data2[0].type_name)
                console.log(data2[0].type_name)
            } else {
                setLoadingError(true)
            }
        }).catch(() => {
            setLoadingError(true)
        }).finally(() => setIsSubmitting(false));
    }, [])

    async function handleAddClick() {
        setError("")
        inputRef.current?.focus()
        inputRef.current?.blur()

        if (value == "") {
            setIsSubmitting(false)
            return
        }

        if (data[0].type_name.toLowerCase() == value.toLowerCase()) {
            toast.error("Нет изменений")
            return
        }

        patchAxioser(ApiAdminTypeUrl + "?type_name=" + data[0].type_name, {type_name: value}).then(() => {
            toast.success("Изменение прошло успешно")
            HistoryNavigation(navigate, "/admin/products/add", window.history.length)
        }).catch((error) => {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status == 409)
                        toast.error("Невозможно добавить, такой тип уже есть");
                    else
                        httpErrorsHandler(error.response, navigate)
                } else {
                    console.log('Error', error.message);
                }
            }
        }).finally(() => setIsSubmitting(false))
    }

    if (loadingError) {
        return (
            <>
                <CentralTextBlock text={"Данные не найдены"} />
                <RowBlock>
                    <div className="text-center w-full lg:flex lg:justify-center select-none">
                        <Link to="/admin/products/add" className="btn-usual-link">Вернуться назад</Link>
                    </div>
                </RowBlock>
            </>
        )
    }

    return (
        <div className={"mx-auto max-w-4xl"}>
            <RowBlock>
                <CentralTextBlock text={"Изменение типа"} />
            </RowBlock>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"Название типа"}
                    placeholder={"GAMES"}
                    id={"field-name"}
                    type={TEXT}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(4, 512), isNotContainsConsecutiveSpaces]}
                    setValue={setValue}
                    value={value}
                    setError={setError}
                    error={error}
                    inputRef={inputRef}
                    requiredField={true}
                    insertSpace={true} />
            </RowBlockUpper>

            <RowBlock>
                <div className="text-center w-full">
                    <button className="btn-classic-frame select-none px-6 py-2.5 sm:text-xl text-lg uppercase"
                            type="submit"
                            onClick={handleAddClick}
                            disabled={isSubmitting || error != ""}>
                        Изменить
                    </button>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full lg:flex lg:justify-center select-none">
                    <button onClick={()=>{HistoryNavigation(navigate, "/admin/products", window.history.length)}} className="btn-usual-link">Вернуться назад</button>
                </div>
            </RowBlock>
        </div>
    )
}

