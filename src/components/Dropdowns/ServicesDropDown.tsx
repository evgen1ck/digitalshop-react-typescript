import React, {useEffect, useState} from "react"
import Select, {components, OptionProps, SingleValueProps} from "react-select"
import SVGIcon from "../Icons/SvgIconColor"
import {RowBlockLower} from "../Blocks/PageBlocks"
import {customStyles, DropDownProps, formatGroupLabel, useUpdateSelectedOption} from "./DropDownData"
import {AdminGetServicesQuery} from "../../queries/admin"
import {Hint} from "@skbkontur/react-ui"
import {AiOutlineEdit} from "react-icons/ai"
import {toast} from "react-hot-toast"
import {MdOutlineDelete} from "react-icons/md"
import {handleDeleteClick} from "../../lib/deleters";
import {ApiAdminServiceUrl, ApiAdminSubtypeUrl} from "../../lib/queries";
import {Link} from "react-router-dom";

export interface DataOption {
    service_no: number
    service_name: string
    service_url: string
    created_at: string
    modified_at: string
    commentary: string | null
}

interface GroupedOption {
    readonly header: string
    readonly options: DataOption[]
}

interface OptionPropsWithDelete extends OptionProps<DataOption, false, GroupedOption> {
    onDelete: (typeName: string) => void;
}

const filterOptions = (inputValue: string, options: GroupedOption[]): GroupedOption[] => {
    return options.map(group => {
        const filteredOptions = group.options.filter(option =>
            option.service_name.toLowerCase().includes(inputValue.toLowerCase())
        )

        return { ...group, options: filteredOptions }
    })
}

const Option = (props: OptionPropsWithDelete) => {
    const { data, isFocused, innerProps } = props
    const [isHovered, setIsHovered] = useState(isFocused)

    useEffect(() => {
        setIsHovered(isFocused)
    }, [isFocused])

    return (
        <components.Option {...props}
                           key={data.service_name}
                           innerProps={{...innerProps, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false)}}>
            <div className={`flex items-center space-x-2 justify-between ${!props.isDisabled && "cursor-pointer"}`}>
                <div className="inline-flex space-x-2">
                    {data.service_name.toLowerCase() != "universal" &&
                        <SVGIcon
                            url={data.service_url}
                            alt={data.service_name}
                            className="w-6 h-6"
                        />
                    }
                    <span>{data.service_name.toUpperCase()}</span>
                </div>
                <span className="pr-2 inline-flex space-x-5">
                    {isHovered && localStorage.getItem("role") == "admin" &&
                        <Link to={"/admin/products/service?name=" + data.service_name} ><Hint pos={"bottom"} text="Редактировать"> <AiOutlineEdit className="system-animation-2"> </AiOutlineEdit> </Hint> </Link>
                    }
                    {isHovered && localStorage.getItem("role") == "admin" &&
                        <Hint pos={"bottom"} text="Удалить">
                            <MdOutlineDelete color="red" className="system-animation-2" onClick={async () => {
                                let result: boolean = await handleDeleteClick(data.service_name, ApiAdminServiceUrl)
                                console.log(result)
                                if (result) {
                                    props.onDelete(data.service_name)
                                }
                            }} />
                        </Hint>
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

export const ServicesDropDown = ({updateTrigger, value, header, nameField, placeholder, id, isLoading, setLoading, isClearable, isSearchable, setError, error, setValue, disabled, setDisabled, hasWarnLabel, addToClassName, navigate, checkOnEmpty}: DropDownProps) => {
    const [data, setData] = useState<DataOption[]>([]);
    const [inputValue, setInputValue] = useState("")
    const [selectedOption, setSelectedOption] = useState<DataOption | null>(null)

    const handleDelete = (type_name: string) => {
        setData(prevData => prevData.filter(option => option.service_name !== type_name))
    }

    useEffect(() => {
        const abortController = new AbortController

        AdminGetServicesQuery({
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
    }, [updateTrigger])

    const filteredOptions = filterOptions(inputValue, [
        {
            header: header,
            options: data ? data.map((option: DataOption) => ({...option, label: option.service_name, value: option.service_no})) : [],
        }
    ])

    useUpdateSelectedOption(data, value, setSelectedOption, "service_name")

    const handleProductChange = (selectedOption: DataOption | null) => {
        setSelectedOption(selectedOption)
        setValue(selectedOption ? selectedOption.service_name : "")
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
                isDisabled={disabled || isLoading}
                options={filteredOptions}
                value={selectedOption}
                formatGroupLabel={formatGroupLabel}
                components={{
                    Option: (props) => <Option {...props} onDelete={handleDelete} />,
                    SingleValue
                }}
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