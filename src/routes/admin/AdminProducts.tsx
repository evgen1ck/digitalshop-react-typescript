import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {RowBlock} from "../../components/Blocks/PageBlocks"
import {
    AdminProductCard,
    ProductWithVariant
} from "../../components/Cards/ProductCards"
import {
    ApiAdminVariantUrl,
    deleteAxioser,
    getAxioser
} from "../../lib/queries"
import httpErrorsHandler from "../../lib/responds"
import {CentralTextBlock} from "../../components/Blocks/CentralTextBlock"
import {toast} from "react-hot-toast"
import axios, {AxiosError} from "axios"
import Select from "react-select"
import {formatGroupLabel} from "../../components/Dropdowns/DropDownData"


export default function AdminProducts() {
    const navigate = useNavigate()

    const [deleteLoading, setDeleteLoading] = useState(false)

    const [uploadData, setUploadData] = useState<object[]>([]);
    const [uploadLoading, setUploadLoading] = useState(false)

    const [mainData, setMainData] = useState<ProductWithVariant[]>([])
    const [mainDataLoading, setMainDataLoading] = useState(true)
    const [mainDataError, setMainDataError] = useState("")
    useEffect(() => {
        setMainDataLoading(true)
        getAxioser(ApiAdminVariantUrl).then(data => {
            setMainData(data)
        }).catch((response) => {
            httpErrorsHandler(response, navigate)
            setMainDataError("Серверная ошибка получения данных")
        }).finally(() => setMainDataLoading(false))
    }, [])
    if (mainDataLoading) return <CentralTextBlock text="Ожидаем ответ..." />
    if (mainDataError) return <CentralTextBlock text={mainDataError} />


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


    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadLoading(true);
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const content = e.target.result as string;
                    const lines = content.split("\n");
                    const objects = lines.map((line) => ({ data: line.trim() }));
                    setUploadData(objects);
                }
            };
            reader.readAsText(file);
        }
        console.log(uploadData);
        setUploadLoading(false);
    };

    return (
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="sm:text-3xl text-2xl font-bold mb-6 uppercase select-none">Продукты</h3>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="flex justify-between items-center space-x-3">
                    <div className="inline-flex lg:w-1/2 w-full">

                    </div>
                    <div className="flex justify-end items-center space-x-3 mb-6">
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
                    {mainData && mainData.map((data) => (
                        <AdminProductCard variant={data}
                                          handleFile={handleFile}
                                          uploadLoading={uploadLoading}
                                          deleteLoading={deleteLoading}
                                          handleDelete={handleDeleteClick}
                                          key={data.variant_id} />
                    ))}
                </div>
            </RowBlock>

        </>
    )
}