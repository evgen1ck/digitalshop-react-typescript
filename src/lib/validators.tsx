export const isNotBlank = (value: any) => {
    if (typeof value === "string" && value.trim() === "") {
        return "Поле обязательно к заполнению!"
    }
    return ""
}

export const isEmail = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
    if (!emailRegex.test(value)) {
        return "Некорректная почта" 
    }
    return "" 
} 

export const isPassword = (value: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+,\-.\/: <=>?[\\\]`{|}~])[A-Za-z\d!@#$%^&*()_+,\-.\/: <=>?[\\\]`{|}~]{6,}$/ 
    if (!passwordRegex.test(value)) {
        return "Пароль не безопасен" 
    }
    return "" 
} 

export const isNotContainsSpace = (value: string) => {
    if (value.includes(" ")) {
        return `Текст содержит пробел` 
    }
    return "" 
}

export const isNotContainsConsecutiveSpaces = (value: string) => {
    const regex = /  +/g
    if (regex.test(value)) {
        return `Текст содержит два или более пробелов подряд`
    }
    return ""
}

export const isMinMaxLen = (min: number, max: number) => (value: string) => {
    const len = value.length 
    if (len < min) {
        return `Текст должен иметь минимум ${min} символов` 
    } else if (len > max) {
        return `Текст должен иметь максимум ${max} символов` 
    }
    return "" 
} 

export const isLen = (length: number) => (value: string) => {
    const l = value.length 
    if (l !== length) {
        return `Текст не является нужной длины (необходимо ${length} символов)` 
    }
    return "" 
} 

export const isUrl = (value: string) => {
    try {
        new URL(value) 
    } catch (error) {
        return "Текст не является ссылкой" 
    }
    return "" 
} 

export const isInt64 = (value: string) => {
    const num = Number(value) 
    if (!Number.isInteger(num) || num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        return "Текст не является числом" 
    }
    return "" 
} 

export const isUint64 = (value: string) => {
    const num = Number(value) 
    if (!Number.isInteger(num) || num > Number.MAX_SAFE_INTEGER || num < 0) {
        return "Текст не является положительном числом" 
    }
    return "" 
} 

export const isNickname = (value: string) => {
    const regex = /^[a-zA-Z0-9_-]+$/ 
    if (!regex.test(value)) {
        return "Псевдоним может содержать только английские буквы, цифры, символы - и _" 
    }
    return "" 
}

export const isMoney = (value: any) => {
    const regex = /^\d+([.,]\d{1,2})?$/
    if (!regex.test(value))
        return "Текст не является денежным эквивалентом"
    if (value <= 0)
        return "Значение должно быть больше нуля"
    return ""
}

export const isPercentage = (value: any) => {
    const regex = /^\d+([.,]\d{1,2})?%?$/
    if (!regex.test(value))
        return "Текст не является процентным значением"
    if (value <= 0)
        return "Значение должно быть больше 0"
    if (value >= 100)
        return "Значение должно быть меньше 100"
    return ""
}
