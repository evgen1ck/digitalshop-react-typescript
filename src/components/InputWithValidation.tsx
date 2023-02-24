import React, { useState } from "react";
import {RowBlockLower} from "./PageBlocks";

interface InputWithValidationProps {
    nameField: string,
    placeholder: string,
    id: string,
    type: string,
    hasWarnLabel: boolean,
    spellCheck: boolean,
    validators: ((value: string) => string)[],
    value: string,
    error: string,
    onChange: (value: string, errorMessage: string) => void,
}

export const TEXT = "text";
export const EMAIL = "text";
export const PASSWORD = "password";


export default function InputWithValidation ({
                                                 nameField,
                                                 placeholder,
                                                 id,
                                                 type,
                                                 hasWarnLabel,
                                                 spellCheck,
                                                 validators,
                                                 value,
                                                 error,
                                                 onChange} : InputWithValidationProps) {

    const handleBlur = () => {
        let errorMessage = "";
        for (const validator of validators) {
            errorMessage = validator(value);
            if (errorMessage) break;
        }
        onChange(value, errorMessage);
    };

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Escape') {
            event.currentTarget.blur();
        }
    }

    return (
        <RowBlockLower>
            <label className="block uppercase font-bold mb-2"
                   htmlFor={id}>{nameField}
            </label>
            <input
                className="input-classic block w-full p-3 mb-1"
                id={id}
                placeholder={placeholder}
                type={type}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                spellCheck={spellCheck}
                value={value}
                onChange={(e) => onChange(e.target.value, "")}
            />
            {hasWarnLabel ? <p className={`text-light-second dark:text-dark-second text-sm italic ${error ? '' : 'invisible'}`}>{error}⠀</p> : false }
        </RowBlockLower>
    );
};