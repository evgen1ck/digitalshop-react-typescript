import React from "react"
import {NavigateFunction} from "react-router-dom"
import {toast} from "react-hot-toast"
import {HistoryNavigation, RedirectTo} from "../lib/redirect"
import {ApiUrl} from "../lib/queries"

const adminProduct = ApiUrl+"admin/product"
const adminService = ApiUrl+"admin/service"
const adminType = ApiUrl+"admin/type"
const adminSubtype = ApiUrl+"admin/subtype"
const adminState = ApiUrl+"admin/state"
const adminItem = ApiUrl+"admin/item"
const adminVariants = ApiUrl+"admin/variant"

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
            //await UseHttpErrorsHandler(response, navigate)
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
            //await UseHttpErrorsHandler(response, navigate)
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
            //await UseHttpErrorsHandler(response, navigate)
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
            //await UseHttpErrorsHandler(response, navigate)
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
            //await UseHttpErrorsHandler(response, navigate)
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
            //await UseHttpErrorsHandler(response, navigate)
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
            //await UseHttpErrorsHandler(response, navigate)
            return
        }

        toast.success("Успешное добавление")
        HistoryNavigation(navigate, "/admin/products", window.history.length)
    } catch (error) {
        console.error("Error fetching data: ", error)
    }
}
