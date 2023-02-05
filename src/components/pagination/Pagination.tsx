import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filters/selectors';
import { setPage } from '../../redux/filters/slice';
import './pagination.scss';

const Pagination: FC = () => {
    const dispatch = useDispatch();
    const { currentPage } = useSelector(selectFilter)

    return (
        <ReactPaginate
            className='pagination'
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => dispatch(setPage(e.selected + 1))}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            forcePage={currentPage - 1}

        />
    )
}

export default Pagination;