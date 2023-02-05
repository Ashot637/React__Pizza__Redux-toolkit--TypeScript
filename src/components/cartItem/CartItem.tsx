import { FC } from "react";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../../redux/cart/slice";
import { ComparingItem, CartItem as CartItemType } from "../../redux/cart/types";


interface ICartItemProps {
    item: CartItemType
}

const CartItem: FC<ICartItemProps> = ({ item }) => {
    const dispatch = useDispatch();

    const removingItem: ComparingItem = {
        id: item.id,
        price: item.price
    }

    return (
        <div className="cart__item">
            <div className="cart__item-left">
                <img src={item.img} alt="" className="cart__item-img" />
                <div className="cart__item-info">
                    <div className="cart__item-title">{item.title}</div>
                    <div className="cart__item-subtitle">{item.type}, {item.size}см.</div>
                </div>
            </div>
            <div className="cart__item-right">
                <div className="cart__item-counter">
                    <button
                        disabled={item.count === 1}
                        className="cart__item-btn"
                        onClick={() => dispatch(minusItem(item))}>
                        <span className="material-symbols-outlined">
                            remove
                        </span>
                    </button>
                    <span className="cart__item-count">{item.count}</span>
                    <button className="cart__item-btn" onClick={() => dispatch(addItem(item))}>
                        <span className="material-symbols-outlined">
                            add
                        </span>
                    </button>
                </div>
                <div className="cart__item-price">{item.price} ₽</div>
                <button className="cart__item-btn remove" onClick={() => dispatch(removeItem(removingItem))}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            </div>
        </div>
    )
}

export default CartItem;