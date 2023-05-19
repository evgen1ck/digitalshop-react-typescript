import {toast} from "react-hot-toast"
import {RedirectTo} from "./redirect"
import {NavigateFunction} from "react-router-dom"
import {AxiosResponse} from "axios";

export default async function httpErrorsHandler(response: AxiosResponse<any>, navigate: NavigateFunction): Promise<null> {
    switch (response.status) {
        case 503:
            toast.error("Сервис недоступен")
            break
        case 429:
            toast.error("Слишком много действий")
            break
        case 500:
            toast.error("Серверная ошибка. Попробуйте ещё раз")
            break
        case 504:
            toast.error("Сервер долго не отвечал")
            break
        case 422:
            toast.error("Введите корректные данные для поля "+ response.data.description && response.data.description.toLowerCase())
            break
        case 409:
            break
        case 403:
            switch (true) {
                case response.data.description.toLowerCase().includes("Token expired".toLowerCase()):
                    toast.error("Время сессии подошло к концу")
                    RedirectTo('/login', navigate, 1000)
                    break
                case response.data.description.toLowerCase().includes("token in stop-list".toLowerCase()):
                    toast.error("Сессия уже недействительна")
                    RedirectTo('/login', navigate, 1000)
                    break
                case response.data.description.toLowerCase().includes("account has been deleted".toLowerCase()):
                    toast.error("Аккаунт был удалён")
                    RedirectTo('/login', navigate, 1000)
                    break
                case response.data.description.toLowerCase().includes("account has been blocked".toLowerCase()):
                    toast.error("Аккаунт был заблокирован")
                    RedirectTo('/login', navigate, 1000)
                    break
                case response.data.description.toLowerCase().includes("this account has a different role".toLowerCase()):
                    toast.error("Аккаунт имеет другие права")
                    break
            }
            break
        default:
            toast.error('Неизвестная ошибка')
            console.log(`Unknown error: ${response.status} (${response.statusText}): ${response.data.description && response.data.description} - ${JSON.stringify(response.data)}`)
    }
    return null
}