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