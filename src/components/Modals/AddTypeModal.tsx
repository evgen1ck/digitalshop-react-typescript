import React, {useRef, useState} from "react"
import Modal from "./Modal"
import {RowBlock} from "../Blocks/PageBlocks"
import {useNavigate} from "react-router-dom"
import {ApiAdminTypeUrl, postAxioser} from "../../lib/queries";
import {toast} from "react-hot-toast";
import axios from "axios";
import InputWithValidation, {TEXT} from "../Inputs/InputWithValidation";
import {isMinMaxLen, isNotBlank, isNotContainsConsecutiveSpaces, isNotContainsSpace} from "../../lib/validators";
import httpErrorsHandler from "../../lib/responds";

interface AddModalProps {
    onShow: boolean
    setShow: (value: boolean) => void
    canLeave: boolean
}

export const AddTypeModal = ({ onShow, setShow, canLeave }: AddModalProps) => {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    async function handleAddClick() {
        setError("")
        inputRef.current?.focus()
        inputRef.current?.blur()

        if (value == "") {
            setIsSubmitting(false)
            return
        }

        setIsSubmitting(true)
        let body = { type_name: value }
        postAxioser(ApiAdminTypeUrl, body).then(() => {
            toast.success("Добавление прошло успешно");
            setValue("")
            setShow(false)
        }).catch((error) => {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status == 409)
                        toast.error("Невозможно добавить, такой тип уже есть");
                    else
                        httpErrorsHandler(error.response, navigate)
                } else {
                    console.log('Error', error.message);
                }
            }
        }).finally(() => setIsSubmitting(false));
    }

    return (
        <Modal onShow={onShow} setShow={setShow} canLeave={canLeave} title={"Добавление типа"}>
            <RowBlock>
                <div className="inline-flex w-full">
                    <InputWithValidation
                        nameField={"Название типа"}
                        placeholder={"GAMES"}
                        id={"field-name"}
                        type={TEXT}
                        hasWarnLabel={true}
                        spellCheck={false}
                        requiredValidators={[isNotBlank, isMinMaxLen(4, 512), isNotContainsConsecutiveSpaces]}
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

