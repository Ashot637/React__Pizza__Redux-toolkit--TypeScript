import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
    currentPage: 1
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        setFollowing(state, action) {
            state.following = action.payload;
        },
        setPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.following = action.payload.following;
            state.sortType = action.payload.sortType;
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage)
        }
    }
})

export default filtersSlice.reducer;

export const {
    setCategoryId,
    setSortType,
    setFollowing,
    setPage,
    setFilters
} = filtersSlice.actions;