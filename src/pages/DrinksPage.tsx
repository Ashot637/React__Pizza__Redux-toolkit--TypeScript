import { FC, useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import Categories from '../components/categories/Categories';
import DrinksList from '../components/drinksList/DrinksList';
import Pagination from '../components/pagination/Pagination';
import { fetchDrinks } from '../redux/drinks/asyncActions';
import { selectFilter } from '../redux/filters/selectors';
import { setCategoryId, setPage, setSearchValue, setSortType } from '../redux/filters/slice';
import { useAppDispatch } from '../redux/store';
import Sort from '../components/sort/Sort';
import { Sort as SortingType } from "../redux/filters/types";

const categories = ['Все', 'Газированные', 'Алкагольные', 'Фрутковые']

const DrinksPage: FC = () => {
    const dispatch = useAppDispatch();
    const { categoryId, currentPage, searchValue, sortType, following } = useSelector(selectFilter);
    const isMounted = useRef(false)

    const onRequest = (category: number, currentPage: number, searchValue: string, sort: string, following: string) => {
        dispatch(fetchDrinks({ category, currentPage, searchValue, sort, following }))
    }

    useEffect(() => {
        dispatch(setCategoryId(0))
        dispatch(setPage(1))
        dispatch(setSearchValue(''))
        onRequest(0, 1, '', sortType.name, following);
        // eslint-disable-next-line
    }, [])



    useEffect(() => {
        if (isMounted.current) {
            onRequest(categoryId, currentPage, searchValue, sortType.name, following)
        }
        isMounted.current = true;
        // eslint-disable-next-line
    }, [categoryId, currentPage, searchValue, sortType, following])

    const onClickCategory = useCallback((i: number) => {
        dispatch(setCategoryId(i))
        dispatch(setPage(1))
        //eslint-disable-next-line
    }, []);

    const onClickSort = useCallback((obj: SortingType) => {
        dispatch(setSortType(obj));
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="filters">
                <Categories categoryId={categoryId} onClickCategory={onClickCategory} categories={categories} />
                <Sort onClickSort={onClickSort} />
            </div>
            <h1>Все напитки</h1>
            <DrinksList />
            <Pagination />
        </>
    )
}

export default DrinksPage;
