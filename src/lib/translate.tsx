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