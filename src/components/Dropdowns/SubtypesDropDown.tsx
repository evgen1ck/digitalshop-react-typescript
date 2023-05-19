import React, {useEffect, useState} from 'react'
import Select, {components, OptionProps, SingleValueProps} from "react-select"
import {RowBlockLower} from "../Blocks/PageBlocks"
import {customStyles, DropDownProps} from "./DropDownData"
import {AdminGetSubtypesQuery} from "../../queries/admin"

interface DataOption {
    subtype_no: number
    subtype_name: string
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
            option.subtype_name.toLowerCase().includes(inputValue.toLowerCase())
        )

        return { ...group, options: filteredOptions }
    })
}

const Option = (props: OptionProps<DataOption, false, GroupedOption>) => {
    const { data } = props
    return (
        <components.Option {...props}
                           key={data.subtype_name}>
            <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                <span>{data.subtype_name.toUpperCase()}</span>
            </div>
        </components.Option>
    )
}

const SingleValue = (props: SingleValueProps<DataOption, false, GroupedOption>) => {
    const { data } = props
    return (
        <components.SingleValue {...props}
                                key={data.subtype_name}>
            <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                    <span>{data.subtype_name.toUpperCase()}</span>
                </div>
            </div>
        </components.SingleValue>
    )
}

export const SubtypesDropDown = ({value, header, nameField, placeholder, id, isLoading, setLoading, isClearable, isSearchable, setError, error, setValue, setDisabled, disabled, hasWarnLabel, addToClassName, navigate, checkOnEmpty, typeName}: DropDownProps) => {
    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [selectedOption, setSelectedOption] = useState<DataOption | null>(null)

    useEffect(() => {
        console.log(typeName)
        if (!typeName) {
            setLoading(false)
            setDisabled(true)
        } else {
            setLoading(true)
            setDisabled(false)
        }
        setSelectedOption(null)
        setValue('')
    }, [typeName])

    useEffect(() => {
        if (typeName) {
            const abortController = new AbortController

            AdminGetSubtypesQuery({
                signal: abortController.signal,
                navigate: navigate,
                type_name: typeName
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
        }
    }, [typeName])

    const filteredOptions = filterOptions(inputValue, [
        {
            header: header,
            options: data ? data.map((option: DataOption) => ({...option, label: option.subtype_name, value: option.subtype_no})) : [],
        }
    ])

    const formatGroupLabel = (data: GroupedOption) => (
        <div className="flex items-center justify-between"
             key={data.header}>
            <span>{data.header}</span>
            <span className="inline-block text-center leading-3 pr-2">{data.options.length}</span>
        </div>
    )

    const handleProductChange = (selectedOption: DataOption | null) => {
        setSelectedOption(selectedOption);
        setValue(selectedOption ? selectedOption.subtype_name : '')
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