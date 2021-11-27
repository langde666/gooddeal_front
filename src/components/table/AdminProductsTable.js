import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { listProductsForAdmin } from '../../apis/product';
import { humanReadableDate } from '../../helper/humanReadable';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import SortByButton from './sub/SortByButton';
import ProductSmallCard from '../card/ProductSmallCard';
import StoreSmallCard from '../card/StoreSmallCard';
import ActiveInactiveProductButton from '../button/ActiveInactiveProductButton';
import ProductStatusLabel from '../label/ProductStatusLabel';
import StarRating from '../label/StarRating';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const AdminProductsTable = ({ heading = true, isActive = true }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState('');

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'name',
        isActive,
        order: 'asc',
        limit: 6,
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        listProductsForAdmin(_id, accessToken, filter)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setProducts(data.products);
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });
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
    }, [filter, run]);

    useEffect(() => {
        setFilter({
            ...filter,
            isActive,
        });
    }, [isActive]);

    const handleChangeKeyword = (keyword) => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    };

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    };

    const handleSetSortBy = (order, sortBy) => {
        setFilter({
            ...filter,
            sortBy,
            order,
        });
    };

    return (
        <div className="admin-products-manager-table-wrap position-relative">
            {isloading && <Loading />}

            {heading && (
                <h4 className="mb-3">
                    {isActive ? 'Liscensed products' : 'Unlicensed products'}
                </h4>
            )}

            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <table className="admin-products-manager-table table align-middle table-hover mt-2 table-sm text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Product"
                                sortBy="name"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Store"
                                sortBy="storeId"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Rating"
                                sortBy="rating"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Status"
                                sortBy="isSelling"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>

                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Created at"
                                sortBy="createdAt"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>

                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td
                                className="text-start ps-2"
                                style={{ maxWidth: '300px' }}
                            >
                                <ProductSmallCard product={product} />
                            </td>
                            <td
                                className="text-start ps-2"
                                style={{ maxWidth: '300px' }}
                            >
                                <StoreSmallCard store={product.storeId} />
                            </td>
                            <td>
                                <small>
                                    <StarRating stars={product.rating} />
                                </small>
                            </td>
                            <td>
                                <small>
                                    <ProductStatusLabel
                                        isSelling={product.isSelling}
                                    />
                                </small>
                            </td>
                            <td>
                                <small>
                                    {humanReadableDate(product.createdAt)}
                                </small>
                            </td>
                            <td>
                                <div className="position-relative d-inline-block">
                                    <div className="cus-tooltip d-inline-block text-start">
                                        <ActiveInactiveProductButton
                                            productId={product._id}
                                            isActive={product.isActive}
                                            onRun={() => setRun(!run)}
                                        />
                                    </div>

                                    <small className="cus-tooltip-msg">
                                        {isActive
                                            ? 'Ban this product'
                                            : 'Liscense this product'}
                                    </small>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {pagination.size != 0 && (
                <Pagination
                    pagination={pagination}
                    onChangePage={handleChangePage}
                />
            )}
        </div>
    );
};

export default AdminProductsTable;
