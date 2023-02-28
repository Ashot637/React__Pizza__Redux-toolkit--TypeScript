import { FC } from "react"
import { useSelector } from "react-redux";
import NotFoundLayout from "../../layouts/NotFoundLayout";
import { selectDrinks } from "../../redux/drinks/selector";
import DrinkItem from "../drinkItem/DrinkItem";
import '../pizzaItem/pizzaItem.scss';
import { IItem } from "../saladsList/SaladsList";
import Skeleton from "../skeleton/Skeleton";

const DrinksList: FC = () => {
    const { items, status } = useSelector(selectDrinks)

    const setContent = (status: string) => {
        switch (status) {
            case 'loading':
                return <Skeleton />;
            case 'success':
                return (
                    items.map((drink: IItem) =>
                        <DrinkItem
                            key={drink.id}
                            id={drink.id}
                            title={drink.title}
                            img={drink.imageUrl}
                            sizes={drink.sizes}
                            price={drink.price} />
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

export default DrinksList;

// [
//     {
//       "id": 0,
//       "imageUrl": "https://s3.amazonaws.com/media.justsalad.com/assets/OJS_IMG_Winter22_Winter-Harvest.png",
//       "title": "Зимний урожай",
//       "sizes": [
//         150,
//         250
//       ],
//       "price": 49,
//       "category": 1
//     },
//     {
//       "id": 1,
//       "imageUrl": "https://s3.amazonaws.com/media.justsalad.com/assets/OJS_IMG_Winter22_Maple-Crispy-Chicken.png",
//       "title": "Кленовый цыпленок",
//       "sizes": [
//         150,
//         250
//       ],
//       "price": 49,
//       "category": 1
//     },
//   {
//       "id": 2,
//       "imageUrl": "https://s3.amazonaws.com/media.justsalad.com/assets/OJS_IMG_MAR22_Tokyo-Supergreens-Chicken.png",
//       "title": "Калифорния Кобб",
//       "sizes": [
//         150,
//         250
//       ],
//       "price": 70,
//       "category": 2
//     },
//     {
//       "id": 3,
//       "imageUrl": "https://s3.amazonaws.com/media.justsalad.com/assets/Health_Tribes_Menu_Vegan_Tokyo_Supergreens.png",
//       "title": "Токио Супергрин",
//       "sizes": [
//         150,
//         250
//       ],
//       "price": 49,
//       "category": 1
//     },
//     {
//       "id": 4,
//       "imageUrl": "https://s3.amazonaws.com/media.justsalad.com/assets/OJS_IMG_MAR22_Crispy_Chicken_Poblano.png",
//       "title": "Поблано цыпленок",
//       "sizes": [
//         150,
//         250
//       ],
//       "price": 49,
//       "category": 1
//     },
    
//     {
//       "id": 5,
//       "imageUrl": "https://s3.amazonaws.com/media.justsalad.com/assets/OJS_IMG_MAR22_Thai_Chicken_Crunch.png",
//       "title": "Чаша Земли",
//       "sizes": [
//         150,
//         250
//       ],
//       "price": 80,
//       "category": 2
//     },
//     {
//       "id": 6,
//       "imageUrl": "https://s3.amazonaws.com/media.justsalad.com/assets/Salad_California_Cobb.png",
//       "title": "Мощность растения",
//       "sizes": [
//         150,
//         250
//       ],
//       "price": 119,
//       "category": 2
//     },
//     {
//       "id": 7,
//       "imageUrl": "https://s3.amazonaws.com/media.justsalad.com/assets/OJS_IMG_MAR22_Chicken_Caesar.png",
//       "title": "Сладкая долина",
//       "sizes": [
//         150,
//         250
//       ],
//       "price": 109,
//       "category": 2
//     },
//     {
//       "id": 8,
//       "imageUrl": "https://s3.amazonaws.com/media.justsalad.com/assets/OJS_IMG_MAR22_Buffalo_Chicken.png",
//       "title": "Греческий хруст",
//       "sizes": [
//         150,
//         250
//       ],
//       "price": 109,
//       "category": 2
//     },
//     {
//       "id": 9,
//       "imageUrl": "https://s3.amazonaws.com/media.justsalad.com/assets/OJS_IMG_SEPT22-Chipotle-Cowboy.png",
//       "title": "Куриный Пита",
//       "sizes": [
//         150,
//         250
//       ],
//       "price": 109,
//       "category": 1
//     }
//   ]