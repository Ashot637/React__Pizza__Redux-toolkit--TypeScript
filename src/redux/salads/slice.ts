import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../components/saladsList/SaladsList";
import { IItemsSliceState } from "../drinks/types";
import { PizzaStatus } from "../pizza/types";
import { fetchSalads } from "./asyncActions";

const initialState: IItemsSliceState = {
    items: [],
    status: PizzaStatus.WAITING
}

const saladsSlice = createSlice({
    name: 'salads',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSalads.pending, (state) => {
            state.status = PizzaStatus.LOADING;
            state.items = [];
        });

        builder.addCase(fetchSalads.fulfilled, (state, action: PayloadAction<IItem[]>) => {
            state.items = action.payload;
            state.status = PizzaStatus.SUCCESS;
        });

        builder.addCase(fetchSalads.rejected, (state) => {
            state.status = PizzaStatus.ERROR;
            state.items = [];
        })
    }
});

export default saladsSlice.reducer;