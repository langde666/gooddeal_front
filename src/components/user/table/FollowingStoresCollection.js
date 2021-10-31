import { useState, useEffect } from 'react';
import { getToken } from '../../../apis/auth';
import { listFollowingStores } from '../../../apis/follow';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import StoreCard from '../../store/item/StoreCard';
import Pagination from '../../ui/Pagination';

const FollowingStoresCollection = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState(false);

    const [listStores, setListStores] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'point',
        order: 'desc',
        limit: '4',
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        listFollowingStores(_id, accessToken, filter)
            .then(data => {
                if (data.error) {
                    setIsLoading(false);
                    setError(data.error);
                }
                else {
                    setIsLoading(false);
                    setListStores(data.stores);
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });
                }
            })
            .catch(error => {
                setIsLoading(false);
                setError('Server Error');
            });
    }

    useEffect(() => {
        init();
    }, [filter, run]);

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    }

    return (
        <div className="following-stores-collection-wrap position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="d-flex justify-content-between align-items-end">
                <h4>Following stores</h4>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <div className="following-stores-collection row mt-3">
                {listStores && listStores.map((store, index) => (
                    <div className="col-3 mb-4" key={index}>
                        <StoreCard store={store} hasFollowBtn={true} onRun={() => setRun(!run)} />
                    </div>
                ))}
            </div>

            {pagination.size != 0 && <Pagination pagination={pagination} onChangePage={handleChangePage} />}
        </div>
    )
}

export default FollowingStoresCollection;