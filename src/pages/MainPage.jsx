import AppHeader from "../components/appHeader/AppHeader";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaList from "../components/pizzaList/PizzaList";
import Pagination from "../components/pagination/Pagination";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setSortType, selectFilter } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
// import qs from 'qs';
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "../context/context";

const MainPage = () => {
    const { categoryId, sortType, following, currentPage, searchValue } = useSelector(selectFilter);
    const dispatch = useDispatch();

    // const navigate = useNavigate();
    // const isMounted = useRef(false);
    // const isSearch = useRef(false);

    const onRequest = (sort, category, following, currentPage) => {
        dispatch(fetchPizzas({ sort, category, following, currentPage }));
    };

    useEffect(() => {
        onRequest(
            sortType.name,
            categoryId,
            following,
            currentPage
        )
    }, [categoryId, sortType, currentPage, following])
    // navigate
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
    //             }),
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

    const onClickCategory = (i) => {
        dispatch(setCategoryId(i));
    };

    const onClickSort = (obj) => {
        dispatch(setSortType(obj));
    }

    return (
        <>
            <AppHeader />
            <div className="filters">
                <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
                <Sort onClickSort={onClickSort} following={following} />
            </div>
            <h1>Все пиццы</h1>
            <PizzaList />
            <Pagination />
        </>
    )
}

export default MainPage;