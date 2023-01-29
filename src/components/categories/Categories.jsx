import './categories.scss';

const Categories = ({ categoryId, onClickCategory }) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            {
                categories.map((category, i) => {
                    return (
                        <div className={`category ${categoryId === i ? 'active' : null}`}
                            onClick={() => onClickCategory(i)}
                            key={i}>{category}</div>
                    )
                })
            }
        </div>
    )
}

export default Categories;