import React, {ReactNode, RefObject, useCallback, useEffect, useRef} from "react" 

interface ModalProps {
    onShow: boolean 
    setShow: (value: boolean) => void 
    onClick?: () => void 
    children: ReactNode 
    canLeave?: boolean 
    title: string 
}

const Modals: React.FC<ModalProps> = ({ setShow, children, onShow, canLeave, title } : ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)

    // handle what happens on click outside of modal
    const handleClickOutside = () => setShow(false)

    // handle what happens on key press
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (canLeave && event.key === "Escape") setShow(false)
    }, [])

    useOnClickOutside(modalRef, handleClickOutside)

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


    return (
        <>
            {onShow && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none select-none">

                    <div className="fixed inset-0 bg-light-main dark:bg-dark-additional opacity-95" onClick={canLeave ? () => setShow(!onShow) : () => null}></div>

                    <div className="relative w-auto my-6 flex-wrap mx-auto sm:w-1/3">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-dark-main outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold mx-5">{title}</h3>
                            </div>
                            <div className="relative p-6 flex-auto">{children}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) 
} 

export default Modals 

type Event = MouseEvent | TouchEvent

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: Event) => void
) => {
    useEffect(() => {
        const listener = (event: Event) => {
            const el = ref?.current
            if (!el || el.contains((event?.target as Node) || null)) return null

            handler(event)
        }

        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)

        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [ref, handler])
}