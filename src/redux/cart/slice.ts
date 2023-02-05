import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItem, ComparingItem, ICartSliceState } from "./types";

const getCart = getCartFromLS();

const initialState: ICartSliceState = {
    items: getCart.items,
    totalPrice: getCart.totalPrice
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(item => item.price === action.payload.price && item.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }

            state.totalPrice = state.items.reduce((sum, item) => {
                return item.count * item.price + sum;
            }, 0)
        },
        minusItem(state, action: PayloadAction<ComparingItem>) {
            const findItem = state.items.find(item => item.price === action.payload.price && item.id === action.payload.id);

            if (findItem && findItem.count > 1) {
                findItem.count--
            }

            state.totalPrice = state.items.reduce((sum, item) => {
                return item.count * item.price + sum;
            }, 0)
        },
        removeItem(state, action: PayloadAction<ComparingItem>) {
            state.items = state.items.filter(item => item.price !== action.payload.price || item.id !== action.payload.id);
            state.totalPrice = state.items.reduce((sum, item) => {
                return item.count * item.price + sum;
            }, 0);
        },
        removeAllItems(state) {
            state.items = [];
            state.totalPrice = state.items.reduce((sum, item) => {
                return item.count * item.price + sum;
            }, 0);
        }
    }
})

export const {
    addItem,
    minusItem,
    removeItem,
    removeAllItems
} = cartSlice.actions;

export default cartSlice.reducer;