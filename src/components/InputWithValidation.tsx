import React, { useState } from "react";
import { RowBlockLower } from "./PageBlocks";

interface InputWithValidationProps {
    addToClassName?: string;
    nameField: string;
    placeholder: string;
    id: string;
    type: string;
    hasWarnLabel: boolean;
    spellCheck: boolean;
    validators: ((value: string) => string)[];
    value: string;
    error: string;
    onChange: (value: string, errorMessage: string) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    insertSpace: boolean;
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
                                                 addToClassName,
                                                 spellCheck,
                                                 validators,
                                                 value,
                                                 error,
                                                 onChange,
                                                 inputRef,
                                                 insertSpace } : InputWithValidationProps) {

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (!insertSpace && event.key === ' ') {
            event.preventDefault();
        }
        if (event.key === 'Escape') {
            event.currentTarget.blur();
        }
    }

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        let errorMessage = "";
        for (const validator of validators) {
            errorMessage = validator(value.trim());
            if (errorMessage) break;
        }
        onChange(value, errorMessage);
    };

    return (
        <RowBlockLower addToClassName={addToClassName}>
            <label className="block uppercase font-bold mb-2 select-none"
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
                ref={inputRef}
                onFocus={handleFocus}
            />
            {hasWarnLabel && (
                <p className={`text-light-second dark:text-dark-second text-sm italic select-none 
                ${error || isFocused ? "" : "invisible"}`}>{error ? error : "⠀"}</p>
            )}
        </RowBlockLower>
    );
};