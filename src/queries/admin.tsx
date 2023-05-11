import React from "react"
import {NavigateFunction} from "react-router-dom"
import UseHttpErrorsHandler from "../utils/httpResponds"
import {AppUrl} from "../storage/defs"

const adminProduct = AppUrl+"admin/product"
const adminService = AppUrl+"admin/service"
const adminType = AppUrl+"admin/type"
const adminSubtype = AppUrl+"admin/subtype"
const adminState = AppUrl+"admin/state"
const adminItem = AppUrl+"admin/item"

interface AdminGetSubtypes {
    signal: AbortSignal
    navigate: NavigateFunction
    type_name: string
}

export const AdminGetSubtypesQuery = async ({signal, navigate, type_name}: AdminGetSubtypes) => {
    try {
        const response = await fetch(adminSubtype+"?type_name="+type_name, {
            method: 'GET',
            signal: signal
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
            signal: signal
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
            signal: signal
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
            signal: signal
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
            signal: signal
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
            signal: signal
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        return await response.json()
    } catch {}
}