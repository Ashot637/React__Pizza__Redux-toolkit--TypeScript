export type Pizza = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
};

export type SearchParams = {
    sort: string,
    category: number,
    following: string,
    currentPage: number,
    searchValue: string

}

export enum PizzaStatus {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
    WAITING = 'waiting'
}

export interface IPizzaSliceState {
    items: Pizza[],
    status: PizzaStatus
}