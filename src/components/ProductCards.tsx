import React, {useState} from "react"
import SVGIcon from "../utils/svgIconColor"
import ModalPayment from "../modals/ModalPayment";

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
    let variantId = ""

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = (id: string) => {
        setIsModalOpen(true);
        variantId = id;
    };

    return (
        <div className="space-y-8 select-none">
            <ModalPayment onShow={isModalOpen} setShow={setIsModalOpen} canLeave={true} variantId={variantId} />
            {products && products.map((product) => (
                <div className="px-6 py-4 bg-light-additional2 dark:bg-dark-additional2 rounded-lg border-solid border-2 border-light-second dark:border-dark-second"
                     key={product.product_id}>
                    <div className="flex justify-center bg-light-additional dark:bg-dark-additional hover:hover:-translate-1.5 system-animation rounded-lg">
                        <div className="flex flex-col rounded-lg bg-white shadow-lg md:flex-row h-max border-solid border-2 border-light-second dark:border-dark-second">
                            <img className="w-full max-w-full h-auto rounded-l-lg object-cover md:h-auto md:w-2/5"
                                 src={product.product_image_url}
                                 alt={product.product_name} />
                            <div className="flex flex-col justify-start px-6 py-4">
                                <h1 className="mb-2 text-3xl font-bold uppercase">
                                    {product.product_name}
                                </h1>
                                <p className="mb-4 text-base text-justify leading-tight xl:line-clamp-6 lg:line-clamp-6 md:line-clamp-5 sm:line-clamp-4 max-sm:line-clamp-3">
                                    {product.description}
                                </p>
                                <p className="mb-4 text-base text-justify leading-tight xl:line-clamp-6 lg:line-clamp-6 md:line-clamp-5 sm:line-clamp-4 max-sm:line-clamp-3">
                                    <ProductSvgIcons product={product} />
                                </p>
                            </div>
                        </div>
                    </div>

                    {product.subtypes.map((subtype) => (
                        <div key={subtype.subtype_name.replaceAll(" ", "-")}>
                            <div className="flex flex-wrap space-x-4 pt-6 pb-3 items-center">
                                <h2 className="mb-2 text-2xl font-bold">
                                    {GetModifiedType(subtype.type)}
                                </h2>
                                <h2 className="mb-1 text-xl font-bold">
                                    {GetModifiedSubtype(subtype.subtype_name)}
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {subtype.variants.map((variant) => (
                                    <div className={`flex flex-col rounded-lg bg-white shadow-lg md:flex-row h-max bg-light-additional dark:bg-dark-additional ${variant.text_quantity.includes("out of stock") || variant.state.includes("unavailable") ? "cursor-not-allowed" : "hover:hover:-translate-y-1.5 system-animation btn-classic-frame cursor-pointer"}`}>
                                        <div className={`flex flex-col justify-start px-6 py-4 ${variant.text_quantity.includes("out of stock") || variant.state.includes("unavailable") ? "cursor-not-allowed" : "cursor-pointer"}`}
                                             key={variant.variant_id}
                                             onClick={() => {
                                                 if (!(variant.text_quantity.includes('out of stock') || variant.state.includes('unavailable'))) {
                                                     handleModalOpen(variant.variant_id);
                                                 }
                                             }}>
                                                <span className="pb-1">
                                                    <h3 className="text-xl font-bold uppercase inline-block">
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
                                                            <span className="ml-2 text-sm text-gray-500">
                                                                Скидка {variant.discount_percent}%
                                                            </span>
                                                        )}
                                                        {variant.discount_money > 0 && (
                                                            <span className="ml-2 text-sm text-gray-500">
                                                                Скидка: {variant.discount_money}₽
                                                            </span>
                                                        )}
                                                </p>
                                            </span>
                                            <div className="flex justify-between items-center space-x-3">
                                                <p className="text-base">
                                                    {GetModifiedTextQuantity(variant.text_quantity)}
                                                </p>
                                                <div className="flex items-center">
                                                    <p className="text-base">
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
                <span className="text-xl flex items-center inline-flex"
                      key={serviceItem.serviceName.replaceAll(" ", "-")}>
                    {!serviceItem.serviceName.toLowerCase().includes("universal") && (
                        <SVGIcon
                            url={serviceItem.svgUrl}
                            alt={serviceItem.serviceName}
                            className="w-6 h-6"
                            fillColor={localStorage.getItem('color-theme') === 'dark' ? 'white' : 'black'} />
                    )}
                    <span className="pl-1 pr-4">{serviceItem.serviceName}</span>
                </span>
            ))}
        </>
    )
}

function GetModifiedTextQuantity(s: string) {
    switch (s.toLowerCase()) {
        case "out of stock":
            return "распродано" 
        case "last in stock":
            return "последний" 
        case "limited stock":
            return "последние" 
        case "adequate stock":
            return "достаточно" 
        case "large stock":
            return "много" 
        default:
            return s 
    }
}

function GetModifiedSubtype(s: string) {
    switch (s.toLowerCase()) {
        case "console version":
            return "Консольная версия"
        case "computer version":
            return "Декстопная версия"
        case "mobile version":
            return "Мобильная версия"
        default:
            return s 
    }
}

function GetModifiedType(s: string) {
    switch (s.toLowerCase()) {
        case "replenishment of in-game currency":
            return "Пополнение внутриигрового счета" 
        case "games":
            return "Игры"
        case "software":
            return "Программное обеспечение"
        case "e-tickets":
            return "Электронные билеты"
        case "virtual gifts":
            return "Виртуальные подарки"
        default:
            return s 
    }
}