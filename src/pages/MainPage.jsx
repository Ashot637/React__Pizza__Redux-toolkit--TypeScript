import AppHeader from "../components/appHeader/AppHeader";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaList from "../components/pizzaList/PizzaList";
import Skeleton from "../components/skeleton/Skeleton";
import PizzaItem from "../components/pizzaItem/PizzaItem";
import Pagination from "../components/pagination/Pagination";

import { useState, useEffect, useRef } from "react";
import { useHttp } from "../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setSortType, setFilters } from "../redux/slices/filterSlice";
import qs from 'qs';
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const { categoryId, sortType, following, currentPage } = useSelector(store => store.filter);
    const dispatch = useDispatch();
    const [pizzas, setPizzas] = useState([]);
    const { request, process } = useHttp();
    const navigate = useNavigate();
    const isMounted = useRef(false);
    const isSearch = useRef(false);

    const setContent = (process) => {
        switch (process) {
            case 'loading':
                return (
                    <div className="pizza__list">
                        <Skeleton />
                    </div>
                )
            case 'error':
                return <h3>Error</h3>
            case 'idle':
                return (
                    <div className="pizza__list">
                        {pizzas.map(pizza =>
                            <PizzaItem
                                key={pizza.id}
                                id={pizza.id}
                                title={pizza.title}
                                img={pizza.imageUrl}
                                typesInd={pizza.types}
                                sizes={pizza.sizes}
                                price={pizza.price} />
                        )}
                    </div>
                )
            default: return;
        }
    }


    const onRequest = (sort, category, following, currentPage) => {
        request(`https://63d25b1706556a0fdd3a1121.mockapi.io/pizzas?page=${currentPage}&limit=4&sortBy=${sort}&order=${following}&category=${category || ''}`)
            .then(setPizzas);
    };

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortType: sortType.name,
                categoryId,
                currentPage,
                following,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortType, currentPage, following]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));


            dispatch(
                setFilters({
                    ...params,
                    sortType
                }),
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        if (!isSearch.current) {
            onRequest(
                sortType.name,
                categoryId,
                following,
                currentPage)
        }

        isSearch.current = false;
    }, [categoryId, sortType, following, currentPage]);

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
            <PizzaList Content={() => setContent(process)} />
            <Pagination />
        </>
    )
}

export default MainPage;