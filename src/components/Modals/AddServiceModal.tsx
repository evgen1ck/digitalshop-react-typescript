import React, {ChangeEvent, useRef, useState} from "react"
import Modal from "./Modal"
import {RowBlock} from "../Blocks/PageBlocks"
import {useNavigate} from "react-router-dom"
import {ApiAdminServiceUrl, postAxioser, postAxioserWithFormData} from "../../lib/queries";
import {toast} from "react-hot-toast";
import axios from "axios";
import InputWithValidation, {TEXT} from "../Inputs/InputWithValidation";
import {isMinMaxLen, isNotBlank, isNotContainsConsecutiveSpaces} from "../../lib/validators";
import httpErrorsHandler from "../../lib/responds";

interface AddModalProps {
    onShow: boolean
    setShow: (value: boolean) => void
    canLeave: boolean
}

export const AddServiceModal = ({ onShow, setShow, canLeave }: AddModalProps) => {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const [file, setFile] = useState<File | null>(null)

    async function handleAddClick() {
        setError("")
        inputRef.current?.focus()

        if (value == "") {
            setIsSubmitting(false)
            return
        }

        if (file == null) {
            toast.error("Нет .SVG файла")
            setIsSubmitting(false)
            return
        }

        setIsSubmitting(true)
        let body = { service_name: value }
        postAxioserWithFormData(ApiAdminServiceUrl, body, file).then(() => {
            toast.success("Добавление прошло успешно");
            setValue("")
            setFile(null)
            setShow(false)
        }).catch((error) => {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status == 409)
                        toast.error("Невозможно добавить, такой сервис уже есть");
                    else
                        httpErrorsHandler(error.response, navigate)
                } else {
                    console.log('Error', error.message);
                }
            }
        }).finally(() => setIsSubmitting(false));
    }

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files?.[0];
        if (newFile) {
            const sizeInMB = newFile.size / (1024*1024);
            if (sizeInMB > 5) {
                toast.error(`Файл слишком большой! Максимальный размер файла: 5 MB`);
                return;
            } else if (sizeInMB < 0.001) {
                toast.error(`Файл слишком маленький! Минимальный размер файла: 0.2 MB`);
                return;
            } else if (!newFile.name.endsWith('.svg')) {
                toast.error(`Файл должен быть в формате .svg`);
                return;
            } else {
                setFile(newFile);
            }
        }
    }

    return (
        <Modal onShow={onShow} setShow={setShow} canLeave={canLeave} title={"Добавление сервиса"}>
            <RowBlock>
                <label className="flex items-center p-3 border btn-classic-frame select-none space-x-2 cursor-pointer mx-3"
                       htmlFor={"field-svg"}>
                    <input id={"field-svg"}
                           type="file" accept="image/svg+xml"
                           onChange={handleImageUpload}
                           disabled={isSubmitting}
                           className="w-4 h-4 checkbox-classic" />
                    <label htmlFor={"field-svg"}
                           className="w-full text-base uppercase cursor-pointer">
                        {file ? "Изменить .SVG файл" : "Добавить .SVG файл"}
                    </label>
                </label>
            </RowBlock>

            <RowBlock>
                <div className="inline-flex w-full">
                    <InputWithValidation
                        nameField={"Название сервиса"}
                        placeholder={"STEAM"}
                        id={"field-name"}
                        type={TEXT}
                        hasWarnLabel={true}
                        spellCheck={false}
                        requiredValidators={[isNotBlank, isMinMaxLen(4, 64), isNotContainsConsecutiveSpaces]}
                        setValue={setValue}
                        value={value}
                        setError={setError}
                        error={error}
                        inputRef={inputRef}
                        requiredField={true}
                        insertSpace={true} />
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full">
                    <button className="btn-classic-frame select-none px-6 py-2.5 sm:text-xl text-lg uppercase"
                            type="submit"
                            onClick={handleAddClick}
                            disabled={isSubmitting || error != ""}>
                        Добавить
                    </button>
                </div>
            </RowBlock>
        </Modal>
    )
}

