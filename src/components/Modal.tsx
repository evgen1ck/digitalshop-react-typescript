import React, {ReactNode} from "react";

interface ModalProps {
    onShow: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, onShow } : ModalProps) => {
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Escape") {
            onClose();
            console.log("dddd")
        }
    }

    return (
        <>
            {onShow && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" onKeyDown={handleKeyDown}>

                    <div className="fixed inset-0 bg-light-additional opacity-30" onClick={onClose}></div>

                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-dark-main outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">{title}</h3>
                            </div>
                            <div className="relative p-6 flex-auto">{children}</div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    tabIndex={-1}
                                    onClick={onClose}>Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;



