import React, {ReactNode, useCallback, useEffect, useRef} from "react"

interface ModalProps {
    onShow: boolean
    setShow: (value: boolean) => void
    onClick?: () => void
    children: ReactNode
    canLeave: boolean
    title: string
    showButton?: true
    buttonName?: string

}

const Modal: React.FC<ModalProps> = ({ setShow, children, onShow, canLeave, title, showButton, buttonName } : ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)

    // handle what happens on key press
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (canLeave && event.key === "Escape") setShow(false)
    }, [])

    useEffect(() => {
        if (onShow) {
            // attach the event listener if the modal is shown
            document.addEventListener("keydown", handleKeyPress)
            // remove the event listener
            return () => {
                document.removeEventListener("keydown", handleKeyPress)
            }
        }
    }, [handleKeyPress, onShow])

    useEffect(() => {
        if (onShow) {
            const handleClickOutside = (event: MouseEvent) => {
                if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                    setShow(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }
    }, [onShow, setShow])

    return (
        <>
            {onShow && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div ref={modalRef} className="relative w-auto my-6 mx-auto lg:w-1/3 rounded-lg border-solid border-2 border-light-second dark:border-dark-second">
                            <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-light-main">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold select-none">
                                        {title}
                                    </h3>
                                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShow(false)}>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    {children}
                                </div>
                                <div className={`flex px-6 pt-5 border-t border-solid border-slate-200 ${showButton ? "justify-between" : "justify-end"}`}>
                                    {showButton && (
                                        <div>
                                            <button className="btn-classic-frame select-none px-6 py-2.5 mb-4 text-xl uppercase"
                                                    type="submit"
                                                    onClick={() => setShow(false)}>
                                                {buttonName}
                                            </button>
                                        </div>
                                    )}
                                    <div>
                                        <button className="btn-classic-frame select-none px-6 py-2.5 mb-4 text-xl uppercase"
                                                type="submit"
                                                onClick={() => setShow(false)}>
                                            Закрыть
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-95 fixed inset-0 z-20 bg-light-additional dark:bg-dark-additional"></div>
                </>
            )}
        </>
    )
}

export default Modal