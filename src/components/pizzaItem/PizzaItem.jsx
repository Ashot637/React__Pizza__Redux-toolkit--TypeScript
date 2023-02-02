import './pizzaItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '../../redux/slices/cartSlice';
import { useState } from 'react';


const types = ['тонкое', 'традиционное'];

const PizzaItem = ({ id, img, title, typesInd, sizes, price }) => {
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedType, setSelectedType] = useState(0);
    const cartItem = useSelector(selectCartItemById(id));
    const addedCount = cartItem ? cartItem.count : 0;
    const dispatch = useDispatch();

    const onAddPizza = () => {
        const item = {
            id,
            title,
            img,
            price,
            size: sizes[selectedSize],
            type: types[selectedType]
        }

        dispatch(addItem(item));
    }

    const onChangeSize = (i) => {
        setSelectedSize(i);
    }

    const onChangeType = (i) => {
        setSelectedType(i);
    }

    return (
        <div className="pizza">
            <img src={img} className="pizza__img" alt='pizza' />
            <div className="pizza__title">{title}</div>
            <div className="pizza__params">
                <div className="pizza__doughs">
                    {
                        typesInd.map((ind, i) => {
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
                        sizes.map((size, i) => {
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
                    от {price} ₽
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