import './cart.scss';
import emptyCart from '../../img/empty-cart.png';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../redux/slices/cartSlice';

const Cart = () => {
    const { totalPrice, items } = useSelector(store => store.cart);

    const totalCount = items ? items.reduce((sum, item) => sum + item.count, 0) : 0;

    if (!items.length) {
        return <CartEmpty />
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
                <div className="cart__clear">
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                    Очистить корзину
                </div>
            </div>
            <div className="cart__items">
                <CartItems />
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

const CartItems = () => {
    const { items } = useSelector(store => store.cart);
    const dispatch = useDispatch();


    return (
        <>
            {
                items.map(item => {
                    return (
                        <div className="cart__item" key={Math.round(Math.random() * 100000)}>
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
                })
            }
        </>
    )
}

export default Cart;