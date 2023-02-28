export type ComparingItem = {
    id: number,
    price: number
}

export type CartItem = {
    id: number,
    img: string,
    title: string,
    type?: string,
    size: number,
    price: number,
    count: number
}

export interface ICartSliceState {
    items: CartItem[],
    totalPrice: number
}
