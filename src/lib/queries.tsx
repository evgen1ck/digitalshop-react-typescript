import axios, { AxiosResponse } from "axios"

//export const ApiUrl = "https://api.digitalshop.evgenick.com/api/v1/"
export const ApiUrl = "http://localhost:9990/api/v1/"

export const ApiAuthSignupUrl = ApiUrl + "auth/signup"
export const ApiAuthSignupWithTokenUrl = ApiUrl + "auth/signup-with-token"
export const ApiAuthLoginUrl = ApiUrl + "auth/login"
export const ApiAuthAloginUrl = ApiUrl + "auth/alogin"

export const ApiUserPaymentUrl = ApiUrl + "user/payment"
export const ApiUserOrderUrl = ApiUrl + "user/order"
export const ApiUserLogoutUrl = ApiUrl + "user/logout"

export const ApiAdminProductUrl = ApiUrl + "admin/product"
export const ApiAdminServiceUrl = ApiUrl + "admin/service"
export const ApiAdminStateUrl = ApiUrl + "admin/state"
export const ApiAdminItemUrl = ApiUrl + "admin/item"
export const ApiAdminTypeUrl = ApiUrl + "admin/type"
export const ApiAdminSubtypeUrl = ApiUrl + "admin/subtype"
export const ApiAdminVariantUrl = ApiUrl + "admin/variant"
export const AdminVariantUploadUrl = ApiUrl + "admin/variant/upload"

export const ApiProductUrl = ApiUrl + "product"
export const ApiProductMainpageUrl = ApiUrl + "product/mainpage"

export const getAxioser = async (url: string) => {
    const headers: { [key: string]: string } = { Authorization: `Bearer ${localStorage.getItem("token")}` }

    return await axios.get(url, { headers })
        .then(checkOnBadHttpCode)
        .then((res) => res.data)
}

export const postAxioser = (url: string, body = {}) => {
    const headers: { [key: string]: string } = { Authorization: `Bearer ${localStorage.getItem("token")}` }

    if (Object.keys(body).length !== 0)
        headers["Content-Type"] = "application/json"

    return axios.post(url, body, { headers })
        .then(checkOnBadHttpCode)
        .then((res) => res.data)
}

export const patchAxioser = (url: string, body = {}) => {
    const headers: { [key: string]: string } = { Authorization: `Bearer ${localStorage.getItem("token")}` }

    if (Object.keys(body).length !== 0)
        headers["Content-Type"] = "application/json"

    return axios.patch(url, body, { headers })
        .then(checkOnBadHttpCode)
        .then((res) => res.data)
}

export const putAxioser = (url: string, body = {}) => {
    const headers: { [key: string]: string } = { Authorization: `Bearer ${localStorage.getItem("token")}` }

    if (Object.keys(body).length !== 0)
        headers["Content-Type"] = "application/json"

    return axios.put(url, body, { headers })
        .then(checkOnBadHttpCode)
        .then((res) => res.data)
}

export const deleteAxioser = async (url: string) => {
    const headers: { [key: string]: string } = { Authorization: `Bearer ${localStorage.getItem("token")}` }

    return await axios.delete(url, { headers })
        .then(checkOnBadHttpCode)
        .then((res) => res.data)
}


const checkOnBadHttpCode = (response: AxiosResponse) => {
    if (response.status < 200 || response.status >= 300) {
        console.log(response.status.toString() + ": " + response.statusText)
        throw Error(response.statusText)
    }
    return response
}