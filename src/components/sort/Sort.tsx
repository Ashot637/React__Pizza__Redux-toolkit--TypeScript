import { useState, useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchPanel from '../searchPanel/SearchPanel';
import { FC } from 'react';
import './sort.scss';
import { selectFilter } from '../../redux/filters/selectors';
import { setFollowing } from '../../redux/filters/slice';
import { Sort as SortingType } from '../../redux/filters/types';

interface ISortProps {
    onClickSort: (item: SortingType) => void;
}

const Sort: FC<ISortProps> = memo(({ onClickSort }) => {
    const dispatch = useDispatch();
    const { sortType, sortList, following } = useSelector(selectFilter);
    const [open, setOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const onChangeFollowing = (following: string) => {
        following === 'desc' ?
            dispatch(setFollowing('asc')) :
            dispatch(setFollowing('desc'));
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            let path = sortRef.current && event.composedPath().includes(sortRef.current);
            if (!path) setOpen(false);
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="sort__flex">
            <div className="sort" ref={sortRef}>
                <div className="sort__label">
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => onChangeFollowing(following)}
                        style={following === 'desc' ? { transform: 'rotateX(180deg)' } : { transform: 'rotateX(0deg)' }}
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                    <b onClick={() => setOpen(open => !open)}>Сортировка по:</b>
                    <span onClick={() => setOpen(open => !open)}>{sortType.label}</span>
                </div>
                {
                    open &&
                    <div className="sort__popup" >
                        <ul>
                            {
                                sortList.map((item: SortingType, i: number) => {
                                    return (
                                        <li key={i}
                                            className={sortType.name === item.name ? 'active' : ''}
                                            onClick={() => {
                                                onClickSort(item)
                                                setOpen(open => !open)
                                            }}>{item.label}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
            </div >
            <div className="display__block">
                <SearchPanel />
            </div>
        </div>
    )
})

export default Sort;