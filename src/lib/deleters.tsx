import {deleteAxioser} from "./queries";
import {toast} from "react-hot-toast";
import axios from "axios";
import React from "react";

export async function handleDeleteClick(name: string, path: string): Promise<boolean> {
    try {
        await deleteAxioser(path + "?name=" + name);
        toast.success("Удаление прошло успешно");
        return true;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status == 409) {
                toast.error("Невозможно удалить, значение используется сейчас");
            }
            //else httpErrorsHandler(error.response, navigate)
        }
        return false;
    }
}
