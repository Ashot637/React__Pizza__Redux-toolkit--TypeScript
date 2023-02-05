import PizzaItem from "../pizzaItem/PizzaItem";
import Skeleton from "../skeleton/Skeleton";
import NotFoundLayout from "../../layouts/NotFoundLayout";
import { useSelector } from "react-redux";
import { FC } from "react";
import { selectPizza } from "../../redux/pizza/selectors";

interface IPizza {
    id: number,
    title: string,
    imageUrl: string,
    types: number[],
    sizes: number[],
    price: number
}

const PizzaList: FC = () => {
    const { items, status } = useSelector(selectPizza);

    const setContent = (status: string) => {
        switch (status) {
            case 'loading':
                return <Skeleton />;
            case 'success':
                return (
                    items.map((pizza: IPizza) =>
                        <PizzaItem
                            key={pizza.id}
                            id={pizza.id}
                            title={pizza.title}
                            img={pizza.imageUrl}
                            typesInd={pizza.types}
                            sizes={pizza.sizes}
                            price={pizza.price} />
                    )
                );
            default: return;
        }
    }

    return (
        <>
            {
                status === 'error' ? < NotFoundLayout />
                    :
                    <div className="pizza__list">{setContent(status)}</div>
            }
        </>
    )
}

export default PizzaList;