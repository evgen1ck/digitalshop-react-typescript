import React from 'react'
import Modals from './Modals'
import {RowBlock} from "../components/PageBlocks";

interface ModalPaymentProps {
    onShow: boolean
    setShow: (value: boolean) => void
    canLeave: boolean
    variantId: string
}

const ModalPayment = ({ onShow, setShow, canLeave }: ModalPaymentProps) => {
    return (
        <Modals onShow={onShow} setShow={setShow} canLeave={canLeave} title="Выбор способа оплаты">
            <RowBlock>
                <div className="cursor-pointer flex flex-col md:flex-row items-center justify-center p-4 border-solid border-2 border-light-second dark:border-dark-second bg-light-additional dark:bg-dark-additional system-animation rounded-lg">
                    <img className="w-auto h-auto max-w-full sm:max-w-1/3 max-h-32 sm:max-h-40 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                         src="https://play-lh.googleusercontent.com/GAQXLpg2671cnydohDn_mKbuq5KmjmkfiPPJTv20LnzVeamWRuuoyMiX23PA76IUsyA"
                         alt="free-kassa" />
                    <h1 className="text-3xl font-bold uppercase sm:text-left">freekassa</h1>
                </div>
            </RowBlock>

            <RowBlock>
                <div className="cursor-pointer flex flex-col md:flex-row items-center justify-center p-4 border-solid border-2 border-light-second dark:border-dark-second bg-light-additional dark:bg-dark-additional system-animation rounded-lg">
                    <img className="w-auto h-auto max-w-full sm:max-w-1/3 max-h-32 sm:max-h-40 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                         src="https://pbs.twimg.com/profile_images/1448385590832009219/CXD5Fegb_400x400.jpg"
                         alt="qiwi" />
                    <h1 className="text-3xl font-bold uppercase sm:text-left">qiwi</h1>
                </div>
            </RowBlock>

        </Modals>
    )
}

export default ModalPayment