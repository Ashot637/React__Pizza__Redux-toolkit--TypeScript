import './../pizzaItem/pizzaItem.scss';
import './skeleton.scss';

const Skeleton = () => {
    return (
        <>
            <View />
            <View />
            <View />
            <View />
        </>
    )
}

const View = () => {
    return (
        <div className="pizza skeleton__pizza">
            <div className="skeleton__pizza-img"></div>
            <div className="skeleton__pizza-title"></div>
            <div className="skeleton__pizza-params"></div>
            <div className="skeleton__pizza-order">
                <div className="skeleton__pizza-price"></div>
                <div className="skeleton__pizza-btn"></div>
            </div>
        </div>
    )
}

export default Skeleton;