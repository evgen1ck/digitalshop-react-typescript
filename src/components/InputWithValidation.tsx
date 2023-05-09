import React, {KeyboardEventHandler, useState} from "react" 
import { RowBlockLower } from "./PageBlocks" 

interface InputWithValidationProps {
    addToClassName?: string
    nameField: string
    placeholder: string
    id: string 
    type: string
    hasWarnLabel: boolean
    spellCheck: boolean
    requiredValidators: ((value: string) => string)[]
    value: string
    error: string
    onChange: (value: string, errorMessage: string) => void
    inputRef: React.RefObject<HTMLInputElement>
    insertSpace: boolean
    iconName?: string
    maxLength?: number
    onKeyPress?: KeyboardEventHandler<HTMLInputElement>
}

export const TEXT = "text" 
export const EMAIL = "email" 
export const PASSWORD = "password" 
export const NUMBER = "number"

export default function InputWithValidation ({
                                                 nameField,
                                                 placeholder,
                                                 id,
                                                 type,
                                                 hasWarnLabel,
                                                 addToClassName,
                                                 spellCheck,
                                                 requiredValidators,
                                                 value,
                                                 error,
                                                 onChange,
                                                 inputRef,
                                                 maxLength,
                                                 insertSpace,
                                                 onKeyPress} : InputWithValidationProps) {

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (!insertSpace && event.key === ' ') {
            event.preventDefault() 
        }
        if (event.key === 'Escape') {
            event.currentTarget.blur() 
        }

        onKeyPress && onKeyPress(event) 
    }

    const [isFocused, setIsFocused] = useState(false) 
    const handleFocus = () => {
        setIsFocused(true)
    }

    let errorMessage = "" 
    const handleBlur = () => {
        for (const validator of requiredValidators) {
            errorMessage = validator(value.trim()) 
            if (errorMessage) break 
        }
        onChange(value, errorMessage) 
    } 


    return (
        <RowBlockLower addToClassName={addToClassName}>
            <label className="block uppercase font-bold mb-2 select-none"
                   htmlFor={id}>{nameField}
            </label>
            <input
                className="input-classic block w-full p-3 mb-1"
                id={id}
                placeholder={placeholder}
                maxLength={maxLength ? maxLength : 64}
                type={type}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                spellCheck={spellCheck}
                value={value}
                onChange={(e) => onChange(e.target.value, "")}
                ref={inputRef}
            />
            {hasWarnLabel && (
                <p className={`text-light-second dark:text-dark-second text-sm italic select-none p-1
                ${!error || !isFocused && "invisible"}`}>{error ? error : "⠀"}</p>
            )}
        </RowBlockLower>
    ) 
} 