import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchParams>('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
    const { sort, category, following, currentPage, searchValue } = params;
    const { data } = await axios.get<Pizza[]>(`https://63d25b1706556a0fdd3a1121.mockapi.io/pizzas?page=${currentPage}&limit=4&${searchValue ? 'title=' + searchValue : 'search'}&sortBy=${sort}&order=${following}&category=${category || ''}`);

    if (!data.length) {
        return thunkAPI.rejectWithValue('Empty Pizzas');
    }
    return data;
})