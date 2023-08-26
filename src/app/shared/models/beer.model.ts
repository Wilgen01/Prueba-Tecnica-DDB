export interface Beer {
    id:          number;
    name:        string;
    description: string;
    img:         string;
    price:       number;
    category:    BeerCategory;
}

export enum BeerCategory {
    Rubia = 1,
    Morena = 2,
    Roja = 3,
}