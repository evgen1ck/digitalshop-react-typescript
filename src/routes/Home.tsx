import {Link, useNavigate} from "react-router-dom";
import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {ProductsQuery} from "../queries/products";
import {RowBlock, RowBlockUpper} from "../components/PageBlocks";
import steamIcon from '../steam-icon.svg';
import {hasPointerEvents} from "@testing-library/user-event/dist/utils";
import InputWithValidation, {TEXT} from "../components/InputWithValidation";
import {isContainsSpace, isMinMaxLen, isNickname, isNotBlank} from "../utils/dataValidators";
import SVGIcon from "../utils/svgIconColor";

interface Variant {
    variant_name: string;
    variant_id: string;
    service: string;
    service_svg_url: string;
    state: string;
    item: string;
    mask: string;
    text_quantity: string;
    price: number;
    discount_money: number;
    discount_percent: number;
    final_price: number;
}

interface Subtype {
    subtype_name: string;
    type: string;
    variants: Variant[];
}

interface Product {
    product_name: string;
    product_id: string;
    product_image_url: string;
    description: string;
    subtypes: Subtype[];
}

interface UniqueService {
    serviceName: string;
    svgUrl: string;
}

interface YourComponentProps {
    product: Product;
}

export default function Games() {
    const navigate = useNavigate()
    const [data, setData] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(true);

    const [searchValue, setSearchValue] = useState("");
    const [searchError, setSearchError] = useState("");
    const inputSearchRef = useRef<HTMLInputElement>(null);
    const handleSearchChange = (value: string, error: string) => {
        setSearchValue(value);
        setSearchError(error);
    };

    const handleEnterPress = (event: any) => {
        if (event.key === 'Enter') {
            console.log('Enter pressed');
        }
    };

    useEffect(() => {
        const abortController = new AbortController;

        ProductsQuery({
            signal: abortController.signal,
            navigate: navigate
        }).then(data => {
            const products: Product[] = data;
            setData(products)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })

        return () => {
            abortController.abort();
        }
    }, [])

    if (loading) {
        return (
            <div className="justify-between select-none">
                <div className="text-center">
                    <h3 className="text-3xl font-bold mb-12">
                        Ожидаем ответ от сервера...
                    </h3>
                </div>
            </div>
        )
    }

    return (
        <>
            <RowBlock>
                <div className="text-center w-full">
                    <h3 className="text-3xl font-bold mb-6 uppercase select-none">Поиск по товарам</h3>
                </div>
            </RowBlock>
            <RowBlockUpper addToClassName="w-3/5 pb-10 flex items-center justify-center">
                <InputWithValidation
                    nameField={""}
                    placeholder={"Поиск по товарам, например, GTA 5"}
                    id={"field-search"}
                    type={TEXT}
                    hasWarnLabel={true}
                    spellCheck={false}
                    requiredValidators={[isNotBlank, isMinMaxLen(5, 32)]}
                    value={searchValue}
                    error={searchError}
                    onChange={handleSearchChange}
                    inputRef={inputSearchRef}
                    insertSpace={true}
                    onKeyPress={handleEnterPress} />
                <button className="btn-classic-frame select-none px-6 py-2.5 mb-4 text-xl uppercase " type="submit">
                    Искать
                </button>
            </RowBlockUpper>

            <RowBlock>
                <div className="space-y-8 select-none">
                    {data && data.map((product) => (
                        <div className="px-6 py-4 bg-light-additional2 dark:bg-dark-additional2 rounded-lg border-solid border-2 border-light-second dark:border-dark-second"
                             key={product.product_id}>
                            <div className="flex justify-center bg-light-additional dark:bg-dark-additional hover:hover:-translate-1.5 system-animation rounded-lg">
                                <div className="flex flex-col rounded-lg bg-white shadow-lg md:flex-row h-max border-solid border-2 border-light-second dark:border-dark-second">
                                    <img
                                        className="w-full max-w-full h-auto rounded-l-lg object-cover md:h-auto md:w-2/5"
                                        src={product.product_image_url}
                                        alt={product.product_name}
                                    />
                                    <div className="flex flex-col justify-start px-6 py-4">
                                        <h1 className="mb-2 text-3xl font-bold uppercase">
                                            {product.product_name}
                                        </h1>
                                        <p className="mb-4 text-base text-justify leading-tight xl:line-clamp-6  lg:line-clamp-6 md:line-clamp-5 sm:line-clamp-4 max-sm:line-clamp-3">
                                            {product.description}
                                        </p>
                                        <p className="mb-4 text-base text-justify leading-tight xl:line-clamp-6  lg:line-clamp-6 md:line-clamp-5 sm:line-clamp-4 max-sm:line-clamp-3">
                                            <YourComponent product={product} />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {product.subtypes.map((subtype) => (
                                <div>
                                    <div className="flex flex-wrap space-x-4 pt-6 pb-3 items-center">
                                        <h2 className="mb-2 text-2xl font-bold">
                                            {getModifiedType(subtype.type)}
                                        </h2>
                                        <h2 className="mb-1 text-xl font-bold">
                                            {getModifiedSubtype(subtype.subtype_name)}
                                        </h2>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {subtype.variants.map((variant) => (
                                            <div className={`flex flex-col rounded-lg bg-white shadow-lg md:flex-row h-max bg-light-additional dark:bg-dark-additional ${variant.text_quantity.includes("out of stock") || variant.state.includes("unavailable") ? "cursor-not-allowed" : "hover:hover:-translate-y-1.5 system-animation btn-classic-frame cursor-pointer"}`}>
                                                <Link className={`flex flex-col justify-start px-6 py-4 ${variant.text_quantity.includes("out of stock") || variant.state.includes("unavailable") ? "cursor-not-allowed" : "cursor-pointer"}`}
                                                      to=""
                                                      key={variant.variant_id}
                                                >
                                                <span className="pb-1">
                                                    <h3 className="text-xl font-bold uppercase inline-block">
                                                        {variant.variant_name}
                                                    </h3>
                                                </span>
                                                    <span className="pb-1">
                                                     <p className="text-base">
                                                         <b className={`border-solid ${variant.discount_percent > 0 || variant.discount_money > 0 ? "line-through pr-1 text-light-second dark:text-dark-second" : variant.text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "text-error"}`}>
                                                            {!variant.state.includes("unavailable without price") && variant.price}₽
                                                        </b>
                                                         {(variant.discount_percent > 0 || variant.discount_money > 0) && (
                                                             <b className={`text-error border-solid ${variant.text_quantity.includes("out of stock") ? "text-light-second dark:text-dark-second" : "text-error"}`}>
                                                                 {!variant.state.includes("unavailable without price") && variant.final_price}₽
                                                             </b>
                                                         )}
                                                         {variant.discount_percent > 0 && (
                                                             <span className="ml-2 text-sm text-gray-500">
                                                                 {`Скидка: ${variant.discount_percent}%`}
                                                             </span>
                                                         )}
                                                         {variant.discount_money > 0 && (
                                                             <span className="ml-2 text-sm text-gray-500">
                                                                 {`Скидка: ${variant.discount_money}₽`}
                                                             </span>
                                                         )}
                                                    </p>
                                                </span>
                                                    <div className="flex justify-between items-center space-x-3">
                                                        <p className="text-base">
                                                            {getModifiedTextQuantity(variant.text_quantity)}
                                                        </p>
                                                        <div className="flex items-center">
                                                            <p className="text-base">
                                                                {variant.service.toUpperCase()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </RowBlock>
        </>
    )
}


const YourComponent: React.FC<YourComponentProps> = ({ product }) => {
    const uniqueServices: UniqueService[] = product.subtypes
        .flatMap((subtype) => subtype.variants)
        .reduce((accumulator: UniqueService[], variant: Variant) => {
            const serviceName = variant.service.toUpperCase();
            if (!accumulator.some((item) => item.serviceName === serviceName)) {
                accumulator.push({ serviceName, svgUrl: variant.service_svg_url });
            }
            return accumulator;
        }, []);

    return (
        <>
            {uniqueServices.map((serviceItem, index, array) => (
                <span className="text-xl flex items-center inline-flex">
                    <SVGIcon
                        url={serviceItem.svgUrl}
                        alt={serviceItem.serviceName}
                        className="w-6 h-6 fill-blue-500"
                        fillColor={localStorage.getItem('color-theme') === 'dark' ? 'white' : 'black'} />
                    <span className="pl-1 pr-4">{serviceItem.serviceName}</span>
                </span>
            ))}
        </>
    );

};


function getModifiedTextQuantity(s: string) {
    switch (s) {
        case "out of stock":
            return "распродано";
        case "last in stock":
            return "последний";
        case "limited stock":
            return "последние";
        case "adequate stock":
            return "достаточно";
        case "large stock":
            return "много";
        default:
            return s;
    }
}


function getModifiedSubtype(s: string) {
    switch (s) {
        case "console games":
            return "Консольные игры";
        case "computer games":
            return "Декстопные игры";
        default:
            return s;
    }
}

function getModifiedType(s: string) {
    switch (s) {
        case "replenishment of in-game currency":
            return "Пополнение внутриигрового счета";
        case "games":
            return "Игры";
        default:
            return s;
    }
}