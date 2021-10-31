import { useState, useEffect } from 'react';
import { getToken } from '../../../apis/auth';
import { listStoresByUser } from '../../../apis/store';
import ShopCard from '../item/ShopCard';
import CreateShopButton from '../item/CreateShopButton';
import Pagination from '../../ui/Pagination';
import SearchInput from '../../ui/SearchInput';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

const ShopsCollection = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState(false);

    const [listShops, setListShops] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'rating',
        sortMoreBy: 'point',
        order: 'desc',
        limit: '4',
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
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
                }
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        init();
    }, [filter, run]);

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
        <div className="shops-collection-wrap position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <h4 className="mb-3">Your shops</h4>

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                    <div className="ms-2">
                        <CreateShopButton />
                    </div>
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <div className="shops-collection row mt-3">
                {listShops && listShops.map((store, index) => (
                    <div className="col-3 mb-4" key={index}>
                        <ShopCard store={store} userId={_id} onRun={() => setRun(!run)} />
                    </div>
                ))}
            </div>

            {pagination.size != 0 && <Pagination pagination={pagination} onChangePage={handleChangePage} />}
        </div>
    );

}

export default ShopsCollection;