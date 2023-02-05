import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaList from "../components/pizzaList/PizzaList";
import Pagination from "../components/pagination/Pagination";

import { FC, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import qs from 'qs';
import { useNavigate } from "react-router-dom";
import { selectFilter } from "../redux/filters/selectors";
import { setCategoryId, setPage, setSortType } from "../redux/filters/slice";
import { Sort as SortingType } from "../redux/filters/types";
import { fetchPizzas } from "../redux/pizza/asyncActions";

const MainPage: FC = () => {
    const { categoryId, sortType, following, currentPage, searchValue } = useSelector(selectFilter);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const isMounted = useRef(false);
    const isSearch = useRef(false);

    const onRequest = (sort: string, category: number, following: string, currentPage: number, searchValue: string) => {
        dispatch(fetchPizzas({ sort, category, following, currentPage, searchValue }));
    };

    useEffect(() => {
        onRequest(
            sortType.name,
            categoryId,
            following,
            currentPage,
            searchValue
        )
    }, [categoryId, sortType, currentPage, following, searchValue])

    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortType: sortType.name,
    //             categoryId,
    //             currentPage,
    //             following,
    //         });

    //         navigate(`?${queryString}`);
    //     }
    //     isMounted.current = true;
    // }, [categoryId, sortType, currentPage, following]);

    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1));

    //         dispatch(
    //             setFilters({
    //                 ...params,
    //                 sortType
    //             })
    //         );
    //         isSearch.current = true;
    //     }
    // }, []);

    // useEffect(() => {
    //     if (!isSearch.current) {
    //         onRequest(
    //             sortType.name,
    //             categoryId,
    //             following,
    //             currentPage)
    //     }

    //     isSearch.current = false;
    // }, [categoryId, sortType, following, currentPage]);

    useEffect(() => {
        dispatch(setCategoryId(0))
    }, [searchValue])

    const onClickCategory = useCallback((i: number) => {
        dispatch(setCategoryId(i));
        dispatch(setPage(1))
    }, []);

    const onClickSort = useCallback((obj: SortingType) => {
        dispatch(setSortType(obj));
    }, []);

    return (
        <>
            <div className="filters">
                <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
                <Sort onClickSort={onClickSort} />
            </div>
            <h1>Все пиццы</h1>
            <PizzaList />
            <Pagination />
        </>
    )
}

export default MainPage;