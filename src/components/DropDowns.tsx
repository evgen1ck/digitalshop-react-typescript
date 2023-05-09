import React, {useState} from 'react'
import Select, {components, OptionProps, SingleValueProps} from "react-select"
import SVGIcon from "../utils/svgIconColor"
import {RowBlockLower} from "./PageBlocks"

interface ServicesDropDownProps {
    nameField: string
    id: string
    header: string
    dataOption: ServicesDataOption[]
    onChange: (selectedOption: ServicesDataOption | null) => void
    isLoading: boolean
    isDisabled: boolean
    isClearable: boolean
    isSearchable: boolean
    placeholder: string
    error: string
    hasWarnLabel: boolean
    addToClassName?: string
}
export interface ServicesDataOption {
    service_no: number
    service_name: string
    service_url: string
    created_at: number
    modified_at: number
    commentary: string | null
}

interface GroupedOption {
    readonly header: string
    readonly options: ServicesDataOption[]
}


const filterOptions = (inputValue: string, options: GroupedOption[]): GroupedOption[] => {
    return options.map(group => {
        const filteredOptions = group.options.filter(option =>
            option.service_name.toLowerCase().includes(inputValue.toLowerCase())
        )

        return { ...group, options: filteredOptions }
    })
}

const Option = (props: OptionProps<ServicesDataOption, false>) => {
    const { data } = props
    return (
        <components.Option {...props}
                           key={data.service_name}>
            <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                {data.service_name.toLowerCase() != "universal" &&
                    <SVGIcon
                        url={data.service_url}
                        alt={data.service_name}
                        className="w-6 h-6"
                    />
                }
                <span>{data.service_name.toUpperCase()}</span>
            </div>
        </components.Option>
    )
}

const SingleValue = (props: SingleValueProps<ServicesDataOption>) => {
    const { data } = props
    return (
        <components.SingleValue {...props}
                                key={data.service_name}>
            <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                {data.service_name.toLowerCase() != "universal" &&
                    <SVGIcon
                        url={data.service_url}
                        alt={data.service_name}
                        className="w-6 h-6"
                    />
                }
                <span>{data.service_name.toUpperCase()}</span>
            </div>
        </components.SingleValue>
    )
}

export const ServicesDropDown = ({header, nameField, placeholder, id, dataOption, onChange, isLoading, isDisabled, isClearable, isSearchable, error, hasWarnLabel, addToClassName}: ServicesDropDownProps) => {
    const [inputValue, setInputValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = () => {
        setIsFocused(true)
    }

    const filteredOptions = filterOptions(inputValue, [
        {
            header: header,
            options: dataOption.map(option => ({...option, label: option.service_name, value: option.service_name})),
        }
    ])

    const formatGroupLabel = (data: GroupedOption) => (
        <div className="flex items-center justify-between"
             key={data.header}>
            <span>{data.header}</span>
            <span className="inline-block text-center leading-3">{data.options.length}</span>
        </div>
    )

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            backgroundColor: 'white',
            height: 45,
            borderColor: state.isFocused ? '#CCCAC3' : '#CCCAC3',
            boxShadow: state.isFocused ? 0 : 0,
            "&:hover": {
                borderColor: state.isFocused ? '#CCCAC3' : '#CCCAC3',  // цвет границы при наведении
            }
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isDisabled ? 'gray' : state.isSelected ? 'white' : 'black',
            backgroundColor: state.isDisabled ? null : state.isSelected ? '#CCCAC3' : null,
        }),
    }


    return (
        <RowBlockLower addToClassName={addToClassName && addToClassName}>
            <label className="block uppercase font-bold mb-2 select-none"
                   htmlFor={id}>{nameField}
            </label>
            <Select<ServicesDataOption, false, GroupedOption>
                isSearchable={isSearchable}
                isClearable={isClearable}
                isLoading={isLoading}
                isDisabled={isDisabled}
                options={filteredOptions}
                formatGroupLabel={formatGroupLabel}
                components={{ Option, SingleValue }}
                onInputChange={(value) => setInputValue(value)}
                onChange={onChange}
                placeholder={placeholder}
                noOptionsMessage={() => "Пусто"}
                id={id}
                onFocus={handleFocus}
                styles={customStyles}
            />
            {hasWarnLabel && (
                <p className={`text-light-second dark:text-dark-second text-sm italic select-none p-1 
                ${!error || !isFocused && "invisible"}`}>{error ? error : "⠀"}</p>
            )}
        </RowBlockLower>
    )
}