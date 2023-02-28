import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../components/saladsList/SaladsList";
import { PizzaStatus } from "../pizza/types";
import { fetchDrinks } from "./asyncActions";
import { IItemsSliceState } from "./types";

const initialState: IItemsSliceState = {
    items: [],
    status: PizzaStatus.WAITING
}

const drinksSlice = createSlice({
    name: 'drinks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDrinks.pending, (state) => {
            state.status = PizzaStatus.LOADING;
            state.items = [];
        });

        builder.addCase(fetchDrinks.fulfilled, (state, action: PayloadAction<IItem[]>) => {
            state.items = action.payload;
            state.status = PizzaStatus.SUCCESS;
        });

        builder.addCase(fetchDrinks.rejected, (state) => {
            state.status = PizzaStatus.ERROR;
            state.items = [];
        })
    }
});

export default drinksSlice.reducer;