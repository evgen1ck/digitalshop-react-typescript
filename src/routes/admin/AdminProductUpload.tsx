import React, {useEffect, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom"
import {
    ApiAdminVariantUploadUrl, ApiAdminVariantUrl, deleteAxioser,
    getAxioser, postAxioser,
} from "../../lib/queries";
import httpErrorsHandler from "../../lib/responds";
import {CentralTextBlock} from "../../components/Blocks/CentralTextBlock";
import {RowBlock} from "../../components/Blocks/PageBlocks";
import {toast} from "react-hot-toast";
import {isMinMaxLen, isNotBlank, isNotContainsConsecutiveSpaces} from "../../lib/validators";
import {Content, ContentCard} from "../../components/Cards/ContentCards";
import {HistoryNavigation} from "../../lib/redirect";
import axios, {AxiosError} from "axios";

const AdminProductUpload = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const [deleteLoading, setDeleteLoading] = useState(false)

    const [mainData, setMainData] = useState<Content[]>([])
    const [mainDataLoading, setMainDataLoading] = useState(true)
    const [mainDataError, setMainDataError] = useState("")

    const [uploadLoading, setUploadLoading] = useState(false)

    const goUpdate = () => {
        const id = new URLSearchParams(location.search).get("id")
        if (id == null) {
            setMainDataError("Отсутствует параметр id")
            return
        }
        setMainDataLoading(true);
        getAxioser(ApiAdminVariantUploadUrl + "?id="+id).then((data) => {
            setMainData(data);
        }).catch((response) => {
            httpErrorsHandler(response, navigate);
            setMainDataError("Серверная ошибка получения данных");
        }).finally(() => setMainDataLoading(false));
    }

    useEffect(() => {
        goUpdate()
    }, []);

    async function handleDeleteClick(id: string) {
        setDeleteLoading(true)
        deleteAxioser(ApiAdminVariantUploadUrl + "?id=" + id).then(() => {
            toast.success("Удаление прошло успешно")
            setMainData(data => data.filter(item => item.content_id !== id))
        }).catch((error: AxiosError) => {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status == 409)
                    toast.error("Используется в заказах")
                else
                    httpErrorsHandler(error.response, navigate)
            }
        }).finally(() => setDeleteLoading(false))
    }

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadLoading(true);
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const content = e.target.result as string;
                    const lines = content.split("\n");
                    const objects = lines
                        .map((line) => line.trim())
                        .filter((line) => line !== "")
                        .map((line) => ({ data: line }));

                    let lineNum = 0;
                    let hasError = false;
                    objects.forEach((obj) => {
                        lineNum++;
                        const value = obj.data;
                        let errorMessage = "";
                        for (const validator of [
                            isNotBlank,
                            isMinMaxLen(3, 10240),
                            isNotContainsConsecutiveSpaces,
                        ]) {
                            errorMessage = validator(value);
                            if (errorMessage) {
                                toast.error(errorMessage + " на строке " + lineNum);
                                hasError = true;
                                break;
                            }
                        }
                    });

                    if (!hasError && objects.length > 0) {
                        const id = new URLSearchParams(location.search).get("id")
                        postAxioser(ApiAdminVariantUploadUrl + "?id=" + id, objects)
                            .then(() => {
                                toast.success("Пополнение прошло успешно");
                                goUpdate()
                            })
                            .catch((response) => {
                                httpErrorsHandler(response, navigate);
                            })
                            .finally(() => setUploadLoading(false));
                    } else if (objects.length == 0) {
                        toast.error("Файл не содержит текст")
                        setUploadLoading(false);
                    } else {
                        setUploadLoading(false);
                    }
                }
            };

            reader.readAsText(file);
        } else {
            setUploadLoading(false);
        }
    };

    return (
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="sm:text-3xl text-2xl font-bold mb-6 uppercase select-none">Пополнение варианта продукта</h3>
                </div>
            </RowBlock>

            <RowBlock>
                <div className={"flex justify-between items-center"}>
                    <div className="flex justify-end items-center space-x-3">
                        <button className={`btn-classic-frame select-none flex text-center h-12 px-4 py-2 sm:mb-7 mt-2 sm:text-xl text-lg uppercase ${uploadLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                                onClick={() => {goUpdate()}}>
                            Обновить
                        </button>
                    </div>
                    <div className="flex justify-end items-center space-x-3">
                        <label className={`btn-classic-frame select-none flex text-center h-12 px-4 py-2 sm:mb-7 mt-2 sm:text-xl text-lg uppercase ${uploadLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                               htmlFor="dropzone-file">
                            Пополнить
                            <input
                                id="dropzone-file"
                                accept=".txt"
                                type="file"
                                className="hidden"
                                disabled={uploadLoading}
                                onChange={(event) => handleFile(event)}
                            />
                        </label>
                    </div>
                </div>
            </RowBlock>
            <RowBlock>
                <div className="space-y-8 select-none">
                    {mainDataLoading && <CentralTextBlock text="Загрузка данных..." />}
                    {mainDataError && <CentralTextBlock text={mainDataError} />}
                    {mainData && mainData.map((data) => (
                        <ContentCard key={data.content_id}
                                     content={data}
                                     deleteLoading={uploadLoading}
                                     handleDelete={handleDeleteClick} />
                    ))}
                    {mainData == null && (<CentralTextBlock text={"Пусто"} />)}
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full lg:flex lg:justify-center select-none">
                    <button onClick={() => {HistoryNavigation(navigate, "/admin/products", window.history.length)}}
                            className="btn-usual-link cursor-pointer">
                        Вернуться назад
                    </button>
                </div>
            </RowBlock>
        </>
    )
}

export default AdminProductUpload