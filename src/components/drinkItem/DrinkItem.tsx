import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectCartItemById } from "../../redux/cart/selectors";
import { addItem } from "../../redux/cart/slice";
import { CartItem } from "../../redux/cart/types";
import { useAppDispatch } from "../../redux/store";

interface IDrinkItemProps {
    id: number,
    title: string,
    img: string,
    sizes: number[],
    price: number
}

const DrinkItem: FC<IDrinkItemProps> = ({ id, title, img, sizes, price }) => {
    const [selectedSize, setSelectedSize] = useState(0);
    const [itemPrice, setItemPrice] = useState(price);
    const cartItems = useSelector(selectCartItemById(id));
    const addedCount = cartItems ? cartItems.reduce((sum: number, item: CartItem) => sum + item.count, 0) : 0;
    const dispatch = useAppDispatch();

    useEffect(() => {
        setItemPrice(price)
        const additionalSum = selectedSize * 0.5 * 60;
        setItemPrice((price: number) => Math.floor(price + additionalSum))
        // eslint-disable-next-line
    }, [selectedSize])

    const onAddDrink = () => {
        const item = {
            id,
            title,
            img,
            price: itemPrice,
            size: sizes[selectedSize],
            count: 0
        }

        dispatch(addItem(item));
    }

    const onChangeSize = (i: number) => {
        setSelectedSize(i)
    }

    return (
        <div className="item__block">
            <img src={img} alt="" className="item__block__img" style={{ marginBottom: 10 }} />
            <div className="item__block__title">{title}</div>
            <div className="item__block__params">
                <div className="item__block__sizes">
                    {
                        sizes.map((size: number, i: number) => {
                            return (
                                <div key={i}
                                    className={`item__block__size ${selectedSize === i ? 'active' : null}`}
                                    onClick={() => onChangeSize(i)}>{size} л.</div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="item__block__order">
                <div className="item__block__price">
                    от {itemPrice} ₽
                </div>
                <button className="item__block__order-btn" onClick={onAddDrink}>
                    <span>+</span>
                    Добавить
                    {
                        addedCount > 0 && <div className='item__block__order-count'>{addedCount}</div>
                    }
                </button>
            </div>
        </div>
    )
}

export default DrinkItem;