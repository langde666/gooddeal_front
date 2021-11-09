import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { listStoresForAdmin } from '../../apis/store';
import { humanReadableDate } from '../../helper/humanReadable';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import SortByButton from './sub/SortByButton';
import StoreSmallCard from '../card/StoreSmallCard';
import StarRating from '../label/StarRating';
import StoreStatusLabel from '../label/StoreStatusLabel';
import ActiveInactiveStoreButton from '../button/ActiveInactiveStoreButton';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const AdminStoresTable = ({ heading = true, isActive = true }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState('');

    const [stores, setStores] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'name',
        sortMoreBy: 'point',
        isActive,
        order: '',
        limit: 6,
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        listStoresForAdmin(_id, accessToken, filter)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setStores(data.stores);
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
        <div className="admin-stores-manager-table-wrap position-relative">
            {isloading && <Loading />}

            {heading && (
                <h4 className="mb-3">
                    {isActive ? 'Liscensed stores' : 'Unlicensed stores'}
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

            <table className="admin-stores-manager-table table align-middle table-hover mt-2 table-sm text-center">
                <thead>
                    <tr>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="#"
                                sortBy="point"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Store"
                                sortBy="name"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
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
                                currentSortBy={filter.sortBy}
                                title="Status"
                                sortBy="isOpen"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Joined"
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
                    {stores.map((store, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="text-start ps-4">
                                <small>
                                    <StoreSmallCard store={store} />
                                </small>
                            </td>
                            <td>
                                <small>
                                    <StarRating stars={store.rating} />
                                </small>
                            </td>
                            <td>
                                <small>
                                    <StoreStatusLabel isOpen={store.isOpen} />
                                </small>
                            </td>
                            <td>{humanReadableDate(store.createdAt)}</td>
                            <td>
                                <div className="position-relative d-inline-block me-2">
                                    <div className="cus-tooltip d-inline-block text-start">
                                        <ActiveInactiveStoreButton
                                            storeId={store._id}
                                            isActive={store.isActive}
                                            onRun={() => setRun(!run)}
                                        />
                                    </div>

                                    <small className="cus-tooltip-msg">
                                        {isActive
                                            ? 'Ban this store'
                                            : 'Liscense this store'}
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

export default AdminStoresTable;
