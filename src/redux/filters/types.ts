export type Sort = {
    label: string,
    name: 'rating' | 'price' | 'title'
}

export type FollowingType = 'desc' | 'asc';

export interface IFilterSliceState {
    categoryId: number,
    sortType: Sort,
    sortList: Sort[],
    following: FollowingType,
    followingList: string[],
    currentPage: number,
    searchValue: string
}