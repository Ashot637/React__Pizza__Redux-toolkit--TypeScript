import './searchPanel.scss';
import { debounce } from "debounce";
import { useCallback, useState, useRef, FC, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filters/slice';

const SearchPanel: FC = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const inpupRef = useRef<HTMLInputElement>(null);

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 750)
        , []);

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    };

    const onClearSearchValue = () => {
        setValue('');
        dispatch(setSearchValue(''));
        inpupRef.current?.focus();
    };

    return (
        <form action="" className="search">
            <span className="material-symbols-outlined">
                search
            </span>
            <input type="text" placeholder="Поиск пиццы..." className="search__panel"
                value={value}
                onChange={(e) => onChangeSearch(e)}
                ref={inpupRef}
            />
            <span className="material-symbols-outlined" onClick={onClearSearchValue} style={{ cursor: 'pointer' }}>
                close
            </span>
        </form>
    )
}

export default SearchPanel;