import React, {useEffect, useState} from 'react'
import Select, {components, OptionProps, SingleValueProps} from "react-select"
import {RowBlockLower} from "../PageBlocks"
import {customStyles, DropDownProps, formatGroupLabel} from "./DropDownData";
import {AdminGetProductsQuery} from "../../queries/admin";

interface DataOption {
    product_id: string
    product_name: string
    description: string
    tags: string | null
    created_at: string
    modified_at: string
    commentary: string | null
}

interface GroupedOption {
    readonly header: string
    readonly options: DataOption[]
}

const filterOptions = (inputValue: string, options: GroupedOption[]): GroupedOption[] => {
    return options.map(group => {
        const filteredOptions = group.options.filter(option =>
            option.product_name.toLowerCase().includes(inputValue.toLowerCase())
        )

        return { ...group, options: filteredOptions }
    })
}

const Option = (props: OptionProps<DataOption, false, GroupedOption>) => {
    const { data } = props
    return (
        <components.Option {...props}
                           key={data.product_name}>
            <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                <span>{data.product_name.toUpperCase()}</span>
            </div>
        </components.Option>
    )
}

const SingleValue = (props: SingleValueProps<DataOption, false, GroupedOption>) => {
    const { data } = props
    return (
        <components.SingleValue {...props}
                                key={data.product_name}>
            <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                    <span>{data.product_name.toUpperCase()}</span>
                </div>
            </div>
        </components.SingleValue>
    )
}

export const ProductsDropDown = ({value, header, nameField, placeholder, id, isLoading, setLoading, isClearable, isSearchable, setError, error, setValue, setDisabled, disabled, hasWarnLabel, addToClassName, navigate, checkOnEmpty}: DropDownProps) => {
    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [selectedOption, setSelectedOption] = useState<DataOption | null>(null)

    useEffect(() => {
        const abortController = new AbortController

        AdminGetProductsQuery({
            signal: abortController.signal,
            navigate: navigate
        }).then(data => {
            setData(data)
            setLoading(false)
        }).catch(() => {
            setDisabled(true)
            setLoading(false)
        })

        return () => {
            abortController.abort()
        }
    }, [])

    const filteredOptions = filterOptions(inputValue, [
        {
            header: header,
            options: data ? data.map((option: DataOption) => ({...option, label: option.product_name, value: option.product_id})) : [],
        }
    ])

    const handleProductChange = (selectedOption: DataOption | null) => {
        setSelectedOption(selectedOption)
        setValue(selectedOption ? selectedOption.product_name : '')
        if (checkOnEmpty) {
            if (selectedOption == null) setError("Поле обязательно к заполнению!")
            else setError('')
        }
    }

    return (
        <RowBlockLower addToClassName={addToClassName && addToClassName}>
            <label className="block uppercase font-bold mb-2 select-none"
                   htmlFor={id}>{nameField}
            </label>
            <Select<DataOption, false, GroupedOption>
                isSearchable={isSearchable}
                isClearable={isClearable}
                isLoading={isLoading}
                isDisabled={disabled}
                options={filteredOptions}
                value={selectedOption}
                formatGroupLabel={formatGroupLabel}
                components={{ Option, SingleValue }}
                onInputChange={(value) => setInputValue(value)}
                onChange={handleProductChange}
                placeholder={placeholder}
                noOptionsMessage={() => "Пусто"}
                loadingMessage={() => "Загрузка данных..."}
                id={id}
                styles={customStyles(disabled)}
            />
            {hasWarnLabel && (
                <p className={`text-light-second dark:text-dark-second text-sm italic select-none p-1 
                ${!error || value && "invisible"}`}>{error ? error : "⠀"}</p>
            )}
        </RowBlockLower>
    )
}