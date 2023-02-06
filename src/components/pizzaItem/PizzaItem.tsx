import './pizzaItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, FC } from 'react';
import { selectCartItemById } from '../../redux/cart/selectors';
import { addItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/types';

interface IPizzaItemProps {
    id: number,
    img: string,
    title: string,
    typesInd: number[],
    sizes: number[],
    price: number
}

const types = ['тонкое', 'традиционное'];

const PizzaItem: FC<IPizzaItemProps> = ({ id, img, title, typesInd, sizes, price }) => {
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedType, setSelectedType] = useState(0);
    const [itemPrice, setItemPrice] = useState(price);
    const cartItems = useSelector(selectCartItemById(id));
    const addedCount = cartItems ? cartItems.reduce((sum: number, item: CartItem) => sum + item.count, 0) : 0;
    const dispatch = useDispatch();

    const onAddPizza = () => {
        const item = {
            id,
            title,
            img,
            price: itemPrice,
            size: sizes[selectedSize],
            type: types[selectedType],
            count: 0
        }

        dispatch(addItem(item));
    }

    const onChangeSize = (i: number) => {
        setSelectedSize(i);
    }

    const onChangeType = (i: number) => {
        setSelectedType(i);
    }

    useEffect(() => {
        setItemPrice(price)
        const additionalSum = selectedSize * 60 + selectedType * 80;
        setItemPrice((price: number) => Math.floor(price + additionalSum))
    }, [selectedSize, selectedType, price])

    return (
        <div className="pizza">
            <img src={img} className="pizza__img" alt='pizza' />
            <div className="pizza__title">{title}</div>
            <div className="pizza__params">
                <div className="pizza__doughs">
                    {
                        typesInd.map((ind: number, i: number) => {
                            return (
                                <div key={i}
                                    className={`pizza__dough ${selectedType === i ? 'active' : null}`}
                                    onClick={() => onChangeType(i)}>{types[ind]}</div>
                            )
                        })
                    }
                </div>
                <div className="pizza__sizes">
                    {
                        sizes.map((size: number, i: number) => {
                            return (
                                <div key={i}
                                    className={`pizza__size ${selectedSize === i ? 'active' : null}`}
                                    onClick={() => onChangeSize(i)}>{size} см.</div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="pizza__order">
                <div className="pizza__price">
                    от {itemPrice} ₽
                </div>
                <button onClick={onAddPizza} className="pizza__order-btn">
                    <span>+</span>
                    Добавить
                    {
                        addedCount > 0 && <div className='pizza__order-count'>{addedCount}</div>
                    }
                </button>
            </div>
        </div>
    )
}

export default PizzaItem;