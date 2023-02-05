import { FC, memo } from 'react';
import './categories.scss';

interface ICategoriesProps {
    categoryId: number,
    onClickCategory: (i: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: FC<ICategoriesProps> = memo(({ categoryId, onClickCategory }) => {

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
})

export default Categories;