import React, {ChangeEvent, useRef, useState} from "react"
import Modal from "./Modal"
import {RowBlock} from "../Blocks/PageBlocks"
import {useNavigate} from "react-router-dom"
import {ApiAdminProductUrl, ApiAdminServiceUrl, postAxioser, postAxioserWithFormData} from "../../lib/queries";
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

export const AddProductModal = ({ onShow, setShow, canLeave }: AddModalProps) => {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const [descriptionValue, setDescriptionValue] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const inputDescriptionRef = useRef<HTMLInputElement>(null)

    const [tagsValue, setTagsValue] = useState("")
    const [tagsError, setTagsError] = useState("")
    const inputTagsRef = useRef<HTMLInputElement>(null)

    const [file, setFile] = useState<File | null>(null)

    async function handleAddClick() {
        setError("")
        setDescriptionError("")
        setTagsError("")
        inputRef.current?.focus()
        inputRef.current?.blur()
        inputDescriptionRef.current?.focus()
        inputDescriptionRef.current?.blur()
        inputTagsRef.current?.focus()
        inputTagsRef.current?.blur()


        if (value == "" || descriptionValue == "" || tagsValue == "") {
            setIsSubmitting(false)
            return
        }

        if (file == null) {
            toast.error("Нет изображения")
            setIsSubmitting(false)
            return
        }

        setIsSubmitting(true)
        let body = { product_name: value, tags: tagsValue, description: descriptionValue }
        console.log(body)
        postAxioserWithFormData(ApiAdminProductUrl, body, file).then(() => {
            toast.success("Добавление прошло успешно");
            setValue("")
            setDescriptionValue("")
            setTagsValue("")
            setFile(null)
            setShow(false)
        }).catch((error) => {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status == 409)
                        toast.error("Невозможно добавить, такой продукт уже есть");
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
                toast.error(`Файл слишком маленький! Минимальный размер файла: 0.001 MB`);
                return;
            } else if (!newFile.name.endsWith('.png') && !newFile.name.endsWith('.jpg') && !newFile.name.endsWith('.jpeg')) {
                toast.error(`Файл должен быть в формате .png, .jpeg или .jpg`);
                return;
            } else {
                setFile(newFile);
            }
        }
    }

    return (
        <Modal onShow={onShow} setShow={setShow} canLeave={canLeave} title={"Добавление продукта"}>
            <RowBlock>
                <label className="flex items-center p-3 border btn-classic-frame select-none space-x-2 cursor-pointer mx-3"
                       htmlFor={"field-image"}>
                    <input id={"field-image"}
                           type="file" accept="image/jpeg,image/png"
                           onChange={handleImageUpload}
                           disabled={isSubmitting}
                           className="w-4 h-4 checkbox-classic" />
                    <label htmlFor={"field-image"}
                           className="w-full text-base uppercase cursor-pointer">
                        {file ? "Изменить изображение" : "Добавить изображение"}
                    </label>
                </label>
            </RowBlock>

            <RowBlock>
                <div className="inline-flex w-full">
                    <InputWithValidation
                        nameField={"Название продукта"}
                        placeholder={"GRAND THEFT AUTO 5"}
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
                <div className="inline-flex w-full">
                    <InputWithValidation
                        nameField={"Название тегов"}
                        placeholder={"GTA, GTA5, GTAO, GTAV, GTA V"}
                        id={"field-tags"}
                        type={TEXT}
                        hasWarnLabel={true}
                        spellCheck={false}
                        requiredValidators={[isNotBlank, isMinMaxLen(4, 64), isNotContainsConsecutiveSpaces]}
                        setValue={setTagsValue}
                        value={tagsValue}
                        setError={setTagsError}
                        error={tagsError}
                        inputRef={inputTagsRef}
                        requiredField={true}
                        insertSpace={true} />
                </div>
            </RowBlock>

            <RowBlock>
                <div className="inline-flex w-full">
                    <InputWithValidation
                        nameField={"Описание продукта"}
                        placeholder={"Лос-Сантос – город солнца, старлеток и вышедших..."}
                        id={"field-desc"}
                        type={TEXT}
                        hasWarnLabel={true}
                        spellCheck={false}
                        maxLength={1024}
                        requiredValidators={[isNotBlank, isMinMaxLen(4, 1024), isNotContainsConsecutiveSpaces]}
                        setValue={setDescriptionValue}
                        value={descriptionValue}
                        setError={setDescriptionError}
                        error={descriptionError}
                        inputRef={inputDescriptionRef}
                        requiredField={true}
                        insertSpace={true} />
                </div>
            </RowBlock>

            <RowBlock>
                <div className="text-center w-full">
                    <button className="btn-classic-frame select-none px-6 py-2.5 sm:text-xl text-lg uppercase"
                            type="submit"
                            onClick={handleAddClick}
                            disabled={isSubmitting || descriptionError != "" || error != "" || tagsError != ""}>
                        Добавить
                    </button>
                </div>
            </RowBlock>
        </Modal>
    )
}

