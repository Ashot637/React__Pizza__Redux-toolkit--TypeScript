import { FC, memo } from 'react';
import './categories.scss';

interface ICategoriesProps {
    categoryId: number,
    onClickCategory: (i: number) => void;
    categories: string[]
}

const Categories: FC<ICategoriesProps> = memo(({ categoryId, onClickCategory, categories }) => {

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