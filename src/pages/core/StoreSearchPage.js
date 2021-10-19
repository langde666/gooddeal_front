import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getlistStores } from '../../apis/store';
import MainLayout from '../../components/layout/MainLayout';
import StoreCard from '../../components/store/item/StoreCard';
import Pagination from '../../components/ui/Pagination.js';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import Success from '../../components/ui/Success';
import useUpdateEffect from '../../hooks/useUpdateEffect';

const StoreSearchPage = (props) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isloading, setIsLoading] = useState(false);

    const keyword = new URLSearchParams(useLocation().search).get('keyword') || '';
    const [filter, setFilter] = useState({
        search: keyword,
        sortBy: 'point',
        isActive: '',
        order: 'desc',
        limit: '8',
        page: 1,
    });
    const [pagination, setPagination] = useState({});
    const [listStores, setListStores] = useState([]);

    const init = () => {
        setError('');
        setSuccess('');
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
                    setSuccess(true);
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
            <div className="store-search-page position-relative p-3 mx-auto"
                style={{ maxWidth: '990px', minHeight: '80vh' }}>
                {isloading && <Loading />}
                {error && <Error msg={error} />}
                {success && <h2><Success color='primary' msg={`${pagination.size} Stores found`} /></h2>}

                <div className="store-search-list row">
                    {listStores && listStores.map((store, index) => (
                        <div className="col-3 mt-4" key={index}>
                            <StoreCard store={store} />
                        </div>
                    ))}
                </div>

                {pagination.size != 0 && <Pagination pagination={pagination} onChangePage={handleChangePage} />}
            </div>
        </MainLayout>
    );
};

export default StoreSearchPage;
