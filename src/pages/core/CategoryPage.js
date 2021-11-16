import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listActiveProducts } from '../../apis/product';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import MainLayout from '../../components/layout/MainLayout';
import ProductCard from '../../components/card/ProductCard';
import Pagination from '../../components/ui/Pagination.js';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import ProductFilter from '../../components/filter/ProductFilter';
import ListCategories from '../../components/list/ListCategories';

const CategoryPage = (props) => {
    const [error, setError] = useState('');
    const [isloading, setIsLoading] = useState(false);

    const { categoryId } = useParams();

    const [listProducts, setListProducts] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        rating: '',
        categoryId,
        minPrice: '',
        maxPrice: '',
        sortBy: 'sold',
        order: 'desc',
        limit: 8,
        page: 1,
    });

    const init = () => {
        setError('');
        setIsLoading(true);
        listActiveProducts(filter)
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
    }, [filter]);

    useEffect(() => {
        setFilter({
            ...filter,
            categoryId,
        });
    }, [categoryId]);

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    };

    return (
        <MainLayout container="container" navFor="user">
            <div className="product-search-page">
                <div className="row flex-nowrap">
                    <div className="col-3">
                        <ProductFilter filter={filter} setFilter={setFilter} />
                    </div>

                    <div className="col-9 position-relative">
                        {isloading && <Loading />}
                        {error && <Error msg={error} />}
                        <div className="mb-4">
                            <ListCategories
                                categoryId={categoryId}
                                heading={false}
                                col="col-3"
                            />
                        </div>

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
        </MainLayout>
    );
};

export default CategoryPage;
