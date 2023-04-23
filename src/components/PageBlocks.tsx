import React, { FC, ReactNode } from "react";

interface RowBlockUpperLowerProps {
    addToClassName?: string;
    children: ReactNode;
}

interface RowBlockProps {
    children: ReactNode;
}

export const RowBlockUpper: FC<RowBlockUpperLowerProps> = ({ addToClassName, children }) => {
    return (
        <div className={`flex flex-wrap mb-2 lg:mb-4 m-auto ${addToClassName && addToClassName}`}>
            {children}
        </div>
    );
};

export const RowBlockLower: FC<RowBlockUpperLowerProps> = ({ addToClassName, children }) => {
    return (
        <div className={`flex-grow mb-2 lg:mb-0 px-4 ${addToClassName && addToClassName}`}>
            {children}
        </div>
    );
};

export const RowBlock: FC<RowBlockProps> = ({ children }) => (
    <>
        <RowBlockUpper>
            <RowBlockLower>
                {children}
            </RowBlockLower>
        </RowBlockUpper>
    </>
);