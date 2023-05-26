export function translateTextQuantity(s: string) {
    switch (s.toLowerCase()) {
        case "out of stock":
            return "распродано"
        case "last in stock":
            return "последний"
        case "limited stock":
            return "последние"
        case "adequate stock":
            return "достаточно"
        case "large stock":
            return "много"
        default:
            return s
    }
}

export function translateProductSubtype(s: string) {
    switch (s.toLowerCase()) {
        case "console version":
            return "Консольная версия"
        case "computer version":
            return "Декстопная версия"
        case "mobile version":
            return "Мобильная версия"
        case "downloadable game content":
            return "Дополнительный контент"
        case "book":
            return "Книга"
        case "music":
            return "Музыка"
        case "antivirus software":
            return "Антивирус"
        case "design software":
            return "Дизайнерское ПО"
        default:
            return s
    }
}

export function translateProductType(s: string) {
    switch (s.toLowerCase()) {
        case "replenishment of in-game currency":
            return "Пополнение внутриигрового счета"
        case "games":
            return "Игры"
        case "software":
            return "Программное обеспечение"
        case "e-tickets":
            return "Электронные билеты"
        case "virtual gifts":
            return "Виртуальные подарки"
        default:
            return s
    }
}

export function translateProductState(s: string) {
    switch (s.toLowerCase()) {
        case "unavailable without price":
            return "Недоступен, без цены"
        case "active":
            return "Активен"
        case "deleted":
            return "Удалён"
        case "unavailable with price":
            return "Недоступен, с ценой"
        case "invisible":
            return "Невиден"
        default:
            return s
    }
}

export function translateProductItem(s: string) {
    switch (s.toLowerCase()) {
        case "link":
            return "Ссылка"
        case "key/code":
            return "Ключ/Код"
        default:
            return s
    }
}

export function translateSort(s: string, b: boolean) {
    let res: string = ""
    if (b) {
        switch (s) {
            case "по типу": res = "type_name"
                break
            case "по подтипу": res = "subtype_name"
                break
            case "по названию продукта": res = "product_name"
                break
            case "по названию варианта": res = "variant_name"
                break
            case "по начальной стоимости": res = "price"
                break
            case "по итоговой стоимости": res = "final_price"
                break
            case "по скидке в деньгах": res = "discount_money"
                break
            case "по скидке в процентах": res = "discount_percent"
                break
            case "по текущему количеству": res = "quantity_current"
                break
        }
    } else {
        switch (s) {
            case "type_name": res = "по типу"
                break
            case "subtype_name": res = "по подтипу"
                break
            case "product_name": res = "по названию продукта"
                break
            case "variant_name": res = "по названию варианта"
                break
            case "price": res = "по начальной стоимости"
                break
            case "final_price": res = "по итоговой стоимости"
                break
            case "discount_money": res = "по скидке в деньгах"
                break
            case "discount_percent": res = "по скидке в процентах"
                break
            case "quantity_current": res = "по текущему количеству"
                break
        }
    }

    return res
}