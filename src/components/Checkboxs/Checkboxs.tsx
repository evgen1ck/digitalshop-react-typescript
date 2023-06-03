import React from "react";

interface CommonCheckFieldProps {
    id: string
    text: string
    value: boolean
    setValue: React.Dispatch<React.SetStateAction<boolean>>
}

const CommonCheckField = ({id, text, value, setValue}: CommonCheckFieldProps) => {
    return (
        <label className="flex items-center p-3 border btn-classic-frame select-none space-x-2 cursor-pointer"
               htmlFor={id}>
            <input id={id}
                   onChange={() => {setValue(!value)}}
                   defaultChecked={value}
                   checked={value}
                   type="checkbox"
                   className="w-4 h-4 checkbox-classic" />
            <label htmlFor={id}
                   className="w-full text-base uppercase cursor-pointer">
                {text}
            </label>
        </label>
    )
}

export default CommonCheckField