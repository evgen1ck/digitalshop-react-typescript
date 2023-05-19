import React, { FC, ReactNode } from "react"

interface RowBlockUpperLowerProps {
    addToClassName?: string 
    children: ReactNode 
}

export const RowBlockUpper: FC<RowBlockUpperLowerProps> = ({ addToClassName, children }) => {
    return (
        <div className={`flex flex-wrap mb-2 lg:mb-4 m-auto ${addToClassName && addToClassName}`}>
            {children}
        </div>
    ) 
} 

export const RowBlockLower: FC<RowBlockUpperLowerProps> = ({ addToClassName, children }) => {
    return (
        <div className={`flex-grow mb-2 lg:mb-0 px-4 ${addToClassName && addToClassName}`}>
            {children}
        </div>
    ) 
}

export const RowBlock = (props: { children: ReactNode }) => {
    const { children } = props
    return (
        <>
            <RowBlockUpper>
                <RowBlockLower>
                    {children}
                </RowBlockLower>
            </RowBlockUpper>
        </>
    )
}