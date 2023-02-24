export const isNotBlank = (value: string) => {
    if (value.trim() === "") {
        return "Поле обязательно к заполнению!";
    }
    return "";
};

export const isEmail = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) {
        return "Введена некорректная почта";
    }
    return "";
};





function IsMinMaxLen(min: number, max: number): (str: string) => Error | null {
    return (str: string) => {
        const len = str.length;
        if (len < min) {
            return new Error(`Введённый текст слишком короткий (минимум ${min} символов против ваших ${len})`);
        } else if (len > max) {
            return new Error(`Введённый текст слишком длинный (максимум ${max} символов против ваших ${len})`);
        }
        return null;
    };
}

function IsLen(length: number): (str: string) => Error | null {
    return function (str: string): Error | null {
        const l = str.length;
        if (l !== length) {
            return new Error(`the value is not the required length characters (required is ${length} vs your ${l} character(s))`);
        }
        return null;
    };
}

// function IsEmail(): (str: string) => Error | null {
//     return function (str: string): Error | null {
//         const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         if (!regex.test(str)) {
//             return new Error(`the value is not an email`);
//         }
//         return null;
//     };
// }



function IsUrl(): (str: string) => Error | null {
    return function (str: string): Error | null {
        try {
            new URL(str);
        } catch (error) {
            return new Error(`the value is not a url`);
        }
        return null;
    };
}

function IsInt64(): (str: string) => Error | null {
    return function (str: string): Error | null {
        const num = Number(str);
        if (!Number.isInteger(num) || num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            return new Error(`the value is not an integer data type`);
        }
        return null;
    };
}

function IsUint64(): (str: string) => Error | null {
    return function (str: string): Error | null {
        const num = Number(str);
        if (!Number.isInteger(num) || num > Number.MAX_SAFE_INTEGER || num < 0) {
            return new Error(`the value is not an unsigned integer data type`);
        }
        return null;
    };
}

function IsContainsSpace(): (str: string) => Error | null {
    return function (str: string): Error | null {
        for (let i = 0; i < str.length; i++) {
            if (str[i] === " ") {
                return new Error(`the value contains a space (space in ${i + 1} character)`);
            }
        }
        return null;
    };
}