import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { listSellingProductsByStore } from '../../apis/product';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import ProductCard from '../../components/card/ProductCard';
import Pagination from '../../components/ui/Pagination.js';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import ProductFilter from '../../components/filter/ProductFilter';
import StoreLayout from '../../components/layout/StoreLayout';
import MainLayout from '../../components/layout/MainLayout';

const CollectionPage = (props) => {
    const store = useSelector((state) => state.store.store);

    const [error, setError] = useState('');
    const [isloading, setIsLoading] = useState(false);

    const keyword =
        new URLSearchParams(useLocation().search).get('keyword') || '';
    const [listProducts, setListProducts] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: keyword,
        rating: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'sold',
        order: 'desc',
        categoryId: '',
        limit: 8,
        page: 1,
    });

    const init = () => {
        setError('');
        setIsLoading(true);
        listSellingProductsByStore(filter, store._id)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });
                    setListProducts(data.products);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, [filter, store]);

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
    };

    return typeof store.isActive === 'boolean' && !store.isActive ? (
        <MainLayout>
            <Error msg="This store is banned by GoodDeal!" />
        </MainLayout>
    ) : (
        <StoreLayout store={store}>
            <div className="store-collection-page">
                <div className="row flex-nowrap">
                    <div className="col-3">
                        <ProductFilter filter={filter} setFilter={setFilter} />
                    </div>

                    <div className="col-9 position-relative">
                        {isloading && <Loading />}
                        {error && <Error msg={error} />}

                        <div className="d-flex justify-content-end">
                            <span className="me-3">
                                {pagination.size || 0} results
                            </span>
                        </div>

                        <div className="product-search-list row mt-3">
                            {listProducts &&
                                listProducts.map((product, index) => (
                                    <div className="col-3 mb-4" key={index}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                        </div>

                        {pagination.size != 0 && (
                            <Pagination
                                pagination={pagination}
                                onChangePage={handleChangePage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
};

export default CollectionPage;
