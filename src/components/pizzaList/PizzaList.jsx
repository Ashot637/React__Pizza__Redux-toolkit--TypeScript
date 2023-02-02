import PizzaItem from "../pizzaItem/PizzaItem";
import Skeleton from "../skeleton/Skeleton";
import NotFoundLayout from "../layouts/NotFoundLayout";
import { useSelector } from "react-redux";
import { selectPizza } from "../../redux/slices/pizzaSlice";

const PizzaList = () => {
    const { items, status } = useSelector(selectPizza);

    const setContent = (status) => {
        switch (status) {
            case 'loading':
                return <Skeleton />;
            case 'success':
                return (
                    items.map(pizza =>
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