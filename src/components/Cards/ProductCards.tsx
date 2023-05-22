import React, {useState} from "react"
import SVGIcon from "../Icons/SvgIconColor"
import {
    translateProductItem,
    translateProductState,
    translateProductSubtype,
    translateProductType,
    translateTextQuantity
} from "../../lib/translate"
import {Link} from "react-router-dom"
import { Hint } from "@skbkontur/react-ui"

export interface Variant {
    variant_name: string
    variant_id: string
    service: string
    service_svg_url: string
    state: string
    item: string
    mask: string
    text_quantity: string
    price: number
    discount_money: number
    discount_percent: number
    final_price: number
}

export interface Subtype {
    subtype_name: string
    type: string
    variants: Variant[]
}

export interface Product {
    product_name: string
    product_id: string
    product_image_url: string
    description: string
    subtypes: Subtype[]
}

interface UniqueService {
    serviceName: string
    svgUrl: string
}

interface ProductCardForMainpageProps {
    product: Product
    handleModalOpen: (id: string) => void
    isPurchasing: boolean
}

export const ProductCardForMainpage = ({product, handleModalOpen, isPurchasing}: ProductCardForMainpageProps) => {
    return (
        <div className="px-6 py-4 bg-light-additional2 dark:bg-dark-additional2 rounded-lg border-solid border-2 border-light-second dark:border-dark-second">
            <div className="flex justify-center bg-light-additional dark:bg-dark-additional hover:hover:-translate-1.5 system-animation rounded-lg">
                <div className="flex flex-col rounded-lg bg-white shadow-lg md:flex-row h-max border-solid border-2 border-light-second dark:border-dark-second">
                    <img className="w-full max-w-full h-auto rounded-l-lg object-cover md:h-auto md:w-2/5"
                         src={product.product_image_url}
                         alt="" />
                    <div className="flex flex-col justify-start px-6 py-4">
                        <h1 className="mb-2 sm:text-3xl text-xl font-bold uppercase">
                            {product.product_name}
                        </h1>
                        <p className="mb-4 sm:text-base text-sm text-justify leading-tight xl:line-clamp-6 lg:line-clamp-6 md:line-clamp-5 sm:line-clamp-4 max-sm:line-clamp-3">
                            {product.description}
                        </p>
                        <p className="mb-4 sm:text-base text-sm text-justify leading-tight xl:line-clamp-6 lg:line-clamp-6 md:line-clamp-5 sm:line-clamp-4 max-sm:line-clamp-3">
                            <ProductSvgIcons product={product} />
                        </p>
                    </div>
                </div>
            </div>

            {product.subtypes.map((subtype) => (
                <div key={subtype.subtype_name}>
                    <div className="flex flex-wrap space-x-4 pt-6 pb-3 items-center">
                        <h2 className="mb-2 sm:text-2xl text-xl font-bold">
                            {translateProductType(subtype.type)}
                        </h2>
                        <h2 className="mb-1 sm:text-xl text-lg font-bold">
                            {translateProductSubtype(subtype.subtype_name)}
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {subtype.variants.map((variant) => (
                            <div className={`flex sm:w-auto w-full flex-col rounded-lg bg-white shadow-lg sm:flex-row h-max bg-light-additional dark:bg-dark-additional ${variant.text_quantity.includes("out of stock") || variant.state.includes("unavailable")  ? "cursor-not-allowed" : "hover:-translate-y-1.5 system-animation btn-classic-frame cursor-pointer"}`}
                                 key={variant.variant_id}>
                                <div className={`flex flex-col justify-start px-6 py-4 ${variant.text_quantity.includes("out of stock") || variant.state.includes("unavailable") || !isPurchasing ? "cursor-not-allowed" : "cursor-pointer"}`}
                                     onClick={() => {
                                         if (!(variant.text_quantity.includes("out of stock") || variant.state.includes("unavailable") || !isPurchasing))
                                             handleModalOpen(variant.variant_id)
                                     }}>
                                    <span className="pb-1">
                                        <h3 className="sm:text-xl text-lg font-bold uppercase inline-block">
                                            {variant.variant_name}
                                        </h3>
                                    </span>
                                    <span className="pb-1">
                                        <p className={`text-base ${variant.state.includes("unavailable without price") && "invisible"}`}>
                                            <b className={`border-solid ${variant.discount_percent > 0 || variant.discount_money > 0 ? "line-through pr-1 text-light-second dark:text-dark-second" : variant.text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "text-error"}`}>
                                                {Intl.NumberFormat("ru-RU").format(variant.price)}₽
                                            </b>
                                            {(variant.discount_percent > 0 || variant.discount_money > 0) && (
                                                <b className={variant.text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "border-solid text-error"}>
                                                    {Intl.NumberFormat("ru-RU").format(variant.final_price)}₽
                                                </b>
                                            )}
                                            {variant.discount_percent > 0 && (
                                                <span className="ml-2 sm:text-sm text-xs text-gray-500">
                                                    Скидка {variant.discount_percent}%
                                                </span>
                                            )}
                                            {variant.discount_money > 0 && (
                                                <span className="ml-2 sm:text-sm text-xs text-gray-500">
                                                    Скидка: {Intl.NumberFormat("ru-RU").format(variant.discount_money)}₽
                                                </span>
                                            )}
                                        </p>
                                    </span>
                                    <div className="flex justify-between items-center space-x-3">
                                        <p className="sm:text-base text-sm">
                                            {translateTextQuantity(variant.text_quantity)}
                                        </p>
                                        <div className="flex items-center">
                                            <p className="sm:text-base text-sm">
                                                {variant.service.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

const ProductSvgIcons = (props: {product: Product}) => {
    const { product } = props

    const uniqueServices: UniqueService[] = product.subtypes
        .flatMap((subtype) => subtype.variants)
        .reduce((accumulator: UniqueService[], variant: Variant) => {
            const serviceName = variant.service.toUpperCase() 
            if (!accumulator.some((item) => item.serviceName === serviceName)) {
                accumulator.push({ serviceName, svgUrl: variant.service_svg_url }) 
            }
            return accumulator 
        }, []) 
    return (
        <>
            {uniqueServices.map((serviceItem) => (
                <span className="sm:text-xl text-lg items-center inline-flex"
                      key={serviceItem.serviceName}>
                    {!serviceItem.serviceName.toLowerCase().includes("universal") && (
                        <SVGIcon
                            url={serviceItem.svgUrl}
                            alt={serviceItem.serviceName}
                            className="sm:w-6 w-5 sm:h-6 h-5"
                        />
                    )}
                    <span className="pl-1 pr-4">{serviceItem.serviceName}</span>
                </span>
            ))}
        </>
    )
}

export interface ProductWithVariant {
    product_id: string
    product_image_url: string
    product_name: string
    description: string
    type_name: string
    subtype_name: string
    variant_id: string
    service_svg_url: string
    variant_name: string
    service_name: string
    state_name: string
    item_name: string
    mask: string
    text_quantity: string
    quantity_current: number
    quantity_sold: number
    price: number
    discount_money: number
    discount_percent: number
    final_price: number
}

interface AdminProductCardProps {
    variant: ProductWithVariant
    handleFile: React.ChangeEventHandler<HTMLInputElement>
    handleEdit?: (id: string) => void
    handleDelete: (id: string) => void
    deleteLoading: boolean
    uploadLoading: boolean
}

export const AdminProductCard = ({ variant, handleDelete, deleteLoading, handleFile, uploadLoading }: AdminProductCardProps) => {
    const [hoveredCard, setHoveredCard] = useState("");

    return (
        <div className={`flex sm:w-auto flex-col rounded-lg bg-white shadow-lg h-max bg-light-additional dark:bg-dark-additional ${variant.state_name == "active" && "hover:-translate-y-1.5 system-animation btn-classic-frame"}`}>
            <div className={`flex flex-col justify-start px-6 py-4 ${variant.quantity_current == 0 && "bg-light-additional dark:bg-dark-additional"}`}
                 onMouseEnter={() => setHoveredCard(variant.variant_id)}
                 onMouseLeave={() => setHoveredCard("")}>
                <div className="flex justify-between items-center">
                    <span className="pb-1 lg:space-x-5 sm:space-x-1 flex-grow inline-block">
                        <h3 className="sm:text-lg text-base font-bold uppercase inline-block">
                            {variant.product_name}
                        </h3>
                        <h3 className="sm:text-lg text-base font-bold uppercase inline-block text-light-second dark:text-dark-second">
                            {translateProductType(variant.type_name)}
                        </h3>
                        <h3 className="sm:text-lg text-base font-bold uppercase inline-block text-light-second dark:text-dark-second">
                            {translateProductSubtype(variant.subtype_name)}
                        </h3>
                    </span>
                    <span>
                        {hoveredCard == variant.variant_id && (
                            <label className={`btn-classic block lg:inline-block lg:mt-0 ml-4 ${uploadLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                                   htmlFor="dropzone-file">
                                Пополнить
                                <input
                                    id="dropzone-file"
                                    accept=".txt"
                                    type="file"
                                    className="hidden"
                                    disabled={uploadLoading}
                                    onChange={handleFile}
                                />
                            </label>
                        )}
                        {hoveredCard == variant.variant_id && (
                            <Link
                                className="btn-classic block lg:inline-block lg:mt-0 ml-4"
                                to={"edit?id="+variant.variant_id}>
                                Изменить
                            </Link>
                        )}
                        {hoveredCard == variant.variant_id && (
                            <button className="btn-classic block lg:inline-block text-error lg:mt-0 ml-4"
                                    onDoubleClick={() => {handleDelete(variant.variant_id)}}
                                    disabled={deleteLoading}>
                                Удалить
                            </button>
                        )}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="pb-1 space-x-3">
                        <h3 className="sm:text-2xl text-xl font-bold uppercase inline-block">
                            {variant.variant_name}
                        </h3>
                    </span>
                </div>
                <span className="pb-1">
                    <p className={`text-base`}>
                        <b className={`border-solid ${variant.discount_percent > 0 || variant.discount_money > 0 ? "line-through pr-1 text-light-second dark:text-dark-second" : variant.text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "text-error"}`}>
                            {Intl.NumberFormat("ru-RU").format(variant.price)}₽
                        </b>
                        {(variant.discount_percent > 0 || variant.discount_money > 0) && (
                            <b className={variant.text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "border-solid text-error"}>
                                {Intl.NumberFormat("ru-RU").format(variant.final_price)}₽
                            </b>
                        )}
                        {variant.discount_percent > 0 && (
                            <span className="ml-2 sm:text-sm text-xs text-gray-500">
                                Скидка {variant.discount_percent}%
                            </span>
                        )}
                        {variant.discount_money > 0 && (
                            <span className="ml-2 sm:text-sm text-xs text-gray-500">
                                Скидка: {Intl.NumberFormat("ru-RU").format(variant.discount_money)}₽
                            </span>
                        )}
                    </p>
                </span>
                <div className="flex justify-between items-center space-x-3">
                    <div className="flex items-center space-x-3 uppercase">
                        <p className={variant.state_name == "deleted" ? "text-error" : undefined}>
                            {translateProductState(variant.state_name)}
                        </p>
                        {variant.text_quantity != "" &&
                            <p className="sm:text-base text-sm">
                                {translateTextQuantity(variant.text_quantity)}
                            </p>
                        }
                        {variant.quantity_current != 0 &&
                            <p className="sm:text-base text-sm">
                                {variant.quantity_current > 1 && `в наличии ${variant.quantity_current} шт.`}
                                {variant.quantity_current > 1 && variant.quantity_sold > 0 && ` / `}
                                {variant.quantity_sold > 0 && `продано ${variant.quantity_sold} шт.`}
                            </p>
                        }
                    </div>
                    <div className="flex items-center justify-end space-x-3">
                        <span>
                            <Hint text={variant.mask} pos={"bottom"}>
                                {translateProductItem(variant.item_name).toUpperCase()}
                            </Hint>
                        </span>
                        <span className="sm:text-xl text-lg items-center inline-flex space-x-2">
                            <span className="pl-1">{variant.service_name.toUpperCase()}</span>
                            {!variant.service_name.toLowerCase().includes("universal") && (
                                <SVGIcon
                                    url={variant.service_svg_url}
                                    alt={variant.service_name}
                                    className="sm:w-6 w-5 sm:h-6 h-5"
                                />
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}