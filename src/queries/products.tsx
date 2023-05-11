import React from 'react'
import UseHttpErrorsHandler from "../utils/httpResponds"
import {NavigateFunction} from "react-router-dom"
import {AppUrl} from "../storage/defs"

const productsUrl = AppUrl+"product/mainpage"

interface AuthSignupWithToken {
    signal: AbortSignal
    navigate: NavigateFunction
}

export const ProductsQuery = async ({signal, navigate}: AuthSignupWithToken) => {
    try {
        const response = await fetch(productsUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
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