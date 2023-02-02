import { useDispatch } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

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
                    <button className="cart__item-btn">
                        <span className="material-symbols-outlined">
                            remove
                        </span>
                    </button>
                    <span className="cart__item-count">{item.count}</span>
                    <button className="cart__item-btn">
                        <span className="material-symbols-outlined">
                            add
                        </span>
                    </button>
                </div>
                <div className="cart__item-price">{item.price} ₽</div>
                <button className="cart__item-btn remove" onClick={() => dispatch(removeItem(item.id))}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
            </div>
        </div>
    )
}

export default CartItem;