import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setPage } from '../../redux/slices/filterSlice';
import './pagination.scss';

const Pagination = () => {
    const dispatch = useDispatch();

    return (
        <ReactPaginate
            className='pagination'
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => dispatch(setPage(e.selected + 1))}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />

    )
}

export default Pagination;