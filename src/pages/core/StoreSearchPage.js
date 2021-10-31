import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { getlistStores } from '../../apis/store';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import MainLayout from '../../components/layout/MainLayout';
import StoreCard from '../../components/store/item/StoreCard';
import Pagination from '../../components/ui/Pagination.js';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';

const StoreSearchPage = (props) => {
    const [error, setError] = useState('');
    const [isloading, setIsLoading] = useState(false);

    const keyword = new URLSearchParams(useLocation().search).get('keyword') || '';
    const [listStores, setListStores] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: keyword,
        sortBy: 'rating',
        sortMoreBy: 'point',
        isActive: 'true',
        order: 'desc',
        limit: '8',
        page: 1,
    });

    const init = () => {
        setError('');
        setIsLoading(true);

        getlistStores(filter)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });
                    setListStores(data.stores);
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
    }, [filter]);

    useUpdateEffect(() => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    }, [keyword]);

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    }

    return (
        <MainLayout>
            <div className="store-search-page position-relative mx-auto"
                style={{ maxWidth: '990px', minHeight: '80vh' }}>
                {isloading && <Loading />}
                {error && <Error msg={error} />}

                <div className="d-flex justify-content-end">
                    <span className="me-3">{pagination.size || 0} results</span>
                </div>

                <div className="store-search-list row mt-3">
                    {listStores && listStores.map((store, index) => (
                        <div className="col-3 mb-4" key={index}>
                            <StoreCard store={store} hasFollowBtn={getToken()} />
                        </div>
                    ))}
                </div>

                {pagination.size != 0 && <Pagination pagination={pagination} onChangePage={handleChangePage} />}
            </div>
        </MainLayout>
    );
};

export default StoreSearchPage;
