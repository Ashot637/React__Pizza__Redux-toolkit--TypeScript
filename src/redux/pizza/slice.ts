import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { IPizzaSliceState, Pizza, PizzaStatus } from "./types";

const initialState: IPizzaSliceState = {
    items: [],
    status: PizzaStatus.WAITING
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = PizzaStatus.LOADING;
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = PizzaStatus.SUCCESS;
        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = PizzaStatus.ERROR;
            state.items = [];
        })
    }
})


export const {
    setItems,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;