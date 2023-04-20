import {toast} from "react-hot-toast";
import {RedirectTo} from "./redirect";
import {UnknownError} from "../storage/defs";
import {NavigateFunction} from "react-router-dom";

export default async function UseHttpErrorsHandler(response: Response, navigate: NavigateFunction): Promise<null> {
    switch (response.status) {
        case 503:
            toast.error("Сервис недоступен");
            break;
        case 429:
            toast.error("Слишком много действий");
            break;
        case 500:
            toast.error("Серверная ошибка. Попробуйте ещё раз");
            break;
        case 504:
            toast.error("Сервер долго не отвечал");
            break;
        case 409:
            break;
        case 403:
            let data;
            try {
                data = await response.json()
            } catch (error) {
                console.error("Error read json: ", error)
            }
            switch (true) {
                case data.description.toLowerCase().includes("Token expired".toLowerCase()):
                    toast.error("Время сессии подошло к концу");
                    RedirectTo('/login', navigate, 2000);
                    break;
                case data.description.toLowerCase().includes("token in stop-list".toLowerCase()):
                    toast.error("Сессия уже недействительна");
                    RedirectTo('/login', navigate, 2000);
                    break;
                case data.description.toLowerCase().includes("account has been deleted".toLowerCase()):
                    toast.error("Аккаунт был удалён");
                    RedirectTo('/login', navigate, 2000);
                    break;
                case data.description.toLowerCase().includes("account has been blocked".toLowerCase()):
                    toast.error("Аккаунт был заблокирован");
                    RedirectTo('/login', navigate, 2000);
                    break;
            }
            break;
        default:
            let responseData;
            try {
                responseData = await response.json()
            } catch (error) {
                console.error("Error read json: ", error)
            }

            toast.error(UnknownError)
            console.error(`Unknown error: ${response.status} (${response.statusText}) - ${JSON.stringify(responseData)}`)
    }
    return null;
}