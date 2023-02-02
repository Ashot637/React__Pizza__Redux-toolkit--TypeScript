import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
    const { sort, category, following, currentPage } = params;
    const { data } = await axios.get(`https://63d25b1706556a0fdd3a1121.mockapi.io/pizzas?page=${currentPage}&limit=4&sortBy=${sort}&order=${following}&category=${category || ''}`);

    if (!data.length) {
        return thunkAPI.rejectWithValue('Empty Pizzas');
    }
    return data;
})

const initialState = {
    items: [],
    status: ''
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    }
})

export const selectPizza = state => state.pizza;

export const {
    setItems,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;