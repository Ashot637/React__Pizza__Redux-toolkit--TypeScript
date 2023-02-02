import './cart.scss';
import emptyCart from '../../img/empty-cart.png';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, removeAllItems } from '../../redux/slices/cartSlice';
import CartItem from '../cartItem/CartItem';

const Cart = () => {
    const { totalPrice, items } = useSelector(selectCart);
    const dispatch = useDispatch();

    const totalCount = items ? items.reduce((sum, item) => sum + item.count, 0) : 0;

    if (!items.length) {
        return <CartEmpty />
    }

    const onClearCart = () => {
        dispatch(removeAllItems())
    }

    return (
        <div className="cart">
            <div className="cart__top">
                <div className="cart__title">
                    <span className="material-symbols-outlined">
                        shopping_cart
                    </span>
                    <h2>Корзина</h2>
                </div>
                <div className="cart__clear" onClick={onClearCart}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                    Очистить корзину
                </div>
            </div>
            <div className="cart__items">
                {
                    items.map(item => {
                        return (
                            <CartItem key={item.id} item={item} />
                        )
                    })
                }
            </div>
            <div className="cart__bottom">
                <span>Всего пицц: <b>{totalCount} шт.</b></span>
                <span>Сумма заказа: <b style={{ color: '#FE5F1E' }}>{totalPrice} ₽</b></span>
            </div>
            <div className="cart__btns">
                <Link to={'/'}>
                    <button className="btn">
                        Вернуться назад
                    </button>
                </Link>
                <button className="btn">
                    Оплатить сейчас
                </button>
            </div>
        </div>
    )
}


const CartEmpty = () => {
    return (
        <div className="cart">
            <div className="empty__cart">
                <div className="empty__cart-title">Корзина пустая 😕</div>
                <div className="empty__cart-subtitle">Вероятней всего, вы не заказывали ещё пиццу.
                    <br />
                    Для того, чтобы заказать пиццу, перейди на главную страницу.</div>
                <img src={emptyCart} alt="" className="empty__cart-img" />
                <Link to={'/'} >
                    <button className="empty__cart-btn">Вернуться назад</button>
                </Link>
            </div>
        </div>

    )
}

export default Cart;