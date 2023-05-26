import React, {useEffect, useState} from "react"
import Select, {components, OptionProps, SingleValueProps} from "react-select"
import {RowBlockLower} from "../Blocks/PageBlocks"
import {customStyles, DropDownProps, formatGroupLabel, useUpdateSelectedOption} from "./DropDownData"

export interface DataOption {
    sort_name_ru: string
}

export interface GroupedOption {
    readonly header: string
    readonly options: DataOption[]
}

const filterOptions = (inputValue: string, options: GroupedOption[]): GroupedOption[] => {
    return options.map(group => {
        const filteredOptions = group.options.filter(option =>
            option.sort_name_ru.toLowerCase().includes(inputValue.toLowerCase())
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
                           key={data.sort_name_ru}
                           innerProps={{...innerProps, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false)}}>
            <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                    <span>{data.sort_name_ru.toUpperCase()}</span>
                </div>
            </div>
        </components.Option>
    )
}

const SingleValue = (props: SingleValueProps<DataOption, false, GroupedOption>) => {
    const { data } = props
    return (
        <components.SingleValue {...props}
                                key={data.sort_name_ru}>
            <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                    <span>{data.sort_name_ru.toUpperCase()}</span>
                </div>
            </div>
        </components.SingleValue>
    )
}

export const SortDropDown = ({value, header, defaultValue, nameField, placeholder, id, isLoading, setLoading, isClearable, isSearchable, setError, error, setValue, setDisabled, disabled, hasWarnLabel, addToClassName, navigate, checkOnEmpty}: DropDownProps) => {
    const dataForSort: DataOption[] = [
        {sort_name_ru: "по типу"},
        {sort_name_ru: "по подтипу"},
        {sort_name_ru: "по названию продукта"},
        {sort_name_ru: "по названию варианта"},
        {sort_name_ru: "по начальной стоимости"},
        {sort_name_ru: "по итоговой стоимости"},
        {sort_name_ru: "по скидке в деньгах"},
        {sort_name_ru: "по скидке в процентах"},
        {sort_name_ru: "по текущему количеству"},
    ]
    const [data, setData] = useState<DataOption[] | null>(dataForSort || null)
    const [inputValue, setInputValue] = useState("")
    const defaultDataOption = typeof defaultValue === 'string'
        ? dataForSort.find(option => option.sort_name_ru === defaultValue)
        : undefined;
    const [selectedOption, setSelectedOption] = useState<DataOption | null>(defaultDataOption || null);

    const filteredOptions = filterOptions(inputValue, [
        {
            header: header,
            options: data ? data.map((option: DataOption) => ({...option, label: option.sort_name_ru, value: option.sort_name_ru})) : [],
        }
    ])

    useEffect(() => {
        if (selectedOption)
            setValue(selectedOption.sort_name_ru)
    }, [selectedOption])

    useUpdateSelectedOption(data, value, setSelectedOption, "sort_name_ru")

    const handleProductChange = (selectedOption: DataOption | null) => {
        setSelectedOption(selectedOption)
        setValue(selectedOption ? selectedOption.sort_name_ru : "")
        if (checkOnEmpty) {
            if (selectedOption == null) setError("Поле обязательно к заполнению!")
            else setError("")
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
                defaultValue={selectedOption}
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