import React, {ChangeEvent, useEffect, useRef, useState} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {
    ApiAdminServiceUrl,
    ApiAdminSubtypeUrl,
    ApiAdminTypeUrl,
    getAxioser,
    patchAxioser, patchAxioserWithFormData,
    postAxioser, postAxioserWithFormData
} from "../../lib/queries";
import {toast} from "react-hot-toast";
import axios, {AxiosResponse} from "axios";
import {isMinMaxLen, isNotBlank, isNotContainsConsecutiveSpaces} from "../../lib/validators";
import httpErrorsHandler from "../../lib/responds";
import {CentralTextBlock} from "../../components/Blocks/CentralTextBlock";
import {RowBlock, RowBlockUpper} from "../../components/Blocks/PageBlocks";
import InputWithValidation, {TEXT} from "../../components/Inputs/InputWithValidation";
import {DataOption} from "../../components/Dropdowns/ServicesDropDown";
import {HistoryNavigation} from "../../lib/redirect";

interface AddModalProps {
    onShow: boolean
    setShow: (value: boolean) => void
    canLeave: boolean
    name: string
}

export const ServiceEdit = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const [data, setData] = useState<DataOption[]>([])
    const [loadingError, setLoadingError] = useState(false);

    const [file, setFile] = useState<File | null>(null)

    const [textUpdated, setTextUpdated] = useState(false);
    const [fileUpdated, setFileUpdated] = useState(false);

    useEffect(() => {
        setTextUpdated(true);
    }, [value]);

    useEffect(() => {
        const id = new URLSearchParams(location.search).get("name")
        getAxioser(ApiAdminServiceUrl + "?service_name=" + id).then((data2: DataOption[]) => {
            if (data2 && data2.length > 0) {
                setData(data2)
                setValue(data2[0].service_name)
                console.log(data2[0].service_name)
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

        let body = {};

        if (textUpdated && data[0].service_name.toLowerCase() != value.toLowerCase()) {
            body = { service_name2: value };
        }

        if (fileUpdated || textUpdated) {
            patchAxioserWithFormData(ApiAdminServiceUrl+"?service_name="+data[0].service_name, body, fileUpdated ? file || undefined : undefined).then(() => {
                toast.success("Добавление прошло успешно");
                HistoryNavigation(navigate, "/admin/products/add", window.history.length)
            }).catch((error) => {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        if (error.response.status == 409)
                            toast.error("Невозможно добавить, такой сервис уже есть");
                        else
                            httpErrorsHandler(error.response, navigate)
                    } else {
                        console.log('Error', error.message);
                    }
                }
            }).finally(() => setIsSubmitting(false));
        }
    }

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files?.[0];
        if (newFile) {
            const sizeInMB = newFile.size / (1024*1024);
            if (sizeInMB > 5) {
                toast.error(`Файл слишком большой! Максимальный размер файла: 5 MB`);
                return;
            } else if (sizeInMB < 0.001) {
                toast.error(`Файл слишком маленький! Минимальный размер файла: 0.2 MB`);
                return;
            } else if (!newFile.name.endsWith('.svg')) {
                toast.error(`Файл должен быть в формате .svg`);
                return;
            } else {
                setFileUpdated(true);
                setFile(newFile);
            }
        }
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
                <CentralTextBlock text={"Изменение сервиса"} />
            </RowBlock>

            <RowBlock>
                <label className="flex items-center p-3 border btn-classic-frame select-none space-x-2 cursor-pointer mx-3"
                       htmlFor={"field-svg"}>
                    <input id={"field-svg"}
                           type="file" accept="image/svg+xml"
                           onChange={handleImageUpload}
                           disabled={isSubmitting}
                           className="w-4 h-4 checkbox-classic" />
                    <label htmlFor={"field-svg"}
                           className="w-full text-base uppercase cursor-pointer">
                        {"Изменить .SVG файл"}
                    </label>
                </label>
            </RowBlock>

            <RowBlockUpper>
                <InputWithValidation
                    nameField={"Название сервиса"}
                    placeholder={"STEAM"}
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

