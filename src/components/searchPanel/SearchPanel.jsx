import './searchPanel.scss';
import { debounce } from "debounce";
import { useCallback, useState, useRef } from 'react';
import { setSearchValue } from '../../redux/slices/filterSlice';

const SearchPanel = () => {
    const [value, setValue] = useState('');
    const inpupRef = useRef();

    const updateSearchValue = useCallback(
        debounce(str => {
            setSearchValue(str);
        }, 750), []
    );

    const onChangeSearch = (e) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    };

    const onClearSearchValue = () => {
        setValue('');
        setSearchValue('');
        inpupRef.current.focus();
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