import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import './../pizzaItem/pizzaItem.scss';
import './skeleton.scss';

const Skeleton: FC = () => {
    return (
        <>
            <View />
            <View />
            <View />
            <View />
        </>
    )
}

const View: FC = () => {
    const location = useLocation()

    return (
        <div className="pizza skeleton__pizza">
            <div className="skeleton__pizza-img"></div>
            <div className="skeleton__pizza-title"></div>
            <div className="skeleton__pizza-params" style={location.pathname !== '/' ? { height: 50 } : undefined}></div>
            <div className="skeleton__pizza-order">
                <div className="skeleton__pizza-price"></div>
                <div className="skeleton__pizza-btn"></div>
            </div>
        </div>
    )
}

export default Skeleton;