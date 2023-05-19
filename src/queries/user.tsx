import React from 'react'
import {NavigateFunction} from "react-router-dom";
import UseHttpErrorsHandler from "../lib/responds";

const AppUrl = 'http://localhost:9990/api/v1/'
const userGetPayment = AppUrl+"user/payment"

interface UserGetPayment {
    navigate: NavigateFunction
    variant_id: string
}

export const UserGetPaymentQuery = async ({ navigate, variant_id}: UserGetPayment) => {
    const requestBody = {
        variant_id: variant_id,
    }
    try {
        const response = await fetch(userGetPayment, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') || ''
            },
            body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
            //await UseHttpErrorsHandler(response, navigate)
            return
        }

        let data = await response.json()
        console.log(window.location.href = data.payment_url)
        data && (window.location.href = data.payment_url)
    } catch {}
}
