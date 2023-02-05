export type Sort = {
    label: string,
    name: 'rating' | 'price' | 'title'
}

export interface IFilterSliceState {
    categoryId: number,
    sortType: Sort,
    sortList: Sort[],
    following: string,
    followingList: string[],
    currentPage: number,
    searchValue: string
}