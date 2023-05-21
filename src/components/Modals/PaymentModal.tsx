import React, {useState} from "react"
import Modal from "./Modal"
import {RowBlock} from "../Blocks/PageBlocks"
import FreekassaImage from "../../data/images/freekassa.png"
import QiwiImage from "../../data/images/qiwi.jpg"
import {UserGetPaymentQuery} from "../../queries/user"
import {useNavigate} from "react-router-dom"

interface ModalPaymentProps {
    onShow: boolean
    setShow: (value: boolean) => void
    canLeave: boolean
    variantId: string
}

export const PaymentModal = ({ onShow, setShow, canLeave, variantId }: ModalPaymentProps) => {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handlePaymentClick() {
        setIsSubmitting(true)
        UserGetPaymentQuery({
            navigate: navigate,
            variant_id: variantId
        })
        setIsSubmitting(false)
    }

    return (
        <Modal onShow={onShow} setShow={setShow} canLeave={canLeave} title="Выбор способа оплаты">
            <RowBlock>
                <button className="cursor-pointer w-full flex flex-col md:flex-row items-center justify-center p-4 border-solid border-2 border-light-second dark:border-dark-second bg-light-additional dark:bg-dark-additional system-animation rounded-lg"
                        onClick={handlePaymentClick}
                        disabled={isSubmitting}>
                    <img className="w-auto h-auto max-w-full sm:max-w-1/3 max-h-32 sm:max-h-40 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                         src={FreekassaImage}
                         alt="free-kassa" />
                    <h1 className="text-3xl font-bold uppercase sm:text-left">freekassa</h1>
                </button>
            </RowBlock>

            <RowBlock>
                <div className="cursor-pointer flex flex-col md:flex-row items-center justify-center p-4 border-solid border-2 border-light-second dark:border-dark-second bg-light-additional dark:bg-dark-additional system-animation rounded-lg">
                    <img className="w-auto h-auto max-w-full sm:max-w-1/3 max-h-32 sm:max-h-40 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                         src={QiwiImage}
                         alt="qiwi" />
                    <h1 className="text-3xl font-bold uppercase sm:text-left">qiwi</h1>
                </div>
            </RowBlock>

        </Modal>
    )
}

