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

export interface ILink {
    name: string
    link: string
}