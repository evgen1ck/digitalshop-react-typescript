import React from "react";
import {Link} from "react-router-dom";

export interface IMain {
    fields: IFields[] // array of elements
}

export interface IFields {
    nameField: string // field name
    placeholder: string // text for placeholder
    id: string // field id
    type: string // filed type (text, password, email and others)
    elementType: string // type of element (button, select...)
    selects?: ISelect[] // values for element select (optional)
    hasWarnLabel: boolean
}

export interface ISelect {
    id: string // id value
    value: string // value name
}

export const MyControls = {

    Input: function GetInput(field: IFields) {
        return (
            <input className="input-classic block w-full p-3 mb-1" id={field.id} type={field.type} placeholder={field.placeholder} />
        )
    },

    Select: function GetSelect(field: IFields) {
        return (
            <div className="relative">
                <select className="select-classic block w-full py-3 px-4 pr-8" id={field.id}>
                    {field.selects && field.selects?.map(value => (
                        <option id={value.id}>{value.value}</option>
                    ))}
                </select>

                <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg className="dark:fill-dark-second hover:dark:fill-dark-focusing h-6 w-6"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
        )
    },
}