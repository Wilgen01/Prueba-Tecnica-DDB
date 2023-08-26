export interface Beer {
    id:          number;
    name:        string;
    description: string;
    img:         string;
    price:       number;
    category:    BeerCategory;
}

export enum BeerCategory {
    Morena = "morena",
    Roja = "roja",
    Rubia = "rubia",
}