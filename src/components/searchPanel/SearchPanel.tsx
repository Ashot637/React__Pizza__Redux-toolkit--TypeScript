import './searchPanel.scss';
import { debounce } from "debounce";
import { useCallback, useState, useRef, FC, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setSearchValue } from '../../redux/filters/slice';
import { selectFilter } from '../../redux/filters/selectors';
import { useLocation } from 'react-router-dom';

const SearchPanel: FC = () => {
    const [value, setValue] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const inpupRef = useRef<HTMLInputElement>(null);
    const { searchValue } = useSelector(selectFilter);

    useEffect(() => {
        if (!searchValue) {
            setValue('')
        }
    }, [searchValue])

    useEffect(() => {
        switch (location.pathname) {
            case '/drinks':
                setPlaceholder('напитка');
                break;
            case '/burgers':
                setPlaceholder('бургера');
                break;
            case '/salads':
                setPlaceholder('салата');
                break;
            default:
                setPlaceholder('пиццы');
        }
    }, [location])

    //eslint-disable-next-line
    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
            dispatch(setCategoryId(0))
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
            <input type="text" placeholder={`Поиск ${placeholder}...`} className="search__panel"
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