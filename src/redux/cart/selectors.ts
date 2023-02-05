import { RootType } from "../store";

export const selectCart = (state: RootType) => state.cart;
export const selectCartItemById = (id: number) => (state: RootType) => state.cart.items.filter(item => item.id === id);