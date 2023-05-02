
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





import React from 'react';
import Select, {
    components,
    ControlProps,
    OptionProps,
    Props,
    StylesConfig,
} from 'react-select';

export interface Services {
    id: string;
    name: string;
    url: string;
}

export const services: Services[] = [
    { id: '1', name: 'abcc', url: 'http://localhost:9990/api/v1/resources/product_image/573b8cea-bbfa-4415-8f16-1b793a97c85f' },
];

const Control = ({ children, ...props }: ControlProps<Services, false>) => {
    return <components.Control {...props}>{children}</components.Control>;
};

const Option = (props: OptionProps<Services, false>) => {
    const { data } = props;
    return (
        <components.Option {...props}>
            <img src={data.url} alt={data.name} width="50" />
            <span>{data.name}</span>
        </components.Option>
    );
};

export const CustomSelectProps = (props: Props<Services>) => {
    const styles: StylesConfig<Services, false> = {
        control: (css) => ({ ...css, paddingLeft: '1rem' }),
    };

    return (
        <Select
            {...props}
            className=""
            components={{ Control, Option }}
            isSearchable
            isMulti={false}
            options={services}
            styles={styles}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
        />
    );
};
