import { useState, useEffect } from 'react';
import { getToken } from '../../../apis/auth';
import { listStoresByUser } from '../../../apis/store';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import ShopCard from '../item/ShopCard';
import Pagination from '../../ui/Pagination';
import SearchInput from '../../ui/SearchInput';

const ShopsCollection = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [listShops, setListShops] = useState([]);
    const [pagination, setPagination] = useState({});
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'point',
        order: 'desc',
        limit: '8',
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setSuccess('');
        setIsLoading(true);
        listStoresByUser(_id, accessToken, filter)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    setListShops(data.stores);
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });
                    setIsLoading(false);
                    setSuccess(true);
                }
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        init();
    }, [filter]);

    const handleChangeKeyword = (keyword) => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    }

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    }

    return (
        <div className="shops-collection-wrap row position-relative">
            {isloading && <Loading />}

            <div className="col mb-2">
                <SearchInput onChange={handleChangeKeyword} />
            </div>

            {error && <Error msg={error} />}
            {success && <h4 className='mb-3'>{`Your shops: ${pagination.size}`}</h4>}
            {listShops && listShops.map((store, index) => (
                <div className="col-3 mb-4" key={index}>
                    <ShopCard store={store} userId={_id} />
                </div>
            ))}

            {pagination.size != 0 && <Pagination pagination={pagination} onChangePage={handleChangePage} />}
        </div>
    );

}

export default ShopsCollection;