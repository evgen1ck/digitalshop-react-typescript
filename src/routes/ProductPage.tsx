import React, {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import {Product, ProductSvgIcons} from "../components/Cards/ProductCards";
import { ApiProductMainpageUrl, getAxioser} from "../lib/queries";
import httpErrorsHandler from "../lib/responds";
import {CentralTextBlock} from "../components/Blocks/CentralTextBlock";
import {
    translateProductItem, translateProductState,
    translateProductSubtype,
    translateProductType,
    translateTextQuantity
} from "../lib/translate";
import {useAuthContext} from "../storage/auth";
import {Hint} from "@skbkontur/react-ui";
import SVGIcon from "../components/Icons/SvgIconColor";
import {PaymentModal} from "../components/Modals/PaymentModal";
import {RowBlock} from "../components/Blocks/PageBlocks";

const ProductPage = () => {
    const navigate = useNavigate()
    const { role } = useAuthContext()

    const [mainData, setMainData] = useState<Product[]>([])
    const [mainDataLoading, setMainDataLoading] = useState(true)
    const [mainDataError, setMainDataError] = useState("")
    const { id } = useParams();

    const [variantId, setVariantId] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleModalOpen = (id: string) => {
        setVariantId(id)
        setIsModalOpen(true)
    }


    useEffect(() => {
        setMainDataLoading(true);
        getAxioser(ApiProductMainpageUrl + "?id="+id).then((data) => {
            setMainData(data);
        }).catch((response) => {
            httpErrorsHandler(response, navigate);
            setMainDataError("Серверная ошибка получения данных");
        }).finally(() => setMainDataLoading(false));
    }, []);

    if (mainDataLoading) {
        return <CentralTextBlock text="Загрука данных..." />
    }

    if (mainDataError) {
        return <CentralTextBlock text="Ошибка получения данных." />
    }

    return (
        <RowBlock>
            <PaymentModal onShow={isModalOpen} setShow={setIsModalOpen} canLeave={true} variantId={variantId} />
            <div className="px-6 py-4 bg-light-additional2 dark:bg-dark-additional2 rounded-lg border-solid border-2 border-light-second dark:border-dark-second select-none">
                <div className="flex justify-center bg-light-additional dark:bg-dark-additional hover:hover:-translate-1.5 system-animation rounded-lg">
                    <div className="flex flex-col rounded-lg bg-white shadow-lg md:flex-row h-max border-solid border-2 border-light-second dark:border-dark-second">
                        <img className="w-full max-w-full h-auto rounded-l-lg object-cover md:h-auto md:w-2/5"
                             src={mainData[0].product_image_url}
                             alt="" />
                        <div className="flex flex-col justify-start px-6 py-4">
                            <h1 className="mb-2 sm:text-3xl text-xl font-bold uppercase">
                                {mainData[0].product_name}
                            </h1>
                            <p className="mb-4 sm:text-base text-sm text-justify leading-tight xl:line-clamp-6 lg:line-clamp-6 md:line-clamp-5 sm:line-clamp-4 max-sm:line-clamp-3">
                                {mainData[0].description}
                            </p>
                            <p className="mb-4 sm:text-base text-sm text-justify leading-tight xl:line-clamp-6 lg:line-clamp-6 md:line-clamp-5 sm:line-clamp-4 max-sm:line-clamp-3">
                                <ProductSvgIcons product={mainData[0]} />
                            </p>
                        </div>
                    </div>
                </div>

                <div className={`flex flex-col justify-start`}>
                    <div className="flex flex-wrap space-x-4 pt-6 pb-3 items-center">
                        <h2 className="mb-2 sm:text-2xl text-xl font-bold">
                            {translateProductType(mainData[0].subtypes[0].type)}
                        </h2>
                        <h2 className="mb-1 sm:text-xl text-lg font-bold">
                            {translateProductSubtype(mainData[0].subtypes[0].subtype_name).toUpperCase()}
                        </h2>
                    </div>
                    <div className={`flex sm:w-auto w-full flex-col rounded-lg bg-white shadow-lg h-max bg-light-additional dark:bg-dark-additional ${mainData[0].subtypes[0].variants[0].text_quantity.includes("out of stock") || mainData[0].subtypes[0].variants[0].state.includes("unavailable") ? "cursor-not-allowed" : `hover:-translate-y-1.5 system-animation btn-classic-frame ${role != "user" ? "cursor-not-allowed": "cursor-pointer"}`}`}
                         onClick={() => {
                             if (!(mainData[0].subtypes[0].variants[0].text_quantity.includes("out of stock") || mainData[0].subtypes[0].variants[0].state.includes("unavailable") || role != "user"))
                                 handleModalOpen(mainData[0].subtypes[0].variants[0].variant_id)
                         }}>
                        <div className={`flex flex-col justify-start px-6 py-4 ${mainData[0].subtypes[0].variants[0].text_quantity.includes("out of stock") || mainData[0].subtypes[0].variants[0].state.includes("unavailable")}`}>
                            <div className="flex justify-between items-center">
                                <span className="pb-1 space-x-3">
                                    <h3 className="sm:text-2xl text-xl font-bold uppercase inline-block">
                                        {mainData[0].subtypes[0].variants[0].variant_name}
                                    </h3>
                                </span>
                            </div>
                            {mainData[0].subtypes[0].variants[0].final_price != 0 && (
                                <span className="pb-1">
                                    <p className={`text-base`}>
                                        <b className={`border-solid ${mainData[0].subtypes[0].variants[0].discount_percent > 0 || mainData[0].subtypes[0].variants[0].discount_money > 0 ? "line-through pr-1 text-light-second dark:text-dark-second" : mainData[0].subtypes[0].variants[0].text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "text-error"}`}>
                                            {Intl.NumberFormat("ru-RU").format(mainData[0].subtypes[0].variants[0].price) + "₽"}
                                        </b>
                                        {(mainData[0].subtypes[0].variants[0].discount_percent > 0 || mainData[0].subtypes[0].variants[0].discount_money > 0) && (
                                            <b className={mainData[0].subtypes[0].variants[0].text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "border-solid text-error"}>
                                                {Intl.NumberFormat("ru-RU").format(mainData[0].subtypes[0].variants[0].final_price)}₽
                                            </b>
                                        )}
                                        {mainData[0].subtypes[0].variants[0].discount_percent > 0 && (
                                            <span className="ml-2 sm:text-sm text-xs text-gray-500">
                                                Скидка {mainData[0].subtypes[0].variants[0].discount_percent}%
                                            </span>
                                        )}
                                        {mainData[0].subtypes[0].variants[0].discount_money > 0 && (
                                            <span className="ml-2 sm:text-sm text-xs text-gray-500">
                                                Скидка: {Intl.NumberFormat("ru-RU").format(mainData[0].subtypes[0].variants[0].discount_money)}₽
                                            </span>
                                        )}
                                    </p>
                                </span>
                            )}
                            <div className="flex justify-between items-center space-x-3">
                                <div className="flex items-center space-x-3 uppercase">
                                    {mainData[0].subtypes[0].variants[0].state != "active" && (
                                        <p className={mainData[0].subtypes[0].variants[0].state == "deleted" ? "text-error" : undefined}>
                                            {translateProductState(mainData[0].subtypes[0].variants[0].state)}
                                        </p>
                                    )}
                                    {mainData[0].subtypes[0].variants[0].text_quantity != "" &&
                                        <p className="sm:text-base text-sm">
                                            {translateTextQuantity(mainData[0].subtypes[0].variants[0].text_quantity)}
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className="sm:flex justify-between items-center space-x-3 pt-2 flex-grow">
                                <span className="inline-flex">
                                    <p className="font-bold pr-2">
                                        Формат:
                                    </p>
                                    <p>
                                        {mainData[0].subtypes[0].variants[0].mask}
                                    </p>
                                </span>
                                <span className="flex items-center space-x-3">
                                    <span>
                                        <Hint text={mainData[0].subtypes[0].variants[0].mask} pos={"bottom"}>
                                            {translateProductItem(mainData[0].subtypes[0].variants[0].item).toUpperCase()}
                                        </Hint>
                                    </span>
                                    <span className="sm:text-xl text-lg items-center inline-flex space-x-2"><span className="pl-1">{mainData[0].subtypes[0].variants[0].service.toUpperCase()}</span>
                                        {!mainData[0].subtypes[0].variants[0].service.toLowerCase().includes("universal") && (
                                            <SVGIcon
                                                url={mainData[0].subtypes[0].variants[0].service_svg_url}
                                                alt={mainData[0].subtypes[0].variants[0].service}
                                                className="sm:w-6 w-5 sm:h-6 h-5"
                                            />
                                        )}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center w-full sm:flex sm:justify-center justify-end select-none pt-4">
                <Link to="/" className="btn-usual-link">Вернуться назад</Link>
            </div>
        </RowBlock>

    )
}

export default ProductPage