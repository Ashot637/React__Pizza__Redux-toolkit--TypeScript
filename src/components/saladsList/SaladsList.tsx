import Skeleton from "../skeleton/Skeleton";
import NotFoundLayout from "../../layouts/NotFoundLayout";
import { useSelector } from "react-redux";
import SaladItem from "../saladItem/SaladItem";
import { selectSalads } from "../../redux/salads/selectors";
import { FC } from "react";

export interface IItem {
    id: number;
    title: string;
    imageUrl: string;
    sizes: number[];
    price: number;
}

const SaladsList: FC = () => {
    const { items, status } = useSelector(selectSalads);

    const setContent = (status: string) => {
        switch (status) {
            case 'loading':
                return <Skeleton />;
            case 'success':
                return (
                    items.map((salad: IItem) =>
                        <SaladItem
                            key={salad.id}
                            id={salad.id}
                            title={salad.title}
                            img={salad.imageUrl}
                            sizes={salad.sizes}
                            price={salad.price} />
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
                    <div className="items__list">{setContent(status)}</div>
            }
        </>
    )
}

export default SaladsList;