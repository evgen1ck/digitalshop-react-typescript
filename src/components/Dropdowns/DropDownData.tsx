import React, {useEffect} from 'react'
import {NavigateFunction} from "react-router-dom";

export interface DropDownProps {
    nameField: string
    id: string
    header: string
    isLoading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    isClearable: boolean
    isSearchable: boolean
    placeholder: string
    hasWarnLabel: boolean
    setError: React.Dispatch<React.SetStateAction<string>>
    error: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    value: string
    disabled: boolean
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
    navigate: NavigateFunction
    checkOnEmpty: boolean
    addToClassName?: string
    typeName?: string
    setTypeValue?: React.Dispatch<React.SetStateAction<string>>
}

export const customStyles = (isDisabled: boolean) => ({
    control: (provided: any, state: any) => ({
        ...provided,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        backgroundColor: isDisabled ? '#E6E6E6' : 'white',
        height: 45,
        borderColor: state.isFocused ? '#CCCAC3' : '#CCCAC3',
        boxShadow: state.isFocused ? 0 : 0,
        "&:hover": {
            borderColor: state.isFocused ? '#CCCAC3' : '#CCCAC3',
        }
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        color: state.isDisabled ? 'gray' : 'black',
        //color: state.isDisabled ? 'gray' : state.isSelected ? 'white' : 'black',
        backgroundColor: state.isDisabled ? null : state.isFocused ? '#F5F5F5' : null,
        //backgroundColor: state.isDisabled ? null : state.isSelected ? '#CCCAC3' : state.isFocused ? '#F5F5F5' : null,
    }),
    input: (provided: any) => ({
        ...provided,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),
});

export const formatGroupLabel = (data: any) => (
    <div className="flex items-center justify-between"
         key={data.header}>
        <span>{data.header}</span>
        <span className="inline-block text-center leading-3 pr-2">{data.options.length}</span>
    </div>
)


export const useUpdateSelectedOption = (data: any, value: any, setSelectedOption: any, field: string) => {
    useEffect(() => {
        if (data) {
            const correspondingOption = data.find((option: any) => option[field] === value);
            setSelectedOption(correspondingOption ? { ...correspondingOption, label: correspondingOption[field], value: correspondingOption[field] } : null);
        }
    }, [value, data]);
}

