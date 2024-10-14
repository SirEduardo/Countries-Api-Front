interface Currencies {
    code: string
    name: string
    symbol: string
}

interface Languages {
    name: string
    nativeName: string
}

export interface Country {
    id: string
    name: string
    alpha3Code: string
    population: number
    region: string
    capital: string
    flag: string
    nativeName: string
    subregion: string
    topLevelDomain: string
    currencies: Currencies[]
    languages: Languages[]
    borders?: string[]
}