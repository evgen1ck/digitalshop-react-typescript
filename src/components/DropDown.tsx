
//
// export const DropDown1 = () => {
//     const [isClearable, setIsClearable] = useState(true)
//     const [isDisabled, setIsDisabled] = useState(false)
//     const [isLoading, setIsLoading] = useState(false)
//
//     return (
//         <Select
//             {...props}
//             // @ts-ignore
//             emoji={emoji}
//             onEmojiClick={onClick}
//             components={{ Control }}
//             isSearchable
//             name="emoji"
//             options={colourOptions}
//             styles={styles}
//         />
//     )
// }





import React from 'react'
import Select, {
    components,
    OptionProps,
    SingleValueProps,
} from 'react-select'
import SVGIcon from "../utils/svgIconColor"

// export interface Services {
//     id: string
//     name: string
//     url: string
//     label?: string
// }
//
// export interface Group {
//     label: string
//     options: Services[]
// }
//
// export const groupedOptions: Group[] = [
//     {
//         label: 'Group 1',
//         options: [
//             { id: '1', name: 'abcc', url: "https://api.digitalshop.evgenick.com/api/v1/resources/svg_file/steam" },
//             { id: '2', name: 'abcc', url: "https://api.digitalshop.evgenick.com/api/v1/resources/svg_file/steam" },
//         ],
//     },
//     {
//         label: 'Group 4',
//         options: [
//             { id: '3', name: 'abcc', url: "https://api.digitalshop.evgenick.com/api/v1/resources/svg_file/steam" },
//             { id: '4', name: 'abcc', url: "https://api.digitalshop.evgenick.com/api/v1/resources/svg_file/steam" },
//             { id: '4', name: 'abcc', url: "https://api.digitalshop.evgenick.com/api/v1/resources/svg_file/steam" },
//         ],
//     },
// ]
//
// const Option = (props: OptionProps<Services, false>) => {
//     const { data } = props
//     return (
//         <components.Option {...props}>
//             <div className="flex items-center space-x-2 cursor-pointer">
//                 <SVGIcon
//                     url={data.url}
//                     alt={data.name}
//                     className="w-6 h-6"
//                     fillColor={localStorage.getItem('color-theme') === 'dark' ? 'white' : 'black'} />
//                 <span>{data.name}</span>
//             </div>
//         </components.Option>
//     )
// }
//
// const SingleValue = (props: SingleValueProps<Services>) => {
//     const { data } = props
//     return (
//         <components.SingleValue {...props}>
//             <div className="flex items-center space-x-2 cursor-pointer">
//                 <SVGIcon
//                     url={data.url}
//                     alt={data.name}
//                     className="w-6 h-6"
//                     fillColor={localStorage.getItem('color-theme') === 'dark' ? 'white' : 'black'} />
//                 <span>{data.name}</span>
//             </div>
//         </components.SingleValue>
//
//     )
// }
//
// const GroupHeading = (props: GroupHeadingProps<Services>) => {
//     const { children } = props
//     const currentGroup = groupedOptions.find((group) => group.label === children)
//     const totalItemsInGroup = currentGroup ? currentGroup.options.length : 0
//
//     return (
//         <components.GroupHeading {...props}>
//             {children} <span className="float-right">{totalItemsInGroup}</span>
//         </components.GroupHeading>
//     )
// }
//
// export interface GroupedOption {
//     readonly label: string
//     readonly options: readonly DataOption[]
// }
//
// export interface DataOption {
//     readonly value: string
//     readonly label: string
//     readonly color: string
//     readonly isFixed?: boolean
//     readonly isDisabled?: boolean
// }
//
// export const colourOptions2: DataOption[] = [
//     { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//     { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
//     { value: 'purple', label: 'Purple', color: '#5243AA' },
//     { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
//     { value: 'orange', label: 'Orange', color: '#FF8B00' },
// ]
//
// export const groupedOptions2: readonly GroupedOption[] = [
//     {
//         label: 'Colours',
//         options: [
//             { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//             { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
//             { value: 'purple', label: 'Purple', color: '#5243AA' },
//         ],
//     },
//     {
//         label: 'Flavours',
//         options: colourOptions2,
//     },
// ]
//
// const formatGroupLabel2 = (data: GroupedOption) => (
//     <div className="flex items-center space-x-3">
//         <span>{data.label}</span>
//         <span className="inline-block text-center ro">{data.options.length}</span>
//     </div>
// )
//
// export const CustomSelectProps = (props: Props<Services>) => {
//     return (
//         <Select<GroupedOption, false, GroupedOption>
//             {...props}
//             className="cursor-pointer w-1/3"
//             components={{ GroupedOption, Option, SingleValue, GroupHeading }}
//             isSearchable
//             isMulti={false}
//             options={groupedOptions}
//             getOptionLabel={(option) => option.name}
//             getOptionValue={(option) => option.id}
//             formatGroupLabel={formatGroupLabel2}
//         />
//     )
// }

interface DataOption {
    id: string
    value: string
    label: string
    readonly isFixed?: boolean
    readonly isDisabled?: boolean
}

export interface GroupedOption {
    readonly label: string
    readonly options: DataOption[]
}

export const dataOptions: DataOption[] = [
    { id: "1", value: 'ocean', label: 'Ocean', isFixed: true },
    { id: "1", value: 'blue', label: 'Blue', isDisabled: true },
    { id: "1", value: 'purple', label: 'Purple' },
    { id: "1", value: 'red', label: 'Red', isFixed: true },
    { id: "1", value: 'orange', label: 'Orange' },
    { id: "1", value: 'yellow', label: 'Yellow' },
    { id: "1", value: 'green', label: 'Green' },
    { id: "1", value: 'forest', label: 'Forest' },
    { id: "1", value: 'slate', label: 'Slate' },
    { id: "1", value: 'silver', label: 'Silver' },
]

export const groupedOptions: GroupedOption[] = [
    {
        label: 'Colours',
        options: dataOptions,
    }
]

const formatGroupLabel = (data: GroupedOption) => (
    <div className="flex items-center justify-between"
         key={data.label}>
        <span>{data.label}</span>
        <span className="inline-block text-center leading-3">{data.options.length}</span>
    </div>
)

const Option = (props: OptionProps<DataOption, false>) => {
    const { data } = props
    return (
        <components.Option {...props}>
            <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}
                 key={data.id}>
                <SVGIcon
                    url={data.value}
                    alt={data.label}
                    className="w-6 h-6"
                />
                <span>{data.label}</span>
            </div>
        </components.Option>
    )
}

const SingleValue = (props: SingleValueProps<DataOption>) => {
    const { data } = props
    return (
        <components.SingleValue {...props}>
            <div className={`flex items-center space-x-2 ${!props.isDisabled && "cursor-pointer"}`}>
                <SVGIcon
                    url={data.value}
                    alt={data.label}
                    className="w-6 h-6"
                />
                <span>{data.label}</span>
            </div>
        </components.SingleValue>
    )
}

export const CustomSelectProps = () => (
    <Select<DataOption, false, GroupedOption>
        className=" lg:w-1/3 w-full"
        isSearchable={true}
        isClearable={true}
        isLoading={true}
        isDisabled={false}
        defaultValue={dataOptions[1]}
        options={groupedOptions}
        formatGroupLabel={formatGroupLabel}
        components={{ Option, SingleValue }}
    />
)