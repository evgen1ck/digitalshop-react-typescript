import React from "react"
import {NavigateFunction} from "react-router-dom"
import UseHttpErrorsHandler from "../utils/httpResponds"
import {AppUrl} from "../storage/defs"

const adminProductsServices = AppUrl+"admin/products/services"

interface AdminProductsServicesGet {
    signal: AbortSignal
    navigate: NavigateFunction
}

export const AdminProductsServicesGetQuery = async ({signal, navigate}: AdminProductsServicesGet) => {
    const abortController = new AbortController()
    signal = abortController.signal

    try {
        const response = await fetch(adminProductsServices, {
            method: 'GET',
            signal: signal
        })

        if (!response.ok) {
            await UseHttpErrorsHandler(response, navigate)
            return
        }

        return await response.json()
    } finally {
        abortController.abort()
    }
}