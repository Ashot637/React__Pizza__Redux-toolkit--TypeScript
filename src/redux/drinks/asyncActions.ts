import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IItem } from "../../components/saladsList/SaladsList";
import { SearchParams } from "../pizza/types";

export const fetchDrinks = createAsyncThunk<IItem[], SearchParams>('drinks/fetchDrinksStatus', async (params, thunkAPI) => {
    const { category, currentPage, searchValue, sort, following } = params;
    const { data } = await axios.get<IItem[]>(`https://63d25b1706556a0fdd3a1121.mockapi.io/drinks?page=${currentPage}&limit=4&${searchValue ? 'title=' + searchValue : 'search'}&sortBy=${sort}&order=${following}&category=${category || ''}`);

    if (!data.length) {
        return thunkAPI.rejectWithValue('Empty Drinks');
    }
    return data;
})