import React from "react"

interface CentralTextBlockProps {
    text: string
}

export const CentralTextBlock = ({ text }: CentralTextBlockProps) => {
    return (
        <div className="justify-between select-none">
            <div className="text-center">
                <h3 className="sm:text-3xl text-2xl font-bold mb-12">
                    {text}
                </h3>
            </div>
        </div>
    )
}