import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterSliceState, Sort } from "./types";

const initialState: IFilterSliceState = {
    categoryId: 0,
    sortType: {
        label: 'популярности',
        name: 'rating'
    },
    sortList: [
        {
            label: 'популярности',
            name: 'rating'
        },
        {
            label: 'цене',
            name: 'price'
        },
        {
            label: 'алфавиту',
            name: 'title'
        }
    ],
    following: 'desc',
    followingList: ['desc', 'asc'],
    currentPage: 1,
    searchValue: '',
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSortType(state, action: PayloadAction<Sort>) {
            state.sortType = action.payload;
        },
        setFollowing(state, action: PayloadAction<string>) {
            state.following = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<IFilterSliceState>) {
            state.following = action.payload.following;
            state.sortType = action.payload.sortType;
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage)
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        }
    }
})


export const {
    setCategoryId,
    setSortType,
    setFollowing,
    setPage,
    setFilters,
    setSearchValue
} = filtersSlice.actions;

export default filtersSlice.reducer;