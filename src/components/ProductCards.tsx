import React, {useState} from "react"
import {PaymentModal} from "./modals/PaymentModal";
import {CreateUserAuth, useAuthContext} from "../storage/auth";
import SVGIcon from "./SvgIconColor";
import {TranslateProductSubtype, TranslateProductType, TranslateTextQuantity} from "../utils/translate";
import {Link, useNavigate} from "react-router-dom";
import {AuthAloginQuery} from "../queries/auth";
import {AdminDeleteVariantQuery} from "../queries/admin";

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

export const ProductCardForMainpage = (props: { products: Product[] }) => {
    const { products } = props
    const { role } = useAuthContext()

    const [variantId, setVariantId] = useState<string>('')

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleModalOpen = (id: string) => {
        setVariantId(id)
        setIsModalOpen(true)
    }

    return (
        <div className="space-y-8 select-none">
            <PaymentModal onShow={isModalOpen} setShow={setIsModalOpen} canLeave={true} variantId={variantId} />
            {products && products.map((product) => (
                <div className="px-6 py-4 bg-light-additional2 dark:bg-dark-additional2 rounded-lg border-solid border-2 border-light-second dark:border-dark-second"
                     key={product.product_id}>
                    <div className="flex justify-center bg-light-additional dark:bg-dark-additional hover:hover:-translate-1.5 system-animation rounded-lg">
                        <div className="flex flex-col rounded-lg bg-white shadow-lg md:flex-row h-max border-solid border-2 border-light-second dark:border-dark-second">
                            <img className="w-full max-w-full h-auto rounded-l-lg object-cover md:h-auto md:w-2/5"
                                 src={product.product_image_url}
                                 alt={product.product_name} />
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
                        <div key={subtype.subtype_name.replaceAll(" ", "-")}>
                            <div className="flex flex-wrap space-x-4 pt-6 pb-3 items-center">
                                <h2 className="mb-2 sm:text-2xl text-xl font-bold">
                                    {TranslateProductType(subtype.type)}
                                </h2>
                                <h2 className="mb-1 sm:text-xl text-lg font-bold">
                                    {TranslateProductSubtype(subtype.subtype_name)}
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {subtype.variants.map((variant) => (
                                    <div className={`flex flex-col rounded-lg bg-white shadow-lg md:flex-row h-max bg-light-additional dark:bg-dark-additional ${variant.text_quantity.includes("out of stock") || variant.state.includes("unavailable")  ? "cursor-not-allowed" : "hover:hover:-translate-y-1.5 system-animation btn-classic-frame cursor-pointer"}`}>
                                        <div className={`flex flex-col justify-start px-6 py-4 ${variant.text_quantity.includes("out of stock") || variant.state.includes("unavailable") || !role.includes("user") ? "cursor-not-allowed" : "cursor-pointer"}`}
                                             key={variant.variant_id}
                                             onClick={() => {
                                                 if (!(variant.text_quantity.includes('out of stock') || variant.state.includes('unavailable') || !role.includes("user"))) {
                                                     handleModalOpen(variant.variant_id)
                                                 }
                                             }}>
                                                <span className="pb-1">
                                                    <h3 className="sm:text-xl text-lg font-bold uppercase inline-block">
                                                        {variant.variant_name}
                                                    </h3>
                                                </span>
                                            <span className="pb-1">
                                                    <p className={`text-base ${variant.state.includes("unavailable without price") && "invisible"}`}>
                                                        <b className={`border-solid ${variant.discount_percent > 0 || variant.discount_money > 0 ? "line-through pr-1 text-light-second dark:text-dark-second" : variant.text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "text-error"}`}>
                                                            {variant.price}₽
                                                        </b>
                                                        {(variant.discount_percent > 0 || variant.discount_money > 0) && (
                                                            <b className={variant.text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "border-solid text-error"}>
                                                                {variant.final_price}₽
                                                            </b>
                                                        )}
                                                        {variant.discount_percent > 0 && (
                                                            <span className="ml-2 sm:text-sm text-xs text-gray-500">
                                                                Скидка {variant.discount_percent}%
                                                            </span>
                                                        )}
                                                        {variant.discount_money > 0 && (
                                                            <span className="ml-2 sm:text-sm text-xs text-gray-500">
                                                                Скидка: {variant.discount_money}₽
                                                            </span>
                                                        )}
                                                </p>
                                            </span>
                                            <div className="flex justify-between items-center space-x-3">
                                                <p className="sm:text-base text-sm">
                                                    {TranslateTextQuantity(variant.text_quantity)}
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
                <span className="sm:text-xl sm:text-lg flex items-center inline-flex"
                      key={serviceItem.serviceName.replaceAll(" ", "-")}>
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

export const AdminProductsCards = (props: { products: any[]}) => {
    const navigate = useNavigate()
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [products, setProducts] = useState(props.products);

    function handleDeleteClick(variantId1: string) {
        setIsSubmitting(true)

        AdminDeleteVariantQuery({
            navigate: navigate,
            variantId: variantId1
        }).then(() => {
            setProducts(products.filter(product => product.variant_id !== variantId1));
        })

        setIsSubmitting(false)
    }

    return (
        <div className="space-y-8 select-none">
            {products && products.map((value) => (
                <div className={`flex flex-col rounded-lg bg-white shadow-lg h-max bg-light-additional dark:bg-dark-additional hover:hover:-translate-y-1.5 system-animation btn-classic-frame`}
                     key={value.variant_id}>
                    <div className={`flex flex-col justify-start px-6 py-4`}
                         key={value.variant_id}
                         onMouseEnter={() => setHoveredCard(value.variant_id)}
                         onMouseLeave={() => setHoveredCard(null)}>
                        <div className="flex justify-between items-center">
                            <span className="pb-1 lg:space-x-5 sm:space-x-1 flex-grow inline-block">
                                <h3 className="sm:text-lg text-base font-bold uppercase inline-block">
                                    {value.product_name}
                                </h3>
                                <h3 className="sm:text-lg text-base font-bold uppercase inline-block text-light-second dark:text-dark-second">
                                    {value.type_name}
                                </h3>
                                <h3 className="sm:text-lg text-base font-bold uppercase inline-block text-light-second dark:text-dark-second">
                                    {value.subtype_name}
                                </h3>
                            </span>
                            <span>
                                <button key={value.variant_id}
                                        className={`btn-classic block lg:inline-block lg:mt-0 ml-4 ${hoveredCard === value.variant_id ? 'visible' : 'invisible'}` }
                                        onClick={() => {}}>
                                    Пополнить
                                </button>
                                <Link key={value.variant_id}
                                      className={`btn-classic block lg:inline-block lg:mt-0 ml-4 ${hoveredCard === value.variant_id ? 'visible' : 'invisible'}` }
                                      to={"edit?variant_id="+value.variant_id}>
                                    Изменить
                                </Link>
                                <button key={value.variant_id}
                                        className={`btn-classic block lg:inline-block text-error lg:mt-0 ml-4 ${hoveredCard === value.variant_id ? 'visible' : 'invisible'}` }
                                        onClick={() => {
                                            handleDeleteClick(value.variant_id)
                                        }}
                                        disabled={isSubmitting}>
                                    Удалить
                                </button>
                            </span>
                        </div>
                        <span className="pb-1 space-x-3">
                            <h3 className="sm:text-2xl text-xl font-bold uppercase inline-block">
                                {value.variant_name}
                            </h3>
                        </span>
                        <span className="pb-1">
                            <p className={`text-base`}>
                                <b className={`border-solid ${value.discount_percent > 0 || value.discount_money > 0 ? "line-through pr-1 text-light-second dark:text-dark-second" : value.text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "text-error"}`}>
                                    {value.price}₽
                                </b>
                                {(value.discount_percent > 0 || value.discount_money > 0) && (
                                    <b className={value.text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "border-solid text-error"}>
                                        {value.final_price}₽
                                    </b>
                                )}
                                {value.discount_percent > 0 && (
                                    <span className="ml-2 sm:text-sm text-xs text-gray-500">
                                        Скидка {value.discount_percent}%
                                    </span>
                                )}
                                {value.discount_money > 0 && (
                                    <span className="ml-2 sm:text-sm text-xs text-gray-500">
                                        Скидка: {value.discount_money}₽
                                    </span>
                                )}
                            </p>
                        </span>
                        <div className="flex justify-between items-center space-x-3">
                            <div className="flex items-center space-x-3">
                                <p>
                                    {value.state_name.toUpperCase()}
                                </p>
                                <p className="sm:text-base text-sm">
                                    {TranslateTextQuantity(value.text_quantity)}
                                </p>
                                {value.quantity_current != "0" &&
                                    <p className="sm:text-base text-sm">
                                        в наличии {value.quantity_current} шт.
                                    </p>
                                }
                            </div>
                            <div className="flex items-center justify-end space-x-3">
                                <span>
                                    {value.item_name.toUpperCase()}
                                </span>
                                <span className="sm:text-xl sm:text-lg flex items-center inline-flex space-x-2"
                                      key={value.service_name.replaceAll(" ", "-")}>
                                    <span className="pl-1">{value.service_name.toUpperCase()}</span>
                                    {!value.service_name.toLowerCase().includes("universal") && (
                                        <SVGIcon
                                            url={value.service_svg_url}
                                            alt={value.service_name}
                                            className="sm:w-6 w-5 sm:h-6 h-5"
                                        />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}


