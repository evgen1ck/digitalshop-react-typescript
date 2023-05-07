
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
    ControlProps,
    OptionProps,
    Props, SingleValueProps,
    StylesConfig,
} from 'react-select'
import SVGIcon from "../utils/svgIconColor"

export interface Services {
    id: string
    name: string
    url: string
}

export const services: Services[] = [
    { id: '1', name: 'abcc', url: "https://api.digitalshop.evgenick.com/api/v1/resources/svg_file/steam" },
    { id: '2', name: 'abcc', url: "https://api.digitalshop.evgenick.com/api/v1/resources/svg_file/steam" },
    { id: '3', name: 'abcc', url: "https://api.digitalshop.evgenick.com/api/v1/resources/svg_file/steam" },
    { id: '4', name: 'abcc', url: "https://api.digitalshop.evgenick.com/api/v1/resources/svg_file/steam" },
]

const Control = ({ children, ...props }: ControlProps<Services, false>) => {
    return <components.Control {...props}>{children}</components.Control>
}

const Option = (props: OptionProps<Services, false>) => {
    const { data } = props
    return (
        <components.Option {...props}>
            <div className="flex items-center space-x-2 cursor-pointer">
                <SVGIcon
                    url={data.url}
                    alt={data.name}
                    className="w-6 h-6"
                    fillColor={localStorage.getItem('color-theme') === 'dark' ? 'white' : 'black'} />
                <span>{data.name}</span>
            </div>
        </components.Option>
    )
}

const SingleValue = (props: SingleValueProps<Services>) => {
    const { data } = props
    return (
        <components.SingleValue {...props}>
            <div className="flex items-center space-x-2 cursor-pointer">
                <SVGIcon
                    url={data.url}
                    alt={data.name}
                    className="w-6 h-6"
                    fillColor={localStorage.getItem('color-theme') === 'dark' ? 'white' : 'black'} />
                <span>{data.name}</span>
            </div>
        </components.SingleValue>

    )
}

export const CustomSelectProps = (props: Props<Services>) => {
    const styles: StylesConfig<Services, false> = {
        control: (css) => ({ ...css, paddingLeft: '1rem' }),
    }

    return (
        <Select
            {...props}
            className="cursor-pointer w-1/3"
            components={{ Control, Option, SingleValue }}
            isSearchable
            isMulti={false}
            options={services}
            styles={styles}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
        />
    )
}
