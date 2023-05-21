import React, {useEffect, useState} from "react"
import Select, {components, OptionProps, SingleValueProps} from "react-select"
import {RowBlockLower} from "../Blocks/PageBlocks"
import {customStyles, DropDownProps, useUpdateSelectedOption} from "./DropDownData"
import {AdminGetSubtypesQuery} from "../../queries/admin"
import {toast} from "react-hot-toast"
import { MdOutlineDelete} from "react-icons/md"
import {Hint} from "@skbkontur/react-ui"
import {AiOutlineEdit} from "react-icons/ai"


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
    const { data, isFocused, innerProps } = props
    const [isHovered, setIsHovered] = useState(isFocused)

    useEffect(() => {
        setIsHovered(isFocused)
    }, [isFocused])

    return (
        <components.Option {...props}
                           key={data.subtype_name}
                           innerProps={{...innerProps, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false)}}>
            <div className={`flex items-center space-x-2 justify-between ${!props.isDisabled && "cursor-pointer"}`}>
                <span>{data.subtype_name.toUpperCase()}</span>
                <span className="pr-2 inline-flex space-x-5">
                    {isHovered && localStorage.getItem("role") == "admin" &&
                        <Hint pos={"bottom"} text="Редактировать"> <AiOutlineEdit className="system-animation-2" onClick={() => {
                            toast.success("abcd")
                        }} /> </Hint>
                    }
                    {isHovered && localStorage.getItem("role") == "admin" &&
                        <Hint pos={"bottom"} text="Удалить"> <MdOutlineDelete color="red" className="system-animation-2" onClick={() => {
                            toast.success("ab")
                        }} /> </Hint>
                    }
                </span>
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
    const [inputValue, setInputValue] = useState("")
    const [selectedOption, setSelectedOption] = useState<DataOption | null>(null)

    useEffect(() => {
        if (!typeName) {
            setLoading(false)
            setDisabled(true)
        } else {
            setLoading(true)
            setDisabled(false)
        }
        setSelectedOption(null)
        setValue("")
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
        setValue(selectedOption ? selectedOption.subtype_name : "")
        setSelectedOption(selectedOption)
        if (checkOnEmpty) {
            if (selectedOption == null) setError("Поле обязательно к заполнению!")
            else setError("")
        }
    }

    useUpdateSelectedOption(data, value, setSelectedOption, "subtype_name")

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