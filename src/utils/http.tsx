import {toast} from "react-hot-toast";

export default async function UseHttpErrorsHandler(response: Response): Promise<null> {
    switch (response.status) {
        case 503:
            toast.error("Сервис недоступен");
            break;
        case 429:
            toast.error("Слишком много действий");
            break;
        case 500:
            toast.error("Ошибка на стороне сервера");
            break;
        case 504:
            toast.error("Сервер долго не отвечал");
            break;
        default:
            let responseData;
            try {
                responseData = await response.json();
            } catch (error) {
                console.error("Error read json: ", error);
            }

            toast.error("Ошибка. Попробуйте повторить действие");
            console.error(`Unknown error: ${response.status} (${response.statusText}) - ${JSON.stringify(responseData)}`);
    }
    return null;
}