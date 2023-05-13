import React from "react"
import {NavigateFunction} from "react-router-dom"
import UseHttpErrorsHandler from "../utils/httpResponds"
import {AppUrl, UnknownError} from "../storage/defs"
import {toast} from "react-hot-toast";
import {RedirectTo} from "../utils/redirect";

const adminProduct = AppUrl+"admin/product"
const adminService = AppUrl+"admin/service"
const adminType = AppUrl+"admin/type"
const adminSubtype = AppUrl+"admin/subtype"
const adminState = AppUrl+"admin/state"
const adminItem = AppUrl+"admin/item"
const adminVariants = AppUrl+"admin/variant"
const adminDelVariant = AppUrl+"admin/variant/del"
const adminEditVariant = AppUrl+"admin/variant"

interface AdminGetSubtypes {
    signal: AbortSignal
    navigate: NavigateFunction
    type_name: string
}

export const AdminGetSubtypesQuery = async ({signal, navigate, type_name}: AdminGetSubtypes) => {
    try {
        const response = await fetch(adminSubtype+"?type_name="+type_name, {
            method: 'GET',
            signal: signal,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        return await response.json()
    } catch {}
}

interface AdminCommon {
    signal: AbortSignal
    navigate: NavigateFunction
}

export const AdminGetServicesQuery = async ({signal, navigate}: AdminCommon) => {
    try {
        const response = await fetch(adminService, {
            method: 'GET',
            signal: signal,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        return await response.json()
    } catch {}
}

export const AdminGetProductsQuery = async ({signal, navigate}: AdminCommon) => {
    try {
        const response = await fetch(adminProduct, {
            method: 'GET',
            signal: signal,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        return await response.json()
    } catch {}
}

export const AdminGetTypesQuery = async ({signal, navigate}: AdminCommon) => {
    try {
        const response = await fetch(adminType, {
            method: 'GET',
            signal: signal,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        return await response.json()
    } catch {}
}

export const AdminGetStatesQuery = async ({signal, navigate}: AdminCommon) => {
    try {
        const response = await fetch(adminState, {
            method: 'GET',
            signal: signal,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        return await response.json()
    } catch {}
}

export const AdminGetItemsQuery = async ({signal, navigate}: AdminCommon) => {
    try {
        const response = await fetch(adminItem, {
            method: 'GET',
            signal: signal,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        return await response.json()
    } catch {}
}

interface AuthSignupWithToken {
    signal: AbortSignal
    navigate: NavigateFunction
}

export const AdminVariantsQuery = async ({signal, navigate}: AuthSignupWithToken) => {
    try {
        const response = await fetch(adminVariants, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
            signal: signal,
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        return await response.json()
    } catch {}
}

interface AdminNewVariant {
    navigate: NavigateFunction
    subtype: string
    product: string
    name: string
    service: string
    state: string
    item: string
    mask: string
    price: string
    discountMoney: string
    discountPercent: string
}

export const AdminNewVariantQuery = async ({navigate, subtype, product, name, service, state, mask, discountMoney, discountPercent, price, item}: AdminNewVariant) => {
    const requestBody = {
        product_name: product,
        variant_name: name,
        service_name: service,
        state_name: state,
        subtype_name: subtype,
        item_name: item,
        mask: mask,
        price: price,
        discount_money: discountMoney,
        discount_percent: discountPercent,
    }
    try {
        const response = await fetch(adminVariants, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
            body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        toast.success("Успешное добавление")
        RedirectTo('/admin/products', navigate, 100)
    } catch (error) {
        toast.error(UnknownError)
        console.error("Error fetching data: ", error)
    }
}

interface AdminDeleteVariant {
    navigate: NavigateFunction
    variantId: string
}

export const AdminDeleteVariantQuery = async ({ navigate, variantId}: AdminDeleteVariant) => {
    try {
        const response = await fetch(adminDelVariant+"?variant_id="+variantId, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
        })

        if (!response.ok) {
            const data = await response.json()
            switch (true) {
                case data.description.toLowerCase().includes("using".toLowerCase()):
                    toast.error("Вариант используется в заказах")
                    return
            }
            await UseHttpErrorsHandler(response, navigate)
        }

        toast.success("Успешное удаление")
    } catch {}
}

interface AdminVariant {
    navigate: NavigateFunction
    signal: AbortSignal
    variantId: string
}

export const AdminVariantQuery = async ({ navigate, signal, variantId}: AdminVariant) => {
    try {
        console.log(variantId)
        console.log("dd "+adminEditVariant+"?variant_id="+variantId)
        const response = await fetch(adminEditVariant+"?variant_id="+variantId, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
            signal: signal
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
        }

        console.log(await response.json())
        return await response.json()
    } catch {}
}