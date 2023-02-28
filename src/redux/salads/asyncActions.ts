import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IItem } from "../../components/saladsList/SaladsList";
import { SearchParams } from "../pizza/types";

export const fetchSalads = createAsyncThunk<IItem[], SearchParams>('drinks/fetchSaladsStatus', async (params, thunkAPI) => {
    const { category, currentPage, searchValue, sort, following } = params;
    const { data } = await axios.get<IItem[]>(`https://63fcdaed677c415873155e6e.mockapi.io/salads?page=${currentPage}&limit=4&${searchValue ? 'title=' + searchValue : 'search'}&sortBy=${sort}&order=${following}&category=${category || ''}`);

    if (!data.length) {
        return thunkAPI.rejectWithValue('Empty Drinks');
    }
    return data;
})